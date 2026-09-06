"use client";

import { useEffect, useRef, useState } from "react";
import { AccessFlow } from "../../components/access-flow/access-flow";
import { BarriersStep } from "../../components/access-flow/barriers-step";
import type { BarrierId } from "../../data/barriers";
import { ACCESS_STEPS, type AccessStep } from "../../components/access-flow/steps";
import styles from "../../components/access-flow/access-flow.module.css";

export default function AccessPage() {
  const [activeStep, setActiveStep] = useState<AccessStep>("barriers");
  const [selectedBarriers, setSelectedBarriers] = useState<BarrierId[]>([]);
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
      if (current === "barriers" && direction === 1 && selectedBarriers.length === 0) {
        return current;
      }
      const currentIndex = ACCESS_STEPS.findIndex((step) => step.id === current);
      return ACCESS_STEPS[currentIndex + direction]?.id ?? current;
    });
  }

  function toggleBarrier(id: BarrierId) {
    setSelectedBarriers((current) =>
      current.includes(id) ? current.filter((barrier) => barrier !== id) : [...current, id],
    );
  }

  return (
    <AccessFlow
      activeStep={activeStep}
      onBack={() => moveStep(-1)}
      onContinue={() => moveStep(1)}
      continueDisabled={activeStep === "barriers" && selectedBarriers.length === 0}
    >
      <h1
        id="titulo-etapa"
        className={styles.title}
        ref={headingRef}
        tabIndex={-1}
        aria-describedby="progresso-acesso"
      >
        {activeStep === "barriers"
          ? "Como podemos facilitar seu acesso?"
          : `Etapa: ${ACCESS_STEPS[stepIndex].label}`}
      </h1>
      {activeStep === "barriers" && (
        <BarriersStep selectedBarriers={selectedBarriers} onToggle={toggleBarrier} />
      )}
    </AccessFlow>
  );
}
