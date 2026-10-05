import React, { useState } from 'react';
import { FastfetchBlock } from './FastfetchBlock.jsx';
import { CommandButton } from '../ui/CommandButton.jsx';
import { Cursor } from '../ui/Cursor.jsx';
import { Prompt } from '../ui/Prompt.jsx';
import { PermBadge } from '../ui/PermBadge.jsx';
import { socials } from '../../data/portfolioData.js';
import styles from './Hero.module.css';

export function Hero({
  profile,
  system,
  projectsCount,
  labsCount,
  skillsCount,
  onNavigate,
  onOpenShell,
}) {
  const asset = (fileName) => `${import.meta.env.BASE_URL}${fileName}`;
  const [showFetch, setShowFetch] = useState(false);

  return (
    <section className={styles.hero} id="home" aria-label="Hero Introduction">
      {/* Top command header */}
      <div className={styles.commandHeader}>
        <Prompt user={profile.user} host={profile.host} path="~" branch="" />
        <span className={styles.cmdText}>whoami</span>
      </div>

      {/* Main Terminal Window Frame */}
      <div className={styles.terminalWindow}>
        <div className={styles.windowHeader}>
          <div className={styles.windowControls}>
            <span className={`${styles.dot} ${styles.dotRed}`} />
            <span className={`${styles.dot} ${styles.dotYellow}`} />
            <span className={`${styles.dot} ${styles.dotGreen}`} />
          </div>
          <span className={styles.windowTitle}>{profile.user}@{profile.host}: ~ (profile)</span>
          <div className={styles.windowActions}>
            <button
              type="button"
              className={`${styles.fetchToggleBtn} ${showFetch ? styles.fetchToggleActive : ''}`}
              onClick={() => setShowFetch(!showFetch)}
              title="Toggle system fastfetch output"
            >
              <span className={styles.fetchIcon}>⚙</span>
              <span>{showFetch ? 'hide fastfetch' : 'fastfetch'}</span>
            </button>
          </div>
        </div>

        <div className={styles.windowBody}>
          {/* Main Identity Grid: Photo + Bio & Core Intro */}
          <div className={styles.profileGrid}>
            {/* Photo Column */}
            <div className={styles.photoCol}>
              <div className={styles.photoFrame}>
                <img
                  src={asset(profile.photo || 'eu.webp')}
                  alt={profile.name}
                  className={styles.photo}
                />
              </div>
              <div className={styles.statusBadge}>
                <PermBadge permissions="-rwxr-xr-x" />
                <span className={styles.statusText}>{profile.status}</span>
              </div>
            </div>

            {/* Intro Details Column */}
            <div className={styles.detailsCol}>
              <h1 className={styles.name}>
                {profile.name}
                <Cursor style="block" />
              </h1>
              <div className={styles.roleTitle}>{profile.role}</div>
              <p className={styles.tagline}>{profile.tagline}</p>

              <div className={styles.bioExcerpt}>
                {profile.bio.map((paragraph, idx) => (
                  <p key={idx} className={styles.bioParagraph}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className={styles.metaRow}>
                <div className={styles.metaItem}>
                  <span className={styles.metaKey}>education</span>:
                  <span className={styles.metaVal}>{profile.education}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaKey}>location</span>:
                  <span className={styles.metaVal}>{profile.location}</span>
                </div>
              </div>

              {/* Action and Navigation Buttons */}
              <div className={styles.buttonRow}>
                <CommandButton
                  command="ls projects/"
                  variant="primary"
                  onClick={() => onNavigate('projects')}
                />
                <CommandButton
                  command="cat contact.json"
                  onClick={() => onNavigate('contact')}
                />
                <CommandButton
                  command={showFetch ? 'hide fastfetch' : 'fastfetch'}
                  onClick={() => setShowFetch(!showFetch)}
                />
                <CommandButton
                  command="open shell (⌘K)"
                  onClick={onOpenShell}
                />
              </div>

              {/* Quick Social Links */}
              <div className={styles.socialBar}>
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.socialLink}
                  >
                    <span className={styles.socialPrompt}>❯</span>
                    <span className={styles.socialLabel}>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Fastfetch expandable drawer / toggle section */}
          {showFetch && (
            <div className={styles.fetchDrawer}>
              <div className={styles.fetchDrawerHeader}>
                <Prompt user={profile.user} host={profile.host} path="~" branch="" />
                <span className={styles.fetchCmdTitle}>fastfetch --stdout</span>
              </div>
              <FastfetchBlock
                profile={profile}
                system={system}
                projectsCount={projectsCount}
                labsCount={labsCount}
                skillsCount={skillsCount}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
