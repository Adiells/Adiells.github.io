import React from 'react';
import styles from './Cursor.module.css';

export function Cursor({ style = 'block' }) {
  return (
    <span className={`${styles.cursor} ${styles[style]}`} aria-hidden="true">
      {style === 'block' ? '▋' : '_'}
    </span>
  );
}
