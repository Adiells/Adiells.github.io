const REDIRECT_URL = '/portfolio/';

function App() {
  const go = () => {
    window.location.href = REDIRECT_URL;
  };

  return (
    <>
      <nav className="main-nav" aria-label="Navegação principal">
        <a className="nav-brand" href="/" aria-label="Página inicial de Adiel Emilson">
          <img src="/white-logo.png" alt="" />
          <span>Adiel Emilson</span>
        </a>
        <div className="nav-links">
          <a href="#stack">Stack</a>
          <a href="#projects">Projects</a>
          <a className="nav-link-cta" href={REDIRECT_URL}>Portfolio</a>
        </div>
      </nav>

      <main className="main-content">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-image-col">
            <div className="image-card">
              <div className="image-glow" aria-hidden="true" />
              <img src="/eu.png" alt="Adiel Emilson" className="hero-photo" />
              <div className="image-badge">Available for work</div>
            </div>
          </div>

          <div className="hero-text-col">
            <p className="hero-badge">Welcome to my digital space</p>
            <h1 id="hero-title" className="hero-heading">
              Hi, I'm <span>Adiel Emilson</span>
            </h1>
            <p className="hero-location">Brazil • Data Science & AI Student @ UFPB</p>
            <h2 className="typing-line">Data Scientist • AI Student • Computer Vision</h2>
            <p className="hero-description">
              I transform complex data into intelligent solutions. My work focuses on
              <strong> machine learning</strong>, <strong>artificial intelligence</strong>,
              <strong> computer vision</strong> and clear analysis for real-world problems.
            </p>
            <div className="hero-actions">
              <button className="btn btn-gradient" onClick={go}>View Full Portfolio</button>
              <a className="btn btn-outline" href="mailto:adielenilson@gmail.com">Get In Touch</a>
            </div>
          </div>
        </section>

        <section className="mini-sections" id="stack" aria-label="Resumo do portfólio">
          <article className="info-card">
            <div className="card-topline">
              <span className="card-index">01</span>
              <span className="card-chip">Research</span>
            </div>
            <div className="card-orb" aria-hidden="true"></div>
            <h2>AI & Data Science</h2>
            <p>Experiments, models and data workflows focused on extracting useful signals from complex problems.</p>
            <div className="card-tags" aria-label="Tópicos">
              <span>Data</span>
              <span>AI</span>
              <span>Insights</span>
            </div>
          </article>
          <article className="info-card">
            <div className="card-topline">
              <span className="card-index">02</span>
              <span className="card-chip">Models</span>
            </div>
            <div className="card-orb" aria-hidden="true"></div>
            <h2>Machine Learning</h2>
            <p>Modeling, evaluation and iterative improvement to turn patterns into reliable decisions.</p>
            <div className="card-tags" aria-label="Tópicos">
              <span>ML</span>
              <span>Python</span>
              <span>Prediction</span>
            </div>
          </article>
          <article className="info-card" id="projects">
            <div className="card-topline">
              <span className="card-index">03</span>
              <span className="card-chip">Vision</span>
            </div>
            <div className="card-orb" aria-hidden="true"></div>
            <h2>Applied Projects</h2>
            <p>Selected work in recommendation, visual intelligence and technical exploration available in the full portfolio.</p>
            <div className="card-tags" aria-label="Tópicos">
              <span>Vision</span>
              <span>Systems</span>
              <span>Portfolio</span>
            </div>
          </article>
        </section>
      </main>
      <footer className="main-footer" aria-label="Rodapé">
        <span>Adiel Emilson</span>
        <small>Data Science • Artificial Intelligence • Machine Learning • Computer Vision</small>
      </footer>
    </>
  );
}

export default App;
