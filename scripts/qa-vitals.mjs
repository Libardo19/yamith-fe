import fs from 'node:fs'
import { chromium } from '@playwright/test'

// Local production build measurements; these are not field data or a Lighthouse score.
;(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true })
  const reports = []
  try {
    for (const width of [390, 1440]) {
      const context = await browser.newContext({
        viewport: { width, height: width === 390 ? 844 : 900 }
      })
      const page = await context.newPage()
      await page.addInitScript(() => {
        window.__landingVitals = { lcp: 0, cls: 0 }
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) window.__landingVitals.lcp = entry.startTime
        }).observe({ type: 'largest-contentful-paint', buffered: true })
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries())
            if (!entry.hadRecentInput) window.__landingVitals.cls += entry.value
        }).observe({ type: 'layout-shift', buffered: true })
      })
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
      await page.evaluate(() => document.fonts.ready)
      await page.waitForTimeout(1500)
      reports.push({ width, ...(await page.evaluate(() => window.__landingVitals)) })
      await context.close()
    }
  } finally {
    await browser.close()
  }
  fs.mkdirSync('qa', { recursive: true })
  fs.writeFileSync('qa/vitals.json', JSON.stringify(reports, null, 2))
  console.log(JSON.stringify(reports))
})().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
