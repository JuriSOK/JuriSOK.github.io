import { useEffect, useState } from 'react'
import { profile } from '../../content/profile'

/**
 * Formats the current time in the profile timezone, e.g. « 14:32 CEST ».
 *
 * `Intl.DateTimeFormat` with the IANA zone handles CET / CEST itself — no
 * UTC offset is ever hard-coded. Returns `null` when the runtime lacks
 * timezone data, in which case the caller shows the zone name instead.
 */
function formatTime(): string | null {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: profile.timezone,
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    }).format(new Date())
  } catch {
    return null
  }
}

/**
 * Live local time, updated once per minute.
 *
 * The first tick is aligned on the next minute boundary so the display is
 * never a minute late; the interval then runs every 60 s. Both timers are
 * cleaned up on unmount. The value is computed synchronously on first render —
 * the app is client-rendered, so there is no hydration to disturb.
 */
export function ParisTime() {
  const [time, setTime] = useState<string | null>(formatTime)

  useEffect(() => {
    let interval: number | undefined

    const untilNextMinute = 60_000 - (Date.now() % 60_000)
    const timeout = window.setTimeout(() => {
      setTime(formatTime())
      interval = window.setInterval(() => setTime(formatTime()), 60_000)
    }, untilNextMinute)

    return () => {
      window.clearTimeout(timeout)
      if (interval !== undefined) {
        window.clearInterval(interval)
      }
    }
  }, [])

  /* Stable fallback when Intl cannot resolve the zone. */
  if (time === null) {
    return <span>{profile.timezone}</span>
  }

  return (
    <span>
      <span className="sr-only">Current time in Paris: </span>
      {time}
    </span>
  )
}
