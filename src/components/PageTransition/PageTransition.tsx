"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import styles from "./PageTransition.module.scss";

export default function PageTransition() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const [transitionId, setTransitionId] = useState(0);

  useLayoutEffect(() => {
    if (previousPathname.current === pathname) return;

    previousPathname.current = pathname;
    setTransitionId((current) => current + 1);
  }, [pathname]);

  if (transitionId === 0) return null;

  return (
    <div
      className={styles.transition}
      data-page-transition
      aria-hidden="true"
      key={transitionId}
    >
      <span className={styles.accentPanel} />
      <span className={styles.inkPanel} />
    </div>
  );
}
