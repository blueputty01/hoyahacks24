import { NextRequest, NextResponse } from 'next/server';

export interface Env {
  AI: any;
}

async function run(model, input) {
  if (!process.env.CF_TOKEN) {
    throw new Error('Missing CF_TOKEN');
  }

  console.log(process.env.CF_TOKEN)

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT}/ai/run/${model}`,
    {
      headers: { Authorization: `Bearer ${process.env.CF_TOKEN}` },
      method: 'POST',
      body: JSON.stringify(input),
    }
  );
  const result = await response.json();
  return result;
}

export async function POST(req: NextRequest) {
  const request = JSON.parse(await req.text()) as any;
  const { messages } = request;

  const result = await run('@cf/meta/llama-2-7b-chat-int8', {
    messages: messages,
  });

  return NextResponse.json(result);
}
