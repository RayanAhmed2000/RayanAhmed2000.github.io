// Starts the banna build effect once fonts are ready (so measurements are accurate),
// wires up small UI bits. No dependencies.
(function () {
  const html = document.documentElement
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  const skip = new URLSearchParams(location.search).has('nobanna')

  const show = () => html.classList.remove('pre')

  const run = () => {
    try {
      if (window.Banna && !reduced && !skip) Banna.start()
    } catch (e) {
      console.warn(e)
    }
    show()
  }

  const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()
  Promise.race([fontsReady, new Promise((r) => setTimeout(r, 1500))]).then(() => requestAnimationFrame(run))

  // Replay button
  const replay = document.getElementById('replay')
  if (replay) {
    if (window.Banna && !reduced) {
      replay.addEventListener('click', () => {
        scrollTo({ top: 0, behavior: 'instant' })
        Banna.start()
      })
    } else replay.hidden = true
  }

  // Copy email
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    const label = btn.textContent
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy)
        btn.textContent = 'COPIED ✓'
      } catch {
        btn.textContent = 'PRESS CTRL+C'
      }
      setTimeout(() => (btn.textContent = label), 1600)
    })
  })

  const year = document.getElementById('year')
  if (year) year.textContent = new Date().getFullYear()
})()
