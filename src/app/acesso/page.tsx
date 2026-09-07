"use client";

import { useEffect, useRef, useState } from "react";
import { AccessFlow } from "../../components/access-flow/access-flow";
import { BarriersStep } from "../../components/access-flow/barriers-step";
import { ContentTypeStep } from "../../components/access-flow/content-type-step";
import { ContentInputStep } from "../../components/access-flow/content-input/content-input-step";
import { hasValidContent } from "../../components/access-flow/content-input/validation";
import { EMPTY_CONTENT, type ContentDrafts, type ContentUpdate } from "../../types/access-content";
import type { ContentTypeId } from "../../data/contentTypes";
import type { BarrierId } from "../../data/barriers";
import { ACCESS_STEPS, type AccessStep } from "../../components/access-flow/steps";
import styles from "../../components/access-flow/access-flow.module.css";

export default function AccessPage() {
  const [activeStep, setActiveStep] = useState<AccessStep>("barriers");
  const [selectedBarriers, setSelectedBarriers] = useState<BarrierId[]>([]);
  const [selectedContentType, setSelectedContentType] = useState<ContentTypeId | null>(null);
  const [content, setContent] = useState<ContentDrafts>(EMPTY_CONTENT);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(activeStep);
  const stepIndex = ACCESS_STEPS.findIndex((step) => step.id === activeStep);
  const canContinue = (step: AccessStep) => {
    if (step === "barriers") return selectedBarriers.length > 0;
    if (step === "content-type") return selectedContentType !== null;
    if (step === "content-input") return hasValidContent(selectedContentType, content);
    return true;
  };

  useEffect(() => {
    if (previousStep.current !== activeStep) {
      headingRef.current?.focus();
      previousStep.current = activeStep;
    }
  }, [activeStep]);

  function moveStep(direction: -1 | 1) {
    setActiveStep((current) => {
      if (direction === 1 && !canContinue(current)) {
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

  function updateContent(update: ContentUpdate) {
    setContent((current) => ({ ...current, [update.contentType]: update.content }));
  }

  return (
    <AccessFlow
      activeStep={activeStep}
      onBack={() => moveStep(-1)}
      onContinue={() => moveStep(1)}
      continueDisabled={!canContinue(activeStep)}
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
          : activeStep === "content-type"
            ? "O que você quer acessar?"
            : activeStep === "content-input"
              ? "Adicione o conteúdo"
              : `Etapa: ${ACCESS_STEPS[stepIndex].label}`}
      </h1>
      {activeStep === "barriers" && (
        <BarriersStep selectedBarriers={selectedBarriers} onToggle={toggleBarrier} />
      )}
      {activeStep === "content-type" && (
        <ContentTypeStep selectedContentType={selectedContentType} onSelect={setSelectedContentType} />
      )}
      {activeStep === "content-input" && selectedContentType && (
        <ContentInputStep contentType={selectedContentType} content={content} onChange={updateContent} />
      )}
    </AccessFlow>
  );
}
