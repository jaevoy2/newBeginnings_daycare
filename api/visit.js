// Serverless function (Vercel): emails the site owner when someone visits.
// Env vars: RESEND_API_KEY (required), NOTIFY_TO, NOTIFY_FROM, ALLOWED_ORIGIN (optional)

const NOTIFY_TO = process.env.NOTIFY_TO || 'francis@creativedevlabs.com'
const NOTIFY_FROM = process.env.NOTIFY_FROM || 'Site Visits <onboarding@resend.dev>'

const BOT_RE = /bot|crawl|spider|slurp|preview|facebookexternalhit|headless|lighthouse|monitor|curl|wget|python-requests/i

const esc = (v) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const header = (req, name) => {
  const v = req.headers[name]
  return Array.isArray(v) ? v[0] : v
}

function getIp(req) {
  const fwd = header(req, 'x-forwarded-for')
  return (
    (fwd && fwd.split(',')[0].trim()) ||
    header(req, 'x-real-ip') ||
    header(req, 'cf-connecting-ip') ||
    req.socket?.remoteAddress ||
    'Unknown'
  )
}

function parseUA(ua = '') {
  let browser = 'Unknown'
  const pick = (re, name) => {
    const m = ua.match(re)
    return m ? `${name} ${m[1]}` : null
  }
  browser =
    pick(/Edg(?:e|A|iOS)?\/([\d.]+)/, 'Edge') ||
    pick(/OPR\/([\d.]+)/, 'Opera') ||
    pick(/SamsungBrowser\/([\d.]+)/, 'Samsung Internet') ||
    pick(/(?:Chrome|CriOS)\/([\d.]+)/, 'Chrome') ||
    pick(/(?:Firefox|FxiOS)\/([\d.]+)/, 'Firefox') ||
    (/Safari\//.test(ua) ? pick(/Version\/([\d.]+)/, 'Safari') || 'Safari' : null) ||
    'Unknown'

  let os = 'Unknown OS'
  if (/Windows NT 10/.test(ua)) os = 'Windows 10/11'
  else if (/Windows/.test(ua)) os = 'Windows'
  else if (/Android ([\d.]+)/.test(ua)) os = 'Android ' + ua.match(/Android ([\d.]+)/)[1]
  else if (/iPhone|iPad|iPod/.test(ua)) os = 'iOS ' + (ua.match(/OS ([\d_]+)/)?.[1] || '').replace(/_/g, '.')
  else if (/Mac OS X/.test(ua)) os = 'macOS'
  else if (/CrOS/.test(ua)) os = 'ChromeOS'
  else if (/Linux/.test(ua)) os = 'Linux'

  const type = /iPad|Tablet/.test(ua)
    ? 'Tablet'
    : /Mobi|iPhone|Android/.test(ua)
      ? 'Mobile'
      : 'Desktop'
  return { browser, device: `${type} · ${os}` }
}

async function getLocation(req, ip) {
  const country = header(req, 'x-vercel-ip-country') || header(req, 'cf-ipcountry')
  if (country) {
    const city = decodeURIComponent(header(req, 'x-vercel-ip-city') || '')
    const region = header(req, 'x-vercel-ip-country-region') || ''
    return [city, region, country].filter(Boolean).join(', ')
  }
  // Fallback lookup (local testing / other hosts)
  try {
    const r = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
      signal: AbortSignal.timeout(3000),
    })
    const j = await r.json()
    if (j.success) return [j.city, j.region, j.country].filter(Boolean).join(', ')
  } catch {
    /* ignore */
  }
  return 'Unknown'
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false })

  const allowed = process.env.ALLOWED_ORIGIN
  const origin = header(req, 'origin')
  if (allowed && origin !== allowed) return res.status(403).json({ ok: false })

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return res.status(500).json({ ok: false, error: 'Email not configured' })

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  const ua = header(req, 'user-agent') || ''
  if (BOT_RE.test(ua)) return res.status(204).end()

  const ip = getIp(req)
  const location = await getLocation(req, ip)
  const { browser, device } = parseUA(ua)
  const when = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Manila',
    dateStyle: 'full',
    timeStyle: 'long',
  })
  const visitorTime = body.timezone ? `${body.timezone}` : 'n/a'

  const rows = [
    ['IP Address', ip],
    ['Location', location],
    ['Device', `${device}${body.screen ? ` (${body.screen})` : ''}`],
    ['Browser', browser],
    ['Date/Time', `${when} (Asia/Manila)`],
    ['Visitor time zone', visitorTime],
    ['Page', body.page || ''],
    ['Referrer', body.referrer || 'Direct'],
  ]

  const html = `<div style="font-family:Arial,sans-serif;max-width:520px">
    <h2 style="color:#0a7f86">New visitor on New Beginnings Childcare Academy</h2>
    <table cellpadding="8" style="border-collapse:collapse;width:100%">
      ${rows
        .map(
          ([k, v]) =>
            `<tr style="border-bottom:1px solid #eee"><td style="font-weight:bold;width:150px">${esc(k)}</td><td>${esc(v)}</td></tr>`,
        )
        .join('')}
    </table></div>`
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n')

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: NOTIFY_FROM,
      to: [NOTIFY_TO],
      subject: `New site visitor — ${location}`,
      html,
      text,
    }),
  })
  if (!r.ok) return res.status(502).json({ ok: false })
  return res.status(200).json({ ok: true })
}
