import type { ActivityEntry } from "../types";

export default function ActivityItem({ entry }: { entry: ActivityEntry }) {
  const positive = entry.pointsDelta > 0;
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/70 p-3.5">
      <div className="min-w-0 pr-3">
        <p className="truncate text-sm font-semibold text-naivas-ink">
          {entry.title}
        </p>
        <p className="mt-0.5 text-xs text-naivas-ink/55">{entry.subtitle}</p>
      </div>
      <div className="shrink-0 text-right">
        {entry.amountLabel && (
          <p className="text-xs text-naivas-ink/55">{entry.amountLabel}</p>
        )}
        <p
          className={`text-sm font-semibold ${
            positive ? "text-naivas-green" : "text-naivas-ink/70"
          }`}
        >
          {positive ? "+" : ""}
          {entry.pointsDelta} pts
        </p>
      </div>
    </div>
  );
}
