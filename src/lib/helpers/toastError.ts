import toast from 'react-hot-toast';

/**
 * Returns message of any error object with structure containing
 * this key, while performing typecheck to satisfy TS without typecasting
 * or using any.
 * @param error
 * @returns Error message string.
 */

const getErrorMessage = (error: unknown) =>
  typeof error === 'object' &&
  error &&
  'message' in error &&
  typeof error.message === 'string'
    ? error.message
    : '';

const getFirebaseErrorMessage = (error: unknown) =>
  typeof error === 'object' &&
  !!error &&
  'code' in error &&
  typeof error.code === 'string'
    ? error.code === 'auth/invalid-credential'
      ? "Incorrect credentials or user doesn't exist. Please try again or register."
      : error.code
    : 'Unknown Firebase error.';

export const firebaseToastError = (error: unknown) =>
  toast.error(getFirebaseErrorMessage(error));

export const toastError = (error: unknown) =>
  toast.error(getErrorMessage(error));
