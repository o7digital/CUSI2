import { readFile, writeFile } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';

const accessPath=process.env.CUSI_ACCESS_FILE||'/tmp/cusi-studio-access.json';
const access=JSON.parse(await readFile(accessPath,'utf8'));
const base=access.DIRECTUS_URL;
if(!base?.startsWith('https://directus-production-39d0efab.up.railway.app'))throw new Error('Select the dedicated Cusi Directus instance.');
let token;
async function api(path,method='GET',body){
 const response=await fetch(base+path,{method,headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{})},body:body===undefined?undefined:JSON.stringify(body),signal:AbortSignal.timeout(30000)});
 const result=await response.json();if(!response.ok)throw new Error(`${method} ${path}: ${response.status} ${JSON.stringify(result.errors)}`);return result.data;
}
token=(await api('/auth/login','POST',{email:access.ADMIN_EMAIL,password:access.ADMIN_PASSWORD,mode:'json'})).access_token;
const me=await api('/users/me');
await api('/users/'+me.id,'PATCH',{token:access.ADMIN_TOKEN,first_name:'CUSI',language:'es-ES'});
const field=(name,type='string',meta={})=>({field:name,type,schema:{is_nullable:true,...(type==='string'?{max_length:2000}:{})},meta:{interface:type==='text'?'input-rich-text-html':'input',width:'full',...meta}});
const id={field:'id',type:'string',schema:{is_primary_key:true,is_nullable:false,max_length:120},meta:{hidden:true}};
const status=field('status','string',{interface:'select-dropdown',options:{choices:[{text:'Publicado',value:'published'},{text:'Borrador',value:'draft'}]}});
const definitions={
 site_copy:{name:'Textos del sitio',icon:'edit_note',fields:[field('locale','string',{interface:'select-dropdown',options:{choices:['es','en','fr','it'].map(value=>({text:value.toUpperCase(),value}))}}),field('section'),field('eyebrow'),field('heading'),field('body','text'),field('cta'),field('delivery'),field('slogan')]},
 hero_slides:{name:'Fotografías del hero',icon:'photo_library',fields:[field('sort','integer'),field('kind'),field('product_slug'),field('alt'),field('image_url'),field('image_file','uuid',{interface:'file-image',special:['file']})]},
};
const collections=await api('/collections');
for(const[name,definition]of Object.entries(definitions)){
 if(collections.some(row=>row.collection===name))continue;
 await api('/collections','POST',{collection:name,schema:{},meta:{icon:definition.icon,display_template:name==='site_copy'?'{{locale}} · {{section}}':'{{alt}}',...(name==='hero_slides'?{sort_field:'sort'}:{}),translations:[{language:'es-ES',translation:definition.name}]},fields:[id,status,...definition.fields]});
 if(name==='hero_slides')await api('/relations','POST',{collection:name,field:'image_file',related_collection:'directus_files',schema:{on_delete:'SET NULL'}});
 console.log('Created',name);
}
const localized={
 es:{eyebrow:'CUSI · Navidad',heading:'Esta Navidad, regala vida.',body:'Nochebuenas premium para llenar de color tu casa y celebrar con quienes más quieres.',cta:'Elegir mis Nochebuenas',delivery:'Entregas del 25 nov. al 9 dic.',slogan:'Después se acaban.',flowers:['Flores que hablan por ti, incluso cuando las palabras no alcanzan','Arreglos premium para celebrar, agradecer, acompañar y transformar cada gesto en una presencia inolvidable.','Solicitar un arreglo'],collection:['La Navidad florece en casa.','El rojo de las nochebuenas, el encanto de celebrar juntos. Un detalle CUSI para vestir tus fiestas.']},
 en:{eyebrow:'CUSI · Christmas',heading:'A little life. A lot of Christmas.',body:'Premium poinsettias to fill your home with colour and celebrate the people you love.',cta:'Choose my poinsettias',delivery:'Delivery Nov 25 – Dec 9',slogan:'After that, they’re gone.',flowers:['Flowers that speak for you, even when words are not enough','Premium arrangements to celebrate, thank and turn every gesture into an unforgettable presence.','Request an arrangement'],collection:['Let Christmas bloom at home.','Red poinsettias and the joy of celebrating together. A CUSI touch for the festive season.']},
 fr:{eyebrow:'CUSI · Noël',heading:'À Noël, offrez la vie.',body:'Des poinsettias premium pour faire fleurir votre maison et célébrer ceux que vous aimez.',cta:'Choisir mes poinsettias',delivery:'Livraisons du 25 nov. au 9 déc.',slogan:'Après, il n’y en aura plus.',flowers:['Des fleurs qui parlent pour vous, même quand les mots ne suffisent plus','Des arrangements premium pour célébrer, remercier et transformer chaque geste en une présence inoubliable.','Demander un arrangement'],collection:['Faites fleurir votre Noël.','Le rouge des poinsettias, le plaisir de se retrouver. Une touche CUSI pour habiller vos fêtes.']},
 it:{eyebrow:'CUSI · Natale',heading:'A Natale, regala la vita.',body:'Stelle di Natale premium per colorare la tua casa e celebrare le persone che ami.',cta:'Scegli le mie stelle di Natale',delivery:'Consegne dal 25 nov. al 9 dic.',slogan:'Poi finiscono.',flowers:['Fiori che parlano per te, anche quando le parole non bastano','Composizioni premium per celebrare, ringraziare e trasformare ogni gesto in una presenza indimenticabile.','Richiedi una composizione'],collection:['Il Natale fiorisce in casa.','Il rosso delle stelle di Natale, la gioia di stare insieme. Un tocco CUSI per le tue feste.']},
};
const existing=new Set((await api('/items/site_copy?fields=id&limit=100')).map(row=>row.id));
for(const[locale,text]of Object.entries(localized))for(const section of ['christmas_hero','flowers_hero','christmas_collection']){
 const key=`${section}_${locale}`;if(existing.has(key))continue;
 const copy={id:key,status:'published',locale,section,eyebrow:text.eyebrow,heading:text.heading,body:`<p>${text.body}</p>`,cta:text.cta,delivery:text.delivery,slogan:text.slogan};
 if(section==='flowers_hero')Object.assign(copy,{eyebrow:'CUSI · Flores',heading:text.flowers[0],body:`<p>${text.flowers[1]}</p>`,cta:text.flowers[2]});
 if(section==='christmas_collection')Object.assign(copy,{heading:text.collection[0],body:`<p>${text.collection[1]}</p>`});
 await api('/items/site_copy','POST',copy);
}
const response=await fetch(`${access.CHRISTMAS_WORDPRESS_BASE_URL}/wp-json/wp/v2/cusi-navidad?_embed&per_page=100&orderby=date&order=asc`);if(!response.ok)throw new Error('WordPress catalog unavailable');
const products=await response.json();
const slides=products.map((row,index)=>({id:`wp-${row.id}`,status:'published',sort:index,kind:'christmas',product_slug:row.slug,alt:row.title.rendered,image_url:row._embedded['wp:featuredmedia'][0].source_url}));
slides.push(...['/orquidea.png','/2.png','/3.png','/4.png'].map((image,index)=>({id:`flowers-${index}`,status:'published',sort:slides.length+index,kind:'flowers',alt:['Orquídea CUSI','Arreglo floral CUSI · 2','Arreglo floral CUSI · 3','Arreglo floral CUSI · 4'][index],image_url:image})));
const slideIds=new Set((await api('/items/hero_slides?fields=id&limit=100')).map(row=>row.id));
for(const slide of slides)if(!slideIds.has(slide.id))await api('/items/hero_slides','POST',slide);

