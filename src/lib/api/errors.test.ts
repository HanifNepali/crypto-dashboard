import { describe, it, expect } from 'vitest';
import axios, { AxiosError } from 'axios';
import { ApiError, toApiError } from './errors';

describe('toApiError', () => {
  it('returns the same instance if already an ApiError', () => {
    const original = new ApiError('already normalized', 404);
    expect(toApiError(original)).toBe(original);
  });

  it('extracts message and status from an AxiosError with a response', () => {
    const axiosError = new AxiosError(
      'Request failed with status code 429',
      'ERR_BAD_REQUEST',
      undefined,
      undefined,
      {
        status: 429,
        data: { message: 'Rate limit exceeded' },
        statusText: 'Too Many Requests',
        headers: {},
        config: {} as never,
      }
    );

    const result = toApiError(axiosError);

    expect(result).toBeInstanceOf(ApiError);
    expect(result.message).toBe('Rate limit exceeded');
    expect(result.status).toBe(429);
  });

  it('falls back to the AxiosError message when response has no message field', () => {
    const axiosError = new AxiosError('Network Error', 'ERR_NETWORK');
    const result = toApiError(axiosError);

    expect(result.message).toBe('Network Error');
    expect(result.status).toBeUndefined();
  });

  it('wraps a generic Error as an unexpected error', () => {
    const result = toApiError(new Error('boom'));

    expect(result).toBeInstanceOf(ApiError);
    expect(result.message).toBe('An unexpected error occurred');
    expect(result.cause).toBeInstanceOf(Error);
  });

  it('wraps a non-Error thrown value', () => {
    const result = toApiError('a raw string was thrown');

    expect(result).toBeInstanceOf(ApiError);
    expect(result.message).toBe('An unexpected error occurred');
  });

  it('confirms axios.isAxiosError correctly identifies real AxiosErrors', () => {
    const axiosError = new AxiosError('fail');
    expect(axios.isAxiosError(axiosError)).toBe(true);
  });
});
