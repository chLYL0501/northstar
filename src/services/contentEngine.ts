export interface DailyNarrative {
  date: string
  headline: string
  summary: string
  dailySummary: string
  whyItMatters: string
  keyDrivers: string[]
  riskSignals: { label: string; level: "elevated" | "moderate" | "low" }
  regime: MarketRegime
  keyMetrics: { label: string; value: string }[]
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
    headline: "The $320B AI Capex Supercycle Is Rewriting Market Structure",
    summary:
      "Hyperscaler spending has crossed $320B for FY2026, triggering a broad repricing across semiconductors, energy, and software. The market is pricing in who captures the margin.",
    dailySummary:
      "AI infrastructure spending hits new record. Semiconductors lead as NVIDIA, Broadcom, and Arista capture incremental capex. Power & grid stocks rally on data center demand forecasts.",
    whyItMatters:
      "This is not a typical tech cycle. The scale of hyperscaler capex — $328B this year — is fundamentally restructuring how capital flows through global equity markets. Supply chain chokepoints in packaging, memory, and power equipment are creating a new hierarchy of winners and losers. Understanding who controls the bottlenecks is the key to positioning for the next 24 months.",
    keyDrivers: [
      "Hyperscaler capex guidance raised $12B above consensus",
      "TSMC CoWoS capacity remains the critical bottleneck at 52+ week lead times",
      "Power infrastructure stocks repricing as data center demand forecasts accelerate",
    ],
    riskSignals: { label: "Supply concentration in TSMC & SK Hynix", level: "elevated" },
    regime: "Risk-On",
    keyMetrics: [
      { label: "AI Capex 2026E", value: "$328B" },
      { label: "YoY Growth", value: "+38%" },
      { label: "Top 8 Concentration", value: "74%" },
    ],
  },
  {
    date: yesterdayStr(),
    headline: "Rate Cut Expectations Are Repricing Global Asset Allocation",
    summary:
      "FOMC minutes reveal a growing divergence between board members on the pace of easing. Bond markets are pricing 75bp of cuts by December, but equity positioning remains stretched.",
    dailySummary:
      "Bond yields slide as dovish FOMC minutes shift rate expectations. Financials underperform while growth stocks rally on lower discount rates. Dollar weakens against major pairs.",
    whyItMatters:
      "The bond market is now pricing a materially different rate path than the Fed's dot plot, creating one of the largest divergences since 2019. This is forcing a wholesale rotation from Financials into long-duration growth assets. The key question is whether equity valuations — already at 22x forward earnings — can absorb another leg higher on rate expectations alone.",
    keyDrivers: [
      "FOMC minutes reveal internal debate on pace of easing",
      "2Y/10Y spread steepens to +45bp, signaling improving growth expectations",
      "DXY breaks below 103, supporting multinational earnings",
    ],
    riskSignals: { label: "Equity valuations stretched at 22x forward P/E", level: "moderate" },
    regime: "Rotation",
    keyMetrics: [
      { label: "Fed Funds 2026E", value: "3.75%" },
      { label: "Cuts Priced", value: "75 bp" },
      { label: "10Y Yield", value: "4.28%" },
    ],
  },
  {
    date: twoDaysAgoStr(),
    headline: "Geopolitical Risk Premium Returns as Trade Tensions Escalate",
    summary:
      "New tariff proposals on advanced semiconductor exports to China have triggered a flight to quality. Defense and domestic manufacturing names are outperforming while semis with >30% China revenue are under pressure.",
    dailySummary:
      "Trade policy uncertainty drives defensive rotation. Defense contractors surge on elevated spending outlook. Gold breaks above $2,440. Semiconductor stocks with China exposure sell off sharply.",
    whyItMatters:
      "The latest round of export controls represents the most significant escalation in US-China technology policy since October 2022. With $380B+ in global semiconductor subsidies now committed across five regions, the industry is entering a new era of supply chain fragmentation. The critical question for investors: is geographic diversification a tailwind or a permanent cost headwind for semiconductor margins?",
    keyDrivers: [
      "New US export controls target advanced packaging equipment",
      "EU Chip Act 2.0 commits €47B including €18B for packaging",
      "Defense sector surges as Congressional budget adds $45B to procurement",
    ],
    riskSignals: { label: "Semiconductor supply chain bifurcation risk", level: "elevated" },
    regime: "Defensive",
    keyMetrics: [
      { label: "Defense Sector Δ", value: "+3.1%" },
      { label: "Gold", value: "$2,442" },
      { label: "China Semi Exposure", value: "−2.8%" },
    ],
  },
]

const WHAT_CHANGED_POOL: WhatChanged[][] = [
  [
    { label: "AI Capex Guidance", detail: "Microsoft raised FY2027 capex forecast above consensus by $12B, signaling hyperscaler spend acceleration.", direction: "up", metric: "+$12B" },
    { label: "Treasury Yields", detail: "10Y yield fell 8bp to 4.28% as bond market prices in faster easing cycle after dovish Fed commentary.", direction: "down", metric: "−8bp" },
    { label: "Sector Leadership", detail: "Technology reclaimed leadership from Energy as AI trade reasserts dominance after a 3-week rotation pause.", direction: "up" },
    { label: "Institutional Flows", detail: "US Large Cap Growth ETFs saw $8.4B in weekly inflows, the largest since March. Retail participation also elevated.", direction: "up", metric: "+$8.4B" },
  ],
  [
    { label: "Bond Market", detail: "2Y/10Y spread steepened to +45bp, the widest since January. Curve steepening signals growth expectations are improving.", direction: "up", metric: "+45bp" },
    { label: "Growth vs Value", detail: "Russell 1000 Growth outperformed Value by 1.8% in a single session, the largest daily divergence in 6 weeks.", direction: "up", metric: "+1.8%" },
    { label: "Fed Probability", detail: "CME FedWatch now shows 68% probability of a July cut, up from 42% last week. Rate-sensitive sectors repricing.", direction: "up", metric: "68%" },
    { label: "Dollar Index", detail: "DXY fell below 103 for the first time since March. Weaker dollar supports multinational earnings and emerging markets.", direction: "down", metric: "−0.7%" },
  ],
  [
    { label: "Defense Spending", detail: "Congressional budget proposal adds $45B to defense procurement. Lockheed, RTX, and Northrop all trading above 50-day MA.", direction: "up", metric: "+$45B" },
    { label: "China Semis", detail: "Stocks with >30% China revenue exposure fell an average 2.8% as new export controls loom. AMAT, Lam Research hit hardest.", direction: "down", metric: "−2.8%" },
    { label: "VIX", detail: "Volatility index rose to 19.4 but remains below the 20 panic threshold. Options market pricing moderate tail risk.", direction: "up", metric: "19.4" },
    { label: "Gold & Havens", detail: "Gold broke above $2,440 for the first time since April. Utilities sector saw largest weekly inflow since October 2023.", direction: "up", metric: "+$1.8B" },
  ],
]

function getDaySeed(date?: Date): number {
  const d = date ?? new Date()
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate()
}

export function getTodaysNarrative(): DailyNarrative {
  const seed = getDaySeed()
  return NARRATIVES[seed % NARRATIVES.length]
}

export function getYesterdaysNarrative(): DailyNarrative {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const seed = getDaySeed(yesterday)
  return NARRATIVES[seed % NARRATIVES.length]
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
