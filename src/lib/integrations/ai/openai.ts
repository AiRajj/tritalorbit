import { runAiAgent } from '@/lib/services/ai';
import { runMockAiAgent, type AiAgentResult } from './mockAI';

export async function runIntegrationAiAgent(agent: string, prompt: string): Promise<AiAgentResult> {
  if (!process.env.OPENAI_API_KEY) {
    return runMockAiAgent(agent, prompt);
  }

  const result = await runAiAgent(agent, prompt);
  return {
    summary: result.summary,
    bullets: result.bullets,
    confidence: result.mock ? 0.74 : 0.89,
    mock: result.mock
  };
}
