import { useState } from 'react';
import { ShieldAlert, CheckCircle, Search } from 'lucide-react';

const BreachCheck = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const checkBreach = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate Check (In production, replace with real API)
    setTimeout(() => {
      if (email.includes('.xyz') || email === 'test@breach.com') {
        setStatus('breached');
      } else {
        setStatus('safe');
      }
    }, 1500);
  };

  return (
    <div className="overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl">
      <div className="p-8 md:p-10">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-indigo-500/20 p-3 text-indigo-400">
            <Search className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Dark Web Scanner</h3>
            <p className="mt-2 text-slate-400">
              Is your email already being sold by scammers? Check the global breach database now.
            </p>
          </div>
        </div>

        <form onSubmit={checkBreach} className="mt-8">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-5 py-4 text-white outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-xl bg-indigo-600 px-8 py-4 font-bold text-white transition-colors hover:bg-indigo-500 disabled:opacity-50"
            >
              {status === 'loading' ? 'Scanning...' : 'Scan Now'}
            </button>
          </div>
        </form>

        {status === 'safe' && (
          <div className="mt-6 flex items-center gap-3 rounded-xl bg-emerald-500/10 p-4 text-emerald-400">
            <CheckCircle className="h-5 w-5" />
            <p className="font-medium">No breaches found. Your identity is currently secure.</p>
          </div>
        )}

        {status === 'breached' && (
          <div className="mt-6 flex items-start gap-3 rounded-xl bg-red-500/10 p-4 text-red-400">
            <ShieldAlert className="h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-bold">WARNING: DATA FOUND</p>
              <p className="mt-1 text-sm text-red-300">
                Your email appeared in known data dumps. Hackers may have your old passwords. Change them immediately.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BreachCheck;