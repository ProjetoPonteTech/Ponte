import { useState } from "react";
import { isValidUrl } from "./validation";
import styles from "./content-input.module.css";

type UrlInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export function UrlInput({ label, value, onChange }: UrlInputProps) {
  const [touched, setTouched] = useState(false);
  const invalid = touched && value.length > 0 && !isValidUrl(value);

  return (
    <div className={styles.field}>
      <label htmlFor="content-url" className={styles.label}>{label}</label>
      <input
        id="content-url"
        className={styles.input}
        type="url"
        inputMode="url"
        autoCapitalize="none"
        spellCheck={false}
        placeholder="https://exemplo.com"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={() => setTouched(true)}
        aria-invalid={invalid}
        aria-describedby="url-hint url-error"
      />
      <p id="url-hint" className={styles.hint}>Informe o endereço completo, começando com https:// ou http://.</p>
      <p id="url-error" className={styles.error} role="alert">
        {invalid ? "Informe um endereço válido, como https://exemplo.com." : ""}
      </p>
    </div>
  );
}
