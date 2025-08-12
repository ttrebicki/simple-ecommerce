import '@testing-library/jest-dom';
import 'cross-fetch/polyfill';
// import { server } from './tests/msw/server';
// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close()); // TODO move this to api tests only, check if method and components tests need these

jest.mock('next/navigation', () => require('next-router-mock'));

jest.mock('@/lib/api/firebase_client', () => ({
  __esModule: true,
  app: { options: { apiKey: 'test' } },
}));

// Mock the modular Auth API you use
jest.mock('firebase/auth', () => {
  return {
    getAuth: jest.fn(() => ({
      currentUser: null,
      onAuthStateChanged: jest.fn(),
    })),
  };
});
