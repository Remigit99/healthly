import { useRouteError } from 'react-router';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

const GlobalErrorFallback = () => {
  const error = useRouteError(); // React Router's hook for catching errors
  console.error(error);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl p-10 text-center border border-slate-100">
        <div className="h-20 w-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={40} />
        </div>
        
        <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Something went wrong</h2>
        <p className="text-slate-500 mb-6 text-sm">
          {error?.statusText || error?.message || "An unexpected error occurred."}
        </p>

        <button 
          onClick={() => window.location.href = '/dashboard'}
          className="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2"
        >
          <RefreshCcw size={18} /> Refresh Page
        </button>
      </div>
    </div>
  );
};

export default GlobalErrorFallback;