import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

/* ============================================================
   NAIVAS DELIVERY — OPS DASHBOARD
   Internal tool for dispatch staff: live KPIs, branch queues,
   active orders, rider roster. Desktop-oriented, not a phone
   mockup — this is the tooling behind the consumer app.
   ============================================================ */

const colors = {
  orange: "#F5821F", orangeDeep: "#D96A0F", green: "#3DA845", greenDeep: "#2E7D32",
  greenLight: "#EAF6EA", blue: "#3B6EA5", blueLight: "#E8F0F8",
  ink: "#222222", inkSoft: "#6B6B66", line: "#E4E1D8", sand: "#F0EEE8",
  bg: "#F5F3EE", card: "#FFFFFF", red: "#D9534F", redLight: "#FBEAEA",
};

const initialBranches = [
  { name: "Naivas Kilimani", channel: "Naivas", queue: 4, onTime: 94, avgMin: 28 },
  { name: "Naivas Two Rivers", channel: "Naivas", queue: 1, onTime: 98, avgMin: 22 },
  { name: "Naivas Ngong Rd Express", channel: "Naivas", queue: 6, onTime: 87, avgMin: 35 },
  { name: "Naivas Westlands", channel: "Naivas", queue: 2, onTime: 96, avgMin: 25 },
  { name: "Harleys Pharmacy, Yaya", channel: "Harleys", queue: 3, onTime: 91, avgMin: 30 },
  { name: "Harleys Pharmacy, Westlands", channel: "Harleys", queue: 1, onTime: 99, avgMin: 19 },
];

const riders = [
  { name: "James O.", status: "En route", orders: 2, completedToday: 9, rating: 4.9, branch: "Naivas Kilimani" },
  { name: "Faith N.", status: "Idle", orders: 0, completedToday: 11, rating: 4.8, branch: "Naivas Two Rivers" },
  { name: "Brian K.", status: "En route", orders: 1, completedToday: 7, rating: 4.7, branch: "Naivas Ngong Rd Express" },
  { name: "Mercy W.", status: "At branch", orders: 1, completedToday: 8, rating: 5.0, branch: "Harleys Pharmacy, Yaya" },
  { name: "Kevin M.", status: "En route", orders: 2, completedToday: 10, rating: 4.6, branch: "Naivas Westlands" },
];

const initialOrders = [
  { id: "NV-10231", channel: "Naivas", branch: "Naivas Kilimani", rider: "James O.", status: "Out for delivery", eta: "12 min" },
  { id: "NV-10233", channel: "Naivas", branch: "Naivas Ngong Rd Express", rider: "Brian K.", status: "Out for delivery", eta: "19 min" },
  { id: "HP-4410", channel: "Harleys", branch: "Harleys Pharmacy, Yaya", rider: "Mercy W.", status: "Pharmacist verification", eta: "38 min" },
  { id: "NV-10235", channel: "Naivas", branch: "Naivas Westlands", rider: "Kevin M.", status: "Out for delivery", eta: "8 min" },
  { id: "NV-10229", channel: "Naivas", branch: "Naivas Two Rivers", rider: "Faith N.", status: "Delivered", eta: "—" },
  { id: "NV-10236", channel: "Naivas", branch: "Naivas Kilimani", rider: "—", status: "Awaiting rider", eta: "Pending" },
];

const hourlyData = [
  { hour: "9am", deliveries: 4 }, { hour: "10am", deliveries: 7 }, { hour: "11am", deliveries: 9 },
  { hour: "12pm", deliveries: 14 }, { hour: "1pm", deliveries: 18 }, { hour: "2pm", deliveries: 15 },
  { hour: "3pm", deliveries: 12 }, { hour: "4pm", deliveries: 16 }, { hour: "5pm", deliveries: 21 },
  { hour: "6pm", deliveries: 24 }, { hour: "7pm", deliveries: 17 }, { hour: "8pm", deliveries: 9 },
];