const policies=await api('/policies?limit=-1'),permissions=await api('/permissions?limit=-1');
let reader=policies.find(row=>row.name==='Cusi website read');
if(!reader)reader=await api('/policies','POST',{name:'Cusi website read',icon:'public',admin_access:false,app_access:false});
let editor=policies.find(row=>row.name==='Cusi content editor');
if(!editor)editor=await api('/policies','POST',{name:'Cusi content editor',icon:'edit',admin_access:false,app_access:true});
const addPermission=async(policy,collection,action)=>{if(!permissions.some(row=>row.policy===policy&&row.collection===collection&&row.action===action))await api('/permissions','POST',{policy,collection,action,permissions:{},fields:['*']});};
for(const collection of ['site_copy','hero_slides','directus_files']){
 await addPermission(reader.id,collection,'read');
 for(const action of ['read','create','update'])await addPermission(editor.id,collection,action);
}
const roles=await api('/roles?limit=-1');let role=roles.find(row=>row.name==='Cusi editora');
if(!role)role=await api('/roles','POST',{name:'Cusi editora',icon:'local_florist',policies:[{policy:editor.id}]});
access.EDITOR_ROLE_ID=role.id;
const users=await api('/users?fields=id,email&limit=-1');let readUser=users.find(row=>row.email==='website-reader@example.com');
if(!readUser)readUser=await api('/users','POST',{email:'website-reader@example.com',password:randomBytes(32).toString('hex'),first_name:'Cusi website',status:'active',token:access.WEBSITE_READ_TOKEN,policies:[{policy:reader.id}]});
// This reserved address is an internal login identifier, never an email recipient.
access.EDITOR_EMAIL='cusi-editor@example.com';
if(!users.some(row=>row.email===access.EDITOR_EMAIL)){
 access.EDITOR_PASSWORD=randomBytes(24).toString('base64url');
 await writeFile(accessPath,JSON.stringify(access),{mode:0o600});
 await api('/users','POST',{email:access.EDITOR_EMAIL,password:access.EDITOR_PASSWORD,first_name:'CUSI',last_name:'Flores',language:'es-ES',status:'active',role:role.id});
}
await api('/settings','PATCH',{project_name:'CUSI · Studio',project_color:'#193b2f',default_language:'es-ES'});
await writeFile(accessPath,JSON.stringify(access),{mode:0o600});
await writeFile(new URL('./deployment.json',import.meta.url),JSON.stringify({project:'cusi-cms',projectId:'3f248108-1998-4419-a20d-87df46ec5c75',environment:'production',environmentId:'0ea11459-67f0-49ef-8544-1b0ef340a3b6',directusServiceId:'6da7a54b-ed72-4a62-9de9-d40ba0b28eb0',databaseServiceId:'2e1978e9-3ff7-4697-96af-4ba0e19cd104',studioServiceId:'34a05eb1-ba73-486b-8900-54d760deacce',directusUrl:base,studioUrl:access.STUDIO_URL,directusImage:'directus/directus:12.6.1'},null,2)+'\n');
console.log('Cusi CMS ready: 12 editable sections, 6 preserved hero photos, private reader and editor policies.');
