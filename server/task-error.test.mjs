import test from 'node:test';
import assert from 'node:assert/strict';
import {taskError} from './task-error.mjs';

test('download and decoding failures do not blame photo pose or lighting',()=>{
  assert.match(taskError({error:'error_download_image'}).message,/could not retrieve/);
  assert.match(taskError({error:'error_decode_image'}).message,/could not decode/);
  assert.match(taskError({error:'error_src_face_too_small'}).message,/Crop the existing photo/);
  assert.match(taskError({error:{code:'error_no_face'}}).message,/did not detect a face/);
});
test('unrecognized vendor content is not echoed as private data',()=>{
  const message=taskError({error:'https://private.example/photo?secret=abc'}).message;
  assert.doesNotMatch(message,/private|secret|abc/);
  assert.match(message,/does not establish/);
});
