export type ChristmasSize = {
  code: string
  height: number
  diameter: number
  price: number
}

export type ChristmasProduct = {
  title: string
  description: string
  image: string
  imageAlt: string
  sizes: ChristmasSize[]
}

export async function getChristmasProduct(): Promise<ChristmasProduct | null> {
  const base = process.env.CHRISTMAS_WORDPRESS_BASE_URL
  if (!base) return null

  try {
    const response = await fetch(
      `${base.replace(/\/$/, '')}/wp-json/wp/v2/cusi-navidad?slug=canasto-con-nochebuenas-premium&_embed`,
      { next: { revalidate: 300 } }
    )
    if (!response.ok) throw new Error(`WordPress Christmas catalog: ${response.status}`)
    const [product] = await response.json()
    const media = product?._embedded?.['wp:featuredmedia']?.[0]
    const sizes: ChristmasSize[] = product?.meta?.cusi_sizes
    if (!product?.title?.rendered || !media?.source_url || !Array.isArray(sizes) || !sizes.length ||
      sizes.some((size) => !size.code || [size.height, size.diameter, size.price].some((value) => !Number.isFinite(value) || value <= 0))) {
      throw new Error('Incomplete WordPress Christmas product')
    }
    const plainText = (html: string) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    return {
      title: plainText(product.title.rendered),
      description: plainText(product.content?.rendered || ''),
      image: media.source_url.replace(/^http:/, 'https:'),
      imageAlt: media.alt_text || plainText(product.title.rendered),
      sizes,
    }
  } catch (error) {
    console.error('Unable to load Christmas product', error)
    return null
  }
}
