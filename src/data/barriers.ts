export const BARRIERS = [
  {
    id: "seeing",
    title: "Está difícil de ver",
    description: "Ajustar tamanho, contraste e visualização.",
  },
  {
    id: "understanding",
    title: "Está difícil de entender",
    description: "Simplificar, organizar e facilitar a leitura.",
  },
  {
    id: "navigation",
    title: "Está difícil de navegar",
    description: "Facilitar controles e a forma de se mover pelo conteúdo.",
  },
  {
    id: "alternative-access",
    title: "Preciso acessar de outra forma",
    description: "Encontrar alternativas para receber o conteúdo.",
  },
  {
    id: "language",
    title: "O idioma está dificultando",
    description: "Adaptar a linguagem ou tradução.",
  },
  {
    id: "unsure",
    title: "Não sei o que preciso",
    description: "Deixe a PONTE me ajudar.",
  },
] as const;

export type Barrier = (typeof BARRIERS)[number];
export type BarrierId = Barrier["id"];
