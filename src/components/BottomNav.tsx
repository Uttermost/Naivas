export type Screen = "home" | "rewards" | "activity";

const TABS: { id: Screen; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "rewards", label: "Rewards" },
  { id: "activity", label: "Activity" },
];

export default function BottomNav({
  active,
  onChange,
}: {
  active: Screen;
  onChange: (screen: Screen) => void;
}) {
  return (
    <div className="flex shrink-0 items-center justify-around border-t border-black/5 bg-naivas-cream/95 px-2 pb-6 pt-2 backdrop-blur">
      {TABS.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className="flex flex-col items-center gap-1 px-4 py-1"
          >
            <span
              className={`h-2 w-2 rounded-full transition-colors ${
                isActive ? "bg-naivas-orange" : "bg-transparent"
              }`}
            />
            <span
              className={`text-xs font-medium transition-colors ${
                isActive ? "text-naivas-orange" : "text-naivas-ink/40"
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
