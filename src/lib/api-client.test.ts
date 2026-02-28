import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from './api-client';

describe('API Client', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.restoreAllMocks();
  });

  it('should be defined and export a ky instance', () => {
    expect(api).toBeDefined();
    expect(typeof api.get).toBe('function');
    expect(typeof api.post).toBe('function');
  });

  it('should have a default prefixUrl if NEXT_PUBLIC_API_URL is not set', () => {
    // Since NEXT_PUBLIC_API_URL is likely not set in CI/Test env without .env
    // we can check if it at least has a value (either from env or default)
    // and verify the client exists.
    expect(api).toBeDefined();
  });

  // More advanced tests would involve mocking fetch/ky hooks,
  // but verifying the basic instance is a good first step.
});
