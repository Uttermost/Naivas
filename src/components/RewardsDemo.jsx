import React, { useState, useEffect, useRef } from "react";

/* ============================================================
   PROJECT 1 OF 3 — NAIVAS REWARDS (Loyalty)
   Standalone loyalty platform: balance, tiering, personalized
   offers, cross-group ledger with Harleys. No shop/checkout —
   that's Naivas Online, a separate project.
   ============================================================ */

const colors = {
  orange: "#E0621B", green: "#3C7A4E", greenLight: "#E9F1EA",
  cream: "#FBF6EE", sand: "#F1E7D6", ink: "#2B2620",
  inkSoft: "#6B645A", gold: "#C9A227", line: "#E7DECB",
};

const TIERS = [
  { name: "Bronze", min: 0 }, { name: "Silver", min: 1000 },
  { name: "Gold", min: 3000 }, { name: "Platinum", min: 6000 },
];
function tierFor(points) {
  let current = TIERS[0];
  for (const t of TIERS) if (points >= t.min) current = t;
  const idx = TIERS.indexOf(current);
  const next = TIERS[idx + 1] || null;
  const progress = next ? Math.min(100, Math.round(((points - current.min) / (next.min - current.min)) * 100)) : 100;
  return { name: current.name, next, progress };
}

const rewardsCatalog = [
  { id: 1, name: "KES 200 off your shop", cost: 400, tag: "Popular" },
  { id: 2, name: "Free 2kg Pembe Maize Flour", cost: 250, tag: null },
  { id: 3, name: "KES 500 off your shop", cost: 900, tag: null },
  { id: 4, name: "Free delivery, next 3 orders", cost: 150, tag: "New" },
];
const personalizedOffers = [
  { id: 1, name: "KES 150 off Pampers, size 4", cost: 300, reason: "You buy diapers most weeks" },
  { id: 2, name: "Buy 1 get 1, Brookside Milk 500ml", cost: 60, reason: "A regular in your basket" },
];
const groupPartners = [
  { id: 1, name: "Naivas", sub: "Groceries & household", initials: "NV" },
  { id: 2, name: "Harleys Pharmacy", sub: "Health & wellness", initials: "HP" },
];
const scanSources = [
  { label: "Naivas Kilimani", sub: "Groceries" },
  { label: "Naivas Two Rivers", sub: "Household" },
  { label: "Naivas Express, Ngong Rd", sub: "Fresh produce" },
];
const initialActivity = [
  { id: 1, label: "Naivas Kilimani", sub: "Groceries", amount: "KES 3,240", points: "+64 pts", date: "Today" },
  { id: 2, label: "Harleys Pharmacy, Yaya", sub: "Health & wellness", amount: "KES 1,120", points: "+22 pts", date: "Yesterday" },
  { id: 3, label: "Redeemed: KES 200 voucher", sub: "Reward", amount: "-400 pts", points: "-400 pts", date: "2 days ago" },
];

function Pill({ children, tone = "orange" }) {
  const bg = tone === "orange" ? colors.orange : tone === "green" ? colors.green : colors.gold;
  return <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: bg, color: "#fff" }}>{children}</span>;
}
function Toast({ message }) {
  if (!message) return null;
  return <div className="absolute left-1/2 -translate-x-1/2 bottom-24 px-4 py-2.5 rounded-full text-sm font-semibold shadow-lg z-20" style={{ background: colors.ink, color: "#fff" }}>{message}</div>;
}

