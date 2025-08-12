import { ICartProduct, ICartState } from '@/lib/types/cart';

export interface ICartItemProps extends Omit<ICartState, 'items' | 'clear'> {
  item: ICartProduct;
  isCart?: boolean;
}
