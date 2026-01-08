import { useEffect, useState } from 'react';

const REDIRECT_URL = '/portfolio/';

function App() {
  const [hint, setHint] = useState('Clique para acessar meu portfólio completo.');

  const go = () => {
    setHint('Abrindo o portfólio...');
    window.location.href = REDIRECT_URL;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setHint('Redirecionando automaticamente...');
      window.location.href = REDIRECT_URL;
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="hero-gate">
      <div className="glass-panel">
        <p className="eyebrow">Bem-vindo</p>
        <h1 className="gate-title">Olá, eu sou Adiel</h1>
        <p className="gate-subtitle">Confira meu portfólio e trabalhos.</p>
        <button className="cta-btn" onClick={go}>Veja meu portfólio</button>
        <p className="gate-hint">{hint}</p>
      </div>
    </main>
  );
}

export default App;
