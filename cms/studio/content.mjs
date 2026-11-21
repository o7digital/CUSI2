import sanitizeHtml from 'sanitize-html';
import { createHash } from 'node:crypto';
import { parse, serialize } from 'parse5';

export const copyFields = ['heading', 'body', 'eyebrow', 'cta', 'delivery', 'slogan'];
export const revision = row => createHash('sha256').update(JSON.stringify(copyFields.map(key => row[key] || ''))).digest('hex');
export function cleanCopy(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('Contenido inválido.');
  const result = {};
  for (const key of Object.keys(body)) {
    if (key === 'revision') continue;
    if (!copyFields.includes(key) || typeof body[key] !== 'string' || body[key].length > (key === 'body' ? 10000 : 500)) throw new Error('Campo de contenido inválido.');
    result[key] = key === 'body' ? sanitizeHtml(body[key], { allowedTags: ['p','br','strong','em','u','ul','ol','li','a'], allowedAttributes: {a:['href','title']}, allowedSchemes: ['https','mailto','tel'] }) : body[key].trim();
  }
  if ('heading' in result && !result.heading) throw new Error('Escribe un título.');
  return result;
}
export function imageType(bytes) {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg';
  if (bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) return 'image/png';
  if (bytes.toString('ascii',0,4) === 'RIFF' && bytes.toString('ascii',8,12) === 'WEBP') return 'image/webp';
  return null;
}
export function snapshot(html, origin) {
  const doc = parse(html);
  function walk(node) {
    if (node.childNodes) {
      node.childNodes = node.childNodes.filter(child => !['script','iframe','object','embed','form','base'].includes(child.tagName));
      for (const child of node.childNodes) walk(child);
    }
    if (!node.attrs) return;
    node.attrs = node.attrs.filter(attr => !/^on/i.test(attr.name) && !['srcdoc','integrity','nonce'].includes(attr.name));
    const attrs = new Map(node.attrs.map(attr => [attr.name,attr]));
    for (const key of ['src','href','poster']) if (attrs.has(key)) {
      const attr=attrs.get(key);
      try { const url=new URL(attr.value,origin); attr.value=url.protocol==='https:' || url.protocol==='http:' ? url.href : ''; } catch { attr.value=''; }
    }
    if (attrs.has('srcset')) attrs.get('srcset').value=attrs.get('srcset').value.split(',').map(part => { const [src,...size]=part.trim().split(/\s+/); return `${new URL(src,origin).href} ${size.join(' ')}`; }).join(', ');
    if (node.tagName==='a') node.attrs.push({name:'tabindex',value:'-1'});
  }
  walk(doc);
  return serialize(doc);
}
