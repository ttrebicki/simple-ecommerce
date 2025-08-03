import toast from "react-hot-toast";

/**
 * Returns message of any error object with structure containing
 * this key, while performing typecheck to satisfy TS without typecasting
 * or using any.
 * @param error
 * @returns Error message string.
 */

const getErrorMessage = (error: unknown) =>
  typeof error === "object" &&
  error &&
  "message" in error &&
  typeof error.message === "string"
    ? error.message
    : "";

export const toastError = (error: unknown) =>
  toast.error(getErrorMessage(error));
