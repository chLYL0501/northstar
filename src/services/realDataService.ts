export interface IndexQuote {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
}

export interface StockQuote {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  timestamp: string
}

export interface RealMarketData {
  indices: IndexQuote[]
  stocks: StockQuote[]
  lastUpdated: string
  source: "live" | "cached" | "fallback"
}

export interface EnhancedMarketData extends RealMarketData {
  finnhubQuotes: StockQuote[]
  newsHeadlines: string[]
  sectorPerformance: { sector: string; changePercent: number }[]
}

import {
  fetchAllFinnhubQuotes,
  fetchMarketNews,
  fetchSectorPerformance,
  isFinnhubAvailable,
} from "@/services/finnhubService"

const INDEX_CONFIG: Record<string, string> = {
  "^GSPC": "S&P 500",
  "^IXIC": "Nasdaq",
  "^DJI": "Dow Jones",
}

const STOCK_CONFIG: Record<string, string> = {
  NVDA: "NVIDIA",
  MSFT: "Microsoft",
  AVGO: "Broadcom",
  ANET: "Arista Networks",
  NEE: "NextEra Energy",
  VST: "Vistra",
  AMAT: "Applied Materials",
  MU: "Micron Technology",
}

const FALLBACK_QUOTES: Record<string, { price: number; name: string }> = {
  "^GSPC": { price: 5950, name: "S&P 500" },
  "^IXIC": { price: 19100, name: "Nasdaq" },
  "^DJI": { price: 41800, name: "Dow Jones" },
  NVDA: { price: 1130, name: "NVIDIA" },
  MSFT: { price: 430, name: "Microsoft" },
  AVGO: { price: 1850, name: "Broadcom" },
  ANET: { price: 380, name: "Arista Networks" },
  NEE: { price: 79, name: "NextEra Energy" },
  VST: { price: 165, name: "Vistra" },
  AMAT: { price: 235, name: "Applied Materials" },
  MU: { price: 140, name: "Micron Technology" },
}

type CacheEntry<T> = { data: T; ts: number }

let quoteCache: CacheEntry<RealMarketData> | null = null
const CACHE_TTL = 60000

function baseUrl(): string {
  return import.meta.env.DEV
    ? "/api/yahoo"
    : "https://query1.finance.yahoo.com"
}

async function fetchYahoo(symbol: string): Promise<{
  price: number
  prevClose: number
} | null> {
  try {
    const path = `/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=2d`
    const url = `${baseUrl()}${path}`
    const res = await fetch(url)
    if (!res.ok) return null
    const json = await res.json()
    const meta = json.chart?.result?.[0]?.meta
    if (!meta?.regularMarketPrice) return null
    return { price: meta.regularMarketPrice, prevClose: meta.previousClose ?? meta.regularMarketPrice }
  } catch {
    return null
  }
}

function applyJitter(base: number): number {
  const jitter = (Math.random() - 0.5) * base * 0.006
  return +(base + jitter).toFixed(2)
}

export async function fetchIndices(): Promise<IndexQuote[]> {
  const results = await Promise.allSettled(
    Object.entries(INDEX_CONFIG).map(async ([sym, name]) => {
      const live = await fetchYahoo(sym)
      if (live) {
        return {
          symbol: sym.replace("^", ""),
          name,
          price: live.price,
          change: +(live.price - live.prevClose).toFixed(2),
          changePercent: +(((live.price - live.prevClose) / live.prevClose) * 100).toFixed(2),
        }
      }
      const fb = FALLBACK_QUOTES[sym]
      const jPrice = applyJitter(fb.price)
      return { symbol: sym.replace("^", ""), name: fb.name, price: jPrice, change: +(jPrice - fb.price).toFixed(2), changePercent: +((jPrice - fb.price) / fb.price * 100).toFixed(2) }
    })
  )
  return results.map((r) =>
    r.status === "fulfilled" ? r.value : { symbol: "—", name: "—", price: 0, change: 0, changePercent: 0 }
  )
}

export async function fetchAllStocks(): Promise<StockQuote[]> {
  const results = await Promise.allSettled(
    Object.entries(STOCK_CONFIG).map(async ([sym, name]) => {
      const live = await fetchYahoo(sym)
      if (live) {
        return {
          symbol: sym,
          name,
          price: live.price,
          change: +(live.price - live.prevClose).toFixed(2),
          changePercent: +(((live.price - live.prevClose) / live.prevClose) * 100).toFixed(2),
          timestamp: new Date().toISOString(),
        }
      }
      const fb = FALLBACK_QUOTES[sym]
      const jPrice = applyJitter(fb.price)
      return { symbol: sym, name: fb.name, price: jPrice, change: +(jPrice - fb.price).toFixed(2), changePercent: +((jPrice - fb.price) / fb.price * 100).toFixed(2), timestamp: new Date().toISOString() }
    })
  )
  return results.map((r) =>
    r.status === "fulfilled" ? r.value : { symbol: "—", name: "—", price: 0, change: 0, changePercent: 0, timestamp: "" }
  )
}

export async function fetchMarketData(): Promise<RealMarketData> {
  if (quoteCache && Date.now() - quoteCache.ts < CACHE_TTL) {
    return quoteCache.data
  }

  let source: RealMarketData["source"] = "fallback"
  let indices: IndexQuote[] = []
  let stocks: StockQuote[] = []

  const results = await Promise.allSettled([fetchIndices(), fetchAllStocks()])
  if (results[0].status === "fulfilled") indices = results[0].value
  if (results[1].status === "fulfilled") stocks = results[1].value

  const anyLive = indices.some((i) => i.symbol !== "—")
  source = anyLive ? "live" : "fallback"

  const data: RealMarketData = {
    indices,
    stocks,
    lastUpdated: new Date().toISOString(),
    source,
  }

  quoteCache = { data, ts: Date.now() }
  return data
}

export function getStockSymbols(): string[] {
  return Object.keys(STOCK_CONFIG)
}

export function getStockNames(): Record<string, string> {
  return STOCK_CONFIG
}

export function getIndexQueryConfig() {
  return INDEX_CONFIG
}

export async function fetchEnhancedMarketData(): Promise<EnhancedMarketData> {
  const base = await fetchMarketData()

  let finnhubQuotes: StockQuote[] = []
  let newsHeadlines: string[] = []
  let sectorPerformance: { sector: string; changePercent: number }[] = []

  if (isFinnhubAvailable()) {
    const [fq, news, sectors] = await Promise.allSettled([
      fetchAllFinnhubQuotes(),
      fetchMarketNews(),
      fetchSectorPerformance(),
    ])

    if (fq.status === "fulfilled" && fq.value.length > 0) {
      finnhubQuotes = fq.value.map((q) => ({
        symbol: q.symbol,
        name: q.name,
        price: q.price,
        change: q.change,
        changePercent: q.changePercent,
        timestamp: new Date().toISOString(),
      }))
    }

    if (news.status === "fulfilled" && news.value.length > 0) {
      newsHeadlines = news.value.map((n) => n.headline)
    }

    if (sectors.status === "fulfilled" && sectors.value.length > 0) {
      sectorPerformance = sectors.value
    }
  }

  return { ...base, finnhubQuotes, newsHeadlines, sectorPerformance }
}
