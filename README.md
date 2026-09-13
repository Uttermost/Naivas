# Naivas Digital Ecosystem — Demos

Four independent, interactive prototypes built by [Graph Technologies](https://graph.co.ke)
alongside the *Naivas Digital Ecosystem* proposal — each deployed as its own standalone page,
matching how the three projects are scoped: separately, connected only through a shared
rewards ledger.

| Demo | URL path | Project | What it shows |
|---|---|---|---|
| **Naivas Rewards** | `/rewards/` | Loyalty | Balance, tiering, personalized offers, cross-group ledger with Harleys |
| **Naivas Online** | `/online/` | eCommerce | Shop, cart, checkout, delivery/pickup, order history |
| **Naivas Delivery** | `/delivery/` | Fulfilment | Live order tracking, rider contact, delivery instructions |
| **Ops Dashboard** | `/ops-dashboard/` | Internal tooling | Branch queues, on-time rate, rider roster — live |

## Run locally

```bash
npm install
npm run dev
```

Each demo is reachable individually, e.g. `http://localhost:5173/rewards/`.

## Build

```bash
npm run build
npm run preview
```

## Deploy

Pushing to `main` triggers the included GitHub Actions workflow
(`.github/workflows/deploy.yml`), which builds all four pages and publishes them to
GitHub Pages automatically. Enable Pages under **Settings → Pages → Source: GitHub Actions**
on first setup.

---
Graph Technologies Limited · graph.co.ke · Nairobi, Kenya
