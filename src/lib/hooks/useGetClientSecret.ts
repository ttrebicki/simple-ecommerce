import { useEffect, useState } from "react";
import { fetchClientSecret } from "../api/stripe";
import { ICartProduct } from "../types/cart";

export const useGetClientSecret = (items: ICartProduct[]) => {
  const [clientSecret, setClientSecret] = useState<string>();
  const [isSecretLoading, setSecretLoading] = useState(false);

  useEffect(() => {
    let canceled = false;

    (async () => {
      setClientSecret(undefined);
      setSecretLoading(true);
      try {
        const res = await fetchClientSecret({ items });

        if (res && !canceled) setClientSecret(res);
      } catch (error) {
        console.error("useGetClientSecret", error);
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
