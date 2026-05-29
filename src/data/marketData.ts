export interface IndexData {
  name: string
  symbol: string
  value: number
  change: number
  changePercent: number
}

export interface Narrative {
  id: string
  category: string
  headline: string
  summary: string
  timestamp: string
  keyMetrics: { label: string; value: string }[]
}

export interface FeaturedStory {
  id: string
  slug: string
  title: string
  summary: string
  keyQuote: string
  quoteSource: string
  readTime: string
  sparkline: { x: number; y: number }[]
  visualMetric: { label: string; value: string }
}

export interface SupportingStory {
  id: string
  slug: string
  title: string
  summary: string
  source: string
}

export interface Signal {
  id: string
  slug: string
  label: string
  title: string
  subtitle: string
  metric: string
  metricLabel: string
  trend: "up" | "down" | "neutral"
}

export interface EvidenceItem {
  metric: string
  label: string
  source: string
  trend: "up" | "down" | "neutral"
}

export interface RelatedStock {
  symbol: string
  name: string
  rationale: string
}

export interface FlowItem {
  category: string
  flow: string
  period: string
  trend: "inflow" | "outflow"
}

export interface ValueChainLayer {
  layer: string
  names: string
  note: string
  relevance: "critical" | "high" | "medium"
}

export interface BullBearCase {
  thesis: string
  probability?: string
  catalyst: string
  target: string
}

export interface ResearchLink {
  source: string
  title: string
  date: string
}

export interface DetailArticle {
  slug: string
  source: string
  authors: string[]
  date: string
  theme: string
  headline: string
  summary: string
  body: string[]
  keyQuote: string
  quoteSource: string
  researchSnippets: { source: string; text: string }[]
  keyData: { label: string; value: string }[]
  relatedSlugs: string[]
  evidence?: EvidenceItem[]
  relatedStocks?: RelatedStock[]
  flows?: FlowItem[]
  valueChain?: ValueChainLayer[]
  bullBear?: { bull: BullBearCase; bear: BullBearCase }
  relatedResearch?: ResearchLink[]
}

export interface BriefArticle {
  slug: string
  source: string
  authors: string[]
  date: string
  headline: string
  summary: string
  body: string[]
  keyData: { label: string; value: string }[]
  quoteSource: string
  quote: string
  relatedSlugs: string[]
}

export interface EntryPoint {
  id: string
  slug: string
  category: string
  label: string
  headline: string
}

export interface MarketPulse {
  label: string
  value: string
  change: string
  trend: "up" | "down"
}

export interface MarketData {
  date: string
  indices: IndexData[]
  marketPulse: MarketPulse[]
  heroNarrative: Narrative
  signals: Signal[]
  featuredStory: FeaturedStory
  supportingStories: SupportingStory[]
  institutionalFlows: { id: string; label: string; description: string; value: string; direction: "inflow" | "outflow" }[]
  entryPoints: EntryPoint[]
  detailArticles: DetailArticle[]
  briefArticles: BriefArticle[]
}

import { formatArticleDate as fmt, formatResearchDate as rfmt, formatDisplayDate as dfmt, formatETTime as et } from "@/services/formatDate"
const TD = fmt()
const YD = (() => { const d = new Date(); d.setDate(d.getDate() - 1); const m = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]; return `${m[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}` })()
const RM = rfmt()

