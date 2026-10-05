import React from 'react';
import styles from './Prompt.module.css';

export function Prompt({
  user = 'adiel',
  host = 'manjaro-linux',
  path = '~/portfolio',
  branch = 'master',
  exitCode = 0,
  compact = false,
  className = '',
}) {
  return (
    <div className={`${styles.promptContainer} ${compact ? styles.compact : ''} ${className}`}>
      <span className={styles.userHost}>{user}@{host}</span>
      <span className={styles.path}>{path}</span>
      {branch && (
        <span className={styles.branchWrapper}>
          <span className={styles.branchOn}>on</span>
          <span className={styles.branchName}>{branch}</span>
        </span>
      )}
      <span className={`${styles.arrow} ${exitCode !== 0 ? styles.arrowError : styles.arrowSuccess}`}>
        ❯
      </span>
    </div>
  );
}
