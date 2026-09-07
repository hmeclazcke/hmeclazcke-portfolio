import { useEffect, useState, type PointerEvent } from "react";
import {
  activeMajorSectionIndex,
  majorSectionIds,
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
    ? activeMajorSectionIndex(window.scrollY, siteHeaderHeight(), starts, {
        documentHeight: document.documentElement.scrollHeight,
        viewportHeight: window.innerHeight,
      })
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

  const goToRelativeSection = (direction: -1 | 1) => {
    const activeSection = currentMajorSection();
    const targetIndex = activeSection + direction;
    if (targetIndex < 0 || targetIndex >= majorSectionIds.length) return;

    const targetId = majorSectionIds[targetIndex]!;
    const target = document.getElementById(targetId);
    if (!target) return;

    target.scrollIntoView({
      behavior: scrollBehavior(),
      block: "start",
      inline: "nearest",
    });
  };

  const preventUnavailablePointerInteraction = (
    event: PointerEvent<HTMLElement>,
  ) => {
    if ((event.target as Element).closest("button:disabled")) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const previousAvailable = activeIndex > 0;
  const nextAvailable = activeIndex < majorSectionIds.length - 1;

  return (
    <nav
      className={styles.navigation}
      aria-label="Section navigation"
      onPointerDownCapture={preventUnavailablePointerInteraction}
    >
      <button
        aria-label="Previous section"
        disabled={!previousAvailable}
        onClick={previousAvailable ? () => goToRelativeSection(-1) : undefined}
      >
        <Chevron direction="up" />
      </button>
      <button
        aria-label="Next section"
        disabled={!nextAvailable}
        onClick={nextAvailable ? () => goToRelativeSection(1) : undefined}
      >
        <Chevron direction="down" />
      </button>
    </nav>
  );
}

export default SectionNavigation;
