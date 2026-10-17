"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCampersFromExternalService } from "@/utils/fetchCampersApi";
import { CampersFiltersSidebar } from "@/components/CampersFiltersSidebar/CampersFiltersSidebar";
import { CatalogFiltersState, CamperListItemDto } from "@/types/campers";
import styles from "./CatalogPageView.module.css";

const INITIAL_FILTERS_STATE: CatalogFiltersState = {
  location: "",
  form: "",
  transmission: "",
  engine: "",
};

export const CatalogPageView = () => {
  const [activeCatalogFilters, setActiveCatalogFilters] =
    useState<CatalogFiltersState>(INITIAL_FILTERS_STATE);

  useEffect(() => {
    const globalHeaderHtmlElement = document.querySelector("header");
    if (globalHeaderHtmlElement) {
      globalHeaderHtmlElement.style.borderBottom = "none";
    }
    return () => {
      if (globalHeaderHtmlElement) {
        globalHeaderHtmlElement.style.borderBottom = "1px solid var(--color-border-default)";
      }
    };
  }, []);

  const {
    data: infiniteCampersPaginationData,
    fetchNextPage: fetchNextPageWithAdditionalCampers,
    hasNextPage: hasMoreCampersPagesToLoad,
    isFetchingNextPage: isCurrentlyLoadingMoreCampers,
    isLoading: isInitialCampersLoadingActive,
  } = useInfiniteQuery({
    queryKey: ["campers", activeCatalogFilters],
    queryFn: ({ pageParam = 1 }) =>
      fetchCampersFromExternalService({ pageParam, filters: activeCatalogFilters }),
    initialPageParam: 1,
    getNextPageParam: (lastPageResponseDto) => {
      const currentLoadedPage = lastPageResponseDto.page;
      const totalAvailablePages = lastPageResponseDto.totalPages;
      return currentLoadedPage < totalAvailablePages ? currentLoadedPage + 1 : undefined;
    },
  });

  const handleApplyFiltersAction = (newFiltersState: CatalogFiltersState) => {
    setActiveCatalogFilters(newFiltersState);
  };

  const capitalizeFirstLetterHelper = (textString: string) => {
    return textString.charAt(0).toUpperCase() + textString.slice(1).replace("_", " ");
  };

  const formatPriceWithThousandsSeparatorHelper = (priceNumber: number) => {
    return priceNumber.toLocaleString("ru-RU", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const allRenderedCampersFlattenedArray = infiniteCampersPaginationData
    ? infiniteCampersPaginationData.pages.flatMap((pageDto) => pageDto.campers)
    : [];

  return (
    <div className={styles.catalogPageContainer}>
      <div className={styles.catalogPageContent}>
        <aside className={styles.sidebarColumn}>
          <CampersFiltersSidebar onApplyFilters={handleApplyFiltersAction} />
        </aside>

        <section className={styles.catalogMainContentColumn}>
          {isInitialCampersLoadingActive && (
            <div className={styles.loadingSpinnerContainer}>
              <div className={styles.spinnerElement} />
              <p className={`${styles.loadingMessageText} interMedium`}>Loading tracks...</p>
            </div>
          )}

          {!isInitialCampersLoadingActive && allRenderedCampersFlattenedArray.length > 0 && (
            <>
              <div className={styles.campersListGrid}>
                {allRenderedCampersFlattenedArray.map(
                  (individualCamperItem: CamperListItemDto, individualItemIndex: number) => (
                    <div key={individualCamperItem.id} className={styles.temporaryCamperCard}>
                      <Image
                        src={individualCamperItem.coverImage}
                        alt={individualCamperItem.name}
                        width={219}
                        height={240}
                        unoptimized={true}
                        priority={individualItemIndex < 2}
                        className={styles.temporaryCardImage}
                      />
                      <div className={styles.temporaryCardDetails}>
                        <div className={styles.temporaryCardHeader}>
                          <h2 className={`${styles.temporaryCardName} interSemiBold`}>
                            {individualCamperItem.name}
                          </h2>
                          <span className={`${styles.temporaryCardPrice} interSemiBold`}>
                            €{formatPriceWithThousandsSeparatorHelper(individualCamperItem.price)}
                          </span>
                        </div>

                        <div className={styles.metaInfoRow}>
                          <div className={styles.metaItem}>
                            <svg
                              className={
                                individualCamperItem.rating > 0
                                  ? styles.starIconActive
                                  : styles.starIconEmpty
                              }
                            >
                              <use href="/sprite.svg#icon-star" />
                            </svg>
                            <span className="interRegular">
                              {individualCamperItem.rating} ({individualCamperItem.totalReviews}{" "}
                              Reviews)
                            </span>
                          </div>
                          <div className={styles.metaItem}>
                            <svg className={styles.metaIcon}>
                              <use href="/sprite.svg#icon-map" />
                            </svg>
                            <span className="interRegular">{individualCamperItem.location}</span>
                          </div>
                        </div>

                        <p className={`${styles.cardDescriptionText} interRegular`}>
                          Embrace simplicity and freedom with the {individualCamperItem.name}...
                        </p>

                        <div className={styles.badgesBlock}>
                          <div className={styles.featureBadgeItem}>
                            <svg className={styles.badgeIcon}>
                              <use href="/sprite.svg#gas-station" />
                            </svg>
                            <span className="interMedium">
                              {capitalizeFirstLetterHelper(individualCamperItem.engine)}
                            </span>
                          </div>
                          <div className={styles.featureBadgeItem}>
                            <svg className={styles.badgeIcon}>
                              <use href="/sprite.svg#transmission" />
                            </svg>
                            <span className="interMedium">
                              {capitalizeFirstLetterHelper(individualCamperItem.transmission)}
                            </span>
                          </div>
                          <div className={styles.featureBadgeItem}>
                            <svg className={styles.badgeIcon}>
                              <use href="/sprite.svg#truck-car" />
                            </svg>
                            <span className="interMedium">
                              {capitalizeFirstLetterHelper(individualCamperItem.form)}
                            </span>
                          </div>
                        </div>

                        <Link
                          href={`/catalog/${individualCamperItem.id}`}
                          target="_blank"
                          className={`btn interMedium ${styles.showMoreBtn}`}
                        >
                          Show more
                        </Link>
                      </div>
                    </div>
                  ),
                )}
              </div>

              {hasMoreCampersPagesToLoad && (
                <button
                  type="button"
                  onClick={() => fetchNextPageWithAdditionalCampers()}
                  disabled={isCurrentlyLoadingMoreCampers}
                  className={`${styles.loadMoreButton} button interMedium`}
                >
                  {isCurrentlyLoadingMoreCampers ? "Loading..." : "Load more"}
                </button>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};
