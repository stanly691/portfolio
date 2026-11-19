# Portfolio

Projects live in their own folders. The ITCS experiment is a React + TypeScript application built by Vite, with a lazy Three.js character renderer.

- Website: https://stanly691.github.io/portfolio/itcs/
- Design system: https://stanly691.github.io/portfolio/itcs/design-system/
- Folder alternative: https://stanly691.github.io/portfolio/itcs/?hero=folder

```sh
npm ci --prefix itcs
npm run dev
npm run build
```

The build runs TypeScript checks and packages the root index with `itcs/dist` under `dist/itcs`. The Pages workflow publishes this output on pushes to main. Binary media are stored directly in the repository; no API keys or external voice service are needed at runtime.

See `itcs/docs/design-system/MASTER.md` for the recreation specification and `itcs/docs/asset-records.md` for source recovery, licences and known fidelity gaps.
