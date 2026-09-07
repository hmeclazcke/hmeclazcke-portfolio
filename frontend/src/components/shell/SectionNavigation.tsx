import { useEffect, useState } from "react";
import {
  activeMajorSectionIndex,
  majorSectionIds,
  majorSectionTarget,
  type MajorSectionStarts,
} from "./sectionNavigationModel";
import { siteHeaderHeight } from "./siteHeaderHeight";
import styles from "./SectionNavigation.module.css";

const sectionStarts = (): MajorSectionStarts | null => {
  const starts = {} as Record<(typeof majorSectionIds)[number], number>;

  for (const id of majorSectionIds) {
    if (id === "home") {
      starts[id] = 0;
      continue;
    }
    const section = document.getElementById(id);
    if (!section) return null;
    starts[id] = window.scrollY + section.getBoundingClientRect().top;
  }

  return starts;
};

const currentMajorSection = () => {
  const starts = sectionStarts();
  return starts
    ? activeMajorSectionIndex(window.scrollY, siteHeaderHeight(), starts)
    : 0;
};

const scrollBehavior = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";

function Chevron({ direction }: { direction: "up" | "down" }) {
  const path = direction === "up" ? "M3 9.5 8 4.5l5 5" : "M3 6.5 8 11.5l5-5";
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" focusable="false">
      <path d={path} fill="none" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

function SectionNavigation() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const updateActiveSection = () => setActiveIndex(currentMajorSection());
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const goTo = (index: number) => {
    const starts = sectionStarts();
    if (!starts) return;
    const top = majorSectionTarget(
      majorSectionIds[index]!,
      starts,
      siteHeaderHeight(),
    );
    window.scrollTo({ top, behavior: scrollBehavior() });
  };

  return (
    <nav className={styles.navigation} aria-label="Section navigation">
      <button
        aria-label="Previous section"
        disabled={activeIndex === 0}
        onClick={() => goTo(activeIndex - 1)}
      >
        <Chevron direction="up" />
      </button>
      <button
        aria-label="Next section"
        disabled={activeIndex === majorSectionIds.length - 1}
        onClick={() => goTo(activeIndex + 1)}
      >
        <Chevron direction="down" />
      </button>
    </nav>
  );
}

export default SectionNavigation;
