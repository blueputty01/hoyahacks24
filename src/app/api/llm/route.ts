import { NextRequest, NextResponse } from 'next/server';
import { pull, push } from 'utils/db';

export interface Env {
  AI: any;
}

async function run(model: string, input: any) {
  if (!process.env.CF_TOKEN) {
    throw new Error('Missing CF_TOKEN');
  }

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

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const uid = searchParams.get('uid');
  console.log(uid);
  const previous_questions = (await pull(uid ?? '')) as string[];
  console.log(previous_questions);
  return NextResponse.json(previous_questions ?? []);
}

export async function POST(req: NextRequest) {
  const request = JSON.parse(await req.text()) as any;
  const { message, userId } = request;

  let previous_questions = (await pull(userId)) as any[];

  const prev_messages = previous_questions.map(({ message }) => ({
    role: 'user',
    content: message,
  }));

  const result = await run('@cf/meta/llama-2-7b-chat-fp16', {
    messages: [
      {
        role: 'system',
        content:
          'You are SeCUREPod, also known as Eric, a helpful and friendly chat bot that provides advice to the elderly on how to be safe on the Internet. You respond in a short, succinct, and understandable way. Please keep your responses less than 50 words. If you decide a password manager is necessary for the user, please recommend KeePassXC through https://keepassxc.org/. Do not recommend it if the user does not ask.',
      },
      ...prev_messages,
      { role: 'user', content: message },
    ],
  });

  if (result.success) {
    const llmResponse = result.result.response;
    await push(userId, message, llmResponse);
  }

  return NextResponse.json(result);
}
