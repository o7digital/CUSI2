import { createOliviaGateway } from '@/lib/olivia-gateway'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

const handle = createOliviaGateway(process.env.OLIVIA_GATEWAY_KEY || '')

export async function GET(request: Request, { params }: { params: { action: string } }) {
  return handle(request, params.action)
}

export async function POST(request: Request, { params }: { params: { action: string } }) {
  return handle(request, params.action)
}
