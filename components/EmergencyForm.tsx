'use client';

import { useState } from 'react';
import { Spinner } from '@/components/ui/spinner';

interface EmergencyFormProps {
  onSubmit: (symptoms: string) => void;
  loading: boolean;
  error: string | null;
}

const EXAMPLE_SYMPTOMS = [
  'chest pain and breathing difficulty',
  'fever and headache',
  'severe cut on arm',
  'sore throat and cough',
];

export default function EmergencyForm({ onSubmit, loading, error }: EmergencyFormProps) {
  const [symptoms, setSymptoms] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(symptoms);
  };

  const handleExample = (example: string) => {
    setSymptoms(example);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Describe Your Symptoms
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Enter detailed information about your symptoms for an accurate assessment
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="symptoms" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Symptoms
          </label>
          <textarea
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="e.g., chest pain, difficulty breathing, sharp pain in left side..."
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={5}
            disabled={loading}
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
            <p className="text-red-800 dark:text-red-100 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Spinner className="w-4 h-4" />
              Analyzing...
            </>
          ) : (
            'Predict Severity'
          )}
        </button>
      </form>

      <div>
        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-3">
          Try example symptoms:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {EXAMPLE_SYMPTOMS.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => handleExample(example)}
              disabled={loading}
              className="text-left px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 text-slate-700 dark:text-slate-300 text-sm rounded-lg transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
