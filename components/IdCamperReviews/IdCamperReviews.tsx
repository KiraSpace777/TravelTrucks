"use client";

import { ReviewEntity } from "@/types/campers";
import StarRating from "@/components/StarRating/StarRating";
import styles from "./IdCamperReviews.module.css";

interface IdCamperReviewsProperties {
  reviewsListArray: ReviewEntity[];
}

export const IdCamperReviews = ({ reviewsListArray }: IdCamperReviewsProperties) => {
  const safeReviewsListArray = Array.isArray(reviewsListArray) ? reviewsListArray : [];

  return (
    <div className={styles.reviewsSectionContainer}>
      {safeReviewsListArray.map((individualReviewItem: ReviewEntity) => {
        const firstLetterOfUserNameString = individualReviewItem.reviewer_name
          .charAt(0)
          .toUpperCase();

        return (
          <div key={individualReviewItem.id} className={styles.reviewItemCard}>
            <div className={styles.reviewItemHeader}>
              <div className={`${styles.userAvatarCircle} interSemiBold`}>
                {firstLetterOfUserNameString}
              </div>

              <div className={styles.metaUserBlock}>
                <h4 className={`${styles.userNameText} interSemiBold`}>
                  {individualReviewItem.reviewer_name}
                </h4>
                <div className={styles.starsRatingRow}>
                  <StarRating
                    value={individualReviewItem.reviewer_rating}
                    readOnly
                    showValue={false}
                    size="sm"
                  />
                </div>
              </div>
            </div>

            <p className={`${styles.commentBodyText} interRegular`}>
              {individualReviewItem.comment}
            </p>
          </div>
        );
      })}
    </div>
  );
};
