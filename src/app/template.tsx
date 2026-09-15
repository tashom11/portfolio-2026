import styles from "./template.module.scss";

export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className={styles.transition} data-page-transition aria-hidden="true">
        <span className={styles.accentPanel} />
        <span className={styles.inkPanel} />
      </div>
      {children}
    </>
  );
}
