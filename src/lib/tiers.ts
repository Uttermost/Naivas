import { TIERS } from "../data/mockData";
import type { Tier, TierName } from "../types";

export interface TierStatus {
  current: Tier;
  next: Tier | null;
  progress: number; // 0..1 toward next tier
  pointsToNext: number;
}

export function getTierStatus(points: number): TierStatus {
  let current: Tier = TIERS[0];
  let next: Tier | null = null;

  for (let i = 0; i < TIERS.length; i++) {
    if (points >= TIERS[i].threshold) {
      current = TIERS[i];
      next = TIERS[i + 1] ?? null;
    }
  }

  if (!next) {
    return { current, next: null, progress: 1, pointsToNext: 0 };
  }

  const span = next.threshold - current.threshold;
  const progressed = points - current.threshold;
  return {
    current,
    next,
    progress: Math.max(0, Math.min(1, progressed / span)),
    pointsToNext: Math.max(0, next.threshold - points),
  };
}

export const TIER_BADGE_CLASSES: Record<TierName, string> = {
  Silver: "bg-tier-silver/20 text-tier-silver border-tier-silver/40",
  Gold: "bg-tier-gold/20 text-tier-gold border-tier-gold/40",
  Platinum: "bg-tier-platinum/20 text-tier-platinum border-tier-platinum/40",
};
