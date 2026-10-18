"use client";

import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { CamperDetailsEntity, BookingRequestDto } from "@/types/campers";
import { submitCamperBookingRequestToBackend } from "@/utils/camperDetailsApi";
import { IdImageSlider } from "@/components/IdImageSlider/IdImageSlider";
import { IdVehicleTable } from "@/components/IdVehicleTable/IdVehicleTable";
import { IdCamperReviews } from "@/components/IdCamperReviews/IdCamperReviews";
import { IdCamperBookingForm } from "@/components/IdCamperBookingForm/IdCamperBookingForm";
import styles from "./IdCamperPageView.module.css";

interface IdCamperPageViewProperties {
  camperDetailsData: CamperDetailsEntity;
}

export const IdCamperPageView = ({ camperDetailsData }: IdCamperPageViewProperties) => {
  const [successToastMessageString, setSuccessToastMessageString] = useState<string>("");
  const [isToastVisibleBoolean, setIsToastVisibleBoolean] = useState<boolean>(false);

  const bookingMutationHandler = useMutation({
    mutationFn: (bookingData: BookingRequestDto) =>
      submitCamperBookingRequestToBackend({
        camperIdString: camperDetailsData.id,
        bookingFieldsData: bookingData,
      }),
    onSuccess: (serverResponseDataObject) => {
      setSuccessToastMessageString(
        serverResponseDataObject.message || "Booking request submitted successfully!",
      );
      setIsToastVisibleBoolean(true);
    },
    onError: () => {
      alert("Something went wrong while sending the booking request. Please try again.");
    },
  });

  useEffect(() => {
    if (isToastVisibleBoolean) {
      const toastTimerInstance = setTimeout(() => {
        setIsToastVisibleBoolean(false);
      }, 4000);
      return () => clearTimeout(toastTimerInstance);
    }
  }, [isToastVisibleBoolean]);

  const handleBookingFormSubmitAction = (formFieldsValues: BookingRequestDto) => {
    const finalSubmissionData: BookingRequestDto = {
      name: formFieldsValues.name,
      email: formFieldsValues.email,
    };
    bookingMutationHandler.mutate(finalSubmissionData);
  };

  const formatPriceWithThousandsSeparatorHelper = (priceNumber: number) => {
    return priceNumber.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const safeReviewsListArray = Array.isArray(camperDetailsData.reviews)
    ? camperDetailsData.reviews
    : [];

  return (
    <div className={styles.pageContainer}>
      {isToastVisibleBoolean && (
        <div className={styles.toastOverlayBackdrop}>
          <div className={styles.toastCentralCardBox}>
            <button
              type="button"
              className={styles.toastCloseCrossButton}
              onClick={() => setIsToastVisibleBoolean(false)}
            >
              <svg className={styles.toastCloseIconSvg}>
                <use href="/sprite.svg#icon-close" />
              </svg>
            </button>
            <div className={styles.toastSuccessCheckCircle}>
              <svg
                className={styles.starIcon}
                viewBox="0 0 15 14"
                style={{ width: "28px", height: "28px", fill: "#FFC531" }}
              >
                <use href="/sprite.svg#icon-star" />
              </svg>
            </div>
            <h4 className={`${styles.toastMainHeadlineText} interSemiBold`}>Success!</h4>
            <p className={`${styles.toastBodyMessageText} interRegular`}>
              {successToastMessageString}
            </p>
          </div>
        </div>
      )}

      <div className={styles.firstContentBlock}>
        <div className={styles.camperGallerySection}>
          <IdImageSlider imagesArray={camperDetailsData.gallery} />
        </div>
        <div className={styles.camperInfoSection}>
          <div className={styles.camperInfoGeneral}>
            <h1 className={`${styles.camperName} interSemiBold`}>{camperDetailsData.name}</h1>
            <div className={styles.metaRowRow}>
              <div className={styles.metaItemBlock}>
                <svg
                  className={styles.starIcon}
                  viewBox="0 0 15 14"
                  style={{ width: "16px", height: "16px", fill: "#FFC531", marginRight: "4px" }}
                >
                  <use href="/sprite.svg#icon-star" />
                </svg>
                <span className="interRegular">
                  {camperDetailsData.rating} ({camperDetailsData.totalReviews} Reviews)
                </span>
              </div>
              <div className={styles.metaItemBlock}>
                <svg className={styles.mapIcon}>
                  <use href="/sprite.svg#icon-map" />
                </svg>
                <span className="interRegular">{camperDetailsData.location}</span>
              </div>
            </div>
            <h2 className={`${styles.camperPriceText} interSemiBold`}>
              €{formatPriceWithThousandsSeparatorHelper(camperDetailsData.price)}
            </h2>
            <p className={`${styles.descriptionParagraph} interRegular`}>
              {camperDetailsData.description}
            </p>
          </div>
          <div className={styles.camperInfoMetrics}>
            <IdVehicleTable camperDetailsData={camperDetailsData} />
          </div>
        </div>
      </div>
      <div className={styles.secondContentBlock}>
        <h3 className={`${styles.reviewsSectionTitle} interSemiBold`}>Reviews</h3>
        <div className={styles.secondBlockGroup}>
          <div className={styles.camperReviewsSection}>
            <IdCamperReviews reviewsListArray={safeReviewsListArray} />
          </div>
          <div className={styles.camperBookingSection}>
            <IdCamperBookingForm onSubmitBookingDataAction={handleBookingFormSubmitAction} />
          </div>
        </div>
      </div>
    </div>
  );
};