function NaivasLogo() {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-md px-2.5" style={{ background: colors.orange, height: 30 }}>
      <span className="font-extrabold tracking-tight lowercase" style={{ color: "#fff", fontSize: 14, lineHeight: 1 }}>naivas</span>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M4 13l5 5L20 6" stroke={colors.green} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </div>
  );
}
function Pill({ children, tone = "orange" }) {
  const map = { orange: colors.orange, blue: colors.blue, green: colors.green, red: colors.red, gray: colors.inkSoft };
  return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: map[tone], color: "#fff" }}>{children}</span>;
}
function StatusPill({ status }) {
  if (status === "Delivered") return <Pill tone="green">Delivered</Pill>;
  if (status === "Out for delivery") return <Pill tone="orange">Out for delivery</Pill>;
  if (status === "Pharmacist verification") return <Pill tone="blue">Pharmacist check</Pill>;
  return <Pill tone="gray">{status}</Pill>;
}

function KPICard({ label, value, sub, tone }) {
  return (
    <div className="rounded-xl p-4 flex-1" style={{ background: colors.card, border: `1px solid ${colors.line}` }}>
      <p className="text-[11px] font-semibold" style={{ color: colors.inkSoft }}>{label}</p>
      <p className="text-2xl font-extrabold mt-1" style={{ color: tone || colors.ink }}>{value}</p>
      {sub && <p className="text-[10px] mt-1" style={{ color: colors.inkSoft }}>{sub}</p>}
    </div>
  );
}

