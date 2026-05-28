import { WhatChanged } from "@/services/contentEngine"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { useScrollReveal } from "@/hooks/useScrollReveal"

interface WhatChangedTodayProps {
  changes: WhatChanged[]
}

const DIRECTION_ICON = { up: TrendingUp, down: TrendingDown, neutral: Minus }
const DIRECTION_COLOR = { up: "text-emerald-600", down: "text-red-500", neutral: "text-gray-400" }

export default function WhatChangedToday({ changes }: WhatChangedTodayProps) {
  const { ref, isVisible } = useScrollReveal(0.04)
  if (!changes.length) return null

  return (
    <section ref={ref} className={`reveal ${isVisible ? "visible" : ""} py-10 md:py-12`}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400 mb-6 block">
          What Changed Today
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {changes.map((item, i) => {
            const Icon = DIRECTION_ICON[item.direction]
            return (
              <div key={i} className="border border-gray-100 rounded-lg p-5 hover:border-gray-200 hover:bg-gray-50/30 transition-all duration-200 group">
                <div className="flex items-center justify-between mb-3">
                  <Icon className={`w-4 h-4 ${DIRECTION_COLOR[item.direction]}`} />
                  {item.metric && (
                    <span className={`text-sm font-bold tabular-nums ${item.direction === "up" ? "text-emerald-600" : item.direction === "down" ? "text-red-500" : "text-gray-500"}`}>
                      {item.metric}
                    </span>
                  )}
                </div>
                <p className="text-[13px] font-semibold text-gray-900 mb-1.5">{item.label}</p>
                <p className="text-[11px] leading-[1.55] text-gray-500">{item.detail}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
