// "use client";

// import { useState } from "react";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { fetchCampersFromExternalService } from "@/utils/fetchCampersApi";
// import { CampersFiltersSidebar } from "@/components/CampersFiltersSidebar/CampersFiltersSidebar";
// import { CamperCard } from "@/components/CamperCard/CamperCard";
// import { CatalogLoader } from "@/components/CatalogLoader/CatalogLoader";
// import { CampersNotFound } from "@/components/CampersNotFound/CampersNotFound";
// import { CatalogFiltersState, CamperListItemDto } from "@/types/campers";
// import styles from "./CatalogPageView.module.css";

// const INITIAL_FILTERS_STATE: CatalogFiltersState = {
//   location: "",
//   form: "",
//   transmission: "",
//   engine: "",
// };

// export const CatalogPageView = () => {
//   const [activeCatalogFilters, setActiveCatalogFilters] =
//     useState<CatalogFiltersState>(INITIAL_FILTERS_STATE);

//   const {
//     data: infiniteCampersPaginationData,
//     fetchNextPage: fetchNextPageWithAdditionalCampers,
//     hasNextPage: hasMoreCampersPagesToLoad,
//     isFetchingNextPage: isCurrentlyLoadingMoreCampers,
//     isLoading: isInitialCampersLoadingActive,
//     isFetching: isAnyNetworkRequestFetchingActive,
//   } = useInfiniteQuery({
//     queryKey: ["campers", activeCatalogFilters],
//     queryFn: ({ pageParam = 1 }) =>
//       fetchCampersFromExternalService({ pageParam, filters: activeCatalogFilters }),
//     initialPageParam: 1,
//     getNextPageParam: (lastPageResponseDto) => {
//       const currentLoadedPage = lastPageResponseDto.page;
//       const totalAvailablePages = lastPageResponseDto.totalPages;
//       return currentLoadedPage < totalAvailablePages ? currentLoadedPage + 1 : undefined;
//     },
//   });

//   const handleApplyFiltersAction = (newFiltersState: CatalogFiltersState) => {
//     setActiveCatalogFilters(newFiltersState);
//   };

//   const handleResetAllFiltersAction = () => {
//     setActiveCatalogFilters(INITIAL_FILTERS_STATE);
//   };

//   const allRenderedCampersFlattenedArray = infiniteCampersPaginationData
//     ? infiniteCampersPaginationData.pages.flatMap((pageDto) => pageDto.campers)
//     : [];

//   const isCatalogListEmptyBoolean =
//     !isInitialCampersLoadingActive && allRenderedCampersFlattenedArray.length === 0;

//   return (
//     <div className={styles.catalogPageContainer}>
//       <div className={styles.catalogPageContent}>
//         <aside className={styles.sidebarColumn}>
//           <CampersFiltersSidebar onApplyFilters={handleApplyFiltersAction} />
//         </aside>

//         <section className={styles.catalogMainContentColumn}>
//           <CatalogLoader isGlobalFetchingActive={isAnyNetworkRequestFetchingActive} />

//           <CampersNotFound
//             isCampersNotFoundActive={isCatalogListEmptyBoolean}
//             onResetFiltersAction={handleResetAllFiltersAction}
//           />

//           {allRenderedCampersFlattenedArray.length > 0 && (
//             <>
//               <div className={styles.campersListGrid}>
//                 {allRenderedCampersFlattenedArray.map(
//                   (individualCamperItem: CamperListItemDto, arrayIndexInteger: number) => (
//                     <CamperCard
//                       key={individualCamperItem.id}
//                       camperData={individualCamperItem}
//                       isFirstCardElementInList={arrayIndexInteger === 0}
//                     />
//                   ),
//                 )}
//               </div>

//               {hasMoreCampersPagesToLoad && (
//                 <button
//                   type="button"
//                   onClick={() => fetchNextPageWithAdditionalCampers()}
//                   disabled={isCurrentlyLoadingMoreCampers}
//                   className={`${styles.loadMoreButton} button interMedium`}
//                 >
//                   {isCurrentlyLoadingMoreCampers ? "Loading..." : "Load more"}
//                 </button>
//               )}
//             </>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// };

"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCampersFromExternalService } from "@/utils/fetchCampersApi";
import { CampersFiltersSidebar } from "@/components/CampersFiltersSidebar/CampersFiltersSidebar";
import { CamperCard } from "@/components/CamperCard/CamperCard";
import { CatalogLoader } from "@/components/CatalogLoader/CatalogLoader";
import { CampersNotFound } from "@/components/CampersNotFound/CampersNotFound";
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

  const {
    data: infiniteCampersPaginationData,
    fetchNextPage: fetchNextPageWithAdditionalCampers,
    hasNextPage: hasMoreCampersPagesToLoad,
    isFetchingNextPage: isCurrentlyLoadingMoreCampers,
    isLoading: isInitialCampersLoadingActive,
    isFetching: isAnyNetworkRequestFetchingActive,
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

  const handleResetAllFiltersAction = () => {
    setActiveCatalogFilters(INITIAL_FILTERS_STATE);
  };

  const allRenderedCampersFlattenedArray = infiniteCampersPaginationData
    ? infiniteCampersPaginationData.pages.flatMap((pageDto) => pageDto.campers)
    : [];

  const isCatalogListEmptyBoolean =
    !isInitialCampersLoadingActive && allRenderedCampersFlattenedArray.length === 0;

  return (
    <div className={styles.catalogPageContainer}>
      <div className={styles.catalogPageContent}>
        <aside className={styles.sidebarColumn}>
          <CampersFiltersSidebar
            key={`${activeCatalogFilters.location}-${activeCatalogFilters.form}-${activeCatalogFilters.engine}-${activeCatalogFilters.transmission}`}
            activeFiltersValueObject={activeCatalogFilters}
            onApplyFilters={handleApplyFiltersAction}
          />
        </aside>

        <section className={styles.catalogMainContentColumn}>
          <CatalogLoader isGlobalFetchingActive={isAnyNetworkRequestFetchingActive} />

          <CampersNotFound
            isCampersNotFoundActive={isCatalogListEmptyBoolean}
            onResetFiltersAction={handleResetAllFiltersAction}
          />

          {allRenderedCampersFlattenedArray.length > 0 && (
            <>
              <div className={styles.campersListGrid}>
                {allRenderedCampersFlattenedArray.map(
                  (individualCamperItem: CamperListItemDto, arrayIndexInteger: number) => (
                    <CamperCard
                      key={individualCamperItem.id}
                      camperData={individualCamperItem}
                      isFirstCardElementInList={arrayIndexInteger === 0}
                    />
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
