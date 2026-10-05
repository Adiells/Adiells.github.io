import React, { useEffect, useRef, useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader.jsx';
import { Pane } from '../ui/Pane.jsx';
import { PermBadge } from '../ui/PermBadge.jsx';
import { Tag } from '../ui/Tag.jsx';
import styles from './Projects.module.css';

function ProjectItem({ project }) {
  const asset = (fileName) => `${import.meta.env.BASE_URL}${fileName}`;
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.projectCard} id={`project-${project.slug}`}>
      <Pane
        title={`projects/${project.slug}.md`}
        actions={<span className={styles.year}>{project.year}</span>}
      >
        <div className={styles.projectGrid}>
          {/* Media preview */}
          <div className={styles.mediaSide}>
            {project.media && !videoError ? (
              <div className={styles.videoFrame}>
                <video
                  ref={videoRef}
                  src={asset(project.media)}
                  className={styles.video}
                  muted
                  loop
                  playsInline
                  preload="none"
                  onError={() => setVideoError(true)}
                />
              </div>
            ) : (
              <div className={styles.placeholderMedia}>
                <span>[No video preview]</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className={styles.infoSide}>
            <div className={styles.cardHeader}>
              <div className={styles.permsRow}>
                <PermBadge permissions={project.permissions || 'drwxr-xr-x'} />
                <span className={styles.categoryBadge}>{project.category}</span>
              </div>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              {project.highlight && (
                <div className={styles.highlightText}># {project.highlight}</div>
              )}
            </div>

            <p className={styles.description}>{project.description}</p>

            <div className={styles.toolsList}>
              {project.tools.map((tool) => (
                <Tag key={tool} label={tool} />
              ))}
            </div>

            <div className={styles.actionsRow}>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className={styles.repoLink}
              >
                <span className={styles.repoPrompt}>❯</span>
                <span className={styles.repoCmd}>git clone</span>
                <span className={styles.repoUrl}>{project.link}</span>
              </a>
            </div>
          </div>
        </div>
      </Pane>
    </div>
  );
}

export function Projects({ projects, user = 'adiel', host = 'manjaro-linux' }) {
  return (
    <section className={styles.projects} id="projects" aria-label="Projects Section">
      <SectionHeader
        id="projects"
        command="ls -l projects/"
        comment="catalog of machine learning and low-level software"
        user={user}
        host={host}
      />

      {/* Directory listing summary header */}
      <div className={styles.listingHeader}>
        <span className={styles.totalInfo}>total {projects.length} dirs</span>
        <span className={styles.columnsGuide}>perms &bull; user &bull; category &bull; year &bull; name</span>
      </div>

      <div className={styles.projectsList}>
        {projects.map((project) => (
          <ProjectItem key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
