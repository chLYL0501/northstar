import { Link } from "react-router-dom"
import { ArrowLeft, TrendingUp, ArrowRight } from "lucide-react"
import Navbar from "@/components/Navbar"
import MiniTicker from "@/components/MiniTicker"
import { useEffect } from "react"
import { useScrollReveal } from "@/hooks/useScrollReveal"

const VALUE_CHAIN = [
  { layer: "Hyperscalers", names: "Microsoft · Amazon · Google · Meta", spend: "$328B", pct: "100%", note: "Ultimate source of all capex" },
  { layer: "Silicon", names: "NVIDIA · Broadcom · AMD · Marvell", spend: "~$130B", pct: "~40%", note: "Highest pricing power & margin" },
  { layer: "Networking", names: "Arista · Coherent · Cisco", spend: "~$59B", pct: "~18%", note: "Fastest Capex growth rate" },
  { layer: "Power & Grid", names: "NextEra · GE Vernova · Eaton", spend: "~$56B", pct: "~17%", note: "Most regulated, secular growth" },
  { layer: "Construction", names: "Vertiv · Quanta · JCI", spend: "~$82B", pct: "~25%", note: "Most fragmented, cost inflation risk" },
]

const CHOKEPOINTS = [
  { label: "CoWoS Packaging", metric: "52+ wks", note: "TSMC lead time, no alternative supplier" },
  { label: "HBM Memory", metric: "100%", note: "SK Hynix + Samsung control all HBM3e" },
  { label: "Switchgear", metric: "80+ wks", note: "Medium-voltage equipment backlog" },
  { label: "Grid Interconnect", metric: "3-5 yrs", note: "New data center energization queue" },
]

export default function DeepAnalysis() {
  const { ref: r1, isVisible: v1 } = useScrollReveal(0.06)
  const { ref: r2, isVisible: v2 } = useScrollReveal(0.06)
  const { ref: r3, isVisible: v3 } = useScrollReveal(0.06)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-white">
      <MiniTicker />
      <Navbar />

      <article className="pt-20 pb-28">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-gray-700 transition-colors mb-6 group hover-scale-sm">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
            Back to Narrative
          </Link>

          <h1 className="font-display text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] leading-[1.12] tracking-[-0.018em] text-gray-900 mb-4">
            Industry Logic: The AI Infrastructure Value Chain
          </h1>
          <p className="text-[15px] leading-[1.75] text-gray-500 mb-10">
            Tracing capital from hyperscaler purchase orders through five layers of the supply chain. Understanding pricing power, margin profiles, and competitive dynamics at each node.
          </p>

          <div ref={r1} className={`reveal ${v1 ? "visible" : ""} bg-[#F5F5F7] rounded-lg p-6 mb-10`}>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-5 block">Value Chain Map</span>
            <div className="space-y-0">
              {VALUE_CHAIN.map((layer, i) => (
                <div key={layer.layer} className="flex items-center group hover:bg-white/80 transition-colors duration-200 rounded-md -mx-3 px-3 py-3">
                  <div className="w-8 text-center shrink-0">
                    <span className="text-[11px] font-bold tabular-nums text-gray-300">{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0 ml-3">
                    <p className="text-sm font-semibold text-gray-900">{layer.layer}</p>
                    <p className="text-[11px] text-gray-500">{layer.names}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{layer.note}</p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="text-sm font-bold tabular-nums text-gray-900">{layer.spend}</p>
                    <p className="text-[11px] text-gray-400">{layer.pct}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={r2} className={`reveal ${v2 ? "visible" : ""} mb-8`}>
            <h2 className="font-display text-xl text-gray-900 mb-4">Margin & Pricing Power Analysis</h2>
            <p className="text-[15px] leading-[1.8] text-gray-700 mb-4">
              The AI capex value chain is not a simple pass-through. Each layer has distinct pricing power dynamics driven by concentration, switching costs, and regulatory moats. Understanding where margin accrues is the key to identifying alpha.
            </p>
            <p className="text-[15px] leading-[1.8] text-gray-700 mb-4">
              Silicon commands the highest margins — NVIDIA's data center gross margins exceed 75% — because the switching cost from CUDA to alternatives remains prohibitively high for most enterprise workloads. Custom silicon (Broadcom, Marvell) offers a partial alternative but requires significant engineering investment from the hyperscaler.
            </p>
            <p className="text-[15px] leading-[1.8] text-gray-700 mb-4">
              Networking is the fastest-growing segment by capex CAGR because the transition from 400G to 800G optics is creating a completely new replacement cycle. Arista and Coherent benefit from high operating leverage — incremental networking revenue flows through at 60%+ margins.
            </p>
            <p className="text-[15px] leading-[1.8] text-gray-700">
              Power infrastructure is the most regulated layer but offers the longest-duration growth. Once a utility signs a power purchase agreement with a data center, that revenue is contractually locked in for 10-20 years. This is why NextEra and Constellation trade at premium multiples within the utility sector.
            </p>
          </div>

          <div ref={r3} className={`reveal ${v3 ? "visible" : ""} border border-gray-100 rounded-lg p-5 bg-gray-50/50`}>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-4 block">Critical Chokepoints</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CHOKEPOINTS.map((cp) => (
                <div key={cp.label} className="flex items-start gap-3 p-3">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{cp.label}</p>
                    <p className="text-xs text-gray-500">{cp.note}</p>
                    <p className="text-[11px] font-bold tabular-nums text-gray-900 mt-1">{cp.metric}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-4 block">Explore Deeper</span>
            <div className="space-y-2">
              <Link to="/signal/supply-chain" className="flex items-center justify-between py-3 px-4 border border-gray-100 rounded-lg hover:border-gray-200 hover:bg-gray-50/50 transition-all duration-200 group hover-scale-sm">
                <span className="text-sm text-gray-700">Supply Chain Analysis</span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </Link>
              <Link to="/stocks" className="flex items-center justify-between py-3 px-4 border border-gray-100 rounded-lg hover:border-gray-200 hover:bg-gray-50/50 transition-all duration-200 group hover-scale-sm">
                <span className="text-sm text-gray-700">Related Stocks</span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </Link>
              <Link to="/flows" className="flex items-center justify-between py-3 px-4 border border-gray-100 rounded-lg hover:border-gray-200 hover:bg-gray-50/50 transition-all duration-200 group hover-scale-sm">
                <span className="text-sm text-gray-700">Capital Flows</span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
