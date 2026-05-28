import { useParams, Link } from "react-router-dom"
import { getBriefBySlug } from "@/data/marketData"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import Navbar from "@/components/Navbar"
import { useEffect } from "react"

export default function Brief() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getBriefBySlug(slug) : undefined

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-20 pb-32 text-center">
          <h2 className="font-display text-2xl text-gray-900 mb-2">Brief Not Found</h2>
          <Link to="/" className="text-[13px] text-gray-500 hover:text-gray-900 underline underline-offset-4 hover-scale-sm">
            Return Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <article className="pt-20 pb-28">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-gray-700 transition-colors duration-200 mb-6 group hover-scale-sm">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
            Back to Brief
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
              Evidence Brief
            </span>
            <span className="text-[10px] text-gray-400">{article.date}</span>
          </div>

          <h1 className="font-display text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] leading-[1.15] tracking-[-0.015em] text-gray-900 mb-4">
            {article.headline}
          </h1>

          <p className="text-[15px] leading-[1.75] text-gray-500 mb-8">
            {article.summary}
          </p>

          <div className="flex items-center gap-2 mb-10 pb-8 border-b border-gray-100">
            <span className="text-[11px] font-medium text-gray-900">{article.source}</span>
            <span className="text-gray-300">&middot;</span>
            <span className="text-[11px] text-gray-500">{article.authors.join(", ")}</span>
          </div>

          {article.body.map((paragraph, i) => (
            <p key={i} className="text-[15px] leading-[1.8] text-gray-700 mb-6">
              {paragraph}
            </p>
          ))}

          {article.keyData.length > 0 && (
            <div className="my-10 border border-gray-100 rounded-lg p-5 bg-gray-50/50">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-4 block">Key Data</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {article.keyData.map((kd) => (
                  <div key={kd.label}>
                    <p className="text-sm font-bold tabular-nums text-gray-900">{kd.value}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{kd.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <blockquote className="border-l-[3px] border-gray-300 pl-5 py-0.5 mb-12">
            <p className="text-sm leading-relaxed text-gray-500 italic">
              &ldquo;{article.quote}&rdquo;
            </p>
            <footer className="mt-3 text-[11px] text-gray-400 tracking-wide">
              &mdash; {article.quoteSource}
            </footer>
          </blockquote>

          {article.relatedSlugs.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-100">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-4 block">Related Briefs</span>
              <div className="space-y-2">
                {article.relatedSlugs.map((rs) => {
                  const related = getBriefBySlug(rs)
                  return (
                    <Link
                      key={rs}
                      to={`/brief/${rs}`}
                      className="flex items-center justify-between py-3 px-4 border border-gray-100 rounded-lg hover:border-gray-200 hover:bg-gray-50/50 transition-all duration-200 group hover-scale-sm"
                    >
                      <span className="text-[13px] text-gray-700 group-hover:text-gray-900 transition-colors">
                        {related?.headline ?? rs.replace(/-/g, " ")}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0 ml-3" />
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  )
}
