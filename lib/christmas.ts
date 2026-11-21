export type ChristmasSize = {
  code: string
  height: number
  diameter: number
  price: number
}

export type ChristmasProduct = {
  id: number
  slug: string
  title: string
  description: string
  image: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
  sizes: ChristmasSize[]
}

export async function getChristmasProducts(): Promise<ChristmasProduct[]> {
  const base = process.env.CHRISTMAS_WORDPRESS_BASE_URL
  if (!base) return []

  try {
    const response = await fetch(
      `${base.replace(/\/$/, '')}/wp-json/wp/v2/cusi-navidad?_embed&per_page=100&orderby=date&order=asc`,
      { next: { revalidate: 300 } }
    )
    if (!response.ok) throw new Error(`WordPress Christmas catalog: ${response.status}`)
    const products = await response.json()
    if (!Array.isArray(products)) throw new Error('Invalid WordPress Christmas catalog')
    const plainText = (html: string) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    return products.flatMap((product): ChristmasProduct[] => {
      const media = product?._embedded?.['wp:featuredmedia']?.[0]
      const sizes: ChristmasSize[] = product?.meta?.cusi_sizes
      if (!Number.isSafeInteger(product?.id) || !product?.slug || !product?.title?.rendered || !media?.source_url || !Array.isArray(sizes) || !sizes.length ||
        sizes.some((size) => !size.code || [size.height, size.diameter, size.price].some((value) => !Number.isFinite(value) || value <= 0))) {
        console.error('Incomplete WordPress Christmas product', product?.id)
        return []
      }
      return [{
        id: product.id,
        slug: product.slug,
        title: plainText(product.title.rendered),
        description: plainText(product.content?.rendered || ''),
        image: media.source_url.replace(/^http:/, 'https:'),
        imageAlt: media.alt_text || plainText(product.title.rendered),
        imageWidth: media.media_details?.width || 1026,
        imageHeight: media.media_details?.height || 1280,
        sizes,
      }]
    })
  } catch (error) {
    console.error('Unable to load Christmas products', error)
    return []
  }
}
