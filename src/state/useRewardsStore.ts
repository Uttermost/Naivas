import { useCallback, useRef, useState } from "react";
import {
  INITIAL_ACTIVITY,
  INITIAL_PERSONALIZED_OFFERS,
  OFFER_TEMPLATES,
  POINTS_PER_KES,
  STARTING_BALANCE,
  STORES,
} from "../data/mockData";
import type { ActivityEntry, Offer } from "../types";
import { getTierStatus } from "../lib/tiers";

export interface ToastState {
  id: number;
  message: string;
  tone: "success" | "error";
}

let idCounter = 100;
const nextId = () => `act-${idCounter++}`;
const nextOfferId = () => `offer-gen-${idCounter++}`;

export function useRewardsStore() {
  const [balance, setBalance] = useState(STARTING_BALANCE);
  const [activity, setActivity] = useState<ActivityEntry[]>(INITIAL_ACTIVITY);
  const [personalizedOffers, setPersonalizedOffers] = useState<Offer[]>(
    INITIAL_PERSONALIZED_OFFERS
  );
  const [redeemedIds, setRedeemedIds] = useState<Set<string>>(new Set());
  const [isScanning, setIsScanning] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [highlightedOfferId, setHighlightedOfferId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const highlightTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string, tone: ToastState["tone"] = "success") => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), message, tone });
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const tierStatus = getTierStatus(balance);

  const redeem = useCallback(
    (rewardId: string, title: string, cost: number, category: string) => {
      if (redeemedIds.has(rewardId)) {
        showToast("Already redeemed", "error");
        return;
      }
      if (cost > 0 && balance < cost) {
        showToast("Not enough points for this reward", "error");
        return;
      }

      setBalance((b) => b - cost);
      setRedeemedIds((prev) => new Set(prev).add(rewardId));
      setActivity((prev) => [
        {
          id: nextId(),
          kind: "redeem",
          title: `Redeemed: ${title}`,
          subtitle: `${category} · Just now`,
          pointsDelta: -cost,
          timestamp: Date.now(),
        },
        ...prev,
      ]);
      showToast(cost > 0 ? `Redeemed for ${cost} pts` : "Reward claimed");
    },
    [balance, redeemedIds, showToast]
  );

  const scanReceipt = useCallback(() => {
    if (isScanning) return;
    setIsScanning(true);
    window.setTimeout(() => {
      const store = STORES[Math.floor(Math.random() * STORES.length)];
      const amount = Math.round((400 + Math.random() * 3800) / 10) * 10;
      const points = Math.max(1, Math.round(amount * POINTS_PER_KES));

      setBalance((b) => b + points);
      setActivity((prev) => [
        {
          id: nextId(),
          kind: "earn",
          title: store.name,
          subtitle: `${store.category} · Just now`,
          amountLabel: `KES ${amount.toLocaleString()}`,
          pointsDelta: points,
          timestamp: Date.now(),
        },
        ...prev,
      ]);
      setIsScanning(false);
      showToast(`+${points} pts earned at ${store.name}`);

      // "Basket-aware" personalization: react to what was just bought by
      // surfacing a fresh offer for that store's category, not a static list.
      setIsAnalyzing(true);
      window.setTimeout(() => {
        const candidates = OFFER_TEMPLATES[store.category];
        if (candidates && candidates.length > 0) {
          const template = candidates[Math.floor(Math.random() * candidates.length)];
          const newOffer: Offer = {
            id: nextOfferId(),
            title: template.title,
            reason: template.reason(store.name),
            cost: template.cost,
            category: "Groceries",
            personalized: true,
          };
          setPersonalizedOffers((prev) =>
            [newOffer, ...prev.filter((o) => o.title !== newOffer.title)].slice(0, 3)
          );
          setHighlightedOfferId(newOffer.id);
          if (highlightTimer.current) clearTimeout(highlightTimer.current);
          highlightTimer.current = setTimeout(() => setHighlightedOfferId(null), 6000);
          showToast(`New pick for you: ${newOffer.title}`);
        }
        setIsAnalyzing(false);
      }, 1100);
    }, 1300);
  }, [isScanning, showToast]);

  return {
    balance,
    activity,
    personalizedOffers,
    redeemedIds,
    isScanning,
    isAnalyzing,
    highlightedOfferId,
    toast,
    tierStatus,
    redeem,
    scanReceipt,
  };
}
