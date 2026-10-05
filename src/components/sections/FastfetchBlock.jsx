import React from 'react';
import styles from './FastfetchBlock.module.css';

export function FastfetchBlock({
  profile,
  system,
  projectsCount = 2,
  labsCount = 3,
  skillsCount = 17,
  compact = false,
}) {
  // Compute uptime based on careerStart
  const start = new Date(profile.careerStart || '2025-06-01');
  const now = new Date();
  const diffMonths = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  const years = Math.floor(diffMonths / 12);
  const months = diffMonths % 12;
  const uptimeStr = `${years > 0 ? `${years} year${years > 1 ? 's' : ''}, ` : ''}${months} month${months > 1 ? 's' : ''} (in tech)`;

  return (
    <div className={`${styles.fastfetch} ${compact ? styles.compact : ''}`}>
      {/* ASCII Logo for Manjaro */}
      <div className={styles.logoCol} aria-hidden="true">
        <pre className={styles.asciiLogo}>
{`█████████  ████
█████████  ████
█████████  ████
████       ████
████  ███  ████
████  ███  ████
████  ███  ████`}
        </pre>
      </div>

      {/* Info Specs Column */}
      <div className={styles.infoCol}>
        <div className={styles.userHeader}>
          <span className={styles.userHost}>{profile.user}@{profile.host}</span>
          <span className={styles.divider}>-------------------</span>
        </div>

        <div className={styles.specsList}>
          <div className={styles.specRow}>
            <span className={styles.specKey}>OS</span>: <span className={styles.specVal}>{system.os}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specKey}>Host</span>: <span className={styles.specVal}>{system.host}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specKey}>Kernel</span>: <span className={styles.specVal}>react-19.2.0 (vite 7)</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specKey}>Uptime</span>: <span className={styles.specVal}>{uptimeStr}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specKey}>Packages</span>: <span className={styles.specVal}>{projectsCount} projects, {labsCount} labs, {skillsCount} skills (pacman)</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specKey}>Shell</span>: <span className={styles.specVal}>{system.shell}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specKey}>DE</span>: <span className={styles.specVal}>{system.de}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specKey}>WM</span>: <span className={styles.specVal}>{system.wm}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specKey}>Theme</span>: <span className={styles.specVal}>{system.theme}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specKey}>Font</span>: <span className={styles.specVal}>{system.font}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specKey}>Editor</span>: <span className={styles.specVal}>{system.editor}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specKey}>CPU</span>: <span className={styles.specVal}>{system.cpu}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specKey}>GPU</span>: <span className={styles.specVal}>{system.gpu}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specKey}>Memory</span>: <span className={styles.specVal}>{system.memory}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specKey}>Locale</span>: <span className={styles.specVal}>{system.locale}</span>
          </div>
        </div>

        {/* Dracula Palette Swatches */}
        <div className={styles.palette} aria-hidden="true">
          <span className={styles.swatchBlack} />
          <span className={styles.swatchRed} />
          <span className={styles.swatchGreen} />
          <span className={styles.swatchYellow} />
          <span className={styles.swatchPurple} />
          <span className={styles.swatchPink} />
          <span className={styles.swatchCyan} />
          <span className={styles.swatchWhite} />
        </div>
      </div>
    </div>
  );
}
