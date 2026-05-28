import { useScrollReveal } from "@/hooks/useScrollReveal"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

interface FlowItem {
  id: string; label: string; description: string; value: string; direction: "inflow" | "outflow"
}

interface InstitutionalFlowsProps {
  flows: FlowItem[]
}

export default function InstitutionalFlows({ flows }: InstitutionalFlowsProps) {
  const { ref, isVisible } = useScrollReveal(0.06)

  return (
    <section ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
      <div className="bg-[#F5F5F7] py-12 md:py-14">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex items-end justify-between mb-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">
              Institutional Flows
            </span>
            <Link to="/flows" className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-400 hover:text-gray-700 transition-colors group">
              View details <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {flows.map((flow) => (
              <div key={flow.id} className="flex items-center justify-between py-3.5 px-5 rounded-lg bg-white border border-gray-100 hover:border-gray-200 transition-all duration-200">
                <div className="min-w-0 mr-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-0.5">{flow.label}</p>
                  <p className="text-[11px] text-gray-400 truncate">{flow.description}</p>
                </div>
                <span className={`text-sm font-bold tabular-nums shrink-0 ${flow.direction === "inflow" ? "text-emerald-600" : "text-red-500"}`}>
                  {flow.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
