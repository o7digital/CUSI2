import { NextRequest, NextResponse } from 'next/server'

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  if (!/^[0-9a-f-]{36}$/i.test(params.id) || !process.env.DIRECTUS_URL || !process.env.DIRECTUS_READ_TOKEN) {
    return new NextResponse(null, { status: 404 })
  }
  // Only images attached to published slides are served. Files and drafts stay private.
  const headers = { Authorization: `Bearer ${process.env.DIRECTUS_READ_TOKEN}` }
  const check = await fetch(`${process.env.DIRECTUS_URL}/items/hero_slides?filter[status][_eq]=published&filter[image_file][_eq]=${params.id}&fields=id&limit=1`, { headers, cache: 'no-store' })
  if (!check.ok || !(await check.json()).data?.length) return new NextResponse(null, { status: 404 })
  const response = await fetch(`${process.env.DIRECTUS_URL}/assets/${params.id}?width=1600&quality=85&format=webp`, { headers, next: { revalidate: 60 } })
  if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) return new NextResponse(null, { status: 404 })
  return new NextResponse(response.body, { headers: { 'Content-Type': response.headers.get('content-type')!, 'Cache-Control': 'public, max-age=60', 'X-Content-Type-Options': 'nosniff' } })
}
