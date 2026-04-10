import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, MapPin, Car, BookOpen, TrendingUp, PiggyBank, Briefcase, ShoppingCart } from 'lucide-react';
import { categories, getAllCalculators } from '../data/categories';
import AdPlaceholder from '../components/AdPlaceholder';
import SEO from '../components/SEO';

const useCases = [
  {
    icon: <HomeIcon size={20} />,
    title: 'Buying a Home',
    desc: 'Plan your dream home with mortgage, valuation, and rental tools.',
    links: [
      { name: 'Mortgage Calc', path: '/finance/mortgage-calculator' },
      { name: 'Affordability', path: '/finance/house-affordability' },
      { name: 'Real Estate ROI', path: '/finance/real-estate-calculator' }
    ]
  },
  {
    icon: <Car size={20} />,
    title: 'Financing a Vehicle',
    desc: 'Find the best deal for your next car or auto lease.',
    links: [
      { name: 'Auto Loan', path: '/finance/auto-loan-calculator' },
      { name: 'Auto Lease', path: '/finance/auto-lease-calculator' }
    ]
  },
  {
    icon: <TrendingUp size={20} />,
    title: 'Building Wealth',
    desc: 'Forecast returns and leverage compound interest.',
    links: [
      { name: 'Investment ROI', path: '/finance/investment-calculator' },
      { name: 'Compound Interest', path: '/finance/interest-calculator' },
      { name: 'Crypto Profit', path: '/crypto/profit-calculator' }
    ]
  },
  {
    icon: <Briefcase size={20} />,
    title: 'Tax Planning',
    desc: 'Calculate income tax, GST, VAT, and plan deductions.',
    links: [
      { name: 'Income Tax', path: '/finance/income-tax-calculator' },
      { name: 'Tax AU', path: '/finance/tax-calculator-australia' },
      { name: 'Sales Tax', path: '/finance/sales-tax-calculator' }
    ]
  },
  {
    icon: <ShoppingCart size={20} />,
    title: 'Business & Sales',
    desc: 'Optimize your retail or business operations with margin and discount tools.',
    links: [
      { name: 'Profit & Loss', path: '/finance/profit-loss' },
      { name: 'Discount Calc', path: '/finance/discount-calculator' },
      { name: 'ROI Calculator', path: '/finance/roi-calculator' }
    ]
  }
];

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    label: '100% Private',
    sublabel: 'All calculations run in your browser. Zero data sent to servers.',
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.3)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    label: 'Verified Formulas',
    sublabel: 'Edge-cases covered. From 0% APR loans to complex compound interest.',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.3)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    label: 'Instant Results',
    sublabel: 'No page reloads. Change a value and watch results update live.',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.3)',
  },
];

