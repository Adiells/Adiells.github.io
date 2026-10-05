import React, { useEffect, useRef } from 'react';
import { Prompt } from '../ui/Prompt.jsx';
import { ShellOutput } from './ShellOutput.jsx';
import { useTerminal } from '../../hooks/useTerminal.js';
import styles from './CommandPalette.module.css';

export function CommandPalette({
  isOpen,
  onClose,
  profile,
  system,
  projects,
  sections,
  onEffect,
}) {
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  const terminal = useTerminal({
    profile,
    system,
    projects,
    sections,
    onEffect: (eff) => {
      if (eff.type === 'close') {
        setTimeout(onClose, eff.delay || 150);
      }
      if (onEffect) onEffect(eff);
    },
  });

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Auto-scroll output to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [terminal.entries]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Modal Window Header */}
        <div className={styles.modalHeader}>
          <div className={styles.modalControls}>
            <button
              type="button"
              className={`${styles.ctrlDot} ${styles.ctrlDotClose}`}
              onClick={onClose}
              title="Close shell (Esc)"
            />
            <span className={`${styles.ctrlDot} ${styles.ctrlDotMin}`} />
            <span className={`${styles.ctrlDot} ${styles.ctrlDotMax}`} />
          </div>
          <span className={styles.modalTitle}>zsh &mdash; {profile.user}@{profile.host}: ~/portfolio</span>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            esc
          </button>
        </div>

        {/* Output Scroll Area */}
        <div className={styles.outputArea} ref={scrollRef}>
          <ShellOutput
            entries={terminal.entries}
            profile={profile}
            system={system}
          />
        </div>

        {/* Input Bar */}
        <div className={styles.inputBar}>
          <Prompt
            user={profile.user}
            host={profile.host}
            path="~/portfolio"
            branch=""
            exitCode={terminal.lastExitCode}
            compact={true}
          />
          <input
            ref={inputRef}
            type="text"
            className={styles.inputField}
            value={terminal.input}
            onChange={(e) => terminal.setInput(e.target.value)}
            onKeyDown={terminal.handleKeyDown}
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder="type a command (help, about, projects, clear)..."
            aria-label="Terminal command prompt input"
          />
        </div>
      </div>
    </div>
  );
}
