import { useRef, useState } from "react";
import { fileError } from "./validation";
import styles from "./content-input.module.css";

type FileInputProps = {
  kind: "document" | "image";
  file: File | null;
  onChange: (file: File | null) => void;
};

export function FileInput({ kind, file, onChange }: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const isDocument = kind === "document";

  function selectFiles(files: FileList | null) {
    if (!files?.length) return;
    const nextError = files.length > 1 ? "Escolha apenas um arquivo por vez." : fileError(files[0], kind);
    setError(nextError);
    onChange(nextError ? null : files[0]);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className={styles.field}>
      <label
        className={styles.dropArea}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          selectFiles(event.dataTransfer.files);
          inputRef.current?.focus();
        }}
      >
        <span className={styles.label}>{isDocument ? "Documento em PDF" : "Arquivo de imagem"}</span>
        <span>{file ? "Trocar arquivo" : "Escolher arquivo"}</span>
        <span className={styles.hint}>Ou arraste um arquivo para esta área.</span>
        <input
          ref={inputRef}
          className={styles.fileInput}
          type="file"
          accept={isDocument ? ".pdf,application/pdf" : ".jpg,.jpeg,.png,.webp,.gif,.avif,.bmp"}
          aria-label={file ? "Trocar arquivo" : isDocument ? "Escolher documento PDF" : "Escolher imagem"}
          aria-describedby="file-formats file-selection file-error"
          aria-invalid={Boolean(error)}
          onChange={(event) => selectFiles(event.currentTarget.files)}
        />
      </label>
      <p id="file-formats" className={styles.hint}>
        {isDocument ? "Formato aceito: PDF." : "Formatos aceitos: JPG, PNG, WebP, GIF, AVIF e BMP."}
      </p>
      <p id="file-selection" className={styles.fileName} role="status">
        {file ? `Arquivo selecionado: ${file.name}` : "Nenhum arquivo selecionado."}
      </p>
      <p id="file-error" className={styles.error} role="alert">{error}</p>
      {file && (
        <button
          className={styles.remove}
          type="button"
          onClick={() => {
            onChange(null);
            setError(null);
            if (inputRef.current) {
              inputRef.current.value = "";
              inputRef.current.focus();
            }
          }}
        >Remover arquivo</button>
      )}
    </div>
  );
}
