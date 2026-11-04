// Functional checks of the running site. Start it first (`npm run build && npm run preview`),
// then `npm run verify`. Uses the locally installed Chrome (channel: chrome). BASE_URL overrides the target.
import { chromium } from 'playwright'

const BASE = process.env.BASE_URL ?? 'http://localhost:3100'
const b = await chromium.launch({ channel: 'chrome', args: ['--autoplay-policy=user-gesture-required'] })
let failures = 0
const ok = (name, cond) => {
  if (!cond) failures += 1
  console.log(cond ? 'PASS' : 'FAIL', name)
}

/* Record every AudioContext the page creates, to check when sound starts. */
const trackAudio = () => {
  window.__contexts = []
  const Original = window.AudioContext
  window.AudioContext = class extends Original {
    constructor(...args) {
      super(...args)
      window.__contexts.push(this)
    }
  }
}

const ctx = await b.newContext({
  viewport: { width: 1440, height: 900 },
  permissions: ['clipboard-read', 'clipboard-write'],
})
await ctx.addInitScript(trackAudio)
const p = await ctx.newPage()
const errors = []
p.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
p.on('pageerror', (e) => errors.push(e.message))

const dialogOpen = () => p.locator('[role=dialog]').count()
const openAndClose = async (label, check) => {
  await p.getByRole('button', { name: label, exact: true }).click()
  await p.waitForTimeout(1300)
  ok(`${label} opens`, (await dialogOpen()) === 1)
  if (check !== undefined) await check()
  await p.keyboard.press('Escape')
  await p.waitForTimeout(1100)
  ok(`${label} closes and gives focus back`, (await dialogOpen()) === 0 && (await p.evaluate(() => document.activeElement?.getAttribute('aria-label'))) === label)
}

await p.goto(`${BASE}/`, { waitUntil: 'load' })
await p.waitForTimeout(1200)
ok('no audio before any gesture', (await p.evaluate(() => window.__contexts.length)) === 0)
ok('h1 names the person', (await p.locator('h1').innerText()).trim() === 'Vibol Arnaud Sok')
ok('the desk starts dark, with a way in', await p.getByRole('button', { name: /switch on the lamp/ }).isVisible())

ok('in the dark, the night covers every object', await p.evaluate(() => {
  const dark = document.querySelector('.desk-dark')
  const z = Number(getComputedStyle(dark).zIndex)
  return [...document.querySelectorAll('.desk-item')].every((e) => Number(getComputedStyle(e).zIndex) < z)
}))
ok('the arrival says nothing about the radio', !(await p.getByText('composed live in your browser').isVisible()))
await p.getByRole('button', { name: /switch on the lamp/ }).click()
await p.waitForTimeout(1500)
ok('the lamp lights the desk', await p.evaluate(() => document.querySelector('.stage')?.hasAttribute('data-lit')))
ok('the quiet way in makes no sound', (await p.evaluate(() => window.__contexts.length)) === 0)

// The radio is the music switch.
await p.getByRole('button', { name: /Switch the radio on/ }).click()
await p.waitForTimeout(1200)
ok('the radio starts the trio', await p.evaluate(() => window.__contexts[0]?.state === 'running'))
ok('the radio reports it is on', (await p.getByRole('button', { name: 'Switch the radio off' }).getAttribute('aria-pressed')) === 'true')

// Every object on the desk opens and closes. Checks look inside the open dialog only —
// the plain version below the desk carries the same words.
const d = () => p.locator('[role=dialog]')
await openAndClose('About — the notebook', async () => {
  await d().getByRole('button', { name: /turn the page/ }).click()
  await p.waitForTimeout(700)
  ok('the notebook turns its page', await d().getByText('where i’m heading').first().isVisible())
})
await openAndClose('Experience — the work badge', async () => {
  await d().getByRole('button', { name: /flip the badge/ }).click()
  await p.waitForTimeout(1000)
  ok('the badge flips to its missions', await d().getByText('what i do there').isVisible())
})
await openAndClose('Education — the student cards')
await openAndClose('Project — Personal Finance Tracker', async () => {
  await p.waitForTimeout(1800)
  ok('the receipt prints its links', await d().getByRole('link', { name: /frontend/i }).isVisible())
})
await openAndClose('Project — MiniSGBDR', async () => {
  await d().getByRole('button', { name: /next card/ }).click()
  await p.waitForTimeout(600)
  ok('the index cards shuffle', await d().getByText('catalogue entry').isVisible())
})
await openAndClose('Hackathon — KinCall', async () => {
  ok('the message names its outcome', await d().getByText(/community directory/).isVisible())
})
await openAndClose('Hackathon — DraftLens')
await openAndClose('Skills — the keyboard', async () => {
  await d().getByRole('button', { name: 'Python' }).click()
  await p.waitForTimeout(300)
  ok('a key types onto the screen', (await d().locator('[aria-live=polite]').first().innerText()).includes('python'))
})
await openAndClose('Interests — the polaroids', async () => {
  await d().getByRole('button', { name: /beatbox/i }).click()
  await p.waitForTimeout(700)
  ok('a polaroid turns over', await d().getByText(/French beatbox scene/).isVisible())
})
await openAndClose('Contact — the postcard', async () => {
  await d().getByRole('button', { name: 'Copy email address' }).click()
  await p.waitForTimeout(300)
  ok('the postcard copies the email', (await p.evaluate(() => navigator.clipboard.readText())) === 'vibolsok.pro@gmail.com')
})

