import React from 'react';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { Pane } from '../ui/Pane.jsx';
import styles from './Skills.module.css';

function SkillTreeGroup({ group }) {
  return (
    <Pane title={`skills/${group.slug || group.title.toLowerCase().replace(/\s+/g, '-')}/`} className={styles.treePane}>
      <p className={styles.groupDesc}># {group.description}</p>
      
      <div className={styles.treeContainer}>
        <div className={styles.treeRoot}>
          <span className={styles.dirIcon}>📁</span>
          <span className={styles.dirName}>{group.title}</span>
        </div>

        <div className={styles.treeItems}>
          {group.items.map((item, idx) => {
            const isLast = idx === group.items.length - 1;
            const branch = isLast ? '└── ' : '├── ';
            return (
              <div key={item} className={styles.treeRow}>
                <span className={styles.branchSymbol}>{branch}</span>
                <span className={styles.fileName}>{item}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Pane>
  );
}

export function Skills({ skills, user = 'adiel', host = 'manjaro-linux' }) {
  const totalItems = skills.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <section className={styles.skills} id="skills" aria-label="Technical Skills Tree Section">
      <SectionHeader
        id="skills"
        command="tree skills/"
        comment="applied data science, machine learning & toolkits"
        user={user}
        host={host}
      />

      <div className={styles.grid}>
        {skills.map((group) => (
          <SkillTreeGroup
            key={group.title}
            group={group}
          />
        ))}
      </div>

      <div className={styles.treeSummary}>
        <span className={styles.summaryText}>
          {skills.length} directories, {totalItems} files
        </span>
      </div>
    </section>
  );
}
