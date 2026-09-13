import React, { useState } from "react";

/* ============================================================
   PROJECT 2 OF 3 — NAIVAS ONLINE (eCommerce)
   Full grocery ordering app: Shop, Cart, Orders, Account tabs —
   modeled on standard grocery-app patterns (Carrefour's MAF app:
   browse, cart, saved/frequent items, order history, promos).
   No live delivery tracking here — that's Naivas Delivery.
   ============================================================ */

const colors = {
  orange: "#F5821F", orangeDeep: "#D96A0F", green: "#3DA845", greenDeep: "#2E7D32",
  greenLight: "#EAF6EA", cream: "#FAFAF8", sand: "#F0EEE8", ink: "#222222",
  inkSoft: "#6B6B66", gold: "#C9A227", line: "#E4E1D8", red: "#D9534F",
};

const branches = ["Naivas Kilimani", "Naivas Two Rivers", "Naivas Ngong Rd Express"];

const products = [
  { id: 1, name: "Tomatoes, 1kg", cat: "Fresh Produce", price: 120, was: null, freq: true },
  { id: 2, name: "Brookside Milk 500ml", cat: "Groceries", price: 65, was: 75, freq: true },
  { id: 3, name: "Pembe Maize Flour 2kg", cat: "Groceries", price: 210, was: null, freq: true },
  { id: 4, name: "Omo Detergent 1kg", cat: "Household", price: 340, was: 380, freq: false },
  { id: 5, name: "Coca-Cola 2L", cat: "Beverages", price: 150, was: null, freq: false },
  { id: 6, name: "Pampers Size 4, 50pcs", cat: "Household", price: 1450, was: 1600, freq: true },
  { id: 7, name: "Fresh Spinach, bunch", cat: "Fresh Produce", price: 45, was: null, freq: false },
  { id: 8, name: "Basmati Rice 2kg", cat: "Groceries", price: 480, was: null, freq: false },
  { id: 9, name: "Blueband Margarine 500g", cat: "Groceries", price: 210, was: 230, freq: false },
  { id: 10, name: "Eggs, tray of 30", cat: "Fresh Produce", price: 480, was: null, freq: true },
];
const categories = ["All", "Fresh Produce", "Groceries", "Household", "Beverages"];
const deliverySlots = ["Today, 2:00 – 4:00 PM", "Today, 4:00 – 6:00 PM", "Tomorrow, 9:00 – 11:00 AM"];
const pickupSlots = ["Ready in 45 min", "Ready in 1.5 hrs", "Tomorrow, 9:00 AM"];
const FREE_DELIVERY_THRESHOLD = 3000;
const DELIVERY_ZONES = [
  { maxKm: 3, fee: 80, label: "Within 3 km" },
  { maxKm: 7, fee: 150, label: "3–7 km" },
  { maxKm: 999, fee: 250, label: "Over 7 km" },
];
function feeForAddress(addr, subtotal) {
  if (subtotal >= FREE_DELIVERY_THRESHOLD) return { fee: 0, zone: "Free delivery threshold met" };
  const zone = DELIVERY_ZONES.find((z) => addr.distanceKm <= z.maxKm) || DELIVERY_ZONES[DELIVERY_ZONES.length - 1];
  return { fee: zone.fee, zone: zone.label };
}
const promos = [
  { id: 1, title: "Up to 20% off household essentials", sub: "This week only" },
  { id: 2, title: "Free delivery over KES 3,000", sub: "Every order, every branch" },
  { id: 3, title: "Double Rewards points on fresh produce", sub: "Ends Sunday" },
];
const initialAddresses = [
  { id: 1, label: "Home", detail: "Kilimani, Wood Ave, Apt 4B", distanceKm: 2.1, isDefault: true },
  { id: 2, label: "Office", detail: "Westlands, ABC Place, 3rd Floor", distanceKm: 6.4, isDefault: false },
];
const pastOrders = [
  { id: "NV-10231", date: "Today", items: 6, total: 2980, status: "Out for delivery" },
  { id: "NV-10229", date: "3 days ago", items: 8, total: 3420, status: "Delivered" },
  { id: "NV-10184", date: "2 weeks ago", items: 5, total: 1870, status: "Delivered" },
];

