import type { StoryMilestone } from "./storyMilestones";
import styles from "./StorySection.module.css";

type StoryVisualProps = { milestone: StoryMilestone };

function StoryVisual({ milestone }: StoryVisualProps) {
  const hasMedia = milestone.media.length > 0;
  return (
    <aside className={styles.visual} aria-label="Story milestone emphasis">
      <div className={styles.visualFrame} data-has-media={hasMedia}>
        <p className={styles.visualPeriod}>{milestone.period}</p>
        {hasMedia ? (
          <div
            className={styles.mediaGrid}
            data-media-count={milestone.media.length}
          >
            {milestone.media.map((media) => (
              <img
                key={media.src}
                src={media.src}
                alt={media.alt}
                data-fit={media.fit ?? "contain"}
                loading="lazy"
              />
            ))}
          </div>
        ) : (
          <div className={styles.abstractMedia} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        )}
        <div className={styles.visualContent}>
          <p className={styles.visualTitle}>{milestone.title}</p>
          {milestone.lines.map((line) => (
            <p key={line} className={styles.visualLine}>
              {line}
            </p>
          ))}
        </div>
        <div className={styles.visualSignal} aria-hidden="true" />
      </div>
    </aside>
  );
}
export default StoryVisual;
