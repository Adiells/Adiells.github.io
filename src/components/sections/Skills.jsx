import React from 'react';
import styles from './Skills.module.css';

export function Skills({ skills = [] }) {
  return <section className={styles.skills} id="skills" aria-labelledby="skills-title">
    <header className={styles.sectionHeader}><span>04 // ENGINEERING CAPABILITIES MATRIX</span><h2 id="skills-title">Engineering capabilities</h2></header>
    <div className={styles.grid}>{skills.map((layer, index) => <article className={styles.layer} key={layer.slug || layer.title}>
      <div className={styles.layerTop}><span className={styles.layerBadge}>LAYER {layer.layer || `0${index + 1}`}</span><span className={styles.layerRef}>CAPABILITY / 0{index + 1}</span></div>
      <h3>{layer.title}</h3>
      <p className={styles.subtitle}>{layer.subtitle}</p>
      <p className={styles.description}>{layer.description}</p>
      <ul className={styles.items} aria-label={`${layer.title} capabilities`}>{layer.items.map((item, itemIndex) => <li key={item}><span className={styles.itemIndex}>0{itemIndex + 1}</span><span>{item}</span></li>)}</ul>
    </article>)}</div>
  </section>;
}
