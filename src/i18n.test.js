import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { translate, translateTree, translateError, initialLanguage, messages } from './i18n.js';
import { products, metrics } from './catalog.js';
import { agePreferences } from './recommendations.js';
test('vendor diagnostic code survives Korean and Spanish error translation',()=>{
 for(const language of ['ko','es']){
  const source='YouCam could not retrieve the uploaded image. Please retry the analysis. (YouCam: error_download_image)';
  const result=translateError(source,language);
  assert.notEqual(result,source);
  assert.match(result,/\(YouCam: error_download_image\)$/);
 }
});

test('all localized messages and dynamic catalog copy work in Korean and Spanish', () => {
 for (const language of ['ko','es']) {
  for (const [key,value] of Object.entries(messages)) assert.ok(value[language], `${language}: ${key}`);
  for (const metric of metrics) {
   assert.notEqual(translate(metric.name,language),metric.name);
   assert.notEqual(translate(metric.description,language),metric.description);
  }
  for (const p of products) {
   assert.equal(translate(p.name,language),p.name);
   assert.equal(translate(p.brand,language),p.brand);
   assert.notEqual(translate(p.type,language),p.type);
   assert.notEqual(translate(`Add ${p.name} to bag`,language),`Add ${p.name} to bag`);
  }
  for (const [age,preference] of Object.entries(agePreferences)) {
   assert.notEqual(translate(`Refined for ${age}:`,language),`Refined for ${age}:`);
   assert.notEqual(translate(` · Refined for ${age}`,language),` · Refined for ${age}`);
   assert.notEqual(translate(preference.description,language),preference.description);
  }
  assert.notEqual(translate('Hydrating essence → Eye serum',language),'Hydrating essence → Eye serum');
  assert.notEqual(translateError('Unknown browser decoding error',language),'Unknown browser decoding error');
  assert.notEqual(translateError('YouCam rejected the request (error_no_face). Check photo quality and API access.',language),'YouCam rejected the request (error_no_face). Check photo quality and API access.');
 }
});
test('translation preserves form values, identity, handlers, prices and catalog names', () => {
 const onChange = () => {};
 const node = React.createElement('select',{value:'20s',onChange,'aria-label':'Your age range'},React.createElement('option',{value:'20s',key:'20s'},'20s'));
 const translated = translateTree(node,'ko');
 assert.equal(translated.props.value,'20s');
 assert.equal(translated.props.onChange,onChange);
 assert.equal(translated.props.children.props.value,'20s');
 assert.equal(translated.props.children.key,'20s');
 assert.match(renderToStaticMarkup(translated),/20대/);
 assert.equal(translate('$57.30','es'),'$57.30');
 assert.equal(translate('Your selfie','en'),'Your selfie');
});
test('device language defaults to English and safely handles blocked or invalid storage', () => {
 const previous = globalThis.localStorage;
 try {
  delete globalThis.localStorage;
  assert.equal(initialLanguage(),'en');
  globalThis.localStorage = {getItem: () => 'ko'};
  assert.equal(initialLanguage(),'ko');
  globalThis.localStorage = {getItem: () => 'es'};
  assert.equal(initialLanguage(),'es');
  globalThis.localStorage = {getItem: () => 'unexpected'};
  assert.equal(initialLanguage(),'en');
  globalThis.localStorage = {getItem: () => {throw Error('blocked')}};
  assert.equal(initialLanguage(),'en');
 } finally { if (previous === undefined) delete globalThis.localStorage; else globalThis.localStorage = previous; }
});
