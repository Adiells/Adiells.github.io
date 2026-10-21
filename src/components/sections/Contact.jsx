import React, { useEffect, useState } from 'react';
import { ArrowUpRightIcon, CheckIcon, CopyIcon, MailIcon, GitHubIcon, LinkedInIcon } from '../ui/Icons.jsx';
import styles from './Contact.module.css';

const channelIcons = { github: GitHubIcon, linkedin: LinkedInIcon, email: MailIcon };

export function Contact({ profile, socials = [] }) {
  const [copyState, setCopyState] = useState('idle');
  const email = socials.find((social) => social.id === 'email');
  const emailAddress = email?.handle || email?.url?.replace(/^mailto:/, '') || '';

  useEffect(() => {
    if (copyState !== 'copied') return undefined;
    const timeout = window.setTimeout(() => setCopyState('idle'), 2200);
    return () => window.clearTimeout(timeout);
  }, [copyState]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopyState('copied');
    } catch {
      setCopyState('error');
      window.setTimeout(() => setCopyState('idle'), 3000);
    }
  };

  return <section className={styles.contact} id="contact" aria-labelledby="contact-title">
    <header className={styles.sectionHeader}><span>05 // DIRECT CHANNELS &amp; COLLABORATION</span><h2 id="contact-title">Start a conversation</h2></header>
    <div className={styles.contactIntro}>
      <div><span className={styles.availability}><span aria-hidden="true" />{profile.status}</span><p>Open to research collaborations, applied AI work, and software engineering opportunities.</p></div>
      {emailAddress && <div className={styles.emailActions}>
        <a className={styles.primaryAction} href={`mailto:${emailAddress}`}>Email Adiel <ArrowUpRightIcon size={18} /></a>
        <button type="button" className={styles.copyButton} onClick={handleCopyEmail}>
          {copyState === 'copied' ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
          {copyState === 'copied' ? 'Copied' : 'Copy email'}
        </button>
        <span className={styles.copyStatus} role="status" aria-live="polite">{copyState === 'error' ? 'Clipboard access unavailable. Use the email link.' : ''}</span>
      </div>}
    </div>
    <div className={styles.channels}>
      {socials.map((social) => {
        const Icon = channelIcons[social.id];
        return <a key={social.id} className={styles.channel} href={social.url} target={social.id === 'email' ? undefined : '_blank'} rel={social.id === 'email' ? undefined : 'noreferrer'}>
          <span className={styles.channelIcon}>{Icon && <Icon size={20} />}</span>
          <span className={styles.channelContent}><strong>{social.label}</strong><span>{social.handle}</span></span>
          <ArrowUpRightIcon size={18} className={styles.channelArrow} />
        </a>;
      })}
    </div>
  </section>;
}
