export interface FinnhubQuote {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  high: number
  low: number
  open: number
  prevClose: number
}

export interface FinnhubNewsItem {
  headline: string
  summary: string
  source: string
  datetime: number
  url: string
  category: string
}

export interface SectorPerformance {
  sector: string
  changePercent: number
}

const STOCK_NAMES: Record<string, string> = {
  NVDA: "NVIDIA", MSFT: "Microsoft", AVGO: "Broadcom",
  ANET: "Arista Networks", NEE: "NextEra Energy", VST: "Vistra",
  AMAT: "Applied Materials", MU: "Micron Technology",
}

function getApiKey(): string | null {
  const key = import.meta.env.VITE_FINNHUB_API_KEY
  if (!key || key === "demo_finnhub_key_replace_me") return null
  return key
}

function finnhubUrl(path: string): string {
  return import.meta.env.DEV
    ? `/api/finnhub${path}`
    : `https://finnhub.io${path}`
}

async function finnhubGet<T>(path: string): Promise<T | null> {
  const key = getApiKey()
  if (!key) return null
  try {
    const separator = path.includes("?") ? "&" : "?"
    const url = `${finnhubUrl(`${path}${separator}token=${key}`)}`
    const res = await fetch(url)
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

export async function fetchFinnhubQuote(symbol: string): Promise<FinnhubQuote | null> {
  const data = await finnhubGet<{
    c: number; h: number; l: number; o: number; pc: number; d: number; dp: number
  }>(`/api/v1/quote?symbol=${symbol}`)
  if (!data || data.c === 0) return null
  const name = STOCK_NAMES[symbol] ?? symbol
  return {
    symbol,
    name,
    price: data.c,
    change: data.d,
    changePercent: data.dp,
    high: data.h,
    low: data.l,
    open: data.o,
    prevClose: data.pc,
  }
}

export async function fetchAllFinnhubQuotes(): Promise<FinnhubQuote[]> {
  const symbols = Object.keys(STOCK_NAMES)
  const results = await Promise.allSettled(symbols.map(fetchFinnhubQuote))
  return results
    .filter((r) => r.status === "fulfilled" && r.value !== null)
    .map((r) => (r as PromiseFulfilledResult<FinnhubQuote>).value)
}

export async function fetchMarketNews(): Promise<FinnhubNewsItem[]> {
  const data = await finnhubGet<FinnhubNewsItem[]>("/api/v1/news?category=general")
  return data?.slice(0, 5) ?? []
}

export async function fetchSectorPerformance(): Promise<SectorPerformance[]> {
  const raw = await finnhubGet<Record<string, number>>("/api/v1/stock/sector-performance")
  if (!raw) return []
  return Object.entries(raw).map(([sector, changePercent]) => ({
    sector,
    changePercent: +changePercent.toFixed(2),
  }))
}

export function isFinnhubAvailable(): boolean {
  return getApiKey() !== null
}
