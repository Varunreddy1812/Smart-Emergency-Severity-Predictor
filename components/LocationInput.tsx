'use client';

import { useState } from 'react';
import { LocationData } from '@/hooks/useLocation';
import { Spinner } from '@/components/ui/spinner';

interface LocationInputProps {
  onLocationSet: (location: LocationData) => void;
  loading: boolean;
  error: string | null;
  location: LocationData | null;
  onGetLocation: () => void;
  onSetManualLocation: (city: string) => void;
}

export default function LocationInput({
  onLocationSet,
  loading,
  error,
  location,
  onGetLocation,
  onSetManualLocation,
}: LocationInputProps) {
  const [manualCity, setManualCity] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCity.trim()) {
      onSetManualLocation(manualCity);
      setManualCity('');
      setShowManualInput(false);
    }
  };

  if (location) {
    return (
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 border border-blue-200 dark:border-blue-700 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="text-xl">📍</span>
          <div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Current Location
            </p>
            <p className="text-slate-900 dark:text-white font-semibold">
              {location.displayName}
            </p>
            {location.type === 'auto' && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Auto-detected via GPS
              </p>
            )}
            {location.type === 'manual' && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Manually entered
              </p>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowManualInput(true)}
          className="text-sm px-3 py-1 bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100 rounded hover:bg-blue-300 dark:hover:bg-blue-700 transition-colors whitespace-nowrap"
        >
          Change
        </button>

        {showManualInput && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-sm w-full shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Change Location
              </h3>
              <form onSubmit={handleManualSubmit} className="space-y-4">
                <input
                  type="text"
                  value={manualCity}
                  onChange={(e) => setManualCity(e.target.value)}
                  placeholder="Enter city or location name"
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
                  >
                    Save Location
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowManualInput(false);
                      setManualCity('');
                    }}
                    className="flex-1 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 space-y-3 border border-slate-200 dark:border-slate-600">
      <div>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Help us find nearby hospitals
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={onGetLocation}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          {loading ? (
            <>
              <Spinner className="w-4 h-4" />
              Detecting location...
            </>
          ) : (
            <>
              <span>📍</span>
              Use My Location
            </>
          )}
        </button>

        {error && (
          <p className="text-xs text-red-600 dark:text-red-400 text-center">
            {error}
          </p>
        )}

        <button
          onClick={() => setShowManualInput(!showManualInput)}
          disabled={loading}
          type="button"
          className="w-full text-slate-700 dark:text-slate-300 font-semibold py-2 px-4 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
        >
          Or enter city manually
        </button>
      </div>

      {showManualInput && (
        <form onSubmit={handleManualSubmit} className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-600">
          <input
            type="text"
            value={manualCity}
            onChange={(e) => setManualCity(e.target.value)}
            placeholder="e.g., Guntur, Hyderabad, Bangalore"
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button
            type="submit"
            disabled={!manualCity.trim()}
            className="w-full bg-slate-700 hover:bg-slate-800 disabled:bg-slate-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Set Location
          </button>
        </form>
      )}
    </div>
  );
}
