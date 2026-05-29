import { useParams, Link } from "react-router-dom"
import {
  getDetailBySlug,
  getMarketData,
  type EvidenceItem,
  type RelatedStock,
  type ValueChainLayer,
  type BullBearCase,
  type MarketPulse,
} from "@/data/marketData"
import { ArrowLeft, ArrowUpRight, TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react"
import Navbar from "@/components/Navbar"
import { useEffect, useState, useRef } from "react"
import { useScrollReveal } from "@/hooks/useScrollReveal"
import { fetchAllStocks, type StockQuote } from "@/services/realDataService"

const DIRECTION_ICON: Record<string, typeof TrendingUp> = {
  up: TrendingUp, down: TrendingDown, neutral: Minus,
}

const RELEVANCE_COLOR: Record<string, string> = {
  critical: "border-l-2 border-red-300",
  high: "border-l-2 border-amber-300",
  medium: "border-l-2 border-gray-300",
}

function SectionLabel({ children }: { children: string }) {
  return (
    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 block">
      {children}
    </span>
  )
}

/* ── Metrics Row ── */
function MetricsRow({ keyData }: { keyData: { label: string; value: string }[] }) {
  if (!keyData.length) return null
  return (
    <div className="my-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {keyData.map((kd) => (
          <div key={kd.label} className="bg-[#F8F9FA] border border-gray-100 rounded-xl px-5 py-4 hover:border-gray-200 transition-all duration-200">
            <p className="text-lg font-bold tabular-nums text-gray-900 leading-none">{kd.value}</p>
            <p className="text-[10px] text-gray-400 mt-1.5 uppercase tracking-wide">{kd.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Main Column Blocks ── */
function EvidenceBlock({ evidence }: { evidence: EvidenceItem[] }) {
  if (!evidence.length) return null
  return (
    <div className="my-14">
      <SectionLabel>Supporting Evidence</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {evidence.map((e, i) => {
          const Icon = DIRECTION_ICON[e.trend]
          const color = e.trend === "up" ? "text-emerald-600" : e.trend === "down" ? "text-red-500" : "text-gray-400"
          return (
            <div key={i} className="bg-[#F8F9FA] border border-gray-100 rounded-xl p-5 hover:border-gray-200 transition-all duration-200">
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-3.5 h-3.5 ${color} shrink-0`} />
                <span className="text-lg font-bold tabular-nums text-gray-900">{e.metric}</span>
              </div>
              <p className="text-[12px] text-gray-700 leading-[1.5] mb-2">{e.label}</p>
              <span className="text-[10px] text-gray-400 uppercase tracking-wide">{e.source}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ValueChainBlock({ chain }: { chain: ValueChainLayer[] }) {
  if (!chain.length) return null
  const { ref, isVisible } = useScrollReveal(0.06)
  return (
    <div ref={ref} className={`reveal ${isVisible ? "visible" : ""} my-14`}>
      <SectionLabel>Industry Value Chain</SectionLabel>
      <div className="bg-[#F8F9FA] border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-100">
        {chain.map((layer, i) => (
          <div key={layer.layer} className={`pl-4 py-4 pr-5 ${RELEVANCE_COLOR[layer.relevance]} hover:bg-gray-50/50 transition-colors duration-200`}>
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-[10px] font-bold tabular-nums text-gray-300">0{i + 1}</span>
              <span className="text-[13px] font-semibold text-gray-900">{layer.layer}</span>
              {layer.relevance === "critical" && (
                <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-red-500 bg-red-50 px-1.5 py-0.5 rounded">Critical</span>
              )}
            </div>
            <p className="text-[11px] text-gray-500 mt-1 ml-6">{layer.names}</p>
            <p className="text-[10px] text-gray-400 mt-0.5 ml-6">{layer.note}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function BullBearBlock({ bull, bear }: { bull: BullBearCase; bear: BullBearCase }) {
  return (
    <div className="my-14">
      <SectionLabel>Bull vs Bear Cases</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="border border-emerald-100 rounded-lg p-5 bg-emerald-50/30">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-700">Bull Case</span>
            {bull.probability && <span className="text-[10px] text-emerald-500 ml-auto">{bull.probability}</span>}
          </div>
          <p className="text-[13px] leading-[1.65] text-gray-700 mb-4">{bull.thesis}</p>
          <div className="space-y-2 pt-3 border-t border-emerald-100">
            <div><p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Catalyst</p><p className="text-[11px] text-gray-600 mt-0.5">{bull.catalyst}</p></div>
            <div><p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Price Target</p><p className="text-[11px] font-bold tabular-nums text-emerald-700 mt-0.5">{bull.target}</p></div>
          </div>
        </div>
        <div className="border border-red-100 rounded-lg p-5 bg-red-50/30">
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="w-3.5 h-3.5 text-red-500" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-red-700">Bear Case</span>
            {bear.probability && <span className="text-[10px] text-red-400 ml-auto">{bear.probability}</span>}
          </div>
          <p className="text-[13px] leading-[1.65] text-gray-700 mb-4">{bear.thesis}</p>
          <div className="space-y-2 pt-3 border-t border-red-100">
            <div><p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Catalyst</p><p className="text-[11px] text-gray-600 mt-0.5">{bear.catalyst}</p></div>
            <div><p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Price Target</p><p className="text-[11px] font-bold tabular-nums text-red-600 mt-0.5">{bear.target}</p></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RelatedResearchBlock({ research }: { research: { source: string; title: string; date: string }[] }) {
  if (!research.length) return null
  return (
    <div className="my-14">
      <SectionLabel>Related Research</SectionLabel>
      <div className="bg-[#F8F9FA] border border-gray-100 rounded-xl divide-y divide-gray-100">
        {research.map((r, i) => (
          <div key={i} className="px-5 py-3.5 hover:bg-gray-50/50 transition-colors duration-200 flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-gray-900">{r.title}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{r.source} · {r.date}</p>
            </div>
            <ArrowUpRight className="w-3 h-3 text-gray-300 shrink-0 ml-3" />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Sidebar Blocks ── */
function SidebarMarketPulse({ pulse }: { pulse: MarketPulse[] }) {
  return (
    <div className="bg-[#F8F9FA] border border-gray-100 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-live-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-500" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">Market Pulse</span>
        </div>
        <span className="text-[8px] text-gray-300 bg-gray-100 px-1.5 py-0.5 rounded">Est.</span>
      </div>
      <div className="divide-y divide-gray-100">
        {pulse.map((p) => {
          const isUp = p.trend === "up"
          return (
            <div key={p.label} className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
              <span className="text-[11px] text-gray-500">{p.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold tabular-nums text-gray-900">{p.value}</span>
                <span className={`text-[10px] font-medium tabular-nums ${isUp ? "text-emerald-600" : "text-red-500"}`}>
                  {p.change}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SidebarStocks({ stocks, liveQuotes }: { stocks: RelatedStock[]; liveQuotes: StockQuote[] }) {
  if (!stocks.length) return null
  const qm: Record<string, StockQuote> = {}
  liveQuotes.forEach((q) => { qm[q.symbol] = q })
  return (
    <div className="bg-[#F8F9FA] border border-gray-100 rounded-xl p-4">
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3 block">Related Stocks</span>
      <div className="divide-y divide-gray-100">
        {stocks.map((s) => {
          const q = qm[s.symbol]
          const isPos = (q?.changePercent ?? 0) >= 0
          return (
            <div key={s.symbol} className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
              <div>
                <span className="text-[11px] font-bold text-gray-900 tabular-nums">{s.symbol}</span>
                <span className="text-[10px] text-gray-400 ml-1.5">{s.name}</span>
              </div>
              {q && q.symbol !== "—" ? (
                <div className="text-right">
                  <span className="text-[11px] font-bold tabular-nums text-gray-700">${q.price.toFixed(2)}</span>
                  <span className={`text-[10px] font-medium tabular-nums ml-1.5 ${isPos ? "text-emerald-600" : "text-red-500"}`}>
                    {isPos ? "+" : ""}{q.changePercent.toFixed(1)}%
                  </span>
                </div>
              ) : (
                <span className="text-[10px] text-gray-300">—</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SidebarFlows({ flows }: { flows: { category: string; flow: string; trend: "inflow" | "outflow" }[] }) {
  if (!flows.length) return null
  return (
    <div className="bg-[#F8F9FA] border border-gray-100 rounded-xl p-4">
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3 block">Capital Flow</span>
      <div className="divide-y divide-gray-100">
        {flows.slice(0, 3).map((f, i) => (
          <div key={i} className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
            <span className="text-[11px] text-gray-600 truncate mr-2">{f.category}</span>
            <span className={`text-[11px] font-bold tabular-nums shrink-0 ${f.trend === "inflow" ? "text-emerald-600" : "text-red-500"}`}>
              {f.flow}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SidebarSignals({ signals }: { signals: { slug: string; label: string; title: string }[] }) {
  if (!signals.length) return null
  return (
    <div className="bg-[#F8F9FA] border border-gray-100 rounded-xl p-4">
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3 block">Key Signals</span>
      <div className="space-y-2">
        {signals.map((s) => (
          <Link key={s.slug} to={`/signal/${s.slug}`} className="block group">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400 mb-0.5">{s.label}</p>
            <p className="text-[11px] text-gray-600 leading-[1.4] group-hover:text-gray-900 transition-colors">{s.title}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

/* ── Main Component ── */
export default function Detail() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getDetailBySlug(slug) : undefined
  const data = getMarketData()
  const [liveQuotes, setLiveQuotes] = useState<StockQuote[]>([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const articleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchAllStocks().then(setLiveQuotes)
  }, [slug])

  useEffect(() => {
    const onScroll = () => {
      if (!articleRef.current) return
      const { top, height } = articleRef.current.getBoundingClientRect()
      const vh = window.innerHeight
      const scrolled = -top + vh * 0.3
      const max = height - vh * 0.6
      setScrollProgress(Math.min(Math.max(scrolled / max, 0), 1))
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const nextArticle = (() => {
    if (!article) return null
    const idx = data.detailArticles.findIndex((d) => d.slug === article.slug)
    return data.detailArticles[(idx + 1) % data.detailArticles.length]
  })()

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-20 pb-32 text-center">
          <h2 className="font-display text-2xl text-gray-900 mb-2">Article Not Found</h2>
          <Link to="/" className="text-[13px] text-gray-500 hover:text-gray-900 underline underline-offset-4 hover-scale-sm">Return Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-12 left-0 right-0 z-40 h-[2px] bg-gray-100">
        <div className="h-full bg-gray-300 transition-all duration-150" style={{ width: `${scrollProgress * 100}%` }} />
      </div>

      <Navbar />

      <article ref={articleRef} className="pt-20 pb-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          {/* ── Header ── */}
          <div className="max-w-3xl">
            <Link to="/" className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 px-4 py-2.5 rounded-lg transition-all duration-200 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to Brief
            </Link>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 bg-gray-50 px-2 py-0.5 rounded">{article.theme}</span>
              <span className="text-[10px] text-gray-400">{article.date}</span>
            </div>
            <h1 className="font-display text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] leading-[1.12] tracking-[-0.018em] text-gray-900 mb-4">{article.headline}</h1>
            <p className="text-[15px] leading-[1.75] text-gray-500 mb-8">{article.summary}</p>
            <div className="flex items-center gap-2 mb-0 pb-8 border-b border-gray-100">
              <span className="text-[11px] font-medium text-gray-900">{article.source}</span>
              <span className="text-gray-300">&middot;</span>
              <span className="text-[11px] text-gray-500">{article.authors.join(", ")}</span>
              <span className="text-gray-300">&middot;</span>
              <span className="text-[10px] text-gray-400">Research Note</span>
            </div>
          </div>

          {/* ── Metrics Row ── */}
          {article.keyData.length > 0 && <MetricsRow keyData={article.keyData} />}

          {/* ── Two-Column Layout ── */}
          <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">
            {/* ── MAIN COLUMN ── */}
            <div className="min-w-0">
              <div className="bg-[#F5F5F7] rounded-lg p-4 mb-10">
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3 block">In This Brief</span>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  <span className="text-[10px] text-gray-500">Key Data</span>
                  {article.evidence?.length ? <span className="text-[10px] text-gray-500">&middot; Evidence</span> : null}
                  {article.valueChain?.length ? <span className="text-[10px] text-gray-500">&middot; Value Chain</span> : null}
                  <span className="text-[10px] text-gray-500">&middot; Research</span>
                  <span className="text-[10px] text-gray-500">&middot; Bull/Bear</span>
                </div>
              </div>

              {article.body.map((paragraph, i) => (
                <p key={i} className="text-[15px] leading-[1.85] text-gray-700 mb-6">{paragraph}</p>
              ))}

              <blockquote className="bg-[#F8F9FA] rounded-xl border border-gray-100 px-5 py-4 my-14">
                <p className="text-sm leading-relaxed text-gray-500 italic">&ldquo;{article.keyQuote}&rdquo;</p>
                <footer className="mt-3 text-[11px] text-gray-400 tracking-wide">&mdash; {article.quoteSource}</footer>
              </blockquote>

              {article.evidence && article.evidence.length > 0 && <EvidenceBlock evidence={article.evidence} />}
              {article.valueChain && article.valueChain.length > 0 && <ValueChainBlock chain={article.valueChain} />}

              {article.researchSnippets.length > 0 && (
                <div className="my-14 bg-[#F8F9FA] rounded-xl p-6">
                  <SectionLabel>Research Snippets</SectionLabel>
                  <div className="space-y-4">
                    {article.researchSnippets.map((rs, i) => (
                      <div key={i} className="border-l-2 border-gray-200 pl-4 py-0.5">
                        <p className="text-[13px] leading-relaxed text-gray-500 italic">&ldquo;{rs.text}&rdquo;</p>
                        <p className="mt-2 text-[10px] font-medium text-gray-400 tracking-wide">{rs.source}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {article.bullBear && <BullBearBlock bull={article.bullBear.bull} bear={article.bullBear.bear} />}
              {article.relatedResearch && article.relatedResearch.length > 0 && <RelatedResearchBlock research={article.relatedResearch} />}

              {/* ── Bottom Navigation ── */}
              {nextArticle && (
                <div className="mt-12 pt-8 border-t border-gray-100">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-4 block">Next Story</span>
                  <Link to={`/signal/${nextArticle.slug}`} className="flex items-center justify-between py-4 px-5 border border-gray-100 rounded-lg hover:border-gray-200 hover:bg-gray-50/50 transition-all duration-200 group hover-scale-sm">
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-0.5">{nextArticle.theme}</p>
                      <p className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors">{nextArticle.headline}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0 ml-4" />
                  </Link>
                </div>
              )}

              {article.relatedSlugs.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-4 block">Continue Reading</span>
                  <div className="space-y-3">
                    {article.relatedSlugs.map((relatedSlug) => {
                      const related = data.detailArticles.find((d) => d.slug === relatedSlug)
                      return (
                        <Link key={relatedSlug} to={`/signal/${relatedSlug}`} className="flex items-center justify-between py-3 px-4 border border-gray-100 rounded-lg hover:border-gray-200 hover:bg-gray-50/50 transition-all duration-200 group hover-scale-sm">
                          <div className="min-w-0">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-0.5">{related?.theme ?? "Analysis"}</p>
                            <p className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors">{related?.headline ?? relatedSlug.replace(/-/g, " ")}</p>
                          </div>
                          <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0 ml-4" />
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* ── SIDEBAR ── */}
            <aside className="hidden lg:block">
              <div className="sticky top-20 space-y-5">
                <SidebarMarketPulse pulse={data.marketPulse} />
                {article.relatedStocks && article.relatedStocks.length > 0 && (
                  <SidebarStocks stocks={article.relatedStocks} liveQuotes={liveQuotes} />
                )}
                {article.flows && article.flows.length > 0 && (
                  <SidebarFlows flows={article.flows} />
                )}
                <SidebarSignals signals={data.signals} />
                <Link to="/flows" className="block w-full text-center py-3 bg-[#F8F9FA] border border-gray-100 rounded-xl text-[12px] font-medium text-gray-600 hover:text-gray-900 hover:border-gray-200 hover:bg-white transition-all duration-200">
                  Explore all flows →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </div>
  )
}
