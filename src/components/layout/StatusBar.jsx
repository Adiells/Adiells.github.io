import React, { useState } from 'react';
import { useClock } from '../../hooks/useClock.js';
import styles from './StatusBar.module.css';

export function StatusBar({
  sections = [],
  activeSection = 'home',
  onSelectSection,
  onOpenShell,
}) {
  const time = useClock();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelect = (id) => {
    if (onSelectSection) onSelectSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className={styles.statusBar} aria-label="Terminal status bar and navigation">
      {/* Desktop Bar */}
      <div className={styles.container}>
        <div className={styles.leftGroup}>
          <span className={styles.wmBadge}>MANJARO</span>
          <div className={styles.workspaces}>
            {sections.map((sec) => {
              const isActive = sec.id === activeSection;
              return (
                <button
                  key={sec.id}
                  type="button"
                  className={`${styles.wsButton} ${isActive ? styles.wsActive : ''}`}
                  onClick={() => handleSelect(sec.id)}
                  aria-current={isActive ? 'location' : undefined}
                >
                  {sec.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile current section indicator */}
        <div className={styles.mobileCurrent}>
          <span className={styles.mobilePath}>~/portfolio/{activeSection}</span>
        </div>

        <div className={styles.rightGroup}>
          <button
            type="button"
            className={styles.shellButton}
            onClick={onOpenShell}
            title="Open Interactive Shell (Ctrl+K or /)"
          >
            <span className={styles.shellGlyph}>❯_</span>
            <span className={styles.shellLabel}>shell</span>
            <kbd className={styles.hotkey}>⌘K</kbd>
          </button>

          <span className={styles.clock}>{time}</span>

          {/* Mobile hamburger for workspaces */}
          <button
            type="button"
            className={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle workspaces menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <div className={styles.mobileDrawerHeader}>
            <span>Workspaces</span>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setMobileMenuOpen(false)}
            >
              ✕
            </button>
          </div>
          <div className={styles.mobileWsList}>
            {sections.map((sec) => (
              <button
                key={sec.id}
                type="button"
                className={`${styles.mobileWsItem} ${sec.id === activeSection ? styles.mobileWsItemActive : ''}`}
                onClick={() => handleSelect(sec.id)}
              >
                <span>{sec.label}</span>
                <span className={styles.mobileWsTitle}># {sec.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
