"use client";

// import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavigationHeader.module.css";

export const NavigationHeader = () => {
  const currentActivePathname = usePathname();

  return (
    <header className={styles.navigationContainer}>
      <div className={styles.navigationContent}>
        <Link href="/" className={styles.brandLogoWrapper} aria-label="TravelTrucks Home">
          <svg className={styles.brandLogoIcon}>
            <use href="/sprite.svg#logo-brand" />
          </svg>
        </Link>
        <nav className={styles.navigationLinksList}>
          <Link
            href="/"
            className={`${styles.navigationLinkItem} ${
              currentActivePathname === "/" ? styles.activeNavigationLinkItem : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/catalog"
            className={`${styles.navigationLinkItem} ${
              currentActivePathname === "/catalog" ? styles.activeNavigationLinkItem : ""
            }`}
          >
            Catalog
          </Link>
        </nav>
        <div className={styles.emptySpacerNode} />
      </div>
    </header>
  );
};
