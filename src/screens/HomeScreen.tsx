import { CUSTOMER_INITIALS, CUSTOMER_NAME } from "../data/mockData";
import BalanceCard from "../components/BalanceCard";
import PartnerStrip from "../components/PartnerStrip";
import OfferCard from "../components/OfferCard";
import type { TierStatus } from "../lib/tiers";
import type { Offer } from "../types";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function HomeScreen({
  balance,
  tierStatus,
  isScanning,
  onScan,
  onBrowseRewards,
  offers,
  isAnalyzing,
  highlightedOfferId,
  redeemedIds,
  onRedeemOffer,
}: {
  balance: number;
  tierStatus: TierStatus;
  isScanning: boolean;
  onScan: () => void;
  onBrowseRewards: () => void;
  offers: Offer[];
  isAnalyzing: boolean;
  highlightedOfferId: string | null;
  redeemedIds: Set<string>;
  onRedeemOffer: (offerId: string, title: string, cost: number) => void;
}) {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto px-5 pb-4">
      <div className="flex items-center justify-between pt-1">
        <div>
          <p className="text-sm text-naivas-ink/60">{greeting()},</p>
          <p className="text-lg font-bold text-naivas-ink">{CUSTOMER_NAME}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-naivas-cream-dark text-xs font-semibold text-naivas-ink">
          {CUSTOMER_INITIALS}
        </div>
      </div>

      <BalanceCard balance={balance} tierStatus={tierStatus} />
      <PartnerStrip />

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onScan}
          disabled={isScanning}
          className="rounded-xl bg-naivas-cream-dark/70 p-4 text-left transition active:scale-[0.98]"
        >
          <span
            className={`inline-block h-6 w-6 rounded-full bg-naivas-green ${
              isScanning ? "animate-scan" : ""
            }`}
          />
          <p className="mt-2 text-sm font-semibold text-naivas-ink">
            {isScanning ? "Scanning..." : "Scan receipt"}
          </p>
          <p className="text-[11px] text-naivas-ink/55">Earn from any till</p>
        </button>
        <button
          type="button"
          onClick={onBrowseRewards}
          className="rounded-xl bg-naivas-cream-dark/70 p-4 text-left transition active:scale-[0.98]"
        >
          <span className="inline-block h-6 w-6 rounded-full bg-naivas-orange" />
          <p className="mt-2 text-sm font-semibold text-naivas-ink">Browse rewards</p>
          <p className="text-[11px] text-naivas-ink/55">
            {balance.toLocaleString()} pts to spend
          </p>
        </button>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-naivas-ink">Picked for you</p>
          <span className="rounded-full bg-naivas-green/15 px-2 py-0.5 text-[10px] font-semibold text-naivas-green">
            Personalized
          </span>
        </div>
        <div className="mt-2 space-y-2">
          {isAnalyzing && (
            <div className="flex items-center gap-2 rounded-xl border border-naivas-green/30 bg-white/60 p-3">
              <span className="flex gap-1">
                <span className="h-1.5 w-1.5 animate-scan rounded-full bg-naivas-green [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 animate-scan rounded-full bg-naivas-green [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-scan rounded-full bg-naivas-green [animation-delay:300ms]" />
              </span>
              <p className="text-xs font-medium text-naivas-ink/60">
                Updating your picks from that basket...
              </p>
            </div>
          )}
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              redeemed={redeemedIds.has(offer.id)}
              highlighted={offer.id === highlightedOfferId}
              onRedeem={() => onRedeemOffer(offer.id, offer.title, offer.cost)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
