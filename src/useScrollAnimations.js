import { useLayoutEffect } from 'react'

// selector -> [animation, stagger step in ms]
const REVEALS = [
  ['.section__head', 'up', 0],
  ['.card', 'pop', 130],
  ['.collage img', 'pop', 150],
  ['.bubble', 'bounce', 0],
  ['.reason', 'up', 140],
  ['.split__img', 'left', 0],
  ['.split__inner > div:not(.stack)', 'right', 0],
  ['.stack img', 'up', 160],
  ['.ticks li', 'left', 90],
  ['.cta__inner', 'up', 0],
  ['.enroll > div:first-child', 'left', 0],
  ['.steps li', 'left', 90],
  ['.enroll__card', 'pop', 0],
  ['.contact > div', 'left', 0],
  ['.info li', 'left', 90],
  ['.map', 'up', 0],
  ['.form', 'right', 0],
  ['.footer__inner > *', 'up', 90],
  ['.stat', 'pop', 130],
  ['.tl', 'pop', 110],
  ['.kids__intro', 'left', 0],
  ['.game', 'pop', 0],
  ['.faq-item', 'up', 100],
]

export default function useScrollAnimations() {
  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = document.documentElement
    if (reduce) return

    // 1. Mark elements and stagger siblings sharing the same parent + selector
    const targets = []
    for (const [selector, type, step] of REVEALS) {
      const byParent = new Map()
      document.querySelectorAll(selector).forEach((el) => {
        const n = byParent.get(el.parentElement) ?? 0
        byParent.set(el.parentElement, n + 1)
        el.dataset.anim = type
        el.style.setProperty('--d', `${n * step}ms`)
        targets.push(el)
      })
    }
    root.classList.add('anim-ready')

    // 2. Reveal when scrolled into view
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.dataset.in = ''
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    targets.forEach((el) => io.observe(el))

    // 3. Scroll progress, parallax offset and header state (rAF throttled)
    const header = document.querySelector('.header')
    const heroArt = document.querySelector('.hero__art')
    const bar = document.querySelector('.progress')
    let ticking = false
    const update = () => {
      const y = window.scrollY
      const max = root.scrollHeight - window.innerHeight
      // scope variables to the elements that use them, not the whole document
      heroArt?.style.setProperty('--sy', Math.min(y, 1400).toFixed(1))
      bar?.style.setProperty('--progress', max > 0 ? (y / max).toFixed(4) : '0')
      header?.classList.toggle('is-scrolled', y > 24)
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      root.classList.remove('anim-ready')
    }
  }, [])
}
