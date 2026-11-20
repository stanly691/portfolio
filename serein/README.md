# SEREIN — Bathroom atelier

Independent React / TypeScript / Vite portfolio concept in a separate folder. Run npm install then npm run dev. Build with npm run build. The parent portfolio deploys the output at /portfolio/serein/.

## Identity
Serein: spaces for a slower pace. Mineral green #344941, warm ivory #f6f3ed, pale stone #e7e9df. Cormorant Garamond display typography with DM Sans for controls and descriptions. Restrained lowercase wordmark, serif italic emphasis, rectangular buttons and generous architectural imagery.

Reference studied: https://www.prestigebathrooms.com/ and its Baths collection page. Design cues: floating sage navigation, immersive image-led hero, large serif titles, alternating editorial panels, collection discovery and project-led calls to action. Original brand, copy, image assets and page layouts; no claimed affiliation or fabricated trading history.

## Pages and interactions
Home, collection filters, four product detail pages, two room concepts, brand approach, shortlist and project brief preview. Hash routing works on static hosting. Shortlist and brief live in page memory only. Native form validation and readable local brief summary. No enquiry transmission, payments or real product specifications.

## Images
Six images generated with the built-in image-generation tool. Exact prompts and source paths are preserved in docs/assets.json. Final responsive assets are saved in public/images/*.webp. Regenerate optimized sizes with node docs/prepare-images.mjs while original source files remain available. Generated imagery represents concepts, not installed projects or real products.
