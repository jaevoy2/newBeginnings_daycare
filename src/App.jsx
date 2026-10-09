import { useEffect, useState } from 'react'
import trackVisit from './trackVisit'
import {
  Baby,
  Blocks,
  Palette,
  GraduationCap,
  Heart,
  BookOpen,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  Menu,
  X,
  Star,
  ArrowRight,
  Check,
  Sparkles,
  Smile,
} from 'lucide-react'
import {
  site,
  nav,
  programs,
  reasons,
  practices,
  safety,
  enrollSteps,
} from './data'
import {
  Marquee,
  Wave,
  Doodles,
  Stats,
  Schedule,
  KidsCorner,
  FAQ,
  FloatingActions,
} from './extras'
import { burstFromEvent } from './confetti'
import useScrollAnimations from './useScrollAnimations'
import './App.css'
import './extras.css'

const icons = {
  baby: Baby,
  blocks: Blocks,
  palette: Palette,
  cap: GraduationCap,
  heart: Heart,
  book: BookOpen,
  shield: ShieldCheck,
}

function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <span className="topbar__item">
          <MapPin size={14} /> {site.address}, {site.city}
        </span>
        <span className="topbar__slogan">
          <Star size={13} fill="currentColor" /> {site.tagline}
        </span>
        <a className="topbar__item" href={`tel:${site.phone.replace(/\./g, '')}`}>
          <Phone size={14} /> {site.phone}
        </a>
      </div>
    </div>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#home" className="brand" onClick={() => setOpen(false)}>
          <img src="/images/logo.jpg" alt="" width="72" height="42" />
          <span>
            New Beginnings
            <small>Childcare Academy</small>
          </span>
        </a>
        <nav className={`nav ${open ? 'is-open' : ''}`} aria-label="Main">
          {nav.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              className={i === 0 ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </a>
          ))}
          <a href="#contact" className="btn btn--pink nav__cta" onClick={() => setOpen(false)}>
            Book a Tour
          </a>
        </nav>
        <button
          className="menu-btn"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__inner">
        <div className="hero__text">
          <p className="eyebrow">Learn · Play · Grow</p>
          <h1>
            A Fresh Approach to Daycare,
            <span> Building Bright Futures!</span>
          </h1>
          <p className="lead">
            Every child has unlimited potential. From the tiniest baby to the blossoming
            preschool student, they are nurtured in a loving, safe and Christ centered
            environment.
          </p>
          <div className="hero__actions">
            <a href="#contact" className="btn btn--purple" onClick={burstFromEvent}>
              Book a Free Visit <ArrowRight size={18} />
            </a>
            <a href="#about" className="btn btn--light">
              Learn More
            </a>
          </div>
          <ul className="hero__badges">
            <li>
              <span className="dot dot--pink">
                <Heart size={18} />
              </span>
              Safe &amp; Nurturing
              <small>A secure environment</small>
            </li>
            <li>
              <span className="dot dot--green">
                <GraduationCap size={18} />
              </span>
              Trained Teachers
              <small>CPR &amp; First Aid certified</small>
            </li>
            <li>
              <span className="dot dot--blue">
                <Sparkles size={18} />
              </span>
              Holistic Growth
              <small>Mind, body &amp; heart</small>
            </li>
          </ul>
        </div>
        <div className="hero__art">
          <div className="blob" />
          <img src="/images/hero.jpg" alt="Happy children raising their hands in a classroom" />
          <span className="sticker sticker--star">
            <Star fill="currentColor" />
          </span>
          <span className="sticker sticker--sun" />
        </div>
      </div>
    </section>
  )
}

