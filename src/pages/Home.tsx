import { Link } from "react-router-dom"
import { ArrowRight, TrendingUp, ChevronRight } from "lucide-react"
import Navbar from "@/components/Navbar"
import MiniTicker from "@/components/MiniTicker"
import HeroNarrative from "@/components/HeroNarrative"
import SupportingSignals from "@/components/SupportingSignals"
import WhatChangedToday from "@/components/WhatChangedToday"
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
      if (document.visibilityState === "visible") fetchEnhancedMarketData().then(setMarketData)
    }
    document.addEventListener("visibilitychange", onVisible)
    return () => document.removeEventListener("visibilitychange", onVisible)
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <MiniTicker />
      <Navbar />

      <main>
        {/* ===== PRIMARY: Today's Top Market Story ===== */}
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

        {/* ===== SECONDARY: What Changed Today ===== */}
        <div className="section-divider mx-auto max-w-6xl px-6 lg:px-8" />
        <WhatChangedToday changes={whatChanged} />

        {/* ===== SECONDARY: Supporting Stories ===== */}
        <SupportingSignals signals={data.signals} />

        {/* ===== TERTIARY: Featured Story ===== */}
        <FeaturedStory data={data.featuredStory} />

        <section className="py-12 md:py-16 bg-[#F4F5F7]">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500 mb-5 block">Explore</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/flows" className="flex items-center justify-between py-5 px-5 bg-white border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-sm transition-all duration-200 group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500 mb-0.5">Track Flows</p>
                    <p className="text-sm font-medium text-gray-900">Institutional money across sectors and ETFs</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span className="text-[11px] font-bold tabular-nums text-emerald-600">+$8.4B</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors" />
                </div>
              </Link>
              <Link to={`/signal/${narrative.relatedSlugs[0]}`} className="flex items-center justify-between py-5 px-5 bg-white border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-sm transition-all duration-200 group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500 mb-0.5">Read More</p>
                    <p className="text-sm font-medium text-gray-900">Deep dive into today's top story</p>
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
              Market indices: {marketData.source === "live" ? "Yahoo Finance" : marketData.source} · News: Finnhub
            </p>
          )}
        </div>
      </main>
    </div>
  )
}
