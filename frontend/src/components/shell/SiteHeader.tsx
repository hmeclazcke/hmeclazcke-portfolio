import { useEffect, useRef } from "react";
import { setSiteHeaderHeight } from "./siteHeaderHeight";
import styles from "./SiteHeader.module.css";

function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const updateHeight = () =>
      setSiteHeaderHeight(header.getBoundingClientRect().height);
    updateHeight();
    const observer =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(updateHeight);
    observer?.observe(header);
    window.addEventListener("resize", updateHeight);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <header className={styles.header} ref={headerRef}>
      <div className={styles.content}>
        <p className={styles.handle}>hmeclazcke</p>
        <nav className={styles.navigation} aria-label="Primary navigation">
          <a className={styles.storyLink} href="#about">
            Story
          </a>
          <a className={styles.storyLink} href="#technology-graph">
            Graph
          </a>
        </nav>
        <p className={styles.identity}>Hernán Meclazcke</p>
      </div>
    </header>
  );
}

export default SiteHeader;
