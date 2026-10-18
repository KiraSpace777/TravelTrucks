export type CamperBodyFormType = "alcove" | "panel_van" | "integrated" | "semi_integrated";
export type CamperTransmissionType = "automatic" | "manual";
export type CamperEngineType = "diesel" | "petrol" | "hybrid" | "electric";

export type CamperAmenityType =
  "ac" | "bathroom" | "kitchen" | "tv" | "radio" | "refrigerator" | "microwave" | "gas" | "water";

export interface CamperListItemDto {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  form: CamperBodyFormType;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: CamperTransmissionType;
  engine: CamperEngineType;
  amenities: CamperAmenityType[];
  coverImage: string;
  totalReviews: number;
}

export interface CamperListResponseDto {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: CamperListItemDto[];
}

export interface FiltersResponseDto {
  forms: CamperBodyFormType[];
  transmissions: CamperTransmissionType[];
  engines: CamperEngineType[];
}

export interface CamperImageEntity {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}

export interface CamperDetailsEntity extends Omit<CamperListItemDto, "coverImage"> {
  description: string;
  gallery: CamperImageEntity[];
  createdAt: string;
  updatedAt: string;
  reviews: ReviewEntity[];
}

export interface ReviewEntity {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
}

export interface BookingRequestDto {
  name: string;
  email: string;
}

export interface BookingRequestResponseDto {
  message: string;
}

// додатковий інтерфейс, для внутрішнього стану React-компонентів фронтенду (CampersFiltersSidebar та CatalogPageView), зберігає поточні значення, які користувач безпосередньо ввів у текстове поле локації або вибрав через радіо-кнопки у даний момент часу.
export interface CatalogFiltersState {
  location: string;
  form: CamperBodyFormType | "";
  transmission: CamperTransmissionType | "";
  engine: CamperEngineType | "";
}
