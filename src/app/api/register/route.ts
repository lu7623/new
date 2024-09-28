import { generateToken } from '../generateToken';

export async function POST(request: Request) {
  const { email } = await request.json();

  const token = generateToken({
    userId: (email.length % 3) + (1 + Math.ceil(Math.random() * 5)),
    exp: Math.floor(Date.now() / 1000) + 3600,
  });

  return Response.json({ token: token });
}
