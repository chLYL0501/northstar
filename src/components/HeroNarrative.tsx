import { Link } from "react-router-dom"
import { DailyNarrative, MarketRegime, formatDateLabel } from "@/services/contentEngine"
import { Calendar, TrendingUp, TrendingDown, Minus, Clock, ChevronRight } from "lucide-react"
import { formatTimestampET } from "@/services/formatDate"

interface HeroNarrativeProps {
  data: DailyNarrative
  lastUpdated?: string
  activeDay: "today" | "yesterday"
  onToggleDay: (day: "today" | "yesterday") => void
  newsHeadlines?: string[]
}

const REGIME_STYLES: Record<MarketRegime, string> = {
  "Risk-On": "bg-emerald-50 text-emerald-700",
  "Rotation": "bg-amber-50 text-amber-700",
  "Defensive": "bg-blue-50 text-blue-700",
  "Risk-Off": "bg-red-50 text-red-700",
}

const IMPACT_STYLES = {
  bullish: { bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-700", icon: TrendingUp },
  bearish: { bg: "bg-red-50 border-red-200", text: "text-red-700", icon: TrendingDown },
  neutral: { bg: "bg-gray-50 border-gray-200", text: "text-gray-600", icon: Minus },
}

export default function HeroNarrative({ data, lastUpdated, activeDay, onToggleDay, newsHeadlines }: HeroNarrativeProps) {
  const timeStr = lastUpdated ? `Updated ${formatTimestampET(lastUpdated)}` : ""
  const dateLabel = formatDateLabel(data.date)
  const yesterdayDateStr = (() => { const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().split("T")[0] })()
  const displayDate = activeDay === "yesterday" ? formatDateLabel(yesterdayDateStr) : dateLabel
  const impact = IMPACT_STYLES[data.marketImpact.direction]
  const ImpactIcon = impact.icon
  const firstRelatedSlug = data.relatedSlugs[0]

  return (
    <section className="relative pt-12 pb-10 md:pt-16 md:pb-14 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      <div className="mx-auto max-w-6xl px-6 lg:px-8 relative">
        <div className="animate-fade-in-down" style={{ animationDelay: "0.04s" }}>
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-live-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-500" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-400">Daily Brief</span>
            </span>
            <span className={`text-[10px] font-semibold uppercase tracking-[0.12em] px-2 py-0.5 rounded-full ${REGIME_STYLES[data.regime]}`}>{data.regime}</span>
            <span className="text-[9px] text-gray-300 bg-gray-100 px-1.5 py-0.5 rounded hidden sm:inline">Editorial</span>
            <span className="text-[10px] text-gray-400 ml-auto flex items-center gap-1"><Calendar className="w-3 h-3" />{displayDate}</span>
            {timeStr && <span className="text-[10px] text-gray-300 flex items-center gap-1"><Clock className="w-3 h-3" />{timeStr}</span>}
          </div>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: "0.06s" }}>
          <div className="flex items-center gap-1 mb-8 border-b border-gray-100">
            <button onClick={() => onToggleDay("today")}
              className={`text-[11px] font-medium pb-2.5 px-0.5 transition-colors relative ${activeDay === "today" ? "text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-gray-900 after:rounded-full" : "text-gray-400 hover:text-gray-600"}`}>Today</button>
            <span className="text-gray-200 pb-2.5">&middot;</span>
            <button onClick={() => onToggleDay("yesterday")}
              className={`text-[11px] font-medium pb-2.5 px-0.5 transition-colors relative ${activeDay === "yesterday" ? "text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-gray-900 after:rounded-full" : "text-gray-400 hover:text-gray-600"}`}>Yesterday</button>
          </div>
        </div>

        {/* MARKET CONCLUSION BAR */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.08s" }}>
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${impact.bg} ${impact.text} text-[11px] font-semibold mb-6`}>
            <ImpactIcon className="w-3.5 h-3.5" />
            Market outlook: {data.marketImpact.direction.charAt(0).toUpperCase() + data.marketImpact.direction.slice(1)}
          </div>
        </div>

        {/* HEADLINE */}
        <div className="animate-fade-in-up max-w-4xl" style={{ animationDelay: "0.10s" }}>
          <h1 className="font-display text-[2rem] sm:text-[2.75rem] md:text-[3.5rem] leading-[1.08] tracking-[-0.022em] text-gray-900 mb-6">
            {data.headline}
          </h1>
        </div>

        {/* SUMMARY */}
        <div className="animate-fade-in-up max-w-2xl" style={{ animationDelay: "0.14s" }}>
          <p className="text-[15px] leading-[1.75] text-gray-500 mb-8">{data.summary}</p>
        </div>

        {/* NEWS THREE ELEMENTS */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.18s" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#F8F9FA] border border-gray-100 rounded-xl p-5 hover:border-gray-200 transition-all duration-200">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500 mb-2.5 block">What Happened</span>
              <p className="text-[13px] leading-[1.65] text-gray-700">{data.whatHappened}</p>
            </div>
            <div className="bg-[#F8F9FA] border border-gray-100 rounded-xl p-5 hover:border-gray-200 transition-all duration-200">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500 mb-2.5 block">Why It Matters</span>
              <p className="text-[13px] leading-[1.65] text-gray-700">{data.whyItMatters}</p>
            </div>
            <div className="bg-[#F8F9FA] border border-gray-100 rounded-xl p-5 hover:border-gray-200 transition-all duration-200">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500 mb-3 block">Market Impact</span>
              <p className="text-[13px] leading-[1.65] text-gray-700 mb-4">{data.marketImpact.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {data.marketImpact.tickers.map((t) => (
                  <Link key={t} to={`/signal/${firstRelatedSlug}`} className="text-[11px] font-bold tabular-nums text-gray-600 bg-white border border-gray-200 hover:border-gray-300 hover:text-gray-900 px-2.5 py-1 rounded-md transition-colors">
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* KEY METRICS + CTA */}
        <div className="animate-fade-in-up flex items-end justify-between flex-wrap gap-4" style={{ animationDelay: "0.22s" }}>
          <div className="flex items-center gap-5 flex-wrap">
            {data.keyMetrics.map((m) => (
              <span key={m.label} className="flex items-center gap-1.5">
                <span className="text-[10px] text-gray-400">{m.label}</span>
                <span className="text-[13px] font-bold tabular-nums text-gray-900">{m.value}</span>
              </span>
            ))}
          </div>
          <Link to={`/signal/${firstRelatedSlug}`} className="inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-900 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 px-4 py-2.5 rounded-lg transition-all duration-200 group">
            Read Today's Brief
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {newsHeadlines && newsHeadlines.length > 0 && (
          <div className="animate-fade-in mt-8 pt-5 section-divider" style={{ animationDelay: "0.28s" }}>
            <div className="flex gap-6 overflow-x-auto scrollbar-none">
              {newsHeadlines.slice(0, 3).map((h, i) => (
                <p key={i} className="text-[11px] text-gray-400 leading-[1.5] whitespace-nowrap shrink-0">{h}</p>
              ))}
            </div>
            <p className="text-[9px] text-gray-300 mt-1.5">Finnhub · Real-time</p>
          </div>
        )}
      </div>
    </section>
  )
}
