import { useState } from 'react';
import { useLoading } from './use-loading';

export const useApi = (apiFunction) => {
  const [loading, setLoading] = useLoading(false);
  const [error, setError] = useState(null);

  const execute = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunction(...args);
      return result;
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
      throw err; // Re-throw to allow calling component to handle if needed
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error, setError };
};