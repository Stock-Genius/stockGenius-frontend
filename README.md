# Stock Genius (Frontend)

Inventory and shop management UI for small businesses — track stock, sales, and shop profile in one dashboard.

**Pair with backend:** [stockGenius-server](https://github.com/Stock-Genius/stockGenius-server)

## Live demo

- Frontend: [https://stockgenius.vercel.app](https://stockgenius.vercel.app)
- API: deploy/run [stockGenius-server](https://github.com/Stock-Genius/stockGenius-server) and point `REACT_APP_SERVER_URL` at it

## Key features

- Landing / getting-started flow for new shop owners
- JWT-backed login and registration (shop name, address, profile image)
- Dark mode with local preference
- Inventory CRUD with buy/sell price, quantity, and unit (`kg` / `pcs`)
- Sell flow and transaction history views
- Out-of-stock highlighting
- Admin dashboard surface for elevated users
- Image uploads via backend upload API
- Responsive layout (React + Tailwind + MUI)

## Tech stack

| Layer | Choice |
| --- | --- |
| UI | React 18 (Create React App) |
| State | Redux + redux-thunk |
| Routing | React Router v6 |
| Styling | Tailwind CSS, MUI |
| HTTP | Axios |
| Hosting | Vercel (`stockgenius.vercel.app`) |

## Architecture (brief)

```
Browser (CRA/React + Redux)
    │  REST + JWT in localStorage
    ▼
stockGenius-server (Express + MongoDB)
```

Frontend stores `userInfo` (including token) in `localStorage`, calls `/api/users` and `/api/items` on the configured server URL, and routes protected pages under `/dashboard`.

## Getting started

### Prerequisites

- Node.js 18+
- Running instance of [stockGenius-server](https://github.com/Stock-Genius/stockGenius-server)

### Install

```bash
git clone https://github.com/Stock-Genius/stockGenius-frontend.git
cd stockGenius-frontend
npm install
```

### Environment

Create a `.env` in the project root (do **not** commit secrets):

```bash
REACT_APP_SERVER_URL=http://localhost:4000
```

| Variable | Required | Description |
| --- | --- | --- |
| `REACT_APP_SERVER_URL` | Yes | Base URL of stockGenius-server (no trailing path) |

### Run

```bash
npm start          # http://localhost:3000
npm test           # CRA test runner
npm run build      # production build → build/
```

## Deployment

- **Vercel:** connect this repo; set `REACT_APP_SERVER_URL` to your production API origin; build command `npm run build`, output `build`.
- Ensure the API allows your Vercel origin via CORS.

## Roadmap

- [ ] Replace CRA with Vite or Next.js
- [ ] TypeScript + RTK Query
- [ ] E2E tests (Playwright)
- [ ] Remove tracked `build/` artifacts from git
- [ ] Social preview / Open Graph image

## Author

**Hafiz Abdullah** — [GitHub](https://github.com/hafizabdullah1) · [hafizabdullah.site](https://hafizabdullah.site)

MIT license recommended (add `LICENSE` file).
