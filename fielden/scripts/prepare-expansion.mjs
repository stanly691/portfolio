import sharp from "sharp";
import { readFile, mkdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
const assets = JSON.parse(await readFile("docs/expansion-assets.json", "utf8"));
for (const { key, source } of assets) {
  await sharp(source)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 87 })
    .toFile(`public/images/${key}.webp`);
  await sharp(source)
    .resize({ width: 640, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(`public/images/${key}-small.webp`);
}
// Editorial camera-motion loops assembled from the generated photography.
// These are genuine animated GIF assets, not AI-generated live-action video.
const ffmpeg = execFileSync(
  "python",
  ["-c", "import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())"],
  { encoding: "utf8" },
).trim();
await mkdir("public/motion", { recursive: true });
for (const [name, source] of [
  ["shore-loop", "shore"],
  ["craft-loop", "craft"],
]) {
  const filter =
    "scale=2400:-1,zoompan=z='1.06+0.025*sin(2*PI*on/72)':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=72:s=800x450:fps=12,split[a][b];[a]palettegen=max_colors=128[p];[b][p]paletteuse=dither=bayer:bayer_scale=4";
  execFileSync(
    ffmpeg,
    [
      "-hide_banner",
      "-loglevel",
      "error",
      "-y",
      "-i",
      `public/images/${source}.webp`,
      "-filter_complex",
      filter,
      "-loop",
      "0",
      `public/motion/${name}.gif`,
    ],
    { stdio: "inherit" },
  );
  const meta = await sharp(`public/motion/${name}.gif`, {
    animated: true,
  }).metadata();
  await sharp(`public/motion/${name}.gif`, { animated: true })
    .webp({ quality: 76, effort: 4 })
    .toFile(`public/motion/${name}.webp`);
  console.log(
    `${name}: ${meta.pages} frames, ${meta.width} × ${meta.pageHeight}`,
  );
}
console.log("Prepared 16 new images and 2 editorial GIF loops.");
