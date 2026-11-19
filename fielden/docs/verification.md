# Verification

- TypeScript check and Vite production build passed.
- Browser layout checks at 320, 390, 768, 1024, 1440 and 1920 pixels: no horizontal overflow; no broken loaded images.
- Visually reviewed desktop hero, full page composition, mobile hero, product grid and bag. Fixed a CSS class collision in the journal and made product photos fit entirely inside their cards.
- Search for “boots” returns The Moor. Product selection, UK size 7, adding to bag, item subtotal and local preview messaging verified.
- Mobile navigation to Women updates the collection heading. Outdoors filter returns The Moor. Saving The Roam updates the heart state and Saved filter.
- Newsletter valid-email submission displays an explicit no-transmission/no-storage preview acknowledgement.
- Native dialog Escape closes the informational dialog and restores focus to Size guide.
- Source review corrected advertised search keywords and muted body-text contrast. Darkened muted text to #626558.
- Reduced-motion media query disables scrolling animation/transitions. No autoplay, video, analytics, backend, checkout or form transmission.
- All eight generated photographs and their responsive variants are local; fonts are locally bundled.
- npm audit reports zero vulnerabilities after updating the image-processing development dependency.
- A transient development HMR error occurred while a helper export was being added across two files; the final build includes the helper and the tested search works.

Scope: interactive design prototype, not a production commerce system or an independent WCAG certification.
