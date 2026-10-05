import React from 'react';
import styles from './PermBadge.module.css';

export function PermBadge({ permissions = '-rw-r--r--' }) {
  const chars = permissions.split('');

  const getColorClass = (char) => {
    if (char === 'd') return styles.dir;
    if (char === 'r') return styles.read;
    if (char === 'w') return styles.write;
    if (char === 'x') return styles.exec;
    return styles.dash;
  };

  return (
    <span className={styles.badge} aria-label={`Permissions ${permissions}`}>
      {chars.map((c, i) => (
        <span key={i} className={getColorClass(c)}>
          {c}
        </span>
      ))}
    </span>
  );
}
