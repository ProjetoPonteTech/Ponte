import Link from "next/link";
import { PonteLogo, PonteSymbol } from "../components/ponte-logo";

export default function Home() {
  return (
    <div className="home">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="site-header">
        <PonteLogo />
        <details className="help">
          <summary><span className="help-icon" aria-hidden="true">?</span>Ajuda</summary>
          <div className="help-content">
            <p className="help-title">Um ponto de partida</p>
            <p>A PONTE ajuda você a encontrar outras formas de acessar conteúdos digitais, a partir das suas necessidades.</p>
            <p>Use Tab para navegar e Enter para selecionar “Começar”. Para fechar esta ajuda, selecione “Ajuda” novamente.</p>
          </div>
        </details>
      </header>
      <main id="conteudo" className="main-content" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span aria-hidden="true" />Tecnologia adaptativa. Acesso possível.</p>
            <h1 id="hero-title">A tecnologia pode se adaptar <span>a você.</span></h1>
            <p className="hero-description">A PONTE ajuda você a encontrar outras formas de acessar conteúdos digitais, a partir do que está difícil para você.</p>
            <Link className="start-link" href="/acesso" prefetch={false}>
              Começar
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <div className="hero-art" aria-hidden="true">
            <svg viewBox="0 0 480 500" fill="none" focusable="false">
              <circle cx="248" cy="250" r="198" stroke="var(--line)" />
              <circle cx="248" cy="250" r="148" stroke="var(--line)" strokeDasharray="3 7" />
              <path d="M24 402h432M248 30v438" stroke="var(--line)" />
              <PonteSymbol />
              <path d="M43 235h16m-8-8v16M420 116h16m-8-8v16" stroke="var(--blue)" strokeWidth="1.5" />
            </svg>
            <span className="art-caption">Diferentes caminhos. Novas possibilidades.</span>
          </div>
        </section>
        <div className="home-principle">
          <span className="principle-label">O nosso ponto de partida</span>
          <p>A tecnologia deve se adaptar à pessoa.</p>
        </div>
      </main>
    </div>
  );
}
