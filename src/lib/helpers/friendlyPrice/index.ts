import { IPrice } from '../../types/stripe';

export const friendlyPrice = (price: Omit<IPrice, 'id'>) =>
  `${((price.unit_amount || 0) / 100).toFixed(
    2,
  )} ${price.currency.toUpperCase()}`;
