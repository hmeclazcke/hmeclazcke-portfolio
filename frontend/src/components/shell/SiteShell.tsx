import type { ReactNode } from "react";
import styles from "./SiteShell.module.css";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

type SiteShellContentWidth = "readable" | "wide" | "full";

type SiteShellProps = {
  children: ReactNode;
  contentWidth?: SiteShellContentWidth;
};

function SiteShell({ children, contentWidth = "readable" }: SiteShellProps) {
  return (
    <div className={styles.shell}>
      <SiteHeader />
      <main
        className={styles.main}
        aria-label="Application"
        data-content-width={contentWidth}
      >
        <div className={`${styles.content} ${styles[contentWidth]}`}>
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export default SiteShell;