function NaivasLogo({ size = "md" }) {
  const h = size === "sm" ? 26 : 34;
  return (
    <div className="inline-flex items-center gap-1.5 rounded-md px-2.5" style={{ background: colors.orange, height: h }}>
      <span className="font-extrabold tracking-tight lowercase" style={{ color: "#fff", fontSize: size === "sm" ? 13 : 16, lineHeight: 1 }}>naivas</span>
      <svg width={size === "sm" ? 11 : 13} height={size === "sm" ? 11 : 13} viewBox="0 0 24 24" fill="none"><path d="M4 13l5 5L20 6" stroke={colors.green} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </div>
  );
}
function Pill({ children, tone = "orange" }) {
  const bg = tone === "orange" ? colors.orange : tone === "green" ? colors.green : tone === "red" ? colors.red : colors.gold;
  return <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: bg, color: "#fff" }}>{children}</span>;
}
function HeartIcon({ filled }) {
  return (<svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? colors.red : "none"}><path d="M12 21s-7-4.4-9.5-8.8C.8 8.6 2.7 5 6.2 5c2 0 3.4 1 5.8 3.3C14.4 6 15.8 5 17.8 5c3.5 0 5.4 3.6 3.7 7.2C19 16.6 12 21 12 21Z" stroke={filled ? colors.red : colors.inkSoft} strokeWidth="1.6" strokeLinejoin="round" /></svg>);
}
function TrashIcon() {
  return (<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-8 0 1 12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-12" stroke={colors.inkSoft} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>);
}

function ProductRow({ p, qty, onAdd, onRemove, fav, onToggleFav }) {
  return (
    <div className="flex items-center justify-between rounded-xl p-3" style={{ border: `1px solid ${colors.line}`, background: "#fff" }}>
      <div className="flex items-center gap-2.5">
        <div className="relative w-10 h-10 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0" style={{ background: colors.sand, color: colors.ink }}>
          {p.cat.slice(0, 2).toUpperCase()}
          <button onClick={() => onToggleFav(p.id)} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow"><HeartIcon filled={fav} /></button>
        </div>
        <div className="flex flex-col">
          <p className="text-xs font-semibold" style={{ color: colors.ink }}>{p.name}</p>
          <div className="flex items-center gap-1.5">
            <p className="text-[11px] font-bold" style={{ color: colors.orangeDeep }}>KES {p.price.toLocaleString()}</p>
            {p.was && <p className="text-[10px] line-through" style={{ color: colors.inkSoft }}>KES {p.was.toLocaleString()}</p>}
            {p.was && <Pill tone="green">-{Math.round((1 - p.price / p.was) * 100)}%</Pill>}
          </div>
        </div>
      </div>
      {qty === 0 ? (
        <button onClick={() => onAdd(p.id)} className="text-xs font-bold px-3 py-1.5 rounded-full active:scale-95 transition-transform" style={{ background: colors.orange, color: "#fff" }}>Add</button>
      ) : (
        <div className="flex items-center gap-2">
          <button onClick={() => onRemove(p.id)} className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: colors.sand, color: colors.ink }}>–</button>
          <span className="text-xs font-bold w-4 text-center" style={{ color: colors.ink }}>{qty}</span>
          <button onClick={() => onAdd(p.id)} className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: colors.orange, color: "#fff" }}>+</button>
        </div>
      )}
    </div>
  );
}

