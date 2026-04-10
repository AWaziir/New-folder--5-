import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="header"
      style={{
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="logo">
          <span className="logo-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="4" />
              <path d="M8 12h8M12 8v8" />
            </svg>
          </span>
          Calc<span className="logo-text-accent">Pro.com.au</span>
        </Link>

        {/* Nav links */}
        <nav className="nav-menu">
          <NavLink to="/category/finance"    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Finance</NavLink>
          <NavLink to="/category/health"     className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Health</NavLink>
          <NavLink to="/category/math"       className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Math</NavLink>
          <NavLink to="/category/conversion" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Convert</NavLink>

          {/* Crypto — amber accent to distinguish as a featured section */}
          <NavLink
            to="/crypto/profit-calculator"
            className={({ isActive }) =>
              isActive
                ? 'nav-link nav-link-crypto active'
                : 'nav-link nav-link-crypto'
            }
          >
            ₿&nbsp;Crypto
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
