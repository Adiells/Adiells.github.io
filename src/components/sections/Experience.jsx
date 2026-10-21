import React from 'react';
import styles from './Experience.module.css';

export function Experience({ experiences = [] }) {
  const asset = (fileName) => `${import.meta.env.BASE_URL}${fileName}`;
  return <section className={styles.experience} id="experience" aria-labelledby="experience-title">
    <header className={styles.sectionHeader}><span>03 // RESEARCH LABS &amp; ACADEMIC LEAGUES</span><h2 id="experience-title">Research index</h2></header>
    <div className={styles.index}>
      {experiences.map((exp, index) => <article className={styles.entry} key={exp.id || exp.title}>
        <div className={styles.identity}>
          <span className={styles.period}>{exp.date}</span>
          <span className={styles.domain}>{exp.domain}</span>
          <div className={styles.logoFrame}><img src={asset(exp.image)} alt={`${exp.title} logo`} className={styles.logo} loading="lazy" /></div>
        </div>
        <div className={styles.details}>
          <span className={styles.entryNumber}>RESEARCH GROUP / 0{index + 1}</span>
          <h3>{exp.title}</h3>
          <p className={styles.subtitle}>{exp.subtitle}</p>
          <span className={styles.role}>{exp.role}</span>
          <p className={styles.description}>{exp.description}</p>
        </div>
        <ul className={styles.tags} aria-label={`${exp.title} research areas`}>{exp.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
      </article>)}
    </div>
  </section>;
}
