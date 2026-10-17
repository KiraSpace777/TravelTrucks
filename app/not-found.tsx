"use client";

import Link from "next/link";
import styles from "./not-found.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundContainer}>
      <svg className={styles.notFoundIcon}>
        <use href="/sprite.svg#car-structure" />
      </svg>
      <h1 className={`${styles.notFoundTitle} interSemiBold`}>Page Not Found</h1>
      <p className={`${styles.notFoundDescription} interRegular`}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className={`${styles.backHomeButton} btn interMedium`}>
        Return Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
