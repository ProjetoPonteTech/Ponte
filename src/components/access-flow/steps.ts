export const ACCESS_STEPS = [
  { id: "barriers", label: "Barreiras" },
  { id: "content-type", label: "Tipo de conteúdo" },
  { id: "content-input", label: "Inserção do conteúdo" },
  { id: "analysis", label: "Análise" },
  { id: "result", label: "Resultado" },
] as const;

export type AccessStep = (typeof ACCESS_STEPS)[number]["id"];
