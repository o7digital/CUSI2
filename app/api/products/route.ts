import { NextResponse } from 'next/server'
import { formatWooPrice, getPurchaseUrl, type ProductCard, type WooStoreProduct } from '@/lib/woocommerce'

export const revalidate = 300

const WP_BASE_URL = (process.env.WORDPRESS_BASE_URL || 'https://wp-cusi.o7digitalgroup.com').replace(/\/$/, '')
const PRODUCTS_URL = `${WP_BASE_URL}/wp-json/wc/store/v1/products?per_page=24&orderby=date&order=desc`

const stripHtml = (input: string) => input.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
const normalizeWpUrl = (url: string) =>
  url.startsWith(`${WP_BASE_URL.replace('https://', 'http://')}/`) ? url.replace('http://', 'https://') : url

const extractImageFromHtml = (html: string) => {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i)
  return match?.[1] ? normalizeWpUrl(match[1]) : null
}

const normalizeTitle = (title: string) => {
  if (title === 'Rosas e n Ramo Rosas o Rojas 2 docenas') {
    return 'Rosas Premium en Ramo'
  }
  if (title === 'Orquídea Phalenopsis' || title === 'Orqu\u00eddea Phalenopsis') {
    return 'Indonesia Orquídea Phalenopsis'
  }
  if (title === 'Orquídea Phalenopsis En Escultura de Piedra' || title === 'Orqu\u00eddea Phalenopsis En Escultura de Piedra') {
    return 'Una Orquídea Phalenopsis En Cilindo de Vidrio'
  }
  return title
}

const fetchProductsWithRetry = async (retries = 2) => {
  let lastStatus = 0
  let lastError = ''

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(PRODUCTS_URL, {
        next: { revalidate },
        headers: {
          accept: 'application/json',
          'user-agent': 'cusi-site/1.0 (+https://cusi-2.vercel.app)',
        },
      })

      lastStatus = response.status
      if (!response.ok) {
        throw new Error(`status_${response.status}`)
      }

      const data = (await response.json()) as unknown
      if (!Array.isArray(data)) {
        throw new Error('invalid_payload')
      }

      return data as WooStoreProduct[]
    } catch (error) {
      lastError = error instanceof Error ? error.message : 'unknown_error'
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, 300 * (attempt + 1)))
      }
    }
  }

  throw new Error(`fetch_failed status=${lastStatus} reason=${lastError}`)
}

export async function GET() {
  try {
    const data = await fetchProductsWithRetry()

    const products: ProductCard[] = data
      .map((item, index) => {
        const title = normalizeTitle(item.name?.trim() || `Arreglo floral ${index + 1}`)
        const descSource = item.short_description || item.description || ''
        const desc = stripHtml(descSource) || 'Arreglo floral premium para ocasiones especiales.'
        const apiImage = item.images?.[0]?.src ? normalizeWpUrl(item.images[0].src) : null
        const htmlImage = extractImageFromHtml(item.description || '')
        const image = apiImage || htmlImage || '/mothers-day-2026/image-1-1.webp'
        const price = formatWooPrice(item.prices)

        return {
          title,
          desc,
          ...price,
          image,
          buyUrl: getPurchaseUrl(item, WP_BASE_URL),
          taxIncluded: !!price.priceAmount && process.env.WOOCOMMERCE_PRICES_INCLUDE_IVA === 'true',
        }
      })
      .filter((item) => item.title.length > 0)

    return NextResponse.json(
      { products },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=1800',
        },
      }
    )
  } catch (error) {
    console.error('Failed to fetch WooCommerce products', error)
    return NextResponse.json({ error: 'Failed to load products' }, { status: 502 })
  }
}
