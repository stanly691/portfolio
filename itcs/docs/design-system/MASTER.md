# ITCS recreation system

The React + TypeScript implementation follows the supplied recreation handover. React was explicitly requested during this work; the original project used vanilla ES modules. This is a framework port, not a claim that the original source has been recovered.

## Visual foundation

Use the handover's tokens: brand #ED1C24, action #D71922, hero #171717, section #151517, surface #222225, white #F5F5F7, secondary #B0B0B7, paper #F2F0E8, ink #27272A, focus #FF7B81 and customer surface #EFEFED. Use the existing repository body stack (Arial/Helvetica/system sans) as a fallback. The original --body family has not been recovered; do not describe this fallback as the original font. Receipt utilities use ui-monospace, SFMono-Regular, Consolas, monospace.

## Printer

Desktop: centred headline clamp(38px,3.6vw,50px), weight 500, line height 1.05, -0.065em tracking. Stage max 1440px with 50px outside space. Three choices per side; grid minmax(0,1fr) minmax(440px,540px) minmax(0,1fr), 45px gaps. Choices have 60px top padding, 15px gaps and 76px minimum height.

The printer is an SVG rendering of the documented shallow red housing: 60px high, restrained corners, matching three-stop red shading, ITCS / SERVICE DESK label, 6px warm status light, and a recessed 10px slot inset 22px. No generated device photo or stock render.

The paper window clips a real moving sheet. Margins are -13px vertically / 24px horizontally, 15px bottom space; the paper has 21px 24px 20px padding and two equal content columns separated by 25px. Monochrome printed logo is 65px. Capability checks align right. Contextual actions and decorative barcode remain functional and informative. Receipt body/list text stays at least 12px and controls keep 44px touch areas. Content determines paper height. At <=380px the receipt and actions become one column. At <=800px service choices move into two columns above a full-width printer.

Feed: exactly 2600ms, cubic-bezier(.2,.55,.3,1), translateY keyframes -102%, -72% at .26, -69% at .31, -35% at .65, -33% at .7, then 0. No line fades. Cancel an old animation before a new service feed. Respect prefers-reduced-motion and sessionStorage itcs-motion=paused. Initial print occurs once in the production mount. React development StrictMode deliberately exercises effect setup/cleanup twice.

The original paper-grain.svg is unavailable. The current vector paper surface and edge are an approximation, not a recovered original texture. Keep this gap explicit in internal records.

## Alison

Use Microsoft Rocketbox Business_Female_04, the same character source as the handover. Do not alter mesh or skeleton proportions. A uniform scene normalisation is only a rendering coordinate convention, not a claim about physical body measurements. The prepared original GLB and retargeted idle were not recovered. The current renderer loads the original facial FBX and uses procedural restrained idle/attention; exact original camera/lights are unknown. Camera framing is a new chest-up adjustment specifically requested by the user.

Apply confirmed settings: exposure 1.08, head roughness .62, jacket roughness .82, 2048px head colour texture, normal strength .18, restrained .18 smile. Animate blinking and audio-amplitude mouth opening; this is not phoneme/viseme lip sync. Render only while visible. Clean up WebGL, geometry, materials, textures, listeners and observers, including partial-load failure. A small genuine ITCS logo belongs in the character stage. Original fallback snapshot is unavailable; use an honest character-unavailable state while audio/text remain usable.

Desktop layout: 35% character / 65% conversation. Four contexts, three examples each and four responses each. Use sessionStorage itcs-alison-business for the optional company name. Channels say CHAT CONVERSATION, PHONE CONVERSATION or TEAM WORKFLOW. Voice has Say hello, Hear Alison, replay and mute controls. The Alison enquiry uses value alison, label Alison · Business assistant, prefilled business and a message about support, sales and routine workflows.

## Voice

49 locally hosted MP3 files: welcome-0.mp3 plus 48 scenario responses. Offline Kokoro bf_emma, British English. These are regenerated clips, not recovered originals. Current generation uses speed 1.0; the original exact speed is unknown. Content hashes permit unchanged files to be reused. Keep the model cache outside version control and deployment.

Never autoplay. Stop a previous clip before starting another. Stop speech on scenario changes, section exit, modal opening, hidden document, pagehide and component disposal. Use separate section audio and stage rendering observers. Mouth openness samples the saved 40ms RMS envelope against the actual media currentTime. No live CRM, order lookup, microphone or telephone integration is implied.

## Site-wide rules

Retain complete navigation with unbuilt destinations disabled. Keep native named dialogs, keyboard focus, Escape dismissal and focus restoration. Customer evidence remains attributed and free of research notes. Use genuine ITCS and customer/certification artwork from the official site. No photographs of real people, generated product photos or raster paper textures. The people-section replacement is an original code-drawn illustration, as expressly requested. Keep supporting sections on one grid with calm interaction.

Retain ?hero=folder with directly selectable cards. The dotted logo's pointer response is reconstructed; the original particle algorithm and board textures remain unavailable. Reduced motion renders a static dotted logo.

## Verification

TypeScript and production build; all eight requested viewport widths; rapid receipt switching; manual motion pause and persistence; responsive folder and design-system routes; all twelve conversations; greeting, actual audio duration/progression, mute and interruptions; context carried into enquiries; current official logo image loading; no visitor-facing research notes or real-person photography. Verify deployed URLs and audio assets after GitHub Pages reports success.
