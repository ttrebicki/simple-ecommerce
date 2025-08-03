import { toastError } from "../helpers/toastError";

export const fetcher = {
  get: async (uri: string) => {
    try {
      const res = await fetch(uri, { method: "GET" });

      return res.json();
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  },
  post: async (uri: string, body?: BodyInit) => {
    try {
      const res = await fetch(uri, { method: "POST", body });

      return res.json();
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  },
  put: async (uri: string, body?: BodyInit) => {
    try {
      const res = await fetch(uri, { method: "PUT", body });

      return res.json();
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  },
  delete: async (uri: string, body?: BodyInit) => {
    try {
      const res = await fetch(uri, { method: "DELETE", body });

      return res.json();
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  },
};
