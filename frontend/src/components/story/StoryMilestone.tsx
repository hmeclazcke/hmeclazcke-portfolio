import type { StoryMilestone as StoryMilestoneData } from "./storyMilestones";
import styles from "./StorySection.module.css";

type StoryMilestoneProps = {
  milestone: StoryMilestoneData;
  isActive?: boolean;
  milestoneRef?: (element: HTMLLIElement | null) => void;
};

function StoryMilestone({
  milestone,
  isActive = false,
  milestoneRef,
}: StoryMilestoneProps) {
  const isTimeJump = milestone.visualKind === "time-jump";

  return (
    <li
      ref={milestoneRef}
      className={`${styles.milestone} ${isTimeJump ? styles.timeJump : ""}`}
      data-active={isActive}
      data-milestone-id={milestone.id}
    >
      <div className={styles.marker} aria-hidden="true" />
      <div className={styles.milestoneContent}>
        <p className={styles.period}>{milestone.period}</p>
        <h3 className={styles.milestoneTitle}>{milestone.title}</h3>
        {milestone.lines.map((line) => (
          <p key={line} className={styles.line}>
            {line}
          </p>
        ))}
      </div>
    </li>
  );
}

export default StoryMilestone;
