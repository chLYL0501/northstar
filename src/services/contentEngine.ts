export interface DailyNarrative {
  date: string
  headline: string
  summary: string
  whatHappened: string
  whyItMatters: string
  marketImpact: {
    direction: "bullish" | "bearish" | "neutral"
    description: string
    tickers: string[]
  }
  regime: MarketRegime
  keyMetrics: { label: string; value: string }[]
  relatedSlugs: string[]
}

export interface WhatChanged {
  label: string
  detail: string
  direction: "up" | "down" | "neutral"
  metric?: string
}

export type MarketRegime = "Risk-On" | "Rotation" | "Defensive" | "Risk-Off"

import { todayStr, yesterdayStr, twoDaysAgoStr } from "@/services/formatDate"

const NARRATIVES: DailyNarrative[] = [
  {
    date: todayStr(),
    headline: "AI Spending Drives New Market Highs",
    summary:
      "Hyperscaler capex reached a record $328B in FY2026. Semiconductors, power infrastructure, and networking stocks are rallying as investors reprice who captures the margin in the AI buildout.",
    whatHappened:
      "Microsoft, Google, and Amazon raised combined capex guidance by $12B above consensus this week, signaling that hyperscaler AI spending is accelerating, not slowing.",
    whyItMatters:
      "Supply chokepoints in advanced packaging and HBM memory mean a handful of suppliers control pricing. Companies with allocated capacity are earning super-normal margins.",
    marketImpact: {
      direction: "bullish",
      description: "Semiconductor and power infrastructure sectors rallying. NVIDIA, Broadcom, Arista Networks leading gains.",
      tickers: ["NVDA", "AVGO", "ANET", "AMAT"],
    },
    regime: "Risk-On",
    keyMetrics: [
      { label: "AI Capex 2026E", value: "$328B" },
      { label: "YoY Growth", value: "+38%" },
      { label: "CoWoS Lead Time", value: "52+ wks" },
    ],
    relatedSlugs: ["supply-chain", "capex-decomposition"],
  },
  {
    date: yesterdayStr(),
    headline: "Rate Cut Bets Lift Growth Stocks",
    summary:
      "Bond markets are pricing 75bp of rate cuts by December after dovish FOMC minutes. Growth stocks rallied while financials and the dollar declined.",
    whatHappened:
      "FOMC minutes revealed growing internal support for easing. Markets now price a 68% probability of a July rate cut, up from 42% last week.",
    whyItMatters:
      "Lower rates compress discount rates on long-duration assets, favoring growth and tech. Banks face margin pressure as yield curve dynamics shift.",
    marketImpact: {
      direction: "bullish",
      description: "Growth and tech rallying on lower rate expectations. Financials and the dollar under pressure.",
      tickers: ["MSFT", "NVDA", "XLK", "XLF"],
    },
    regime: "Rotation",
    keyMetrics: [
      { label: "Cuts Priced", value: "75 bp" },
      { label: "10Y Yield", value: "4.28%" },
      { label: "DXY", value: "102.4" },
    ],
    relatedSlugs: ["capex-decomposition", "geopolitical-risk"],
  },
  {
    date: twoDaysAgoStr(),
    headline: "US-China Chip Curbs Rattle Semis",
    summary:
      "New US export controls on advanced semiconductor equipment triggered a flight to safety. Defense stocks surged while chip names with China exposure fell sharply.",
    whatHappened:
      "The US Commerce Department expanded export restrictions to include advanced packaging equipment and EDA tools, the most significant escalation since October 2022.",
    whyItMatters:
      "Supply chain bifurcation is accelerating. Companies with geographically diversified manufacturing now trade at a valuation premium. Equipment makers with high China exposure face revenue risk.",
    marketImpact: {
      direction: "bearish",
      description: "Semiconductor equipment under pressure. Defense and domestic manufacturing rallying. Gold breaking above $2,440.",
      tickers: ["AMAT", "LRCX", "ITA", "GLD"],
    },
    regime: "Defensive",
    keyMetrics: [
      { label: "Defense Sector Δ", value: "+3.1%" },
      { label: "Gold", value: "$2,442" },
      { label: "China Semi Exp", value: "−2.8%" },
    ],
    relatedSlugs: ["geopolitical-risk", "supply-chain"],
  },
]

const WHAT_CHANGED_POOL: WhatChanged[][] = [
  [
    { label: "AI Capex", detail: "Hyperscaler capex guidance raised $12B above consensus, signaling AI spend acceleration.", direction: "up", metric: "+$12B" },
    { label: "Treasury Yields", detail: "10Y fell 8bp to 4.28% as bond market prices faster easing.", direction: "down", metric: "−8bp" },
    { label: "Sector Rotation", detail: "Tech reclaims leadership from Energy as AI trade resumes dominance.", direction: "up" },
    { label: "ETF Flows", detail: "US Large Cap Growth ETFs saw $8.4B weekly inflow, biggest since March.", direction: "up", metric: "+$8.4B" },
  ],
  [
    { label: "Yield Curve", detail: "2Y/10Y spread steepened to +45bp, signaling improving growth expectations.", direction: "up", metric: "+45bp" },
    { label: "Growth vs Value", detail: "Russell 1000 Growth outperformed Value by 1.8% in a single session.", direction: "up", metric: "+1.8%" },
    { label: "Fed Odds", detail: "CME FedWatch shows 68% July cut probability, up from 42% last week.", direction: "up", metric: "68%" },
    { label: "Dollar", detail: "DXY fell below 103 for first time since March. Supports multinational earnings.", direction: "down", metric: "−0.7%" },
  ],
  [
    { label: "Defense Budget", detail: "Congress adds $45B to defense procurement. Contractors above 50-day MA.", direction: "up", metric: "+$45B" },
    { label: "China Semis", detail: "Stocks with >30% China revenue fell 2.8% as export controls loom.", direction: "down", metric: "−2.8%" },
    { label: "VIX", detail: "Volatility index rose to 19.4 but remains below panic threshold of 20.", direction: "up", metric: "19.4" },
    { label: "Gold", detail: "Gold breaks above $2,440. Utilities sector posts largest weekly inflow since Oct.", direction: "up", metric: "+$1.8B" },
  ],
]

function getDaySeed(date?: Date): number {
  const d = date ?? new Date()
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate()
}

export function getTodaysNarrative(): DailyNarrative {
  const seed = getDaySeed()
  const n = NARRATIVES[seed % NARRATIVES.length]
  return { ...n, date: todayStr() }
}

export function getYesterdaysNarrative(): DailyNarrative {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const seed = getDaySeed(yesterday)
  const n = NARRATIVES[seed % NARRATIVES.length]
  return { ...n, date: yesterdayStr() }
}

export function getWhatChanged(date?: Date): WhatChanged[] {
  const seed = getDaySeed(date)
  return WHAT_CHANGED_POOL[seed % WHAT_CHANGED_POOL.length]
}

export function getMarketRegime(date?: Date): MarketRegime {
  const seed = getDaySeed(date)
  const regimes: MarketRegime[] = ["Risk-On", "Rotation", "Defensive", "Risk-Off"]
  return regimes[seed % regimes.length]
}

export function formatDateLabel(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00")
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
}

export function getNextRefreshTime(): string {
  const now = new Date()
  const next = new Date(now)
  next.setHours(6, 0, 0, 0)
  if (now.getHours() >= 6) next.setDate(next.getDate() + 1)
  return next.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "America/New_York" })
}

export function formatRefreshTime(): string {
  return `Next update: ${getNextRefreshTime()} ET`
}
