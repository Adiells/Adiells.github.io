import React, { useState } from 'react';
import {
  CloseIcon,
  CommandIcon,
  MenuIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
} from '../ui/Icons.jsx';
import styles from './StatusBar.module.css';

export function StatusBar({
  sections = [],
  activeSection = 'home',
  onSelectSection,
  onOpenShell,
  theme = 'dark',
  onToggleTheme,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleSelect = (id) => {
    onSelectSection?.(id);
    setMobileMenuOpen(false);
  };
  const ThemeIcon = theme === 'dark' ? SunIcon : MoonIcon;
  const themeAction = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <header className={styles.statusBar}>
      <div className={styles.container}>
        <a className={styles.identity} href="#home" onClick={() => handleSelect('home')} aria-label="Adiel Emilson, overview">
          <span className={styles.name}>Adiel Emilson</span>
        </a>

        <nav className={styles.navigation} aria-label="Main navigation">
          {sections.filter((section) => section.id !== 'home').map((section) => {
            const isActive = section.id === activeSection;
            return (
              <button
                key={section.id}
                type="button"
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                onClick={() => handleSelect(section.id)}
                aria-current={isActive ? 'location' : undefined}
              >
                <span>{section.id === 'projects' ? 'Projects' : section.label}</span>
              </button>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <button type="button" className={styles.searchButton} onClick={onOpenShell} aria-label="Open search and actions (Command K)">
            <SearchIcon size={16} />
            <kbd><CommandIcon size={12} />K</kbd>
          </button>
          <button type="button" className={styles.themeButton} onClick={onToggleTheme} aria-label={themeAction} title={themeAction}>
            <ThemeIcon size={17} />
          </button>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <CloseIcon size={19} /> : <MenuIcon size={19} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className={styles.mobileDrawer} id="mobile-navigation" aria-label="Mobile navigation">
          {sections.filter((section) => section.id !== 'home').map((section) => {
            const isActive = section.id === activeSection;
            return (
              <button
                key={section.id}
                type="button"
                className={`${styles.drawerItem} ${isActive ? styles.drawerItemActive : ''}`}
                onClick={() => handleSelect(section.id)}
                aria-current={isActive ? 'location' : undefined}
              >
                <span>{section.id === 'projects' ? 'Projects' : section.label}</span>
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}
