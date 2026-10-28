import { Link } from 'react-router-dom';
import { AlertTriangle, PhoneCall } from 'lucide-react';

const PanicButton = () => {
  return (
    <Link
      to="/recovery"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-red-700 px-5 py-3.5 text-white shadow-2xl shadow-red-600/40 transition-transform hover:scale-105 active:scale-95 border border-white/20"
      title="Freeze Bank Account Instantly via USSD"
    >
      <div className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-80" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
      </div>
      <AlertTriangle className="h-5 w-5 text-white" />
      <span className="font-extrabold text-xs sm:text-sm tracking-wide">Emergency Freeze (USSD)</span>
    </Link>
  );
};

export default PanicButton;