const detailArticles: DetailArticle[] = [
  {
    slug: "supply-chain",
    source: "Narrative Market Brief",
    authors: ["Narrative Research"],
    date: TD,
    theme: "Supply Chain",
    headline: "Supply Chain: The Second-Order Effects of $320B in AI Capex",
    summary: "Beyond the headline capex numbers, the supply chain is revealing critical constraints in advanced packaging, high-bandwidth memory, and specialized power equipment. These bottlenecks are creating a new hierarchy of pricing power across the AI ecosystem.",
    body: [
      "The AI capex supercycle is generating second-order effects that are reshaping competitive dynamics far beyond the hyperscalers themselves. Three supply chain choke points have emerged as the most significant: advanced packaging capacity (CoWoS), high-bandwidth memory (HBM), and medium-voltage electrical equipment.",
      "TSMC's CoWoS capacity remains the single most critical bottleneck. Despite plans to more than double capacity to 75,000 wafers per month by end-2026, lead times for new orders still extend beyond 52 weeks. This constraint is forcing chip designers — including AMD and Intel — to redesign products around available packaging formats.",
      "The HBM market tells a similar story. SK Hynix and Samsung control effectively 100% of HBM3e production, and their combined 2026 capacity is already fully allocated. Micron's entry into the market with HBM3e qualification at NVIDIA provides a third source, but volume production is not expected to meaningfully impact supply until H2 2026.",
      "On the electrical infrastructure side, lead times for medium-voltage switchgear have extended to 80+ weeks, according to industry surveys. Eaton and Schneider Electric are the primary beneficiaries, with both companies reporting record backlogs in their most recent filings. This equipment is the gating factor for new data center energization timelines."
    ],
    keyQuote: "The supply chain is where alpha generation happens in this cycle. Understanding who controls the chokepoints tells you who controls the margin.",
    quoteSource: "Evercore ISI, Technology Research",
    researchSnippets: [
      { source: "Jefferies — Semiconductors", text: "CoWoS capacity will need to grow at 40%+ CAGR for the next three years just to meet current demand projections. The supply-demand gap is widening, not narrowing." },
      { source: "Morgan Stanley — Asia Technology", text: "HBM revenue is forecast to grow from $4B in 2024 to $25B by 2027, making it the fastest-growing segment in the memory industry by a wide margin." },
      { source: "Bloomberg NEF", text: "Data center electricity demand in the US could reach 15% of total generation by 2030 under an aggressive AI adoption scenario, up from 3% today." }
    ],
    keyData: [
      { label: "CoWoS Lead Time", value: "52+ wks" },
      { label: "HBM Market 2027E", value: "$25B" },
      { label: "Switchgear Lead Time", value: "80+ wks" },
      { label: "DC Power Share 2030E", value: "8-15%" }
    ],
    relatedSlugs: ["capex-decomposition", "geopolitical-risk"],
    evidence: [
      { metric: "52+ wks", label: "CoWoS lead time — no improvement despite 2x capacity plan", source: "Digitimes", trend: "up" },
      { metric: "100%", label: "HBM3e market controlled by SK Hynix & Samsung", source: "Trendforce", trend: "neutral" },
      { metric: "80+ wks", label: "Medium-voltage switchgear lead time at Eaton", source: "Eaton Q1 2026 Filing", trend: "up" },
      { metric: "3-5 yrs", label: "Grid interconnection queue for new data centers", source: "FERC Queue Data", trend: "up" },
    ],
    relatedStocks: [
      { symbol: "NVDA", name: "NVIDIA", rationale: "Largest beneficiary of GPU demand; 75%+ DC gross margins from CUDA ecosystem lock-in" },
      { symbol: "AVGO", name: "Broadcom", rationale: "Custom AI chip wins at hyperscalers; 89% YoY AI revenue growth" },
      { symbol: "ANET", name: "Arista Networks", rationale: "800G optical switching cycle; incremental margins above 60%" },
      { symbol: "AMAT", name: "Applied Materials", rationale: "Deposition & etch tools for advanced packaging expansion" },
    ],
    flows: [
      { category: "Semiconductor ETF (SMH)", flow: "+$2.8B", period: "Weekly Net", trend: "inflow" },
      { category: "Technology Select Sector (XLK)", flow: "+$3.2B", period: "Weekly Net", trend: "inflow" },
      { category: "Utilities Select Sector (XLU)", flow: "+$1.8B", period: "Weekly Net", trend: "inflow" },
    ],
    valueChain: [
      { layer: "Design & IP", names: "NVIDIA · Broadcom · AMD", note: "Architecture choices define downstream demand", relevance: "critical" },
      { layer: "Manufacturing", names: "TSMC · Samsung · Intel", note: "CoWoS is the single biggest bottleneck", relevance: "critical" },
      { layer: "Memory", names: "SK Hynix · Samsung · Micron", note: "HBM3e supply fully allocated through H2 2026", relevance: "critical" },
      { layer: "Equipment", names: "ASML · AMAT · Lam Research", note: "Equipment orders rising as fabs expand", relevance: "high" },
      { layer: "Power & Grid", names: "Eaton · NextEra · GE Vernova", note: "Grid interconnection delays constrain timelines", relevance: "high" },
    ],
    bullBear: {
      bull: {
        thesis: "Supply constraints persist for 3+ years across all chokepoints, allowing incumbents with allocated capacity to earn super-normal margins. The supply-demand gap widens before it narrows.",
        probability: "55%",
        catalyst: "TSMC raises 2027 CoWoS capex guidance; NVIDIA H200 supply still constrained",
        target: "Semis SOX +25% by YE 2026",
      },
      bear: {
        thesis: "Capacity expansion accelerates faster than expected; Intel Foundry and Rapidus break TSMC monopoly; Micron HBM dilutes pricing power for incumbents.",
        probability: "25%",
        catalyst: "DOJ antitrust review of semiconductor equipment market concentration",
        target: "Semis SOX -15% sector correction",
      },
    },
    relatedResearch: [
      { source: "Morgan Stanley", title: "Asia Semis: The $25B HBM Opportunity Through 2027", date: RM },
      { source: "Jefferies", title: "CoWoS Capacity Tracker: Monthly Supply Update", date: RM },
      { source: "Goldman Sachs", title: "US Utilities: Data Center Power Demand 2026-2030", date: RM },
      { source: "Bernstein", title: "Semi Equipment: Second Wave of AI Capex Begins", date: RM },
    ],
  },
  {
    slug: "capex-decomposition",
    source: "Narrative Market Brief",
    authors: ["Narrative Research"],
    date: TD,
    theme: "Capital Allocation",
    headline: "Capex Decomposition: Breaking Down the $320 Billion",
    summary: "A granular breakdown of hyperscaler capital expenditure by layer — compute silicon, networking fabric, data center shell, and power infrastructure. Each layer has distinct margin profiles and market structures.",
    body: [
      "Understanding where the $320 billion goes is essential for identifying the investable opportunities. We decompose hyperscaler capex into four distinct layers, each with different competitive dynamics and margin profiles.",
      "Compute Silicon (~40%): GPU and ASIC purchases dominate, with NVIDIA capturing the majority of GPU spend at 75%+ gross margins. Broadcom and Marvell split the growing custom silicon segment. This layer has the highest concentration risk but also the strongest pricing power.",
      "Networking Fabric (~18%): Optical interconnects, switches, and routers. The transition to 800G optics is creating a new investment cycle. Arista Networks and Coherent are the primary beneficiaries, with incremental margins of 60%+ on networking revenue.",
      "Data Center Shell (~25%): Construction, cooling, and physical infrastructure. This layer is the most fragmented, with hundreds of contractors and suppliers. Vertiv and Johnson Controls are the scaled players. Construction cost inflation of 22% YoY is compressing margins.",
      "Power Infrastructure (~17%): Grid interconnection, substations, and backup generation. This is the fastest-growing segment by CAGR but also the most regulated. NextEra, Constellation, and GE Vernova are the leaders."
    ],
    keyQuote: "The capex pyramid narrows sharply at the top. Four companies capture over 60% of the total value creation in AI infrastructure spend.",
    quoteSource: "Goldman Sachs, Technology Equity Research",
    researchSnippets: [
      { source: "UBS — Global Technology", text: "The ratio of networking spend to compute spend is rising from 0.6:1 to 0.9:1, implying networking is the fastest-growing capex category on a percentage basis." },
      { source: "J.P. Morgan — Power & Utilities", text: "Utility capex tied to data center interconnection could exceed $50B annually by 2028, representing a new secular growth driver for the sector." },
      { source: "Barclays — US Industrials", text: "Data center construction spending is on track to exceed $100B in 2026, making it one of the largest non-residential construction categories." }
    ],
    keyData: [
      { label: "Compute Silicon", value: "~40%" },
      { label: "Networking", value: "~18%" },
      { label: "DC Shell", value: "~25%" },
      { label: "Power Infra", value: "~17%" }
    ],
    relatedSlugs: ["supply-chain", "geopolitical-risk"],
    evidence: [
      { metric: "52+ wks", label: "CoWoS packaging lead time at TSMC", source: "Digitimes Research", trend: "up" },
      { metric: "100%", label: "SK Hynix + Samsung HBM3e market share", source: "Trendforce", trend: "neutral" },
      { metric: "80+ wks", label: "Medium-voltage switchgear backlog", source: "Eaton Q1 Filing", trend: "up" },
      { metric: "$25B", label: "HBM revenue forecast for 2027", source: "Morgan Stanley", trend: "up" },
    ],
    relatedStocks: [
      { symbol: "NVDA", name: "NVIDIA", rationale: "Primary beneficiary of GPU demand; CUDA lock-in creates 75%+ DC gross margins" },
      { symbol: "AVGO", name: "Broadcom", rationale: "Custom AI chip (TPU) design wins at Google, Meta; 89% YoY AI revenue growth" },
      { symbol: "ANET", name: "Arista Networks", rationale: "800G switching cycle driver; 60%+ incremental margins on networking revenue" },
      { symbol: "AMAT", name: "Applied Materials", rationale: "Deposition & etch tools critical for CoWoS advanced packaging expansion" },
    ],
    flows: [
      { category: "Semiconductor ETF (SMH)", flow: "+$2.8B", period: "Weekly Net", trend: "inflow" },
      { category: "Technology Select Sector (XLK)", flow: "+$3.2B", period: "Weekly Net", trend: "inflow" },
      { category: "Utilities Select Sector (XLU)", flow: "+$1.8B", period: "Weekly Net", trend: "inflow" },
    ],
    valueChain: [
      { layer: "Design & IP", names: "NVIDIA · Broadcom · AMD", note: "Architecture decisions define downstream demand", relevance: "critical" },
      { layer: "Manufacturing", names: "TSMC · Samsung · Intel", note: "CoWoS capacity is the single biggest bottleneck", relevance: "critical" },
      { layer: "Memory", names: "SK Hynix · Samsung · Micron", note: "HBM3e supply fully allocated through H2 2026", relevance: "critical" },
      { layer: "Equipment", names: "ASML · AMAT · Lam Research", note: "Equipment orders rising as fabs expand capacity", relevance: "high" },
      { layer: "Power Delivery", names: "Eaton · Schneider · Vertiv", note: "Switchgear lead times constrain data center timelines", relevance: "high" },
    ],
    bullBear: {
      bull: {
        thesis: "Supply constraints persist for 3+ years as demand growth outpaces capacity expansion across all three chokepoints. Incumbents with allocated capacity capture super-normal margins.",
        probability: "55%",
        catalyst: "TSMC raises 2027 CoWoS capex guidance on Q2 earnings call",
        target: "Semis SOX +25% by year-end",
      },
      bear: {
        thesis: "Capacity expansion accelerates faster than expected; new entrants (Intel Foundry, Rapidus) break the TSMC monopoly; HBM supply from Micron dilutes pricing.",
        probability: "25%",
        catalyst: "DOJ antitrust review of semiconductor equipment market concentration",
        target: "Semis SOX -15% sector correction",
      },
    },
    relatedResearch: [
      { source: "Morgan Stanley", title: "Asia Semis: The $25B HBM Opportunity Through 2027", date: RM },
      { source: "Jefferies", title: "CoWoS Capacity Tracker: Monthly Update on Advanced Packaging Supply", date: RM },
      { source: "Goldman Sachs", title: "US Power & Utilities: Data Center Demand Scenarios 2026-2030", date: RM },
      { source: "Bernstein", title: "Semiconductor Equipment: The Second Wave of AI Capex Is Just Beginning", date: RM },
    ],
  },
  {
    slug: "geopolitical-risk",
    source: "Narrative Market Brief",
    authors: ["Narrative Research"],
    date: TD,
    theme: "Geopolitics",
    headline: "Geopolitical Risk: Export Controls and the Fragmentation of AI Supply Chains",
    summary: "The latest round of US export controls and the EU's Chip Act 2.0 are accelerating the bifurcation of AI supply chains. Companies with geographically diversified manufacturing footprints are commanding premium valuations.",
    body: [
      "The geopolitical dimension of AI infrastructure is becoming impossible to ignore. Three concurrent policy developments are reshaping supply chain strategies: expanded US export controls on advanced semiconductor equipment, the EU's €47B Chip Act 2.0, and Japan's ¥3T semiconductor subsidy program.",
      "The latest US export controls, announced in March 2026, extend restrictions to include advanced packaging equipment and certain electronic design automation (EDA) tools. This represents a significant escalation from the October 2022 and October 2023 rounds, which focused primarily on logic and memory chips.",
      "The EU's Chip Act 2.0 earmarks €18B specifically for advanced packaging capacity — a direct attempt to reduce dependence on TSMC's Taiwan-based CoWoS operations. Intel's planned advanced packaging facility in Poland, and TSMC's joint venture with Bosch, Infineon, and NXP in Dresden, are key beneficiaries.",
      "Japan's ¥3T subsidy program has already attracted TSMC's Kumamoto fab and Rapidus's 2nm pilot line. The country is positioning itself as the neutral ground for advanced semiconductor manufacturing, benefiting from its strong equipment industry (Tokyo Electron, Screen Holdings) and stable geopolitical alignment."
    ],
    keyQuote: "Supply chain resilience is now a valuation input, not just a risk footnote. Companies that can manufacture in multiple geographies trade at a 2-3x turn premium.",
    quoteSource: "Morgan Stanley, Global Semiconductors",
    researchSnippets: [
      { source: "Eurasia Group — Policy Research", text: "The probability of further US export control escalation in 2026 is estimated at 65%, with advanced packaging equipment as the most likely next target." },
      { source: "BCA Research — Geopolitical Strategy", text: "Semiconductor supply chain bifurcation could add 15-20% to total cost of ownership for leading-edge chips, but this cost is likely to be absorbed by end customers given inelastic demand." },
      { source: "Bloomberg", text: "Global semiconductor subsidy commitments have now exceeded $380 billion across the US, EU, Japan, South Korea, and China, representing the largest industrial policy intervention in history." }
    ],
    keyData: [
      { label: "Global Subsidies", value: "$380B+" },
      { label: "US Control Escalation", value: "65% prob." },
      { label: "Chip Act 2.0", value: "€47B" },
      { label: "Japan Program", value: "¥3T" }
    ],
    relatedSlugs: ["supply-chain", "capex-decomposition"],
    evidence: [
      { metric: "$380B+", label: "Global semiconductor subsidy commitments across 5 regions", source: "Bloomberg", trend: "up" },
      { metric: "65% prob.", label: "Probability of further US export control escalation in 2026", source: "Eurasia Group", trend: "up" },
      { metric: "€47B", label: "EU Chip Act 2.0 total program through 2030", source: "European Commission", trend: "up" },
      { metric: "¥3T", label: "Japan semiconductor subsidy program for 2026-2030", source: "METI Japan", trend: "up" },
    ],
    relatedStocks: [
      { symbol: "INTC", name: "Intel", rationale: "Largest beneficiary of US & EU fab subsidies; diversifying away from TSMC concentration" },
      { symbol: "TSM", name: "TSMC", rationale: "Geopolitical risk premium but dominant manufacturing position; expanding in US, Japan, Germany" },
      { symbol: "ASML", name: "ASML", rationale: "Monopoly on EUV lithography; export controls are a double-edged sword for equipment demand" },
      { symbol: "LRCX", name: "Lam Research", rationale: "High China revenue exposure (~30%); most impacted by expanded export controls" },
    ],
    flows: [
      { category: "Defense & Aerospace ETF (ITA)", flow: "+$1.2B", period: "Weekly Net", trend: "inflow" },
      { category: "China Large-Cap ETF (FXI)", flow: "-$840M", period: "Weekly Net", trend: "outflow" },
      { category: "US Manufacturing ETF (PAVE)", flow: "+$620M", period: "Weekly Net", trend: "inflow" },
    ],
    valueChain: [
      { layer: "US Domestic", names: "Intel · Micron · TI · GlobalFoundries", note: "CHIPS Act + IRA benefiting domestic fabs; largest subsidy recipients", relevance: "critical" },
      { layer: "Taiwan", names: "TSMC · UMC · MediaTek", note: "Geopolitical risk premium but dominant advanced manufacturing position", relevance: "critical" },
      { layer: "South Korea", names: "Samsung · SK Hynix", note: "HBM memory dominance; navigating US-China export control pressure", relevance: "high" },
      { layer: "Japan", names: "Rapidus · Tokyo Electron", note: "Positioning as neutral ground; ¥3T subsidy program attracting investment", relevance: "high" },
      { layer: "Europe", names: "ASML · Infineon · STMicro", note: "Chip Act 2.0 targeting packaging independence; €18B packaging allocation", relevance: "high" },
    ],
    bullBear: {
      bull: {
        thesis: "Geographically diversified semiconductor companies trade at a premium as supply chain resilience becomes a valuation input. Intel, ASML, and TSMC benefit as global capacity expands outside Taiwan.",
        probability: "45%",
        catalyst: "US Commerce Department announces new CHIPS Act funding round for advanced packaging",
        target: "Global semis +15%; defense +20% by YE 2026",
      },
      bear: {
        thesis: "Export controls escalate into a full technology decoupling, disrupting $500B+ in annual semiconductor trade. Companies with concentrated China exposure face 20-30% revenue haircuts.",
        probability: "30%",
        catalyst: "China retaliates with rare earth export restrictions on semiconductor materials",
        target: "Semis SOX -20%; ASML and Lam Research hit hardest",
      },
    },
    relatedResearch: [
      { source: "Eurasia Group", title: "Geopolitical Risk Monitor: Semiconductors Edition — Q2 2026", date: RM },
      { source: "BCA Research", title: "Supply Chain Bifurcation: Cost Analysis of Geographic Diversification", date: RM },
      { source: "Citi Research", title: "Global Semiconductors: Winners and Losers from CHIPS Act 2.0", date: RM },
      { source: "Barclays", title: "Defense & Aerospace: Secular Growth in a Fragmented World Order", date: RM },
    ],
  },
]

