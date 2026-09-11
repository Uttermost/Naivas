import type { CatalogReward } from "../types";

export default function RewardRow({
  reward,
  balance,
  redeemed,
  onRedeem,
}: {
  reward: CatalogReward;
  balance: number;
  redeemed: boolean;
  onRedeem: () => void;
}) {
  const affordable = balance >= reward.cost;
  return (
    <button
      type="button"
      onClick={onRedeem}
      disabled={redeemed}
      className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
        redeemed
          ? "border-black/5 bg-white/40 opacity-60"
          : "border-black/5 bg-white/80 hover:border-naivas-orange/40 active:scale-[0.99]"
      }`}
    >
      <div className="min-w-0 pr-3">
        <p className="truncate text-sm font-semibold text-naivas-ink">
          {reward.title}
        </p>
        <p className="mt-0.5 text-xs text-naivas-ink/55">{reward.category}</p>
      </div>
      <span
        className={`shrink-0 text-sm font-semibold ${
          redeemed
            ? "text-naivas-ink/40"
            : affordable
              ? "text-naivas-green"
              : "text-naivas-ink/35"
        }`}
      >
        {redeemed ? "Redeemed" : `${reward.cost} pts`}
      </span>
    </button>
  );
}
