import styles from "./SiteHeader.module.css";

function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <p className={styles.handle}>hmeclazcke</p>
        <p className={styles.identity}>Hernán Meclazcke</p>
        <a className={styles.storyLink} href="#about">
          Story
        </a>
      </div>
    </header>
  );
}

export default SiteHeader;
