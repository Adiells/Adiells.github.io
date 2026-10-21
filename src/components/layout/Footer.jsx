import React from 'react';
import styles from './Footer.module.css';

const links = [
  ['Systems', '#projects'],
  ['Research', '#experience'],
  ['Capabilities', '#skills'],
  ['Contact', '#contact'],
];

export function Footer() {
  return <footer className={styles.footer}>
    <div className={styles.container}>
      <div className={styles.identity}><a className={styles.name} href="#home">Adiel Emilson</a><span>AI &amp; Data Systems Researcher</span><a className={styles.affiliation} href="https://www.ufpb.br/" target="_blank" rel="noreferrer">Federal University of Paraíba <span>UFPB</span></a></div>
      <nav className={styles.navigation} aria-label="Footer navigation">{links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
      <div className={styles.copyright}><span>© {new Date().getFullYear()} Adiel Emilson</span><span>João Pessoa, Brazil</span></div>
    </div>
  </footer>;
}
