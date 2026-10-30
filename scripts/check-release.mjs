import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import {products} from '../src/catalog.js';
function files(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(join(dir,e.name)):[join(dir,e.name)])}
for(const p of products){if(!existsSync('public'+p.image))throw Error('Missing product asset: '+p.id)}
const finalShots=files('screenshots').filter(p=>/final-.*\.png$/.test(p));
if(finalShots.length<3)throw Error('At least three final screenshots are required.');
const env=existsSync('.env')?readFileSync('.env','utf8'):'';
const secrets=env.split(/\r?\n/).filter(l=>/^YOUCAM_(API|SECRET)_KEY\s*=/.test(l)).map(l=>l.split('=').slice(1).join('=').trim().replace(/^['"]|['"]$/g,'')).filter(v=>v.length>5);
for(const path of files('dist')){const content=readFileSync(path);for(const secret of secrets){if(content.includes(Buffer.from(secret)))throw Error('A private key was detected in the build.')}}
console.log(`Release check passed: ${products.length} product images, ${finalShots.length} final screenshots, no private keys in production assets.`);
