import Link from "next/link";

export default function Home() {
  return (
    <div className="home">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
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
              <path d="M104 402V235a144 144 0 0 1 288 0v167h-66V235a78 78 0 0 0-156 0v167z" fill="var(--blue)" />
              <path d="M104 302h144c54 0 98 44 98 98" stroke="var(--accent)" strokeWidth="28" />
              <circle cx="104" cy="302" r="10" fill="var(--background)" />
              <circle cx="346" cy="402" r="10" fill="var(--background)" />
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
