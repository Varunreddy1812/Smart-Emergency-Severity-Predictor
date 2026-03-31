export default function Header() {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="text-4xl">🚨</div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Emergency Predictor
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              AI-powered emergency severity assessment
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