const briefArticles: BriefArticle[] = [
  {
    slug: "support-1",
    source: "SEMI Industry Report",
    authors: ["SEMI Research"],
    date: TD,
    headline: "Semiconductor Equipment Orders Hit 18-Month High",
    summary: "Applied Materials and Lam Research both reported book-to-bill ratios above 1.2 for the first time since Q1 2025, signaling a renewed CapEx cycle in semiconductor manufacturing equipment.",
    body: [
      "The SEMI book-to-bill report for April 2026 showed North America-based semiconductor equipment manufacturers posting a book-to-bill ratio of 1.23, the highest reading since October 2024. This marks the fourth consecutive month above 1.0, indicating sustained expansion in equipment demand.",
      "Applied Materials reported orders of $7.8 billion for the quarter, up 18% sequentially, with particular strength in deposition and etch equipment used in advanced packaging. Lam Research reported $5.2 billion in orders, driven by demand for etch tools used in high-bandwidth memory production.",
      "The surge is being driven primarily by TSMC's capacity expansion plans, Intel's foundry buildout, and Samsung's memory investments. Combined, these three customers account for an estimated 65% of total semiconductor equipment spend in 2026, according to SEMI data."
    ],
    keyData: [
      { label: "Book-to-Bill", value: "1.23" },
      { label: "Applied Materials Orders", value: "$7.8B" },
      { label: "Lam Research Orders", value: "$5.2B" },
      { label: "Top 3 Concentration", value: "65%" }
    ],
    quoteSource: "SEMI, April 2026 Report",
    quote: "The equipment cycle is entering its strongest phase since 2021, driven by structural demand from AI and the geographic diversification of semiconductor manufacturing.",
    relatedSlugs: ["support-2", "support-3"]
  },
  {
    slug: "support-2",
    source: "Bloomberg",
    authors: ["Bloomberg News"],
    date: YD,
    headline: "Private Credit Steps In as Bank Syndication Slows on Data Center Deals",
    summary: "Non-bank lenders are financing an increasing share of data center construction as traditional bank syndicates reach their exposure limits on large-scale infrastructure projects.",
    body: [
      "The data center construction boom is testing the capacity of traditional bank lending. With individual project costs now exceeding $2 billion for hyperscale facilities, bank syndicates are reaching single-name exposure limits, creating an opening for private credit funds.",
      "Private credit spreads on data center construction loans have tightened 40 basis points over the last quarter to approximately 325 bps over SOFR, reflecting intense competition among alternative lenders. Major players include Blackstone Credit, Apollo Global Management, and Ares Management.",
      "Total private credit deployment into data center projects is estimated at $28 billion in 2026 year-to-date, already surpassing the full-year 2025 total of $22 billion. This trend is expected to accelerate as project pipelines continue to grow."
    ],
    keyData: [
      { label: "Spread Over SOFR", value: "+325 bps" },
      { label: "Spread Compression", value: "-40 bps" },
      { label: "2026 YTD Deployment", value: "$28B" },
      { label: "2025 Full Year", value: "$22B" }
    ],
    quoteSource: "Bloomberg, Private Credit Desk",
    quote: "Data center financing has become the largest single category in private credit, surpassing even leveraged buyout financing for the first time.",
    relatedSlugs: ["support-1", "support-3"]
  },
  {
    slug: "support-3",
    source: "Financial Times",
    authors: ["FT Brussels Bureau"],
    date: TD,
    headline: "EU Finalizes €47B Chip Act 2.0 with Focus on Advanced Packaging",
    summary: "The European Union has finalized its second major semiconductor legislation, allocating €18 billion specifically for advanced packaging capacity to compete with Asian dominance.",
    body: [
      "The European Commission formally adopted the EU Chip Act 2.0 on May 27, committing €47 billion in public and private investment through 2030. The legislation represents a significant expansion from the original €43 billion Chip Act passed in 2023.",
      "The most notable change is the earmarking of €18 billion specifically for advanced packaging capacity — a direct response to Europe's near-total dependence on TSMC's Taiwan-based CoWoS (Chip-on-Wafer-on-Substrate) packaging technology. The Commission estimates this investment could capture 20% of global advanced packaging capacity by 2030.",
      "Key beneficiaries include Intel's planned advanced packaging facility in Wrocław, Poland, and TSMC's joint venture with Bosch, Infineon, and NXP in Dresden, Germany. Both projects are expected to receive substantial subsidies under the new framework."
    ],
    keyData: [
      { label: "Total Program", value: "€47B" },
      { label: "Packaging Allocation", value: "€18B" },
      { label: "Target Market Share", value: "20%" },
      { label: "Timeline", value: "By 2030" }
    ],
    quoteSource: "European Commission, DG Connect",
    quote: "Europe cannot remain dependent on a single geography for the most critical element of semiconductor manufacturing. Advanced packaging sovereignty is a strategic imperative, not an industrial policy choice.",
    relatedSlugs: ["support-1", "support-2"]
  }
]

