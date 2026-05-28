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
    <section className="pt-10 pb-8 md:pt-14 md:pb-12">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 animate-pulse">
        <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="skeleton w-20 h-[10px]" />
              <div className="skeleton w-14 h-[18px] rounded-full" />
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="skeleton w-10 h-[13px]" />
              <div className="skeleton w-14 h-[13px]" />
            </div>
            <div className="skeleton w-full h-[40px] mb-3" />
            <div className="skeleton w-3/4 h-[40px] mb-5" />
            <div className="skeleton w-full h-[15px] mb-2" />
            <div className="skeleton w-2/3 h-[15px] mb-5" />
            <div className="skeleton w-24 h-[10px] mb-3" />
            <div className="space-y-2">
              <div className="skeleton w-full h-[12px]" />
              <div className="skeleton w-3/4 h-[12px]" />
              <div className="skeleton w-5/6 h-[12px]" />
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            <div className="skeleton w-32 h-[11px] mb-4" />
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="skeleton w-full h-[52px] rounded-lg" />
              <div className="skeleton w-full h-[52px] rounded-lg" />
              <div className="skeleton w-full h-[52px] rounded-lg" />
            </div>
            <div className="skeleton w-full h-[100px] rounded-lg" />
          </div>
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
