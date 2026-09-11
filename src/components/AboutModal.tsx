import { TIERS } from "../data/mockData";
import type { TierStatus } from "../lib/tiers";
import type { TierName } from "../types";

const TIER_PERKS: Record<TierName, string[]> = {
  Silver: ["1 pt for every KES 50 spent", "Redeem points any time, before or at checkout"],
  Gold: ["Everything in Silver", "Priority checkout lane in store", "Bonus points in your birthday month"],
  Platinum: ["Everything in Gold", "Free delivery on every order", "Dedicated member support line"],
};

export default function AboutModal({
  tierStatus,
  onClose,
}: {
  tierStatus: TierStatus;
  onClose: () => void;
}) {
  return (
    <div
      className="absolute inset-0 z-40 flex items-end bg-black/40"
      onClick={onClose}
    >
      <div
        className="max-h-[85%] w-full overflow-y-auto rounded-t-3xl bg-naivas-cream p-6 pb-10 text-naivas-ink shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-black/10" />
        <h2 className="text-xl font-bold">How Naivas Rewards works</h2>
        <p className="mt-1 text-xs text-naivas-ink/50">
          Member since 14 Mar 2024 · ID NR-48213
        </p>

        <p className="mt-4 text-sm leading-relaxed text-naivas-ink/70">
          One points balance for everyday grocery and pharmacy spend — earn
          instantly when you shop, then spend it on vouchers, groceries, and
          perks whenever you like.
        </p>

        <div className="mt-5 rounded-2xl border border-naivas-orange/30 bg-white/60 p-4">
          <p className="text-sm font-semibold">One balance, two places to use it</p>
          <p className="mt-1 text-xs leading-relaxed text-naivas-ink/60">
            Naivas and Harleys Pharmacy share the same points balance — every
            grocery run and pharmacy visit adds to one account, no separate
            card to carry.
          </p>
        </div>

        <div className="mt-3 rounded-2xl border border-naivas-green/30 bg-white/60 p-4">
          <p className="text-sm font-semibold">Offers picked for your basket</p>
          <p className="mt-1 text-xs leading-relaxed text-naivas-ink/60">
            "Picked for you" offers are based on what you actually buy, with
            a plain-language reason attached to each one — not a flat,
            storewide discount.
          </p>
        </div>

        <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-naivas-ink/50">
          Membership tiers
        </p>
        <div className="mt-2 space-y-2">
          {TIERS.map((tier) => {
            const isCurrent = tier.name === tierStatus.current.name;
            return (
              <div
                key={tier.name}
                className={`rounded-xl border p-3 ${
                  isCurrent
                    ? "border-naivas-orange/40 bg-white"
                    : "border-black/5 bg-white/50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">{tier.name}</p>
                  <span className="text-[11px] text-naivas-ink/45">
                    {tier.threshold.toLocaleString()}+ pts
                  </span>
                  {isCurrent && (
                    <span className="ml-auto rounded-full bg-naivas-orange/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-naivas-orange">
                      Your tier
                    </span>
                  )}
                </div>
                <ul className="mt-1.5 space-y-0.5 text-xs text-naivas-ink/60">
                  {TIER_PERKS[tier.name].map((perk) => (
                    <li key={perk}>· {perk}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mt-5 text-[11px] leading-relaxed text-naivas-ink/45">
          Points expire 12 months after your last purchase. Terms and
          conditions apply — see in-store or naivas.co.ke for full details.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-naivas-ink py-3 text-sm font-semibold text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
}
