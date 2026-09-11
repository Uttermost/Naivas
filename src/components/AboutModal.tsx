export default function AboutModal({ onClose }: { onClose: () => void }) {
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
        <p className="text-xs font-semibold uppercase tracking-wide text-naivas-orange">
          Concept demo
        </p>
        <h2 className="mt-1 text-xl font-bold">Naivas Rewards</h2>
        <p className="mt-2 text-sm leading-relaxed text-naivas-ink/70">
          This prototype sits alongside the existing NaivasCard / Reward Card
          programme — it doesn't replace it. It's the app-native layer that
          lets customers see, earn, and spend their rewards in real time.
        </p>

        <div className="mt-5 space-y-3">
          <div className="rounded-2xl border border-naivas-orange/30 bg-white/60 p-4">
            <span className="inline-block rounded-full bg-naivas-orange/15 px-2 py-0.5 text-[11px] font-semibold text-naivas-orange">
              Cross-group
            </span>
            <p className="mt-2 text-sm font-semibold">One balance, across IBL in Kenya</p>
            <p className="mt-1 text-xs leading-relaxed text-naivas-ink/60">
              Naivas and Harleys Pharmacy share one points balance — everyday
              grocery and pharmacy spend become a single loyalty relationship.
            </p>
          </div>
          <div className="rounded-2xl border border-naivas-green/30 bg-white/60 p-4">
            <span className="inline-block rounded-full bg-naivas-green/15 px-2 py-0.5 text-[11px] font-semibold text-naivas-green">
              AI-enabled
            </span>
            <p className="mt-2 text-sm font-semibold">Personalized, not flat</p>
            <p className="mt-1 text-xs leading-relaxed text-naivas-ink/60">
              Basket-aware offers built from purchase history, with a
              plain-language reason attached to each one.
            </p>
          </div>
        </div>

        <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-naivas-ink/50">
          Phased approach
        </p>
        <ol className="mt-2 space-y-2 text-sm">
          <li className="rounded-xl bg-white/50 p-3">
            <span className="font-semibold">1. Foundation —</span>{" "}
            <span className="text-naivas-ink/70">
              app-native view onto the existing Reward Card balance
            </span>
          </li>
          <li className="rounded-xl bg-white/50 p-3">
            <span className="font-semibold">2. Personalization —</span>{" "}
            <span className="text-naivas-ink/70">
              basket-aware offers, tiering, lapsed-member nudges
            </span>
          </li>
          <li className="rounded-xl bg-white/50 p-3">
            <span className="font-semibold">3. Cross-group —</span>{" "}
            <span className="text-naivas-ink/70">
              shared balance across Naivas and Harleys, till-side tooling
            </span>
          </li>
        </ol>

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
