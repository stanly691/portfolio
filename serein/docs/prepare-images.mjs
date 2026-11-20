import sharp from 'sharp';
import {readFile} from 'node:fs/promises';
const assets=JSON.parse(await readFile(new URL('../docs/assets.json',import.meta.url),'utf8'));
for(const a of assets){for(const width of [640,1600]){await sharp(a.source).resize({width,withoutEnlargement:true}).webp({quality:85}).toFile(new URL(`../public/images/${a.key}${width===640?'-small':''}.webp`,import.meta.url).pathname.replace(/^\/(\w:)/,'$1'));}}

