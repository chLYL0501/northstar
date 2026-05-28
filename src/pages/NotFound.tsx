import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import Navbar from "@/components/Navbar"
import MiniTicker from "@/components/MiniTicker"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <MiniTicker />
      <Navbar />

      <div className="pt-32 pb-32 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400 mb-4">404</p>
        <h1 className="font-display text-[2.5rem] text-gray-900 mb-3">Page Not Found</h1>
        <p className="text-[15px] text-gray-500 mb-8">The page you are looking for does not exist.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors hover-scale-sm underline underline-offset-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Return to Market Brief
        </Link>
      </div>
    </div>
  )
}
