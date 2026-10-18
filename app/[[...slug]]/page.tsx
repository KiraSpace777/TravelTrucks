import { notFound } from "next/navigation";
import { fetchSingleCamperDetailsFromBackend } from "@/utils/camperDetailsApi";
import { HomePageView } from "@/components/HomePageView/HomePageView";
import { CatalogPageView } from "@/components/CatalogPageView/CatalogPageView";
import { IdCamperPageView } from "@/components/IdCamperPageView/IdCamperPageView";

interface CatchAllDynamicRouterProperties {
  params: Promise<{
    slug?: string[];
  }>;
}

const UniversalCatchAllDynamicRouter = async ({ params }: CatchAllDynamicRouterProperties) => {
  const resolvedRouteParameters = await params;
  const urlSegmentsArray = resolvedRouteParameters.slug || [];

  if (urlSegmentsArray.length === 0) {
    return <HomePageView />;
  }

  if (urlSegmentsArray.length === 1 && urlSegmentsArray[0] === "catalog") {
    return <CatalogPageView />;
  }

  if (urlSegmentsArray.length === 2 && urlSegmentsArray[0] === "catalog") {
    const targetCamperIdString = urlSegmentsArray[1];
    let fetchedCamperDataEntity = null;

    try {
      fetchedCamperDataEntity = await fetchSingleCamperDetailsFromBackend({
        camperIdString: targetCamperIdString,
      });
    } catch {
      return notFound();
    }

    if (!fetchedCamperDataEntity) {
      return notFound();
    }

    const secureCamperDataWithGuaranteedReviewsArray = {
      ...fetchedCamperDataEntity,
      reviews: Array.isArray(fetchedCamperDataEntity.reviews)
        ? fetchedCamperDataEntity.reviews
        : [],
    };

    return <IdCamperPageView camperDetailsData={secureCamperDataWithGuaranteedReviewsArray} />;
  }

  return notFound();
};

export default UniversalCatchAllDynamicRouter;
