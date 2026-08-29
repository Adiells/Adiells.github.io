import { useState, useEffect } from 'react';
import { Sun, Moon, MapPin } from '@phosphor-icons/react';

const REDIRECT_URL = '/portfolio/';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const go = () => {
    window.location.href = REDIRECT_URL;
  };

  return (
    <>
      <nav className="main-nav" aria-label="Navegação principal">
        <a className="nav-brand" href="/" aria-label="Página inicial de Adiel Emilson">
          <span className="brand-title">Adiel Emilson</span>
          <span className="brand-subtitle">Data Science & AI</span>
        </a>
        <div className="nav-links">
          <a href="#stack">Stack</a>
          <a href="#projects">Projects</a>
          <a className="nav-link-cta" href={REDIRECT_URL}>
            Portfolio
          </a>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="theme-toggle-btn"
            aria-label="Alternar tema"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </nav>

      <main className="main-content">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-text-col">
            <p className="hero-eyebrow">Biography</p>
            <h1 id="hero-title" className="hero-heading">
              Designing models and systems to make sense of <span>complex data.</span>
            </h1>
            <p className="hero-location">
              <MapPin size={14} /> Brazil • Data Science & AI Student @ UFPB
            </p>
            <p className="hero-description">
              I transform complex data into intelligent solutions. My work focuses on
              <strong> machine learning</strong>, <strong>artificial intelligence</strong>,
              <strong> computer vision</strong> and clear analysis for real-world problems.
            </p>
            <div className="hero-actions">
              <button className="btn btn-gradient" onClick={go}>
                View Full Portfolio
              </button>
              <a className="btn btn-outline" href="mailto:adielenilson@gmail.com">
                Get In Touch
              </a>
            </div>
          </div>

          <div className="hero-image-col">
            <div className="editorial-image-frame">
              <img src="/eu.webp" alt="Adiel Emilson" className="editorial-photo" />
              <div className="frame-border-corner top-left"></div>
              <div className="frame-border-corner top-right"></div>
              <div className="frame-border-corner bottom-left"></div>
              <div className="frame-border-corner bottom-right"></div>
              <div className="image-badge">Available for work</div>
            </div>
          </div>
        </section>

        <section className="mini-sections" id="stack" aria-label="Resumo do portfólio">
          <article className="info-card">
            <div className="card-topline">
              <span className="card-index">01</span>
              <span className="card-chip">Research</span>
            </div>
            <h2>AI & Data Science</h2>
            <p>
              Experiments, models and data workflows focused on extracting useful signals from
              complex problems.
            </p>
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
            <h2>Machine Learning</h2>
            <p>
              Modeling, evaluation and iterative improvement to turn patterns into reliable
              decisions.
            </p>
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
            <h2>Applied Projects</h2>
            <p>
              Selected work in recommendation, visual intelligence and technical exploration
              available in the full portfolio.
            </p>
            <div className="card-tags" aria-label="Tópicos">
              <span>Vision</span>
              <span>Systems</span>
              <span>Portfolio</span>
            </div>
          </article>
        </section>
      </main>

      <footer className="main-footer" aria-label="Rodapé">
        <div className="footer-container">
          <p>
            © {new Date().getFullYear()} <span>Adiel Emilson</span>. 
          </p>
          <small>Data Science • Artificial Intelligence • Machine Learning • Computer Vision</small>
        </div>
      </footer>
    </>
  );
}

export default App;
