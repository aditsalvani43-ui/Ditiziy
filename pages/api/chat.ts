// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

function ruleBasedResponse(input: string): string | null {
  const rules: { [key: string]: string } = {
    "halo": "Halo juga! Ada yang bisa dibantu?",
    "siapa kamu": "Saya chatbot AI sederhana.",
    "terima kasih": "Sama-sama!"
  };
  for (const key in rules) {
    if (input.toLowerCase().includes(key)) return rules[key];
  }
  return null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { message } = req.body;
  const ruleReply = ruleBasedResponse(message);
  if (ruleReply) return res.json({ reply: ruleReply });

  try {
    const resp = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: message}],
    });
    const aiReply = resp.data.choices[0].message?.content || "Maaf, terjadi error.";
    res.json({ reply: aiReply });
  } catch (e) {
    res.json({ reply: "Error koneksi atau API Key salah." });
  }
  }
