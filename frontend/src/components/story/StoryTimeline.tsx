import type { StoryMilestone as StoryMilestoneData } from "./storyMilestones";
import StoryMilestone from "./StoryMilestone";
import styles from "./StorySection.module.css";

type StoryTimelineProps = {
  milestones: readonly StoryMilestoneData[];
  activeId?: string;
  onMilestoneElement?: (id: string, element: HTMLLIElement | null) => void;
};

function StoryTimeline({
  milestones,
  activeId,
  onMilestoneElement,
}: StoryTimelineProps) {
  return (
    <ol className={styles.timeline} aria-label="Chronological story">
      {milestones.map((milestone) => (
        <StoryMilestone
          key={milestone.id}
          milestone={milestone}
          isActive={milestone.id === activeId}
          milestoneRef={(element) =>
            onMilestoneElement?.(milestone.id, element)
          }
        />
      ))}
    </ol>
  );
}

export default StoryTimeline;
