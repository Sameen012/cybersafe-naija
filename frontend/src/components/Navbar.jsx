import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShieldCheck, Menu, X, Search } from 'lucide-react';

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

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  // RUTHLESS FIX: This function forces the dropdown to close immediately
  const handleDropdownClick = (e) => {
    closeMenu(); // Close mobile menu if open
    // Find the parent <details> tag and force it to close
    const detailsElement = e.currentTarget.closest('details');
    if (detailsElement) {
      detailsElement.removeAttribute('open');
    }
  };

  return (
    // FIXED: Added 'relative z-50' so dropdowns float ABOVE everything else
    <header className="relative z-50 border-b border-brand-green/30 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 text-2xl font-bold text-brand-dark">
            <ShieldCheck className="h-7 w-7 text-brand-green" aria-hidden />
            <span>CyberSafe Naija</span>
          </NavLink>
          <div className="flex items-center gap-3 lg:hidden">
            <form onSubmit={handleSearch} className="flex items-center gap-2 rounded-full border border-brand-green/40 bg-white px-3 py-1 text-sm shadow-sm">
              <Search className="h-4 w-4 text-brand-green" aria-hidden />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search"
                className="w-24 border-none bg-transparent text-sm text-brand-dark outline-none"
              />
              <button type="submit" className="rounded-full bg-green-700 px-3 py-1 text-xs font-semibold text-white">
                Go
              </button>
            </form>
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="rounded-full border border-brand-green/40 p-2 text-brand-dark"
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div
          className={`mt-4 flex flex-col gap-6 lg:mt-6 lg:flex-row lg:items-center lg:justify-between ${
            isMenuOpen ? 'flex' : 'hidden lg:flex'
          }`}
        >
          <nav className="flex flex-col gap-3 text-sm font-semibold text-slate-600 lg:flex-row lg:items-center lg:gap-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-full px-3 py-1 transition-colors ${
                    isActive ? 'bg-brand-green text-white' : 'hover:bg-brand-light'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            
            {/* Resources Dropdown */}
            <details className="group relative lg:static">
              <summary className="cursor-pointer list-none rounded-full px-3 py-1 text-slate-600 transition-colors hover:bg-brand-light">
                Resources
              </summary>
              <div className="mt-2 rounded-2xl border border-brand-green/20 bg-white py-2 text-left shadow-lg lg:absolute lg:right-0 lg:z-50 lg:w-56">
                {resourceLinks.map((resource) => (
                  <NavLink
                    key={resource.to}
                    to={resource.to}
                    onClick={handleDropdownClick} // Attached the closer function here
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm ${
                        isActive ? 'bg-brand-green/10 text-brand-green' : 'text-slate-700 hover:bg-brand-light'
                      }`
                    }
                  >
                    {resource.label}
                  </NavLink>
                ))}
              </div>
            </details>
          </nav>

          <form
            onSubmit={handleSearch}
            className="hidden items-center gap-3 rounded-full border border-brand-green/40 bg-white px-4 py-2 text-sm shadow-sm lg:flex"
          >
            <Search className="h-4 w-4 text-brand-green" aria-hidden />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search phone number, keyword..."
              className="flex-1 border-none bg-transparent text-sm text-brand-dark outline-none"
            />
            <button type="submit" className="rounded-full bg-green-700 px-4 py-1 text-white">
              Go
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Navbar;