"use client";

import { useEffect, useRef, useState } from "react";
import { AccessFlow } from "../../components/access-flow/access-flow";
import { BarriersStep } from "../../components/access-flow/barriers-step";
import { ContentTypeStep } from "../../components/access-flow/content-type-step";
import { AnalysisStep } from "../../components/access-flow/analysis-step";
import { ResultStep } from "../../components/access-flow/result-step";
import { analyzeContent, type AnalysisResult } from "../../lib/analyze-content";
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
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(activeStep);
  const canContinue = (step: AccessStep) => {
    if (step === "barriers") return selectedBarriers.length > 0;
    if (step === "content-type") return selectedContentType !== null;
    if (step === "content-input") return hasValidContent(selectedContentType, content);
    return step === "result" && analysisResult !== null;
  };

  useEffect(() => {
    if (previousStep.current !== activeStep) {
      headingRef.current?.focus();
      previousStep.current = activeStep;
    }
  }, [activeStep]);

  useEffect(() => {
    if (activeStep !== "analysis" || !selectedContentType) return;
    const controller = new AbortController();
    analyzeContent({
      barriers: selectedBarriers,
      contentType: selectedContentType,
      content: content[selectedContentType],
    }, { signal: controller.signal }).then((result) => {
      if (controller.signal.aborted) return;
      setAnalysisResult(result);
      setActiveStep("result");
    }).catch(() => {
      if (!controller.signal.aborted) {
        setAnalysisError("Não foi possível concluir a simulação. Volte e tente novamente.");
      }
    });
    return () => controller.abort();
  }, [activeStep, selectedBarriers, selectedContentType, content]);

  function moveStep(direction: -1 | 1) {
    setAnalysisError(null);
    setAnalysisResult(null);
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

  function restartFlow() {
    setSelectedBarriers([]);
    setSelectedContentType(null);
    setContent(EMPTY_CONTENT);
    setAnalysisResult(null);
    setAnalysisError(null);
    setActiveStep("barriers");
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
              : activeStep === "analysis"
                ? "Analisando possíveis barreiras..."
                : "Seu conteúdo foi adaptado"}
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
      {activeStep === "analysis" && <AnalysisStep error={analysisError} />}
      {activeStep === "result" && analysisResult && (
        <ResultStep result={analysisResult} onRestart={restartFlow} />
      )}
    </AccessFlow>
  );
}
