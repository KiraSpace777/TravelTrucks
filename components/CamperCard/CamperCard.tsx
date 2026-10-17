"use client";

// import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CamperListItemDto } from "@/types/campers";
import styles from "./CamperCard.module.css";

interface CamperCardProperties {
  camperData: CamperListItemDto;
  isFirstCardElementInList: boolean;
}

export const CamperCard = ({ camperData, isFirstCardElementInList }: CamperCardProperties) => {
  const capitalizeFirstLetterHelper = (textString: string) => {
    return textString.charAt(0).toUpperCase() + textString.slice(1).replace("_", " ");
  };

  const formatPriceWithThousandsSeparatorHelper = (priceNumber: number) => {
    return priceNumber.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className={styles.camperCardContainer}>
      <Image
        src={camperData.coverImage}
        alt={camperData.name}
        width={219}
        height={240}
        unoptimized={true}
        priority={isFirstCardElementInList}
        className={styles.camperCardImage}
      />
      <div className={styles.camperCardDetails}>
        <div className={styles.camperCardHeader}>
          <h2 className={`${styles.camperCardName} interSemiBold`}>{camperData.name}</h2>
          <span className={`${styles.camperCardPrice} interSemiBold`}>
            €{formatPriceWithThousandsSeparatorHelper(camperData.price)}
          </span>
        </div>

        <div className={styles.metaInfoRow}>
          <div className={styles.metaItem}>
            <svg className={styles.starIcon}>
              <use href="/sprite.svg#icon-star" />
            </svg>
            <span className="interRegular">
              {camperData.rating} ({camperData.totalReviews} Reviews)
            </span>
          </div>
          <div className={styles.metaItem}>
            <svg className={styles.metaIcon}>
              <use href="/sprite.svg#icon-map" />
            </svg>
            <span className="interRegular">{camperData.location}</span>
          </div>
        </div>

        <p className={`${styles.cardDescriptionText} interRegular`}>
          Embrace simplicity and freedom with the {camperData.name}...
        </p>

        <div className={styles.badgesBlock}>
          <div className={styles.featureBadgeItem}>
            <svg className={styles.badgeIcon}>
              <use href="/sprite.svg#gas-station" />
            </svg>
            <span className="interMedium">{capitalizeFirstLetterHelper(camperData.engine)}</span>
          </div>
          <div className={styles.featureBadgeItem}>
            <svg className={styles.badgeIcon}>
              <use href="/sprite.svg#transmission" />
            </svg>
            <span className="interMedium">
              {capitalizeFirstLetterHelper(camperData.transmission)}
            </span>
          </div>
          <div className={styles.featureBadgeItem}>
            <svg className={styles.badgeIcon}>
              <use href="/sprite.svg#truck-car" />
            </svg>
            <span className="interMedium">{capitalizeFirstLetterHelper(camperData.form)}</span>
          </div>
        </div>

        <Link
          href={`/catalog/${camperData.id}`}
          target="_blank"
          className={`${styles.showMoreLink} btn interMedium`}
        >
          Show more
        </Link>
      </div>
    </div>
  );
};
