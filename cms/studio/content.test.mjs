import test from 'node:test';
import assert from 'node:assert/strict';
import { cleanCopy, imageType, revision, snapshot } from './content.mjs';

test('rich text retains formatting and strips executable HTML and external attributes',()=>{
 const result=cleanCopy({heading:' Navidad ',body:'<p><strong>Flores</strong><img src=x onerror="alert(1)"><script>alert(2)</script><a href="javascript:alert(3)">link</a></p>'});
 assert.equal(result.heading,'Navidad');assert.match(result.body,/<strong>Flores<\/strong>/);assert.doesNotMatch(result.body,/<script|<img|javascript:|onerror/);
 assert.throws(()=>cleanCopy({price:1}));assert.throws(()=>cleanCopy({heading:''}));
});
test('revision detects an edit and is unaffected by unrelated metadata',()=>{
 const row={heading:'Flores',body:'<p>CUSI</p>'};assert.notEqual(revision(row),revision({...row,body:'<p>Navidad</p>'}));assert.equal(revision(row),revision({...row,id:'test'}));
});
test('preview removes active elements and event handlers, resolves asset URLs and keeps CMS annotations',()=>{
 const html=snapshot('<html><head><link rel="stylesheet" href="/_next/a.css"></head><body><script>secret()</script><iframe src="https://bad.test"></iframe><form><input></form><h1 data-cusi-copy="hero_es" data-cusi-field="heading" onclick="secret()">Hola</h1><img src="/flower.webp" srcset="/small.webp 400w, /big.webp 800w"></body></html>','https://www.cusiflores.com');
 assert.doesNotMatch(html,/<script|<iframe|<form|onclick/);assert.match(html,/https:\/\/www.cusiflores.com\/_next\/a.css/);assert.match(html,/data-cusi-copy="hero_es"/);assert.match(html,/https:\/\/www.cusiflores.com\/small.webp 400w/);
});
test('image uploads require actual supported file signatures',()=>{
 assert.equal(imageType(Buffer.from('<svg onload="alert()">')),null);assert.equal(imageType(Buffer.from([255,216,255,0])), 'image/jpeg');assert.equal(imageType(Buffer.from('not an image')),null);
});
