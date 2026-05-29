import { FeaturedStory as FeaturedStoryType } from "@/data/marketData"
import { useScrollReveal } from "@/hooks/useScrollReveal"
import { TrendingUp } from "lucide-react"
import { formatSparklineRange, formatArticleDate } from "@/services/formatDate"

interface FeaturedStoryProps {
  data: FeaturedStoryType
}

export default function FeaturedStory({ data }: FeaturedStoryProps) {
  const { ref, isVisible } = useScrollReveal(0.06)
  const maxY = Math.max(...data.sparkline.map((d) => d.y))
  const minY = Math.min(...data.sparkline.map((d) => d.y))
  const range = maxY - minY || 1

  return (
    <section ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
      <div className="bg-[#F5F5F7] py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-16 items-center">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400 mb-5 block">Featured Story</span>
              <h2 className="font-display text-xl sm:text-2xl md:text-[1.75rem] leading-[1.22] tracking-[-0.008em] text-gray-900 mb-4">
                {data.title}
              </h2>
              <p className="text-[14px] leading-[1.7] text-gray-500 mb-6">{data.summary}</p>
              <blockquote className="border-l-[3px] border-gray-300 pl-5 py-0.5 mb-6">
                <p className="text-[13px] leading-relaxed text-gray-400 italic">&ldquo;{data.keyQuote}&rdquo;</p>
                <footer className="mt-3 text-[11px] text-gray-400 tracking-wide">&mdash; {data.quoteSource}</footer>
              </blockquote>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400">{data.readTime}</span>
                <span className="text-gray-300">&middot;</span>
                <TrendingUp className="w-3 h-3 text-emerald-600" />
                <span className="text-[11px] font-bold tabular-nums text-emerald-600">{data.visualMetric.value}</span>
                <span className="text-[10px] text-gray-400">{data.visualMetric.label}</span>
              </div>
            </div>
            <div className="bg-white border border-gray-100 rounded-lg p-5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3 block">{data.visualMetric.label}</span>
              <div className="flex items-end justify-between h-36 gap-[2px] px-1">
                {data.sparkline.map((point, i) => {
                  const h = ((point.y - minY) / range) * 100
                  return <div key={i} className="flex-1 bg-emerald-500/70 hover:bg-emerald-500 rounded-t-sm transition-colors duration-150 sparkline-bar" style={{ height: `${Math.max(h, 4)}%` }} />
                })}
              </div>
              <div className="flex justify-between mt-2 text-[9px] text-gray-300"><span>{formatSparklineRange(30)}</span><span>{formatSparklineRange(0)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
