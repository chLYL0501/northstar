import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "@/pages/Home"
import Detail from "@/pages/Detail"
import FlowsPage from "@/pages/FlowsPage"
import NotFound from "@/pages/NotFound"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signal/:slug" element={<Detail />} />
        <Route path="/flows" element={<FlowsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}
