import { DailyNarrative, MarketRegime, formatDateLabel } from "@/services/contentEngine"
import { Calendar, AlertTriangle, TrendingUp } from "lucide-react"
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

const RISK_LEVEL_STYLES = {
  elevated: "text-red-500 bg-red-50",
  moderate: "text-amber-600 bg-amber-50",
  low: "text-gray-400 bg-gray-50",
}

export default function HeroNarrative({ data, lastUpdated, activeDay, onToggleDay, newsHeadlines }: HeroNarrativeProps) {
  const timeStr = lastUpdated
    ? `Updated ${formatTimestampET(lastUpdated)}`
    : ""

  const dateLabel = formatDateLabel(data.date)
  const yesterdayDateStr = (() => { const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().split("T")[0] })()
  const displayDate = activeDay === "yesterday" ? formatDateLabel(yesterdayDateStr) : dateLabel

  return (
    <section className="relative pt-10 pb-8 md:pt-14 md:pb-12 overflow-hidden bg-gradient-to-b from-white via-white to-[#F8F9FA]">
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      <div className="mx-auto max-w-6xl px-6 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-16">
          {/* LEFT — Headline + Summary + Drivers */}
          <div>
            <div className="animate-fade-in-down" style={{ animationDelay: "0.05s" }}>
              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <span className="inline-flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-live-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-500" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-400">Daily Brief</span>
                </span>
                <span className={`text-[10px] font-semibold uppercase tracking-[0.12em] px-2 py-0.5 rounded-full ${REGIME_STYLES[data.regime]}`}>
                  {data.regime}
                </span>
                {data.riskSignals.level === "elevated" && (
                  <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${RISK_LEVEL_STYLES.elevated}`}>
                    <AlertTriangle className="w-2.5 h-2.5" />{data.riskSignals.label}
                  </span>
                )}
              </div>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "0.08s" }}>
              <div className="flex items-center gap-1 mb-6 border-b border-gray-100">
                <button onClick={() => onToggleDay("today")}
                  className={`text-[11px] font-medium pb-2.5 px-0.5 transition-colors relative ${activeDay === "today" ? "text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-gray-900 after:rounded-full" : "text-gray-400 hover:text-gray-600"}`}>
                  Today</button>
                <span className="text-gray-200 pb-2.5">&middot;</span>
                <button onClick={() => onToggleDay("yesterday")}
                  className={`text-[11px] font-medium pb-2.5 px-0.5 transition-colors relative ${activeDay === "yesterday" ? "text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-gray-900 after:rounded-full" : "text-gray-400 hover:text-gray-600"}`}>
                  Yesterday</button>
                <span className="text-[10px] text-gray-400 ml-auto flex items-center gap-1"><Calendar className="w-3 h-3" />{displayDate}</span>
              </div>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "0.10s" }}>
              <h1 className="font-display text-[1.75rem] sm:text-[2.25rem] md:text-[2.5rem] lg:text-[3rem] leading-[1.08] tracking-[-0.022em] text-gray-900 mb-5">
                {data.headline}
              </h1>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "0.14s" }}>
              <p className="text-[15px] leading-[1.75] text-gray-500 mb-4">{data.summary}</p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "0.18s" }}>
              <p className="text-[13px] leading-[1.7] text-gray-600 mb-6 pl-3.5 border-l-2 border-gray-200">{data.dailySummary}</p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "0.22s" }}>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3 block">Key Drivers</span>
              <div className="space-y-2.5 mb-0">
                {data.keyDrivers.map((d, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <TrendingUp className="w-3 h-3 text-emerald-600 mt-[3px] shrink-0" />
                    <span className="text-[12px] text-gray-700 leading-[1.6]">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Why It Matters + Key Metrics */}
          <div className="mt-8 lg:mt-0">
            <div className="animate-fade-in-up" style={{ animationDelay: "0.20s" }}>
              <div className="flex items-center gap-4 flex-wrap mb-4">
                {lastUpdated && <span className="text-[11px] text-gray-400 tracking-wide">{timeStr}</span>}
                <span className="text-[10px] text-gray-300">2 min read</span>
              </div>
            </div>

            <div className="animate-fade-in-up grid grid-cols-3 gap-3 mb-6" style={{ animationDelay: "0.22s" }}>
              {data.keyMetrics.map((m) => (
                <div key={m.label} className="border border-gray-100 rounded-lg px-4 py-4 hover:border-gray-200 transition-all duration-200">
                  <p className="text-lg font-bold tabular-nums text-gray-900 leading-none">{m.value}</p>
                  <p className="text-[10px] text-gray-400 mt-1.5">{m.label}</p>
                </div>
              ))}
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "0.26s" }}>
              <div className="bg-[#F5F5F7] rounded-lg p-5 mb-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3 block">Why It Matters</span>
                <p className="text-[13px] leading-[1.7] text-gray-700">{data.whyItMatters}</p>
              </div>
            </div>

            {data.riskSignals.level !== "low" && (
              <div className="animate-fade-in" style={{ animationDelay: "0.30s" }}>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-2 block">Risk Signal</span>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-semibold ${RISK_LEVEL_STYLES[data.riskSignals.level]}`}>
                  <AlertTriangle className="w-2.5 h-2.5" />{data.riskSignals.label}
                </div>
              </div>
            )}
          </div>
        </div>

        {newsHeadlines && newsHeadlines.length > 0 && (
          <div className="animate-fade-in mt-8 pt-6 section-divider" style={{ animationDelay: "0.36s" }}>
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-300 mb-2.5 block">Market Headlines</span>
            <div className="flex gap-6 overflow-x-auto scrollbar-none">
              {newsHeadlines.slice(0, 3).map((h, i) => (
                <p key={i} className="text-[11px] text-gray-500 leading-[1.5] whitespace-nowrap shrink-0">{h}</p>
              ))}
            </div>
            <p className="text-[9px] text-gray-300 mt-2">Finnhub · Real-time</p>
          </div>
        )}
      </div>
    </section>
  )
}
