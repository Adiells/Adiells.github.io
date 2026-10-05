import React from 'react';
import styles from './Pane.module.css';

export function Pane({
  title,
  actions,
  children,
  className = '',
  id,
}) {
  return (
    <div className={`${styles.pane} ${className}`} id={id}>
      {title && (
        <div className={styles.header}>
          <div className={styles.dots}>
            <span className={`${styles.dot} ${styles.dotRed}`} />
            <span className={`${styles.dot} ${styles.dotYellow}`} />
            <span className={`${styles.dot} ${styles.dotGreen}`} />
          </div>
          <span className={styles.title}>{title}</span>
          <div className={styles.actions}>{actions}</div>
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
