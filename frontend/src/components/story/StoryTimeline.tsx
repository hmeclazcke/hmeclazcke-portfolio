import type { StoryMilestone as StoryMilestoneData } from "./storyMilestones";
import StoryMilestone from "./StoryMilestone";
import styles from "./StorySection.module.css";

type StoryTimelineProps = {
  milestones: readonly StoryMilestoneData[];
  activeId?: string;
  onMilestoneSelect?: (id: string) => void;
};

function StoryTimeline({
  milestones,
  activeId,
  onMilestoneSelect,
}: StoryTimelineProps) {
  return (
    <ol className={styles.timeline} aria-label="Chronological story">
      {milestones.map((milestone) => (
        <StoryMilestone
          key={milestone.id}
          milestone={milestone}
          isActive={milestone.id === activeId}
          hasTimeJumpBefore={milestone.id === "still-learning"}
          onSelect={() => onMilestoneSelect?.(milestone.id)}
        />
      ))}
    </ol>
  );
}

export default StoryTimeline;
