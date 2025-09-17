import { useState, useCallback } from 'react';

/**
 * A custom hook for making API requests.
 *
 * @returns {{
 *   data: any,
 *   error: string | null,
 *   loading: boolean,
 *   request: (url: string, method?: string, body?: object | null) => Promise<any>
 * }}
 */
export const useApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Performs an API request.
   * @param {string} url - The URL to request.
   * @param {string} [method='GET'] - The HTTP method.
   * @param {object | null} [body=null] - The request body for POST/PUT requests.
   * @returns {Promise<any>} The response data.
   */
  const request = useCallback(async (url, method = 'GET', body = null) => {
    setLoading(true);
    setError(null);
    try {
      const options = {
        method,
        headers: {},
      };

      if (body) {
        if (body instanceof FormData) {
          // Let the browser set the Content-Type for FormData
          options.body = body;
        } else {
          options.headers['Content-Type'] = 'application/json';
          options.body = JSON.stringify(body);
        }
      }

      const response = await fetch(url, options);
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Something went wrong');
      }

      setData(responseData);
      return responseData;
    } catch (err) {
      setError(err.message);
      // Re-throw the error so it can be caught in the component if needed
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, request };
};
