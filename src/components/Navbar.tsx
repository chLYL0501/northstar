import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { Menu, Search, X, TrendingUp } from "lucide-react"
import { useLocation } from "react-router-dom"
import { search, getSuggestions, SearchResult } from "@/services/searchIndex"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const location = useLocation()
  const isActive = (p: string) => location.pathname === p

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (searchQuery.length >= 2) {
      setResults(search(searchQuery))
      setSuggestions(getSuggestions(searchQuery))
    } else {
      setResults([])
      setSuggestions([])
    }
  }, [searchQuery])

  const navBg = scrolled || !isActive("/")
    ? "bg-white/95 backdrop-blur-xl border-b border-gray-100/80"
    : "bg-white/80 backdrop-blur-md border-b border-gray-100/40"

  const linkClass = (path: string) =>
    `px-3 py-1.5 rounded-md text-[13px] transition-all duration-200 hover-scale-sm ${
      isActive(path)
        ? "text-gray-900 bg-gray-100 font-medium"
        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
    }`

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${navBg}`}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <Link to="/" className="flex items-center gap-2.5 shrink-0 hover-scale-sm">
              <span className="text-base font-bold tracking-tight text-gray-900">Narrative</span>
              <span className="h-3.5 w-px bg-gray-200" />
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400 hidden sm:inline">
                Market Brief
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <Link to="/" className={linkClass("/")}>Today</Link>
              <Link to="/flows" className={linkClass("/flows")}>
                <span className="flex items-center gap-1.5">
                  Flows
                  <TrendingUp className="w-3 h-3" />
                </span>
              </Link>

              <div className="w-px h-4 bg-gray-200 mx-1" />
              <button
                onClick={() => { setSearchOpen(!searchOpen); setSearchQuery("") }}
                className={`p-2 rounded-md transition-all duration-200 hover-scale-sm ${
                  searchOpen ? "text-gray-900 bg-gray-100" : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>

            <button className="md:hidden p-2 -mr-2 text-gray-500 hover:text-gray-900 transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
              <Menu className="w-4 h-4" />
            </button>
          </div>

          {mobileOpen && (
            <div className="md:hidden pb-4 border-t border-gray-100 pt-3 space-y-1">
              <Link to="/" className={`block px-3 py-2 text-sm rounded-md ${isActive("/") ? "text-gray-900 bg-gray-50 font-medium" : "text-gray-600"}`}>Today</Link>
              <Link to="/flows" className={`block px-3 py-2 text-sm rounded-md ${isActive("/flows") ? "text-gray-900 bg-gray-50 font-medium" : "text-gray-600"}`}>Capital Flows</Link>
              <div className="border-t border-gray-100 my-1" />
              <Link to="/signal/supply-chain" className="block px-3 py-2 text-[13px] text-gray-500 hover:bg-gray-50">Supply Chain</Link>
              <Link to="/signal/capex-decomposition" className="block px-3 py-2 text-[13px] text-gray-500 hover:bg-gray-50">Capex Decomposition</Link>
              <Link to="/signal/geopolitical-risk" className="block px-3 py-2 text-[13px] text-gray-500 hover:bg-gray-50">Geopolitical Risk</Link>
            </div>
          )}
        </div>
      </nav>

      {searchOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24 bg-black/20 backdrop-blur-sm animate-fade-in" onClick={() => setSearchOpen(false)}>
          <div className="bg-white border border-gray-200 rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-fade-in-down" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 px-4 border-b border-gray-100">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Search — NVIDIA, supply chain, capex..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
              />
              <button onClick={() => setSearchOpen(false)} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {searchQuery.length < 2 ? (
                <div className="p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">Trending</p>
                  <div className="flex flex-wrap gap-2">
                    {["AI capex", "NVIDIA", "supply chain", "semiconductor", "interest rate", "export control"].map((kw) => (
                      <button key={kw} onClick={() => setSearchQuery(kw)} className="text-[11px] text-gray-600 bg-gray-50 hover:bg-gray-100 px-2.5 py-1 rounded-full transition-colors">
                        {kw}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  {suggestions.length > 0 && (
                    <div className="p-3 border-b border-gray-50">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-2">Suggestions</p>
                      <div className="flex flex-wrap gap-1.5">
                        {suggestions.map((s) => (
                          <button key={s} onClick={() => setSearchQuery(s)} className="text-[11px] text-gray-600 bg-gray-50 hover:bg-gray-100 px-2 py-1 rounded transition-colors">
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {results.length === 0 ? (
                    <p className="px-4 py-6 text-sm text-gray-400 text-center">No results for &ldquo;{searchQuery}&rdquo;</p>
                  ) : (
                    <div className="py-2">
                      {results.map((r) => (
                        <Link key={r.id} to={r.url} onClick={() => setSearchOpen(false)}
                          className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">{r.category}</span>
                          </div>
                          <p className="text-sm font-medium text-gray-900">{r.title}</p>
                          <p className="text-[11px] text-gray-500 mt-0.5">{r.snippet}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
