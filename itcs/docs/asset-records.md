# Assets and fidelity record

Internal record, updated 19 November 2026. No research commentary is shown in customer-facing sections.

## Recovery

The starting checkout had no commits or source. `/workspace/ITCS-WEB` is not available on this Windows machine; `C:/workspace/ITCS-WEB` does not exist. Searches of the available ChatGPT project folders found no service-printer.js, service-folder.js, paper-grain.svg, alison-avatar.js or alison.glb. The old ssam4243/ITCS-WEB repository reports not found and its Pages preview was previously unavailable. The currently authenticated stanly691 account has no old ITCS-WEB repository.

The supplied handover is retained as `recreation-handover.json`. Its recorded measurements, tokens, timing and known model parameters guide the port; it is not a source or asset backup.

## Official artwork

The current official ITCS homepage was reviewed in the browser, including its image source URLs.

- White/red logo: https://www.itcs.co.uk/wp-content/uploads/2023/01/White-Logo-Full-Transparent.png
- Black/red logo: https://www.itcs.co.uk/wp-content/uploads/2025/06/Black-Logo-Full-Transparent.png
- Genuine customer and certification images: see `public/assets/official/sources.json` for exact official URLs. Customer images are Siderise, Sony UK Technology Centre and Renault.

No hand-drawn or generated logo replacements are used. The receipt applies monochrome CSS to official artwork for printed ink. Company artwork remains company-owned, not asserted to be open-licensed. Official contact and certification evidence is recorded in the original brief and handover. The page does not claim independently verified surveillance status or invented customer outcomes.

## Alison character

Microsoft Rocketbox Business_Female_04, from https://github.com/microsoft/Microsoft-Rocketbox . Copyright (c) 2020 Microsoft, MIT licence. Original facial FBX: Assets/Avatars/Professions/Business_Female_04/Export/Business_Female_04_facial.fbx. Head/body colour and head normal maps come from that model's Textures directory. Head colour and normal maps are resized to 2048px; body colour is 1024px. No mesh or skeleton proportions were edited. The Three.js coordinate normalisation is uniform.

Confirmed handover settings are applied: 1.08 exposure, .62 head roughness, .82 jacket roughness, .18 normal scale and restrained .18 smile. Current camera placement is tuned for the newly requested chest-up framing, not claimed to match the missing original camera. Blinking and mouth movement use the source facial blendshapes. Mouth movement follows the audio RMS envelope, not phoneme alignment.

Missing: the prepared 3,553,952-byte original GLB, Blender retargeting script/idle and original 199,217-byte rendered fallback snapshot. The current FBX/procedural animation implementation is a documented reconstruction. A real-person or unrelated avatar image is not substituted on failure. MIT notices are present in docs/licenses, assets/licenses and assets/alison/LICENSE.txt.

## Voice

Original recorded MP3s were unavailable. Regenerated locally with Kokoro v1.0 int8 ONNX, voice bf_emma, en-gb, speed 1.0: 49 clips (one greeting, four responses for each of twelve scenarios). The original exact generation speed is unknown. The generator records SHA-256 content/settings hashes, audio durations and 40ms RMS envelopes. Weights and voice bundle stay in ignored `.cache/voice` and are not deployed.

Sources: https://huggingface.co/hexgrad/Kokoro-82M and https://github.com/thewh1teagle/kokoro-onnx . Model Apache-2.0 and runtime MIT notices are retained. No runtime speech API, analytics, microphone or third-party account access is used.

## Graphics and typography

The printer and connected-services illustration are original SVG code. The housing dimensions, colour stops, spacing and paper feed now follow the handover. The original `paper-grain.svg` is missing; the vector paper surface is an approximation. The original folder board/paper textures and particle algorithm are also missing; the retained folder uses reconstructed shading and a pointer-responsive dotted official logo. No generated device photos, raster paper textures or photographs of real people are shipped.

The original --body font family/files were not recovered. The repository's Arial/Helvetica/system sans fallback is retained rather than asserting a similar new font is original. Receipt metadata uses the documented system monospace stack. This remains a fidelity gap, not an exact font match.

## Boundaries

Enquiries are local previews. Alison conversations use illustrative records. Human approvals and qualified compliance decisions remain with people. The optional business name uses sessionStorage itcs-alison-business; motion uses itcs-motion. No live backend or AI integration is implied.
