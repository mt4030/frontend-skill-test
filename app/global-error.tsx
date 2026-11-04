
'use client';

import { useEffect } from 'react';
import { RefreshCcw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-linear-to-br from-gray-950 via-black to-gray-900 text-white min-h-screen flex items-center justify-center px-6">
        <div className="max-w-2xl w-full text-center">

       
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight bg-linear-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(251,191,36,0.6)]">
            CUT! SCENE ERROR
          </h1>
          <p className="mt-6 text-gray-400 text-lg">
            Something went wrong during production.
            <br />
            This scene didn't go as planned.
          </p>

                   <div className="mt-8 h-px w-full bg-linear-to-r from-transparent via-amber-500 to-transparent opacity-40" />

                <div className="mt-8 bg-gray-900/70 backdrop-blur-sm border border-amber-500/30 rounded-2xl p-6 shadow-[0_0_40px_rgba(251,191,36,0.15)]">
            <p className="text-sm text-gray-500 mb-2 uppercase tracking-wider">
              Production Report
            </p>

            <p className="text-red-400 text-sm wrap-break-word">
              {error?.message || 'An unexpected production error occurred'}
            </p>
          </div>

        
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => reset()}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-amber-500/30"
            >
              <RefreshCcw size={18} />
              Reshoot Scene
            </button>

            <button
              onClick={() => (window.location.href = '/')}
              className="px-6 py-3 rounded-xl border border-gray-700 hover:border-amber-500 text-gray-300 hover:text-white transition-all duration-300"
            >
              Back to Homepage
            </button>

          </div>

                 <p className="mt-12 text-xs text-gray-600">
            Every great production has its bloopers. We'll get this scene back on track.
          </p>
        </div>
      </body>
    </html>
  );
}
