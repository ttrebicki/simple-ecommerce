import { useEffect, useState } from "react";
import { fetchClientSecret } from "../api/stripe";
import { ICartProduct } from "../types/cart";

export const useGetClientSecret = (items: ICartProduct[]) => {
  const [clientSecret, setClientSecret] = useState<string>();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchClientSecret({ items });

        if (res) setClientSecret(res);
      } catch (error) {
        console.error("useGetClientSecret");
      }
    })();
  }, [items]);

  return {
    clientSecret,
  };
};
