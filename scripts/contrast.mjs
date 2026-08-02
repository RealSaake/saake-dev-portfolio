import { readFileSync } from 'node:fs'

const css = readFileSync('app/globals.css', 'utf8')

const hex = (h) => {
  const n = h.replace('#', '')
  const f = n.length === 3 ? n.split('').map((c) => c + c).join('') : n
  return [0, 2, 4].map((i) => parseInt(f.slice(i, i + 2), 16))
}
const lum = (h) => {
  const [r, g, b] = hex(h).map((v) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m)
  return (x + 0.05) / (y + 0.05)
}
// Dark is the default and lives in `:root`; light is the override block.
const BLOCK = {
  dark: (css.match(/:root\s*\{([\s\S]*?)\n\s*\}/) || [, ''])[1],
  light: (css.match(/\[data-theme='light'\]\s*\{([\s\S]*?)\n\s*\}/) || [, ''])[1],
}

const tok = (name, mode) =>
  (BLOCK[mode].match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{3,6})`)) || [])[1]

let worst = { r: Infinity }
for (const mode of ['dark', 'light']) {
  const paper = tok('paper', mode)
  const surface = tok('surface', mode)
  console.log(`\n== ${mode} ==  paper ${paper}  surface ${surface}`)
  for (const fg of ['ink', 'ink-2', 'muted', 'muted-2']) {
    const c = tok(fg, mode)
    const onPaper = ratio(c, paper)
    const onSurface = ratio(c, surface)
    for (const [bg, r] of [['paper', onPaper], ['surface', onSurface]]) {
      if (r < worst.r) worst = { r, mode, fg, bg }
    }
    const flag = Math.min(onPaper, onSurface) < 4.5 ? '  ← BELOW FLOOR' : ''
    console.log(
      `   --${fg.padEnd(8)} ${c}  paper ${onPaper.toFixed(2)}  surface ${onSurface.toFixed(2)}${flag}`
    )
  }
  // The lime ramp is declared once, in :root. accent-text points at a
  // different step per theme so the brand fill can stay constant.
  const step = mode === 'dark' ? 'l-4' : 'l-7'
  const c = tok(step, 'dark')
  console.log(
    `   accent-text (${step}) ${c}  paper ${ratio(c, paper).toFixed(2)}  surface ${ratio(c, surface).toFixed(2)}`
  )
}
console.log(
  `\ntightest: --${worst.fg} on --${worst.bg} (${worst.mode}) = ${worst.r.toFixed(2)}:1\n`
)
