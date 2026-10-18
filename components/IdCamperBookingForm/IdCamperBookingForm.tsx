"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BookingRequestDto } from "@/types/campers";
import styles from "./IdCamperBookingForm.module.css";

interface IdCamperBookingFormProperties {
  onSubmitBookingDataAction: (formFieldsValues: BookingRequestDto) => void;
}

interface IdBookingFormFields {
  name: string;
  email: string;
}

const bookingValidationSchema = yup.object({
  name: yup.string().required("Name is a required field"),
  email: yup.string().email("Invalid email address format").required("Email is a required field"),
});

export const IdCamperBookingForm = ({
  onSubmitBookingDataAction,
}: IdCamperBookingFormProperties) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IdBookingFormFields>({
    resolver: yupResolver(bookingValidationSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const handleFormSubmitInterceptor = (formFieldsValues: IdBookingFormFields) => {
    const backendDataDto: BookingRequestDto = {
      name: formFieldsValues.name,
      email: formFieldsValues.email,
    };
    onSubmitBookingDataAction(backendDataDto);
    reset();
  };

  return (
    <div className={styles.formWrapperBlockBox}>
      <h3 className={`${styles.formTitleText} interSemiBold`}>Book your campervan now</h3>
      <p className={`${styles.formSubtitleText} interRegular`}>
        Stay connected, observant and rational
      </p>

      <form
        onSubmit={handleSubmit(handleFormSubmitInterceptor)}
        className={styles.nativeFormElement}
      >
        <div className={styles.inputFieldControlBlock}>
          <input
            type="text"
            placeholder="Name*"
            {...register("name")}
            className={`${styles.textInputElement} ${errors.name ? styles.inputFieldErrorBorder : ""} interRegular`}
          />
          {errors.name && (
            <span className={`${styles.validationErrorMessage} interRegular`}>
              {errors.name.message}
            </span>
          )}
        </div>

        <div className={styles.inputFieldControlBlock}>
          <input
            type="text"
            placeholder="Email*"
            {...register("email")}
            className={`${styles.textInputElement} ${errors.email ? styles.inputFieldErrorBorder : ""} interRegular`}
          />
          {errors.email && (
            <span className={`${styles.validationErrorMessage} interRegular`}>
              {errors.email.message}
            </span>
          )}
        </div>

        <button type="submit" className={`${styles.submitSendFormButton} button interMedium`}>
          Send
        </button>
      </form>
    </div>
  );
};
