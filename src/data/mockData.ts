import type {
  ActivityEntry,
  CatalogReward,
  Offer,
  Partner,
  Tier,
} from "../types";

export const TIERS: Tier[] = [
  { name: "Silver", threshold: 0 },
  { name: "Gold", threshold: 3000 },
  { name: "Platinum", threshold: 7000 },
];

export const STARTING_BALANCE = 1840;
export const CUSTOMER_NAME = "Vincent";
export const CUSTOMER_INITIALS = "VM";

export const PARTNERS: Partner[] = [
  { id: "naivas", name: "Naivas", category: "Groceries & household" },
  { id: "harleys", name: "Harleys Pharmacy", category: "Health & wellness" },
];

// Stores an earn transaction can come from, tagged to a partner.
export const STORES = [
  { name: "Naivas Kilimani", category: "Groceries", partnerId: "naivas" },
  { name: "Naivas Two Rivers", category: "Household", partnerId: "naivas" },
  { name: "Naivas Express, Ngong Road", category: "Groceries", partnerId: "naivas" },
  { name: "Harleys Pharmacy, Yaya", category: "Health & wellness", partnerId: "harleys" },
];

export const PERSONALIZED_OFFERS: Offer[] = [
  {
    id: "offer-pampers",
    title: "KES 150 off Pampers, size 4",
    reason: "Because you buy diapers most weeks",
    cost: 300,
    category: "Groceries",
    personalized: true,
  },
  {
    id: "offer-brookside",
    title: "Buy 1 get 1, Brookside Milk 500ml",
    reason: "A regular in your basket",
    cost: 0,
    category: "Groceries",
    personalized: true,
  },
];

export const REWARDS_CATALOG: CatalogReward[] = [
  { id: "reward-200", title: "KES 200 off your shop", category: "Vouchers", cost: 400 },
  { id: "reward-flour", title: "Free 2kg Pembe Maize Flour", category: "Groceries", cost: 250 },
  { id: "reward-500", title: "KES 500 off your shop", category: "Vouchers", cost: 900 },
  { id: "reward-delivery", title: "Free delivery, next 3 orders", category: "Perks", cost: 150 },
];

export const INITIAL_ACTIVITY: ActivityEntry[] = [
  {
    id: "act-1",
    kind: "earn",
    title: "Naivas Kilimani",
    subtitle: "Groceries · Today",
    amountLabel: "KES 3,240",
    pointsDelta: 64,
    timestamp: Date.now() - 1000 * 60 * 60 * 3,
  },
  {
    id: "act-2",
    kind: "earn",
    title: "Harleys Pharmacy, Yaya",
    subtitle: "Health & wellness · Yesterday",
    amountLabel: "KES 1,120",
    pointsDelta: 22,
    timestamp: Date.now() - 1000 * 60 * 60 * 27,
  },
  {
    id: "act-3",
    kind: "redeem",
    title: "Redeemed: KES 200 voucher",
    subtitle: "Reward · 2 days ago",
    pointsDelta: -400,
    timestamp: Date.now() - 1000 * 60 * 60 * 49,
  },
  {
    id: "act-4",
    kind: "earn",
    title: "Naivas Two Rivers",
    subtitle: "Household · 5 days ago",
    amountLabel: "KES 1,860",
    pointsDelta: 37,
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 5,
  },
];

export const POINTS_PER_KES = 1 / 50;
