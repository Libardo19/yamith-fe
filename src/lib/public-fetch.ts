/** null means authoritative 404; undefined means the public API is unavailable. */
export async function fetchPublicResource<T>(
  url: string,
  fetcher: typeof fetch = fetch
): Promise<T | null | undefined> {
  try {
    const response = await fetcher(url, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000)
    })
    if (response.status === 404) return null
    if (!response.ok) return undefined
    const json = (await response.json()) as { success: boolean; data: T }
    return json.success ? json.data : undefined
  } catch {
    return undefined
  }
}
