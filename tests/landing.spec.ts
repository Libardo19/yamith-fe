import { test, expect } from '@playwright/test'

for (const width of [360, 390, 430, 768, 1024, 1280, 1440]) {
  test(`landing responsive ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 900 })
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(e.message))
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })
    const response = await page.goto('/')
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Dr. Yamith')
    await expect(page.locator('.hero-portrait img')).toBeVisible()
    await page.locator('.hero-portrait img').evaluate((img: HTMLImageElement) => img.decode())
    await page.locator('.hero-copy').evaluate(async (el) => {
      await Promise.all(el.getAnimations({ subtree: true }).map((animation) => animation.finished))
    })
    if (width === 390 || width === 1440) await page.screenshot({ path: `qa/hero-${width}.png` })
    for (const section of await page.locator('.yamith-editorial > section').all()) {
      await section.scrollIntoViewIfNeeded()
      await page.waitForTimeout(250)
      for (const reveal of await section.locator('[data-reveal]').all())
        await expect(reveal).toHaveClass(/is-visible/)
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)
      ).toBe(true)
    }
    if (width === 390 || width === 1440) {
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.waitForTimeout(1000)
      await page.screenshot({ path: `qa/landing-${width}.png`, fullPage: true })
    }
    expect(errors).toEqual([])
    expect(
      await page
        .locator('img')
        .evaluateAll((imgs: HTMLImageElement[]) =>
          imgs.filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.src)
        )
    ).toEqual([])
  })
}

test('mobile navigation, procedure selector, FAQ and valuation CTA', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Abrir menú' }).click()
  await expect(page.getByRole('navigation', { name: 'Móvil' })).toBeVisible()
  await page
    .getByRole('navigation', { name: 'Móvil' })
    .getByRole('link', { name: 'Tecnología' })
    .click()
  await expect(page.getByRole('navigation', { name: 'Móvil' })).toBeHidden()
  await page.locator('.reference-carousel').scrollIntoViewIfNeeded()
  await page.getByRole('button', { name: 'Siguiente procedimiento' }).click()
  await expect
    .poll(() => page.locator('.reference-carousel').evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(0)
  await expect(page.locator('.reference-procedure').first()).toHaveAttribute(
    'href',
    /\/procedimientos\//
  )
  await page.locator('.faq-editorial summary').first().click()
  await expect(page.locator('.faq-editorial details').first()).toHaveAttribute('open', '')
  await page.locator('.final-copy a').click()
  await expect(page).toHaveURL(/\/contacto#agendar$/)
  await expect(page.locator('#agendar form')).toBeVisible()
})

test('contact form retains its payload and success flow', async ({ page }) => {
  let body: Record<string, unknown> = {}
  await page.route('**/api/public/leads', async (route) => {
    body = route.request().postDataJSON()
    await route.fulfill({ json: { success: true, data: { id: 'local-qa' }, message: 'ok' } })
  })
  await page.goto('/contacto')
  const form = page.locator('#agendar form')
  await form.locator('[name="name"]').fill('Prueba local')
  await form.locator('[name="phone"]').fill('3001234567')
  await form.locator('[name="email"]').fill('qa@example.com')
  await form.locator('[name="acceptDataPolicy"]').check()
  await form.getByRole('button', { name: 'Solicitar valoración' }).click()
  await expect(
    page.getByRole('heading', { name: '¡Gracias! Recibimos tu solicitud' })
  ).toBeVisible()
  expect(body).toMatchObject({
    name: 'Prueba local',
    phone: '3001234567',
    email: 'qa@example.com',
    acceptDataPolicy: true,
    website: ''
  })
})

test('session outage offers recovery instead of an endless spinner', async ({ page }) => {
  await page
    .context()
    .addCookies([{ name: 'yc_session', value: 'local-test', domain: 'localhost', path: '/' }])
  await page.route('**/api/auth/me', (route) =>
    route.fulfill({ status: 503, json: { success: false, message: 'Local test outage' } })
  )
  await page.goto('/portal')
  await expect(page.getByRole('button', { name: 'Volver a intentar' })).toBeVisible()
  await expect(page.locator('p[role="alert"]')).toContainText('No pudimos comprobar tu sesión')
})

test('reduced motion keeps the complete story readable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('.yamith-editorial')).not.toHaveClass(/motion-ready/)
  expect(
    await page
      .locator('[data-reveal]')
      .first()
      .evaluate((el) => getComputedStyle(el).clipPath)
  ).toBe('none')
  await page.locator('.final-copy a').click()
  await expect(page.locator('#agendar form')).toBeVisible()
})

test('landing follows the reference section sequence', async ({ page }) => {
  await page.goto('/')
  const sections = await page
    .locator('.yamith-editorial > section')
    .evaluateAll((elements) => elements.map((el) => el.className.split(' ')[0]))
  // The featured before/after only exists when a consented result is published.
  if (sections.includes('reference-featured'))
    expect(sections[sections.indexOf('reference-featured') + 1]).toBe('reference-outcomes')
  expect(sections.filter((section) => section !== 'reference-featured')).toEqual([
    'reference-hero',
    'reference-intro',
    'reference-methods',
    'reference-doctor',
    'reference-outcomes',
    'reference-authority',
    'reference-faq',
    'reference-technology'
  ])
})

test('landing remains readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 }
  })
  const page = await context.newPage()
  await page.goto('/')
  await expect(page.locator('#doctor h2')).toBeVisible()
  expect(
    await page
      .locator('[data-reveal]')
      .first()
      .evaluate((el) => getComputedStyle(el).clipPath)
  ).toBe('none')
  await page.goto('/contacto')
  await expect(page.locator('#agendar form')).toBeVisible()
  await context.close()
})

test('reloading returns to the top so the animations replay', async ({ page }) => {
  await page.goto('/#tecnologia')
  await page.evaluate(() =>
    window.scrollTo({ top: document.body.scrollHeight * 0.6, behavior: 'instant' })
  )
  await page.reload()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
  expect(new URL(page.url()).hash).toBe('')
  await expect(page.locator('.reference-faq [data-reveal].is-visible')).toHaveCount(0)
})