function ShopScreen({ branch, onChangeBranch, cart, favs, onAdd, onRemove, onToggleFav }) {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [promoIdx, setPromoIdx] = useState(0);
  const frequentlyBought = products.filter((p) => p.freq);
  const shown = products.filter((p) => (filter === "All" || p.cat === filter) && p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex flex-col gap-3 px-5 pt-3 pb-6">
      <div className="flex items-center justify-between">
        <NaivasLogo />
        <button onClick={onChangeBranch} className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-full" style={{ background: colors.sand, color: colors.ink }}>{branch} <span style={{ color: colors.inkSoft }}>▾</span></button>
      </div>
      <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: colors.green }}>saves you money</p>

      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" className="text-xs px-3 py-2 rounded-lg outline-none" style={{ background: colors.sand, color: colors.ink, border: `1px solid ${colors.line}` }} />

      <button onClick={() => setPromoIdx((i) => (i + 1) % promos.length)} className="rounded-xl p-3.5 flex flex-col gap-0.5 text-left" style={{ background: colors.orange, color: "#fff" }}>
        <p className="text-sm font-bold">{promos[promoIdx].title}</p>
        <p className="text-[10px] opacity-90">{promos[promoIdx].sub}</p>
        <div className="flex gap-1 mt-1.5">{promos.map((_, i) => <div key={i} className="rounded-full" style={{ width: 5, height: 5, background: i === promoIdx ? "#fff" : "rgba(255,255,255,0.4)" }} />)}</div>
      </button>

      <div>
        <p className="text-xs font-bold mb-2" style={{ color: colors.ink }}>Frequently bought</p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {frequentlyBought.map((p) => (
            <button key={p.id} onClick={() => onAdd(p.id)} className="flex-shrink-0 rounded-lg p-2 flex flex-col gap-1 items-start" style={{ background: colors.sand, width: 96 }}>
              <div className="w-full h-10 rounded flex items-center justify-center text-[9px] font-bold" style={{ background: "#fff", color: colors.ink }}>{p.cat.slice(0, 2).toUpperCase()}</div>
              <p className="text-[9px] font-semibold leading-tight" style={{ color: colors.ink }}>{p.name}</p>
              <p className="text-[9px] font-bold" style={{ color: colors.orangeDeep }}>KES {p.price}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button key={c} onClick={() => setFilter(c)} className="text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap" style={filter === c ? { background: colors.ink, color: "#fff" } : { background: colors.sand, color: colors.ink }}>{c}</button>
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        {shown.length === 0 && <p className="text-xs text-center py-6" style={{ color: colors.inkSoft }}>No products match "{query}"</p>}
        {shown.map((p) => <ProductRow key={p.id} p={p} qty={cart[p.id] || 0} onAdd={onAdd} onRemove={onRemove} fav={!!favs[p.id]} onToggleFav={onToggleFav} />)}
      </div>
    </div>
  );
}

function CartScreen({ cart, favs, onAdd, onRemove, onGoShop, onCheckout, promoCode, setPromoCode, promoApplied, onApplyPromo }) {
  const items = Object.entries(cart).map(([id, qty]) => ({ p: products.find((x) => x.id === Number(id)), qty })).filter((x) => x.p);
  const subtotal = items.reduce((s, { p, qty }) => s + p.price * qty, 0);
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const remainingForFree = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const savedItems = products.filter((p) => favs[p.id] && !cart[p.id]);
  const suggestions = products.filter((p) => !cart[p.id] && p.freq).slice(0, 4);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 px-8 py-16 text-center">
        <p className="text-3xl">🛒</p>
        <p className="text-sm font-bold" style={{ color: colors.ink }}>Your cart is empty</p>
        <p className="text-xs" style={{ color: colors.inkSoft }}>Add groceries to get started</p>
        <button onClick={onGoShop} className="px-4 py-2 rounded-full text-xs font-bold mt-2" style={{ background: colors.orange, color: "#fff" }}>Browse products</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-5 pt-3 pb-6">
      <p className="text-lg font-bold" style={{ color: colors.ink }}>Your cart</p>

      {remainingForFree > 0 && (
        <div className="rounded-lg px-3 py-2 text-[11px] font-semibold" style={{ background: colors.greenLight, color: colors.greenDeep }}>Add KES {remainingForFree.toLocaleString()} more for free delivery</div>
      )}

      <div className="flex flex-col gap-2">
        {items.map(({ p, qty }) => (
          <div key={p.id} className="flex items-center justify-between rounded-xl p-3" style={{ border: `1px solid ${colors.line}`, background: "#fff" }}>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[10px] font-bold" style={{ background: colors.sand, color: colors.ink }}>{p.cat.slice(0, 2).toUpperCase()}</div>
              <div className="flex flex-col"><p className="text-xs font-semibold" style={{ color: colors.ink }}>{p.name}</p><p className="text-[11px] font-bold" style={{ color: colors.orangeDeep }}>KES {(p.price * qty).toLocaleString()}</p></div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => onRemove(p.id)} className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: colors.sand, color: colors.ink }}>–</button>
              <span className="text-xs font-bold w-4 text-center" style={{ color: colors.ink }}>{qty}</span>
              <button onClick={() => onAdd(p.id)} className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: colors.orange, color: "#fff" }}>+</button>
              <button onClick={() => { for (let i = 0; i < qty; i++) onRemove(p.id); }} className="ml-1"><TrashIcon /></button>
            </div>
          </div>
        ))}
      </div>

      {suggestions.length > 0 && (
        <div>
          <p className="text-xs font-bold mb-2" style={{ color: colors.ink }}>Add to your order</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {suggestions.map((p) => (
              <button key={p.id} onClick={() => onAdd(p.id)} className="flex-shrink-0 rounded-lg p-2 flex flex-col gap-1 items-start" style={{ background: colors.sand, width: 92 }}>
                <p className="text-[9px] font-semibold leading-tight" style={{ color: colors.ink }}>{p.name}</p>
                <p className="text-[9px] font-bold" style={{ color: colors.orangeDeep }}>+ KES {p.price}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {savedItems.length > 0 && (
        <div>
          <p className="text-xs font-bold mb-2" style={{ color: colors.ink }}>Saved for later</p>
          <div className="flex flex-col gap-2">
            {savedItems.map((p) => <ProductRow key={p.id} p={p} qty={0} onAdd={onAdd} onRemove={() => {}} fav={true} onToggleFav={() => {}} />)}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <input value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder="Promo code" className="flex-1 text-xs px-3 py-2 rounded-lg outline-none" style={{ background: colors.sand, color: colors.ink, border: `1px solid ${colors.line}` }} />
        <button onClick={onApplyPromo} className="text-xs font-bold px-3 py-2 rounded-lg" style={{ background: colors.ink, color: "#fff" }}>Apply</button>
      </div>
      {promoApplied && <p className="text-[10px] font-semibold" style={{ color: colors.greenDeep }}>Promo applied — 10% off subtotal</p>}

      <div className="rounded-xl p-3.5 flex flex-col gap-1" style={{ border: `1px solid ${colors.line}` }}>
        <div className="flex justify-between text-xs" style={{ color: colors.inkSoft }}><span>Subtotal</span><span>KES {subtotal.toLocaleString()}</span></div>
        {promoApplied && <div className="flex justify-between text-xs" style={{ color: colors.green }}><span>Promo discount</span><span>-KES {discount.toLocaleString()}</span></div>}
        <div className="flex justify-between text-sm font-bold pt-1" style={{ color: colors.ink, borderTop: `1px solid ${colors.line}` }}><span>Total</span><span>KES {(subtotal - discount).toLocaleString()}</span></div>
      </div>

      <button onClick={() => onCheckout(subtotal - discount)} className="w-full py-3 rounded-full text-sm font-bold active:scale-[0.98] transition-transform" style={{ background: colors.orange, color: "#fff" }}>Proceed to checkout</button>
    </div>
  );
}

function AddressSheet({ addresses, current, onSelect, onClose, onAddNew }) {
  const [adding, setAdding] = useState(false);
  const [label, setLabel] = useState("");
  const [detail, setDetail] = useState("");

  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end" style={{ background: "rgba(0,0,0,0.35)" }} onClick={onClose}>
      <div className="rounded-t-2xl p-5 flex flex-col gap-2" style={{ background: "#fff" }} onClick={(e) => e.stopPropagation()}>
        <p className="text-sm font-bold mb-1" style={{ color: colors.ink }}>Deliver to</p>
        {!adding && addresses.map((a) => (
          <button key={a.id} onClick={() => onSelect(a)} className="text-left px-3 py-2.5 rounded-lg" style={current?.id === a.id ? { background: colors.orange, color: "#fff" } : { background: colors.sand, color: colors.ink }}>
            <p className="text-xs font-bold">{a.label} {a.isDefault && <span className="text-[9px] font-normal opacity-80">· Default</span>}</p>
            <p className="text-[10px] opacity-90">{a.detail}</p>
          </button>
        ))}
        {!adding ? (
          <button onClick={() => setAdding(true)} className="text-xs font-bold px-3 py-2.5 rounded-lg text-left" style={{ background: colors.greenLight, color: colors.greenDeep }}>+ Add new address</button>
        ) : (
          <div className="flex flex-col gap-2 mt-1">
            <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label (e.g. Home, Office)" className="text-xs px-3 py-2 rounded-lg outline-none" style={{ background: colors.sand, border: `1px solid ${colors.line}` }} />
            <input value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="Street, building, apartment" className="text-xs px-3 py-2 rounded-lg outline-none" style={{ background: colors.sand, border: `1px solid ${colors.line}` }} />
            <button
              onClick={() => { if (label.trim() && detail.trim()) { onAddNew({ label, detail }); setAdding(false); setLabel(""); setDetail(""); } }}
              className="text-xs font-bold px-3 py-2.5 rounded-lg"
              style={{ background: colors.orange, color: "#fff" }}
            >Save address</button>
          </div>
        )}
      </div>
    </div>
  );
}

function CheckoutScreen({ branch, subtotal, addresses, onAddAddress, onBack, onPlaceOrder }) {
  const [fulfillment, setFulfillment] = useState("delivery"); // delivery | pickup
  const [address, setAddress] = useState(addresses.find((a) => a.isDefault) || addresses[0]);
  const [pickingAddr, setPickingAddr] = useState(false);
  const [slot, setSlot] = useState(deliverySlots[0]);
  const [payment, setPayment] = useState("M-Pesa");

  const { fee: deliveryFee, zone } = fulfillment === "delivery" ? feeForAddress(address, subtotal) : { fee: 0, zone: null };
  const total = subtotal + deliveryFee;
  const pointsEarned = Math.max(0, Math.round(total / 50));
  const slots = fulfillment === "delivery" ? deliverySlots : pickupSlots;

  function switchMode(m) { setFulfillment(m); setSlot(m === "delivery" ? deliverySlots[0] : pickupSlots[0]); }
  function addAddress(a) { const created = onAddAddress(a); setAddress(created); }

  return (
    <div className="flex flex-col gap-4 px-5 pt-4 pb-6">
      <div className="flex items-center gap-2"><button onClick={onBack} className="text-lg" style={{ color: colors.ink }}>←</button><p className="text-base font-bold" style={{ color: colors.ink }}>Checkout</p></div>

      <div className="flex gap-1.5 p-1 rounded-full" style={{ background: colors.sand }}>
        <button onClick={() => switchMode("delivery")} className="flex-1 text-xs font-bold py-1.5 rounded-full" style={fulfillment === "delivery" ? { background: colors.orange, color: "#fff" } : { color: colors.ink }}>Delivery</button>
        <button onClick={() => switchMode("pickup")} className="flex-1 text-xs font-bold py-1.5 rounded-full" style={fulfillment === "pickup" ? { background: colors.orange, color: "#fff" } : { color: colors.ink }}>Pickup in store</button>
      </div>

      {fulfillment === "delivery" ? (
        <button onClick={() => setPickingAddr(true)} className="rounded-lg px-3 py-2.5 text-left" style={{ background: colors.sand }}>
          <p className="text-[10px] font-bold" style={{ color: colors.inkSoft }}>DELIVER TO</p>
          <div className="flex justify-between items-center">
            <div><p className="text-xs font-bold" style={{ color: colors.ink }}>{address.label}</p><p className="text-[10px]" style={{ color: colors.inkSoft }}>{address.detail}</p></div>
            <span style={{ color: colors.inkSoft }}>Change ›</span>
          </div>
        </button>
      ) : (
        <div className="rounded-lg px-3 py-2.5" style={{ background: colors.sand }}>
          <p className="text-[10px] font-bold" style={{ color: colors.inkSoft }}>PICKUP FROM</p>
          <p className="text-xs font-bold" style={{ color: colors.ink }}>{branch}</p>
        </div>
      )}

      <div>
        <p className="text-xs font-semibold mb-2" style={{ color: colors.ink }}>{fulfillment === "delivery" ? "Delivery slot" : "Pickup time"}</p>
        <p className="text-[10px] mb-2 italic" style={{ color: colors.inkSoft }}>{fulfillment === "delivery" ? "Slot availability & dispatch handled by Naivas Delivery" : "Order is prepared and held at the till point"}</p>
        <div className="flex flex-col gap-1.5">
          {slots.map((s) => (
            <button key={s} onClick={() => setSlot(s)} className="text-left text-xs font-medium px-3 py-2 rounded-lg" style={slot === s ? { background: colors.orange, color: "#fff" } : { background: colors.sand, color: colors.ink }}>{s}</button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold mb-2" style={{ color: colors.ink }}>Payment</p>
        <div className="flex gap-1.5">
          {["M-Pesa", "Card"].map((m) => (
            <button key={m} onClick={() => setPayment(m)} className="text-xs font-semibold px-3 py-1.5 rounded-full" style={payment === m ? { background: colors.ink, color: "#fff" } : { background: colors.sand, color: colors.ink }}>{m}</button>
          ))}
        </div>
      </div>

      <div className="rounded-xl p-3.5 flex flex-col gap-1" style={{ border: `1px solid ${colors.line}` }}>
        <div className="flex justify-between text-xs" style={{ color: colors.inkSoft }}><span>Subtotal</span><span>KES {subtotal.toLocaleString()}</span></div>
        {fulfillment === "delivery" && (
          <div className="flex justify-between text-xs" style={{ color: deliveryFee === 0 ? colors.green : colors.inkSoft }}>
            <span>Delivery fee {zone && <span className="italic">({zone})</span>}</span><span>{deliveryFee === 0 ? "Free" : `KES ${deliveryFee}`}</span>
          </div>
        )}
        {fulfillment === "pickup" && <div className="flex justify-between text-xs" style={{ color: colors.green }}><span>Pickup fee</span><span>Free</span></div>}
        <div className="flex justify-between text-sm font-bold pt-1" style={{ color: colors.ink, borderTop: `1px solid ${colors.line}` }}><span>Total</span><span>KES {total.toLocaleString()}</span></div>
        <div className="flex justify-between text-[11px] font-semibold" style={{ color: colors.gold }}><span>Rewards balance will earn</span><span>+{pointsEarned} pts</span></div>
      </div>

      <button onClick={() => onPlaceOrder({ total, fulfillment, address: fulfillment === "delivery" ? address : null, slot })} className="w-full py-3 rounded-full text-sm font-bold active:scale-[0.98] transition-transform" style={{ background: colors.orange, color: "#fff" }}>Place order</button>

      {pickingAddr && <AddressSheet addresses={addresses} current={address} onSelect={(a) => { setAddress(a); setPickingAddr(false); }} onClose={() => setPickingAddr(false)} onAddNew={(a) => { addAddress(a); setPickingAddr(false); }} />}
    </div>
  );
}

function ConfirmationScreen({ order, onDone }) {
  const isDelivery = order.fulfillment === "delivery";
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-8 py-12 text-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold" style={{ background: colors.greenLight, color: colors.greenDeep }}>✓</div>
      <p className="text-lg font-bold" style={{ color: colors.ink }}>Order {order.id} placed</p>
      <p className="text-sm" style={{ color: colors.inkSoft }}>KES {order.total.toLocaleString()}</p>
      <div className="w-full rounded-xl p-3.5 text-left mt-1" style={{ background: colors.sand }}>
        <p className="text-[10px] font-bold" style={{ color: colors.inkSoft }}>{isDelivery ? "DELIVERING TO" : "PICKUP FROM"}</p>
        <p className="text-xs font-bold" style={{ color: colors.ink }}>{isDelivery ? order.address.label : "Naivas branch"}</p>
        {isDelivery && <p className="text-[10px]" style={{ color: colors.inkSoft }}>{order.address.detail}</p>}
        <p className="text-[10px] mt-1" style={{ color: colors.inkSoft }}>{order.slot}</p>
      </div>
      <p className="text-[11px]" style={{ color: colors.inkSoft }}>{isDelivery ? "Sent to Naivas Delivery for dispatch — track it from Orders." : "We'll notify you when it's ready at the till point."}</p>
      <button onClick={onDone} className="w-full py-3 rounded-full text-sm font-bold mt-2" style={{ background: colors.ink, color: "#fff" }}>Back to shop</button>
    </div>
  );
}

function OrdersScreen({ orders, onReorder }) {
  return (
    <div className="flex flex-col gap-4 px-5 pt-3 pb-6">
      <p className="text-lg font-bold" style={{ color: colors.ink }}>Your orders</p>
      <div className="flex flex-col gap-2.5">
        {orders.map((o) => {
          const inProgress = o.status !== "Delivered" && o.status !== "Ready for pickup";
          return (
            <div key={o.id} className="rounded-xl p-3.5" style={{ border: `1px solid ${colors.line}`, background: "#fff" }}>
              <div className="flex justify-between items-start">
                <div><p className="text-xs font-semibold" style={{ color: colors.ink }}>{o.id}</p><p className="text-[10px]" style={{ color: colors.inkSoft }}>{o.date} · {o.items} items</p></div>
                <Pill tone={o.status === "Delivered" || o.status === "Ready for pickup" ? "green" : "orange"}>
                  {inProgress && <span className="inline-block w-1.5 h-1.5 rounded-full mr-1" style={{ background: "#fff" }} />}{o.status}
                </Pill>
              </div>
              {inProgress && (
                <p className="text-[10px] mt-1" style={{ color: colors.inkSoft }}>Live tracking via Naivas Delivery</p>
              )}
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs font-bold" style={{ color: colors.ink }}>KES {o.total.toLocaleString()}</p>
                <button onClick={() => onReorder(o)} className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: colors.orange, color: "#fff" }}>Reorder</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AccountScreen({ branch, addresses }) {
  const [showAddresses, setShowAddresses] = useState(false);
  return (
    <div className="flex flex-col gap-4 px-5 pt-3 pb-6">
      <p className="text-lg font-bold" style={{ color: colors.ink }}>Account</p>
      <div className="rounded-xl p-3.5 flex items-center gap-3" style={{ border: `1px solid ${colors.line}`, background: "#fff" }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: colors.sand, color: colors.ink }}>VM</div>
        <div><p className="text-sm font-bold" style={{ color: colors.ink }}>Vincent Macharia</p><p className="text-[10px]" style={{ color: colors.inkSoft }}>Default branch: {branch}</p></div>
      </div>

      <button onClick={() => setShowAddresses((s) => !s)} className="flex items-center justify-between rounded-lg px-3.5 py-3" style={{ background: colors.sand }}>
        <span className="text-xs font-semibold" style={{ color: colors.ink }}>Saved addresses ({addresses.length})</span>
        <span style={{ color: colors.inkSoft }}>{showAddresses ? "︿" : "›"}</span>
      </button>
      {showAddresses && (
        <div className="flex flex-col gap-1.5 -mt-2">
          {addresses.map((a) => (
            <div key={a.id} className="rounded-lg px-3.5 py-2.5" style={{ background: colors.greenLight }}>
              <p className="text-xs font-bold" style={{ color: colors.ink }}>{a.label} {a.isDefault && <span className="text-[9px] font-normal" style={{ color: colors.inkSoft }}>· Default</span>}</p>
              <p className="text-[10px]" style={{ color: colors.inkSoft }}>{a.detail} · {a.distanceKm} km from {branch}</p>
            </div>
          ))}
        </div>
      )}

      {["Payment methods", "Naivas Rewards", "Notifications", "Help & support"].map((item) => (
        <div key={item} className="flex items-center justify-between rounded-lg px-3.5 py-3" style={{ background: colors.sand }}>
          <span className="text-xs font-semibold" style={{ color: colors.ink }}>{item}</span>
          <span style={{ color: colors.inkSoft }}>›</span>
        </div>
      ))}
    </div>
  );
}

function BranchSheet({ current, onSelect, onClose }) {
  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end" style={{ background: "rgba(0,0,0,0.35)" }} onClick={onClose}>
      <div className="rounded-t-2xl p-5 flex flex-col gap-2" style={{ background: "#fff" }} onClick={(e) => e.stopPropagation()}>
        <p className="text-sm font-bold mb-1" style={{ color: colors.ink }}>Choose your branch</p>
        {branches.map((b) => (
          <button key={b} onClick={() => onSelect(b)} className="text-left text-xs font-semibold px-3 py-2.5 rounded-lg" style={b === current ? { background: colors.orange, color: "#fff" } : { background: colors.sand, color: colors.ink }}>{b}</button>
        ))}
      </div>
    </div>
  );
}

function TabIcon({ type, active, color }) {
  if (type === "shop") return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 11.5 12 4l8 7.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 10v9h12v-9" stroke={color} strokeWidth="1.8" strokeLinejoin="round" /></svg>);
  if (type === "cart") return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="20" r="1.3" stroke={color} strokeWidth="1.6" /><circle cx="17" cy="20" r="1.3" stroke={color} strokeWidth="1.6" /><path d="M3 4h2l2.2 11h10.6L20 7H6.2" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>);
  if (type === "orders") return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 3h12v18l-2.5-1.5L13 21l-2.5-1.5L8 21l-2-1.5V3Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 8h6M9 12h6M9 16h3" stroke={color} strokeWidth="1.6" strokeLinecap="round" /></svg>);
  return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.2" stroke={color} strokeWidth="1.8" /><path d="M5 20c1.5-3.5 4.5-5.5 7-5.5S17.5 16.5 19 20" stroke={color} strokeWidth="1.8" strokeLinecap="round" /></svg>);
}

export default function NaivasOnlinePrototype() {
  const [tab, setTab] = useState("shop");
  const [mode, setMode] = useState("tabs"); // tabs | checkout | confirmed
  const [branch, setBranch] = useState(branches[0]);
  const [pickingBranch, setPickingBranch] = useState(false);
  const [cart, setCart] = useState({});
  const [favs, setFavs] = useState({});
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkoutSubtotal, setCheckoutSubtotal] = useState(0);
  const [addresses, setAddresses] = useState(initialAddresses);
  const [orders, setOrders] = useState(pastOrders);
  const [lastOrder, setLastOrder] = useState(null);
  const orderSeq = React.useRef(10230);
  const addrSeq = React.useRef(100);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartItemCount = () => Object.values(cart).reduce((a, b) => a + b, 0);

  function addToCart(id) { setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 })); }
  function removeFromCart(id) { setCart((c) => { const q = (c[id] || 0) - 1; const n = { ...c }; if (q <= 0) delete n[id]; else n[id] = q; return n; }); }
  function toggleFav(id) { setFavs((f) => ({ ...f, [id]: !f[id] })); }
  function applyPromo() { if (promoCode.trim().length > 0) setPromoApplied(true); }
  function goCheckout(subtotal) { setCheckoutSubtotal(subtotal); setMode("checkout"); }
  function addAddress({ label, detail }) {
    addrSeq.current += 1;
    const created = { id: addrSeq.current, label, detail, distanceKm: +(1 + Math.random() * 6).toFixed(1), isDefault: false };
    setAddresses((prev) => [...prev, created]);
    return created;
  }
  function placeOrder({ total, fulfillment, address, slot }) {
    orderSeq.current += 1;
    const id = `NV-${orderSeq.current}`;
    setLastOrder({ id, total, fulfillment, address, slot });
    setOrders((prev) => [{ id, date: "Just now", items: cartItemCount(), total, status: fulfillment === "delivery" ? "Preparing" : "Preparing for pickup" }, ...prev]);
    setCart({}); setPromoApplied(false); setPromoCode("");
    setMode("confirmed");
  }
  function reorder(o) { setCart({ 1: 2, 2: 1, 3: 1 }); setTab("cart"); }

  let body;
  if (mode === "checkout") body = <CheckoutScreen branch={branch} subtotal={checkoutSubtotal} addresses={addresses} onAddAddress={addAddress} onBack={() => setMode("tabs")} onPlaceOrder={placeOrder} />;
  else if (mode === "confirmed") body = <ConfirmationScreen order={lastOrder} onDone={() => { setMode("tabs"); setTab("orders"); }} />;
  else if (tab === "shop") body = <ShopScreen branch={branch} onChangeBranch={() => setPickingBranch(true)} cart={cart} favs={favs} onAdd={addToCart} onRemove={removeFromCart} onToggleFav={toggleFav} />;
  else if (tab === "cart") body = <CartScreen cart={cart} favs={favs} onAdd={addToCart} onRemove={removeFromCart} onGoShop={() => setTab("shop")} onCheckout={goCheckout} promoCode={promoCode} setPromoCode={setPromoCode} promoApplied={promoApplied} onApplyPromo={applyPromo} />;
  else if (tab === "orders") body = <OrdersScreen orders={orders} onReorder={reorder} />;
  else body = <AccountScreen branch={branch} addresses={addresses} />;

  const tabDefs = [
    { id: "shop", label: "Shop" }, { id: "cart", label: "Cart" },
    { id: "orders", label: "Orders" }, { id: "account", label: "Account" },
  ];
  const showTabBar = mode === "tabs";

  return (
    <div className="w-full min-h-[720px] flex flex-col items-center py-8 gap-4" style={{ background: "#EDEAE2" }}>
      <div className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: colors.ink, color: "#fff" }}>Project 2 of 3 — Naivas Online (eCommerce)</div>
      <div className="relative w-[380px] rounded-[2.2rem] overflow-hidden flex flex-col" style={{ background: colors.cream, boxShadow: "0 20px 50px rgba(0,0,0,0.22)", border: "8px solid #1c1a17", height: 700 }}>
        <div className="flex items-center justify-between px-5 pt-3 pb-1 text-[10px] font-semibold flex-shrink-0" style={{ color: colors.inkSoft }}><span>9:41</span><span>●●●</span></div>
        <div className="relative flex-1 overflow-y-auto">
          {body}
          {pickingBranch && <BranchSheet current={branch} onSelect={(b) => { setBranch(b); setPickingBranch(false); }} onClose={() => setPickingBranch(false)} />}
        </div>
        {showTabBar && (
          <div className="flex items-stretch justify-around px-2 pt-2 pb-3 flex-shrink-0" style={{ background: "#fff", borderTop: `1px solid ${colors.line}` }}>
            {tabDefs.map((t) => {
              const active = t.id === tab;
              const c = active ? colors.orange : colors.inkSoft;
              return (
                <button key={t.id} onClick={() => setTab(t.id)} className="flex flex-col items-center gap-1 px-3 py-1 relative">
                  <TabIcon type={t.id} active={active} color={c} />
                  {t.id === "cart" && cartCount > 0 && (
                    <span className="absolute -top-0.5 right-1 w-3.5 h-3.5 rounded-full text-[8px] font-bold flex items-center justify-center" style={{ background: colors.red, color: "#fff" }}>{cartCount}</span>
                  )}
                  <span className="text-[10px] font-semibold" style={{ color: c }}>{t.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
