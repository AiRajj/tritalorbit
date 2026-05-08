// Lightweight OpenAI-compatible client without the SDK to keep the surface small.
// If OPENAI_API_KEY is missing, callers should fall back to mock responses.

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export async function openaiChat(
  messages: ChatMessage[],
  opts: { model?: string; temperature?: number; jsonMode?: boolean } = {},
): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  const model = opts.model || process.env.OPENAI_MODEL || "gpt-4o-mini";

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: opts.temperature ?? 0.4,
        response_format: opts.jsonMode ? { type: "json_object" } : undefined,
      }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    return data.choices?.[0]?.message?.content ?? null;
  } catch {
    return null;
  }
}

export function isAIConfigured() {
  return Boolean(process.env.OPENAI_API_KEY);
}
