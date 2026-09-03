import { useCallback, useEffect, useRef, useState } from "react";
import { storyMilestones } from "./storyMilestones";
import StoryTimeline from "./StoryTimeline";
import StoryVisual from "./StoryVisual";
import styles from "./StorySection.module.css";

const desktopMediaQuery = "(min-width: 64rem) and (pointer: fine)";

function StorySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [desktopPresentation, setDesktopPresentation] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const finalIndex = storyMilestones.length - 1;
  const updateFromScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section || !desktopPresentation) return;
    const top = window.scrollY + section.getBoundingClientRect().top;
    const distance = Math.max(1, section.offsetHeight - window.innerHeight);
    const progress = Math.min(
      1,
      Math.max(0, (window.scrollY - top) / distance),
    );
    setActiveIndex(Math.round(progress * finalIndex));
  }, [desktopPresentation, finalIndex]);

  useEffect(() => {
    const query = window.matchMedia?.(desktopMediaQuery);
    if (!query) return;
    const update = () => setDesktopPresentation(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!desktopPresentation) {
      return;
    }
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateFromScroll);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [desktopPresentation, updateFromScroll]);

  useEffect(() => {
    const section = sectionRef.current;
    if (
      desktopPresentation ||
      !section ||
      typeof IntersectionObserver !== "function"
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const currentEntry = entries.find(
          (entry) => entry.isIntersecting && entry.intersectionRatio >= 0.55,
        );
        const milestoneId =
          currentEntry?.target.getAttribute("data-milestone-id");
        const index = storyMilestones.findIndex(
          (milestone) => milestone.id === milestoneId,
        );
        if (index >= 0) setActiveIndex(index);
      },
      { threshold: [0, 0.55, 1], rootMargin: "-15% 0px -45% 0px" },
    );

    section
      .querySelectorAll<HTMLElement>("[data-milestone-id]")
      .forEach((milestone) => observer.observe(milestone));
    const activateFinalMilestoneAtDocumentBottom = () => {
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 1
      ) {
        setActiveIndex(finalIndex);
      }
    };
    window.addEventListener("scroll", activateFinalMilestoneAtDocumentBottom, {
      passive: true,
    });
    return () => {
      observer.disconnect();
      window.removeEventListener(
        "scroll",
        activateFinalMilestoneAtDocumentBottom,
      );
    };
  }, [desktopPresentation, finalIndex]);

  const moveToIndex = useCallback(
    (index: number) => {
      const section = sectionRef.current;
      if (!desktopPresentation || !section) {
        setActiveIndex(index);
        return;
      }
      const top = window.scrollY + section.getBoundingClientRect().top;
      const distance = Math.max(0, section.offsetHeight - window.innerHeight);
      window.scrollTo({ top: top + (distance * index) / finalIndex });
    },
    [desktopPresentation, finalIndex],
  );
  const selectMilestone = useCallback(
    (id: string) => {
      const index = storyMilestones.findIndex((item) => item.id === id);
      if (index >= 0) moveToIndex(index);
    },
    [moveToIndex],
  );
  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!desktopPresentation || event.altKey || event.ctrlKey || event.metaKey)
      return;
    const direction =
      event.key === "ArrowDown" || event.key === "ArrowRight"
        ? 1
        : event.key === "ArrowUp" || event.key === "ArrowLeft"
          ? -1
          : 0;
    const next = activeIndex + direction;
    if (!direction || next < 0 || next > finalIndex) return;
    event.preventDefault();
    moveToIndex(next);
  };
  const activeMilestone = storyMilestones[activeIndex]!;
  return (
    <section
      ref={sectionRef}
      className={styles.scrollSpace}
      id="about"
      aria-labelledby="story-heading"
      data-desktop-presentation={desktopPresentation}
    >
      <div
        className={styles.stage}
        tabIndex={desktopPresentation ? 0 : undefined}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.intro}>
          <p className={styles.eyebrow}>A CHRONOLOGICAL STORY</p>
          <h2 id="story-heading">Explore My Story</h2>
        </div>
        <div className={styles.composition}>
          <StoryTimeline
            milestones={storyMilestones}
            activeId={activeMilestone.id}
            onMilestoneSelect={selectMilestone}
          />
          <StoryVisual milestone={activeMilestone} />
        </div>
      </div>
    </section>
  );
}
export default StorySection;
