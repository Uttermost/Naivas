export type TierName = "Silver" | "Gold" | "Platinum";

export interface Tier {
  name: TierName;
  threshold: number; // points required to reach this tier
}

export interface Partner {
  id: string;
  name: string;
  category: string;
}

export type OfferCategory = "Vouchers" | "Groceries" | "Perks";

export interface Offer {
  id: string;
  title: string;
  reason: string;
  cost: number; // points; 0 = free claim
  category: OfferCategory;
  personalized: true;
}

export interface CatalogReward {
  id: string;
  title: string;
  category: OfferCategory;
  cost: number;
}

export type ActivityKind = "earn" | "redeem";

export interface ActivityEntry {
  id: string;
  kind: ActivityKind;
  title: string;
  subtitle: string;
  amountLabel?: string; // e.g. "KES 3,240" for earns
  pointsDelta: number; // positive for earn, negative for redeem
  timestamp: number;
}
