import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      "/api/yahoo": {
        target: "https://query1.finance.yahoo.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/yahoo/, ""),
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        },
      },
      "/api/finnhub": {
        target: "https://finnhub.io",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/finnhub/, ""),
      },
    },
  },
  build: {
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          icons: ["lucide-react"],
        },
      },
    },
  },
})
