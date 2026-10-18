"use client";

import styles from "./CatalogLoader.module.css";

interface CatalogLoaderProperties {
  isGlobalFetchingActive?: boolean;
}

export const CatalogLoader = ({ isGlobalFetchingActive = true }: CatalogLoaderProperties) => {
  if (!isGlobalFetchingActive) {
    return null;
  }

  return (
    <div className={styles.backdropOverlay}>
      <div className={styles.modalLoaderContainer}>
        <div className={styles.spinnerElement} />
        <div className={styles.textGroup}>
          <h2 className={`${styles.loadingTitleText} interSemiBold`}>Loading tracks...</h2>
          <p className={`${styles.loadingParagraphText} interMedium`}>
            Please wait while we fetch the best travel trucks for you
          </p>
        </div>
      </div>
    </div>
  );
};
