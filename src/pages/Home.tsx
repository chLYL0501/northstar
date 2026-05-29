import { Link } from "react-router-dom"
import { ArrowRight, TrendingUp } from "lucide-react"
import Navbar from "@/components/Navbar"
import MiniTicker from "@/components/MiniTicker"
import HeroNarrative from "@/components/HeroNarrative"
import WhatChangedToday from "@/components/WhatChangedToday"
import AINarrative from "@/components/AINarrative"
import SupportingSignals from "@/components/SupportingSignals"
import FeaturedStory from "@/components/FeaturedStory"
import InstitutionalFlows from "@/components/InstitutionalFlows"
import ContinueReading from "@/components/ContinueReading"
import { getMarketData } from "@/data/marketData"
import {
  getTodaysNarrative,
  getYesterdaysNarrative,
  getWhatChanged,
  formatRefreshTime,
} from "@/services/contentEngine"
import { HeroSkeleton } from "@/components/Skeletons"
import ErrorBoundary from "@/components/ErrorBoundary"
import { useState, useEffect } from "react"
import { EnhancedMarketData, fetchEnhancedMarketData } from "@/services/realDataService"

export default function Home() {
  const data = getMarketData()
  const [marketReady, setMarketReady] = useState(false)
  const [marketData, setMarketData] = useState<EnhancedMarketData | null>(null)
  const [activeDay, setActiveDay] = useState<"today" | "yesterday">("today")

  const narrative = activeDay === "today" ? getTodaysNarrative() : getYesterdaysNarrative()

  const yesterdayForSeed = (() => { const d = new Date(); d.setDate(d.getDate() - 1); return d })()
  const whatChanged = activeDay === "today" ? getWhatChanged() : getWhatChanged(yesterdayForSeed)

  useEffect(() => {
    fetchEnhancedMarketData().then((md) => { setMarketData(md); setMarketReady(true) })
  }, [])

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        fetchEnhancedMarketData().then((md) => { setMarketData(md) })
      }
    }
    document.addEventListener("visibilitychange", onVisible)
    return () => document.removeEventListener("visibilitychange", onVisible)
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <MiniTicker />
      <Navbar />

      <main>
        {!marketReady ? (
          <HeroSkeleton />
        ) : (
          <ErrorBoundary>
            <HeroNarrative
              data={narrative}
              lastUpdated={marketData?.lastUpdated}
              activeDay={activeDay}
              onToggleDay={setActiveDay}
              newsHeadlines={marketData?.newsHeadlines}
            />
          </ErrorBoundary>
        )}

        <WhatChangedToday changes={whatChanged} />
        <div className="section-divider mx-auto max-w-6xl px-6 lg:px-8" />

        <SupportingSignals signals={data.signals} />

        <FeaturedStory data={data.featuredStory} />

        {/* AI Narrative */}
        <section className="py-10 md:py-12 bg-[#F8F9FA]">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <AINarrative />
            </div>
          </div>
        </section>

        {/* Flows + Institutional */}
        <div className="section-divider mx-auto max-w-6xl px-6 lg:px-8" />

        <section className="py-10 md:py-12">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="flex items-end justify-between mb-5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">Explore</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link to="/flows" className="flex items-center justify-between py-4 px-5 border border-gray-100 rounded-lg hover:border-gray-200 hover:bg-gray-50/50 transition-all duration-200 group hover-scale-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-0.5">Capital Flows</p>
                    <p className="text-sm font-medium text-gray-900">Track institutional money across sectors and ETFs</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span className="text-[11px] font-bold tabular-nums text-emerald-600">+$8.4B</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors" />
                </div>
              </Link>
              <Link to="/signal/supply-chain" className="flex items-center justify-between py-4 px-5 border border-gray-100 rounded-lg hover:border-gray-200 hover:bg-gray-50/50 transition-all duration-200 group hover-scale-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-0.5">Top Narrative</p>
                    <p className="text-sm font-medium text-gray-900">Supply Chain: Chokepoints in the AI Buildout</p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0 ml-4" />
              </Link>
            </div>
          </div>
        </section>

        <InstitutionalFlows flows={data.institutionalFlows} />
        <ContinueReading entries={data.entryPoints} />

        <div className="py-10 text-center border-t border-gray-100">
          <p className="text-[10px] text-gray-400">{formatRefreshTime()}</p>
          {marketData && (
            <p className="text-[9px] text-gray-300 mt-1.5">
              Market data: {marketData.source} · Yahoo Finance
              {marketData.newsHeadlines.length > 0 && " · Finnhub"}
            </p>
          )}
        </div>
      </main>
    </div>
  )
}
