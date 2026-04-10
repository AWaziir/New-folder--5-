import React from 'react';
import SEO from '../components/SEO';
import { Scale, FileText, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="container" style={{ maxWidth: '800px', marginBottom: '4rem' }}>
      <SEO
        title="Terms of Service"
        description="Terms of Service and Conditions of Use for CalcPro.com.au. Read our policies regarding the use of our calculators."
        path="/terms-of-service"
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
            Terms of Service
          </h1>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            Please read these terms and conditions carefully before using CalcPro.com.au.
          </p>
          <p style={{ marginTop: '1rem', fontSize: '0.82rem', color: 'var(--text-faint)' }}>
            Last updated: April 2026
          </p>
        </div>
      </div>

      <div className="space-y-8 text-muted leading-relaxed">
        
        <section className="card">
          <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" /> 1. Agreement to Terms
          </h2>
          <p>
            By accessing or using CalcPro.com.au (the "Service"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the Service. These Terms apply to all visitors, users, and others who access or use the Service.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" /> 2. Educational & Informational Purposes Only
          </h2>
          <p className="mb-4">
            <strong>Not Financial or Medical Advice:</strong> All calculators, tools, charts, and information provided by CalcPro.com.au are intended solely for educational, informational, and general calculation purposes.
          </p>
          <ul className="list-disc list-inside space-y-2 ml-2">
             <li><strong>Financial Calculators:</strong> The results provided do not constitute official financial, tax, investment, or legal advice. You should consult a certified financial planner or CPA before making real monetary decisions.</li>
             <li><strong>Health & Fitness Calculators:</strong> Information provided (such as BMI, Body Fat, or Caloric Needs) should not be interpreted as professional medical advice, diagnosis, or treatment. Always consult a physician or qualified healthcare provider regarding your physical health.</li>
          </ul>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-accent" /> 3. Limitation of Liability
          </h2>
          <p>
            CalcPro.com.au and its developers make every effort to ensure the mathematical formulas and data used on this site are accurate and reliable. However, the Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, regarding the accuracy, completeness, or reliability of the results.
          </p>
          <p className="mt-4">
            Under no circumstances shall CalcPro.com.au, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-success" /> 4. Intellectual Property
          </h2>
          <p>
            The Service and its original content (excluding content provided by third-party APIs such as CoinGecko), features, styling, and functionality are and will remain the exclusive property of CalcPro.com.au and its licensors. The Service is protected by copyright, trademark, and other laws of both the local jurisdiction and foreign countries.
            Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of CalcPro.com.au.
          </p>
        </section>

        <section className="card">
           <h2 className="text-xl font-bold mb-4 text-white">5. Governing Law</h2>
           <p>
             These Terms shall be governed and construed in accordance with standard international law, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
           </p>
        </section>

        <section className="card">
           <h2 className="text-xl font-bold mb-4 text-white">6. Contact Us</h2>
           <p>
             If you have any questions about these Terms, please contact us via the Contact page.
           </p>
        </section>

      </div>
    </div>
  );
}
