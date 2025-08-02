"use client";

import { useCartStore } from "@/lib/hooks/useCartStore";
import { useEffect } from "react";

export const ResetCart = () => {
  const { clear } = useCartStore();
  useEffect(() => {
    clear();
  }, []);

  return null;
};
