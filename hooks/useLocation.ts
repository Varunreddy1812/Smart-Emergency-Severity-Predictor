'use client';

import { useState, useCallback } from 'react';

export interface LocationData {
  type: 'auto' | 'manual';
  latitude?: number;
  longitude?: number;
  city?: string;
  displayName: string;
  error?: string;
}

export function useLocation() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocationFromBrowser = useCallback(() => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({
          type: 'auto',
          latitude,
          longitude,
          displayName: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
        });
        setLoading(false);
        setError(null);
      },
      (err) => {
        let errorMessage = 'Failed to get your location';
        if (err.code === 1) {
          errorMessage = 'Location permission denied. Please enter your city manually.';
        } else if (err.code === 2) {
          errorMessage = 'Location unavailable. Please enter your city manually.';
        } else if (err.code === 3) {
          errorMessage = 'Location request timed out. Please enter your city manually.';
        }
        setError(errorMessage);
        setLoading(false);
      }
    );
  }, []);

  const setManualLocation = useCallback((city: string) => {
    if (!city.trim()) {
      setError('Please enter a valid city name');
      return;
    }
    setLocation({
      type: 'manual',
      city: city.trim(),
      displayName: city.trim(),
    });
    setError(null);
  }, []);

  const clearLocation = useCallback(() => {
    setLocation(null);
    setError(null);
  }, []);

  return {
    location,
    loading,
    error,
    getLocationFromBrowser,
    setManualLocation,
    clearLocation,
  };
}
