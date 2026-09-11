import type { Offer } from "../types";

export default function OfferCard({
  offer,
  redeemed,
  onRedeem,
}: {
  offer: Offer;
  redeemed: boolean;
  onRedeem: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onRedeem}
      disabled={redeemed}
      className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${
        redeemed
          ? "border-black/5 bg-white/40 opacity-60"
          : "border-black/5 bg-white/80 hover:border-naivas-orange/40 active:scale-[0.99]"
      }`}
    >
      <div className="min-w-0 pr-3">
        <p className="truncate text-sm font-semibold text-naivas-ink">
          {offer.title}
        </p>
        <p className="mt-0.5 text-xs italic text-naivas-ink/55">
          {offer.reason}
        </p>
      </div>
      <span
        className={`shrink-0 text-sm font-semibold ${
          redeemed ? "text-naivas-ink/40" : "text-naivas-green"
        }`}
      >
        {redeemed ? "Redeemed" : offer.cost > 0 ? `${offer.cost} pts` : "Free"}
      </span>
    </button>
  );
}
