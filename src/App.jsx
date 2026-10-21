import React, { useState } from 'react';
import {
  profile,
  socials,
  projects,
  skills,
  experiences,
  sections,
} from './data/portfolioData.js';

import { useActiveSection } from './hooks/useActiveSection.js';
import { useSectionNav } from './hooks/useSectionNav.js';
import { useHotkey } from './hooks/useHotkey.js';
import { useTheme } from './hooks/useTheme.js';

import { StatusBar } from './components/layout/StatusBar.jsx';
import { Footer } from './components/layout/Footer.jsx';

import { Hero } from './components/sections/Hero.jsx';
import { Projects } from './components/sections/Projects.jsx';
import { Experience } from './components/sections/Experience.jsx';
import { Skills } from './components/sections/Skills.jsx';
import { Contact } from './components/sections/Contact.jsx';

import { CommandPalette } from './components/shell/CommandPalette.jsx';

function App() {
  const [isShellOpen, setIsShellOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const activeSection = useActiveSection(sections.map((s) => s.id), 'home');
  const { scrollTo, highlight } = useSectionNav();

  // Listen for Cmd+K, Ctrl+K, or / to open the command menu
  useHotkey(() => setIsShellOpen(true));

  const handleEffect = (effect) => {
    if (effect.type === 'scrollTo') {
      scrollTo(effect.id);
    } else if (effect.type === 'highlight') {
      highlight(effect.slug);
    }
  };

  return (
    <div className="portfolio-app">
      <StatusBar
        sections={sections}
        activeSection={activeSection}
        onSelectSection={scrollTo}
        onOpenShell={() => setIsShellOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="main-layout">
        <Hero
          profile={profile}
          onNavigate={scrollTo}
          onOpenShell={() => setIsShellOpen(true)}
        />

        <Projects
          projects={projects}
          user={profile.user}
          host={profile.host}
        />

        <Experience
          experiences={experiences}
          user={profile.user}
          host={profile.host}
        />

        <Skills
          skills={skills}
          user={profile.user}
          host={profile.host}
        />

        <Contact profile={profile} socials={socials} />
      </main>

      <Footer user={profile.user} host={profile.host} />

      <CommandPalette
        isOpen={isShellOpen}
        onClose={() => setIsShellOpen(false)}
        projects={projects}
        sections={sections}
        onEffect={handleEffect}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    </div>
  );
}

export default App;
