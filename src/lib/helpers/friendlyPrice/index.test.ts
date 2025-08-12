import { mockPrice } from '../../../../tests/mocks/products';
import { friendlyPrice } from '.';

describe('friendlyPrice', () => {
  it('returned value is a string in proper format', () => {
    const result = friendlyPrice(mockPrice);
    expect(result).toEqual(
      `${((mockPrice.unit_amount || 0) / 100).toFixed(
        2,
      )} ${mockPrice.currency.toUpperCase()}`,
    );
  });

  it('handles missing unit_amount as 0', () => {
    expect(
      friendlyPrice({ unit_amount: undefined as any, currency: 'usd' }),
    ).toBe('0.00 USD');
  });

  it.each([
    [{ unit_amount: 1, currency: 'eur' }, '0.01 EUR'],
    [{ unit_amount: 10, currency: 'pln' }, '0.10 PLN'],
    [{ unit_amount: 999, currency: 'gbp' }, '9.99 GBP'],
    [{ unit_amount: 12345, currency: 'eur' }, '123.45 EUR'],
  ]);
});
