import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Menu, X, Search, ChevronRight } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/library', label: 'Scam Library' },
  { to: '/simulator', label: 'Simulator' },
  { to: '/report', label: 'Report' },
  { to: '/admin', label: 'Admin' }
];

const resourceLinks = [
  { to: '/recovery', label: 'Recovery Guide' },
  { to: '/dictionary', label: 'Scam Dictionary' },
  { to: '/checklist', label: 'Protection Checklist' }
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

  // Lock body scroll when menu is open (iPhone Fix)
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
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-brand-green/10 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <NavLink to="/" className="flex items-center gap-2 text-xl font-black tracking-tight text-brand-dark">
            <ShieldCheck className="h-7 w-7 text-brand-green" strokeWidth={2.5} />
            <span>CyberSafe</span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-6 lg:flex">
            <nav className="flex items-center gap-6 text-sm font-semibold text-slate-600">
              {links.map((link) => (
                <NavLink 
                  key={link.to} 
                  to={link.to} 
                  className={({ isActive }) => 
                    `transition-colors hover:text-brand-green ${isActive ? 'text-brand-green' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="flex items-center rounded-full bg-slate-100 px-4 py-2">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="ml-2 w-32 bg-transparent text-sm outline-none placeholder:text-slate-400 focus:w-48 transition-all"
              />
            </form>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="rounded-full bg-slate-50 p-2 text-slate-900 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN MENU OVERLAY (iPhone Style) */}
      <div 
        className={`fixed inset-0 z-50 transform bg-white transition-transform duration-300 ease-out lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col p-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-6">
            <span className="text-lg font-black text-brand-dark">Menu</span>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="rounded-full bg-slate-100 p-2 text-slate-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6">
            <nav className="flex flex-col gap-6 text-lg font-bold text-slate-800">
              {links.map((link) => (
                <NavLink key={link.to} to={link.to} className="flex items-center justify-between border-b border-slate-50 pb-4">
                  {link.label}
                  <ChevronRight className="h-5 w-5 text-slate-300" />
                </NavLink>
              ))}
              
              <div className="pt-4">
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-brand-green">Resources</p>
                <div className="flex flex-col gap-4 pl-2">
                  {resourceLinks.map((link) => (
                    <NavLink key={link.to} to={link.to} className="text-base font-medium text-slate-600">
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            </nav>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <form onSubmit={handleSearch} className="flex items-center rounded-2xl bg-slate-100 px-4 py-3">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="ml-3 flex-1 bg-transparent text-base outline-none"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;