function HomeScreen({ points, tier, onScan, onRedeem, scanning }) {
  return (
    <div className="flex flex-col gap-5 px-5 pt-5 pb-24">
      <div className="flex items-center justify-between">
        <div><p className="text-sm" style={{ color: colors.inkSoft }}>Good evening,</p><p className="text-lg font-bold" style={{ color: colors.ink }}>Vincent</p></div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: colors.sand, color: colors.ink }}>VM</div>
      </div>

      <div className="rounded-2xl p-5 flex flex-col gap-3" style={{ background: colors.orange, color: "#fff" }}>
        <div className="flex items-center justify-between"><span className="text-sm font-medium opacity-90">Naivas Rewards balance</span><Pill tone="gold">{tier.name}</Pill></div>
        <p className="text-4xl font-extrabold tracking-tight">{points.toLocaleString()} pts</p>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs opacity-90"><span>{tier.name}</span><span>{tier.next ? `${tier.next.name} at ${tier.next.min.toLocaleString()} pts` : "Top tier"}</span></div>
          <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.35)" }}>
            <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: `${tier.progress}%`, background: "#fff" }} />
          </div>
        </div>
      </div>

      <div className="rounded-xl p-3.5 flex flex-col gap-2.5" style={{ background: colors.sand }}>
        <p className="text-xs font-semibold" style={{ color: colors.inkSoft }}>One balance, across IBL in Kenya</p>
        <div className="flex gap-2.5">
          {groupPartners.map((p) => (
            <div key={p.id} className="flex items-center gap-2 rounded-lg px-2.5 py-2 flex-1" style={{ background: "#fff", border: `1px solid ${colors.line}` }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: colors.green, color: "#fff" }}>{p.initials}</div>
              <div className="flex flex-col leading-tight"><span className="text-xs font-semibold" style={{ color: colors.ink }}>{p.name}</span><span className="text-[10px]" style={{ color: colors.inkSoft }}>{p.sub}</span></div>
            </div>
          ))}
        </div>
        <p className="text-[10px]" style={{ color: colors.inkSoft }}>Earning and redeeming happen in each business's own app — this ledger just keeps one balance in sync across both.</p>
      </div>

      <button onClick={onScan} disabled={scanning} className="rounded-xl p-4 flex items-center gap-3 text-left active:scale-[0.98] transition-transform w-full" style={{ background: colors.greenLight, opacity: scanning ? 0.7 : 1 }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: colors.green }}><ReceiptIcon /></div>
        <div><span className="text-sm font-semibold block" style={{ color: colors.ink }}>{scanning ? "Scanning..." : "Scan receipt"}</span><span className="text-xs" style={{ color: colors.inkSoft }}>Earn points from any till, any branch</span></div>
      </button>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2"><p className="text-base font-bold" style={{ color: colors.ink }}>Picked for you</p><Pill tone="green">Personalized</Pill></div>
        <div className="flex flex-col gap-2.5">
          {personalizedOffers.map((o) => (
            <div key={o.id} className="flex items-center justify-between rounded-xl p-3.5" style={{ border: `1px solid ${colors.line}`, background: "#fff" }}>
              <div className="flex flex-col gap-0.5"><p className="text-sm font-semibold" style={{ color: colors.ink }}>{o.name}</p><p className="text-xs italic" style={{ color: colors.inkSoft }}>Because {o.reason.toLowerCase()}</p></div>
              <button onClick={() => onRedeem(o.name, o.cost)} className="text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap ml-3 active:scale-[0.96] transition-transform" style={{ background: colors.green, color: "#fff" }}>{o.cost > 0 ? `${o.cost} pts` : "Free"}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RewardsScreen({ points, onRedeem }) {
  return (
    <div className="flex flex-col gap-4 px-5 pt-5 pb-24">
      <div><p className="text-lg font-bold" style={{ color: colors.ink }}>Redeem rewards</p><p className="text-sm" style={{ color: colors.inkSoft }}>You have {points.toLocaleString()} points to spend</p></div>
      <div className="flex flex-col gap-2.5">
        {rewardsCatalog.map((r) => (
          <div key={r.id} className="flex items-center justify-between rounded-xl p-3.5" style={{ border: `1px solid ${colors.line}`, background: "#fff" }}>
            <div className="flex flex-col gap-0.5"><div className="flex items-center gap-2"><p className="text-sm font-semibold" style={{ color: colors.ink }}>{r.name}</p>{r.tag && <Pill tone={r.tag === "Popular" ? "orange" : "green"}>{r.tag}</Pill>}</div></div>
            <button onClick={() => onRedeem(r.name, r.cost)} className="text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap ml-3 active:scale-95 transition-transform" style={{ background: points >= r.cost ? colors.orange : colors.line, color: points >= r.cost ? "#fff" : colors.inkSoft }}>{r.cost} pts</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityScreen({ activity }) {
  return (
    <div className="flex flex-col gap-4 px-5 pt-5 pb-24">
      <div><p className="text-lg font-bold" style={{ color: colors.ink }}>Activity</p><p className="text-sm" style={{ color: colors.inkSoft }}>Points earned and redeemed, across Naivas & Harleys</p></div>
      <div className="flex flex-col">
        {activity.map((a, i) => (
          <div key={a.id} className="flex items-center justify-between py-3.5" style={{ borderBottom: i < activity.length - 1 ? `1px solid ${colors.line}` : "none" }}>
            <div className="flex flex-col gap-0.5"><p className="text-sm font-semibold" style={{ color: colors.ink }}>{a.label}</p><p className="text-xs" style={{ color: colors.inkSoft }}>{a.sub} · {a.date}</p></div>
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-sm font-semibold" style={{ color: colors.ink }}>{a.amount}</span>
              {a.points && <span className="text-xs font-bold" style={{ color: a.points.startsWith("-") ? colors.orange : colors.green }}>{a.points}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReceiptIcon() { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 3h12v18l-2.5-1.5L13 21l-2.5-1.5L8 21l-2-1.5V3Z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 8h6M9 12h6M9 16h3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" /></svg>); }
function TabIcon({ type, active }) {
  const c = active ? colors.orange : colors.inkSoft;
  if (type === "home") return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 11.5 12 4l8 7.5" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 10v9h12v-9" stroke={c} strokeWidth="1.8" strokeLinejoin="round" /></svg>);
  if (type === "rewards") return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="4" y="9" width="16" height="11" rx="1" stroke={c} strokeWidth="1.8" /><path d="M4 9h16v3H4z" stroke={c} strokeWidth="1.8" strokeLinejoin="round" /></svg>);
  return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 12h4l2 5 4-14 2 9h4" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>);
}

export default function NaivasRewardsPrototype() {
  const [tab, setTab] = useState("home");
  const [points, setPoints] = useState(1840);
  const [activity, setActivity] = useState(initialActivity);
  const [toast, setToast] = useState(null);
  const [scanning, setScanning] = useState(false);
  const nextId = useRef(1000);

  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 2200); return () => clearTimeout(t); }, [toast]);

  const tier = tierFor(points);
  function pushActivity(entry) { nextId.current += 1; setActivity((prev) => [{ id: nextId.current, date: "Just now", ...entry }, ...prev]); }

  function handleScan() {
    if (scanning) return;
    setScanning(true);
    setTimeout(() => {
      const src = scanSources[Math.floor(Math.random() * scanSources.length)];
      const spend = 400 + Math.floor(Math.random() * 2600);
      const earned = Math.round(spend / 50);
      setPoints((p) => p + earned);
      pushActivity({ label: src.label, sub: src.sub, amount: `KES ${spend.toLocaleString()}`, points: `+${earned} pts` });
      setScanning(false);
      setToast(`Receipt scanned — +${earned} pts earned`);
    }, 900);
  }
  function handleRedeem(name, cost) {
    if (points < cost) { setToast("Not enough points yet"); return; }
    setPoints((p) => p - cost);
    pushActivity({ label: `Redeemed: ${name}`, sub: "Reward", amount: cost > 0 ? `-${cost} pts` : "Free", points: cost > 0 ? `-${cost} pts` : null });
    setToast(`Redeemed: ${name}`);
  }

  const tabs = [
    { id: "home", label: "Home", screen: <HomeScreen points={points} tier={tier} onScan={handleScan} onRedeem={handleRedeem} scanning={scanning} /> },
    { id: "rewards", label: "Rewards", screen: <RewardsScreen points={points} onRedeem={handleRedeem} /> },
    { id: "activity", label: "Activity", screen: <ActivityScreen activity={activity} /> },
  ];
  const current = tabs.find((t) => t.id === tab);

  return (
    <div className="w-full min-h-[700px] flex flex-col items-center py-8 gap-4" style={{ background: "#EFE9DD" }}>
      <div className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: colors.ink, color: "#fff" }}>Project 1 of 3 — Naivas Rewards (Loyalty)</div>
      <div className="relative w-[380px] rounded-[2.2rem] overflow-hidden flex flex-col" style={{ background: colors.cream, boxShadow: "0 20px 50px rgba(43,38,32,0.25)", border: "8px solid #1c1a17" }}>
        <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-semibold" style={{ color: colors.ink }}><span>9:41</span><span>Naivas Rewards</span><span>●●●</span></div>
        <div className="overflow-y-auto" style={{ maxHeight: 620 }}>{current.screen}</div>
        <Toast message={toast} />
        <div className="flex items-stretch justify-around px-2 pt-2 pb-3" style={{ background: "#fff", borderTop: `1px solid ${colors.line}` }}>
          {tabs.map((t) => {
            const active = t.id === tab;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} className="flex flex-col items-center gap-1 px-3 py-1">
                <TabIcon type={t.id} active={active} />
                <span className="text-[10px] font-semibold" style={{ color: active ? colors.orange : colors.inkSoft }}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
