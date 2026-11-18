import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'

const CLIENT = 'cusi'
const COOKIE = 'cusi_olivia'
const BACKEND = 'https://olivia.o7digitalgroup.com/cusi'
const VERSION = '3.6.0'
const HOUR = 3600000
const equal = (a: string, b: string) => {
  const left = Buffer.from(a), right = Buffer.from(b)
  return left.length === right.length && timingSafeEqual(left, right)
}
const json = (data: Record<string, unknown>, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers } })

export function createOliviaGateway(key: string, upstream: typeof fetch = fetch) {
  const sign = (value: string) => createHmac('sha256', key).update(value).digest('hex')
  return async (request: Request, action: string): Promise<Response> => {
    if (key.length < 43) return json({ error: 'Olivia is temporarily unavailable' }, 503)
    const origin = request.headers.get('origin')
    const ownOrigin = new URL(request.url).origin
    if ((origin && origin !== ownOrigin) || request.headers.get('sec-fetch-site') === 'cross-site') return json({ error: 'Invalid origin' }, 403)
    if (request.method === 'GET' && action === 'status') {
      try {
        const result = await upstream(`${BACKEND}/health`, { redirect: 'error', cache: 'no-store', signal: AbortSignal.timeout(5000) })
        const data = await result.json()
        const available = result.ok && data.status === 'ok' && data.site === CLIENT && data.version === VERSION && data.provider_configured === true
        return json({ available, clientCode: CLIENT, version: VERSION }, available ? 200 : 503)
      } catch { return json({ available: false, clientCode: CLIENT, version: VERSION }, 503) }
    }
    const cookie = request.headers.get('cookie')?.split(';').map(item => item.trim()).find(item => item.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1) || ''
    const [id = '', expiry = '', signature = ''] = cookie.split('.')
    const valid = /^[a-f0-9]{32}$/.test(id) && /^\d+$/.test(expiry) && Number(expiry) > Date.now() && Number(expiry) <= Date.now() + HOUR && equal(signature, sign(`session:${id}.${expiry}`))
    if (request.method === 'GET' && action === 'session') {
      const sessionId = valid ? id : randomBytes(16).toString('hex')
      const expires = String(Date.now() + HOUR)
      const headers: Record<string, string> = valid ? {} : {
        'Set-Cookie': `${COOKIE}=${sessionId}.${expires}.${sign(`session:${sessionId}.${expires}`)}; HttpOnly; SameSite=Strict; Path=/api/olivia; Max-Age=3600${ownOrigin.startsWith('https:') ? '; Secure' : ''}`,
      }
      return json({ clientCode: CLIENT, identity: sign(`widget:${sessionId}`), version: VERSION }, 200, headers)
    }
    if (request.method !== 'POST' || action !== 'chat') return json({ error: 'Not found' }, 404)
    if (origin !== ownOrigin) return json({ error: 'Origin required' }, 403)
    if (!valid || !equal(request.headers.get('x-olivia-widget-identity') || '', sign(`widget:${id}`))) return json({ error: 'Session expired' }, 401)
    if (!/^application\/json(?:;|$)/i.test(request.headers.get('content-type') || '')) return json({ error: 'JSON required' }, 415)
    if (Number(request.headers.get('content-length') || 0) > 16000) return json({ error: 'Request too large' }, 413)
    let payload: Record<string, unknown>
    try {
      const reader = request.body?.getReader()
      if (!reader) return json({ error: 'Message required' }, 400)
      const chunks: Uint8Array[] = []
      let size = 0
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        size += value.byteLength
        if (size > 16000) { await reader.cancel(); return json({ error: 'Request too large' }, 413) }
        chunks.push(value)
      }
      payload = JSON.parse(Buffer.concat(chunks).toString('utf8'))
    } catch { return json({ error: 'Invalid JSON' }, 400) }
    if (!payload || typeof payload !== 'object' || Array.isArray(payload) || Object.keys(payload).some(field => !['message', 'language', 'consent', 'conversationId'].includes(field))) return json({ error: 'Invalid payload' }, 400)
    const message = typeof payload.message === 'string' ? payload.message.trim() : ''
    if (payload.consent !== true) return json({ error: 'Consent required' }, 400)
    if (!message || message.length > 4000 || typeof payload.conversationId !== 'string' || !/^[a-f0-9-]{36}$/i.test(payload.conversationId) || !['es', 'en', 'fr', 'it'].includes(String(payload.language))) return json({ error: 'Invalid message' }, 400)
    try {
      const response = await upstream(`${BACKEND}/chat`, {
        method: 'POST', redirect: 'error', cache: 'no-store', signal: AbortSignal.timeout(55000),
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
        body: JSON.stringify({ message, language: payload.language, consent: true,
          conversation_id: sign(`conversation:${id}:${payload.conversationId}`).slice(0, 48), session_id: id,
          client_hash: sign(`client:${request.headers.get('x-vercel-forwarded-for') || id}`),
        }),
      })
      if (!response.ok) return json({ error: 'Olivia is temporarily unavailable' }, response.status === 429 ? 429 : 502)
      const data = await response.json()
      if (data.clientCode !== CLIENT || data.version !== VERSION || typeof data.reply !== 'string' || !data.reply.trim() || data.reply.length > 16000 || typeof data.model !== 'string' || !data.model) return json({ error: 'Invalid CUSI response' }, 502)
      return json({ reply: data.reply, clientCode: CLIENT, version: VERSION, model: data.model })
    } catch { return json({ error: 'Olivia is temporarily unavailable' }, 502) }
  }
}
