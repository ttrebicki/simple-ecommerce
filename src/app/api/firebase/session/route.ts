import { adminAuth } from '@/lib/api/firebase_admin';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  try {
    await adminAuth.verifyIdToken(token);
  } catch (error) {
    return NextResponse.json({ error });
  }

  const res = NextResponse.json({ ok: true });

  res.cookies.set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 5,
    path: '/',
    sameSite: 'lax',
  });

  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });

  res.cookies.set({
    name: 'token',
    value: '',
    path: '/',
    expires: new Date(0),
  });
  return res;
}
