"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper";
import { FreeMode, Navigation, Thumbs, Scrollbar, Keyboard } from "swiper/modules";
import { CamperImageEntity } from "@/types/campers";
import styles from "./IdImageSlider.module.css";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/scrollbar";
import "swiper/css/keyboard";

interface IdImageSliderProperties {
  imagesArray: CamperImageEntity[];
}

export const IdImageSlider = ({ imagesArray }: IdImageSliderProperties) => {
  const [thumbsSwiperInstance, setThumbsSwiperInstance] = useState<SwiperClass | null>(null);
  const safeImagesArray = Array.isArray(imagesArray) ? imagesArray : [];

  return (
    <div className={styles.galleryBlockWrapper}>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        thumbs={{
          swiper:
            thumbsSwiperInstance && !thumbsSwiperInstance.destroyed ? thumbsSwiperInstance : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Keyboard]}
        className={styles.mainTopSlider}
      >
        {safeImagesArray.map((individualImage: CamperImageEntity) => (
          <SwiperSlide key={`main-${individualImage.id}`}>
            <Image
              src={individualImage.original}
              alt="Camper"
              width={631}
              height={463}
              unoptimized={true}
              priority={true}
              draggable={false}
              className={styles.mainSliderImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiperInstance}
        loop={true}
        spaceBetween={32}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        slideToClickedSlide={true}
        scrollbar={{
          draggable: true,
          el: `.${styles.swiperScrollbarTarget}`,
        }}
        modules={[FreeMode, Navigation, Thumbs, Scrollbar]}
        className={styles.bottomThumbsSlider}
      >
        {safeImagesArray.map((individualThumb: CamperImageEntity) => (
          <SwiperSlide key={`thumb-${individualThumb.id}`}>
            <div className={styles.thumbSliderImageWrapperActive}>
              <Image
                src={individualThumb.thumb}
                alt="Camper thumb"
                width={135}
                height={144}
                unoptimized={true}
                draggable={false}
                className={styles.thumbImageElement}
              />
            </div>
          </SwiperSlide>
        ))}
        <div className={styles.swiperScrollbarTarget} />
      </Swiper>
    </div>
  );
};
