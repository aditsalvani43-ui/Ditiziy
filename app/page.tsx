import ChatBox from '../components/ChatBox';

export default function HomePage() {
  return (
    <main>
      <h1 style={{ textAlign: 'center' }}>AI Chat Sederhana (Next.js 14)</h1>
      <ChatBox />
    </main>
  );
}


import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

export async function POST(request) {
  const { message } = await request.json();

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: message }]
  });

  const aiReply = response.data.choices[0].message.content;
  return NextResponse.json({ reply: aiReply });
                           }
