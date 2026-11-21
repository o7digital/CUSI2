export type WooStoreProduct = {
  id?: number
  type?: string
  permalink?: string
  name?: string
  description?: string
  short_description?: string
  is_purchasable?: boolean
  is_in_stock?: boolean
  has_options?: boolean
  images?: Array<{ id?: number; src?: string }>
  prices?: {
    price?: string
    currency_code?: string
    currency_minor_unit?: number
  }
}

export type ProductCard = {
  title: string
  desc: string
  price: string
  image: string
  buyUrl?: string
  priceAmount?: string
  currency: string
  taxIncluded: boolean
}

// Use WooCommerce's tax-inclusive Store API price. Never add IVA a second time here.
export function formatWooPrice(prices: WooStoreProduct['prices']) {
  const currency = prices?.currency_code || 'MXN'
  const minorUnit = prices?.currency_minor_unit ?? 2
  const raw = prices?.price
  if (!raw || !/^\d+$/.test(raw) || !Number.isInteger(minorUnit) || minorUnit < 0 || minorUnit > 4) {
    return { price: 'Cotizar por WhatsApp', currency }
  }

  const amount = Number(raw) / 10 ** minorUnit
  if (!Number.isSafeInteger(Number(raw))) return { price: 'Cotizar por WhatsApp', currency }

  return {
    price: new Intl.NumberFormat('es-MX', {
      style: 'currency', currency,
      minimumFractionDigits: minorUnit, maximumFractionDigits: minorUnit,
    }).format(amount),
    priceAmount: amount.toFixed(minorUnit),
    currency,
  }
}

export function getPurchaseUrl(product: WooStoreProduct, baseUrl: string): string | undefined {
  if (!product.is_purchasable || !product.is_in_stock || !product.prices?.price) return undefined
  if (!/^\d+$/.test(product.prices.price) || Number(product.prices.price) <= 0) return undefined

  if (product.type === 'simple' && !product.has_options && Number.isSafeInteger(product.id) && product.id! > 0) {
    const url = new URL(`${baseUrl.replace(/\/$/, '')}/checkout/`)
    url.searchParams.set('add-to-cart', String(product.id))
    url.searchParams.set('quantity', '1')
    return url.toString()
  }

  // Products with options must let the customer choose a variation before checkout.
  if (product.permalink) {
    try {
      const url = new URL(product.permalink)
      const base = new URL(baseUrl)
      if (url.hostname === base.hostname && ['http:', 'https:'].includes(url.protocol)) {
        url.protocol = base.protocol
        if (url.pathname.startsWith(`${base.pathname.replace(/\/$/, '')}/`)) return url.toString()
      }
    } catch { /* An invalid product link cannot become a checkout link. */ }
  }
  return undefined
}