// A note left on the desk stays there.
await p.getByRole('button', { name: 'Leave a note on the desk' }).click()
await p.waitForTimeout(1200)
await p.fill('#note-text', 'lovely desk')
await p.getByRole('button', { name: /stick it on the desk/ }).click()
await p.waitForTimeout(1500)
await p.reload({ waitUntil: 'load' })
await p.waitForTimeout(1200)
ok('a visitor note survives a reload', await p.getByText('lovely desk').isVisible())

// The toys.
await p.getByRole('button', { name: 'Knock the coffee over' }).click()
await p.waitForTimeout(1200)
ok('the coffee spills', await p.evaluate(() => document.querySelector('[data-spilled] .mug-puddle') !== null && getComputedStyle(document.querySelector('.mug-puddle')).opacity === '1'))
await p.getByRole('button', { name: 'Stand the mug back up' }).click()
const ballBefore = await p.getByRole('button', { name: 'Flick the paper ball' }).boundingBox()
await p.getByRole('button', { name: 'Flick the paper ball' }).click()
await p.waitForTimeout(2200)
const ballAfter = await p.getByRole('button', { name: 'Flick the paper ball' }).boundingBox()
ok('the paper ball rolls', Math.hypot(ballAfter.x - ballBefore.x, ballAfter.y - ballBefore.y) > 30)
ok('the paper ball stays on the desk', await p.evaluate(() => {
  const s = document.querySelector('.stage').getBoundingClientRect()
  const b = document.querySelector('[aria-label="Flick the paper ball"]').getBoundingClientRect()
  return b.left >= s.left && b.right <= s.right && b.top >= s.top && b.bottom <= s.bottom
}))

// The laptop's stickers are the links.
ok('github sticker links out', (await p.getByRole('link', { name: /GitHub/ }).first().getAttribute('href'))?.includes('github.com'))
ok('email sticker writes', (await p.getByRole('link', { name: /email Arnaud/ }).getAttribute('href'))?.startsWith('mailto:'))

// The desk index reaches everything.
await p.getByRole('button', { name: /what’s on the desk/ }).click()
await p.waitForTimeout(400)
ok('the index lists every object that opens', (await p.locator('nav[aria-label="On the desk"] li').count()) === 11)
await p.keyboard.press('Escape')

// Layout
for (const w of [390, 820, 1440]) {
  await p.setViewportSize({ width: w, height: 900 })
  await p.waitForTimeout(300)
  ok(`no horizontal overflow @${w}`, await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
}

// Only the desk: no text version, nothing to scroll past it on a desktop.
await p.setViewportSize({ width: 1440, height: 900 })
await p.waitForTimeout(300)
ok('no plain-text version on the page', (await p.locator('#plain').count()) === 0)
ok('the page is exactly the desk on desktop', (await p.evaluate(() => document.documentElement.scrollHeight)) <= 902)
ok('screen readers get a guide to the desk', (await p.locator('.sr-only').first().innerText()).includes('Each object'))
ok('set dressing is hidden and inert', await p.evaluate(() => [...document.querySelectorAll('.desk-decor:not(.desk-toy)')].every((e) => e.getAttribute('aria-hidden') === 'true' && getComputedStyle(e).pointerEvents === 'none' && !e.querySelector('button, a'))))
ok('no moth any more', (await p.locator('.moth, .moth-orbit').count()) === 0)

// Without JavaScript: the desk is lit and the contacts are given.
const nojs = await (await b.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } })).newPage()
await nojs.goto(`${BASE}/`)
ok('no JS: no dark gate', !(await nojs.locator('.arrival').isVisible()))
ok('no JS: the contacts are still reachable', await nojs.getByRole('link', { name: 'vibolsok.pro@gmail.com' }).isVisible())

// Reduced motion: no steam, no flights.
const calm = await (await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })).newPage()
await calm.goto(`${BASE}/`, { waitUntil: 'load' })
await calm.getByRole('button', { name: /switch on the lamp/ }).click()
await calm.waitForTimeout(800)
ok('reduced motion: the steam does not rise', await calm.evaluate(() => [...document.querySelectorAll('.steam')].every((e) => getComputedStyle(e).animationName === 'none')))

ok('no console errors', errors.length === 0)
if (errors.length > 0) console.log(errors)
await b.close()
process.exit(failures === 0 ? 0 : 1)
