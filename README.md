# Naivas Rewards — Concept Demo

An interactive, mobile-simulated prototype of the **Naivas Rewards** loyalty
app concept, built from the [Graph Technologies concept document](.) prepared
for Naivas & the wider IBL Group.

This is a clickable demo, not a production app — there's no backend. All
state (points balance, tier, activity, redemptions) lives in memory for the
session and resets on reload.

## What it demonstrates

- **Real-time earning & redemption** — tap *Scan receipt* to simulate a
  purchase at a random Naivas or Harleys Pharmacy store; points land
  instantly and the tier progress bar updates live.
- **Tiering** — a Silver → Gold → Platinum ladder driven by points balance.
- **Cross-group rewards** — one balance shared across Naivas and Harleys
  Pharmacy, shown via the partner strip and mixed activity feed.
- **Personalized offers** — basket-aware "Picked for you" offers with a
  plain-language reason attached to each one.
- **Rewards catalog & activity history** — browse/redeem vouchers, groceries
  and perks; every earn and redeem is logged to a transparent activity feed.

Tap the **•••** menu in the header for a summary of the underlying concept
(the two core ideas and the phased rollout).

## Running locally

```bash
npm install
npm run dev
```

Then open the printed local URL. The UI is designed around a phone-frame
viewport, so a narrow browser window (or your browser's device toolbar)
gives the most accurate view.

## Stack

Vite + React + TypeScript + Tailwind CSS v4. No backend, no external APIs —
all data is in `src/data/mockData.ts`.
