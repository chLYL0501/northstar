import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react"
import Navbar from "@/components/Navbar"
import MiniTicker from "@/components/MiniTicker"
import { StockQuote, fetchAllStocks, getStockNames } from "@/services/realDataService"
import { StockRowSkeleton } from "@/components/Skeletons"
import ErrorBoundary from "@/components/ErrorBoundary"
import { useScrollReveal } from "@/hooks/useScrollReveal"

const FUNDAMENTALS: Record<string, { mcap: string; revGrowth: string; aiRevenue: string }> = {
  NVDA: { mcap: "$2.8T", revGrowth: "+82%", aiRevenue: "~$180B Ann." },
  MSFT: { mcap: "$3.4T", revGrowth: "+16%", aiRevenue: "~$25B Copilot" },
  AVGO: { mcap: "$920B", revGrowth: "+89%", aiRevenue: "Custom AI chips" },
  ANET: { mcap: "$118B", revGrowth: "+35%", aiRevenue: "800G switching" },
  NEE: { mcap: "$161B", revGrowth: "+12%", aiRevenue: "4.2 GW DC PPAs" },
  VST: { mcap: "$55B", revGrowth: "+28%", aiRevenue: "Nuclear DC power" },
  AMAT: { mcap: "$195B", revGrowth: "+22%", aiRevenue: "Deposition & etch" },
  MU: { mcap: "$152B", revGrowth: "+41%", aiRevenue: "HBM3e memory" },
}

export default function RelatedStocks() {
  const [quotes, setQuotes] = useState<StockQuote[] | null>(null)
  const [loading, setLoading] = useState(true)
  const { ref: r1, isVisible: v1 } = useScrollReveal(0.04)
  const names = getStockNames()

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchAllStocks()
      .then(setQuotes)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <MiniTicker />
      <Navbar />

      <article className="pt-20 pb-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-gray-700 transition-colors mb-6 group hover-scale-sm">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
            Back to Narrative
          </Link>

          <h1 className="font-display text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] leading-[1.12] tracking-[-0.018em] text-gray-900 mb-3">
            AI Capex: Related Stocks
          </h1>
          <p className="text-[15px] leading-[1.75] text-gray-500 mb-8">
            The companies capturing margin across the AI infrastructure value chain. Live market data via Yahoo Finance.
          </p>

          <ErrorBoundary>
            <div ref={r1} className={v1 ? "visible reveal" : "reveal"}>
              {loading ? (
                <div className="border border-gray-100 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-12 gap-2 px-5 py-3 bg-[#F5F5F7] text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                    <span className="col-span-3">Ticker</span>
                    <span className="col-span-2 text-right">Price</span>
                    <span className="col-span-1 text-right">Δ%</span>
                    <span className="col-span-2 text-right hidden sm:block">Mkt Cap</span>
                    <span className="col-span-2 text-right hidden sm:block">Rev Growth</span>
                    <span className="col-span-2 text-right hidden sm:block">AI Revenue</span>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {[...Array(8)].map((_, i) => (
                      <StockRowSkeleton key={i} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="border border-gray-100 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-12 gap-2 px-5 py-3 bg-[#F5F5F7] text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                    <span className="col-span-3">Ticker</span>
                    <span className="col-span-2 text-right">Price</span>
                    <span className="col-span-1 text-right">Δ%</span>
                    <span className="col-span-2 text-right hidden sm:block">Mkt Cap</span>
                    <span className="col-span-2 text-right hidden sm:block">Rev Growth</span>
                    <span className="col-span-2 text-right hidden sm:block">AI Revenue</span>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {Object.entries(names).map(([symbol, name]) => {
                      const q = quotes?.find((q) => q.symbol === symbol)
                      const f = FUNDAMENTALS[symbol]
                      const isPos = (q?.changePercent ?? 0) >= 0
                      return (
                        <div key={symbol} className="grid grid-cols-12 gap-2 px-5 py-3.5 items-center hover:bg-gray-50/50 transition-colors duration-200">
                          <div className="col-span-3">
                            <p className="text-sm font-semibold text-gray-900">{symbol}</p>
                            <p className="text-[11px] text-gray-400">{name}</p>
                          </div>
                          <div className="col-span-2 text-right">
                            {q && q.symbol !== "—" ? (
                              <span className="text-sm font-bold tabular-nums text-gray-900">
                                ${q.price.toFixed(2)}
                              </span>
                            ) : (
                              <span className="text-[11px] text-gray-400">—</span>
                            )}
                          </div>
                          <div className="col-span-1 text-right">
                            {q && q.symbol !== "—" && (
                              <span className={`text-[11px] font-bold tabular-nums flex items-center justify-end gap-0.5 ${isPos ? "text-emerald-600" : "text-red-500"}`}>
                                {isPos ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                {isPos ? "+" : ""}{q.changePercent.toFixed(1)}%
                              </span>
                            )}
                          </div>
                          <div className="col-span-2 text-right hidden sm:block">
                            {f && <span className="text-[11px] tabular-nums text-gray-600">{f.mcap}</span>}
                          </div>
                          <div className="col-span-2 text-right hidden sm:block">
                            {f && <span className="text-[11px] tabular-nums text-gray-600">{f.revGrowth}</span>}
                          </div>
                          <div className="col-span-2 text-right hidden sm:block">
                            {f && <span className="text-[11px] text-gray-600">{f.aiRevenue}</span>}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </ErrorBoundary>

          <div className="mt-10 text-center">
            <p className="text-[10px] text-gray-400">
              Data: Yahoo Finance · Delayed · Refreshed every 2 minutes
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}
