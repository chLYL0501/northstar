const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

export function todayStr(): string {
  const d = new Date()
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  return `${d.getFullYear()}-${mm}-${dd}`
}

export function yesterdayStr(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  return `${d.getFullYear()}-${mm}-${dd}`
}

export function twoDaysAgoStr(): string {
  const d = new Date()
  d.setDate(d.getDate() - 2)
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  return `${d.getFullYear()}-${mm}-${dd}`
}

export function formatDisplayDate(dateStr?: string): string {
  const d = dateStr ? new Date(dateStr + "T00:00:00") : new Date()
  const weekday = d.toLocaleDateString("en-US", { weekday: "long" })
  const month = MONTHS[d.getMonth()]
  const day = d.getDate()
  const year = d.getFullYear()
  return `${weekday}, ${month} ${day}, ${year}`
}

export function formatArticleDate(dateStr?: string): string {
  const d = dateStr ? new Date(dateStr + "T00:00:00") : new Date()
  const month = MONTHS_SHORT[d.getMonth()]
  const day = d.getDate()
  const year = d.getFullYear()
  return `${month} ${day}, ${year}`
}

export function formatETTime(): string {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/New_York",
    hour12: false,
  })
}

export function formatETTimeWithSeconds(): string {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "America/New_York",
    hour12: false,
  })
}

export function formatTimestampET(isoString: string): string {
  try {
    return new Date(isoString).toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/New_York",
      timeZoneName: "short",
    })
  } catch {
    return ""
  }
}

export function formatResearchDate(): string {
  const d = new Date()
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

export function formatSparklineRange(daysAgo: number): string {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  return `${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}`
}