function Programs() {
  return (
    <section id="programs" className="section section--white section--rel">
      <Doodles variant="a" />
      <div className="container">
        <header className="section__head">
          <p className="eyebrow eyebrow--center">Our Programs</p>
          <h2>Now enrolling infant, toddler, preschool &amp; pre-k classes</h2>
          <p className="muted">Age-appropriate programs designed to spark curiosity and build confidence.</p>
        </header>
        <div className="cards">
          {programs.map((p) => {
            const Icon = icons[p.icon]
            return (
              <article key={p.title} className={`card card--${p.color}`}>
                <span className="card__icon">
                  <Icon size={30} />
                </span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <a href="#enroll" className="card__link">
                  Explore Now <ArrowRight size={14} />
                </a>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section about section--rel">
      <Doodles variant="b" />
      <div className="container">
        <header className="section__head">
          <p className="eyebrow eyebrow--center">About Us</p>
          <h2>Nurturing Genius in Every Child</h2>
          <p className="muted">
            Our children may only be one-third of the population, but they are all of our future.
            We promote academic excellence in a warm and responsive atmosphere as we challenge each
            child to reach their full potential intellectually, socially and emotionally.
          </p>
        </header>
        <div className="collage">
          <img src="/images/play.jpg" alt="A teacher playing with toddlers on a rug" className="collage__tall" />
          <img src="/images/lion.jpg" alt="A boy sorting colorful balls in front of a lion mural" />
          <img src="/images/outdoor.jpg" alt="Children laughing and playing outdoors" />
          <div className="bubble">
            Where
            <strong>Curiosity Meets Confidence</strong>
          </div>
        </div>
      </div>
    </section>
  )
}

function Why() {
  return (
    <section className="section section--white">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow eyebrow--center">Why Families Choose Us</p>
          <h2>Everything your child needs to thrive</h2>
        </header>
        <div className="reasons">
          {reasons.map((r, i) => {
            const Icon = icons[r.icon]
            return (
              <article key={r.n} className={`reason reason--${i}`}>
                <span className="reason__n">{r.n}</span>
                <Icon size={34} />
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Curriculum() {
  return (
    <section id="curriculum" className="section split">
      <div className="container split__inner">
        <img src="/images/learn.jpg" alt="Children learning together at a table" className="split__img" />
        <div>
          <p className="eyebrow">Curriculum</p>
          <h2>Carol’s Curriculum</h2>
          <p>
            Weekly activities and discovery projects naturally support children’s social-emotional,
            physical, language and cognitive development. Our approach is built on the theories of
            Jean Piaget, who believed young children learn best through hands-on, active experience.
          </p>
          <p>
            The result: self-confidence, responsibility, self-worth and an enjoyment of life and
            learning — plus everything children need for success in kindergarten.
          </p>
          <ul className="ticks">
            {practices.map((p) => (
              <li key={p}>
                <Check size={18} /> {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Safety() {
  return (
    <section id="safety" className="section section--white">
      <div className="container split__inner split__inner--rev">
        <div>
          <p className="eyebrow">Safety</p>
          <h2>A secure place to explore and learn</h2>
          <p>
            A controlled, secure environment gives you peace of mind knowing your child is free to
            safely explore and learn.
          </p>
          <ul className="ticks">
            {safety.map((s) => (
              <li key={s}>
                <ShieldCheck size={18} /> {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="stack">
          <img src="/images/abc.jpg" alt="Reading alphabet books together" />
          <img src="/images/toddler.jpg" alt="A child concentrating on a hands-on activity" />
        </div>
      </div>
    </section>
  )
}

function Staff() {
  return (
    <section className="cta cta--staff">
      <div className="container cta__inner">
        <Smile size={44} />
        <div>
          <h2>Our Team</h2>
          <p>
            Our teachers are carefully selected for their training in child development and group
            care. Pre-service training, CPR and First Aid certification and an extensive background
            check are required. Led by our director, <strong>{site.director}</strong>.
          </p>
        </div>
      </div>
    </section>
  )
}

function Enroll() {
  return (
    <section id="enroll" className="section">
      <div className="container enroll">
        <div>
          <p className="eyebrow">Enrollment</p>
          <h2>Start your child’s journey today!</h2>
          <p>
            We are now enrolling infant, toddler, preschool and pre-k classes. Each student needs:
          </p>
          <ol className="steps">
            {enrollSteps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <p className="muted">
            Infants also need a monthly-updated care sheet on file. Additional forms — Discipline
            and Guidance, Contact Information, Holiday Closing Schedule and ACH Recurring Payment
            Authorization — are available by email or phone. Lunch menu and activity calendars are
            updated monthly.
          </p>
        </div>
        <div className="enroll__card">
          <h3>Book a Free Visit</h3>
          <p>Call or email our director to schedule a tour.</p>
          <a className="btn btn--yellow" href={`tel:${site.phone.replace(/\./g, '')}`}>
            <Phone size={18} /> {site.phone}
          </a>
          <a className="btn btn--light" href={`mailto:${site.email}`}>
            <Mail size={18} /> Email Us
          </a>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    const f = new FormData(e.target)
    const body = `${f.get('message')}\n\n— ${f.get('name')}\nPhone: ${f.get('phone') || 'n/a'}`
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      'Inquiry from ' + f.get('name'),
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }
  return (
    <section id="contact" className="section section--white">
      <div className="container contact">
        <div>
          <p className="eyebrow">Contact Us</p>
          <h2>We’d love to meet you</h2>
          <ul className="info">
            <li>
              <MapPin /> <span>{site.address}<br />{site.city}</span>
            </li>
            <li>
              <Phone /> <span>{site.phone} · {site.phoneAlt}<br />Fax {site.fax}</span>
            </li>
            <li>
              <Mail /> <span>{site.email}</span>
            </li>
            <li>
              <Clock /> <span>Office open {site.hours}</span>
            </li>
          </ul>
          <iframe
            title="Map to New Beginnings Childcare Academy"
            className="map"
            loading="lazy"
            src="https://www.google.com/maps?q=5535+Buffalo+Gap+Rd,+Abilene,+TX+79606&output=embed"
          />
        </div>
        <form className="form" onSubmit={submit}>
          <h3>Send a message</h3>
          <label>
            Your name
            <input name="name" required autoComplete="name" />
          </label>
          <label>
            Phone (optional)
            <input name="phone" type="tel" autoComplete="tel" />
          </label>
          <label>
            Message
            <textarea name="message" rows="5" required />
          </label>
          <button className="btn btn--purple" type="submit">
            Send Message <ArrowRight size={18} />
          </button>
          {sent && <p className="muted">Opening your email app…</p>}
        </form>
      </div>
    </section>
  )
}

const year = new Date().getFullYear()

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="brand brand--footer">
          <img src="/images/logo.jpg" alt="" width="72" height="42" />
          <span>
            New Beginnings
            <small>Childcare Academy</small>
          </span>
        </div>
        <p>
          {site.address}, {site.city} · {site.phone}
        </p>
        <p>
          <a href={site.facebook} target="_blank" rel="noreferrer">
            Facebook
          </a>{' '}
          · Director: {site.director}
        </p>
        <p className="footer__small">
          © {year} {site.name}. Photos via Pexels.
        </p>
        <p className="footer__small">
          Privacy notice: when you visit, we record your IP address, approximate location, device,
          browser and visit time for site security and analytics.
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  useScrollAnimations()
  useEffect(() => {
    trackVisit()
  }, [])
  return (
    <>
      <div className="progress" aria-hidden="true" />
      <TopBar />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Programs />
        <Wave from="#fff" to="var(--cream)" />
        <About />
        <Wave from="var(--cream)" to="#fff" />
        <Why />
        <Stats />
        <Wave from="#fff" to="var(--purple-soft)" />
        <Curriculum />
        <Wave from="var(--purple-soft)" to="#fff" />
        <Safety />
        <Wave from="#fff" to="var(--cream)" />
        <Schedule />
        <Wave from="var(--cream)" to="var(--purple)" />
        <Staff />
        <Wave from="var(--purple)" to="var(--pink-soft)" />
        <KidsCorner />
        <Wave from="var(--pink-soft)" to="#fff" />
        <Enroll />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  )
}
