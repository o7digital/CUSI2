import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { cleanCopy, copyFields, imageType, revision, snapshot } from './content.mjs';

export function makeStudio(config = process.env) {
  const cms = config.DIRECTUS_URL?.replace(/\/$/,'');
  const site = config.WEBSITE_URL || 'https://www.cusiflores.com';
  const studio = config.STUDIO_URL;
  const sessions = new Map(), attempts = new Map(), previewTickets = new Map();
  const secure = !config.INSECURE_LOCAL;
  const cookie = (value, age) => `cusi_session=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${age}${secure ? '; Secure' : ''}`;
  async function directus(path, method='GET', body, token) {
    const headers = token ? {Authorization:`Bearer ${token}`} : {};
    if (body && !(body instanceof FormData)) headers['Content-Type']='application/json';
    const response=await fetch(cms+path,{method,headers,body:body instanceof FormData?body:body===undefined?undefined:JSON.stringify(body),signal:AbortSignal.timeout(20000)});
    if(!response.ok) { const error=new Error(response.status===401?'Vuelve a iniciar sesión.':'No se pudo guardar o leer el contenido.'); error.status=response.status===401?401:502; throw error; }
    return (await response.json()).data;
  }
  const send=(res,status,data)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify(data));};
  async function body(req, max=65536) { const parts=[];let length=0;for await(const part of req){length+=part.length;if(length>max){const e=new Error('Archivo o contenido demasiado grande.');e.status=413;throw e;}parts.push(part);}return Buffer.concat(parts); }
  const jsonBody=async req=>{try{return JSON.parse((await body(req)).toString());}catch(e){if(e.status)throw e;const error=new Error('JSON inválido.');error.status=400;throw error;}};
  async function woo(status,page) {
    if(!config.WOO_CONSUMER_KEY || !config.WOO_CONSUMER_SECRET) {const e=new Error('Falta conectar WooCommerce.');e.status=503;throw e;}
    const url=new URL('/wp-json/wc/v3/orders',config.WORDPRESS_BASE_URL);
    url.search=new URLSearchParams({status,page:String(page),per_page:'50',orderby:'date',order:'desc'});
    const response=await fetch(url,{headers:{Authorization:'Basic '+Buffer.from(`${config.WOO_CONSUMER_KEY}:${config.WOO_CONSUMER_SECRET}`).toString('base64')},signal:AbortSignal.timeout(20000)});
    if(!response.ok){const e=new Error('WooCommerce no está disponible. Intenta actualizar de nuevo.');e.status=502;throw e;}
    const rows=await response.json();
    return {total:Number(response.headers.get('x-wp-total')||0),pages:Number(response.headers.get('x-wp-totalpages')||0),orders:rows.map(row=>({
      id:row.id,number:row.number,status:row.status,date:row.date_created,total:row.total,currency:row.currency,
      customer:[row.billing?.first_name,row.billing?.last_name].filter(Boolean).join(' ')||'Cliente',
      email:row.billing?.email||'',phone:row.billing?.phone||'',
      address:[row.shipping?.address_1,row.shipping?.address_2,row.shipping?.city,row.shipping?.postcode].filter(Boolean).join(', '),
      payment:row.payment_method_title,paid:!!row.date_paid,note:row.customer_note||'',
      items:(row.line_items||[]).map(item=>({name:item.name,quantity:item.quantity,total:item.total})),
      adminUrl:`${config.WORDPRESS_BASE_URL}/wp-admin/admin.php?page=wc-orders&action=edit&id=${row.id}`,
    }))};
  }
  const server=createServer(async(req,res)=>{
    res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','same-origin');
    res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.cusiflores.com https://wp-cusi.o7digitalgroup.com; frame-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
    try {
      const url=new URL(req.url,'http://studio');
      if(req.method==='GET'&&url.pathname==='/health'){send(res,200,{ok:true});return;}
      if(req.method==='GET'&&['/','/app.js','/style.css'].includes(url.pathname)){
        const name=url.pathname==='/'?'index.html':url.pathname.slice(1);
        res.setHeader('Content-Type',name.endsWith('.html')?'text/html; charset=utf-8':name.endsWith('.js')?'application/javascript; charset=utf-8':'text/css; charset=utf-8');
        res.end(await readFile(new URL('./public/'+name,import.meta.url)));return;
      }
      if(!['GET','HEAD'].includes(req.method)) {
        const expected=studio || `http://${req.headers.host}`;
        if(req.headers.origin!==expected){send(res,403,{error:'Origen inválido.'});return;}
      }
      if(url.pathname==='/api/login'&&req.method==='POST'){
        const input=await jsonBody(req);
        const address=(req.headers['x-forwarded-for']||req.socket.remoteAddress||'').split(',')[0];
        const key=address+String(input.email).toLowerCase(),now=Date.now();
        for(const [id,value] of attempts)if(value.until<now)attempts.delete(id);
        const limit=attempts.get(key)||{count:0,until:now+900000};
        if(limit.count>=8){send(res,429,{error:'Espera unos minutos antes de volver a intentar.'});return;}
        limit.count++;attempts.set(key,limit);
        if(typeof input.email!=='string'||typeof input.password!=='string'){send(res,400,{error:'Escribe tu correo y contraseña.'});return;}
        let auth,user;
        try{auth=await directus('/auth/login','POST',{email:input.email.trim().toLowerCase()==='cusi'?config.EDITOR_EMAIL:input.email,password:input.password,mode:'json'});user=await directus('/users/me?fields=id,email,first_name,role', 'GET',undefined,auth.access_token);}catch{send(res,401,{error:'Usuario o contraseña incorrectos.'});return;}
        if(user.email!==config.ADMIN_EMAIL && (!config.EDITOR_ROLE_ID || user.role!==config.EDITOR_ROLE_ID)){send(res,403,{error:'Esta cuenta no tiene acceso a Cusi Studio.'});return;}
        attempts.delete(key);
        const id=randomBytes(32).toString('hex');
        sessions.set(id,{user,token:auth.access_token,refresh:auth.refresh_token,refreshAt:Date.now()+auth.expires-30000,expires:Date.now()+8*3600000});
        res.setHeader('Set-Cookie',cookie(id,8*3600));send(res,200,{ok:true});return;
      }
      let id=(req.headers.cookie||'').split(';').map(v=>v.trim()).find(v=>v.startsWith('cusi_session='))?.split('=')[1];
      // Sandboxed frames have an opaque origin; browsers may withhold Lax cookies.
      // A single-use ticket binds only this preview navigation to the parent session.
      if(url.pathname==='/api/preview'&&req.method==='GET'){
        const ticket=url.searchParams.get('ticket'),entry=previewTickets.get(ticket);
        if(entry&&entry.expires>Date.now()){id=entry.sessionId;previewTickets.delete(ticket);}
      }
      for(const [key,value] of sessions)if(value.expires<Date.now())sessions.delete(key);
      const session=sessions.get(id);
      if(!session){send(res,401,{error:'Inicia sesión para abrir Cusi Studio.'});return;}
      if(url.pathname==='/api/logout'&&req.method==='POST'){sessions.delete(id);res.setHeader('Set-Cookie',cookie('',0));send(res,200,{ok:true});return;}
      if(session.refreshAt<Date.now()){
        try{const auth=await directus('/auth/refresh','POST',{refresh_token:session.refresh,mode:'json'});session.token=auth.access_token;session.refresh=auth.refresh_token;session.refreshAt=Date.now()+auth.expires-30000;}catch{sessions.delete(id);send(res,401,{error:'Tu sesión terminó. Vuelve a entrar.'});return;}
      }
      const api=(path,method,body)=>directus(path,method,body,session.token);
      if(url.pathname==='/api/preview-ticket'&&req.method==='GET'){
        for(const[key,value]of previewTickets)if(value.expires<Date.now())previewTickets.delete(key);
        const ticket=randomBytes(32).toString('hex');previewTickets.set(ticket,{sessionId:id,expires:Date.now()+60000});send(res,200,{ticket});return;
      }
      if(url.pathname==='/api/session'&&req.method==='GET'){send(res,200,{user:{name:session.user.first_name||'CUSI',isAdmin:session.user.email===config.ADMIN_EMAIL},site,cms});return;}
      if(url.pathname==='/api/content'&&req.method==='GET'){
        const [copy,slides]=await Promise.all([api('/items/site_copy?limit=100'),api('/items/hero_slides?sort=sort&limit=30')]);
        send(res,200,{copy:copy.map(row=>({...row,revision:revision(row)})),slides});return;
      }
      const copyMatch=url.pathname.match(/^\/api\/copy\/([a-z0-9_-]+)$/i);
      if(copyMatch&&req.method==='PATCH'){
        const input=await jsonBody(req),data=cleanCopy(input),row=await api('/items/site_copy/'+copyMatch[1]);
        if(input.revision!==revision(row)){send(res,409,{error:'Este texto cambió en otra sesión. Recarga antes de guardar.'});return;}
        const saved=await api('/items/site_copy/'+copyMatch[1],'PATCH',data);send(res,200,{...saved,revision:revision(saved)});return;
      }
      const slideMatch=url.pathname.match(/^\/api\/slides\/([a-z0-9_-]+)$/i);
      if(slideMatch&&req.method==='PATCH'){
        const input=await jsonBody(req),data={};
        if(typeof input.alt==='string'&&input.alt.length<=300)data.alt=input.alt.trim();
        if(input.image_file&&/^[a-f0-9-]{36}$/i.test(input.image_file))data.image_file=input.image_file;
        if(['published','draft'].includes(input.status))data.status=input.status;
        send(res,200,await api('/items/hero_slides/'+slideMatch[1],'PATCH',data));return;
      }
      if(url.pathname==='/api/upload'&&req.method==='POST'){
        const bytes=await body(req,25*1024*1024),type=imageType(bytes);
        if(!type){send(res,400,{error:'Elige una foto JPG, PNG o WebP válida.'});return;}
        const form=new FormData();form.set('title','Fotografía CUSI');form.set('file',new Blob([bytes],{type}),`cusi-${Date.now()}.${type.split('/')[1]}`);
        const file=await api('/files','POST',form);send(res,201,{id:file.id});return;
      }
      const mediaMatch=url.pathname.match(/^\/api\/media\/([a-f0-9-]{36})$/i);
      if(mediaMatch&&req.method==='GET'){
        const response=await fetch(`${cms}/assets/${mediaMatch[1]}?width=1000&format=webp`,{headers:{Authorization:`Bearer ${session.token}`},signal:AbortSignal.timeout(20000)});
        if(!response.ok||!response.headers.get('content-type')?.startsWith('image/')){send(res,404,{error:'Foto no encontrada.'});return;}
        res.setHeader('Content-Type',response.headers.get('content-type'));res.end(Buffer.from(await response.arrayBuffer()));return;
      }
      if(url.pathname==='/api/orders'&&req.method==='GET'){
        const status=url.searchParams.get('status')||'active',page=Number(url.searchParams.get('page')||1);
        if(!['active','pending','processing','on-hold','completed','cancelled','refunded','failed'].includes(status)||!Number.isSafeInteger(page)||page<1||page>10000){send(res,400,{error:'Filtro inválido.'});return;}
        const statuses=status==='active'?['pending','processing','on-hold']:[status];
        const groups=await Promise.all(statuses.map(value=>woo(value,page)));
        send(res,200,{orders:groups.flatMap(group=>group.orders).sort((a,b)=>b.date.localeCompare(a.date)),total:groups.reduce((sum,group)=>sum+group.total,0),pages:Math.max(...groups.map(group=>group.pages)),page,checkedAt:new Date().toISOString()});return;
      }
      if(url.pathname==='/api/catalog'&&req.method==='GET'){
        const [regular,seasonal]=await Promise.all([
          fetch(`${config.WORDPRESS_BASE_URL}/wp-json/wc/store/v1/products?per_page=100`,{signal:AbortSignal.timeout(15000)}),
          fetch(`${config.CHRISTMAS_WORDPRESS_BASE_URL}/wp-json/wp/v2/cusi-navidad?_embed&per_page=100&orderby=date&order=asc`,{signal:AbortSignal.timeout(15000)}),
        ]);
        if(!regular.ok||!seasonal.ok){send(res,502,{error:'No se pudo leer el catálogo de WordPress.'});return;}
        const products=await regular.json(),christmas=await seasonal.json();
        send(res,200,{products:products.map(row=>({id:row.id,name:row.name,price:Number(row.prices.price)/10**row.prices.currency_minor_unit,currency:row.prices.currency_code,image:row.images?.[0]?.src?.replace(/^http:/,'https:')})),christmas:christmas.map(row=>({id:row.id,title:row.title.rendered,sizes:row.meta.cusi_sizes,image:row._embedded?.['wp:featuredmedia']?.[0]?.source_url}))});return;
      }
      if(url.pathname==='/api/preview'&&req.method==='GET'){
        const locale=url.searchParams.get('locale')||'es';
        if(!['es','en','fr','it'].includes(locale)){send(res,400,{error:'Idioma inválido.'});return;}
        const origin=new URL(site).origin,path=locale==='es'?'/':`/${locale}`;
        const response=await fetch(origin+path,{signal:AbortSignal.timeout(25000)});
        if(!response.ok){send(res,502,{error:'No se pudo abrir la vista previa.'});return;}
        let html=snapshot(await response.text(),origin);
        const nonce=randomBytes(16).toString('base64');
        const bridge=`const parentOrigin=${JSON.stringify(studio||'http://'+req.headers.host)};document.querySelectorAll('[data-cusi-copy]').forEach(el=>{el.contentEditable='true';el.style.outline='1px dashed #79a68c';el.addEventListener('click',e=>{e.preventDefault();parent.postMessage({type:'select',id:el.dataset.cusiCopy,field:el.dataset.cusiField},parentOrigin)});el.addEventListener('input',()=>parent.postMessage({type:'edit',id:el.dataset.cusiCopy,field:el.dataset.cusiField,value:el.dataset.cusiRich?el.innerHTML:el.innerText},parentOrigin))});document.querySelectorAll('a,button').forEach(el=>el.addEventListener('click',e=>e.preventDefault()));addEventListener('message',e=>{if(e.source!==parent||e.origin!==parentOrigin)return;const d=e.data;if(d.type==='set')document.querySelectorAll('[data-cusi-copy]').forEach(el=>{if(el.dataset.cusiCopy===d.id&&el.dataset.cusiField===d.field){if(el.dataset.cusiRich)el.innerHTML=d.value;else el.textContent=d.value;}});if(d.type==='section'&&d.row){const row=d.row;const isHero=row.section.endsWith('_hero');document.querySelectorAll('[data-cusi-copy]').forEach(el=>{const inHero=el.dataset.cusiCopy.includes('_hero_');if(inHero!==isHero)return;if(inHero)el.dataset.cusiCopy=row.id;if(el.dataset.cusiCopy===row.id){const value=row[el.dataset.cusiField]||'';if(el.dataset.cusiRich)el.innerHTML=value;else el.textContent=value;}});const target=[...document.querySelectorAll('[data-cusi-copy]')].find(el=>el.dataset.cusiCopy===row.id);target?.scrollIntoView({block:'center'});}if(d.type==='slide')document.querySelectorAll('[data-cusi-slide]').forEach(el=>{el.style.opacity=el.dataset.cusiSlide===d.id?'1':'0';})});`;
        html=html.replace('</body>',`<style>[contenteditable]:focus{outline:2px solid #39734d!important}.cusi-olivia{display:none!important}header{position:relative!important}html{scroll-behavior:auto!important}</style><script nonce="${nonce}">${bridge};parent.postMessage({type:'ready'},parentOrigin)</script></body>`);
        res.setHeader('Referrer-Policy','no-referrer');
        res.setHeader('Content-Security-Policy',`default-src 'none'; style-src 'unsafe-inline' ${origin}; font-src ${origin} data:; img-src ${origin} https://wp-cusi.o7digitalgroup.com data:; script-src 'nonce-${nonce}'; base-uri 'none'; form-action 'none'; frame-ancestors 'self'`);
        res.setHeader('Content-Type','text/html; charset=utf-8');res.end(html);return;
      }
      send(res,404,{error:'Página no encontrada.'});
    }catch(error){send(res,error.status||400,{error:error.message||'No se pudo completar la operación.'});}
  });
  return server;
}
if(process.argv[1]===fileURLToPath(import.meta.url))makeStudio().listen(Number(process.env.PORT||3000),'0.0.0.0',()=>console.log('Cusi Studio ready'));
