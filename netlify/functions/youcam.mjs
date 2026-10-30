import { handler } from "../../server/youcam.mjs";
export default async function (request) {
  const content = await request.text();
  if (content.length > 4000000)
    return Response.json({ error: "Photo is too large." }, { status: 413 });
  const req = {
    method: request.method,
    url: request.url,
    headers: Object.fromEntries(request.headers),
  };
  if (content) {
    try {
      req.body = JSON.parse(content);
    } catch {
      return Response.json({ error: "Invalid request." }, { status: 400 });
    }
  } else req.body = {};
  let output = "";
  const headers = new Headers();
  const res = {
    statusCode: 200,
    setHeader: (k, v) => headers.set(k, v),
    end: (value) => {
      output = value;
    },
  };
  await handler(req, res);
  return new Response(output, { status: res.statusCode, headers });
}
