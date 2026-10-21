import React from 'react';
import { socials } from '../../data/portfolioData.js';
import { ArrowDownIcon, GitHubIcon, LinkedInIcon } from '../ui/Icons.jsx';
import styles from './Hero.module.css';

const profileLinks = socials.filter((social) => social.id === 'github' || social.id === 'linkedin');

export function Hero({ profile, onNavigate }) {
  const asset = (fileName) => `${import.meta.env.BASE_URL}${fileName}`;

  return (
    <section className={styles.hero} id="home" aria-labelledby="hero-title">
      <div className={styles.introCol}>
        <p className={styles.eyebrow}>
          <span className={styles.statusDot} aria-hidden="true" />
          <span>Adiel Emilson · Data Science &amp; AI @ UFPB</span>
        </p>

        <h1 className={styles.headline} id="hero-title">{profile.tagline}</h1>

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
          />
        </div>
      </div>
    </section>
  );
}
