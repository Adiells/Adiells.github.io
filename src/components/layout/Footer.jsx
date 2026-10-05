import React from 'react';
import styles from './Footer.module.css';

export function Footer({ user = 'adiel', host = 'manjaro-linux' }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.exitLine}>
          <span className={styles.user}>{user}@{host}</span>
          <span className={styles.arrow}>❯</span>
          <span className={styles.cmd}>exit</span>
        </div>
        <div className={styles.statusLine}>
          <span className={styles.process}>logout · [Process completed with exit code 0]</span>
        </div>
        <div className={styles.metaLine}>
          <span>© {new Date().getFullYear()} Adiel Emilson.</span>
          <span className={styles.separator}>•</span>
          <span>All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}
