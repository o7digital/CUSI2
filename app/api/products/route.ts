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

const WP_BASE_URL = 'https://oliviers54.sg-host.com'

const stripHtml = (input: string) => input.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

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

export async function GET() {
  try {
    const response = await fetch(`${WP_BASE_URL}/wp-json/wc/store/v1/products?per_page=24&orderby=date&order=desc`, {
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      return NextResponse.json({ error: `WooCommerce API error: ${response.status}` }, { status: 502 })
    }

    const data = (await response.json()) as WooStoreProduct[]

    const products: ProductCard[] = data
      .map((item, index) => {
        const title = item.name?.trim() || `Arreglo floral ${index + 1}`
        const descSource = item.short_description || item.description || ''
        const desc = stripHtml(descSource) || 'Arreglo floral premium para ocasiones especiales.'
        const image = item.images?.[0]?.src || '/mothers-day-2026/image-1-1.webp'

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
    return NextResponse.json({ error: 'Failed to load products' }, { status: 500 })
  }
}
