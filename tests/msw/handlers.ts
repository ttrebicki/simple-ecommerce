import { http, HttpResponse } from 'msw';
import { mockProduct, mockPrice } from '../mocks/products';

export const handlers = [
  http.get('api/products', () => HttpResponse.json({ product: mockProduct })),
  http.get('api/price', () => HttpResponse.json({ price: mockPrice })),
  http.post(
    'api/checkout',
    async () =>
      HttpResponse.redirect(
        new URL(
          `${process.env.NEXT_PUBLIC_APP_URL}/return?session_id=cs_test_a1EkTvn3433Q1vp7ODDcVahzGzKzPGWnUR7tJL0InsGr2jkYPli0Ijw7TO`,
        ),
      ), // TODO
  ),
];
