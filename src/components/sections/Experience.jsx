import React from 'react';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { Tag } from '../ui/Tag.jsx';
import styles from './Experience.module.css';

export function Experience({ experiences, user = 'adiel', host = 'manjaro-linux' }) {
  const asset = (fileName) => `${import.meta.env.BASE_URL}${fileName}`;

  return (
    <section className={styles.experience} id="experience" aria-label="Experience & Research Labs Section">
      <SectionHeader
        id="experience"
        command="journalctl -u career --reverse"
        comment="academic research leagues, labs & collaborations"
        user={user}
        host={host}
      />

      <div className={styles.logContainer}>
        <div className={styles.logHeader}>
          <span className={styles.logMeta}>-- Logs begin at 2025-06-01, entries: {experiences.length} --</span>
        </div>

        <div className={styles.timeline}>
          {experiences.map((exp) => (
            <article key={exp.title} className={styles.entry}>
              <div className={styles.entrySidebar}>
                <span className={styles.dateStamp}>{exp.date}</span>
                {exp.image && (
                  <div className={styles.logoWrapper}>
                    <img
                      src={asset(exp.image)}
                      alt={exp.title}
                      className={styles.labLogo}
                      loading="lazy"
                    />
                  </div>
                )}
              </div>

              <div className={styles.entryMain}>
                <div className={styles.entryTitleRow}>
                  <div className={styles.titleGroup}>
                    <span className={styles.unitName}>{exp.title}</span>
                    <span className={styles.unitSubtitle}>({exp.subtitle})</span>
                  </div>
                  <span className={styles.roleBadge}>[{exp.role}]</span>
                </div>

                <p className={styles.description}>{exp.description}</p>

                <div className={styles.tagsRow}>
                  {exp.tags.map((tag) => (
                    <Tag key={tag} label={tag} prefix="#" />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
