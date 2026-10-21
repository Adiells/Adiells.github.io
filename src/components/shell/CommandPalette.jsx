import React, { useEffect, useMemo, useRef, useState } from 'react';
import { socials } from '../../data/portfolioData.js';
import { ArrowDownIcon, ArrowUpRightIcon, CheckIcon, CloseIcon, CopyIcon, MoonIcon, SearchIcon, SunIcon } from '../ui/Icons.jsx';
import styles from './CommandPalette.module.css';

const email = socials.find((item) => item.id === 'email')?.handle ?? '';

export function CommandPalette({
  isOpen,
  onClose,
  projects = [],
  sections = [],
  onEffect,
  theme = 'dark',
  onToggleTheme,
}) {
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const groups = useMemo(() => [
    {
      label: 'Navigation',
      actions: sections.map((section) => ({
        id: `navigate-${section.id}`,
        label: `${section.index} ${section.label}`,
        detail: section.title,
        keywords: 'navigate section go to',
        icon: 'arrow',
        run: () => onEffect?.({ type: 'scrollTo', id: section.id }),
      })),
    },
    {
      label: 'Featured Systems',
      actions: projects.flatMap((project) => [
        ...(project.slug === 'music2chart' && project.link ? [{
          id: `${project.slug}-live`,
          label: `${project.title} — Launch live app`,
          detail: project.domain,
          keywords: 'launch live demo application',
          icon: 'external',
          run: () => window.open(project.link, '_blank', 'noopener,noreferrer'),
        }] : []),
        ...(project.repo ? [{
          id: `${project.slug}-source`,
          label: `${project.title} — Source code`,
          detail: 'GitHub repository',
          keywords: 'github source repository code',
          icon: 'external',
          run: () => window.open(project.repo, '_blank', 'noopener,noreferrer'),
        }] : []),
      ]),
    },
    {
      label: 'Quick Actions',
      actions: [
        {
          id: 'copy-email',
          label: copied ? 'Email copied' : 'Copy email address',
          detail: copyError ? 'Clipboard access failed' : email,
          keywords: 'copy email contact',
          icon: copied ? 'check' : 'copy',
          run: async () => {
            try {
              await navigator.clipboard.writeText(email);
              setCopied(true);
              setCopyError(false);
              window.setTimeout(() => setCopied(false), 1800);
            } catch {
              setCopyError(true);
            }
          },
          keepOpen: true,
        },
        {
          id: 'toggle-theme',
          label: `Switch to ${theme === 'dark' ? 'Light Industrial' : 'Dark Mineral'}`,
          detail: 'Change the interface appearance',
          keywords: 'theme appearance light dark',
          icon: theme === 'dark' ? 'sun' : 'moon',
          run: onToggleTheme,
        },
        ...socials.filter((item) => item.id !== 'email').map((item) => ({
          id: `open-${item.id}`,
          label: `Open ${item.label}`,
          detail: item.handle,
          keywords: `${item.label} profile social link`,
          icon: 'external',
          run: () => window.open(item.url, '_blank', 'noopener,noreferrer'),
        })),
      ],
    },
  ], [sections, projects, onEffect, copied, copyError, theme, onToggleTheme]);

  const filteredGroups = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return groups.map((group) => ({
      ...group,
      actions: group.actions.filter((action) =>
        !normalized || `${action.label} ${action.detail} ${action.keywords}`.toLowerCase().includes(normalized),
      ),
    })).filter((group) => group.actions.length > 0);
  }, [groups, query]);
  const filteredActions = useMemo(() => filteredGroups.flatMap((group) => group.actions), [filteredGroups]);

  useEffect(() => {
    if (!isOpen) return undefined;
    setQuery('');
    setActiveIndex(0);
    setCopied(false);
    setCopyError(false);
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(focusTimer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const row = listRef.current?.querySelector(`[data-action-index="${activeIndex}"]`);
    row?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleGlobalKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [isOpen, onClose]);

  const execute = async (action) => {
    await action.run?.();
    if (!action.keepOpen) onClose();
  };

  const activeActionId = filteredActions[activeIndex] ? `command-action-${activeIndex}` : undefined;

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => filteredActions.length ? (index + 1) % filteredActions.length : 0);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => filteredActions.length ? (index - 1 + filteredActions.length) % filteredActions.length : 0);
    } else if (event.key === 'Enter' && filteredActions[activeIndex]) {
      event.preventDefault();
      execute(filteredActions[activeIndex]);
    }
  };

  if (!isOpen) return null;

  let actionIndex = 0;
  const renderIcon = (icon) => {
    if (icon === 'arrow') return <ArrowDownIcon size={17} />;
    if (icon === 'copy') return <CopyIcon size={17} />;
    if (icon === 'check') return <CheckIcon size={17} />;
    if (icon === 'sun') return <SunIcon size={17} />;
    if (icon === 'moon') return <MoonIcon size={17} />;
    return <ArrowUpRightIcon size={17} />;
  };

  return (
    <div className={styles.backdrop} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="command-palette-title" onKeyDown={handleKeyDown}>
        <div className={styles.searchRow}>
          <span className={styles.searchMark} aria-hidden="true"><SearchIcon size={19} /></span>
          <input
            ref={inputRef}
            className={styles.searchInput}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search systems, sections, or actions..."
            aria-label="Search commands and actions"
            aria-controls="command-results"
            aria-activedescendant={activeActionId}
            aria-describedby="command-hint"
            autoComplete="off"
          />
          <span className={styles.searchStatus} id="command-hint">Navigate <kbd>↑</kbd><kbd>↓</kbd></span>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close command menu">
            <CloseIcon size={17} />
          </button>
        </div>

        <h2 className={styles.visuallyHidden} id="command-palette-title">Command and action menu</h2>
        {filteredGroups.length ? (
          <div className={styles.resultArea} id="command-results" ref={listRef} role="listbox" aria-label="Available commands">
            {filteredGroups.map((group) => (
            <div className={styles.group} key={group.label} role="group" aria-label={group.label}>
              <h3 className={styles.groupTitle}>{group.label}</h3>
              {group.actions.map((action) => {
                const index = actionIndex++;
                const isActive = index === activeIndex;
                return (
                  <button
                    type="button"
                    key={action.id}
                    role="option"
                    aria-selected={isActive}
                    id={`command-action-${index}`}
                    data-action-index={index}
                    className={`${styles.actionRow} ${isActive ? styles.actionRowActive : ''}`}
                    onMouseMove={() => setActiveIndex(index)}
                    onClick={() => execute(action)}
                  >
                    <span className={styles.actionIcon} aria-hidden="true">{renderIcon(action.icon)}</span>
                    <span className={styles.actionCopy}>
                      <span className={styles.actionLabel}>{action.label}</span>
                      <span className={styles.actionDetail}>{action.detail}</span>
                    </span>
                    <span className={styles.actionHint} aria-hidden="true">{isActive ? '↵' : ''}</span>
                  </button>
                );
              })}
            </div>
            ))}
          </div>
        ) : (
          <p className={styles.emptyState} role="status">No matching commands. Try a project name or section.</p>
        )}

        <footer className={styles.footer}>
          <span className={styles.feedback} aria-live="polite">
            {copied ? <><CheckIcon size={14} /> Email copied</> : copyError ? 'Clipboard access failed' : 'Precision Engineering · Action Menu'}
          </span>
          <span className={styles.footerHint}><kbd>Enter</kbd> Run <kbd>Esc</kbd> Close</span>
        </footer>
      </section>
    </div>
  );
}
