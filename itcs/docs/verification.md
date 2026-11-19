# Verification — React recreation, 19 November 2026

`npm run build` runs TypeScript and Vite checks, then packages a clean Pages output. No live enquiry backend or AI integration is part of this build.

## Runtime checks

- Default printer and `?hero=folder` are mutually exclusive. The retained folder has direct service controls and a pointer-responsive dotted official logo.
- Eight widths checked in the in-app browser: 1920, 1440, 1280, 1024, 820, 768, 390, 320. No horizontal overflow. Computed receipt grid has two equal columns at 390px and one at 320px.
- Computed desktop hero heading is 50px and printer housing is 60px, matching the handover. Paper feed keyframes/easing match the supplied values in source.
- Rapid service selection leaves the latest receipt selected. All six services remain represented.
- No initial audio source or autoplay. All 49 MP3 files decode to nonzero audio. Browser playback reports playing media and the expected duration; welcome-0 is approximately 9.77s.
- All twelve React scenarios were advanced through their three customer replies to the final handover. The later fidelity changes preserve that flow.
- Scenario changes and opening notes/enquiry dialogs stop audio. Explicit mute/replay controls work. Page visibility and section-exit listeners are separately implemented; visibility-change behavior was source-reviewed.
- Greeting mode displays the greeting transcript, plays welcome-0 and offers a return to the scenario.
- Optional business name reaches the Alison enquiry company field. Service value is alison; visible label and prefilled message match the handover.
- Required enquiry fields, acknowledgement and preview result tested with fictional Example Company / visitor@example.com data. The result says nothing has been sent.
- Escape closes the enquiry and restores focus to the invoking Alison CTA. Mobile Menu/Services/Escape returns focus to Menu.
- Manual pause survives reload as Resume motion; receipt is immediately ready. The system reduced-motion preference shares this rendering branch.
- Official logos load; supporting imagery is code-drawn SVG. Real-person and generated-photo/texture assets are absent from deployment output.
- Final source review found no significant defect in greeting, voice cancellation, material disposal, motion storage or enquiry context. An additional lazy-import disposal guard prevents mounting a renderer after React unmount.

## Limits

Original GLB/idle, paper-grain SVG, exact original font and original audio recordings remain unavailable; see asset-records.md. The current FBX renderer, vector paper surface and regenerated Kokoro clips are documented reconstructions. No claim of pixel-perfect recreation or phoneme lip sync is made. The large Three.js/FBX chunk is lazy-loaded. A full independent WCAG audit has not been performed.
