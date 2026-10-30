export async function api(op, body) {
  let response;
  try {
    response = await fetch(`/api/youcam?op=${op}`, {
      method: body ? "POST" : "GET",
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(65000),
    });
  } catch {
    throw Error("The API server is unavailable. Please try again.");
  }
  let result;
  try {
    result = await response.json();
  } catch {
    throw Error(
      "The API server is unavailable. Run the app with its API server.",
    );
  }
  if (!response.ok) throw Error(result.error || "YouCam request failed.");
  return result;
}
export async function preparePhoto(file) {
  let bitmap;
  try {
    if (typeof createImageBitmap === 'function') bitmap = await createImageBitmap(file, {imageOrientation:'from-image'});
  } catch { /* Some mobile browsers need the native image decoder. */ }
  if (!bitmap) {
    const url = URL.createObjectURL(file);
    try {
      const image = new Image();
      await new Promise((resolve,reject) => { image.onload=resolve; image.onerror=reject; image.src=url; });
      bitmap = {width:image.naturalWidth,height:image.naturalHeight,image,close:()=>URL.revokeObjectURL(url)};
    } catch {
      URL.revokeObjectURL(url);
      throw Error('Your browser could not read this photo. Save it as a JPG and upload it again.');
    }
  }
  try {
    if (Math.min(bitmap.width, bitmap.height) < 480)
      throw Error("Choose a larger photo: at least 480 pixels on each side.");
    const scale = Math.min(1, 1000 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    if (Math.min(canvas.width, canvas.height) < 480)
      throw Error("Choose a less narrow photo with your full face visible.");
    canvas
      .getContext("2d")
      .drawImage(bitmap.image || bitmap, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.9);
  } finally {
    bitmap.close();
  }
}
export async function runTask(type, photoToken, settings, onProgress) {
  const { taskToken } = await api("start", { type, photoToken, ...settings });
  const deadline = Date.now() + 180000;
  onProgress?.("YouCam is processing your photo…");
  while (Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, 3000));
    const result = await api("poll", { taskToken });
    if (result.status === "success") return result;
  }
  throw Error("YouCam is taking longer than expected. Please try again later.");
}
