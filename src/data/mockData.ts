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

export const INITIAL_PERSONALIZED_OFFERS: Offer[] = [
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

// Candidate offers the "engine" can surface after a scan, keyed by store
// category — a stand-in for basket-aware recommendation logic.
interface OfferTemplate {
  title: string;
  reason: (storeName: string) => string;
  cost: number;
}

export const OFFER_TEMPLATES: Record<string, OfferTemplate[]> = {
  Groceries: [
    {
      title: "KES 100 off 2kg Pembe Maize Flour",
      reason: (store) => `Restocked at ${store} — flour's usually in your basket`,
      cost: 200,
    },
    {
      title: "10% off Brookside Fresh Milk 1L",
      reason: (store) => `A regular pickup at ${store}`,
      cost: 150,
    },
    {
      title: "KES 80 off Tropikal Cooking Oil 2L",
      reason: (store) => `Due for a restock, based on your basket at ${store}`,
      cost: 180,
    },
    {
      title: "KES 60 off Ketepa Tea 500g",
      reason: (store) => `A staple in your recent baskets at ${store}`,
      cost: 120,
    },
    {
      title: "5% off your next Naivas shop",
      reason: (store) => `Frequent shopper at ${store} this month`,
      cost: 250,
    },
  ],
  Household: [
    {
      title: "KES 80 off Omo Detergent 1kg",
      reason: (store) => `Household run at ${store} — due for a restock`,
      cost: 180,
    },
    {
      title: "Buy 1 get 1, Kim Toilet Paper 4-pack",
      reason: (store) => `A regular in your household basket at ${store}`,
      cost: 0,
    },
    {
      title: "15% off Jik Bleach 750ml",
      reason: (store) => `Cleaning supplies running low, based on ${store}`,
      cost: 140,
    },
  ],
  "Health & wellness": [
    {
      title: "Buy 1 get 1, Panadol Extra",
      reason: (store) => `Picked up at ${store} — stock up while it's fresh`,
      cost: 0,
    },
    {
      title: "15% off Multivitamins",
      reason: (store) => `Health visit at ${store} today`,
      cost: 220,
    },
    {
      title: "KES 100 off Dettol Antiseptic 250ml",
      reason: (store) => `Picked up at ${store} recently`,
      cost: 160,
    },
  ],
};

export const REWARDS_CATALOG: CatalogReward[] = [
  { id: "reward-200", title: "KES 200 off your shop", category: "Vouchers", cost: 400 },
  { id: "reward-flour", title: "Free 2kg Pembe Maize Flour", category: "Groceries", cost: 250 },
  { id: "reward-500", title: "KES 500 off your shop", category: "Vouchers", cost: 900 },
  { id: "reward-delivery", title: "Free delivery, next 3 orders", category: "Perks", cost: 150 },
  { id: "reward-1000", title: "KES 1,000 off your shop", category: "Vouchers", cost: 1600 },
  { id: "reward-sugar", title: "Free 1kg Sugar", category: "Groceries", cost: 180 },
  { id: "reward-harleys", title: "10% off your next Harleys Pharmacy visit", category: "Perks", cost: 300 },
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
