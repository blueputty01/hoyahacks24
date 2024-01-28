import { NextRequest, NextResponse } from 'next/server';
import { pull, push } from 'utils/db';

export interface Env {
  AI: any;
}

async function run(model: string, input: any) {
  if (!process.env.CF_TOKEN) {
    throw new Error('Missing CF_TOKEN');
  }

  console.log(process.env.CF_TOKEN);

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
  const { message, user_id } = request;

  let previous_questions = (await pull(user_id)) as string[];
  const prev_messages = previous_questions.map((m) => ({
    role: 'user',
    content: m,
  }));

  const result = await run('@cf/meta/llama-2-7b-chat-fp16', {
    messages: [
      {
        role: 'system',
        content:
          'You are SecurePod, a helpful and friendly chat bot that provides advice to the elderly on how to be safe on the Internet. You respond in a short, succinct, and understandable way. Please keep your responses less than 50 words.',
      },
      ...prev_messages,
      { role: 'user', content: message },
    ],
  });

  await push(user_id, message, result.result.response);

  return NextResponse.json(result);
}
