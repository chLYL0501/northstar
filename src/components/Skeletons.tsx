export function TickerSkeleton() {
  return (
    <div className="flex items-center gap-5 lg:gap-8 h-8 overflow-x-auto scrollbar-none">
      {["62px", "56px", "52px"].map((w, i) => (
        <div key={i} className="flex items-center gap-2.5 animate-pulse">
          <div className="skeleton w-[26px] h-[10px]" />
          <div className="skeleton h-[10px]" style={{ width: w }} />
        </div>
      ))}
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <section className="pt-12 pb-10 md:pt-16 md:pb-14">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 animate-pulse">
        <div className="flex items-center gap-3 mb-6">
          <div className="skeleton w-20 h-[10px]" />
          <div className="skeleton w-14 h-[18px] rounded-full" />
        </div>
        <div className="flex items-center gap-3 mb-8">
          <div className="skeleton w-10 h-[13px]" />
          <div className="skeleton w-14 h-[13px]" />
        </div>
        <div className="skeleton w-32 h-[24px] rounded-full mb-6" />
        <div className="skeleton w-full h-[48px] mb-3" />
        <div className="skeleton w-3/4 h-[48px] mb-6" />
        <div className="skeleton w-2/3 h-[15px] mb-8" />
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="skeleton w-full h-[72px] rounded-lg" />
          <div className="skeleton w-full h-[72px] rounded-lg" />
          <div className="skeleton w-full h-[72px] rounded-lg" />
        </div>
        <div className="flex gap-5">
          <div className="skeleton w-16 h-[13px]" />
          <div className="skeleton w-20 h-[13px]" />
          <div className="skeleton w-14 h-[13px]" />
        </div>
      </div>
    </section>
  )
}

export function StockRowSkeleton() {
  return (
    <div className="grid grid-cols-12 gap-2 px-5 py-3.5 animate-pulse">
      <div className="col-span-3 space-y-1">
        <div className="skeleton w-12 h-[13px]" />
        <div className="skeleton w-20 h-[10px]" />
      </div>
      <div className="col-span-2 flex justify-end"><div className="skeleton w-14 h-[13px]" /></div>
      <div className="col-span-1 flex justify-end"><div className="skeleton w-10 h-[11px]" /></div>
      <div className="col-span-2 hidden sm:flex justify-end"><div className="skeleton w-14 h-[11px]" /></div>
      <div className="col-span-2 hidden sm:flex justify-end"><div className="skeleton w-10 h-[11px]" /></div>
      <div className="col-span-2 hidden sm:flex justify-end"><div className="skeleton w-16 h-[11px]" /></div>
    </div>
  )
}

export function SignalCardSkeleton() {
  return (
    <div className="border border-gray-100 rounded-lg p-4 animate-pulse">
      <div className="flex justify-between mb-2.5">
        <div className="skeleton w-20 h-[10px]" />
        <div className="skeleton w-3 h-3" />
      </div>
      <div className="skeleton w-full h-[13px] mb-1" />
      <div className="skeleton w-3/4 h-[11px] mb-3" />
      <div className="border-t border-gray-100 pt-2.5 flex gap-1.5">
        <div className="skeleton w-3 h-3" />
        <div className="skeleton w-12 h-[13px]" />
      </div>
    </div>
  )
}
