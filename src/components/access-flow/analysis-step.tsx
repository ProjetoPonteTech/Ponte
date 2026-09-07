import { useEffect, useState } from "react";
import styles from "./analysis-step.module.css";

const PHASES = [
  "Verificando o conteúdo",
  "Identificando possíveis barreiras",
  "Preparando adaptações",
];

export function AnalysisStep({ error }: { error: string | null }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 1600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      <p className={styles.support}>A PONTE está avaliando o conteúdo e as necessidades que você informou.</p>
      <p className={styles.note}>Análise simulada para demonstração.</p>
      <ol className={styles.phases} aria-label="Progresso da análise simulada">
        {PHASES.map((label, index) => (
          <li key={label} className={styles.phase} aria-current={index === phase ? "step" : undefined}>
            <span className={styles.number} aria-hidden="true">{index < phase ? "✓" : index + 1}</span>
            <div>
              <p className={styles.label}>{label}</p>
              <p className={styles.status}>{index < phase ? "Concluído" : index === phase ? "Em andamento" : "A seguir"}</p>
            </div>
            {!error && index === phase && <span className={styles.spinner} aria-hidden="true" />}
          </li>
        ))}
      </ol>
      {error ? <p role="alert" className={styles.note}>{error}</p> : (
        <p className={styles.note}>Você seguirá automaticamente para a próxima etapa.</p>
      )}
    </>
  );
}
