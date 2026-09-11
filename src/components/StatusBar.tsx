export default function StatusBar({
  title,
  onMenu,
}: {
  title: string;
  onMenu?: () => void;
}) {
  return (
    <div className="flex shrink-0 items-center justify-between px-5 pb-2 pt-8 text-naivas-ink">
      <span className="text-sm font-semibold">9:41</span>
      <span className="text-sm font-semibold">{title}</span>
      <button
        type="button"
        onClick={onMenu}
        aria-label="More options"
        className="flex h-6 w-6 items-center justify-center rounded-full text-lg leading-none hover:bg-black/5"
      >
        •••
      </button>
    </div>
  );
}
