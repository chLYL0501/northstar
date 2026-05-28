import { useState } from "react"
import { Sparkles, RefreshCw, AlertCircle } from "lucide-react"
import { generateMarketNarrative, type AINarrativeResult } from "@/services/aiService"

export default function AINarrative() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [result, setResult] = useState<AINarrativeResult | null>(null)
  const [errorMsg, setErrorMsg] = useState("")

  const generate = async () => {
    setState("loading")
    setErrorMsg("")
    try {
      const data = await generateMarketNarrative()
      setResult(data)
      setState("success")
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Failed to generate narrative")
      setState("error")
    }
  }

  return (
    <section className="pb-6 md:pb-8">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <div className="border border-gray-100 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-3 h-3 text-gray-400" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
              AI Narrative
            </span>
            <span className="text-[9px] text-gray-300">DeepSeek</span>
          </div>

          {state === "idle" && (
            <button
              onClick={generate}
              className="w-full py-3 border border-dashed border-gray-200 rounded-md text-[12px] text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50/50 transition-all duration-200"
            >
              <span className="flex items-center justify-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                Generate AI market narrative
              </span>
            </button>
          )}

          {state === "loading" && (
            <div className="animate-pulse space-y-3">
              <div className="skeleton w-full h-[18px]" />
              <div className="skeleton w-full h-[12px]" />
              <div className="skeleton w-2/3 h-[12px]" />
              <div className="flex gap-2 mt-3">
                <div className="skeleton w-3 h-3" />
                <div className="skeleton w-40 h-[11px]" />
              </div>
              <div className="flex gap-2">
                <div className="skeleton w-3 h-3" />
                <div className="skeleton w-36 h-[11px]" />
              </div>
              <div className="flex gap-2">
                <div className="skeleton w-3 h-3" />
                <div className="skeleton w-44 h-[11px]" />
              </div>
            </div>
          )}

          {state === "error" && (
            <div className="flex flex-col items-center gap-3 py-4">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <p className="text-[11px] text-red-500 text-center max-w-sm leading-[1.5]">
                {errorMsg}
              </p>
              <button
                onClick={generate}
                className="inline-flex items-center gap-1.5 text-[11px] text-gray-500 hover:text-gray-900 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                Retry
              </button>
            </div>
          )}

          {state === "success" && result && (
            <div className="animate-fade-in-up">
              <h2 className="font-display text-lg text-gray-900 mb-3 leading-[1.25]">
                {result.headline}
              </h2>
              <p className="text-[13px] leading-[1.65] text-gray-600 mb-4">
                {result.summary}
              </p>

              <div className="border-t border-gray-100 pt-3 space-y-2">
                {result.keyPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-gray-300 mt-[6px] shrink-0" />
                    <span className="text-[11px] text-gray-500 leading-[1.6]">{pt}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={generate}
                className="mt-4 inline-flex items-center gap-1.5 text-[10px] text-gray-400 hover:text-gray-600 transition-colors"
              >
                <RefreshCw className="w-2.5 h-2.5" />
                Regenerate
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
