import type { ContentType } from "../../data/contentTypes";
import styles from "./content-types.module.css";

type ContentTypeCardProps = {
  contentType: ContentType;
  selected: boolean;
  onSelect: () => void;
};

export function ContentTypeCard({ contentType, selected, onSelect }: ContentTypeCardProps) {
  return (
    <button
      type="button"
      className={styles.card}
      aria-pressed={selected}
      onClick={onSelect}
    >
      <span className={styles.indicator} aria-hidden="true">
        {selected && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className={styles.cardContent}>
        <span className={styles.label}>{contentType.label}</span>
        <span className={styles.selection} aria-hidden="true">Selecionado</span>
      </span>
    </button>
  );
}
