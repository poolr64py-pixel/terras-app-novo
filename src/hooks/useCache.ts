import { useState, useEffect, useCallback } from 'react';

interface CacheOptions {
  ttl?: number; // Time to live em milliseconds
}

export const useCache = <T>(key: string, options: CacheOptions = {}) => {
  const { ttl = 5 * 60 * 1000 } = options; // 5 minutos por padrão
  
  const [data, setData] = useState<T | null>(() => {
    try {
      const cached = sessionStorage.getItem(key);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < ttl) {
          return parsed.data;
        }
        sessionStorage.removeItem(key);
      }
    } catch (error) {
      console.warn('Error loading from cache:', error);
    }
    return null;
  });

  const setCache = useCallback((newData: T) => {
    try {
      sessionStorage.setItem(key, JSON.stringify({
        data: newData,
        timestamp: Date.now()
      }));
      setData(newData);
    } catch (error) {
      console.warn('Error saving to cache:', error);
      setData(newData);
    }
  }, [key]);

  const clearCache = useCallback(() => {
    sessionStorage.removeItem(key);
    setData(null);
  }, [key]);

  return { data, setCache, clearCache };
};