import { expect, test } from '@playwright/test'
import { parseProcedureContent } from '../src/lib/procedure-content'

test('legacy CMS paragraphs remain readable without new headings', () => {
  const sections = parseProcedureContent('Descripción inicial.\n\nSegundo párrafo.')
  expect(sections).toHaveLength(1)
  expect(sections[0]?.paragraphs).toEqual(['Descripción inicial.', 'Segundo párrafo.'])
})

test('CMS headings accept Windows newlines and repeated titles without duplicate anchors', () => {
  const sections = parseProcedureContent(
    'Resumen.\r\n\r\n## Cuidados\r\n\r\nPrimer control.\r\n\r\n## Cuidados\r\n\r\nSegundo control.'
  )
  expect(sections.map((section) => section.title)).toEqual([
    'En qué consiste',
    'Cuidados',
    'Cuidados'
  ])
  expect(new Set(sections.map((section) => section.id)).size).toBe(3)
  expect(sections.flatMap((section) => section.paragraphs)).toEqual([
    'Resumen.',
    'Primer control.',
    'Segundo control.'
  ])
})

test('procedure index, medical references and MicroAire remain usable on mobile', async ({
  page
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/procedimientos/lipoescultura-vaser')
  await page
    .getByRole('navigation', { name: 'Contenido del procedimiento' })
    .getByRole('link', { name: 'Riesgos y consideraciones' })
    .click()
  await expect(
    page.getByRole('heading', { name: 'Riesgos y consideraciones', exact: true })
  ).toBeInViewport()
  await page.locator('.procedure-sources summary').click()
  await expect(page.locator('.procedure-sources')).toHaveAttribute('open', '')
  await expect(page.locator('.procedure-sources a').first()).toHaveAttribute(
    'href',
    /^https:\/\/www\.plasticsurgery\.org\//
  )
  const microaire = page
    .locator('.technology-strip details')
    .filter({ has: page.locator('summary', { hasText: 'MicroAire' }) })
  await microaire.locator('summary').click()
  await expect(microaire).toHaveAttribute('open', '')
  await expect(microaire.getByRole('heading')).toContainText('PAL')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
    true
  )
  await page.getByRole('link', { name: 'Agendar valoración' }).first().click()
  await expect(page.locator('#agendar form')).toBeVisible()
})
