import sharp from 'sharp';
import {readFile} from 'node:fs/promises';
const a=JSON.parse(await readFile('docs/nocturne-asset.json','utf8'));
for(const w of [640,1600]) await sharp(a.source).resize({width:w}).webp({quality:88}).toFile(`public/images/hero-nocturne${w===640?'-small':''}.webp`);
