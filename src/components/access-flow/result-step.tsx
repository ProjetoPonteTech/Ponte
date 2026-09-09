import { BARRIERS } from "../../data/barriers";
import type { AnalysisResult } from "../../lib/analyze-content";
import styles from "./result-step.module.css";

const DEMO_DOCUMENT = {
  name: "Uso responsável da internet",
  original: "/demo/pdf-original.pdf",
  adapted: "/demo/pdf-adaptado.pdf",
};

type ResultStepProps = {
  result: AnalysisResult;
  onRestart: () => void;
};

export function ResultStep({ result, onRestart }: ResultStepProps) {
  const isDocument = result.contentType === "document";
  const barriers = BARRIERS.filter((barrier) => result.detectedBarriers.includes(barrier.id));
  // O PDF de demonstração representa melhorias visuais e de compreensão.
  // As demais regras continuam disponíveis como sugestões, sem afirmar aplicação.
  const demonstrated = result.suggestedAdaptations.filter(
    ({ barrier }) => isDocument && (barrier === "seeing" || barrier === "understanding"),
  );
  const suggestions = result.suggestedAdaptations.filter((group) => !demonstrated.includes(group));

  return (
    <div className={styles.result}>
      <p className={styles.support}>A PONTE preparou uma versão mais acessível com base nas dificuldades que você informou.</p>
      <p className={styles.notice}>
        {isDocument
          ? "Demonstração: o PDF disponível é um exemplo preparado pela PONTE. O arquivo que você enviou não foi processado."
          : "Demonstração: estas são sugestões de adaptação. Nesta versão, seu conteúdo não foi alterado e não há um arquivo adaptado para este tipo de conteúdo."}
      </p>

      <section className={styles.section} aria-labelledby="resumo-analise">
        <h2 id="resumo-analise">Resumo da análise</h2>
        <p>{result.analysisSummary}</p>
      </section>

      <section className={styles.section} aria-labelledby="barreiras-consideradas">
        <h2 id="barreiras-consideradas">Barreiras consideradas</h2>
        <ul className={styles.barriers}>
          {barriers.map((barrier) => <li key={barrier.id}>{barrier.title}</li>)}
        </ul>
      </section>

      {demonstrated.length > 0 && (
        <section className={styles.section} aria-labelledby="adaptacoes-aplicadas">
          <h2 id="adaptacoes-aplicadas">Adaptações aplicadas</h2>
          <p>Estas melhorias estão representadas no PDF de demonstração.</p>
          <ul className={styles.improvements}>
            {demonstrated.flatMap((group) => group.suggestions.map((suggestion) => (
              <li key={`${group.barrier}-${suggestion}`}>{suggestion}</li>
            )))}
          </ul>
        </section>
      )}

      {suggestions.length > 0 && (
        <section className={styles.section} aria-labelledby="sugestoes-adaptacao">
          <h2 id="sugestoes-adaptacao">Sugestões de adaptação</h2>
          <p>Possibilidades indicadas pela simulação, ainda não aplicadas ao conteúdo.</p>
          <ul className={styles.improvements}>
            {suggestions.flatMap((group) => group.suggestions.map((suggestion) => (
              <li key={`${group.barrier}-${suggestion}`}>{suggestion}</li>
            )))}
          </ul>
        </section>
      )}

      {isDocument && (
        <>
          <section className={styles.document} aria-labelledby="documento-adaptado">
            <p className={styles.ready}><span aria-hidden="true">✓</span> Versão adaptada pronta para visualizar</p>
            <h2 id="documento-adaptado">Documento adaptado</h2>
            <p className={styles.documentName}>{DEMO_DOCUMENT.name}</p>
            <p>PDF de demonstração · Versão adaptada</p>
            <div className={styles.actions}>
              <a className={styles.primary} href={DEMO_DOCUMENT.adapted} target="_blank" rel="noopener noreferrer">
                Visualizar PDF adaptado<span className={styles.linkNote}>Abre em nova aba</span>
              </a>
              <a className={styles.secondary} href={DEMO_DOCUMENT.adapted} download="ponte-pdf-adaptado.pdf">Baixar PDF adaptado</a>
            </div>
          </section>
          <section className={styles.section} aria-labelledby="antes-depois">
            <h2 id="antes-depois">Antes e depois</h2>
            <p>Compare as duas versões do documento de demonstração.</p>
            <div className={styles.comparison}>
              <a href={DEMO_DOCUMENT.original} target="_blank" rel="noopener noreferrer">Ver documento original<span className={styles.linkNote}>Abre em nova aba</span></a>
              <a href={DEMO_DOCUMENT.adapted} target="_blank" rel="noopener noreferrer">Ver versão adaptada<span className={styles.linkNote}>Abre em nova aba</span></a>
            </div>
          </section>
        </>
      )}

      <div className={styles.restart}>
        <button type="button" className={styles.secondary} onClick={onRestart}>Adaptar outro conteúdo</button>
      </div>
    </div>
  );
}
