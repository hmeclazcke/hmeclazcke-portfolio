import styles from "./SiteFooter.module.css";

function SiteFooter() {
  return (
    <footer className={styles.footer} aria-label="Site footer">
      <div className={styles.rule} aria-hidden="true" />
    </footer>
  );
}

export default SiteFooter;
