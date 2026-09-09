import type { ContentTypeId } from "../../../data/contentTypes";
import type { ContentDrafts } from "../../../types/access-content";

export function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value.trim());
    return ["http:", "https:"].includes(url.protocol) && Boolean(url.hostname);
  } catch {
    return false;
  }
}

export function fileError(file: File, kind: "document" | "image"): string | null {
  if (file.size === 0) return "Este arquivo está vazio. Escolha outro arquivo.";
  const extension = file.name.split(".").pop()?.toLowerCase();
  const allowed = kind === "document" ? ["pdf"] : ["jpg", "jpeg", "png", "webp", "gif", "avif", "bmp"];
  if (!extension || !allowed.includes(extension)) {
    return kind === "document"
      ? "Escolha um arquivo PDF."
      : "Escolha uma imagem JPG, PNG, WebP, GIF, AVIF ou BMP.";
  }
  return null;
}

export function hasValidContent(type: ContentTypeId | null, content: ContentDrafts): boolean {
  switch (type) {
    case "document":
    case "image": {
      const file = content[type];
      return file !== null && fileError(file, type) === null;
    }
    case "website":
    case "multimedia":
      return isValidUrl(content[type]);
    case "text":
      return content.text.trim().length > 0;
    default:
      return false;
  }
}
