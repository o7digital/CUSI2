import { NextResponse } from 'next/server'

type WooStoreProduct = {
  name?: string
  description?: string
  short_description?: string
  images?: Array<{ src?: string }>
  prices?: {
    price?: string
    currency_code?: string
    currency_minor_unit?: number
  }
}

type ProductCard = {
  title: string
  desc: string
  price: string
  image: string
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

const WP_BASE_URL = 'https://oliviers54.sg-host.com'
const PRODUCTS_URL = `${WP_BASE_URL}/wp-json/wc/store/v1/products?per_page=24&orderby=date&order=desc`

const stripHtml = (input: string) => input.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
const normalizeWpUrl = (url: string) =>
  url.startsWith('http://oliviers54.sg-host.com/') ? url.replace('http://', 'https://') : url

const extractImageFromHtml = (html: string) => {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i)
  return match?.[1] ? normalizeWpUrl(match[1]) : null
}

const formatPrice = (prices: WooStoreProduct['prices']) => {
  if (!prices?.price) return 'Cotizar por WhatsApp'

  const minorUnit = typeof prices.currency_minor_unit === 'number' ? prices.currency_minor_unit : 2
  const currency = prices.currency_code || 'MXN'
  const amount = Number(prices.price) / Math.pow(10, minorUnit)

  if (Number.isNaN(amount)) {
    return 'Cotizar por WhatsApp'
  }

  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency,
    maximumFractionDigits: minorUnit,
    minimumFractionDigits: minorUnit,
  }).format(amount)
}

const normalizeTitle = (title: string) => {
  if (title === 'Rosas e n Ramo Rosas o Rojas 2 docenas') {
    return 'Rosas Premium en Ramo'
  }
  return title
}

const fetchProductsWithRetry = async (retries = 2) => {
  let lastStatus = 0
  let lastError = ''

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(PRODUCTS_URL, {
        cache: 'no-store',
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

        return {
          title,
          desc,
          price: formatPrice(item.prices),
          image,
        }
      })
      .filter((item) => item.title.length > 0)

    return NextResponse.json({ products })
  } catch (error) {
    console.error('Failed to fetch WooCommerce products', error)
    return NextResponse.json({ error: 'Failed to load products' }, { status: 502 })
  }
}
