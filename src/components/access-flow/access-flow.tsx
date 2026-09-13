import type { ReactNode } from "react";
import { PonteLogo } from "../ponte-logo";
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
        <PonteLogo />
        <details className="help">
          <summary><span className="help-icon" aria-hidden="true">?</span>Ajuda</summary>
          <div className="help-content">
            <p className="help-title">Como navegar</p>
            <p>Use “Continuar” para avançar e “Voltar” para retornar à etapa anterior.</p>
            <p>Use Tab para navegar, Espaço para marcar opções e Enter para ativar botões. No tipo de conteúdo, use as setas para alternar entre opções. Selecione “Ajuda” novamente para fechar.</p>
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

        {activeStep !== "result" && <nav className={styles.navigation} aria-label="Navegação entre etapas">
          {stepIndex > 0 && (
            <button type="button" className={styles.back} onClick={onBack}>Voltar</button>
          )}
          {stepIndex < ACCESS_STEPS.length - 1 && activeStep !== "analysis" && (
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
                    : activeStep === "content-input"
                      ? "content-input-instruction"
                      : undefined
              }
            >Continuar</button>
          )}
        </nav>}
      </main>
    </div>
  );
}
