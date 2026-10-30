const messages = {
  error_src_face_too_small: 'Your face is too small in the uploaded image. Crop the existing photo closer so your face fills most of the frame.',
  error_face_position_too_small: 'Your face is too small in the uploaded image. Crop the existing photo closer so your face fills most of the frame.',
  error_src_face_out_of_bound: 'Part of your face is outside the uploaded image. Choose a crop that includes your entire forehead and chin.',
  error_face_position_out_of_boundary: 'Part of your face is outside the uploaded image. Choose a crop that includes your entire forehead and chin.',
  error_no_face: 'YouCam did not detect a face in the uploaded image. Check the photo preview and try a closer crop.',
  error_lighting_dark: 'YouCam reported insufficient lighting in the uploaded image.',
  error_insufficient_lighting: 'YouCam reported insufficient lighting in the uploaded image.',
  error_below_min_image_size: 'YouCam reported that the uploaded image resolution is too low.',
  error_decode_image: 'YouCam could not decode the uploaded image. Try saving it as a JPG before uploading.',
  error_download_image: 'YouCam could not retrieve the uploaded image. Please retry the analysis.',
};

export function taskError(data) {
  // Return only an explicit vendor identifier, never raw messages, URLs or task IDs.
  const values = [data.error, data.error_code, data.failure_reason, data.error?.code, data.error?.error_code];
  const code = values.find(value => typeof value === 'string' && /^error_[a-z0-9_]{1,80}$/.test(value));
  const message = messages[code] || 'YouCam could not complete this analysis. This does not establish that your photo is unsuitable. Please retry or share this error code with support.';
  return Object.assign(new Error(message + (code ? ` (YouCam: ${code})` : '')), {status:422});
}
