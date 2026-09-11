import ActivityItem from "../components/ActivityItem";
import type { ActivityEntry } from "../types";

export default function ActivityScreen({ activity }: { activity: ActivityEntry[] }) {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto px-5 pb-4">
      <div className="pt-1">
        <p className="text-lg font-bold text-naivas-ink">Activity</p>
        <p className="text-sm text-naivas-ink/60">Points earned and redeemed</p>
      </div>

      <div className="space-y-2">
        {activity.map((entry) => (
          <ActivityItem key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}
