import React, { useState, useEffect, useRef } from "react";

/* ============================================================
   PROJECT 3 OF 3 — NAIVAS DELIVERY (Fulfillment)
   Customer-facing tracking experience — not the ops view.
   (Internal dispatch/ops tooling lives in the separate
   Naivas Delivery Ops Dashboard artifact.) Naivas orders in
   brand orange; Harleys Pharmacy orders stay visually distinct
   (blue) and fully separate — never one trip.
   ============================================================ */

const colors = {
  orange: "#F5821F", orangeDeep: "#D96A0F", green: "#3DA845", greenDeep: "#2E7D32",
  greenLight: "#EAF6EA", blue: "#3B6EA5", blueLight: "#E8F0F8", cream: "#FAFAF8", sand: "#F0EEE8",
  ink: "#222222", inkSoft: "#6B6B66", line: "#E4E1D8",
};

function NaivasLogo({ size = "md" }) {
  const h = size === "sm" ? 24 : 32;
  return (
    <div className="inline-flex items-center gap-1.5 rounded-md px-2.5" style={{ background: colors.orange, height: h }}>
      <span className="font-extrabold tracking-tight lowercase" style={{ color: "#fff", fontSize: size === "sm" ? 12 : 15, lineHeight: 1 }}>naivas</span>
      <svg width={size === "sm" ? 10 : 12} height={size === "sm" ? 10 : 12} viewBox="0 0 24 24" fill="none"><path d="M4 13l5 5L20 6" stroke={colors.green} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </div>
  );
}
function Pill({ children, tone = "orange" }) {
  const bg = tone === "orange" ? colors.orange : tone === "blue" ? colors.blue : colors.green;
  return <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: bg, color: "#fff" }}>{children}</span>;
}
function PhoneIcon() { return (<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6 3h3l1.5 4.5L8.5 9a12 12 0 0 0 6.5 6.5l1.5-2L21 15v3a2 2 0 0 1-2 2C10.5 20 4 13.5 4 5a2 2 0 0 1 2-2Z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" /></svg>); }
function ChatIcon() { return (<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M4 4h16v11H8l-4 4V4Z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" /></svg>); }
function PinIcon({ color }) { return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" /><circle cx="12" cy="9" r="2.3" stroke={color} strokeWidth="1.8" /></svg>); }

const myOrders = [
  { id: "NV-10231", channel: "Naivas", branch: "Naivas Kilimani", status: 3, distanceKm: 2.4, address: "Kilimani, Wood Ave, Apt 4B", instructions: "Leave with the gate guard" },
  { id: "HP-4410", channel: "Harleys", branch: "Harleys Pharmacy, Yaya", status: 1, distanceKm: 5.1, address: "Kilimani, Wood Ave, Apt 4B", instructions: "Call on arrival" },
  { id: "NV-10229", channel: "Naivas", branch: "Naivas Two Rivers", status: 4, distanceKm: 0, address: "Westlands, ABC Place", instructions: null },
];
const STEPS = ["Order received", "Packed at branch", "Rider dispatched", "Out for delivery", "Delivered"];
const riderNames = ["James O.", "Faith N.", "Brian K.", "Mercy W."];

function RouteMap({ progress, accent }) {
  const cx = 20 + progress * 260;
  return (
    <svg viewBox="0 0 300 90" className="w-full" style={{ height: 90 }}>
      <rect x="0" y="0" width="300" height="90" rx="10" fill={colors.sand} />
      <path d="M20 60 C 80 20, 180 80, 280 30" stroke={colors.line} strokeWidth="3" fill="none" strokeDasharray="6 6" />
      <circle cx="20" cy="60" r="5" fill={colors.inkSoft} />
      <circle cx="280" cy="30" r="6" fill={accent} />
      <g transform={`translate(${cx}, ${60 - progress * 30})`}>
        <circle r="8" fill={accent} opacity="0.25" />
        <circle r="5" fill={accent} />
      </g>
    </svg>
  );
}

function OrdersListScreen({ orders, onOpen }) {
  return (
    <div className="flex flex-col gap-4 px-5 pt-3 pb-6">
      <div className="flex items-center justify-between">
        <NaivasLogo />
        <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: colors.greenLight, color: colors.greenDeep }}>● Live</span>
      </div>
      <div><p className="text-lg font-bold" style={{ color: colors.ink }}>Your deliveries</p><p className="text-sm" style={{ color: colors.inkSoft }}>Naivas and Harleys orders, tracked separately</p></div>

      <div className="flex flex-col gap-2.5">
        {orders.map((o) => {
          const done = o.status === 4;
          const accent = o.channel === "Harleys" ? colors.blue : colors.orange;
          return (
            <button key={o.id} onClick={() => onOpen(o)} className="flex items-center justify-between rounded-xl p-3 text-left active:scale-[0.98] transition-transform" style={{ border: `1px solid ${colors.line}`, background: "#fff" }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: done ? colors.greenLight : `${accent}22` }}>
                  <PinIcon color={done ? colors.greenDeep : accent} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5"><p className="text-xs font-semibold" style={{ color: colors.ink }}>{o.id}</p><Pill tone={o.channel === "Harleys" ? "blue" : "orange"}>{o.channel}</Pill></div>
                  <p className="text-[10px]" style={{ color: colors.inkSoft }}>{o.branch}</p>
                </div>
              </div>
              <p className="text-[10px] font-semibold" style={{ color: done ? colors.greenDeep : colors.inkSoft }}>{STEPS[o.status]}</p>
            </button>
          );
        })}
      </div>
      <p className="text-[10px] text-center italic" style={{ color: colors.inkSoft }}>Naivas and Harleys orders are always delivered separately, even to the same address.</p>
    </div>
  );
}

function TrackingScreen({ order, onBack }) {
  const [stepIdx, setStepIdx] = useState(Math.min(order.status, STEPS.length - 1));
  const [distance, setDistance] = useState(order.distanceKm);
  const [instructions, setInstructions] = useState(order.instructions || "");
  const [editingInstr, setEditingInstr] = useState(false);
  const [notified, setNotified] = useState(false);
  const rider = useRef(riderNames[Math.floor(Math.random() * riderNames.length)]).current;
  const isHarleys = order.channel === "Harleys";
  const accent = isHarleys ? colors.blue : colors.orange;
  const outForDelivery = stepIdx === 3;
  const delivered = stepIdx === 4;

  useEffect(() => {
    if (stepIdx >= STEPS.length - 1) return;
    const t = setTimeout(() => setStepIdx((i) => i + 1), 1700);
    return () => clearTimeout(t);
  }, [stepIdx]);

  useEffect(() => {
    if (!outForDelivery || distance <= 0) return;
    const t = setInterval(() => setDistance((d) => Math.max(0, +(d - 0.5).toFixed(1))), 450);
    return () => clearInterval(t);
  }, [outForDelivery, distance]);

  useEffect(() => {
    if (outForDelivery && distance <= 1 && !notified) setNotified(true);
  }, [outForDelivery, distance, notified]);

  const progress = order.distanceKm > 0 ? 1 - distance / order.distanceKm : 1;
  const etaMin = Math.max(1, Math.round(distance * 3.2));

  return (
    <div className="flex flex-col gap-4 px-5 pt-3 pb-6 relative">
      <div className="flex items-center gap-2"><button onClick={onBack} className="text-lg" style={{ color: colors.ink }}>←</button><NaivasLogo size="sm" /><p className="text-sm font-bold ml-1" style={{ color: colors.ink }}>{order.id}</p></div>

      {notified && outForDelivery && !delivered && (
        <div className="rounded-lg px-3 py-2 text-[11px] font-semibold flex items-center gap-2" style={{ background: colors.greenLight, color: colors.greenDeep }}>
          🔔 Your rider is less than 1 km away
        </div>
      )}

      <div className="rounded-xl p-4" style={{ background: accent, color: "#fff" }}>
        <Pill tone={isHarleys ? "blue" : "green"}>{order.channel}</Pill>
        <p className="text-xs opacity-90 mt-2">Fulfilling branch</p>
        <p className="text-sm font-bold">{order.branch}</p>
        {outForDelivery && (
          <div className="flex justify-between items-end mt-2">
            <div><p className="text-xs opacity-90">Rider</p><p className="text-sm font-bold">{rider}</p></div>
            <div className="text-right"><p className="text-xs opacity-90">ETA</p><p className="text-sm font-bold">{etaMin} min · {distance.toFixed(1)} km</p></div>
          </div>
        )}
      </div>

      {outForDelivery && (
        <>
          <RouteMap progress={progress} accent={accent} />
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-xs font-bold" style={{ background: colors.ink }}><PhoneIcon />Call {rider.split(" ")[0]}</button>
            <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-xs font-bold" style={{ background: colors.inkSoft }}><ChatIcon />Message</button>
          </div>
        </>
      )}

      <div className="flex flex-col gap-0">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: i <= stepIdx ? colors.green : colors.line, color: "#fff" }}>{i <= stepIdx ? "✓" : ""}</div>
              {i < STEPS.length - 1 && <div className="w-0.5 flex-1" style={{ background: i < stepIdx ? colors.green : colors.line, minHeight: 18 }} />}
            </div>
            <div className="pb-3.5">
              <p className="text-sm font-semibold" style={{ color: i <= stepIdx ? colors.ink : colors.inkSoft }}>{s}</p>
              {i === stepIdx && i < STEPS.length - 1 && <p className="text-[10px]" style={{ color: colors.inkSoft }}>In progress…</p>}
              {i === STEPS.length - 1 && delivered && <p className="text-[10px]" style={{ color: colors.greenDeep }}>Delivered — signed for at door</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl p-3.5" style={{ border: `1px solid ${colors.line}` }}>
        <p className="text-[10px] font-bold mb-1" style={{ color: colors.inkSoft }}>DELIVERING TO</p>
        <p className="text-xs font-semibold mb-2" style={{ color: colors.ink }}>{order.address}</p>
        <p className="text-[10px] font-bold mb-1" style={{ color: colors.inkSoft }}>DELIVERY INSTRUCTIONS</p>
        {editingInstr ? (
          <div className="flex gap-1.5">
            <input value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="e.g. Leave at gate, call on arrival" className="flex-1 text-xs px-2.5 py-1.5 rounded-lg outline-none" style={{ background: colors.sand, border: `1px solid ${colors.line}` }} />
            <button onClick={() => setEditingInstr(false)} className="text-xs font-bold px-3 rounded-lg" style={{ background: colors.ink, color: "#fff" }}>Save</button>
          </div>
        ) : (
          <button onClick={() => !delivered && setEditingInstr(true)} className="text-left w-full">
            <p className="text-xs" style={{ color: instructions ? colors.ink : colors.inkSoft }}>{instructions || "Add instructions for your rider"}{!delivered && <span style={{ color: accent }}> · edit</span>}</p>
          </button>
        )}
      </div>

      <div className="rounded-xl p-3.5" style={{ border: `1px solid ${colors.line}` }}>
        <p className="text-xs font-semibold mb-1" style={{ color: colors.ink }}>Delivery events (webhook feed)</p>
        <p className="text-[10px] font-mono" style={{ color: colors.inkSoft }}>order.status → {STEPS[stepIdx].toLowerCase().replace(/ /g, "_")}</p>
        <p className="text-[10px] font-mono" style={{ color: colors.inkSoft }}>→ notifies: {isHarleys ? "Harleys Pharmacy" : "Naivas Online"}, Naivas Rewards</p>
      </div>

      <button className="w-full py-2.5 rounded-full text-xs font-bold" style={{ background: colors.sand, color: colors.ink }}>Need help with this order?</button>
    </div>
  );
}

export default function NaivasDeliveryPrototype() {
  const [orders] = useState(myOrders);
  const [openOrder, setOpenOrder] = useState(null);

  return (
    <div className="w-full min-h-[720px] flex flex-col items-center py-8 gap-4" style={{ background: "#EDEAE2" }}>
      <div className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: colors.ink, color: "#fff" }}>Project 3 of 3 — Naivas Delivery (Fulfillment)</div>
      <div className="relative w-[380px] rounded-[2.2rem] overflow-hidden flex flex-col" style={{ background: colors.cream, boxShadow: "0 20px 50px rgba(0,0,0,0.22)", border: "8px solid #1c1a17" }}>
        <div className="flex items-center justify-between px-5 pt-3 pb-1 text-[10px] font-semibold" style={{ color: colors.inkSoft }}><span>9:41</span><span>●●●</span></div>
        <div className="overflow-y-auto" style={{ maxHeight: 660 }}>
          {openOrder ? <TrackingScreen order={openOrder} onBack={() => setOpenOrder(null)} /> : <OrdersListScreen orders={orders} onOpen={setOpenOrder} />}
        </div>
      </div>
      <p className="text-[11px] max-w-[380px] text-center" style={{ color: colors.inkSoft }}>Internal dispatch &amp; ops tooling lives in the separate Naivas Delivery Ops Dashboard.</p>
    </div>
  );
}
