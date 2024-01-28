import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  await app.emailPasswordAuth.registerUser({
    email: 'someone@example.com',
    password: 'Pa55w0rd!',
  });
}
