import sanitizeHtml from 'sanitize-html'

export type SiteCopy = { id: string; locale: string; section: string; heading: string; body: string; eyebrow: string; cta: string; delivery: string; slogan: string }
export type HeroSlide = { id: string; image: string; kind: 'christmas' | 'flowers'; product_slug?: string; alt: string }
export type SiteContent = { copy: SiteCopy[]; slides: HeroSlide[] }

export const cleanRichText = (html: string) => sanitizeHtml(html, {
  allowedTags: ['p', 'br', 'strong', 'em', 'u', 'ul', 'ol', 'li', 'a'],
  allowedAttributes: { a: ['href', 'title'] },
  allowedSchemes: ['https', 'mailto', 'tel'],
})

export async function getSiteContent(): Promise<SiteContent> {
  const base = process.env.DIRECTUS_URL
  const token = process.env.DIRECTUS_READ_TOKEN
  if (!base || !token) return { copy: [], slides: [] }
  try {
    const read = async (collection: string, query: string) => {
      const response = await fetch(`${base}/items/${collection}?${query}`, {
        headers: { Authorization: `Bearer ${token}` }, next: { revalidate: 60 }, signal: AbortSignal.timeout(10000),
      })
      if (!response.ok) throw new Error(`CMS ${collection}: ${response.status}`)
      return (await response.json()).data
    }
    const [copy, slides] = await Promise.all([
      read('site_copy', 'limit=100&filter[status][_eq]=published'),
      read('hero_slides', 'limit=30&filter[status][_eq]=published&sort=sort'),
    ])
    return {
      copy: copy.map((item: SiteCopy) => ({ ...item, body: cleanRichText(item.body || '') })),
      slides: slides.map((item: HeroSlide & { image_file?: string; image_url?: string }) => ({
        id: item.id, image: item.image_file ? `/api/media/${item.image_file}` : item.image_url,
        kind: item.kind, product_slug: item.product_slug, alt: item.alt,
      })),
    }
  } catch (error) {
    console.error('Cusi Studio content unavailable', error)
    return { copy: [], slides: [] }
  }
}
