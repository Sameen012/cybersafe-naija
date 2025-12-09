import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const PanicButton = () => {
  return (
    <Link
      to="/recovery"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 animate-pulse items-center justify-center rounded-full bg-red-600 text-white shadow-xl shadow-red-600/30 transition-transform hover:scale-110 active:scale-95 sm:h-auto sm:w-auto sm:rounded-2xl sm:px-6"
    >
      <AlertTriangle className="h-6 w-6 sm:mr-2" />
      <span className="hidden font-bold sm:inline">I've Been Scammed</span>
    </Link>
  );
};

export default PanicButton;