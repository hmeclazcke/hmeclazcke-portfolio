import styles from "./WorkInProgressBanner.module.css";

function WorkInProgressBanner() {
  return (
    <div
      className={styles.banner}
      role="status"
      aria-label="WORK IN PROGRESS — BUILDING THIS IN PUBLIC"
    >
      <span aria-hidden="true" className={styles.marker} />
      <span>WORK IN PROGRESS — BUILDING THIS IN PUBLIC</span>
    </div>
  );
}

export default WorkInProgressBanner;
