import React from 'react';
import { FastfetchBlock } from '../sections/FastfetchBlock.jsx';
import { PermBadge } from '../ui/PermBadge.jsx';
import styles from './ShellViews.module.css';

export function ShellOutput({ entries, profile, system }) {
  if (!entries || entries.length === 0) {
    return (
      <div className={styles.emptyState}>
        <span className={styles.welcomeText}>
          Type <span className={styles.highlight}>help</span> for a list of commands, or press <span className={styles.highlight}>Tab</span> to autocomplete.
        </span>
      </div>
    );
  }

  return (
    <div className={styles.outputContainer}>
      {entries.map((entry) => (
        <div key={entry.id} className={styles.entryBlock}>
          {/* Command Prompt echoed */}
          <div className={styles.promptEcho}>
            <span className={styles.user}>{profile.user}@{profile.host}</span>
            <span className={styles.path}>~/portfolio</span>
            <span className={`${styles.arrow} ${entry.exitCode !== 0 ? styles.arrowError : styles.arrowSuccess}`}>
              ❯
            </span>
            <span className={styles.inputEcho}>{entry.input}</span>
          </div>

          {/* Render each output descriptor */}
          <div className={styles.outputBody}>
            {entry.output.map((out, idx) => (
              <RenderOutputItem
                key={idx}
                item={out}
                profile={profile}
                system={system}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function RenderOutputItem({ item, profile, system }) {
  if (item.view === 'text') {
    return <pre className={styles.rawText}>{item.text}</pre>;
  }

  if (item.view === 'error') {
    return <pre className={styles.errorText}>{item.text}</pre>;
  }

  if (item.view === 'fastfetch') {
    return <FastfetchBlock profile={profile} system={system} compact={true} />;
  }

  if (item.view === 'help') {
    return (
      <div className={styles.helpTable}>
        <div className={styles.helpHeader}>
          <span className={styles.helpColCmd}>COMMAND</span>
          <span className={styles.helpColDesc}>DESCRIPTION</span>
        </div>
        {item.commands.map((cmd) => (
          <div key={cmd.name} className={styles.helpRow}>
            <span className={styles.helpCmd}>{cmd.usage || cmd.name}</span>
            <span className={styles.helpDesc}>{cmd.summary}</span>
          </div>
        ))}
      </div>
    );
  }

  if (item.view === 'man') {
    return (
      <div className={styles.manPage}>
        <div className={styles.manSection}>NAME</div>
        <div className={styles.manText}>{item.name} - {item.description}</div>

        <div className={styles.manSection}>SYNOPSIS</div>
        <div className={styles.manText}><code>{item.synopsis}</code></div>

        {item.aliases && item.aliases.length > 0 && (
          <>
            <div className={styles.manSection}>ALIASES</div>
            <div className={styles.manText}>{item.aliases.join(', ')}</div>
          </>
        )}
      </div>
    );
  }

  if (item.view === 'lsProjects') {
    return (
      <div className={styles.lsContainer}>
        {item.projects.map((p) => (
          <div key={p.slug} className={styles.lsRow}>
            <PermBadge permissions={p.permissions || 'drwxr-xr-x'} />
            <span className={styles.lsUser}>{profile.user}</span>
            <span className={styles.lsCategory}>{p.category}</span>
            <span className={styles.lsYear}>{p.year}</span>
            <span className={styles.lsName}>{p.slug}/</span>
          </div>
        ))}
      </div>
    );
  }

  if (item.view === 'lsFiles') {
    return (
      <div className={styles.lsFilesContainer}>
        {item.files.map((f) => (
          <span
            key={f.name}
            className={`${styles.lsFileItem} ${f.type === 'directory' ? styles.lsDir : ''}`}
          >
            {f.name}{f.type === 'directory' ? '/' : ''}
          </span>
        ))}
      </div>
    );
  }

  if (item.view === 'history') {
    return (
      <div className={styles.historyList}>
        {item.history.map((h, idx) => (
          <div key={idx} className={styles.historyRow}>
            <span className={styles.historyNum}>{idx + 1}</span>
            <span className={styles.historyCmd}>{h}</span>
          </div>
        ))}
      </div>
    );
  }

  return <pre className={styles.rawText}>{JSON.stringify(item, null, 2)}</pre>;
}
