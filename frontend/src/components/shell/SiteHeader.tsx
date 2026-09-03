import styles from "./SiteHeader.module.css";

function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <p className={styles.handle}>hmeclazcke</p>
        <a className={styles.storyLink} href="#about">
          Story
        </a>
        <p className={styles.identity}>Hernán Meclazcke</p>
      </div>
    </header>
  );
}

export default SiteHeader;
