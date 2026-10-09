import { useEffect, useRef, useState } from 'react'
import {
  ArrowUp,
  ChevronDown,
  Phone,
  RotateCcw,
  Sun,
  Music,
  Puzzle,
  Utensils,
  Moon,
  Trees,
  Brush,
  Home,
} from 'lucide-react'
import { site } from './data'
import { confetti } from './confetti'

/* ---------- Values ribbon ---------- */
const WORDS = ['Loving', 'Safe', 'Christ Centered', 'Playful', 'Curious', 'Confident', 'Nurturing', 'Fun']

export function Marquee() {
  const items = [...WORDS, ...WORDS]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((w, i) => (
          <span key={i}>
            {w} <i>★</i>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---------- Wavy section divider ---------- */
export function Wave({ from, to, flip }) {
  return (
    <div className={`wave ${flip ? 'wave--flip' : ''}`} style={{ background: to }} aria-hidden="true">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path
          fill={from}
          d="M0,0H1440V30C1320,70 1200,80 1080,55C960,30 840,10 720,35C600,60 480,80 360,60C240,40 120,10 0,40Z"
        />
      </svg>
    </div>
  )
}

/* ---------- Floating doodles ---------- */
export function Doodles({ variant = 'a' }) {
  return (
    <div className={`doodles doodles--${variant}`} aria-hidden="true">
      <svg className="d d1" viewBox="0 0 40 40"><path d="M20 3l5 11 12 1-9 8 3 12-11-7-11 7 3-12-9-8 12-1z" fill="#ffc53d" /></svg>
      <svg className="d d2" viewBox="0 0 60 30"><path d="M5 25c0-8 6-12 12-10 2-8 14-10 19-2 8-3 16 3 14 12z" fill="none" stroke="#2fa4ff" strokeWidth="3" strokeLinejoin="round" /></svg>
      <svg className="d d3" viewBox="0 0 40 40"><path d="M20 35C5 24 3 14 11 9c5-3 8 0 9 3 1-3 4-6 9-3 8 5 6 15-9 26z" fill="#ff5c8a" /></svg>
      <svg className="d d4" viewBox="0 0 80 20"><path d="M2 10q8-14 16 0t16 0 16 0 16 0 12 0" fill="none" stroke="#4caf50" strokeWidth="3.5" strokeLinecap="round" /></svg>
      <svg className="d d5" viewBox="0 0 40 40"><circle cx="20" cy="20" r="14" fill="none" stroke="#ff8a3d" strokeWidth="4" strokeDasharray="6 7" /></svg>
    </div>
  )
}

/* ---------- Count-up facts ---------- */
function useInView() {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return [ref, seen]
}

function Count({ to, prefix = '', run }) {
  const [n, setN] = useState(0)
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  useEffect(() => {
    if (!run) return
    let raf
    const start = performance.now()
    const dur = reduce ? 0 : 1400
    const tick = (t) => {
      const p = dur ? Math.min((t - start) / dur, 1) : 1
      setN(Math.round((1 - Math.pow(1 - p, 3)) * to))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, to, reduce])
  return (
    <>
      {prefix}
      {n}
    </>
  )
}

const STATS = [
  { to: 4, label: 'Programs: infant, toddler, preschool & pre-k', color: 'pink' },
  { to: 5, label: 'Safety features protecting every child', color: 'green' },
  { to: 5, label: 'Days a week, Monday to Friday', color: 'orange' },
  { to: 7, prefix: '$', label: 'saved for every $1 invested in early childhood programs*', color: 'purple' },
]

export function Stats() {
  const [ref, seen] = useInView()
  return (
    <section className="stats" ref={ref}>
      <div className="container stats__grid">
        {STATS.map((s) => (
          <div key={s.label} className={`stat stat--${s.color}`}>
            <strong>
              <Count to={s.to} prefix={s.prefix} run={seen} />
            </strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
      <p className="container stats__note">*Studies cited by the American Federation of Teachers.</p>
    </section>
  )
}

/* ---------- A day at New Beginnings ---------- */
const DAY = [
  { icon: Home, title: 'Warm Welcome', text: 'A hello, a hug and free play as families arrive.' },
  { icon: Music, title: 'Circle Time', text: 'Songs, stories and conversation that grow language.' },
  { icon: Puzzle, title: 'Discovery Learning', text: 'Hands-on projects from Carol’s Curriculum.' },
  { icon: Utensils, title: 'Lunch Time', text: 'Nutritious meals from our monthly lunch menu.' },
  { icon: Moon, title: 'Rest Time', text: 'Quiet time to recharge growing bodies and minds.' },
  { icon: Trees, title: 'Outdoor Play', text: 'Fresh air in our outdoor gated play center.' },
  { icon: Brush, title: 'Art & Stories', text: 'Creative time to imagine, build and express.' },
  { icon: Sun, title: 'Happy Goodbye', text: 'Sharing the day’s adventures at pickup.' },
]

export function Schedule() {
  return (
    <section id="day" className="section day">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow eyebrow--center">A Day With Us</p>
          <h2>What a day at New Beginnings feels like</h2>
          <p className="muted">A gentle routine helps children feel secure, curious and ready to learn.</p>
        </header>
        <ol className="timeline">
          {DAY.map((d, i) => {
            const Icon = d.icon
            return (
              <li key={d.title} className={`tl tl--${i % 4}`}>
                <span className="tl__icon">
                  <Icon size={26} />
                </span>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

/* ---------- Kids Corner: memory match game ---------- */
const FACES = ['🦁', '🐘', '🐼', '🦋', '🐞', '🐸']
const shuffle = () =>
  [...FACES, ...FACES]
    .map((f) => ({ f, k: Math.random() }))
    .sort((a, b) => a.k - b.k)
    .map((c) => c.f)

export function KidsCorner() {
  const [deck, setDeck] = useState(shuffle)
  const [open, setOpen] = useState([])
  const [done, setDone] = useState([])
  const [moves, setMoves] = useState(0)
  const won = done.length === deck.length
  const wonRef = useRef(null)

  const flip = (i) => {
    if (open.length === 2 || open.includes(i) || done.includes(i)) return
    const next = [...open, i]
    setOpen(next)
    if (next.length === 2) {
      setMoves((m) => m + 1)
      if (deck[next[0]] === deck[next[1]]) {
        setTimeout(() => {
          setDone((d) => {
            const nd = [...d, ...next]
            if (nd.length === deck.length && wonRef.current) {
              const r = wonRef.current.getBoundingClientRect()
              confetti(r.left + r.width / 2, r.top + 40, 60)
            }
            return nd
          })
          setOpen([])
        }, 450)
      } else {
        setTimeout(() => setOpen([]), 800)
      }
    }
  }

  const reset = () => {
    setDeck(shuffle())
    setOpen([])
    setDone([])
    setMoves(0)
  }

  return (
    <section id="kids" className="section kids">
      <div className="container kids__inner">
        <div className="kids__intro">
          <p className="eyebrow">Kids Corner</p>
          <h2>Let’s play a game!</h2>
          <p>Flip the cards and find the matching animal friends. Can you match them all?</p>
          <p className="kids__score" aria-live="polite">
            Moves: <strong>{moves}</strong> · Matched: <strong>{done.length / 2}</strong>/{FACES.length}
          </p>
          <button className="btn btn--yellow" onClick={reset}>
            <RotateCcw size={18} /> New Game
          </button>
        </div>
        <div className="game" ref={wonRef}>
          <div className="game__grid">
            {deck.map((f, i) => {
              const shown = open.includes(i) || done.includes(i)
              return (
                <button
                  key={i}
                  className={`gcard ${shown ? 'is-flipped' : ''} ${done.includes(i) ? 'is-done' : ''}`}
                  onClick={() => flip(i)}
                  aria-label={shown ? f : 'Hidden card'}
                >
                  <span className="gcard__inner">
                    <span className="gcard__face gcard__face--back">?</span>
                    <span className="gcard__face gcard__face--front">{f}</span>
                  </span>
                </button>
              )
            })}
          </div>
          {won && (
            <p className="game__win">
              🎉 Hooray! You matched them all in {moves} moves!
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

/* ---------- FAQ for parents (answers from the school's own pages) ---------- */
const FAQS = [
  {
    q: 'Which age groups do you enroll?',
    a: 'We are enrolling infant, toddler, preschool and pre-k classes.',
  },
  {
    q: 'What do I need to enroll my child?',
    a: 'An Admission Form, a Health Statement signed and dated by a physician within the past year, a recent immunization record signed by a physician, and a copy of your child’s birth certificate. Infants also need a monthly-updated care sheet.',
  },
  {
    q: 'How do you keep children safe?',
    a: 'Modern facilities with controlled access, a state of the art security system, small class sizes, staff trained for emergencies, and an outdoor gated play center.',
  },
  {
    q: 'Who will be caring for my child?',
    a: 'Teachers carefully selected for their training in child development. All staff complete pre-service training, hold CPR and First Aid certification and pass an extensive background check.',
  },
  {
    q: 'What is Carol’s Curriculum?',
    a: 'A research-based curriculum built on Jean Piaget’s theories, weaving social-emotional, physical, language and cognitive skills into weekly activities and discovery projects.',
  },
  {
    q: 'When is the office open, and how do I get more forms?',
    a: `Our office is open ${site.hours}. Call ${site.phone} or email ${site.email} and we’ll send the forms you need.`,
  },
]

export function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="section section--white">
      <div className="container faq">
        <header className="section__head">
          <p className="eyebrow eyebrow--center">Parent Questions</p>
          <h2>Good to know before you visit</h2>
        </header>
        <div className="faq__list">
          {FAQS.map((f, i) => (
            <div key={f.q} className={`faq-item ${open === i ? 'is-open' : ''}`}>
              <button
                className="faq-item__q"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                {f.q}
                <ChevronDown size={20} />
              </button>
              <div className="faq-item__a" role="region">
                <div className="faq-item__inner">
                  <p>{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Back-to-top + mobile call button ---------- */
export function FloatingActions() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <>
      <button
        className={`totop ${show ? 'is-show' : ''}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp />
      </button>
      <a className="callbar" href={`tel:${site.phone.replace(/\./g, '')}`}>
        <Phone size={18} /> Call {site.phone}
      </a>
    </>
  )
}
