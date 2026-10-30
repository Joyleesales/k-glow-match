import test from 'node:test';
import assert from 'node:assert/strict';
import { readSkinAge } from './skin-age.mjs';

test('skin age is read only from an explicit vendor age, never from concern scores', () => {
 assert.equal(readSkinAge({skin_age:52,output:[]}),52);
 assert.equal(readSkinAge({score_info:{skin_age:37}}),37);
 assert.equal(readSkinAge({output:{skin_age:41}}),41);
 assert.equal(readSkinAge({output:[{type:'skin_age',value:48}]}),48);
 assert.equal(readSkinAge({output:[{type:'moisture',ui_score:79},{type:'skin_age',score:52}]}),52);
 assert.equal(readSkinAge({output:[{type:'wrinkle',score:97},{type:'all',score:88}]}),null);
 for (const result of [undefined,{}, {output:[{type:'wrinkle',ui_score:52}]}, {output:[{type:'skin_age',ui_score:52}]}, {skin_age:null}, {skin_age:'52'}, {skin_age:NaN}, {skin_age:Infinity}, {skin_age:-1}]) assert.equal(readSkinAge(result),null);
});
