import { useEffect, useState } from "react";
import { fetchSessionKey } from "../api/stripe";
import { ICartProduct } from "../types/cart";
import { toastError } from "../helpers/toastError";

export const useGetClientSecret = (items: ICartProduct[]) => {
  const [clientSecret, setClientSecret] = useState<string>();
  const [isSecretLoading, setSecretLoading] = useState(false);

  useEffect(() => {
    let canceled = false;

    (async () => {
      setClientSecret(undefined);
      setSecretLoading(true);
      try {
        const res = await fetchSessionKey({ items });

        if (res && !canceled) setClientSecret(res);
      } catch (error) {
        console.error(error);
        toastError(error);
      } finally {
        setSecretLoading(false);
      }
    })();

    return () => {
      canceled = true;
    };
  }, [items]);

  return {
    clientSecret,
    isSecretLoading,
  };
};
