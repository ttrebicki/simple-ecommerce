import { useCallback, useEffect, useState } from "react";
import { fetchSessionKey } from "../api/stripe";
import { ICartProduct } from "../types/cart";
import { toastError } from "../helpers/toastError";

export const useSessionKey = (items: ICartProduct[]) => {
  const [sessionKey, setSessionKey] = useState<string>();
  const [isKeyLoading, setKeyLoading] = useState(false);

  useEffect(() => {
    let canceled = false;

    (async () => {
      setSessionKey(undefined);
      setKeyLoading(true);
      try {
        const res = await fetchSessionKey({ items });

        if (res && !canceled) setSessionKey(res);
      } catch (error) {
        console.error(error);
        toastError(error);
      } finally {
        setKeyLoading(false);
      }
    })();

    return () => {
      canceled = true;
    };
  }, [items]);

  const fetchClientSecret = useCallback(async () => {
    setKeyLoading(true);
    try {
      const res = await fetchSessionKey({ items });

      return res;
    } catch (error) {
      console.error(error);
      toastError(error);
    } finally {
      setKeyLoading(false);
    }
  }, [items]);

  return {
    sessionKey,
    isKeyLoading,
    fetchClientSecret,
  };
};
