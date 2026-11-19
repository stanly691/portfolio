# ITCS React recreation

A responsive homepage and design-system gallery, built in React + TypeScript with Vite. Three.js is imported only when Alison approaches the viewport. Native dialogs, semantic buttons and explicit state handle enquiries, service summaries and future navigation.

From this directory: `npm ci`, `npm run dev`, `npm run check`, `npm run build`. From the repository root: `npm run dev` serves `/itcs/`; `npm run build` packages the full GitHub Pages site.

- Default printer: `/portfolio/itcs/`
- Folder: `/portfolio/itcs/?hero=folder`
- Design system: `/portfolio/itcs/design-system/`

Voice consists of 49 local Kokoro bf_emma MP3s, controlled by `useAlisonVoice.ts`. Audio starts only by user action and stops at the relevant lifecycle boundaries. Envelope files drive amplitude-based mouth movement. `scripts/generate-alison-voice.py` can regenerate changed clips with a local model cache and content hashes; generation is not part of the website build.

The source character is Microsoft Rocketbox Business_Female_04. The original project's prepared GLB, idle retargeting, paper grain, exact font and original audio clips were not recovered. See `docs/asset-records.md` for precise gaps and `docs/recreation-handover.json` for the supplied technical handover. Local enquiries are previews; no live submission or AI integration is claimed.
