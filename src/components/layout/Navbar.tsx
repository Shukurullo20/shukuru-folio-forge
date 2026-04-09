import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/blog', label: 'Blog' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/knowledge', label: 'Learning' },
  { to: '/resume', label: 'Resume' },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });
  const location = useLocation();

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setDark(!dark);
    localStorage.setItem('theme', !dark ? 'dark' : 'light');
  };

  // Init theme from localStorage
  useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setDark(true);
    }
  });

  return (
    <nav
      className="sticky top-0 z-50"
      style={{ height: 48, borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg)' }}
    >
      <div className="max-w-[768px] mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="text-base font-semibold" style={{ color: 'var(--fg)' }}>
          SM<span style={{ color: '#2a9d8f' }}>.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="text-xs transition-opacity hover:opacity-70"
              style={{
                color: location.pathname === link.to ? '#2a9d8f' : 'var(--fg2)',
                fontWeight: location.pathname === link.to ? 500 : 400,
              }}
            >
              {link.label}
            </Link>
          ))}
          <button onClick={toggleTheme} className="p-1" style={{ color: 'var(--fg3)' }}>
            {dark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <button onClick={toggleTheme} className="p-1" style={{ color: 'var(--fg3)' }}>
            {dark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-1" style={{ color: 'var(--fg)' }}>
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden absolute left-0 right-0 top-[48px] py-4 px-6 flex flex-col gap-3 z-50"
          style={{ backgroundColor: 'var(--bg)', borderBottom: '1px solid var(--border)' }}
        >
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="text-sm"
              style={{
                color: location.pathname === link.to ? '#2a9d8f' : 'var(--fg2)',
                fontWeight: location.pathname === link.to ? 500 : 400,
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
