export const CONTENT_TYPES = [
  { id: "document", label: "Documento" },
  { id: "website", label: "Site" },
  { id: "text", label: "Texto" },
  { id: "image", label: "Imagem" },
  { id: "multimedia", label: "Conteúdo multimídia" },
] as const;

export type ContentType = (typeof CONTENT_TYPES)[number];
export type ContentTypeId = ContentType["id"];
