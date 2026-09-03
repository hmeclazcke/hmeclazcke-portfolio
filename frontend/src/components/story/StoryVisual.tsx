import type { StoryMilestone } from "./storyMilestones";
import styles from "./StorySection.module.css";

type StoryVisualProps = {
  milestone: StoryMilestone;
};

function StoryVisual({ milestone }: StoryVisualProps) {
  return (
    <aside className={styles.visual} aria-label="Story milestone emphasis">
      <div
        className={styles.visualFrame}
        data-visual-kind={milestone.visualKind}
      >
        <p className={styles.visualPeriod}>{milestone.period}</p>
        <p className={styles.visualTitle}>{milestone.title}</p>
        <div className={styles.visualSignal} aria-hidden="true" />
      </div>
    </aside>
  );
}

export default StoryVisual;
