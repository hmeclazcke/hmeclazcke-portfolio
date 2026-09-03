import { useEffect, useState } from "react";
import styles from "./SectionNavigation.module.css";

const majorSections = ["home", "about", "technology-graph"] as const;

const currentMajorSection = () => {
  const marker = window.scrollY + 2;
  return majorSections.reduce((activeIndex, id, index) => {
    const section = document.getElementById(id);
    if (!section) return activeIndex;
    const top = window.scrollY + section.getBoundingClientRect().top;
    return top <= marker ? index : activeIndex;
  }, 0);
};

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
    const target = document.getElementById(majorSections[index]!);
    if (!target) return;
    target.scrollIntoView({
      behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  return (
    <nav className={styles.navigation} aria-label="Section navigation">
      <button
        aria-label="Previous section"
        disabled={activeIndex === 0}
        onClick={() => goTo(activeIndex - 1)}
      >
        ⌃
      </button>
      <button
        aria-label="Next section"
        disabled={activeIndex === majorSections.length - 1}
        onClick={() => goTo(activeIndex + 1)}
      >
        ⌄
      </button>
    </nav>
  );
}

export default SectionNavigation;
