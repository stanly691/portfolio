import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
const source = process.argv[2];
if (!source) throw new Error('Pass the original image directory.');
const files = {
  hero:'exec-e79d6065-23fc-4056-8ccc-a08c04e7492e.png',
  shoe:'exec-d8e563c1-318b-49a7-9b2d-5d3e914c75a5.png',
  boot:'exec-e8d6b688-5b04-4a3d-8458-470cc2c15218.png',
  women:'exec-545865d0-3c76-4be5-a4df-c948b2c55d0b.png',
  men:'exec-4376ef54-1c19-4c51-8a7a-b16500979b55.png',
  craft:'exec-cb97a095-5b82-4145-b160-9818871c2310.png',
  white:'exec-65106847-674c-4fd2-9fa4-dc12410edb26.png',
  loafer:'exec-e6c93f5b-8690-4037-8ad7-16924bbf2044.png'
};
await mkdir('public/images',{recursive:true});
for (const [key,file] of Object.entries(files)) {
  await sharp(resolve(source,file)).resize({width:key==='hero'?1800:1200,withoutEnlargement:true}).webp({quality:86}).toFile(`public/images/${key}.webp`);
  await sharp(resolve(source,file)).resize({width:640,withoutEnlargement:true}).webp({quality:82}).toFile(`public/images/${key}-small.webp`);
}
console.log('Prepared 8 generated images at two responsive sizes.');
