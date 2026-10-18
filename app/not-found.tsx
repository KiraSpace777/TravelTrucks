"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./not-found.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundContainer}>
      <Image
        src="/image/no-campers-found.png"
        alt="Page Not Found image connector description item"
        width={488}
        height={464}
        priority={true}
        className={styles.notFoundImage}
      />

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
