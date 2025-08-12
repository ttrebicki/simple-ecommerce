import * as stripeApi from '@/lib/api/stripe';
import * as toast from '@/lib/helpers/toastError';

import { renderHook, waitFor, act } from '@testing-library/react';
import { mockCartProduct } from '../../../../tests/mocks/products';
import { ICartProduct } from '../../types/cart';
import { useSessionKey } from './useSessionKey';

jest.mock('@/lib/api/stripe', () => ({
  __esModule: true,
  fetchSessionKey: jest.fn(),
}));

jest.mock('@/lib/helpers/toastError', () => ({
  __esModule: true,
  toastError: jest.fn(),
}));

const fetchSessionKey = jest.mocked(stripeApi.fetchSessionKey);
const toastError = jest.mocked(toast.toastError);

describe('useSessionKey', () => {
  const baseItems: ICartProduct[] = [mockCartProduct(1)];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('fetches on mount and sets sessionKey + loading', async () => {
    fetchSessionKey.mockResolvedValueOnce('sk_123');

    const { result } = renderHook(() => useSessionKey({ items: baseItems }));

    expect(result.current.isKeyLoading).toBe(true);
    expect(result.current.sessionKey).toBeUndefined();
    expect(fetchSessionKey).toHaveBeenCalledWith({ items: baseItems });

    await waitFor(() => {
      expect(result.current.isKeyLoading).toBe(false);
      expect(result.current.sessionKey).toBe('sk_123');
    });
  });

  it('resets sessionKey and refetches when items change', async () => {
    fetchSessionKey
      .mockResolvedValueOnce('sk_old')
      .mockResolvedValueOnce('sk_new');

    const initialItems = baseItems;

    const { result, rerender } = renderHook(
      ({ items }: { items: ICartProduct[] }) => useSessionKey({ items }),
      { initialProps: { items: initialItems } },
    );

    await waitFor(() => {
      expect(result.current.sessionKey).toBe('sk_old');
      expect(result.current.isKeyLoading).toBe(false);
    });

    const nextItems: ICartProduct[] = [mockCartProduct(2)];
    rerender({ items: nextItems });

    await waitFor(() => {
      expect(result.current.sessionKey).toBeUndefined();
      expect(result.current.isKeyLoading).toBe(true);
    });

    expect(fetchSessionKey).toHaveBeenLastCalledWith({ items: nextItems });

    await waitFor(() => {
      expect(result.current.sessionKey).toBe('sk_new');
      expect(result.current.isKeyLoading).toBe(false);
    });
  });

  it('does not set state after unmount (canceled)', async () => {
    let resolve!: (v: string) => void;
    const promise = new Promise<string>((r) => (resolve = r));
    fetchSessionKey.mockReturnValueOnce(promise);

    const { unmount } = renderHook(() => useSessionKey({ items: baseItems }));

    unmount(); // unmount before promise settles

    // resolve later; should not warn about setState on unmounted
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    resolve('sk_late');
    await Promise.resolve();
    expect(errSpy).not.toHaveBeenCalled();
    errSpy.mockRestore();
  });

  it('handles errors: calls toastError and stops loading', async () => {
    const err = new Error('network');
    fetchSessionKey.mockRejectedValueOnce(err);

    // silence console.error from the hook for this test
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useSessionKey({ items: baseItems }));

    await waitFor(() => expect(toastError).toHaveBeenCalledWith(err));
    await waitFor(() => expect(result.current.isKeyLoading).toBe(false));
    expect(result.current.sessionKey).toBeUndefined();

    spy.mockRestore();
  });

  it('fetchClientSecret returns key and toggles loading (without mutating sessionKey)', async () => {
    fetchSessionKey.mockResolvedValueOnce('sk_initial');

    const { result } = renderHook(() => useSessionKey({ items: baseItems }));

    await waitFor(() => expect(result.current.sessionKey).toBe('sk_initial'));
    await waitFor(() => expect(result.current.isKeyLoading).toBe(false));

    fetchSessionKey.mockResolvedValueOnce('sk_from_helper');

    let value: string | undefined | null;
    await act(async () => {
      value = await result.current.fetchClientSecret();
    });

    expect(value).toBe('sk_from_helper');
    await waitFor(() => expect(result.current.isKeyLoading).toBe(false));
    expect(result.current.sessionKey).toBe('sk_initial');
  });

  it('maintains fetchClientSecret identity until items change', async () => {
    fetchSessionKey.mockResolvedValue('sk');

    const initialItems = baseItems;

    const { result, rerender } = renderHook(
      ({ items }: { items: ICartProduct[] }) => useSessionKey({ items }),
      { initialProps: { items: initialItems } },
    );

    const firstRef = result.current.fetchClientSecret;

    rerender({ items: initialItems });
    await act(async () => {
      expect(result.current.fetchClientSecret).toBe(firstRef);
    });

    const newItems: ICartProduct[] = [mockCartProduct(2)];
    rerender({ items: newItems });

    await act(async () => {
      expect(result.current.fetchClientSecret).not.toBe(firstRef);
    });
  });
});
