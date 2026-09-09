import type { Barrier } from "../../data/barriers";
import styles from "./barriers.module.css";

type BarrierCardProps = {
  barrier: Barrier;
  selected: boolean;
  onToggle: () => void;
};

export function BarrierCard({ barrier, selected, onToggle }: BarrierCardProps) {
  const titleId = `barrier-${barrier.id}-title`;
  const descriptionId = `barrier-${barrier.id}-description`;

  return (
    <label className={styles.card} data-selected={selected}>
      <input
        className={styles.checkbox}
        type="checkbox"
        name="barriers"
        value={barrier.id}
        checked={selected}
        onChange={onToggle}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      />
      <span className={styles.cardContent}>
        <span id={titleId} className={styles.cardTitle}>{barrier.title}</span>
        <span id={descriptionId} className={styles.description}>{barrier.description}</span>
        <span className={styles.selection} aria-hidden="true">
          {selected ? "Selecionada" : "Não selecionada"}
        </span>
      </span>
    </label>
  );
}
