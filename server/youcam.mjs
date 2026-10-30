import { createHmac, timingSafeEqual } from "node:crypto";
import { readSkinAge } from "./skin-age.mjs";
import { taskError } from "./task-error.mjs";
const BASE = "https://yce-api-01.makeupar.com/s2s/v2.0";
const actions = [
  "moisture",
  "age_spot",
  "dark_circle_v2",
  "wrinkle",
  "texture",
];
const fail = (message, status = 400) =>
  Object.assign(new Error(message), { status });
const key = () => {
  if (!process.env.YOUCAM_API_KEY)
    throw fail(
      "Live API is not configured. You can still explore the demo.",
      503,
    );
  return process.env.YOUCAM_API_KEY;
};
function sign(resource) {
  const value = Buffer.from(
    JSON.stringify({ ...resource, expires: Date.now() + 60 * 60 * 1000 }),
  ).toString("base64url");
  return (
    value + "." + createHmac("sha256", key()).update(value).digest("base64url")
  );
}
function verify(token, kind) {
  try {
    const [value, signature] = String(token).split(".");
    const expected = createHmac("sha256", key()).update(value).digest();
    const supplied = Buffer.from(signature, "base64url");
    if (
      expected.length !== supplied.length ||
      !timingSafeEqual(expected, supplied)
    )
      throw Error();
    const item = JSON.parse(Buffer.from(value, "base64url"));
    if (item.kind !== kind || item.expires < Date.now()) throw Error();
    return item;
  } catch {
    throw fail("This photo session expired. Upload your selfie again.");
  }
}
export async function request(path, body) {
  let response;
  try {
    response = await fetch(BASE + path, {
      method: body ? "POST" : "GET",
      headers: {
        Authorization: `Bearer ${key()}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(30000),
    });
  } catch (e) {
    if (e.status) throw e;
    throw fail("YouCam could not be reached. Please try again.", 502);
  }
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.status >= 400) {
    const code = payload.error_code || "";
    if (response.status === 401 || /InvalidApiKey/i.test(code))
      throw fail(
        "YouCam could not authenticate. Check the server API key.",
        502,
      );
    if (/Credit|Unit|Balance/i.test(code))
      throw fail(
        "YouCam credits are insufficient. Please check your API account.",
        402,
      );
    if (response.status === 429)
      throw fail(
        "YouCam is busy. Please wait a moment before trying again.",
        429,
      );
    throw fail(
      `YouCam rejected the request${/^[\w-]{1,80}$/.test(code) ? ` (${code})` : ""}. Check photo quality and API access.`,
      502,
    );
  }
  return payload.data;
}
function safeUrl(value) {
  try {
    const u = new URL(value);
    if (
      u.protocol !== "https:" ||
      ![
        "makeupar.com",
        "amazonaws.com",
        "cloudfront.net",
        "perfectcorp.com",
      ].some((d) => u.hostname === d || u.hostname.endsWith("." + d))
    )
      throw Error();
    return u.href;
  } catch {
    throw fail("YouCam returned an unsupported result URL.", 502);
  }
}
function scores(result) {
  const output = result?.output;
  if (!Array.isArray(output))
    throw fail(
      "YouCam returned no readable skin scores. Try another photo.",
      502,
    );
  return actions.map((type) => {
    const item = output.find((x) => x.type === type);
    const score = item?.ui_score ?? item?.whole?.ui_score;
    return {
      type,
      score:
        typeof score === "number" && Number.isFinite(score)
          ? Math.round(Math.max(0, Math.min(100, score)))
          : null,
    };
  });
}
export async function execute(op, body = {}) {
  if (op === "config")
    return { configured: Boolean(process.env.YOUCAM_API_KEY) };
  if (op === "upload") {
    if (
      typeof body.image !== "string" ||
      !/^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(body.image)
    )
      throw fail("Please upload a valid JPEG photo.");
    const bytes = Buffer.from(body.image.split(",")[1], "base64");
    if (
      bytes.length < 100 ||
      bytes.length > 2800000 ||
      bytes[0] !== 255 ||
      bytes[1] !== 216
    )
      throw fail("The prepared image is invalid or too large.");
    const result = await request("/file", {
      files: [
        {
          content_type: "image/jpeg",
          file_name: "selfie.jpg",
          file_size: bytes.length,
        },
      ],
    });
    const file = result?.files?.[0];
    if (!file?.file_id || !file.requests?.length)
      throw fail("Could not initialize the photo upload.", 502);
    for (const upload of file.requests) {
      const url = safeUrl(upload.url);
      if (upload.method !== "PUT")
        throw fail("Unsupported upload method.", 502);
      const response = await fetch(url, {
        method: "PUT",
        headers: upload.headers,
        body: bytes,
        signal: AbortSignal.timeout(30000),
      });
      if (!response.ok)
        throw fail("Photo upload failed. Please try again.", 502);
    }
    return { photoToken: sign({ kind: "photo", id: file.file_id }) };
  }
  if (op === "start") {
    const photo = verify(body.photoToken, "photo");
    if (!["skin", "makeup"].includes(body.type))
      throw fail("Unknown analysis type.");
    const path = body.type === "skin" ? "skin-analysis" : "makeup-vto";
    let payload = { src_file_id: photo.id };
    if (body.type === "skin")
      payload = { ...payload, dst_actions: actions, format: "json" };
    else {
      if (
        !/^#[\da-f]{6}$/i.test(body.lip) ||
        !/^#[\da-f]{6}$/i.test(body.blush) ||
        !Number.isInteger(body.intensity) ||
        body.intensity < 0 ||
        body.intensity > 100
      )
        throw fail("Choose valid makeup colors and intensity.");
      payload = {
        ...payload,
        version: "1.0",
        effects: [
          {
            category: "skin_smooth",
            skinSmoothStrength: 0,
            skinSmoothColorIntensity: 0,
          },
          {
            category: "lip_color",
            shape: { name: "original" },
            style: { type: "full" },
            palettes: [
              {
                color: body.lip,
                texture: "matte",
                colorIntensity: body.intensity,
              },
            ],
          },
          {
            category: "blush",
            pattern: { name: "1color1" },
            palettes: [
              {
                color: body.blush,
                texture: "matte",
                colorIntensity: body.intensity,
              },
            ],
          },
        ],
      };
    }
    const data = await request("/task/" + path, payload);
    if (!data?.task_id)
      throw fail("YouCam did not return a task identifier.", 502);
    return { taskToken: sign({ kind: "task", id: data.task_id, path }) };
  }
  if (op === "poll") {
    const task = verify(body.taskToken, "task");
    const data = await request(
      "/task/" + task.path + "/" + encodeURIComponent(task.id),
    );
    if (data.task_status === "error") {
      throw taskError(data);
    }
    if (data.task_status !== "success") return { status: "processing" };
    if (task.path === "skin-analysis")
      return { status: "success", scores: scores(data.results), skinAge: readSkinAge(data.results) };
    const result = data.results;
    const url =
      result?.url ||
      result?.download_url ||
      result?.[0]?.download_url ||
      result?.[0]?.url;
    if (!url) throw fail("YouCam returned no makeup image.", 502);
    return { status: "success", imageUrl: safeUrl(url) };
  }
  throw fail("Unknown operation.", 404);
}
export async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  try {
    if (req.headers["sec-fetch-site"] === "cross-site")
      throw fail("Cross-site requests are not allowed.", 403);
    const url = new URL(req.url, "http://localhost");
    const op = url.searchParams.get("op");
    if (op === "config" && req.method === "GET") {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(await execute("config")));
      return;
    }
    if (req.method !== "POST") throw fail("Method not allowed.", 405);
    if (!String(req.headers["content-type"]).includes("application/json"))
      throw fail("JSON required.", 415);
    let body = req.body;
    if (!body) {
      let chunks = [],
        size = 0;
      for await (const chunk of req) {
        size += chunk.length;
        if (size > 4000000) throw fail("Photo is too large.", 413);
        chunks.push(chunk);
      }
      try {
        body = JSON.parse(Buffer.concat(chunks).toString());
      } catch {
        throw fail("Invalid request.");
      }
    }
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        throw fail("Invalid request.");
      }
    }
    const result = await execute(op, body);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(result));
  } catch (error) {
    res.statusCode = error.status || 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        error: error.status
          ? error.message
          : "Unable to complete the request. Please try again.",
      }),
    );
  }
}
