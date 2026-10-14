import { test, expect } from '@playwright/test'
import { fetchPublicResource } from '../src/lib/public-fetch'
const response = (value: Response) => (async () => value) as typeof fetch
test('an unpublished procedure 404 remains authoritative', async () => {
  expect(
    await fetchPublicResource('/procedure', response(new Response(null, { status: 404 })))
  ).toBeNull()
})
test('network or server outage permits fallback content', async () => {
  expect(
    await fetchPublicResource('/procedure', response(new Response(null, { status: 503 })))
  ).toBeUndefined()
  expect(
    await fetchPublicResource('/procedure', (async () => {
      throw new Error('offline')
    }) as typeof fetch)
  ).toBeUndefined()
})
test('an intentional empty catalog stays empty', async () => {
  expect(
    await fetchPublicResource('/procedures', response(Response.json({ success: true, data: [] })))
  ).toEqual([])
})
