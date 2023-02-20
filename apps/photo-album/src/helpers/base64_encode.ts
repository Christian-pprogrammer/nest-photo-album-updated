import { readFileSync } from 'fs';

export function base64_encode(file): string {
  // read binary data
  const bitmap = readFileSync(file);
  // convert binary data to base64 encoded string
  return Buffer.from(bitmap).toString('base64');
}
