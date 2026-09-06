import Link from "next/link";
import type { ReactNode } from "react";
import { ACCESS_STEPS, type AccessStep } from "./steps";
import styles from "./access-flow.module.css";

type AccessFlowProps = {
  activeStep: AccessStep;
  onBack: () => void;
  onContinue: () => void;
  continueDisabled?: boolean;
  children: ReactNode;
};

export function AccessFlow({
  activeStep,
  onBack,
  onContinue,
  continueDisabled = false,
  children,
}: AccessFlowProps) {
  const stepIndex = ACCESS_STEPS.findIndex((step) => step.id === activeStep);
  const currentStep = ACCESS_STEPS[stepIndex];

  return (
    <div className={`home ${styles.flow}`}>
      <a className="skip-link" href="#conteudo-acesso">Pular para o conteúdo</a>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="PONTE — início">
          <svg width="36" height="32" viewBox="0 0 36 32" fill="none" aria-hidden="true">
            <path d="M4 28V17a14 14 0 0 1 28 0v11M4 18h28" stroke="currentColor" strokeWidth="4" />
            <path d="M18 18v10" stroke="var(--accent)" strokeWidth="4" />
          </svg>
          PONTE
        </Link>
        <details className="help">
          <summary><span className="help-icon" aria-hidden="true">?</span>Ajuda</summary>
          <div className="help-content">
            <p className="help-title">Como navegar</p>
            <p>Use “Continuar” para avançar e “Voltar” para retornar à etapa anterior.</p>
            <p>Você também pode usar Tab para navegar e Enter para selecionar. Selecione “Ajuda” novamente para fechar.</p>
          </div>
        </details>
      </header>

      <main id="conteudo-acesso" className={styles.main} tabIndex={-1}>
        <div className={styles.progress}>
          <p id="progresso-acesso">
            Etapa {stepIndex + 1} de {ACCESS_STEPS.length} — {currentStep.label}
          </p>
          <div className={styles.progressTrack} aria-hidden="true">
            {ACCESS_STEPS.map((step, index) => (
              <span key={step.id} className={index <= stepIndex ? styles.reached : undefined} />
            ))}
          </div>
        </div>

        <section className={styles.stage} aria-labelledby="titulo-etapa">
          {children}
        </section>

        <nav className={styles.navigation} aria-label="Navegação entre etapas">
          {stepIndex > 0 && (
            <button type="button" className={styles.back} onClick={onBack}>Voltar</button>
          )}
          {stepIndex < ACCESS_STEPS.length - 1 && (
            <button
              type="button"
              className={styles.next}
              onClick={onContinue}
              disabled={continueDisabled}
              aria-describedby={
                activeStep === "barriers"
                  ? "barriers-instruction"
                  : activeStep === "content-type"
                    ? "content-type-instruction"
                    : undefined
              }
            >Continuar</button>
          )}
        </nav>
      </main>
    </div>
  );
}
