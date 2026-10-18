import React from "react";
import { notFound } from "next/navigation";
import {
  fetchSingleCamperDetailsFromBackend,
  fetchCamperReviewsFromBackend,
} from "@/utils/camperDetailsApi";
import { IdCamperPageView } from "@/components/IdCamperPageView/IdCamperPageView";
import { CamperDetailsEntity } from "@/types/campers";

interface CatalogCamperDetailsPageProperties {
  params: Promise<{
    camperId: string;
  }>;
}

const CatalogCamperDetailsPage = async ({ params }: CatalogCamperDetailsPageProperties) => {
  const resolvedRouteParametersObject = await params;
  const targetCamperIdString = resolvedRouteParametersObject.camperId;

  let fetchedCamperDetailsEntityObject = null;
  let fetchedReviewsArray = null;

  try {
    const [camperData, reviewsData] = await Promise.all([
      fetchSingleCamperDetailsFromBackend({ camperIdString: targetCamperIdString }),
      fetchCamperReviewsFromBackend({ camperIdString: targetCamperIdString }),
    ]);

    fetchedCamperDetailsEntityObject = camperData;
    fetchedReviewsArray = reviewsData;
  } catch {
    return notFound();
  }

  if (!fetchedCamperDetailsEntityObject) {
    return notFound();
  }

  const normalizedCamperDataWithGuaranteedReviews: CamperDetailsEntity = {
    ...fetchedCamperDetailsEntityObject,
    reviews: Array.isArray(fetchedReviewsArray) ? fetchedReviewsArray : [],
  };

  return <IdCamperPageView camperDetailsData={normalizedCamperDataWithGuaranteedReviews} />;
};

export default CatalogCamperDetailsPage;
