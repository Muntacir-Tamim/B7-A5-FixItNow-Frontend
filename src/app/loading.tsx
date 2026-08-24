export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 rounded-full border-[3px] border-[#ff7308]/20" />

        <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-[#ff7308] border-r-[#ff7308]" />

        <div className="absolute inset-3 animate-pulse rounded-full bg-[#ff7308]/10" />
      </div>

      <p className="mt-8 text-sm font-medium tracking-[0.2em] text-[#ff7308] uppercase">
        Loading...
      </p>
    </div>
  );
}
