import React from 'react';
import { Prompt } from './Prompt.jsx';
import { useTypewriter } from '../../hooks/useTypewriter.js';
import styles from './SectionHeader.module.css';

export function SectionHeader({
  id,
  path = '~/portfolio',
  command,
  comment,
  user = 'adiel',
  host = 'manjaro-linux',
}) {
  const { displayedText, isTyping, elementRef } = useTypewriter(command, 30);

  return (
    <header className={styles.header} ref={elementRef}>
      {comment && <div className={styles.comment}># {comment}</div>}
      <div className={styles.commandLine}>
        <Prompt user={user} host={host} path={path} branch="" />
        <a href={`#${id}`} className={styles.commandLink}>
          <span className={styles.commandText}>{displayedText}</span>
          {isTyping && <span className={styles.cursor}>▋</span>}
        </a>
      </div>
    </header>
  );
}
