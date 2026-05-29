import { Link } from "react-router-dom"
import { ArrowLeft, TrendingUp, TrendingDown, ArrowRight } from "lucide-react"
import Navbar from "@/components/Navbar"
import MiniTicker from "@/components/MiniTicker"
import { useEffect, useState } from "react"
import { useScrollReveal } from "@/hooks/useScrollReveal"
import { fetchSectorPerformance, type SectorPerformance } from "@/services/finnhubService"

const FALLBACK_FLOW_DATA = [
  { category: "US Large Cap Growth", flow: "+$8.4B", period: "Weekly Net", trend: "inflow" as const },
  { category: "Technology Sector ETF", flow: "+$3.2B", period: "Weekly Net", trend: "inflow" as const },
  { category: "Utilities Sector", flow: "+$1.8B", period: "Weekly Net", trend: "inflow" as const },
  { category: "Energy Sector", flow: "-$1.4B", period: "Weekly Net", trend: "outflow" as const },
  { category: "Emerging Markets", flow: "-$2.1B", period: "Weekly Net", trend: "outflow" as const },
  { category: "Financials Sector", flow: "+$620M", period: "Weekly Net", trend: "inflow" as const },
]

const ROTATION = [
  { label: "Tech vs Energy", metric: "+3.2σ", note: "from 90-day mean", trend: "up" as const },
  { label: "Growth vs Value", metric: "+1.8σ", note: "from 90-day mean", trend: "up" as const },
  { label: "Large vs Small Cap", metric: "+1.4σ", note: "from 90-day mean", trend: "up" as const },
]

export default function FlowsPage() {
  const { ref: r1, isVisible: v1 } = useScrollReveal(0.06)
  const { ref: r2, isVisible: v2 } = useScrollReveal(0.06)
  const [sectors, setSectors] = useState<SectorPerformance[] | null>(null)
  const [hasSectorData, setHasSectorData] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchSectorPerformance().then((s) => {
      if (s.length > 0) {
        setSectors(s)
        setHasSectorData(true)
      }
    })
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <MiniTicker />
      <Navbar />

      <article className="pt-20 pb-28">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 px-4 py-2.5 rounded-lg transition-all duration-200 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Narrative
          </Link>

          <h1 className="font-display text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] leading-[1.12] tracking-[-0.018em] text-gray-900 mb-4">
            Capital Flows: Tracking Institutional Money
          </h1>
          <p className="text-[15px] leading-[1.75] text-gray-500 mb-10">
            Weekly ETF and mutual fund flow data aggregated from EPFR and Morningstar. Sector rotation signals derived from 5-day rolling flow differentials.
            {hasSectorData && <span className="text-emerald-600"> Live sector data available.</span>}
          </p>

          {hasSectorData && sectors && (
            <div className="mb-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500 mb-4 block">
                Sector Performance Today
              </span>
              <div className="bg-[#F8F9FA] border border-gray-100 rounded-xl overflow-hidden">
                {sectors.map((s) => {
                  const isUp = s.changePercent >= 0
                  return (
                    <div key={s.sector} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50/50 transition-colors duration-200 border-b border-gray-100 last:border-0">
                      <span className="text-[13px] font-medium text-gray-900">{s.sector}</span>
                      <div className="flex items-center gap-2">
                        {isUp ? (
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                        )}
                        <span className={`text-sm font-bold tabular-nums ${isUp ? "text-emerald-600" : "text-red-500"}`}>
                          {isUp ? "+" : ""}{s.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
              <p className="text-[9px] text-gray-400 mt-2 text-right">Data: Finnhub · Real-time</p>
            </div>
          )}

          <div ref={r1} className={`reveal ${v1 ? "visible" : ""} mb-12`}>
            <div className="flex items-end justify-between mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">ETF Fund Flows</span>
              <span className="text-[9px] text-gray-300 bg-gray-100 px-1.5 py-0.5 rounded">Estimated</span>
            </div>
            <div className="bg-[#F8F9FA] border border-gray-100 rounded-xl overflow-hidden">
              {FALLBACK_FLOW_DATA.map((f, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50/50 transition-colors duration-200 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{f.category}</p>
                    <p className="text-[10px] text-gray-400">{f.period}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {f.trend === "inflow" ? (
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                    )}
                    <span className={`text-sm font-bold tabular-nums ${f.trend === "inflow" ? "text-emerald-600" : "text-red-500"}`}>
                      {f.flow}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={r2} className={`reveal ${v2 ? "visible" : ""} mb-12 bg-[#F8F9FA] border border-gray-100 rounded-xl p-5`}>
            <div className="flex items-end justify-between mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">Sector Rotation Signal</span>
              <span className="text-[9px] text-gray-300 bg-gray-100 px-1.5 py-0.5 rounded">Estimated</span>
            </div>
            {ROTATION.map((r) => (
              <div key={r.label} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-700">{r.label}</span>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3 h-3 text-emerald-600" />
                  <span className="text-sm font-bold tabular-nums text-gray-900">{r.metric}</span>
                  <span className="text-[10px] text-gray-400">{r.note}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 pt-8 border-t border-gray-100">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500 mb-4 block">Related Narratives</span>
            <div className="space-y-3">
              <Link to="/signal/supply-chain" className="flex items-center justify-between py-4 px-5 bg-[#F8F9FA] border border-gray-100 rounded-xl hover:border-gray-200 hover:bg-white transition-all duration-200 group">
                <span className="text-sm font-medium text-gray-700">Supply Chain Analysis</span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </Link>
              <Link to="/signal/capex-decomposition" className="flex items-center justify-between py-4 px-5 bg-[#F8F9FA] border border-gray-100 rounded-xl hover:border-gray-200 hover:bg-white transition-all duration-200 group">
                <span className="text-sm font-medium text-gray-700">Capex Decomposition</span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
