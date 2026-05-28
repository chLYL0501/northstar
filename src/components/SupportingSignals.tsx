import { Link } from "react-router-dom"
import { Signal } from "@/data/marketData"
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"
import { useScrollReveal } from "@/hooks/useScrollReveal"

function TrendIcon({ trend }: { trend: Signal["trend"] }) {
  if (trend === "up") return <ArrowUpRight className="w-3 h-3 text-emerald-600" />
  if (trend === "down") return <ArrowDownRight className="w-3 h-3 text-red-500" />
  return <Minus className="w-3 h-3 text-gray-400" />
}

function SignalCard({ data, index }: { data: Signal; index: number }) {
  const { ref, isVisible } = useScrollReveal(0.06)
  return (
    <div ref={ref} className={`reveal reveal-delay-${index + 1} ${isVisible ? "visible" : ""}`}>
      <Link to={`/signal/${data.slug}`} className="block group hover-scale-sm">
        <div className="border border-gray-100 rounded-lg p-5 hover:border-gray-200 hover:shadow-sm transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">{data.label}</span>
            <ArrowUpRight className="w-3 h-3 text-gray-300 group-hover:text-gray-600 transition-colors" />
          </div>
          <h3 className="text-[14px] font-semibold leading-snug text-gray-900 mb-1.5 group-hover:text-gray-600 transition-colors">
            {data.title}
          </h3>
          <p className="text-[11px] leading-relaxed text-gray-500 mb-4">{data.subtitle}</p>
          <div className="flex items-center gap-1.5 pt-3 border-t border-gray-100">
            <TrendIcon trend={data.trend} />
            <span className="text-[14px] font-bold tabular-nums text-gray-900">{data.metric}</span>
            <span className="text-[10px] text-gray-400 ml-0.5">{data.metricLabel}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

interface SupportingSignalsProps {
  signals: Signal[]
}

export default function SupportingSignals({ signals }: SupportingSignalsProps) {
  return (
    <section className="py-10 md:py-12">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400 mb-6 block">Today's Signals</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {signals.map((signal, i) => (
            <SignalCard key={signal.id} data={signal} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
