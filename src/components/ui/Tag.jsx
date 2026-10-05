import React from 'react';
import styles from './Tag.module.css';

export function Tag({ label, prefix = '--' }) {
  return (
    <span className={styles.tag}>
      <span className={styles.prefix}>{prefix}</span>
      <span className={styles.label}>{label}</span>
    </span>
  );
}
