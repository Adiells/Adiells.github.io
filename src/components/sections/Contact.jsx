import React, { useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { Pane } from '../ui/Pane.jsx';
import styles from './Contact.module.css';

export function Contact({ profile, socials }) {
  const [copied, setCopied] = useState(false);

  const emailObj = socials.find((s) => s.id === 'email') || { handle: 'adielenilson@gmail.com' };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailObj.handle || 'adielenilson@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className={styles.contact} id="contact" aria-label="Contact Section">
      <SectionHeader
        id="contact"
        command="cat contact.json"
        comment="get in touch for collaborations and opportunities"
        user={profile.user}
        host={profile.host}
      />

      <div className={styles.grid}>
        {/* JSON Code Pane */}
        <Pane
          title="contact.json"
          actions={
            <button
              type="button"
              className={styles.copyBtn}
              onClick={handleCopyEmail}
              title="Copy email to clipboard"
            >
              {copied ? '✓ copied!' : '📋 copy email'}
            </button>
          }
          className={styles.jsonPane}
        >
          <pre className={styles.jsonCode}>
            <span className={styles.bracket}>{'{'}</span>
            {'\n  '}
            <span className={styles.key}>"name"</span>: <span className={styles.string}>"{profile.name}"</span>,
            {'\n  '}
            <span className={styles.key}>"status"</span>: <span className={styles.string}>"{profile.status}"</span>,
            {'\n  '}
            <span className={styles.key}>"email"</span>:{' '}
            <a href={`mailto:${emailObj.handle}`} className={styles.jsonLink}>
              "{emailObj.handle}"
            </a>,
            {'\n  '}
            <span className={styles.key}>"socials"</span>: <span className={styles.bracket}>{'{'}</span>
            {socials
              .filter((s) => s.id !== 'email')
              .map((s, idx, arr) => (
                <React.Fragment key={s.id}>
                  {'\n    '}
                  <span className={styles.key}>"{s.id}"</span>:{' '}
                  <a href={s.url} target="_blank" rel="noreferrer" className={styles.jsonLink}>
                    "{s.url}"
                  </a>
                  {idx < arr.length - 1 ? ',' : ''}
                </React.Fragment>
              ))}
            {'\n  '}
            <span className={styles.bracket}>{'}'}</span>,
            {'\n  '}
            <span className={styles.key}>"location"</span>: <span className={styles.string}>"{profile.location}"</span>
            {'\n'}
            <span className={styles.bracket}>{'}'}</span>
          </pre>
        </Pane>

        {/* Quick Channels Cards */}
        <div className={styles.channelsList}>
          {socials.map((s, idx) => (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className={styles.channelCard}
            >
              <div className={styles.channelTop}>
                <span className={styles.channelIdx}>0{idx + 1} //</span>
                <span className={styles.channelLabel}>{s.label}</span>
              </div>
              <div className={styles.channelValue}>{s.handle}</div>
              <div className={styles.channelAction}>
                <span>❯ connect</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
