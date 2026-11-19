import * as THREE from "three";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
export async function mountAvatar(
  host,
  asset,
  isPaused,
  getSpeechLevel = () => 0,
) {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  host.append(renderer.domElement);
  renderer.domElement.setAttribute("aria-label", "Animated 3D Alison");
  renderer.domElement.setAttribute("role", "img");
  let model, headMap, bodyMap, headNormal;
  try {
    const scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(29, 1, 0.01, 1000);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x686470, 2.4));
    const key = new THREE.DirectionalLight(0xfff4ea, 2.6);
    key.position.set(2, 3, 4);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 1.1);
    fill.position.set(-3, 1, 2);
    scene.add(fill);
    const manager = new THREE.LoadingManager();
    manager.setURLModifier((url) =>
      url.endsWith(".tga")
        ? asset("alison/" + url.split(/[\\/]/).pop().replace(".tga", ".jpg"))
        : url,
    );
    model = await new FBXLoader(manager).loadAsync(asset("alison/alison.fbx"));
    const textureLoader = new THREE.TextureLoader();
    const loaded = await Promise.allSettled(
      [
        "f020_head_color.jpg",
        "f020_body_color.jpg",
        "f020_head_normal.jpg",
      ].map((file) => textureLoader.loadAsync(asset("alison/" + file))),
    );
    for (const r of loaded)
      if (r.status === "rejected") {
        for (const done of loaded)
          if (done.status === "fulfilled") done.value.dispose();
        throw r.reason;
      }
    [headMap, bodyMap, headNormal] = loaded.map((r) => r.value);
    headMap.colorSpace = bodyMap.colorSpace = THREE.SRGBColorSpace;
    const meshes = [],
      bones = [];
    model.traverse((o) => {
      if (o.isMesh) {
        meshes.push(o);
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        o.material = mats.map((m) => {
          const isHead = /head|face|eye|hair|teeth/i.test(
            m.name + " " + o.name,
          );
          return new THREE.MeshStandardMaterial({
            name: m.name,
            map: isHead ? headMap : bodyMap,
            roughness: isHead ? 0.62 : 0.82,
            normalMap: isHead ? headNormal : null,
            normalScale: new THREE.Vector2(0.18, 0.18),
            side: THREE.DoubleSide,
          });
        });
        if (o.material.length === 1) o.material = o.material[0];
        o.frustumCulled = false;
      }
      if (o.isBone) bones.push(o);
    });
    const box = new THREE.Box3().setFromObject(model),
      size = box.getSize(new THREE.Vector3()),
      center = box.getCenter(new THREE.Vector3());
    model.scale.setScalar(2 / size.y);
    model.position.copy(center).multiplyScalar(-2 / size.y);
    scene.add(model);
    const head =
      bones.find((b) =>
        /^(head|bip01head|bhead)$/i.test(b.name.replace(/[ _]/g, "")),
      ) || bones.find((b) => /head/i.test(b.name) && !/end|nub/i.test(b.name));
    const neck = bones.find((b) => /neck/i.test(b.name));
    const leftArm = bones.find((b) =>
        /leftarm|lupperarm|upperarml|bip01lupperarm/i.test(
          b.name.replace(/[ _]/g, ""),
        ),
      ),
      rightArm = bones.find((b) =>
        /rightarm|rupperarm|upperarmr|bip01rupperarm/i.test(
          b.name.replace(/[ _]/g, ""),
        ),
      );
    // The source is a rest-pose rig. Lower the upper arms for a composed standing pose.
    function pointBone(bone, child, direction) {
      if (!bone || !child) return;
      model.updateMatrixWorld(true);
      const start = bone.getWorldPosition(new THREE.Vector3()),
        end = child.getWorldPosition(new THREE.Vector3()),
        world = bone.getWorldQuaternion(new THREE.Quaternion()),
        parent = bone.parent.getWorldQuaternion(new THREE.Quaternion());
      const change = new THREE.Quaternion().setFromUnitVectors(
        end.sub(start).normalize(),
        direction.normalize(),
      );
      bone.quaternion.copy(parent.invert().multiply(change.multiply(world)));
      model.updateMatrixWorld(true);
    }
    const leftFore = bones.find((b) =>
        /bip01lforearm/i.test(b.name.replace(/[ _]/g, "")),
      ),
      rightFore = bones.find((b) =>
        /bip01rforearm/i.test(b.name.replace(/[ _]/g, "")),
      );
    pointBone(leftArm, leftFore, new THREE.Vector3(0.12, -1, 0));
    pointBone(rightArm, rightFore, new THREE.Vector3(-0.12, -1, 0));
    pointBone(
      leftFore,
      leftFore?.children.find((c) => c.isBone),
      new THREE.Vector3(0.04, -1, 0.05),
    );
    pointBone(
      rightFore,
      rightFore?.children.find((c) => c.isBone),
      new THREE.Vector3(-0.04, -1, 0.05),
    );
    camera.position.set(0, 0.79, 1.28);
    camera.lookAt(0, 0.79, 0);
    let visible = true,
      frame = 0,
      last = 0,
      nodUntil = 0,
      pointer = { x: 0, y: 0 };
    const initialHead = head?.rotation.clone(),
      initialNeck = neck?.rotation.clone();
    const resize = () => {
      const w = host.clientWidth,
        h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();
    const io = new IntersectionObserver((e) => (visible = e[0].isIntersecting));
    io.observe(host);
    function move(e) {
      const r = host.getBoundingClientRect();
      pointer = {
        x: ((e.clientX - r.left) / r.width - 0.5) * 0.28,
        y: ((e.clientY - r.top) / r.height - 0.5) * 0.12,
      };
    }
    host.addEventListener("pointermove", move);
    const leave = () => (pointer = { x: 0, y: 0 });
    host.addEventListener("pointerleave", leave);
    const morphMeshes = meshes.filter((m) => m.morphTargetDictionary);
    function tick(t) {
      frame = requestAnimationFrame(tick);
      if (
        document.hidden ||
        document.querySelector("dialog[open]") ||
        !visible ||
        t - last < 33
      )
        return;
      last = t;
      const time = t * 0.001,
        motion = !isPaused();
      if (head && initialHead) {
        head.rotation.y =
          initialHead.y +
          (motion ? pointer.x + Math.sin(time * 0.45) * 0.025 : 0);
        head.rotation.x =
          initialHead.x +
          (motion
            ? pointer.y +
              (t < nodUntil
                ? Math.sin(t * 0.012) * 0.045
                : Math.sin(time * 0.7) * 0.012)
            : 0);
      }
      if (neck && initialNeck)
        neck.rotation.z =
          initialNeck.z + (motion ? Math.sin(time * 0.6) * 0.009 : 0);
      model.position.y =
        (-center.y * 2) / size.y + (motion ? Math.sin(time * 1.5) * 0.002 : 0);
      for (const m of morphMeshes) {
        for (const [name, idx] of Object.entries(m.morphTargetDictionary)) {
          if (/AK_44_MouthSmileLeft|AK_45_MouthSmileRight/i.test(name))
            m.morphTargetInfluences[idx] = 0.18;
          if (/AK_09_EyeBlinkLeft|AK_10_EyeBlinkRight/i.test(name))
            m.morphTargetInfluences[idx] =
              motion && time % 4.7 < 0.16
                ? Math.sin(((time % 4.7) / 0.16) * Math.PI) * 0.85
                : 0;
          if (/AK_25_JawOpen/i.test(name))
            m.morphTargetInfluences[idx] = motion ? getSpeechLevel() * 0.48 : 0;
        }
      }
      renderer.render(scene, camera);
    }
    tick(0);
    const loading = host.querySelector(".presenter-loading");
    if (loading) loading.hidden = true;
    host.dataset.ready = "true";
    return {
      nod() {
        nodUntil = performance.now() + 700;
      },
      dispose() {
        cancelAnimationFrame(frame);
        ro.disconnect();
        io.disconnect();
        host.removeEventListener("pointermove", move);
        host.removeEventListener("pointerleave", leave);
        model.traverse((o) => {
          if (o.geometry) o.geometry.dispose();
          if (o.material)
            (Array.isArray(o.material) ? o.material : [o.material]).forEach(
              (m) => m.dispose(),
            );
        });
        headMap.dispose();
        bodyMap.dispose();
        headNormal.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      },
    };
  } catch (error) {
    model?.traverse((o) => {
      o.geometry?.dispose();
      if (o.material)
        (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) =>
          m.dispose(),
        );
    });
    headMap?.dispose();
    bodyMap?.dispose();
    headNormal?.dispose();
    renderer.dispose();
    renderer.domElement.remove();
    throw error;
  }
}
