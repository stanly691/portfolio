import { useEffect, useRef, useState } from "react";
import { asset, Logo } from "./UI";
interface ParticleLogoProps {
  paused: boolean;
}
export function ParticleLogo({ paused }: ParticleLogoProps) {
  const ref = useRef<HTMLCanvasElement>(null),
    [ready, setReady] = useState(false);
  useEffect(() => {
    const canvas = ref.current,
      ctx = canvas.getContext("2d");
    if (!ctx) return;
    let disposed = false,
      frame = 0;
    const image = new Image();
    const width = 156,
      height = 86;
    canvas.width = width * 2;
    canvas.height = height * 2;
    let pointer: { x: number; y: number } | null = null;
    const points: {
      x: number;
      y: number;
      bx: number;
      by: number;
      color: string;
    }[] = [];
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let moving = false;
      for (const point of points) {
        const dx = pointer ? point.bx - pointer.x : 0,
          dy = pointer ? point.by - pointer.y : 0,
          d = Math.hypot(dx, dy);
        const force = pointer && d < 65 ? (1 - d / 65) * 18 : 0;
        const tx = point.bx + (d ? (dx / d) * force : 0),
          ty = point.by + (d ? (dy / d) * force : 0);
        point.x += (tx - point.x) * 0.18;
        point.y += (ty - point.y) * 0.18;
        if (Math.abs(point.x - tx) + Math.abs(point.y - ty) > 0.15)
          moving = true;
        ctx.fillStyle = point.color;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.55, 0, Math.PI * 2);
        ctx.fill();
      }
      frame = moving && !paused ? requestAnimationFrame(draw) : 0;
    }
    const start = () => {
      if (!frame && !disposed) frame = requestAnimationFrame(draw);
    };
    const move = (event: PointerEvent) => {
      if (paused) return;
      const rect = canvas.getBoundingClientRect();
      pointer = {
        x: ((event.clientX - rect.left) / rect.width) * canvas.width,
        y: ((event.clientY - rect.top) / rect.height) * canvas.height,
      };
      start();
    };
    const leave = () => {
      pointer = null;
      start();
    };
    image.onload = () => {
      if (disposed) return;
      const buffer = document.createElement("canvas");
      buffer.width = canvas.width;
      buffer.height = canvas.height;
      const source = buffer.getContext("2d");
      source.drawImage(image, 0, 0, canvas.width, canvas.height);
      const pixels = source.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
      ).data;
      for (let y = 2; y < canvas.height; y += 6)
        for (let x = 2; x < canvas.width; x += 6) {
          const n = (y * canvas.width + x) * 4;
          if (pixels[n + 3] > 120)
            points.push({
              x,
              y,
              bx: x,
              by: y,
              color: `rgb(${pixels[n]} ${pixels[n + 1]} ${pixels[n + 2]})`,
            });
        }
      draw();
      setReady(true);
    };
    image.src = asset("itcs-logo-white.png");
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      image.onload = null;
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
    };
  }, [paused]);
  return (
    <div className="particle-logo">
      <canvas ref={ref} role="img" aria-label="ITCS" hidden={!ready} />
      {!ready && <Logo />}
    </div>
  );
}
