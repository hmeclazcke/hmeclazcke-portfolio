import type { StoryMilestone as StoryMilestoneData } from "./storyMilestones";
import styles from "./StorySection.module.css";
type Props = {
  milestone: StoryMilestoneData;
  isActive?: boolean;
  hasTimeJumpBefore?: boolean;
  onSelect?: () => void;
};
function StoryMilestone({
  milestone,
  isActive = false,
  hasTimeJumpBefore = false,
  onSelect,
}: Props) {
  return (
    <li
      className={styles.milestone}
      data-active={isActive}
      data-time-jump-before={hasTimeJumpBefore || undefined}
      data-milestone-id={milestone.id}
    >
      <div className={styles.marker} aria-hidden="true" />
      <button
        className={styles.milestoneButton}
        type="button"
        aria-current={isActive ? "step" : undefined}
        onClick={onSelect}
      >
        <span className={styles.period}>{milestone.period}</span>
        <span className={styles.milestoneTitle}>{milestone.title}</span>
      </button>
      <div className={styles.milestoneNarrative}>
        {milestone.lines.map((line) => (
          <p key={line} className={styles.line}>
            {line}
          </p>
        ))}
        {milestone.media.length > 0 && (
          <div
            className={styles.mobileMedia}
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
        )}
      </div>
    </li>
  );
}
export default StoryMilestone;
