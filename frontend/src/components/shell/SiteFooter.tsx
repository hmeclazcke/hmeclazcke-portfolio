import styles from "./SiteFooter.module.css";

const contactAsset = (filename: string) =>
  `${import.meta.env.BASE_URL}contact/${filename}`;

function SiteFooter() {
  return (
    <footer className={styles.footer} id="contact" aria-label="Contact">
      <div className={styles.contactCluster}>
        <img
          className={styles.piedra}
          src={contactAsset("piedra-movediza-lineart.png")}
          alt=""
          aria-hidden="true"
        />
        <div className={styles.profileLinks}>
          <a
            className={styles.profileLink}
            href="https://www.linkedin.com/in/h-meclazcke/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <img src={contactAsset("linkedin-white.svg")} alt="" />
          </a>
          <a
            className={styles.profileLink}
            href="https://github.com/hmeclazcke"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <img src={contactAsset("github-white.svg")} alt="" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
