import { useEffect, useState, useCallback } from "react"
import { IndexQuote, fetchIndices } from "@/services/realDataService"
import { TickerSkeleton } from "@/components/Skeletons"
import { RefreshCw } from "lucide-react"
import ErrorBoundary from "@/components/ErrorBoundary"
import { formatETTimeWithSeconds } from "@/services/formatDate"

function TickerItem({ data }: { data: IndexQuote }) {
  const isPositive = data.changePercent >= 0
  if (data.symbol === "—") return null

  return (
    <div className="flex items-center gap-2.5 whitespace-nowrap">
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
      </span>
      <span className="text-[10px] font-semibold tracking-wide text-gray-400 uppercase">
        {data.symbol}
      </span>
      <span className="text-[10px] tabular-nums text-gray-600">
        {data.price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>
      <span
        className={`text-[10px] font-medium tabular-nums ${
          isPositive ? "text-emerald-600" : "text-red-500"
        }`}
      >
        {isPositive ? "+" : ""}{data.change.toFixed(2)}
        <span className="text-gray-300 mx-0.5">|</span>
        {isPositive ? "+" : ""}{data.changePercent.toFixed(2)}%
      </span>
    </div>
  )
}

export default function MiniTicker() {
  const [indices, setIndices] = useState<IndexQuote[] | null>(null)
  const [error, setError] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string>("")

  const load = useCallback(async () => {
    setError(false)
    try {
      const data = await fetchIndices()
      setIndices(data)
      setLastUpdated(formatETTimeWithSeconds())
    } catch {
      setError(true)
    }
  }, [])

  useEffect(() => {
    load()
    const t = setInterval(load, 120_000)
    return () => clearInterval(t)
  }, [load])

  return (
    <ErrorBoundary>
      <div className="relative z-30 bg-white/95 backdrop-blur-md border-b border-gray-100/60">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          {!indices && !error ? (
            <TickerSkeleton />
          ) : error ? (
            <div className="flex items-center justify-center gap-3 h-9">
              <span className="text-[10px] text-gray-400">Market data unavailable</span>
              <button
                onClick={load}
                className="text-[10px] text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
              >
                <RefreshCw className="w-2.5 h-2.5" />
                Retry
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between h-9">
              <div className="flex items-center gap-5 lg:gap-8 overflow-x-auto scrollbar-none">
                <span className="inline-flex items-center gap-1.5 text-[9px] font-semibold text-emerald-600 shrink-0 mr-1">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-live-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-500" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                  LIVE
                </span>
                {indices!.map((idx) => (
                  <TickerItem key={idx.symbol} data={idx} />
                ))}
              </div>
              {lastUpdated && (
                <span className="text-[9px] text-gray-300 shrink-0 hidden sm:block ml-4 tabular-nums">
                  {lastUpdated}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  )
}
