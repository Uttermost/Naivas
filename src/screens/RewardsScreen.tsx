import { useState } from "react";
import { REWARDS_CATALOG } from "../data/mockData";
import RewardRow from "../components/RewardRow";
import type { OfferCategory } from "../types";

const FILTERS: ("All" | OfferCategory)[] = ["All", "Vouchers", "Groceries", "Perks"];

export default function RewardsScreen({
  balance,
  redeemedIds,
  onRedeem,
}: {
  balance: number;
  redeemedIds: Set<string>;
  onRedeem: (rewardId: string, title: string, cost: number, category: string) => void;
}) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const rewards =
    filter === "All"
      ? REWARDS_CATALOG
      : REWARDS_CATALOG.filter((r) => r.category === filter);

  return (
    <div className="flex-1 space-y-4 overflow-y-auto px-5 pb-4">
      <div className="pt-1">
        <p className="text-lg font-bold text-naivas-ink">Redeem rewards</p>
        <p className="text-sm text-naivas-ink/60">
          You have {balance.toLocaleString()} points to spend
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                active
                  ? "bg-naivas-ink text-white"
                  : "bg-naivas-cream-dark/70 text-naivas-ink/70"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <div className="space-y-2">
        {rewards.map((reward) => (
          <RewardRow
            key={reward.id}
            reward={reward}
            balance={balance}
            redeemed={redeemedIds.has(reward.id)}
            onRedeem={() => onRedeem(reward.id, reward.title, reward.cost, reward.category)}
          />
        ))}
      </div>
    </div>
  );
}
