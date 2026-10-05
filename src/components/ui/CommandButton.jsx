import React from 'react';
import styles from './CommandButton.module.css';

export function CommandButton({ command, label, onClick, variant = 'default', className = '' }) {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={onClick}
    >
      <span className={styles.prefix}>❯</span>
      <span className={styles.cmd}>{command || label}</span>
    </button>
  );
}
