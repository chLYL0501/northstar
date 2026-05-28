export interface SearchResult {
  id: string
  title: string
  snippet: string
  category: string
  url: string
  keywords: string[]
}

interface IndexEntry {
  id: string
  title: string
  text: string
  category: string
  url: string
  keywords: string[]
  aliases: string[]
}

const INDEX: IndexEntry[] = [
  {
    id: "supply-chain",
    title: "Supply Chain: Chokepoints in the AI Buildout",
    text: "TSMC CoWoS capacity, HBM memory supply, and medium-voltage switchgear lead times are the three critical bottlenecks in the AI capex supercycle. Lead times exceed 52 weeks for advanced packaging and 80 weeks for electrical equipment.",
    category: "Narrative",
    url: "/signal/supply-chain",
    keywords: ["supply chain", "CoWoS", "semiconductor", "bottleneck", "TSMC", "HBM", "packaging", "switchgear", "lead time", "capacity"],
    aliases: ["chokepoints", "constraints", "shortage", "equipment"],
  },
  {
    id: "capex-decomposition",
    title: "Capex Decomposition: Where $320B Goes",
    text: "Breaking down hyperscaler capex into compute silicon (~40%), networking fabric (~18%), data center shell (~25%), and power infrastructure (~17%). Each layer has distinct margin profiles and competitive dynamics.",
    category: "Narrative",
    url: "/signal/capex-decomposition",
    keywords: ["capex", "capital expenditure", "hyperscaler", "compute", "networking", "data center", "power", "infrastructure", "GPU", "spending"],
    aliases: ["investment", "buildout", "construction", "cloud spending"],
  },
  {
    id: "geopolitical-risk",
    title: "Geopolitical Risk: Export Controls & Fragmentation",
    text: "US export controls, EU Chip Act 2.0 (€47B), and Japan's ¥3T semiconductor program are accelerating supply chain bifurcation. Companies with geographically diversified manufacturing command premium valuations.",
    category: "Narrative",
    url: "/signal/geopolitical-risk",
    keywords: ["geopolitics", "export control", "CHIPS Act", "tariff", "trade war", "China", "semiconductor ban", "EU", "Japan", "subsidy"],
    aliases: ["sanctions", "national security", "decoupling", "reshoring", "policy"],
  },
  {
    id: "flows",
    title: "Capital Flows: Tracking Institutional Money",
    text: "US large cap growth funds saw +$8.4 billion net inflows this week. Technology vs Energy rotation at +3.2σ from 90-day mean. Utility sector ownership increased 320 bps QoQ in latest 13-F filings.",
    category: "Capital Flows",
    url: "/flows",
    keywords: ["flows", "ETF", "institutional", "13-F", "fund flow", "rotation", "positioning", "allocation", "sector"],
    aliases: ["money flow", "capital movement", "fund manager", "asset allocation"],
  },
]

export function search(query: string): SearchResult[] {
  if (!query || query.trim().length < 2) return []
  const q = query.toLowerCase().trim()
  return INDEX.filter(
    (entry) =>
      entry.title.toLowerCase().includes(q) ||
      entry.text.toLowerCase().includes(q) ||
      entry.keywords.some((k) => k.toLowerCase().includes(q)) ||
      entry.aliases.some((a) => a.toLowerCase().includes(q))
  ).map((entry) => ({
    id: entry.id,
    title: entry.title,
    snippet: entry.text.slice(0, 120) + "...",
    category: entry.category,
    url: entry.url,
    keywords: entry.keywords.slice(0, 5),
  }))
}

export function getSuggestions(query: string): string[] {
  if (!query || query.trim().length < 2) return []
  const q = query.toLowerCase().trim()
  const suggestions = new Set<string>()
  INDEX.forEach((entry) => {
    if (entry.title.toLowerCase().includes(q)) {
      suggestions.add(entry.title.split(":")[0].trim())
    }
    entry.keywords.forEach((k) => {
      if (k.toLowerCase().includes(q)) suggestions.add(k)
    })
    entry.aliases.forEach((a) => {
      if (a.toLowerCase().includes(q)) suggestions.add(a)
    })
  })
  return Array.from(suggestions).slice(0, 6)
}

export function getTrendingKeywords(): string[] {
  return ["AI capex", "NVIDIA", "interest rate", "semiconductor", "supply chain", "export control"]
}
