"use client";

import { useEffect, useRef, useState } from "react";
import { AccessFlow } from "../../components/access-flow/access-flow";
import { ACCESS_STEPS, type AccessStep } from "../../components/access-flow/steps";
import styles from "../../components/access-flow/access-flow.module.css";

export default function AccessPage() {
  const [activeStep, setActiveStep] = useState<AccessStep>("barriers");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(activeStep);
  const stepIndex = ACCESS_STEPS.findIndex((step) => step.id === activeStep);

  useEffect(() => {
    if (previousStep.current !== activeStep) {
      headingRef.current?.focus();
      previousStep.current = activeStep;
    }
  }, [activeStep]);

  function moveStep(direction: -1 | 1) {
    setActiveStep((current) => {
      const currentIndex = ACCESS_STEPS.findIndex((step) => step.id === current);
      return ACCESS_STEPS[currentIndex + direction]?.id ?? current;
    });
  }

  return (
    <AccessFlow
      activeStep={activeStep}
      onBack={() => moveStep(-1)}
      onContinue={() => moveStep(1)}
    >
      {/* Substituir este conteúdo pelos componentes reais de cada etapa. */}
      <h1
        id="titulo-etapa"
        className={styles.title}
        ref={headingRef}
        tabIndex={-1}
        aria-describedby="progresso-acesso"
      >
        Etapa: {ACCESS_STEPS[stepIndex].label}
      </h1>
    </AccessFlow>
  );
}