const categoryGradients = [
  'linear-gradient(135deg, #7c3aed22, #06b6d412)',
  'linear-gradient(135deg, #10b98122, #059f6412)',
  'linear-gradient(135deg, #f59e0b22, #ef444412)',
  'linear-gradient(135deg, #06b6d422, #7c3aed12)',
];
const categoryAccents = ['#a78bfa', '#6ee7b7', '#fbbf24', '#67e8f9'];
const categoryGlows = [
  'rgba(124,58,237,0.2)',
  'rgba(16,185,129,0.2)',
  'rgba(245,158,11,0.2)',
  'rgba(6,182,212,0.2)',
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const allCalculators = getAllCalculators();
  const filteredCalculators = searchQuery
    ? allCalculators.filter(calc => calc.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div>
      <SEO
        title="100+ Free Online Calculators - Finance, Health, Math & Crypto"
        description="CalcPro.com.au provides over 100+ free, fast, and accurate online calculators for finance, health, math, and conversions."
        path="/"
      />

      {/* ── HERO ── */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '5rem 1.5rem 6rem',
        textAlign: 'center',
      }}>
        {/* Animated orb background */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0,
        }}>
          <div style={{
            position: 'absolute', top: '-15%', left: '20%',
            width: '600px', height: '600px',
            background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'orb-drift 20s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', bottom: '-20%', right: '10%',
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'orb-drift 25s ease-in-out 5s infinite reverse',
          }} />
          {/* Grid overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '780px', margin: '0 auto' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 1rem',
            marginBottom: '2rem',
            background: 'rgba(124,58,237,0.12)',
            border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: '9999px',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#a78bfa',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#a78bfa"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            100% Free · Mathematically Verified
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
          }}>
            The Ultimate<br />
            <span style={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #38bdf8 50%, #67e8f9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              CalcPro.com.au
            </span>
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            marginBottom: '3rem',
            maxWidth: '560px',
            margin: '0 auto 3rem',
          }}>
            Stop guessing your future. Access 40+ professional-grade calculators for finance, mortgages, fitness, and daily math — all instantly.
          </p>

          {/* Search Bar */}
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '1rem',
            padding: '0.35rem',
            display: 'flex',
            gap: '0.35rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}>
            <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
              <svg
                style={{ position: 'absolute', left: '1rem', color: 'var(--text-faint)', flexShrink: 0 }}
                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search calculators... (e.g. 'Mortgage', 'BMI')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 2.75rem',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text-main)',
                  fontSize: '0.95rem',
                  fontFamily: 'inherit',
                }}
              />
            </div>
            <button style={{
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              color: 'white',
              border: 'none',
              borderRadius: '0.7rem',
              padding: '0 1.5rem',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 15px rgba(124,58,237,0.4)',
              fontFamily: 'inherit',
            }}>
              Search
            </button>
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div style={{
              marginTop: '1.25rem',
              maxWidth: '600px',
              margin: '1.25rem auto 0',
              background: 'var(--bg-card)',
              border: '1px solid rgba(124,58,237,0.3)',
              borderRadius: '1rem',
              padding: '1.25rem',
              textAlign: 'left',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.1)',
            }}>
              <p style={{
                fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.15em', color: 'var(--text-faint)', marginBottom: '0.75rem',
              }}>
                {filteredCalculators.length} result{filteredCalculators.length !== 1 ? 's' : ''}
              </p>
              {filteredCalculators.length > 0 ? (
                <div style={{ display: 'grid', gap: '0.5rem', maxHeight: '20rem', overflowY: 'auto' }}>
                  {filteredCalculators.map(calc => (
                    <Link key={calc.id} to={calc.path} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '0.85rem 1rem',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '0.65rem',
                      transition: 'all 0.2s ease',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)';
                      e.currentTarget.style.background = 'rgba(124,58,237,0.08)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.background = 'var(--bg-surface)';
                    }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.95rem' }}>{calc.name}</span>
                      <span style={{
                        fontSize: '0.72rem', fontWeight: 700, color: '#a78bfa',
                        textTransform: 'uppercase', letterSpacing: '0.08em',
                      }}>Open →</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1.5rem 0' }}>
                  No results for <strong style={{ color: 'var(--text-secondary)' }}>"{searchQuery}"</strong>. Try another keyword.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      <div className="container">
        <AdPlaceholder text="Top Banner Ad" />

        {!searchQuery && (
          <>
            {/* ── USE CASES / SCENARIOS (Inspired by calcpro.com.au) ── */}
            <section style={{ marginBottom: '5rem', marginTop: '3rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <p style={{
                  fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.18em', color: 'var(--primary-light)', marginBottom: '0.75rem',
                }}>
                  Solutions
                </p>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                  What are you planning today?
                </h2>
              </div>
              
              <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                {useCases.map((uc, i) => (
                   <div key={i} style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '1.25rem',
                      padding: '1.75rem',
                   }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--primary-light)' }}>
                         <div style={{ background: 'rgba(124,58,237,0.1)', padding: '0.6rem', borderRadius: '0.75rem' }}>
                           {uc.icon}
                         </div>
                         <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'white' }}>{uc.title}</h3>
                      </div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                         {uc.desc}
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                         {uc.links.map((link, idx) => (
                           <Link key={idx} to={link.path} style={{
                              display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem',
                              color: 'var(--text-main)', textDecoration: 'none', padding: '0.5rem 0.75rem',
                              background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', transition: 'background 0.2s'
                           }}
                           onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                           onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}>
                              <span style={{ color: 'var(--primary)' }}>→</span> {link.name}
                           </Link>
                         ))}
                      </div>
                   </div>
                ))}
              </div>
            </section>

            {/* ── CATEGORIES ── */}
            <section style={{ marginBottom: '5rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <p style={{
                  fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.18em', color: 'var(--primary-light)', marginBottom: '0.75rem',
                }}>
                  Explore
                </p>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                  Expert Calculator Categories
                </h2>
              </div>

              <div style={{ display: 'grid', gap: '1.25rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                {categories.map((cat, i) => {
                  const Icon = cat.icon;
                  const accent = categoryAccents[i % categoryAccents.length];
                  const gradient = categoryGradients[i % categoryGradients.length];
                  const glow = categoryGlows[i % categoryGlows.length];
                  const count = cat.calculators?.length
                    || cat.subcategories?.reduce((acc, sub) => acc + sub.calculators.length, 0)
                    || 0;

                  return (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.id}`}
                      style={{
                        display: 'block',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '1.25rem',
                        padding: '1.75rem',
                        textDecoration: 'none',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = `${accent}50`;
                        e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${accent}30`;
                        e.currentTarget.style.transform = 'translateY(-6px)';
                        e.currentTarget.querySelector('.cat-icon-wrap').style.boxShadow = `0 0 20px ${glow}`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.querySelector('.cat-icon-wrap').style.boxShadow = 'none';
                      }}
                    >
                      {/* BG gradient blob */}
                      <div style={{
                        position: 'absolute', inset: 0, background: gradient,
                        opacity: 0, transition: 'opacity 0.3s',
                        borderRadius: 'inherit', pointerEvents: 'none',
                      }} />

                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                        <div className="cat-icon-wrap" style={{
                          width: '3rem', height: '3rem', flexShrink: 0,
                          background: `${accent}18`,
                          border: `1px solid ${accent}30`,
                          borderRadius: '0.75rem',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: accent,
                          transition: 'box-shadow 0.3s ease',
                        }}>
                          <Icon size={22} />
                        </div>
                        <div>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text-main)' }}>
                            {cat.name}
                          </h3>
                          <span style={{
                            fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
                            letterSpacing: '0.1em', color: accent, opacity: 0.85,
                          }}>
                            {count} tools
                          </span>
                        </div>
                      </div>

                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                        {cat.description}
                      </p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                        {(cat.subcategories || [{ calculators: cat.calculators }]).slice(0, 1).map(sub =>
                          sub.calculators.slice(0, 3).map(c => (
                            <span key={c.id} style={{
                              padding: '0.2rem 0.6rem',
                              background: `${accent}12`,
                              border: `1px solid ${accent}20`,
                              borderRadius: '9999px',
                              fontSize: '0.72rem',
                              color: accent,
                              fontWeight: 600,
                            }}>
                              {c.name}
                            </span>
                          ))
                        )}
                      </div>

                      <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.4rem',
                        fontSize: '0.82rem', fontWeight: 700, color: accent,
                        letterSpacing: '0.04em',
                      }}>
                        Explore all tools
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* ── FEATURES ── */}
            <section style={{ marginBottom: '5rem' }}>
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '1.5rem',
                padding: '3rem 2rem',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* background glow */}
                <div style={{
                  position: 'absolute', top: '-80px', right: '-80px',
                  width: '300px', height: '300px',
                  background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }} />

                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                  <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
                    Why Use CalcPro.com.au?
                  </h2>
                  <p style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
                    Most online calculators are clunky, outdated, or harvest your data. We're changing that.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                  {features.map((f, i) => (
                    <div key={i} style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '1rem',
                      padding: '1.5rem',
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = `${f.color}40`;
                      e.currentTarget.style.boxShadow = `0 8px 30px rgba(0,0,0,0.3), 0 0 20px ${f.glow}`;
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}>
                      <div style={{
                        width: '2.75rem', height: '2.75rem',
                        background: `${f.color}18`,
                        border: `1px solid ${f.color}30`,
                        borderRadius: '0.65rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: f.color,
                        marginBottom: '1rem',
                      }}>
                        {f.icon}
                      </div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                        {f.label}
                      </h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.65 }}>
                        {f.sublabel}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        <AdPlaceholder text="Bottom Content Ad" />
      </div>
    </div>
  );
}
