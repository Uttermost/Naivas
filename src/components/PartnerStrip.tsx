import { PARTNERS } from "../data/mockData";

export default function PartnerStrip() {
  return (
    <div className="rounded-2xl border border-naivas-orange/20 bg-naivas-cream-dark/60 p-4">
      <p className="text-xs font-semibold text-naivas-ink/60">
        One balance, across IBL in Kenya
      </p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {PARTNERS.map((partner) => (
          <div
            key={partner.id}
            className="flex items-center gap-2 rounded-xl bg-white/70 p-3"
          >
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-naivas-green" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-naivas-ink">
                {partner.name}
              </p>
              <p className="text-[11px] leading-snug text-naivas-ink/55">
                {partner.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
