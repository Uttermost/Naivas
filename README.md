# Naivas Digital Ecosystem — Demos

Interactive prototypes built by [Graph Technologies](https://graph.co.ke) alongside
the *Naivas Digital Ecosystem* proposal. Four separately scoped projects, connected
only through a shared rewards ledger — matching how they're proposed to Naivas.

| Demo | Project | What it shows |
|---|---|---|
| **Naivas Rewards** | Loyalty | Balance, tiering, personalized offers, cross-group ledger with Harleys |
| **Naivas Online** | eCommerce | Shop, cart, checkout, delivery/pickup, order history |
| **Naivas Delivery** | Fulfilment | Live order tracking, rider contact, delivery instructions |
| **Ops Dashboard** | Internal tooling | Branch queues, on-time rate, rider roster — live |

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

Pushing to `main` triggers the included GitHub Actions workflow
(`.github/workflows/deploy.yml`), which builds the site and publishes it to
GitHub Pages automatically. Enable Pages under **Settings → Pages → Source: GitHub Actions**
on first setup.

---
Graph Technologies Limited · graph.co.ke · Nairobi, Kenya
