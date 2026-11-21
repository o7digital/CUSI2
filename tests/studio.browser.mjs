// Real Firefox QA. Does not place an order or send any customer message.
import { firefox } from '@playwright/test';
import assert from 'node:assert/strict';
import { readFile, mkdir } from 'node:fs/promises';

const access=JSON.parse(await readFile(process.env.CUSI_ACCESS_FILE||'/tmp/cusi-studio-access.json','utf8'));
const site=process.env.CUSI_SITE_URL||'http://127.0.0.1:3001';
const studio=process.env.CUSI_STUDIO_URL||'http://127.0.0.1:4380';
const browser=await firefox.launch();
const errors=[];
await mkdir('test-results',{recursive:true});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 page.setDefaultTimeout(25000);
 page.on('pageerror',error=>errors.push(error.message));
 await page.route('**/formspree.io/**',route=>route.abort());
 const titles={es:'Esta Navidad, regala vida.',en:'A little life. A lot of Christmas.',fr:'À Noël, offrez la vie.',it:'A Natale, regala la vita.'};
 for(const[locale,title]of Object.entries(titles)){
  console.log('Checking homepage',locale);
  await page.goto(site+(locale==='es'?'/':'/'+locale));
  await page.getByRole('heading',{level:1,name:title,exact:true}).waitFor();
  await page.waitForFunction(()=>{const image=document.querySelector('[data-cusi-slide="wp-76"]');return image?.complete&&image.naturalWidth>0;},{},{timeout:25000});
  assert.equal(await page.locator('[data-cusi-slide]').count(),6);
  for(let index=0;index<4;index++)assert.equal(await page.locator(`[data-cusi-slide="flowers-${index}"]`).count(),1);
  const titleBox=await page.getByRole('heading',{level:1,name:title,exact:true}).boundingBox();const headerBox=await page.locator('header').boundingBox();assert(titleBox.y>headerBox.y+headerBox.height);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  const basket=page.locator('#canasto-con-nochebuenas-premium');
  await basket.locator('label:has(input[value="Gde"])').click();
  const url=decodeURIComponent(await basket.locator('a').getAttribute('href'));assert.match(url,/2,500 MXN/);assert.match(url,/65 cm/);
  await page.locator('button[aria-label^="3:"]').click();assert.equal(await page.locator('h1').textContent(),locale==='es'?'Flores que hablan por ti, incluso cuando las palabras no alcanzan':await page.locator('h1').textContent());
  await page.locator('button[aria-label^="1:"]').click();
  await page.evaluate(()=>scrollTo(0,0));
  if(locale==='es')await page.screenshot({path:'test-results/cusi-hero-desktop.png'});
 }
 await page.setViewportSize({width:390,height:844});await page.goto(site+'/');await page.locator('[data-cusi-slide="wp-76"]').waitFor();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:'test-results/cusi-hero-mobile.png',fullPage:false});
 console.log('Checking Studio login and dashboard');
 await page.goto(studio);await page.locator('input[name="email"]').fill('cusi');await page.locator('input[name="password"]').fill(access.EDITOR_PASSWORD);await page.getByRole('button',{name:'Entrar a mi Studio'}).click();await page.getByRole('heading',{name:'Tus pedidos',exact:true}).waitFor();await page.getByText('Todo al día.',{exact:true}).waitFor();assert.equal(await page.locator('#cms-link').isVisible(),false);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:'test-results/cusi-dashboard-mobile.png',fullPage:true});
 await page.setViewportSize({width:1500,height:1000});await page.locator('[data-tab="editor"]').click();
 const frame=page.frameLocator('#preview');await frame.locator('[data-cusi-copy="christmas_hero_es"][data-cusi-field="heading"]').waitFor();
 const text=frame.locator('[data-cusi-copy="christmas_hero_es"][data-cusi-field="heading"]');await text.fill('Esta Navidad, regala vida.');await page.locator('#save-state').filter({hasText:'cambios sin guardar'}).waitFor();
 await page.getByRole('button',{name:'Guardar cambios',exact:true}).click();await page.getByRole('status').filter({hasText:'Guardado. El sitio se actualiza'}).waitFor();
 await page.locator('#copy-section').selectOption('christmas_collection');await page.locator('[data-field="heading"]').fill('La Navidad florece en casa.');await page.getByRole('button',{name:'Guardar cambios',exact:true}).click();await page.locator('#save-state').filter({hasText:'Sin cambios pendientes.'}).waitFor();
 await page.locator('#copy-section').selectOption('flowers_hero');await frame.locator('h1').filter({hasText:'Flores que hablan por ti'}).waitFor();await page.locator('#copy-section').selectOption('christmas_hero');
 await page.screenshot({path:'test-results/cusi-studio-editor.png',fullPage:true});
 await page.locator('[data-tab="photos"]').click();assert.equal(await page.locator('.photo-card').count(),6);
 await page.locator('[data-tab="catalog"]').click();await page.locator('#catalog-grid .photo-card').first().waitFor();assert.equal(await page.locator('#catalog-grid .photo-card').count(),24);
 assert.deepEqual(errors,[]);
 console.log('Firefox passed: 4 languages, Nochebuenas first, 4 existing photos, correct WP sizes/prices, mobile layout, editor account, live orders, inline WYSIWYG save, photo library and WP catalog. No orders/messages submitted.');
}finally{await browser.close();}
