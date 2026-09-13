import React from "react";
import { HashRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import NaivasRewardsPrototype from "./components/RewardsDemo.jsx";
import NaivasOnlinePrototype from "./components/OnlineDemo.jsx";
import NaivasDeliveryPrototype from "./components/DeliveryDemo.jsx";
import NaivasDeliveryOpsDashboard from "./components/OpsDashboardDemo.jsx";

const demos = [
  { path: "/rewards", label: "Naivas Rewards", sub: "Loyalty", Component: NaivasRewardsPrototype },
  { path: "/online", label: "Naivas Online", sub: "eCommerce", Component: NaivasOnlinePrototype },
  { path: "/delivery", label: "Naivas Delivery", sub: "Fulfilment", Component: NaivasDeliveryPrototype },
  { path: "/ops-dashboard", label: "Delivery Ops Dashboard", sub: "Internal tooling", Component: NaivasDeliveryOpsDashboard },
];

function NavBar() {
  const location = useLocation();
  return (
    <nav style={{ background: "#0D1B2A", padding: "14px 24px", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", position: "sticky", top: 0, zIndex: 50 }}>
      <Link to="/" style={{ color: "#fff", fontWeight: 800, fontSize: 14, textDecoration: "none", letterSpacing: 0.5 }}>
        GRAPH TECHNOLOGIES
      </Link>
      <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
      {demos.map((d) => (
        <Link
          key={d.path}
          to={d.path}
          style={{
            color: location.pathname === d.path ? "#D9A53B" : "rgba(255,255,255,0.75)",
            fontWeight: 600,
            fontSize: 13,
            textDecoration: "none",
          }}
        >
          {d.label}
        </Link>
      ))}
    </nav>
  );
}

function Landing() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px", fontFamily: "inherit" }}>
      <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, color: "#1E8A8A", textTransform: "uppercase", marginBottom: 8 }}>
        Graph Technologies · Prototype Suite
      </p>
      <h1 style={{ fontSize: 34, fontWeight: 800, color: "#16243F", margin: "0 0 12px 0" }}>
        The Naivas Digital Ecosystem — Demos
      </h1>
      <p style={{ fontSize: 15, color: "#5B6B80", lineHeight: 1.6, marginBottom: 32 }}>
        Four working, interactive prototypes built alongside the Naivas Digital Ecosystem proposal —
        each a separately scoped project, connected only through a shared rewards ledger.
        Pick one below.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {demos.map((d) => (
          <Link
            key={d.path}
            to={d.path}
            style={{
              display: "block",
              border: "1px solid #DDE4EC",
              borderRadius: 10,
              padding: "20px 18px",
              textDecoration: "none",
              background: "#fff",
              transition: "box-shadow 0.15s",
            }}
          >
            <p style={{ fontSize: 10, fontWeight: 700, color: "#1E8A8A", textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 4px 0" }}>
              {d.sub}
            </p>
            <p style={{ fontSize: 17, fontWeight: 800, color: "#16243F", margin: 0 }}>{d.label} →</p>
          </Link>
        ))}
      </div>
      <p style={{ fontSize: 12, color: "#8A97A8", marginTop: 40 }}>
        Built by Graph Technologies · graph.co.ke
      </p>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        {demos.map((d) => (
          <Route key={d.path} path={d.path} element={<d.Component />} />
        ))}
      </Routes>
    </HashRouter>
  );
}
