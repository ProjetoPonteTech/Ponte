import { useState } from "react";
import type { ContentTypeId } from "../../../data/contentTypes";
import type { ContentDrafts, ContentUpdate } from "../../../types/access-content";
import { FileInput } from "./file-input";
import { UrlInput } from "./url-input";
import styles from "./content-input.module.css";

type ContentInputStepProps = {
  contentType: ContentTypeId;
  content: ContentDrafts;
  onChange: (update: ContentUpdate) => void;
};

export function ContentInputStep({ contentType, content, onChange }: ContentInputStepProps) {
  const [textTouched, setTextTouched] = useState(false);

  function renderInput() {
    switch (contentType) {
      case "document":
      case "image":
        return <FileInput key={contentType} kind={contentType} file={content[contentType]} onChange={(file) => onChange({ contentType, content: file })} />;
      case "website":
      case "multimedia":
        return <UrlInput key={contentType} label={contentType === "website" ? "Endereço do site" : "Link do conteúdo multimídia"} value={content[contentType]} onChange={(value) => onChange({ contentType, content: value })} />;
      case "text": {
        const textInvalid = textTouched && content.text.trim().length === 0;

        return (
          <div className={styles.field}>
            <label htmlFor="content-text" className={styles.label}>Texto que você quer adaptar</label>
            <textarea
              id="content-text"
              className={`${styles.input} ${styles.textarea}`}
              rows={10}
              placeholder="Cole ou escreva aqui o conteúdo que você quer adaptar."
              value={content.text}
              onChange={(event) => onChange({ contentType: "text", content: event.target.value })}
              onBlur={() => setTextTouched(true)}
              required
              aria-invalid={textInvalid}
              aria-describedby="content-text-hint content-text-error"
            />
            <p id="content-text-hint" className={styles.hint}>
              Informe o texto que você quer adaptar. Este campo é obrigatório.
            </p>
            <p id="content-text-error" className={styles.error} role="alert">
              {textInvalid ? "Informe o texto que você quer adaptar." : ""}
            </p>
          </div>
        );
      }
    }
  }

  return (
    <>
      <p className={styles.support}>Envie ou informe o conteúdo que você quer adaptar.</p>
      {renderInput()}
      <p id="content-input-instruction" className={styles.instruction}>
        Adicione um conteúdo válido para continuar.
      </p>
    </>
  );
}
