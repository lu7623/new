import { createHmac } from 'crypto';
const secretKey = 'aufff';

function generateToken(payload: object) {
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

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (username === 'admin' && password === 'admin') {
    const token = generateToken({
      userId: (username.length % 3) + (1 + Math.ceil(Math.random() * 5)),
      exp: Math.floor(Date.now() / 1000) + 3600,
    });

    return Response.json({ token: token });
  } else {
    return new Response(`Authorization error`, {
      status: 400,
    });
  }
}