const todaysData: MarketData = {
  date: dfmt(),
  indices: [
    { name: "S&P 500", symbol: "SPX", value: 6092.48, change: 42.31, changePercent: 0.70 },
    { name: "Nasdaq", symbol: "IXIC", value: 19873.15, change: 156.82, changePercent: 0.80 },
    { name: "Dow Jones", symbol: "DJI", value: 42318.72, change: -28.44, changePercent: -0.07 },
  ],
  marketPulse: [
    { label: "VIX", value: "13.42", change: "-0.8", trend: "down" },
    { label: "US 10Y", value: "4.48%", change: "+3 bp", trend: "up" },
    { label: "DXY", value: "102.4", change: "+0.2", trend: "up" },
  ],
  heroNarrative: {
    id: "narrative-1",
    category: "Today's Narrative",
    headline: "The $320B AI Capex Supercycle Is Rewriting Market Structure",
    summary: "Hyperscaler spending has crossed $320B for FY2026, triggering a broad repricing across semiconductors, energy, and software. The market is pricing in who captures the margin.",
    timestamp: `Updated ${et()} ET · ${dfmt()}`,
    keyMetrics: [
      { label: "AI Capex 2026E", value: "$328B" },
      { label: "YoY Growth", value: "+38%" },
      { label: "Concentration", value: "Top 8: 74%" },
    ],
  },
  signals: [
    {
      id: "signal-1",
      slug: "supply-chain",
      label: "Supply Chain",
      title: "Three chokepoints defining the AI buildout",
      subtitle: "CoWoS, HBM, and switchgear bottlenecks",
      metric: "52+ wks",
      metricLabel: "CoWoS Lead Time",
      trend: "up",
    },
    {
      id: "signal-2",
      slug: "capex-decomposition",
      label: "Capex Decomposition",
      title: "Breaking down where each dollar goes",
      subtitle: "Compute, networking, shell, and power layers",
      metric: "~40%",
      metricLabel: "Compute Share",
      trend: "up",
    },
    {
      id: "signal-3",
      slug: "geopolitical-risk",
      label: "Geopolitical Risk",
      title: "Export controls reshaping supply chains",
      subtitle: "US, EU, and Japan policy developments",
      metric: "$380B+",
      metricLabel: "Global Subsidies",
      trend: "up",
    },
  ],
  featuredStory: {
    id: "featured-1",
    slug: "featured-1",
    title: "How Three Earnings Calls Reshaped the AI Trade in 72 Hours",
    summary: "Microsoft raised FY2027 capex guidance to $85B. Broadcom reported custom AI chip revenue growing 89% YoY. NextEra announced 4.2 GW of new data center power agreements.",
    keyQuote: "We are now in a phase where infrastructure spending is leading, not following, AI adoption. The bottleneck has shifted from model capability to physical capacity.",
    quoteSource: "Morgan Stanley, US Equity Strategy",
    readTime: "4 min read",
    sparkline: [
      { x: 0, y: 3.2 }, { x: 1, y: 3.5 }, { x: 2, y: 3.1 },
      { x: 3, y: 4.0 }, { x: 4, y: 4.8 }, { x: 5, y: 5.2 },
      { x: 6, y: 4.9 }, { x: 7, y: 5.6 }, { x: 8, y: 6.1 },
      { x: 9, y: 6.8 }, { x: 10, y: 7.2 }, { x: 11, y: 8.4 },
    ],
    visualMetric: { label: "Semis SOX Index", value: "5,842.10" },
  },
  supportingStories: [
    {
      id: "support-1",
      slug: "support-1",
      title: "Semiconductor Equipment Orders Hit 18-Month High",
      summary: "Applied Materials and Lam Research reported book-to-bill above 1.2 for the first time since Q1 2025.",
      source: "SEMI",
    },
    {
      id: "support-2",
      slug: "support-2",
      title: "Private Credit Steps in as Bank Syndication Slows on Data Center Deals",
      summary: "Non-bank lenders financing increasing share of construction, spreads tightening 40 bps.",
      source: "Bloomberg",
    },
    {
      id: "support-3",
      slug: "support-3",
      title: "EU Finalizes €47B Chip Act 2.0 with Focus on Advanced Packaging",
      summary: "Legislation earmarks €18B for advanced packaging, competing with TSMC Arizona.",
      source: "Financial Times",
    },
  ],
  institutionalFlows: [
    {
      id: "flow-1",
      label: "Equity Fund Flows",
      description: "US Large Cap Growth, Weekly Net",
      value: "+$8.4B",
      direction: "inflow",
    },
    {
      id: "flow-2",
      label: "Sector Rotation",
      description: "Tech vs Energy, 5-Day Delta",
      value: "+3.2σ from 90D",
      direction: "inflow",
    },
  ],
  entryPoints: [
    {
      id: "entry-1",
      slug: "supply-chain",
      category: "Related Narratives",
      label: "Supply Chain",
      headline: "Chokepoints in the AI buildout",
    },
    {
      id: "entry-2",
      slug: "capex-decomposition",
      category: "Latest Research",
      label: "Capex Breakdown",
      headline: "How each dollar is deployed",
    },
    {
      id: "entry-3",
      slug: "geopolitical-risk",
      category: "Top Stories",
      label: "Geopolitics",
      headline: "Export controls & fragmentation",
    },
  ],
  detailArticles,
  briefArticles,
}

export function getMarketData(): MarketData {
  return todaysData
}

export function getDetailBySlug(slug: string): DetailArticle | undefined {
  return detailArticles.find((d) => d.slug === slug)
}

export function getBriefBySlug(slug: string): BriefArticle | undefined {
  return briefArticles.find((b) => b.slug === slug)
}
