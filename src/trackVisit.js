// Tells the server a visit happened (once per browser session).
// The server reads IP, location, device and browser, then emails the site owner.
export default function trackVisit() {
  if (!import.meta.env.PROD) return
  try {
    if (sessionStorage.getItem('nb-visit-sent')) return
    sessionStorage.setItem('nb-visit-sent', '1')
  } catch {
    /* storage blocked: still send once per load */
  }
  fetch('/api/visit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
    body: JSON.stringify({
      page: location.href,
      referrer: document.referrer,
      screen: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }),
  }).catch(() => {})
}
