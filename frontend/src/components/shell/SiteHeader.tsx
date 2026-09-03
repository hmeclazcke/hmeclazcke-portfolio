import styles from "./SiteHeader.module.css";

function SiteHeader() {
  return (
    <header className={styles.header}>
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
