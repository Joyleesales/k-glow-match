// Uses the vendor's public sample photo only; never reads a personal selfie.
import {loadEnv} from 'vite';
import {execute as localExecute} from '../server/youcam.mjs';
const base = process.env.VERIFY_BASE_URL;
if (!base) Object.assign(process.env,loadEnv('development',process.cwd(),'YOUCAM_'));
async function execute(op, body) {
 if (!base) return localExecute(op, body);
 const response = await fetch(new URL('/api/youcam?op='+op, base), {
  method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body), signal:AbortSignal.timeout(60000)
 });
 const result = await response.json();
 if (!response.ok) throw Object.assign(Error(result.error || 'Hosted API request failed.'), {status:response.status});
 return result;
}
try {
 const response=await fetch('https://plugins-media.makeupar.com/strapi/assets/sample_Image_1_202b6bf6e6.jpg');
 if(!response.ok)throw Error('Vendor sample could not be downloaded.');
 const image='data:image/jpeg;base64,'+Buffer.from(await response.arrayBuffer()).toString('base64');
 const {photoToken}=await execute('upload',{image});console.log('Photo upload: passed (vendor public sample).');
 for(const type of ['skin','makeup']){
  const {taskToken}=await execute('start',{type,photoToken,lip:'#b45c70',blush:'#d88c90',intensity:55});console.log(type+': task accepted.');
  const deadline=Date.now()+180000;let complete=false;
  while(Date.now()<deadline){await new Promise(r=>setTimeout(r,4000));const data=await execute('poll',{taskToken});if(data.status==='success'){console.log(type+': completed. '+(data.scores?JSON.stringify(data.scores):'Result image URL received (not printed).'));complete=true;break}}
  if(!complete)throw Error(type+': polling timed out.');
 }
}catch(e){console.log('Verification incomplete: '+(e.status?e.message:'Network or unexpected response error.'));process.exitCode=1}
