import type { ReactNode } from "react";

export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full w-full items-center justify-center px-4 py-8">
      <div className="relative h-[812px] w-[375px] max-w-full overflow-hidden rounded-[2.75rem] border-[10px] border-naivas-ink bg-naivas-cream shadow-2xl">
        <div className="absolute left-1/2 top-0 z-20 h-6 w-36 -translate-x-1/2 rounded-b-2xl bg-naivas-ink" />
        <div className="flex h-full flex-col">{children}</div>
      </div>
    </div>
  );
}
