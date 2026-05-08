import OpenAI from "openai";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const defaultModel = process.env.OPENAI_MODEL || "gpt-4o-mini";

export async function generateAiResponse({
  prompt,
  fallback,
}: {
  prompt: string;
  fallback: string;
}) {
  if (!openai) {
    return {
      content: fallback,
      model: "mock-fallback",
      mock: true,
    };
  }

  try {
    const completion = await openai.responses.create({
      model: defaultModel,
      input: prompt,
      temperature: 0.2,
    });

    const content = completion.output_text?.trim() || fallback;

    return {
      content,
      model: defaultModel,
      mock: false,
    };
  } catch {
    return {
      content: fallback,
      model: "error-fallback",
      mock: true,
    };
  }
}
