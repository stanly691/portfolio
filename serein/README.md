# SEREIN — Bathroom atelier

Independent React / TypeScript / Vite portfolio concept in a separate folder. Run npm install then npm run dev. Build with npm run build. The parent portfolio deploys the output at /portfolio/serein/.

## Identity
Serein: spaces for a slower pace. Mineral green #344941, warm ivory #f6f3ed, pale stone #e7e9df. Cormorant Garamond display typography with DM Sans for controls and descriptions. Restrained lowercase wordmark, serif italic emphasis, rectangular buttons and generous architectural imagery.

Reference studied: https://www.prestigebathrooms.com/ and its Baths collection page. Design cues: floating sage navigation, immersive image-led hero, large serif titles, alternating editorial panels, collection discovery and project-led calls to action. Original brand, copy, image assets and page layouts; no claimed affiliation or fabricated trading history.

## Pages and interactions
Home, collection filters, four product detail pages, two room concepts, brand approach, shortlist and project brief preview. Hash routing works on static hosting. Shortlist and brief live in page memory only. Native form validation and readable local brief summary. No enquiry transmission, payments or real product specifications.

## Images
Six images generated with the built-in image-generation tool. Exact prompts and source paths are preserved in docs/assets.json. Final responsive assets are saved in public/images/*.webp. Regenerate optimized sizes with node docs/prepare-images.mjs while original source files remain available. Generated imagery represents concepts, not installed projects or real products.
## Editorial identity revision

Replaced the previous Cormorant/sage direction with Bodoni Moda editorial typography, original hand-drawn SVG SEREIN letterforms in src/Signature.tsx, oxblood #4b252a, warm ivory #f5f1e9 and walnut tones. The SVG is a custom wordmark, not a complete new font. All headline/body typeface licenses are retained.

Rebuilt the homepage with the original Nocturne campaign image, asymmetric introduction, staggered large-format products, an interactive three-material study, a dramatic architectural feature, and an oversized wordmark. Shared typography, controls and palette continue through collection, product, room, shortlist and brief pages.

New image generated with the built-in image-generation tool; exact prompt and source are in docs/nocturne-asset.json. Final assets: public/images/hero-nocturne.webp and hero-nocturne-small.webp.
## Editorial interactions

Added a recurring original S/water-line atelier seal and matching favicon; an editorial typographic interlude; sticky frosted navigation with reading progress; user-controlled Garden/Nocturne photography; restrained blur-to-focus image reveals; collection hover invitations; animated material changes; and a keyboard-accessible detail magnification slider. No autoplay cycling, sound, cursor replacement or scroll hijacking. Reduced-motion preferences disable reveal animations and transitions. Body text and functional labels remain sharp.

Verified atmosphere switching, detail toggle, slider arrow-key adjustment, mobile menu and 390px overflow. TypeScript and production build passed.
## Accepted sculptural-modern direction

User selected expressive lettering, mineral tones and asymmetric layouts. Current typography is Syne (500/600/700) for display and lowercase brand signature, paired with DM Sans for reading and controls. The signature is typeset in licensed Syne with custom spacing and a celadon terminal dot; it is not a newly invented font. This replaces the earlier drawn serif wordmark and Bodoni direction.

Palette: deep ink #203c3a, mineral white #f3f4ee, celadon #dce5d8, muted leaf #5d7a70. The hero separates a short headline and CTA from the room image. Headings, labels and body copy follow a shared left-aligned grid. Mobile places the headline panel before the photograph. Existing atmosphere switching, detail viewer, shortlist and brief flows remain.
