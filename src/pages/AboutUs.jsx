import React from 'react';
import SEO from '../components/SEO';
import { Calculator, Shield, Zap, TrendingUp } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="container" style={{ maxWidth: '800px', marginBottom: '4rem' }}>
      <SEO
        title="About Us - The Team Behind CalcHub"
        description="Learn more about CalcHub, our mission to provide the world's most accurate, free, and private online calculators."
        path="/about-us"
      />

      {/* Hero */}
      <div style={{
        margin: '2.5rem 0 2.5rem',
        padding: '3rem',
        background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(6,182,212,0.06))',
        border: '1px solid rgba(124,58,237,0.2)',
        borderRadius: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center'
      }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '1rem', color: 'var(--primary-light)' }}>
            About CalcHub
          </h1>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            We're building the Internet's most reliable, beautifully designed, and privacy-focused calculator platform.
          </p>
        </div>
      </div>

      <div className="space-y-8 text-muted leading-relaxed">
        <section className="card">
          <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
            <Calculator className="w-6 h-6 text-primary" /> Our Mission
          </h2>
          <p className="mb-4">
            Founded with the belief that financial, mathematical, and health calculations should be universally accessible, CalcHub aims to tear down the barriers to complex math. Whether you are trying to understand an amortization schedule for a 30-year mortgage, converting obscure metric units, or calculating compounding returns on a cryptocurrency portfolio, we want to give you the exact answer in seconds.
          </p>
          <p>
            For too long, online calculators have been plagued by popups, confusing interfaces, and slow loading times. Our mission is to modernize the web-calculator experience. We use state-of-the-art Web Technologies (like React and Vite) to ensure that every single digit you type instantly updates your charts, tables, and answers without waiting for a server reload.
          </p>
        </section>

        <section className="card border-l-4 border-l-success border-r-0 border-t-0 border-b-0 rounded-l-none">
          <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-success" /> Commitment to Privacy
          </h2>
          <p className="mb-4">
            The standard internet model is to harvest your data. When you type your salary, savings account balance, and credit card debt into an average calculator website, that data is often logged and sold to credit-card companies or mortgage brokers.
          </p>
          <p className="font-bold text-white mb-2">CalcHub is different by design.</p>
          <p>
            We process 100% of our mathematics client-side. That means the calculations happen directly on the silicon inside your phone or laptop. Your sensitive financial data never travels across the internet to our servers. Because of this architectural decision, we physically cannot see, store, or sell your personal data. You are entirely safe calculating your most sensitive financial plans here.
          </p>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
            <Zap className="w-6 h-6 text-warning" /> Mathematical Accuracy
          </h2>
          <p className="mb-4">
            A calculator is useless if it's wrong. Every single mathematical formula used on CalcHub has been rigorously verified against standard financial accounting methods, scientific formulas, and industry-standard practices.
          </p>
          <p>
            We openly display the formulas we use beneath our calculators so that students, professionals, and academics can audit our math. From standard geometric equations to complex continuous compound interest formulas (A = Pe^rt), we do not take shortcuts.
          </p>
        </section>
        
        <section className="card">
           <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
             <TrendingUp className="w-6 h-6 text-accent" /> Over 40+ Tools (and growing)
           </h2>
           <p className="mb-4">
             We currently support over 40 distinct calculators spanning Finance, Crypto, Health, Math, and General Conversion. But we aren't stopping there. We are committed to releasing new calculators consistently until we cover every niche, hobby, and profession on the internet.
           </p>
           <p>
             If you have a request for a tool we don't currently have, please reach out via our Contact page!
           </p>
        </section>
      </div>
    </div>
  );
}
