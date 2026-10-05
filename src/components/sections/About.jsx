import React from 'react';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { Pane } from '../ui/Pane.jsx';
import { PermBadge } from '../ui/PermBadge.jsx';
import { socials } from '../../data/portfolioData.js';
import styles from './About.module.css';

export function About({ profile }) {
  const asset = (fileName) => `${import.meta.env.BASE_URL}${fileName}`;

  return (
    <section className={styles.about} id="about" aria-label="About Biography Section">
      <SectionHeader
        id="about"
        command="cat about.txt"
        comment="biography, background & focus"
        user={profile.user}
        host={profile.host}
      />

      <div className={styles.grid}>
        {/* Bio Text Pane */}
        <Pane title="about.txt" className={styles.bioPane}>
          <div className={styles.bioContent}>
            {profile.bio.map((paragraph, idx) => (
              <p key={idx} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}

            <div className={styles.metaBlock}>
              <div className={styles.metaRow}>
                <span className={styles.metaKey}>education</span>:
                <span className={styles.metaVal}>{profile.education}</span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaKey}>location</span>:
                <span className={styles.metaVal}>{profile.location}</span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaKey}>status</span>:
                <span className={styles.metaVal}>
                  <PermBadge permissions="-rwxr-xr-x" /> {profile.status}
                </span>
              </div>
            </div>
          </div>
        </Pane>

        {/* Photo & Socials Pane */}
        <Pane title={profile.photo || 'eu.webp'} className={styles.photoPane}>
          <div className={styles.photoWrapper}>
            <img
              src={asset(profile.photo || 'eu.webp')}
              alt={profile.name}
              className={styles.photo}
            />
          </div>
          <div className={styles.socialList}>
            {socials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className={styles.socialItem}
              >
                <span className={styles.socialPrompt}>❯</span>
                <span className={styles.socialLabel}>{s.label}:</span>
                <span className={styles.socialHandle}>{s.handle}</span>
              </a>
            ))}
          </div>
        </Pane>
      </div>
    </section>
  );
}
