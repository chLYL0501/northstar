import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

const Home = lazy(() => import("@/pages/Home"))
const Detail = lazy(() => import("@/pages/Detail"))
const FlowsPage = lazy(() => import("@/pages/FlowsPage"))
const NotFound = lazy(() => import("@/pages/NotFound"))

function PageFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-pulse space-y-3 w-full max-w-2xl px-6">
        <div className="skeleton w-20 h-[10px]" />
        <div className="skeleton w-full h-[36px]" />
        <div className="skeleton w-3/4 h-[15px]" />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signal/:slug" element={<Detail />} />
          <Route path="/flows" element={<FlowsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  )
}
