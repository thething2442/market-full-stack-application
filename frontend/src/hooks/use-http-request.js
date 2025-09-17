import { useState } from 'react';
import { useLoading } from './use-loading';

export const useHttpRequest = () => {
  const [loading, setLoading] = useLoading(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const request = async (url, method = 'GET', body = null) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const options = {
        method,
        headers: {},
      };

      if (body) {
        if (body instanceof FormData) {
          options.body = body;
        } else {
          options.headers['Content-Type'] = 'application/json';
          options.body = JSON.stringify(body);
        }
      }

      const response = await fetch(url, options);
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Something went wrong with the API request.');
      }

      setData(responseData);
      return responseData;
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error, data, setError, setData };
};
