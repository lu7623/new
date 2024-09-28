import { createHmac } from 'crypto';
const secretKey = 'aufff';

export function generateToken(payload: object) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    .toString('base64')
    .replace(/=/g, '');
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64').replace(/=/g, '');
  const signature = createHmac('sha256', secretKey)
    .update(`${header}.${payloadBase64}`)
    .digest('base64')
    .replace(/=/g, '');

  return `${header}.${payloadBase64}.${signature}`;
}
