import ky from 'ky';

/**
 * Custom API client using ky with hooks for:
 * - Adding authorization token for requests (beforeRequest)
 * - Logging responses in development (afterResponse)
 * - Handling common response statuses
 */
/**
 * Simple token retrieval utility, could be expanded to check cookies or other storage.
 * Using globalThis.window to safely check for browser context in Next.js environment.
 */
export const getAuthToken = () => {
  if (globalThis.window !== undefined) {
    return localStorage.getItem('auth_token');
  }
  return null;
};

const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  hooks: {
    beforeRequest: [
      (request) => {
        const token = getAuthToken();

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (request, _options, response) => {
        // Logging for development purposes
        if (process.env.NODE_ENV === 'development') {
          console.log(
            `%c[API] %c${request.method} %c${request.url} %c${response.status}`,
            'color: #6366f1; font-weight: bold;', // [API]
            'color: #10b981; font-weight: bold;', // Method
            'color: #6b7280;', // URL
            `color: ${response.ok ? '#10b981' : '#ef4444'}; font-weight: bold;`, // Status
          );
        }

        // Handle specific error codes globally if needed
        if (response.status === 401) {
          console.warn('Unauthorized: Token may be expired or missing.');

          // Simple redirect for client-side environment
          if (globalThis.window !== undefined) {
            // For example, if you're using Next.js you could do:
            // window.location.href = '/login';
            // Here's a basic implementation for now
            console.warn('You may want to redirect to /login here.');
          }
        }

        return response;
      },
    ],
  },
});

export default api;
