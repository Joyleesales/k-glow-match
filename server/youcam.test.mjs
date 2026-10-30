import test from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { execute } from "./youcam.mjs";
import netlifyHandler from "../netlify/functions/youcam.mjs";
test("rejects tampered photo and task references before an API request", async () => {
  process.env.YOUCAM_API_KEY = "test-only";
  await assert.rejects(
    execute("start", { type: "skin", photoToken: "tampered" }),
    /session expired/,
  );
  await assert.rejects(
    execute("poll", { taskToken: "tampered" }),
    /session expired/,
  );
});
test("rejects non-JPEG input and oversized images", async () => {
  await assert.rejects(
    execute("upload", { image: "data:image/png;base64,AAAA" }),
    /valid JPEG/,
  );
  await assert.rejects(
    execute("upload", {
      image:
        "data:image/jpeg;base64," + Buffer.alloc(2800001).toString("base64"),
    }),
    /invalid or too large/,
  );
});
test("unknown operations fail closed", async () => {
  await assert.rejects(execute("arbitrary-endpoint"), /Unknown operation/);
});

test('Netlify adapter exposes configuration without credentials and rejects invalid JSON',async()=>{
 const status=await netlifyHandler(new Request('https://example.net/api/youcam?op=config'));
 assert.equal(status.status,200);
 assert.deepEqual(await status.json(),{configured:true});
 const invalid=await netlifyHandler(new Request('https://example.net/api/youcam?op=poll',{method:'POST',headers:{'Content-Type':'application/json'},body:'broken'}));
 assert.equal(invalid.status,400);
});

test('existing skin request is unchanged and explicit vendor age is forwarded or null', async () => {
 const originalFetch = globalThis.fetch;
 const value = Buffer.from(JSON.stringify({kind:'photo',id:'test-photo',expires:Date.now()+60000})).toString('base64url');
 const photoToken = value+'.'+createHmac('sha256',process.env.YOUCAM_API_KEY).update(value).digest('base64url');
 let requests = [], age = 52;
 globalThis.fetch = async (url,options) => {
  requests.push({url,options});
  return Response.json({data: options.method === 'POST' ? {task_id:'test-task'} : {
   task_status:'success',results:{...(age === null ? {} : {skin_age:age}),output:[{type:'moisture',ui_score:82}]}
  }});
 };
 try {
  const {taskToken} = await execute('start',{type:'skin',photoToken});
  assert.deepEqual(JSON.parse(requests[0].options.body),{src_file_id:'test-photo',dst_actions:['moisture','age_spot','dark_circle_v2','wrinkle','texture'],format:'json'});
  const result = await execute('poll',{taskToken});
  assert.equal(result.skinAge,52);
  assert.equal(result.scores[0].score,82);
  age = null;
  assert.equal((await execute('poll',{taskToken})).skinAge,null);
 } finally { globalThis.fetch = originalFetch; }
});
