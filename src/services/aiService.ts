const DEEPSEEK_BASE = "https://api.deepseek.com/v1"
const MODEL = "deepseek-chat"

function getApiKey(): string {
  const key = import.meta.env.VITE_DEEPSEEK_API_KEY
  if (!key || key === "sk-your-api-key-here") {
    throw new Error("DeepSeek API key not configured. Set VITE_DEEPSEEK_API_KEY in .env.local")
  }
  return key
}

interface ChatMessage {
  role: "system" | "user" | "assistant"
  content: string
}

interface DeepSeekResponse {
  choices: { message: { content: string } }[]
}

async function chat(messages: ChatMessage[]): Promise<string> {
  const res = await fetch(`${DEEPSEEK_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getApiKey()}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 800,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    let detail = `${res.status} ${res.statusText}`
    try {
      const parsed = JSON.parse(err)
      detail = parsed.error?.message ?? detail
    } catch {}
    throw new Error(`DeepSeek API error: ${detail}`)
  }

  const data: DeepSeekResponse = await res.json()
  return data.choices[0]?.message?.content ?? ""
}

export async function testConnection(): Promise<{
  ok: boolean
  message: string
}> {
  try {
    const reply = await chat([
      { role: "user", content: "Reply with exactly: OK" },
    ])
    return {
      ok: reply.trim().toUpperCase().includes("OK"),
      message: reply.trim() || "No response",
    }
  } catch (e) {
    return {
      ok: false,
      message: e instanceof Error ? e.message : "Unknown error",
    }
  }
}

export interface AINarrativeResult {
  headline: string
  summary: string
  keyPoints: string[]
}

export async function generateMarketNarrative(): Promise<AINarrativeResult> {
  const systemPrompt = `You are a senior markets editor at a financial research publication. Your writing style is concise, precise, and devoid of hype — similar to Bloomberg or the Wall Street Journal.

Generate a US equity market narrative for today. Format your response as a JSON object with exactly these three fields:
- "headline": A single compelling headline summarizing the day's market theme (max 12 words)
- "summary": A 2-3 sentence paragraph explaining what happened and why it matters (max 60 words)
- "keyPoints": An array of 3 short bullet points (each max 15 words) highlighting the most important drivers

Rules:
- Focus on macro catalysts, sector rotation, and institutional flows
- Use specific numbers where possible (basis points, percentage moves, dollar amounts)
- Do NOT use markdown, asterisks, or special formatting
- Output ONLY the raw JSON object, no other text`

  const userPrompt = `Generate today's US equity market narrative. Include specific data points about indices, sectors, and key movers.`

  const reply = await chat([
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ])

  let cleaned = reply.trim()
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/```(?:json)?\n?/g, "").replace(/```$/, "").trim()
  }

  const parsed = JSON.parse(cleaned) as AINarrativeResult

  if (!parsed.headline || !parsed.summary || !Array.isArray(parsed.keyPoints)) {
    throw new Error("AI response missing required fields")
  }

  return parsed
}
