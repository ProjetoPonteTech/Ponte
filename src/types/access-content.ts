import type { ContentTypeId } from "../data/contentTypes";

export type ContentDrafts = {
  document: File | null;
  website: string;
  text: string;
  image: File | null;
  multimedia: string;
};

export type ContentUpdate = {
  [Type in ContentTypeId]: { contentType: Type; content: ContentDrafts[Type] };
}[ContentTypeId];

export const EMPTY_CONTENT: ContentDrafts = {
  document: null,
  website: "",
  text: "",
  image: null,
  multimedia: "",
};