function BranchTable({ branches }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${colors.line}`, background: colors.card }}>
      <div className="px-4 py-3" style={{ borderBottom: `1px solid ${colors.line}` }}>
        <p className="text-sm font-bold" style={{ color: colors.ink }}>Branch queues</p>
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ background: colors.sand }}>
            <th className="text-left font-semibold px-4 py-2" style={{ color: colors.inkSoft }}>Branch</th>
            <th className="text-left font-semibold px-3 py-2" style={{ color: colors.inkSoft }}>Channel</th>
            <th className="text-right font-semibold px-3 py-2" style={{ color: colors.inkSoft }}>Queue</th>
            <th className="text-right font-semibold px-3 py-2" style={{ color: colors.inkSoft }}>On-time</th>
            <th className="text-right font-semibold px-4 py-2" style={{ color: colors.inkSoft }}>Avg dispatch</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((b, i) => (
            <tr key={b.name} style={{ borderTop: i > 0 ? `1px solid ${colors.line}` : "none" }}>
              <td className="px-4 py-2.5 font-semibold" style={{ color: colors.ink }}>{b.name}</td>
              <td className="px-3 py-2.5"><Pill tone={b.channel === "Harleys" ? "blue" : "orange"}>{b.channel}</Pill></td>
              <td className="px-3 py-2.5 text-right font-bold" style={{ color: b.queue > 4 ? colors.red : colors.ink }}>{b.queue}</td>
              <td className="px-3 py-2.5 text-right font-semibold" style={{ color: b.onTime >= 95 ? colors.greenDeep : b.onTime >= 90 ? colors.orangeDeep : colors.red }}>{b.onTime}%</td>
              <td className="px-4 py-2.5 text-right" style={{ color: colors.inkSoft }}>{b.avgMin} min</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OrdersTable({ orders }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${colors.line}`, background: colors.card }}>
      <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${colors.line}` }}>
        <p className="text-sm font-bold" style={{ color: colors.ink }}>Active orders</p>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: colors.greenLight, color: colors.greenDeep }}>● Live</span>
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ background: colors.sand }}>
            <th className="text-left font-semibold px-4 py-2" style={{ color: colors.inkSoft }}>Order</th>
            <th className="text-left font-semibold px-3 py-2" style={{ color: colors.inkSoft }}>Branch</th>
            <th className="text-left font-semibold px-3 py-2" style={{ color: colors.inkSoft }}>Rider</th>
            <th className="text-left font-semibold px-3 py-2" style={{ color: colors.inkSoft }}>Status</th>
            <th className="text-right font-semibold px-4 py-2" style={{ color: colors.inkSoft }}>ETA</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => (
            <tr key={o.id} style={{ borderTop: i > 0 ? `1px solid ${colors.line}` : "none" }}>
              <td className="px-4 py-2.5 font-semibold" style={{ color: colors.ink }}>{o.id}</td>
              <td className="px-3 py-2.5" style={{ color: colors.inkSoft }}>{o.branch}</td>
              <td className="px-3 py-2.5" style={{ color: colors.inkSoft }}>{o.rider}</td>
              <td className="px-3 py-2.5"><StatusPill status={o.status} /></td>
              <td className="px-4 py-2.5 text-right font-semibold" style={{ color: colors.ink }}>{o.eta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RidersPanel({ riders }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${colors.line}`, background: colors.card }}>
      <div className="px-4 py-3" style={{ borderBottom: `1px solid ${colors.line}` }}>
        <p className="text-sm font-bold" style={{ color: colors.ink }}>Rider roster</p>
      </div>
      <div className="flex flex-col">
        {riders.map((r, i) => (
          <div key={r.name} className="flex items-center justify-between px-4 py-2.5" style={{ borderTop: i > 0 ? `1px solid ${colors.line}` : "none" }}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0" style={{ background: colors.sand, color: colors.ink }}>
                {r.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: colors.ink }}>{r.name}</p>
                <p className="text-[10px]" style={{ color: colors.inkSoft }}>{r.branch}</p>
              </div>
            </div>
            <div className="text-right">
              <Pill tone={r.status === "En route" ? "orange" : r.status === "At branch" ? "blue" : "gray"}>{r.status}</Pill>
              <p className="text-[10px] mt-1" style={{ color: colors.inkSoft }}>{r.completedToday} today · ★{r.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeliveriesChart({ data }) {
  return (
    <div className="rounded-xl p-4" style={{ border: `1px solid ${colors.line}`, background: colors.card }}>
      <p className="text-sm font-bold mb-3" style={{ color: colors.ink }}>Deliveries today, by hour</p>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid stroke={colors.line} vertical={false} />
          <XAxis dataKey="hour" tick={{ fontSize: 10, fill: colors.inkSoft }} axisLine={{ stroke: colors.line }} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: colors.inkSoft }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: `1px solid ${colors.line}` }} />
          <Line type="monotone" dataKey="deliveries" stroke={colors.orange} strokeWidth={2.5} dot={{ r: 3, fill: colors.orange }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function NaivasDeliveryOpsDashboard() {
  const [branches, setBranches] = useState(initialBranches);
  const [orders] = useState(initialOrders);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t1 = setInterval(() => {
      setBranches((prev) => prev.map((b) => Math.random() < 0.4 ? { ...b, queue: Math.max(0, b.queue + (Math.random() < 0.5 ? 1 : -1)) } : b));
    }, 3500);
    const t2 = setInterval(() => setNow(new Date()), 1000);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  const activeCount = orders.filter((o) => o.status !== "Delivered").length;
  const avgOnTime = Math.round(branches.reduce((s, b) => s + b.onTime, 0) / branches.length);
  const avgDispatch = Math.round(branches.reduce((s, b) => s + b.avgMin, 0) / branches.length);
  const totalQueue = branches.reduce((s, b) => s + b.queue, 0);

  return (
    <div className="w-full min-h-[900px] p-6" style={{ background: colors.bg }}>
      <div className="max-w-[960px] mx-auto flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <NaivasLogo />
            <div><p className="text-lg font-bold" style={{ color: colors.ink }}>Delivery Ops</p><p className="text-[11px]" style={{ color: colors.inkSoft }}>Naivas &amp; Harleys dispatch — {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</p></div>
          </div>
          <span className="text-[11px] font-bold px-3 py-1.5 rounded-full" style={{ background: colors.greenLight, color: colors.greenDeep }}>● System live</span>
        </div>

        <div className="flex gap-4">
          <KPICard label="Active deliveries" value={activeCount} sub={`${totalQueue} orders queued across branches`} tone={colors.orangeDeep} />
          <KPICard label="On-time rate" value={`${avgOnTime}%`} sub="Across all branches, today" tone={avgOnTime >= 95 ? colors.greenDeep : colors.orangeDeep} />
          <KPICard label="Avg dispatch time" value={`${avgDispatch} min`} sub="Order received → rider out" />
          <KPICard label="Riders on shift" value={riders.length} sub={`${riders.filter((r) => r.status !== "Idle").length} currently active`} />
        </div>

        <DeliveriesChart data={hourlyData} />

        <div className="flex gap-4">
          <div className="flex-1"><BranchTable branches={branches} /></div>
          <div style={{ width: 280 }}><RidersPanel riders={riders} /></div>
        </div>

        <OrdersTable orders={orders} />
      </div>
    </div>
  );
}
