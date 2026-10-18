import { CAMPERS_API_BASE_URL } from "@/constants/environment";
import {
  CamperDetailsEntity,
  BookingRequestDto,
  BookingRequestResponseDto,
  ReviewEntity,
} from "@/types/campers";

interface FetchSingleCamperProperties {
  camperIdString: string;
}

interface SubmitBookingProperties {
  camperIdString: string;
  bookingFieldsData: BookingRequestDto;
}

export const fetchSingleCamperDetailsFromBackend = async ({
  camperIdString,
}: FetchSingleCamperProperties): Promise<CamperDetailsEntity> => {
  const networkResponseInstance = await fetch(`${CAMPERS_API_BASE_URL}/campers/${camperIdString}`);

  if (!networkResponseInstance.ok) {
    throw new Error("Failed to fetch camper details from server api");
  }

  const decodedCamperDetailsData: CamperDetailsEntity = await networkResponseInstance.json();
  return decodedCamperDetailsData;
};

export const fetchCamperReviewsFromBackend = async ({
  camperIdString,
}: FetchSingleCamperProperties): Promise<ReviewEntity[]> => {
  const networkResponseInstance = await fetch(
    `${CAMPERS_API_BASE_URL}/campers/${camperIdString}/reviews`,
  );

  if (!networkResponseInstance.ok) {
    throw new Error("Failed to fetch camper reviews from server api");
  }

  const decodedReviewsData: ReviewEntity[] = await networkResponseInstance.json();
  return decodedReviewsData;
};

export const submitCamperBookingRequestToBackend = async ({
  camperIdString,
  bookingFieldsData,
}: SubmitBookingProperties): Promise<BookingRequestResponseDto> => {
  const networkResponseInstance = await fetch(
    `${CAMPERS_API_BASE_URL}/campers/${camperIdString}/booking-requests`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingFieldsData),
    },
  );

  if (!networkResponseInstance.ok) {
    throw new Error("Failed to submit camper booking request fields data");
  }

  const decodedBookingServerResponseDto: BookingRequestResponseDto =
    await networkResponseInstance.json();
  return decodedBookingServerResponseDto;
};
