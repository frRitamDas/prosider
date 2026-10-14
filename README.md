# ProSider

ProSider is an independent, responsive catalogue for classic browser and arcade games. The library indexes real playable titles from WASM Arcade and provides a cleaner ProSider-branded browsing and launch experience.

## Stack

- Next.js App Router, React 19, TypeScript
- Responsive CSS design system
- Search and system filters
- Static game routes generated from the catalogue
- Direct external game pages and optional embedded play frames
- GitHub Actions typecheck and production-build validation

## Getting started

Requirements: Node.js 20.9+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Game hosting and attribution

The current catalogue includes verified game-page routes from [WASM Arcade](https://wasmarcade.com/). ProSider does not bundle copyrighted game files, ROMs, BIOS files, game engines, or proprietary artwork. Each title opens its original provider page; an embedded frame is provided where the provider permits it, with a direct launch link as a fallback.

Game titles, trademarks, engines, and game data belong to their respective rights holders and providers. ProSider is independent and is not affiliated with or endorsed by WASM Arcade or the original game publishers. The source provider may change, restrict embedding, or become unavailable. Browser requirements differ by title; some PC ports require a capable desktop browser, WebGL/WebGPU, substantial memory, and keyboard controls.

## Deploy

### Vercel

Import this repository into Vercel. Framework: Next.js. Build command: `npm run build`. Install command: `npm install`. No environment variables are required for the current catalogue. Connect the `main` branch for automatic deployments on pushes.

### Render

Create a **Web Service** (not a Static Site). Build command: `npm install && npm run build`. Start command: `npm run start`. Use Node.js 20.9 or newer. A free Render web service may spin down after inactivity.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run typecheck` — TypeScript validation
- `npm run lint` — lint project

## Licence

Review and add the licence you intend to use for your own source code before public distribution. Third-party dependencies and linked game content remain subject to their respective licences and terms.
