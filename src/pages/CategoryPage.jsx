import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getCategoryById } from '../data/categories';
import AdPlaceholder from '../components/AdPlaceholder';
import SEO from '../components/SEO';

const categoryConfig = {
  finance: { color: '#a78bfa', glow: 'rgba(124,58,237,0.25)', gradient: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.08))' },
  health:  { color: '#6ee7b7', glow: 'rgba(16,185,129,0.25)', gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(6,182,212,0.06))' },
  math:    { color: '#fbbf24', glow: 'rgba(245,158,11,0.25)', gradient: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(239,68,68,0.06))' },
  conversion: { color: '#67e8f9', glow: 'rgba(6,182,212,0.25)', gradient: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(124,58,237,0.06))' },
  other:   { color: '#a78bfa', glow: 'rgba(124,58,237,0.25)', gradient: 'linear-gradient(135deg, rgba(124,58,237,0.1), transparent)' },
};

export default function CategoryPage() {
  const { categoryId } = useParams();
  const category = getCategoryById(categoryId);

  if (!category) return <Navigate to="/" replace />;

  const Icon = category.icon;
  const cfg = categoryConfig[categoryId] || categoryConfig.other;

  return (
    <div className="container">
      <SEO
        title={`${category.name} - Free Online Tools & Calculators`}
        description={`Access the best ${category.name} tools available for free online. Quick results, mathematically verified, and easy to use.`}
        path={`/category/${categoryId}`}
      />

      {/* Category Hero Header */}
      <div style={{
        margin: '2.5rem 0 2rem',
        padding: '2.5rem',
        background: cfg.gradient,
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Orb */}
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: '220px', height: '220px',
          background: `radial-gradient(circle, ${cfg.glow} 0%, transparent 70%)`,
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', position: 'relative', zIndex: 1 }}>
          <div style={{
            width: '3.5rem', height: '3.5rem', flexShrink: 0,
            background: `${cfg.color}20`,
            border: `1px solid ${cfg.color}40`,
            borderRadius: '1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: cfg.color,
            boxShadow: `0 0 20px ${cfg.glow}`,
          }}>
            <Icon size={26} />
          </div>
          <div>
            <h1 style={{
              fontSize: '1.9rem', fontWeight: 800, letterSpacing: '-0.025em',
              marginBottom: '0.3rem', color: 'var(--text-main)',
            }}>
              {category.name}
            </h1>
            <p style={{ color: 'var(--text-muted)', maxWidth: '500px', lineHeight: 1.65 }}>
              {category.description}
            </p>
          </div>
        </div>
      </div>

      <AdPlaceholder text={`${category.name} Top Banner Ad`} />

      {/* Calculator Grid */}
      {category.subcategories ? (
        <div style={{ display: 'grid', gap: '3rem', margin: '2rem 0 4rem' }}>
          {category.subcategories.map((sub, index) => {
            const SubIcon = sub.icon;
            return (
              <div key={index}>
                {/* Subcategory heading */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  paddingBottom: '1rem',
                  marginBottom: '1.25rem',
                  borderBottom: '1px solid var(--border-color)',
                }}>
                  <div style={{
                    width: '2rem', height: '2rem',
                    background: `${cfg.color}15`,
                    border: `1px solid ${cfg.color}25`,
                    borderRadius: '0.5rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: cfg.color,
                  }}>
                    <SubIcon size={16} />
                  </div>
                  <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {sub.name}
                  </h2>
                </div>

                <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                  {sub.calculators.map(calc => (
                    <CalcCard key={calc.id} calc={calc} accent={cfg.color} glow={cfg.glow} />
                  ))}
                </div>

                {index === 0 && <AdPlaceholder text="Inline Section Ad" />}
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem', margin: '2rem 0 4rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {category.calculators.map(calc => (
            <CalcCard key={calc.id} calc={calc} accent={cfg.color} glow={cfg.glow} />
          ))}
        </div>
      )}

      <AdPlaceholder text="Footer Categorization Ad" />
    </div>
  );
}

function CalcCard({ calc, accent, glow }) {
  return (
    <Link
      to={calc.path}
      style={{
        display: 'block',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '1rem',
        padding: '1.4rem',
        textDecoration: 'none',
        transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${accent}45`;
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = `0 12px 35px rgba(0,0,0,0.4), 0 0 0 1px ${accent}25`;
        const arrow = e.currentTarget.querySelector('.card-arrow');
        if (arrow) { arrow.style.opacity = '1'; arrow.style.transform = 'translateX(4px)'; }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        const arrow = e.currentTarget.querySelector('.card-arrow');
        if (arrow) { arrow.style.opacity = '0'; arrow.style.transform = 'translateX(0)'; }
      }}
    >
      {/* Subtle top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: '1.4rem', right: '1.4rem', height: '2px',
        background: `linear-gradient(90deg, ${accent}80, transparent)`,
        borderRadius: '0 0 2px 2px',
      }} />

      <h3 style={{
        fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem',
        color: 'var(--text-main)',
      }}>
        {calc.name}
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1rem' }}>
        {calc.description}
      </p>

      <div className="card-arrow" style={{
        display: 'flex', alignItems: 'center', gap: '0.35rem',
        fontSize: '0.78rem', fontWeight: 700, color: accent,
        letterSpacing: '0.05em', opacity: 0,
        transition: 'opacity 0.2s ease, transform 0.2s ease',
      }}>
        Calculate now
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>
    </Link>
  );
}
