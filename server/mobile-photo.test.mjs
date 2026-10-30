import test from 'node:test';
import assert from 'node:assert/strict';
import {preparePhoto} from '../src/youcam.js';
test('mobile Image fallback produces bounded JPEG and releases the object URL',async()=>{
 const originals={bitmap:globalThis.createImageBitmap,Image:globalThis.Image,document:globalThis.document,create:URL.createObjectURL,revoke:URL.revokeObjectURL};
 let revoked=0,drawn=0,canvas;
 try{
  globalThis.createImageBitmap=undefined;
  globalThis.Image=class{constructor(){this.naturalWidth=3000;this.naturalHeight=4000}set src(v){queueMicrotask(()=>this.onload())}};
  URL.createObjectURL=()=> 'blob:local-only';URL.revokeObjectURL=()=>revoked++;
  globalThis.document={createElement:()=>canvas={getContext:()=>({drawImage:()=>drawn++}),toDataURL:(type,quality)=>{assert.equal(type,'image/jpeg');assert.equal(quality,.9);return 'data:image/jpeg;base64,fixture'}}};
  const result=await preparePhoto({type:'image/heic',name:'camera.HEIC',size:3000000});
  assert.match(result,/^data:image\/jpeg/);assert.equal(canvas.width,750);assert.equal(canvas.height,1000);assert.equal(drawn,1);assert.equal(revoked,1);
 }finally{
  globalThis.createImageBitmap=originals.bitmap;globalThis.Image=originals.Image;globalThis.document=originals.document;URL.createObjectURL=originals.create;URL.revokeObjectURL=originals.revoke;
 }
});

