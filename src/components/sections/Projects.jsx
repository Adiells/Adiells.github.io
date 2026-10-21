import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRightIcon, GitHubIcon } from '../ui/Icons.jsx';
import styles from './Projects.module.css';

function MediaPreview({ project }) {
  const videoRef = useRef(null);
  const [failed, setFailed] = useState(false);
  const src = `${import.meta.env.BASE_URL}${project.media}`;

  useEffect(() => {
    setFailed(false);
  }, [project.media]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.25 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [project.media, failed]);

  return (
    <div className={styles.videoFrame}>
      {!failed && project.media ? project.mediaType === 'image' ? (
        <img src={src} alt={`${project.title} application preview`} className={styles.media} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <video ref={videoRef} src={src} className={styles.media} muted loop playsInline preload="none" aria-label={`${project.title} application preview`} onError={() => setFailed(true)} />
      ) : <div className={styles.mediaFallback} aria-label="Preview unavailable">Preview unavailable</div>}
    </div>
  );
}

function Architecture({ project }) {
  const nodes = project.architecture?.nodes || project.architectureNodes || [];
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [project.slug]);

  if (!nodes.length) return null;
  const selectedNode = nodes[selectedIndex] || nodes[0];

  return <div className={styles.architecture}>
    <div className={styles.pipelineHeader}>
      <span className={styles.pipelineLabel}>SYSTEM PIPELINE</span>
      <span className={styles.pipelineHint}>Select a stage to inspect</span>
    </div>
    <div className={styles.pipeline} role="group" aria-label={`${project.title} architecture stages`}>
      {nodes.map((node, index) => <button
        className={`${styles.stage} ${index === selectedIndex ? styles.stageSelected : ''}`}
        key={node.id}
        id={`${project.slug}-stage-${node.id}`}
        type="button"
        aria-pressed={index === selectedIndex}
        aria-controls={`${project.slug}-stage-specification`}
        onClick={() => setSelectedIndex(index)}
      >
        <span className={styles.stageIndex}>0{index + 1}</span>
        <span className={styles.stageLabel}>{node.stage}</span>
        <strong>{node.title}</strong>
        {index < nodes.length - 1 && <span className={styles.stageConnector} aria-hidden="true">→</span>}
      </button>)}
    </div>
    <section
      className={styles.stageSpecification}
      id={`${project.slug}-stage-specification`}
      aria-labelledby={`${project.slug}-stage-${selectedNode.id}`}
      role="region"
      aria-live="polite"
      tabIndex={0}
    >
      <div className={styles.specificationHeading}>
        <span>{selectedNode.stage}</span>
        <h4>{selectedNode.title}</h4>
      </div>
      <p className={styles.stageTech}>{selectedNode.tech}</p>
      <p className={styles.stageDetail}>{selectedNode.detail}</p>
    </section>
  </div>;
}

function Metrics({ metrics }) {
  return <div className={styles.metrics}>{metrics?.map((metric) => <div className={styles.metric} key={metric.label}>
    <span>{metric.label}</span><strong>{metric.value}</strong>
  </div>)}</div>;
}

function TechList({ tools }) {
  return <ul className={styles.techList} aria-label="Technologies">{tools?.map((tool) => <li key={tool}>{tool}</li>)}</ul>;
}

function ProjectLinks({ project, flagship = false }) {
  return <div className={styles.actions}>
    {flagship && project.link && <a className={styles.primaryAction} href={project.link} target="_blank" rel="noreferrer">Launch Live App <ArrowUpRightIcon size={18} /></a>}
    {project.repo && <a className={flagship ? styles.secondaryAction : styles.sourceLink} href={project.repo} target="_blank" rel="noreferrer">{flagship ? 'Source Code' : 'View source'} <GitHubIcon size={18} /></a>}
  </div>;
}

function ProjectCard({ project }) {
  return <article className={styles.projectCard} id={`project-${project.slug}`}>
    <MediaPreview project={project} />
    <div className={styles.cardBody}>
      <div className={styles.meta}><span>{project.category}</span><span>{project.year}</span></div>
      <h3>{project.title}</h3>
      <p className={styles.highlight}>{project.highlight}</p>
      <p className={styles.summary}>{project.architecture?.summary}</p>
      <Architecture project={project} />
      <Metrics metrics={project.architecture?.metrics || project.metrics} />
      <TechList tools={project.tools} />
      <ProjectLinks project={project} />
    </div>
  </article>;
}

export function Projects({ projects = [] }) {
  const flagship = projects.find((project) => project.flagship);
  const studies = projects.filter((project) => !project.flagship);
  return <section className={styles.projects} id="projects" aria-labelledby="projects-title">
    <header className={styles.sectionHeader}><span>02 // SELECTED SYSTEMS &amp; CASE STUDIES</span><h2 id="projects-title">Selected systems</h2></header>
    {flagship && <article className={styles.flagship} id={`project-${flagship.slug}`}>
      <div className={styles.flagshipContent}>
        <div className={styles.meta}><span>{flagship.category}</span><span>{flagship.year}</span></div>
        <h3>{flagship.title}</h3>
        <p className={styles.highlight}>{flagship.highlight}</p>
        <p className={styles.description}>{flagship.description}</p>
        <Architecture project={flagship} />
        <Metrics metrics={flagship.architecture?.metrics || flagship.metrics} />
        <TechList tools={flagship.tools} />
        <ProjectLinks project={flagship} flagship />
      </div>
      <MediaPreview project={flagship} />
    </article>}
    <div className={styles.projectGrid}>{studies.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
  </section>;
}
