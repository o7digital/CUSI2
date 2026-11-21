import test from 'node:test';
import assert from 'node:assert/strict';
import { makeStudio } from './server.mjs';
import { revision } from './content.mjs';

test('Studio requires a session, guards writes, preserves prices and returns private Woo orders only to authenticated staff',async()=>{
 const originalFetch=globalThis.fetch,requests=[];
 let row={id:'hero_es',heading:'Navidad',body:'<p>Flores</p>'};
 globalThis.fetch=async(input,options={})=>{
  const url=String(input);if(url.startsWith('http://127.0.0.1:'))return originalFetch(input,options);
  requests.push({url,options});
  if(url.endsWith('/auth/login'))return Response.json({data:{access_token:'private-access',refresh_token:'private-refresh',expires:900000}});
  if(url.includes('/users/me'))return Response.json({data:{id:'owner',email:'owner@cusi.test',first_name:'Cusi',role:'owner'}});
  if(url.includes('/items/site_copy/hero_es')){if(options.method==='PATCH')row={...row,...JSON.parse(options.body)};return Response.json({data:row});}
  if(url.includes('/wc/v3/orders'))return Response.json([{id:123,number:'123',status:'processing',date_created:'2026-11-21T10:00:00',total:'1530.00',currency:'MXN',billing:{first_name:'María',last_name:'Test',email:'private@cusi.test'},shipping:{address_1:'Private address'},line_items:[{name:'Nochebuenas',quantity:1,total:'1530.00'}]}],{headers:{'x-wp-total':'1','x-wp-totalpages':'1'}});
  throw new Error('Unexpected upstream '+url);
 };
 const server=makeStudio({DIRECTUS_URL:'https://cms.test',ADMIN_EMAIL:'owner@cusi.test',STUDIO_URL:'http://studio.test',INSECURE_LOCAL:'1',WORDPRESS_BASE_URL:'https://wp.test',WOO_CONSUMER_KEY:'private-key',WOO_CONSUMER_SECRET:'private-secret'});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const base=`http://127.0.0.1:${server.address().port}`;
 try{
  assert.equal((await fetch(base+'/api/orders')).status,401);
  assert.equal((await fetch(base+'/api/login',{method:'POST',headers:{Origin:'https://wrong.test'},body:'{}'})).status,403);
  const login=await fetch(base+'/api/login',{method:'POST',headers:{Origin:'http://studio.test'},body:JSON.stringify({email:'owner@cusi.test',password:'test'})});
  assert.equal(login.status,200);assert.match(login.headers.get('set-cookie'),/HttpOnly/);const cookie=login.headers.get('set-cookie').split(';')[0];
  assert.doesNotMatch(await login.text(),/private-access|private-refresh/);
  const headers={Cookie:cookie,Origin:'http://studio.test'};
  const active=await fetch(base+'/api/orders?status=processing&page=2',{headers});assert.equal(active.status,200);const data=await active.json();assert.equal(data.orders[0].items[0].name,'Nochebuenas');assert.equal(data.orders[0].customer,'María Test');assert.equal(data.total,1);assert.equal(data.page,2);assert.doesNotMatch(JSON.stringify(data),/private-key|private-secret|private-access/);assert.match(requests.find(r=>r.url.includes('/wc/v3/orders')).url,/status=processing&page=2/);
  assert.equal((await fetch(base+'/api/orders?status=arbitrary',{headers})).status,400);
  assert.equal((await fetch(base+'/api/copy/hero_es',{method:'PATCH',headers,body:JSON.stringify({heading:'Nuevo',revision:'stale'})})).status,409);
  const edit=await fetch(base+'/api/copy/hero_es',{method:'PATCH',headers,body:JSON.stringify({body:'<p><b>Bueno</b><script>bad()</script></p>',revision:revision(row)})});assert.equal(edit.status,200);assert.doesNotMatch((await edit.json()).body,/<script/);
  assert.equal((await fetch(base+'/api/copy/hero_es',{method:'PATCH',headers,body:JSON.stringify({price:1,revision:revision(row)})})).status,400);
  assert.equal((await fetch(base+'/api/upload',{method:'POST',headers,body:'<svg>bad</svg>'})).status,400);
  await fetch(base+'/api/logout',{method:'POST',headers,body:'{}'});assert.equal((await fetch(base+'/api/orders',{headers})).status,401);
 }finally{globalThis.fetch=originalFetch;await new Promise(resolve=>server.close(resolve));}
});
