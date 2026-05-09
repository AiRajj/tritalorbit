export type AiAgentResult = {
  summary: string;
  bullets: string[];
  confidence: number;
  mock: boolean;
};

export async function runMockAiAgent(agent: string, prompt: string): Promise<AiAgentResult> {
  return {
    summary: `${agent} generated fallback guidance while AI credentials are unavailable.`,
    bullets: [
      'Prioritize assignment readiness blockers first.',
      'Allocate mobility support where candidate friction is highest.',
      `Context considered: ${prompt.slice(0, 90)}`
    ],
    confidence: 0.79,
    mock: true
  };
}
