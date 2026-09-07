import type { BarrierId } from "../data/barriers";
import type { ContentTypeId } from "../data/contentTypes";

export type AnalysisInput = {
  barriers: readonly BarrierId[];
  contentType: ContentTypeId;
  content: File | string | null;
};

export type AnalysisResult = {
  simulated: true;
  contentType: ContentTypeId;
  detectedBarriers: BarrierId[];
  suggestedAdaptations: { barrier: BarrierId; suggestions: string[] }[];
  analysisSummary: string;
};

export const ANALYSIS_DURATION_MS = 2500;

const ADAPTATIONS: Record<BarrierId, readonly string[]> = {
  seeing: [
    "Melhorar contraste",
    "Aumentar legibilidade",
    "Melhorar tamanho e espaçamento do texto",
    "Reforçar hierarquia visual",
  ],
  understanding: [
    "Simplificar linguagem",
    "Organizar conteúdo em seções",
    "Destacar informações importantes",
    "Reduzir blocos longos de texto",
  ],
  navigation: ["Organizar a navegação pelo conteúdo", "Facilitar a identificação dos controles"],
  "alternative-access": ["Sugerir uma representação alternativa do conteúdo"],
  language: ["Sugerir linguagem mais familiar", "Oferecer uma possibilidade de tradução"],
  unsure: ["Explorar alternativas de apresentação do conteúdo", "Orientar a escolha de adaptações"],
};

// Regras demonstrativas: não leem arquivos, não acessam links e não detectam
// características reais do conteúdo. A assinatura pode receber uma API no futuro.
export async function analyzeContent(
  input: AnalysisInput,
  { signal }: { signal?: AbortSignal } = {},
): Promise<AnalysisResult> {
  if (!input.content || (typeof input.content === "string" && !input.content.trim())) {
    throw new Error("Adicione um conteúdo antes de iniciar a análise.");
  }

  await new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Análise cancelada", "AbortError"));
      return;
    }
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", cancel);
      resolve();
    }, ANALYSIS_DURATION_MS);
    function cancel() {
      clearTimeout(timer);
      reject(new DOMException("Análise cancelada", "AbortError"));
    }
    signal?.addEventListener("abort", cancel, { once: true });
  });

  const barriers = [...new Set(input.barriers)];
  return {
    simulated: true,
    contentType: input.contentType,
    detectedBarriers: barriers,
    suggestedAdaptations: barriers.map((barrier) => ({
      barrier,
      suggestions: [...ADAPTATIONS[barrier]],
    })),
    analysisSummary:
      "Simulação baseada nas necessidades informadas. As sugestões são possibilidades de adaptação; o conteúdo não foi analisado ou alterado.",
  };
}
