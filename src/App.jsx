import React, { useState } from 'react';
import {
  profile,
  socials,
  projects,
  skills,
  experiences,
  system,
  sections,
} from './data/portfolioData.js';

import { useActiveSection } from './hooks/useActiveSection.js';
import { useSectionNav } from './hooks/useSectionNav.js';
import { useHotkey } from './hooks/useHotkey.js';

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
  const activeSection = useActiveSection(sections.map((s) => s.id), 'home');
  const { scrollTo, highlight } = useSectionNav();

  // Listen for Cmd+K, Ctrl+K or / to trigger shell
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
      {/* Top Status Bar (Waybar / Tmux Style) */}
      <StatusBar
        sections={sections}
        activeSection={activeSection}
        onSelectSection={scrollTo}
        onOpenShell={() => setIsShellOpen(true)}
      />

      {/* Main Single Page Content */}
      <main className="main-layout">
        <Hero
          profile={profile}
          system={system}
          projectsCount={projects.length}
          labsCount={experiences.length}
          skillsCount={skills.reduce((acc, g) => acc + g.items.length, 0)}
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

      {/* Terminal Process Exit Signature Footer */}
      <Footer user={profile.user} host={profile.host} />

      {/* Interactive Command Palette Shell Modal */}
      <CommandPalette
        isOpen={isShellOpen}
        onClose={() => setIsShellOpen(false)}
        profile={profile}
        system={system}
        projects={projects}
        sections={sections}
        onEffect={handleEffect}
      />
    </div>
  );
}

export default App;
