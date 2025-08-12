import { IFormattedStripeProduct } from '@/lib/types/stripe';
import Stripe from 'stripe';

export const mockPrice: Stripe.Price = {
  id: 'price_1234567890',
  object: 'price',
  active: true,
  billing_scheme: 'per_unit',
  created: 1733887200, // Example Unix timestamp
  currency: 'usd',
  currency_options: {
    eur: {
      custom_unit_amount: { maximum: 100, minimum: 0, preset: 0 },
      unit_amount: 990,
      unit_amount_decimal: '990.00',
      tax_behavior: 'exclusive',
    },
  },
  custom_unit_amount: null,
  livemode: false,
  lookup_key: 'basic_plan_usd',
  metadata: {
    plan_type: 'basic',
    internal_note: 'Mock data for testing',
  },
  nickname: 'Basic Plan USD',
  product: 'prod_ABC123456',
  recurring: {
    interval: 'month',
    interval_count: 1,
    usage_type: 'licensed',
    trial_period_days: null,
    meter: null,
  },
  tax_behavior: 'exclusive',
  tiers: undefined,
  tiers_mode: null,
  transform_quantity: null,
  type: 'recurring',
  unit_amount: 999,
  unit_amount_decimal: '999.00',
};
export const mockProduct: IFormattedStripeProduct = {
  id: 'p1',
  object: 'product',
  active: true,
  created: 1,
  default_price: 'price1',
  description: 'Lorem ipsum',
  images: [''],
  livemode: true,
  marketing_features: [],
  metadata: {},
  name: 'Product Name',
  package_dimensions: null,
  shippable: null,
  tax_code: '',
  type: 'good',
  updated: 1754945804878,
  url: `${process.env.NEXT_PUBLIC_APP_URL}/product/p1`,
  prices: [{ currency: 'eur', unit_amount: 900, id: '1' }],
};

export const mockCartProduct = (quantity: number) => ({
  ...mockProduct,
  quantity,
});
