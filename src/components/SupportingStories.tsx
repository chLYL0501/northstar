import { Link } from "react-router-dom"
import { SupportingStory } from "@/data/marketData"
import { ArrowUpRight } from "lucide-react"
import { useScrollReveal } from "@/hooks/useScrollReveal"

function StoryCard({ data, index }: { data: SupportingStory; index: number }) {
  const { ref, isVisible } = useScrollReveal(0.04, "0px 0px -20px 0px")

  return (
    <article ref={ref} className={`reveal reveal-delay-${index + 1} ${isVisible ? "visible" : ""}`}>
      <Link to={`/brief/${data.slug}`} className="block group hover-scale-sm">
        <div className="border border-gray-100 rounded-lg p-4 hover:border-gray-200 hover:shadow-sm transition-all duration-300">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-[13px] font-semibold leading-snug text-gray-900 mb-1.5 group-hover:text-gray-600 transition-colors duration-200">
                {data.title}
              </h3>
              <p className="text-[12px] leading-relaxed text-gray-500 line-clamp-2">
                {data.summary}
              </p>
              <span className="inline-block mt-2.5 text-[10px] font-medium uppercase tracking-wider text-gray-400">
                {data.source}
              </span>
            </div>
            <ArrowUpRight className="w-3 h-3 text-gray-300 group-hover:text-gray-600 transition-colors duration-200 shrink-0 mt-1" />
          </div>
        </div>
      </Link>
    </article>
  )
}

interface SupportingStoriesProps {
  stories: SupportingStory[]
}

export default function SupportingStories({ stories }: SupportingStoriesProps) {
  const { ref: labelRef, isVisible: labelVisible } = useScrollReveal(0.25)

  return (
    <section className="py-12 md:py-14">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div ref={labelRef} className={`reveal ${labelVisible ? "visible" : ""}`}>
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400 mb-5 block">
            Supporting Evidence
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {stories.map((story, i) => (
            <StoryCard key={story.id} data={story} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
