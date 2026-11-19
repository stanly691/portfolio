# FIELDEN

A standalone React + TypeScript lifestyle ecommerce **design concept** inspired by the campaign scale and shopping structure of Vivobarefoot. Original FIELDEN identity, classic editorial typography, olive/ivory palette and eight original AI-generated photographs.

## Run

```sh
npm ci
npm run dev
```

Local preview: http://127.0.0.1:5180/

`npm run build` typechecks and builds the app. Root portfolio build packages this into `dist/fielden/`, independently of ITCS.

## Scope

Responsive homepage, product discovery, category filters, saved styles, search, native product/size dialogs, a preview bag, editorial reading overlays, newsletter preview and informational overlays. No server, order placement, payment, email transmission or analytics. Preview state is in memory and resets on refresh. The collection, prices, copy and imagery are illustrative.

## Assets

All photography was generated with the built-in image generation tool and converted to responsive WebP sizes in `public/images/`. No Vivobarefoot assets or trademarks were copied. Original full-resolution PNGs remain in the generation output directory. See `docs/image-prompts.md` for prompts and `scripts/prepare-images.mjs` for conversion.

Fonts: Cormorant Garamond and DM Sans, self-hosted through Fontsource packages (SIL Open Font License). Dependency license files are included in `docs/licenses/`.

Design rationale: `docs/design.md`. Verification: `docs/verification.md`.
