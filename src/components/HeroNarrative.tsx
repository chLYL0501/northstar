import { Link } from "react-router-dom"
import { DailyNarrative, MarketRegime, formatDateLabel } from "@/services/contentEngine"
import { Calendar, TrendingUp, TrendingDown, Minus, Clock, ChevronRight, ArrowRight } from "lucide-react"
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
  bullish: { bg: "bg-emerald-50/70 border-emerald-200", text: "text-emerald-700", icon: TrendingUp, accent: "border-emerald-400" },
  bearish: { bg: "bg-red-50/70 border-red-200", text: "text-red-700", icon: TrendingDown, accent: "border-red-400" },
  neutral: { bg: "bg-gray-50/70 border-gray-200", text: "text-gray-600", icon: Minus, accent: "border-gray-400" },
}

function SectionAccent({ label, accentColor }: { label: string; accentColor?: string }) {
  return (
    <div className={`flex items-center gap-2.5 mb-3 ${accentColor ? `border-l-[3px] ${accentColor} pl-3` : ""}`}>
      <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-500">{label}</span>
    </div>
  )
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
    <section className="relative pt-14 pb-12 md:pt-20 md:pb-16 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      <div className="mx-auto max-w-6xl px-6 lg:px-8 relative">

        {/* TOP BAR: Badge + Date + Times */}
        <div className="animate-fade-in-down flex items-center gap-3 mb-8 flex-wrap" style={{ animationDelay: "0.04s" }}>
          <span className="inline-flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-live-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-500" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-gray-500">Daily Brief</span>
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full ${REGIME_STYLES[data.regime]}`}>{data.regime}</span>
          <span className="text-[10px] text-gray-400 ml-auto flex items-center gap-1"><Calendar className="w-3 h-3" />{displayDate}</span>
          {timeStr && <span className="text-[10px] text-gray-300 flex items-center gap-1"><Clock className="w-3 h-3" />{timeStr}</span>}
        </div>

        {/* TABS: Today / Yesterday */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.06s" }}>
          <div className="flex items-center gap-1 mb-10 border-b border-gray-100">
            <button onClick={() => onToggleDay("today")}
              className={`text-[12px] font-semibold pb-3 px-0.5 transition-colors relative ${activeDay === "today" ? "text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-gray-900 after:rounded-full" : "text-gray-400 hover:text-gray-600"}`}>Today</button>
            <span className="text-gray-200 pb-3">&middot;</span>
            <button onClick={() => onToggleDay("yesterday")}
              className={`text-[12px] font-semibold pb-3 px-0.5 transition-colors relative ${activeDay === "yesterday" ? "text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-gray-900 after:rounded-full" : "text-gray-400 hover:text-gray-600"}`}>Yesterday</button>
          </div>
        </div>

        {/* ===== PRIMARY: Market Outlook Badge ===== */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.08s" }}>
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border ${impact.bg} ${impact.text} text-[12px] font-bold mb-6`}>
            <ImpactIcon className="w-3.5 h-3.5" />
            {data.marketImpact.direction.charAt(0).toUpperCase() + data.marketImpact.direction.slice(1)} outlook
          </div>
        </div>

        {/* ===== PRIMARY: Headline ===== */}
        <div className="animate-fade-in-up max-w-5xl" style={{ animationDelay: "0.10s" }}>
          <h1 className="font-display text-[2.25rem] sm:text-[3rem] md:text-[4rem] lg:text-[4.5rem] leading-[1.05] tracking-[-0.025em] text-gray-900 mb-6">
            {data.headline}
          </h1>
        </div>

        {/* ===== SECONDARY: Summary ===== */}
        <div className="animate-fade-in-up max-w-2xl" style={{ animationDelay: "0.14s" }}>
          <p className="text-[16px] leading-[1.7] text-gray-500 mb-10">{data.summary}</p>
        </div>

        {/* ===== SECONDARY: Market Impact Card + Tickers ===== */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.17s" }}>
          <div className="bg-[#F5F6F8] border border-gray-100 rounded-xl p-5 mb-10">
            <SectionAccent label="Market Impact" accentColor={impact.accent} />
            <p className="text-[14px] leading-[1.65] text-gray-700">{data.marketImpact.description}</p>
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">Key Stocks</span>
              <span className="w-px h-3 bg-gray-200" />
              {data.marketImpact.tickers.map((t) => (
                <Link key={t} to={`/signal/${firstRelatedSlug}`} className="text-[12px] font-bold tabular-nums text-gray-800 bg-white border border-gray-200 hover:border-gray-300 hover:text-gray-900 px-2.5 py-1 rounded-md transition-colors">
                  ${t}
                </Link>
              ))}
              <Link to={`/signal/${firstRelatedSlug}`} className="text-[11px] font-medium text-gray-400 hover:text-gray-600 transition-colors ml-1">
                View analysis →
              </Link>
            </div>
          </div>
        </div>

        {/* ===== TERTIARY: What Happened + Why It Matters ===== */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.20s" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <div className="bg-[#F5F6F8] border border-gray-100 rounded-xl p-5 hover:border-gray-200 transition-all duration-200">
              <SectionAccent label="What Happened" accentColor="border-blue-400" />
              <p className="text-[13px] leading-[1.65] text-gray-700">{data.whatHappened}</p>
            </div>
            <div className="bg-[#F5F6F8] border border-gray-100 rounded-xl p-5 hover:border-gray-200 transition-all duration-200">
              <SectionAccent label="Why It Matters" accentColor="border-amber-400" />
              <p className="text-[13px] leading-[1.65] text-gray-700">{data.whyItMatters}</p>
            </div>
          </div>
        </div>

        {/* ===== TERTIARY: Key Metrics + CTA ===== */}
        <div className="animate-fade-in-up flex items-end justify-between flex-wrap gap-4" style={{ animationDelay: "0.24s" }}>
          <div className="flex items-center gap-6 flex-wrap">
            {data.keyMetrics.map((m) => (
              <span key={m.label} className="flex items-center gap-2">
                <span className="text-[11px] font-medium text-gray-400">{m.label}</span>
                <span className="text-[15px] font-bold tabular-nums text-gray-900">{m.value}</span>
              </span>
            ))}
          </div>
          <Link to={`/signal/${firstRelatedSlug}`} className="inline-flex items-center gap-2 text-[14px] font-semibold text-gray-900 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-lg transition-all duration-200 group">
            Read Today's Brief
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ===== News Ticker ===== */}
        {newsHeadlines && newsHeadlines.length > 0 && (
          <div className="animate-fade-in mt-10 pt-5 border-t border-gray-100" style={{ animationDelay: "0.30s" }}>
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
