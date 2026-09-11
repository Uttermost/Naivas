import { TIER_CARD_CLASSES, type TierStatus } from "../lib/tiers";

export default function BalanceCard({
  balance,
  tierStatus,
}: {
  balance: number;
  tierStatus: TierStatus;
}) {
  const { current, next, progress, pointsToNext } = tierStatus;
  const card = TIER_CARD_CLASSES[current.name];

  return (
    <div
      className={`rounded-2xl bg-gradient-to-br p-5 text-white shadow-lg ${card.gradient} ${card.shadow}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white/85">
          Naivas Rewards balance
        </span>
        <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold">
          {current.name}
        </span>
      </div>
      <div className="mt-1 text-3xl font-bold tabular-nums">
        {balance.toLocaleString()} pts
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-white/85">
          <span>{current.name}</span>
          <span>
            {next ? `${next.name} at ${next.threshold.toLocaleString()} pts` : "Top tier"}
          </span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/25">
          <div
            className="h-full rounded-full bg-white transition-all duration-500"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
        {next && (
          <p className="mt-1.5 text-[11px] text-white/75">
            {pointsToNext.toLocaleString()} pts to {next.name}
          </p>
        )}
      </div>
    </div>
  );
}
