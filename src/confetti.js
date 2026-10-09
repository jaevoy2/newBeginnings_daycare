const COLORS = ['#ff5c8a', '#ffc53d', '#4caf50', '#2fa4ff', '#0a7f86', '#ff8a3d']

export function confetti(x, y, count = 28) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span')
    const angle = Math.random() * Math.PI * 2
    const dist = 70 + Math.random() * 140
    el.className = 'confetti'
    el.style.cssText = `left:${x}px;top:${y}px;background:${COLORS[i % COLORS.length]};
      --dx:${Math.cos(angle) * dist}px;--dy:${Math.sin(angle) * dist - 60}px;
      --r:${Math.random() * 720 - 360}deg;border-radius:${Math.random() > 0.5 ? '50%' : '2px'}`
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 1400)
  }
}

export function burstFromEvent(e) {
  confetti(e.clientX, e.clientY)
}

