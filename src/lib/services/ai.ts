import OpenAI from "openai";
import { env } from "@/lib/env";

type AIResponse = {
  summary: string;
  bullets: string[];
  mock: boolean;
};

const client = env.openAiKey
  ? new OpenAI({ apiKey: env.openAiKey })
  : null;

function mockResponse(type: string): AIResponse {
  return {
    summary: `${type} response generated in safe fallback mode while AI credentials are not configured.`,
    bullets: [
      "Prioritize candidate confidence and assignment readiness in every outreach.",
      "Use concierge-backed mobility benefits to reduce acceptance friction.",
      "Escalate high-risk engagements early with proactive support."
    ],
    mock: true
  };
}

export async function runAiAgent(type: string, prompt: string): Promise<AIResponse> {
  if (!client) {
    return mockResponse(type);
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are TRITAL Orbit enterprise healthcare mobility AI. Return concise JSON with summary and bullets array."
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3
    });

    const content = completion.choices[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(content) as { summary?: string; bullets?: string[] };

    return {
      summary: parsed.summary ?? "AI response unavailable.",
      bullets: parsed.bullets ?? [],
      mock: false
    };
  } catch {
    return mockResponse(type);
  }
}
