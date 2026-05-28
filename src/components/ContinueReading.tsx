import { Link } from "react-router-dom"
import { EntryPoint } from "@/data/marketData"
import { ArrowUpRight } from "lucide-react"
import { useScrollReveal } from "@/hooks/useScrollReveal"

interface ContinueReadingProps {
  entries: EntryPoint[]
}

export default function ContinueReading({ entries }: ContinueReadingProps) {
  const { ref, isVisible } = useScrollReveal(0.06)

  return (
    <section ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
      <div className="bg-[#F5F5F7] py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400 mb-6 block">Continue Reading</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {entries.map((entry) => (
              <Link
                key={entry.id}
                to={`/signal/${entry.slug}`}
                className="flex flex-col justify-between p-5 rounded-lg bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200 group hover-scale-sm"
              >
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400 mb-2 block">{entry.category}</span>
                  <p className="text-[13px] font-medium text-gray-900 group-hover:text-gray-600 transition-colors leading-[1.4] mb-1">{entry.label}</p>
                  <p className="text-[11px] text-gray-500 leading-[1.4]">{entry.headline}</p>
                </div>
                <div className="flex items-center justify-end mt-4 pt-3 border-t border-gray-100">
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
          <p className="text-center text-[10px] text-gray-400 mt-8">More stories updated daily at 6:00 AM EDT</p>
        </div>
      </div>
    </section>
  )
}
