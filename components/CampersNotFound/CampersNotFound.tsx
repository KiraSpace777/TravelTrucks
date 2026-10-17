"use client";

// import React from "react";
import Image from "next/image";
import styles from "./CampersNotFound.module.css";

interface CampersNotFoundProperties {
  isCampersNotFoundActive: boolean;
  onResetFiltersAction: () => void;
}

export const CampersNotFound = ({
  isCampersNotFoundActive,
  onResetFiltersAction,
}: CampersNotFoundProperties) => {
  if (!isCampersNotFoundActive) {
    return null;
  }

  return (
    <div className={styles.notFoundBlockContainer}>
      <div className={styles.imageWrapper}>
        <Image
          src="/image/no-campers-found.png"
          alt="No campers found"
          width={488}
          height={463}
          priority={true}
        />
      </div>

      <div className={styles.textGroupBlock}>
        <h3 className={`\${styles.notFoundTitleText} interSemiBold`}>No campers found</h3>
        <p className={`\${styles.notFoundDescriptionText} interRegular`}>
          We couldn`t find any campers that match your filters.
          <br />
          Try adjusting your search or clearing some filters.
        </p>
      </div>

      <div className={styles.actionsRowBlock}>
        <button
          type="button"
          onClick={onResetFiltersAction}
          className={`${styles.clearFilterButton} interMedium`}
        >
          <svg className={styles.clearIcon}>
            <use href="/sprite.svg#icon-close" />
          </svg>
          <span>Clear filters</span>
        </button>
        <button
          type="button"
          onClick={onResetFiltersAction}
          className={`${styles.viewAllButton} interMedium`}
        >
          View all campers
        </button>
      </div>
    </div>
  );
};
