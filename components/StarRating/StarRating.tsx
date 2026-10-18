"use client";

import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import styles from "./StarRating.module.css";

const STAR_COUNT = 5;

const getStarStyles = (strokeWidth: number) => ({
  itemShapes: Star,
  itemStrokeWidth: strokeWidth,
  activeFillColor: "#FFC531",
  activeStrokeColor: "#FFC531",
  inactiveFillColor: "transparent",
  inactiveStrokeColor: " #DADDE1",
});

interface StarRatingProps {
  value: number;
  readOnly?: boolean;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  strokeWidth?: number;
  className?: string;
}

export default function StarRating({
  value,
  readOnly = false,
  showValue = false,
  size = "md",
  strokeWidth = 1,
  className = "",
}: StarRatingProps) {
  return (
    <div className={`${styles.row} ${className}`}>
      <div className={styles[size]}>
        <Rating
          className={styles.rating}
          value={value}
          readOnly={readOnly}
          items={STAR_COUNT}
          itemStyles={getStarStyles(strokeWidth)}
          halfFillMode="svg"
          spaceInside="none"
          transition="colors"
        />
      </div>
      {showValue && readOnly && <span className={styles.score}>{value.toFixed(1)}</span>}
    </div>
  );
}
