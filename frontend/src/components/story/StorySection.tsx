import { useCallback, useEffect, useRef, useState } from "react";
import { storyMilestones } from "./storyMilestones";
import StoryTimeline from "./StoryTimeline";
import StoryVisual from "./StoryVisual";
import styles from "./StorySection.module.css";

function StorySection() {
  const [activeId, setActiveId] = useState(storyMilestones[0]!.id);
  const [desktopEnhancement, setDesktopEnhancement] = useState(
    () =>
      window.matchMedia?.("(min-width: 64rem) and (pointer: fine)").matches ??
      false,
  );
  const milestoneElements = useRef(new Map<string, HTMLLIElement>());

  const onMilestoneElement = useCallback(
    (id: string, element: HTMLLIElement | null) => {
      if (element) {
        milestoneElements.current.set(id, element);
      } else {
        milestoneElements.current.delete(id);
      }
    },
    [],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia?.(
      "(min-width: 64rem) and (pointer: fine)",
    );

    if (!mediaQuery) {
      return;
    }

    const updateEnhancement = () => setDesktopEnhancement(mediaQuery.matches);
    mediaQuery.addEventListener("change", updateEnhancement);

    return () => mediaQuery.removeEventListener("change", updateEnhancement);
  }, []);

  useEffect(() => {
    if (
      !desktopEnhancement ||
      typeof window.IntersectionObserver !== "function"
    ) {
      return;
    }

    const intersecting = new Map<string, IntersectionObserverEntry>();
    const order = new Map(
      storyMilestones.map((milestone, index) => [milestone.id, index]),
    );
    const elementIds = new Map<Element, string>(
      [...milestoneElements.current.entries()].map(([id, element]) => [
        element,
        id,
      ]),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const observerEntry of entries) {
          const id = elementIds.get(observerEntry.target);

          if (!id) {
            continue;
          }

          if (observerEntry.isIntersecting) {
            intersecting.set(id, observerEntry);
          } else {
            intersecting.delete(id);
          }
        }

        const nextActiveId = [...intersecting.entries()]
          .sort(([leftId, leftEntry], [rightId, rightEntry]) => {
            const rootCenter =
              (leftEntry.rootBounds?.top ?? 0) +
              (leftEntry.rootBounds?.height ?? window.innerHeight) / 2;
            const leftDistance = Math.abs(
              leftEntry.boundingClientRect.top +
                leftEntry.boundingClientRect.height / 2 -
                rootCenter,
            );
            const rightDistance = Math.abs(
              rightEntry.boundingClientRect.top +
                rightEntry.boundingClientRect.height / 2 -
                rootCenter,
            );

            return (
              leftDistance - rightDistance ||
              order.get(leftId)! - order.get(rightId)!
            );
          })
          .at(0)?.[0];

        if (nextActiveId) {
          setActiveId((currentId) =>
            currentId === nextActiveId ? currentId : nextActiveId,
          );
        }
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );

    for (const element of milestoneElements.current.values()) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [desktopEnhancement]);

  const activeMilestone =
    storyMilestones.find((milestone) => milestone.id === activeId) ??
    storyMilestones[0]!;

  return (
    <section
      className={styles.section}
      id="about"
      aria-labelledby="story-heading"
    >
      <div className={styles.intro}>
        <p className={styles.eyebrow}>A CHRONOLOGICAL STORY</p>
        <h2 id="story-heading">Explore My Story</h2>
      </div>
      <div className={styles.composition}>
        <StoryTimeline
          milestones={storyMilestones}
          activeId={activeId}
          onMilestoneElement={onMilestoneElement}
        />
        <StoryVisual milestone={activeMilestone} />
      </div>
    </section>
  );
}

export default StorySection;
