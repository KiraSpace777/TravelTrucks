"use client";

import React from "react";
import { CamperDetailsEntity } from "@/types/campers";
import styles from "./IdVehicleTable.module.css";

interface IdVehicleTableProperties {
  camperDetailsData: CamperDetailsEntity;
}

export const IdVehicleTable = ({ camperDetailsData }: IdVehicleTableProperties) => {
  const capitalizeFirstLetterHelper = (textString: string) => {
    return textString.charAt(0).toUpperCase() + textString.slice(1).replace("_", " ");
  };

  const safeAmenitiesArray = Array.isArray(camperDetailsData.amenities)
    ? camperDetailsData.amenities
    : [];

  return (
    <div className={styles.tableSectionContainer}>
      <div className={styles.vehicleDetailsWrapper}>
        <h3 className={`${styles.tableHeadingText} interSemiBold`}>Vehicle details</h3>

        <div className={styles.badgesBlockGrid}>
          {safeAmenitiesArray.map((individualAmenityString: string) => (
            <span key={individualAmenityString} className={`${styles.badgeItemUnit} interMedium`}>
              {capitalizeFirstLetterHelper(individualAmenityString)}
            </span>
          ))}
        </div>

        <div className={styles.specsTableLayout}>
          <div className={styles.tableRowLine}>
            <span className={`${styles.rowLabelText} interMedium`}>Form</span>
            <span className={`${styles.rowLabelValue} interMedium`}>
              {capitalizeFirstLetterHelper(camperDetailsData.form)}
            </span>
          </div>

          <div className={styles.tableRowLine}>
            <span className={`${styles.rowLabelText} interMedium`}>Length</span>
            <span className={`${styles.rowLabelValue} interMedium`}>
              {camperDetailsData.length}
            </span>
          </div>

          <div className={styles.tableRowLine}>
            <span className={`${styles.rowLabelText} interMedium`}>Width</span>
            <span className={`${styles.rowLabelValue} interMedium`}>{camperDetailsData.width}</span>
          </div>

          <div className={styles.tableRowLine}>
            <span className={`${styles.rowLabelText} interMedium`}>Height</span>
            <span className={`${styles.rowLabelValue} interMedium`}>
              {camperDetailsData.height}
            </span>
          </div>

          <div className={styles.tableRowLine}>
            <span className={`${styles.rowLabelText} interMedium`}>Tank</span>
            <span className={`${styles.rowLabelValue} interMedium`}>{camperDetailsData.tank}</span>
          </div>

          <div className={styles.tableRowLine}>
            <span className={`${styles.rowLabelText} interMedium`}>Consumption</span>
            <span className={`${styles.rowLabelValue} interMedium`}>
              {camperDetailsData.consumption}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
