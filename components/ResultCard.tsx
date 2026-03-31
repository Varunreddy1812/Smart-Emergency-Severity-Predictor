'use client';

interface ResultCardProps {
  result: {
    severity_score: number;
    level: 'Low' | 'Medium' | 'High';
    advice: string;
    medication: string;
    medication_disclaimer: string;
    hospitals: string[];
    location?: string;
  };
}

const LEVEL_CONFIG = {
  Low: {
    color: 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700',
    badge: 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100',
    scoreColor: 'text-green-600 dark:text-green-400',
    icon: '✓',
  },
  Medium: {
    color: 'bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-700',
    badge: 'bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100',
    scoreColor: 'text-yellow-600 dark:text-yellow-400',
    icon: '⚠',
  },
  High: {
    color: 'bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700',
    badge: 'bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100',
    scoreColor: 'text-red-600 dark:text-red-400',
    icon: '🚨',
  },
};

export default function ResultCard({ result }: ResultCardProps) {
  const config = LEVEL_CONFIG[result.level];
  const scorePercentage = (result.severity_score / 10) * 100;

  return (
    <div className={`mt-8 border-2 rounded-lg p-8 ${config.color}`}>
      <div className="space-y-6">
        {/* Level Badge */}
        <div className="flex items-center gap-3">
          <span className="text-3xl">{config.icon}</span>
          <span className={`px-4 py-2 rounded-full font-bold text-sm ${config.badge}`}>
            {result.level} Severity
          </span>
        </div>

        {/* Score */}
        <div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className={`text-4xl font-bold ${config.scoreColor}`}>
              {result.severity_score}
            </span>
            <span className="text-slate-600 dark:text-slate-400">/10</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full transition-all ${
                result.level === 'High'
                  ? 'bg-red-500'
                  : result.level === 'Medium'
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
              }`}
              style={{ width: `${scorePercentage}%` }}
            />
          </div>
        </div>

        {/* Advice */}
        <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
            Recommended Action
          </h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {result.advice}
          </p>
        </div>

        {/* Medication Section */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
          <div className="flex items-start gap-3 mb-3">
            <span className="text-xl">💊</span>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                Medication Suggestion
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                {result.medication}
              </p>
              <p className="text-xs italic text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-700 p-2 rounded">
                ⚠️ {result.medication_disclaimer}
              </p>
            </div>
          </div>
        </div>

        {/* Nearby Help Section */}
        <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-lg p-4 border border-emerald-200 dark:border-emerald-700">
          <div className="flex items-start gap-3">
            <span className="text-xl">🏥</span>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Nearby Healthcare Centers
                </h3>
                {result.location && (
                  <span className="text-xs bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 px-2 py-1 rounded">
                    📍 {result.location}
                  </span>
                )}
              </div>
              <ul className="space-y-2">
                {result.hospitals.map((hospital, index) => (
                  <li key={index} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">•</span>
                    <span>{hospital}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-slate-600 dark:text-slate-400 pt-4 border-t border-slate-300 dark:border-slate-600">
          <p className="font-semibold text-red-600 dark:text-red-400 mb-2">
            ⚠️ Important Medical Disclaimer:
          </p>
          <p>
            This system provides basic guidance only. Please consult a doctor or chemist before taking any medication. For actual medical emergencies, always call emergency services (911 in US, 999 in UK, or your local emergency number) immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
