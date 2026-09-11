import type { ToastState } from "../state/useRewardsStore";

export default function Toast({ toast }: { toast: ToastState | null }) {
  if (!toast) return null;
  return (
    <div
      key={toast.id}
      className={`animate-toast absolute bottom-24 left-1/2 z-30 w-[88%] -translate-x-1/2 rounded-xl px-4 py-3 text-center text-sm font-medium text-white shadow-lg ${
        toast.tone === "success" ? "bg-naivas-green" : "bg-red-500"
      }`}
    >
      {toast.message}
    </div>
  );
}
