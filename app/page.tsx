'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import EmergencyForm from '@/components/EmergencyForm';
import LocationInput from '@/components/LocationInput';
import ResultCard from '@/components/ResultCard';
import Footer from '@/components/Footer';
import { useLocation, LocationData } from '@/hooks/useLocation';

interface PredictionResult {
  severity_score: number;
  level: 'Low' | 'Medium' | 'High';
  advice: string;
  location?: string;
}

export default function Home() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { location, loading: locationLoading, error: locationError, getLocationFromBrowser, setManualLocation } = useLocation();

  const handleLocationSet = (loc: LocationData) => {
    // Location is already set via the hook
  };

  const handlePredict = async (symptoms: string) => {
    if (!symptoms.trim()) {
      setError('Please enter symptoms');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const requestBody: any = { symptoms };
      
      // Add location data if available
      if (location) {
        if (location.type === 'auto') {
          requestBody.latitude = location.latitude;
          requestBody.longitude = location.longitude;
        } else {
          requestBody.location = location.city;
        }
      }

      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to get prediction');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage || 'Error processing prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl space-y-6">
          <LocationInput 
            onLocationSet={handleLocationSet}
            loading={locationLoading}
            error={locationError}
            location={location}
            onGetLocation={getLocationFromBrowser}
            onSetManualLocation={setManualLocation}
          />

          <EmergencyForm onSubmit={handlePredict} loading={loading} error={error} />

          {result && <ResultCard result={result} />}
        </div>
      </main>

      <Footer />
    </div>
  );
}
