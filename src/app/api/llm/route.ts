import { NextRequest, NextResponse } from 'next/server';

export interface Env {
  AI: any;
}

async function run(model, input) {
  console.log(process.env.CF_TOKEN);

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/9dcbe3f76f2d54534c6aba213b8e7a81/ai/run/${model}`,
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
  console.log('hi');

  const result = await run('@cf/meta/llama-2-7b-chat-int8', {
    messages: [
      {
        role: 'system',
        content: 'You are a friendly assistant that helps write stories',
      },
      {
        role: 'user',
        content:
          'Write a short story about a llama that goes on a journey to find an orange cloud',
      },
    ],
  });

  return NextResponse.json(result);
}
