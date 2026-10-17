"use client";

import React, { useState } from "react";
import {
  CatalogFiltersState,
  CamperBodyFormType,
  CamperEngineType,
  CamperTransmissionType,
} from "@/types/campers";
import styles from "./CampersFiltersSidebar.module.css";

interface CampersFiltersSidebarProperties {
  onApplyFilters: (newFiltersState: CatalogFiltersState) => void;
}

const INITIAL_LOCAL_FILTERS: CatalogFiltersState = {
  location: "",
  form: "",
  transmission: "",
  engine: "",
};

export const CampersFiltersSidebar = ({ onApplyFilters }: CampersFiltersSidebarProperties) => {
  const [localFiltersState, setLocalFiltersState] =
    useState<CatalogFiltersState>(INITIAL_LOCAL_FILTERS);

  const handleLocationChange = (eventInstance: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFiltersState((previousState) => ({
      ...previousState,
      location: eventInstance.target.value,
    }));
  };

  const handleFormChange = (formValue: CamperBodyFormType) => {
    setLocalFiltersState((previousState) => ({
      ...previousState,
      form: formValue,
    }));
  };

  const handleEngineChange = (engineValue: CamperEngineType) => {
    setLocalFiltersState((previousState) => ({
      ...previousState,
      engine: engineValue,
    }));
  };

  const handleTransmissionChange = (transmissionValue: CamperTransmissionType) => {
    setLocalFiltersState((previousState) => ({
      ...previousState,
      transmission: transmissionValue,
    }));
  };

  const handleSearchSubmit = (eventInstance: React.FormEvent) => {
    eventInstance.preventDefault();
    onApplyFilters(localFiltersState);
  };

  const handleClearFiltersClick = () => {
    setLocalFiltersState(INITIAL_LOCAL_FILTERS);
    onApplyFilters(INITIAL_LOCAL_FILTERS);
  };

  return (
    <div className={styles.sidebarWrapperContainer}>
      <form
        onSubmit={handleSearchSubmit}
        style={{ height: "100%", display: "flex", flexDirection: "column", width: "100%" }}
      >
        <div className={styles.locationBlock}>
          <label htmlFor="locationInputId" className={`${styles.locationLabel} interRegular`}>
            Location
          </label>
          <div className={styles.inputWrapper}>
            <svg className={styles.locationIcon}>
              <use href="/sprite.svg#icon-map" />
            </svg>
            <input
              id="locationInputId"
              type="text"
              placeholder="Kyiv, Ukraine"
              value={localFiltersState.location}
              onChange={handleLocationChange}
              className={`${styles.locationInput} interRegular`}
            />
          </div>
        </div>

        <h2 className={`${styles.filtersTitle} interSemiBold`}>Filters</h2>

        <div className={styles.filterSection}>
          <h3 className={`${styles.sectionHeading} interMedium`}>Camper form</h3>
          <div className={styles.optionsList}>
            <label className={styles.radioOptionItem}>
              <input
                type="radio"
                name="formGroup"
                checked={localFiltersState.form === "alcove"}
                onChange={() => handleFormChange("alcove")}
                className={styles.nativeRadioInput}
              />
              <span className={`${styles.optionTextLabel} interRegular`}>Alcove</span>
            </label>

            <label className={styles.radioOptionItem}>
              <input
                type="radio"
                name="formGroup"
                checked={localFiltersState.form === "panel_van"}
                onChange={() => handleFormChange("panel_van")}
                className={styles.nativeRadioInput}
              />
              <span className={`${styles.optionTextLabel} interRegular`}>Panel Van</span>
            </label>

            <label className={styles.radioOptionItem}>
              <input
                type="radio"
                name="formGroup"
                checked={localFiltersState.form === "integrated"}
                onChange={() => handleFormChange("integrated")}
                className={styles.nativeRadioInput}
              />
              <span className={`${styles.optionTextLabel} interRegular`}>Integrated</span>
            </label>

            <label className={styles.radioOptionItem}>
              <input
                type="radio"
                name="formGroup"
                checked={localFiltersState.form === "semi_integrated"}
                onChange={() => handleFormChange("semi_integrated")}
                className={styles.nativeRadioInput}
              />
              <span className={`${styles.optionTextLabel} interRegular`}>Semi Integrated</span>
            </label>
          </div>
        </div>

        <div className={styles.filterSection}>
          <h3 className={`${styles.sectionHeading} interMedium`}>Engine</h3>
          <div className={styles.optionsList}>
            <label className={styles.radioOptionItem}>
              <input
                type="radio"
                name="engineGroup"
                checked={localFiltersState.engine === "diesel"}
                onChange={() => handleEngineChange("diesel")}
                className={styles.nativeRadioInput}
              />
              <span className={`${styles.optionTextLabel} interRegular`}>Diesel</span>
            </label>

            <label className={styles.radioOptionItem}>
              <input
                type="radio"
                name="engineGroup"
                checked={localFiltersState.engine === "petrol"}
                onChange={() => handleEngineChange("petrol")}
                className={styles.nativeRadioInput}
              />
              <span className={`${styles.optionTextLabel} interRegular`}>Petrol</span>
            </label>

            <label className={styles.radioOptionItem}>
              <input
                type="radio"
                name="engineGroup"
                checked={localFiltersState.engine === "hybrid"}
                onChange={() => handleEngineChange("hybrid")}
                className={styles.nativeRadioInput}
              />
              <span className={`${styles.optionTextLabel} interRegular`}>Hybrid</span>
            </label>

            <label className={styles.radioOptionItem}>
              <input
                type="radio"
                name="engineGroup"
                checked={localFiltersState.engine === "electric"}
                onChange={() => handleEngineChange("electric")}
                className={styles.nativeRadioInput}
              />
              <span className={`${styles.optionTextLabel} interRegular`}>Electric</span>
            </label>
          </div>
        </div>

        <div className={styles.filterSection}>
          <h3 className={`${styles.sectionHeading} interMedium`}>Transmission</h3>
          <div className={styles.optionsList}>
            <label className={styles.radioOptionItem}>
              <input
                type="radio"
                name="transmissionGroup"
                checked={localFiltersState.transmission === "automatic"}
                onChange={() => handleTransmissionChange("automatic")}
                className={styles.nativeRadioInput}
              />
              <span className={`${styles.optionTextLabel} interRegular`}>Automatic</span>
            </label>

            <label className={styles.radioOptionItem}>
              <input
                type="radio"
                name="transmissionGroup"
                checked={localFiltersState.transmission === "manual"}
                onChange={() => handleTransmissionChange("manual")}
                className={styles.nativeRadioInput}
              />
              <span className={`${styles.optionTextLabel} interRegular`}>Manual</span>
            </label>
          </div>
        </div>

        <div className={styles.actionsBlock}>
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
          <button type="button" onClick={handleClearFiltersClick} className={styles.clearButton}>
            <div className={styles.clearButtonContent}>
              <svg className={styles.clearIcon}>
                <use href="/sprite.svg#icon-close" />
              </svg>
              <span>Clear filters</span>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};
