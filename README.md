# ProSider

ProSider is a responsive browser gaming portal with a dark, colorful arcade-inspired interface and original lightweight games that run locally in the browser.

## Stack

- Next.js App Router + React + TypeScript
- CSS responsive design system
- Canvas-based browser gameplay
- LocalStorage high scores
- Static game catalogue with generated game routes

## Getting started

Requirements: Node.js 20.9+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run typecheck` — TypeScript validation
- `npm run lint` — lint project

## Deploy

### Vercel

Import this repository into Vercel. Framework: Next.js. Build command: `npm run build`. Install command: `npm install`. No environment variables are required for the current version. Pushes to the connected production branch deploy automatically.

### Render

Create a **Web Service** (not a Static Site, because this is a Next.js App Router application). Build command: `npm install && npm run build`. Start command: `npm run start`. Set `NODE_VERSION` to a supported Node.js 20+ release. Note that a free Render web service can spin down after inactivity.

## Games

The current game collection contains original, small browser-playable prototypes. The player is modular and can be extended with properly licensed engines such as Ruffle or EmulatorJS. Commercial game files, ROMs, and proprietary artwork are not bundled.

## License

Source code is provided for the ProSider project. Third-party dependencies remain subject to their respective licenses. Review and add the license you want to use before publicly distributing the project.
