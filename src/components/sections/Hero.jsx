import React from 'react';
import { socials } from '../../data/portfolioData.js';
import { ArrowDownIcon, GitHubIcon, LinkedInIcon } from '../ui/Icons.jsx';
import styles from './Hero.module.css';

const profileLinks = socials.filter((social) => social.id === 'github' || social.id === 'linkedin');

const HIGHLIGHT = 'intelligent models';
const NO_BREAK = 'high-performance';

function renderPlain(text, styles) {
  const idx = text.indexOf(NO_BREAK);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className={styles.noBreak}>{NO_BREAK}</span>
      {text.slice(idx + NO_BREAK.length)}
    </>
  );
}

function renderHeadline(text, styles) {
  const idx = text.indexOf(HIGHLIGHT);
  if (idx === -1) return renderPlain(text, styles);
  return (
    <>
      {text.slice(0, idx)}
      <span className={styles.highlight}>{HIGHLIGHT}</span>
      {renderPlain(text.slice(idx + HIGHLIGHT.length), styles)}
    </>
  );
}

export function Hero({ profile, onNavigate }) {
  const asset = (fileName) => `${import.meta.env.BASE_URL}${fileName}`;

  return (
    <section className={styles.hero} id="home" aria-labelledby="hero-title">
      <div className={styles.introCol}>
        <div className={styles.identity}>
          <span className={styles.avatarWrap}>
            <img
              src={asset(profile.photo || 'eu.webp')}
              alt=""
              aria-hidden="true"
              className={styles.eyebrowAvatar}
              width="72"
              height="72"
            />
            <span className={styles.avatarBadge} aria-hidden="true" />
          </span>
          <div className={styles.identityText}>
            <h1 className={styles.name} id="hero-title">{profile.name || 'Adiel Emilson'}</h1>
            <p className={styles.eyebrow}>
              <span className={styles.statusDot} aria-hidden="true" />
              <span>Data Science &amp; AI @ UFPB</span>
            </p>
          </div>
        </div>

        <p className={styles.headline}>{renderHeadline(profile.tagline, styles)}</p>

        <p className={styles.bio}>{profile.bio?.[0]}</p>

        <div className={styles.actions}>
          <button type="button" className={styles.primaryAction} onClick={() => onNavigate?.('projects')}>
            <span>View Projects</span>
            <ArrowDownIcon size={16} />
          </button>
          <button type="button" className={styles.secondaryAction} onClick={() => onNavigate?.('contact')}>
            Get in Touch
          </button>
          <nav className={styles.socialLinks} aria-label="Professional profiles">
            {profileLinks.map((social) => (
              <a
                key={social.id}
                className={styles.socialLink}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                title={social.label}
              >
                {social.id === 'github' ? <GitHubIcon size={18} /> : <LinkedInIcon size={18} />}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className={styles.portraitCol}>
        <div className={styles.circularPortrait}>
          <img
            src={asset(profile.photo || 'eu.webp')}
            alt={profile.name}
            className={styles.portraitImg}
            width="280"
            height="280"
          />
        </div>
      </div>
    </section>
  );
}
