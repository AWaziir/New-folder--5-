import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <span style={{
            width: '1.4rem', height: '1.4rem',
            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            borderRadius: '0.35rem',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="4" />
              <path d="M8 12h8M12 8v8" />
            </svg>
          </span>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: '#c4cde0', fontSize: '0.95rem' }}>
            Calc<span style={{ color: '#a78bfa' }}>Pro.com.au</span>
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <Link to="/category/finance" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Finance</Link>
          <Link to="/category/health" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Health</Link>
          <Link to="/category/math" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Math</Link>
          <Link to="/category/conversion" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Conversion</Link>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <Link to="/about-us" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>About Us</Link>
          <Link to="/privacy-policy" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Privacy Policy</Link>
          <Link to="/terms-of-service" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Terms of Service</Link>
          <Link to="/contact" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Contact</Link>
        </div>
        <p style={{ fontSize: '0.8rem' }}>© {new Date().getFullYear()} CalcPro.com.au · All calculations run privately in your browser.</p>
      </div>
    </footer>
  );
}
