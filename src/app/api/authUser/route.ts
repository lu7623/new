import { generateToken } from '../generateToken';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (username === 'admin@test.com' && password === 'Password1') {
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
