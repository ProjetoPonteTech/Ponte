import { BARRIERS, type BarrierId } from "../../data/barriers";
import { BarrierCard } from "./barrier-card";
import styles from "./barriers.module.css";

type BarriersStepProps = {
  selectedBarriers: readonly BarrierId[];
  onToggle: (id: BarrierId) => void;
};

export function BarriersStep({ selectedBarriers, onToggle }: BarriersStepProps) {
  return (
    <>
      <p className={styles.support}>
        Você não precisa explicar uma deficiência. Basta nos contar o que está difícil.
      </p>
      <fieldset className={styles.options}>
        <legend className={styles.legend}>Você pode escolher mais de uma opção.</legend>
        <div className={styles.grid}>
          {BARRIERS.map((barrier) => (
            <BarrierCard
              key={barrier.id}
              barrier={barrier}
              selected={selectedBarriers.includes(barrier.id)}
              onToggle={() => onToggle(barrier.id)}
            />
          ))}
        </div>
      </fieldset>
      <p id="barriers-instruction" className={styles.instruction}>
        Escolha pelo menos uma opção para continuar.
      </p>
    </>
  );
}
