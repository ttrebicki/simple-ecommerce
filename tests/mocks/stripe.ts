jest.mock('stripe', () => {
  const retrieve = jest.fn();
  const Stripe = jest.fn().mockImplementation(() => ({
    prices: { retrieve },
    products: { retrieve },
    checkout: { sessions: { create: jest.fn() } },
  }));
});
