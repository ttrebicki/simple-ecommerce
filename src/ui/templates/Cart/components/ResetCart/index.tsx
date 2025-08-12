'use client';

import { useCartStore } from '@/lib/hooks/state/useCartStore';
import { useEffect } from 'react';

export const ResetCart = () => {
  const { clear } = useCartStore();
  useEffect(() => {
    clear();
  }, []);

  return null;
};
