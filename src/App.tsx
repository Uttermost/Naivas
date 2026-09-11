import { useState } from "react";
import PhoneFrame from "./components/PhoneFrame";
import StatusBar from "./components/StatusBar";
import BottomNav, { type Screen } from "./components/BottomNav";
import Toast from "./components/Toast";
import AboutModal from "./components/AboutModal";
import HomeScreen from "./screens/HomeScreen";
import RewardsScreen from "./screens/RewardsScreen";
import ActivityScreen from "./screens/ActivityScreen";
import { useRewardsStore } from "./state/useRewardsStore";

const TITLES: Record<Screen, string> = {
  home: "Naivas Rewards",
  rewards: "Naivas Rewards",
  activity: "Naivas Rewards",
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [aboutOpen, setAboutOpen] = useState(false);
  const store = useRewardsStore();

  return (
    <div className="min-h-screen w-full bg-[#eef0f2]">
      <PhoneFrame>
        <StatusBar title={TITLES[screen]} onMenu={() => setAboutOpen(true)} />

        {screen === "home" && (
          <HomeScreen
            balance={store.balance}
            tierStatus={store.tierStatus}
            isScanning={store.isScanning}
            onScan={store.scanReceipt}
            onBrowseRewards={() => setScreen("rewards")}
            offers={store.personalizedOffers}
            isAnalyzing={store.isAnalyzing}
            highlightedOfferId={store.highlightedOfferId}
            redeemedIds={store.redeemedIds}
            onRedeemOffer={(id, title, cost) => store.redeem(id, title, cost, "Groceries")}
          />
        )}
        {screen === "rewards" && (
          <RewardsScreen
            balance={store.balance}
            redeemedIds={store.redeemedIds}
            onRedeem={store.redeem}
          />
        )}
        {screen === "activity" && <ActivityScreen activity={store.activity} />}

        <BottomNav active={screen} onChange={setScreen} />

        <Toast toast={store.toast} />
        {aboutOpen && (
          <AboutModal tierStatus={store.tierStatus} onClose={() => setAboutOpen(false)} />
        )}
      </PhoneFrame>
    </div>
  );
}
