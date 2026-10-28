import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Menu, X, Search, ChevronRight, ChevronDown, AlertTriangle } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/library', label: 'Scam Library' },
  { to: '/simulator', label: 'Simulator' },
  { to: '/report', label: 'Report Scam' },
  { to: '/about', label: 'About Us' }
];

const resourceLinks = [
  { to: '/recovery', label: 'Emergency Bank Codes (USSD)', desc: 'Instant account freeze' },
  { to: '/dictionary', label: 'Cybercrime Lexicon', desc: 'Nigerian fraud slang & tactics' },
  { to: '/checklist', label: 'Hardening Checklist', desc: 'Secure mobile & banking' },
  { to: '/admin', label: 'Incident Room', desc: 'Moderator dispatch' }
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Close menu automatically when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    navigate(`/dictionary?q=${encodeURIComponent(query)}`);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-md transition-all">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          
          {/* LOGO: MATCHING MOCKUP */}
          <NavLink to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="h-6 w-6" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="leading-tight text-slate-900 font-extrabold text-lg tracking-tight">
                CyberSafe <span className="text-emerald-700">Naija</span>
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-700">STUDENT DEFENSE NET</span>
            </div>
          </NavLink>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden items-center gap-7 lg:flex">
            <nav className="flex items-center gap-6 text-sm font-semibold text-slate-700">
              {links.map((link) => (
                <NavLink 
                  key={link.to} 
                  to={link.to} 
                  className={({ isActive }) => 
                    `py-1 transition-all hover:text-emerald-700 ${
                      isActive 
                        ? 'text-emerald-800 font-bold border-b-2 border-emerald-700' 
                        : 'text-slate-600'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {/* Resources Dropdown */}
              <div className="group relative">
                <button className="flex items-center gap-1 py-1 text-slate-600 transition-colors hover:text-emerald-700 focus:outline-none">
                  Resources
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl ring-1 ring-black/5">
                    {resourceLinks.map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                          `block rounded-xl px-3.5 py-2.5 transition-colors ${
                            isActive 
                              ? 'bg-emerald-50 text-emerald-800' 
                              : 'text-slate-700 hover:bg-slate-50'
                          }`
                        }
                      >
                        <p className="text-sm font-bold">{link.label}</p>
                        <p className="text-[11px] text-slate-400 font-normal">{link.desc}</p>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* Desktop Search Bar (Pill shaped, matching mockup) */}
            <form onSubmit={handleSearch} className="relative flex items-center">
              <Search className="absolute left-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search scams, banks, or keywords..."
                className="w-56 lg:w-64 rounded-full border border-slate-200 bg-slate-50/80 py-2 pl-9 pr-4 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 transition-all shadow-sm"
              />
            </form>

            {/* EMERGENCY HELP BUTTON (Matching Mockup: Dark Green Pill with Alert Triangle) */}
            <Link
              to="/recovery"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#053d27] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#075034] transition-all shrink-0"
            >
              <AlertTriangle className="h-3.5 w-3.5 text-white" />
              <span>Emergency Help</span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/recovery"
              className="rounded-full bg-red-50 p-2 text-red-600"
              title="Emergency Account Freeze"
            >
              <AlertTriangle className="h-5 w-5" />
            </Link>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="rounded-full bg-slate-100 p-2 text-slate-800 hover:bg-slate-200"
              aria-label="Open Navigation Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN MENU OVERLAY */}
      <div 
        className={`fixed inset-0 z-50 transform bg-white transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col p-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span className="font-extrabold text-slate-900">CyberSafe Naija 🇳🇬</span>
            </div>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200"
              aria-label="Close Navigation Menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-5">
            <nav className="flex flex-col gap-1.5 text-base font-bold text-slate-800">
              {links.map((link) => (
                <NavLink 
                  key={link.to} 
                  to={link.to} 
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-xl px-4 py-3 transition-colors ${
                      isActive ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-slate-50'
                    }`
                  }
                >
                  {link.label}
                  <ChevronRight className="h-4 w-4 text-slate-300" />
                </NavLink>
              ))}
              
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="mb-2 px-4 text-xs font-bold uppercase tracking-widest text-emerald-700">Security Resources</p>
                <div className="flex flex-col gap-1">
                  {resourceLinks.map((link) => (
                    <NavLink 
                      key={link.to} 
                      to={link.to} 
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                          isActive ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'
                        }`
                      }
                    >
                      <div>
                        <p className="font-semibold text-slate-800">{link.label}</p>
                        <p className="text-[11px] text-slate-400 font-normal">{link.desc}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-300" />
                    </NavLink>
                  ))}
                </div>
              </div>
            </nav>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <Link
              to="/recovery"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 py-3.5 text-sm font-bold text-white shadow-md shadow-red-600/20"
            >
              <AlertTriangle className="h-4 w-4" />
              Emergency Account Freeze (USSD)
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;