import React from 'react';
import SEO from '../components/SEO';

const SECTIONS = [
  {
    icon: '🔒',
    title: 'Information We Collect',
    content: `CalcPro.com.au does not collect, store, or transmit any personal information to our servers. All calculations are performed entirely within your browser using client-side JavaScript.

We do not require you to create an account, log in, or provide any personal details to use any calculator on this platform.

The only data we may collect is standard, anonymous web analytics such as page views and session duration, collected through privacy-respecting analytics tools. This data is aggregated, never tied to an individual, and is used solely to improve the site.`,
  },
  {
    icon: '🖥️',
    title: 'How Your Data Is Used',
    content: `Since CalcPro.com.au processes all calculations locally in your browser:

• Financial figures you enter (salary, investment amounts, mortgage values, etc.) never leave your device
• Health metrics you enter (weight, height, age) are processed locally and immediately discarded
• Cryptocurrency trade data you enter is computed in-browser and not transmitted anywhere

Anonymous analytics data (if collected) may be used to understand which calculators are most popular and how to improve the user experience.`,
  },
  {
    icon: '🍪',
    title: 'Cookies & Local Storage',
    content: `CalcPro.com.au may use browser localStorage to remember your calculator preferences or last-used values to improve your experience across sessions. This data remains on your device and is never sent to us.

We may use minimal cookies for analytics purposes. You can disable cookies at any time through your browser settings. Disabling cookies will not affect the core functionality of any calculator.`,
  },
  {
    icon: '🤝',
    title: 'Third-Party Services',
    content: `CalcPro.com.au may use the following third-party services:

• CoinGecko API — Used by the Crypto Profit Calculator to fetch real-time cryptocurrency prices. When this feature is used, your browser makes a direct request to CoinGecko's public API. No personal data is included in this request. Please review CoinGecko's Privacy Policy at coingecko.com.

• Google Fonts — Used to serve typography assets. Google may log font request metadata per their privacy policy.

• Analytics — We may use aggregated, anonymised analytics tools that do not store personal identifiers or IP addresses.`,
  },
  {
    icon: '📢',
    title: 'Advertising',
    content: `CalcPro.com.au is a free service supported by advertising. We may display ads served by third-party ad networks. These networks may use cookies to serve ads relevant to your interests.

You can opt out of personalised advertising through your browser settings or by visiting the Network Advertising Initiative opt-out page.

We do not sell your personal information to advertisers.`,
  },
  {
    icon: '🔗',
    title: 'External Links',
    content: `Our site may contain links to external websites. We are not responsible for the privacy practices of those sites. We encourage you to review the privacy policy of any external site you visit.`,
  },
  {
    icon: '👶',
    title: "Children's Privacy",
    content: `CalcPro.com.au is not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with information, please contact us immediately.`,
  },
  {
    icon: '🔄',
    title: 'Changes to This Policy',
    content: `We may update this Privacy Policy periodically. Any changes will be reflected on this page with an updated date. We encourage you to review this page regularly. Your continued use of CalcPro.com.au after any changes constitutes your acceptance of the updated policy.`,
  },
  {
    icon: '📬',
    title: 'Contact Us',
    content: `If you have any questions about this Privacy Policy or how CalcPro.com.au handles data, please reach out to us via our Contact page. We are happy to answer any questions regarding your privacy.`,
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <SEO
        title="Privacy Policy - Your Data is Safe With CalcPro"
        description="CalcPro.com.au's Privacy Policy. We don't collect or store your personal data. All calculations run privately in your browser."
        path="/privacy-policy"
      />

      {/* Hero */}
      <div style={{
        margin: '2.5rem 0 2.5rem',
        padding: '2.5rem',
        background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(6,182,212,0.06))',
        border: '1px solid rgba(124,58,237,0.2)',
        borderRadius: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.9rem', background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: '1.25rem' }}>
            🔒 Your Privacy Matters
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '0.75rem' }}>Privacy Policy</h1>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '520px' }}>
            CalcPro.com.au is built on a simple principle: <strong style={{ color: 'var(--text-secondary)' }}>your financial data stays on your device</strong>. All calculations run entirely in your browser. We don't want your data, so we don't collect it.
          </p>
          <p style={{ marginTop: '1rem', fontSize: '0.82rem', color: 'var(--text-faint)' }}>
            Last updated: April 2026
          </p>
        </div>
      </div>

      {/* Summary badges */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '2.5rem' }}>
        {[
          { icon: '✅', text: 'No account required' },
          { icon: '🚫', text: 'No personal data sold' },
          { icon: '🖥️', text: 'In-browser calculations' },
          { icon: '📊', text: 'Anonymous analytics only' },
        ].map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.75rem 1rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '0.75rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            <span style={{ fontSize: '1.1rem' }}>{b.icon}</span> {b.text}
          </div>
        ))}
      </div>

      {/* Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border-color)', borderRadius: '1.25rem', overflow: 'hidden', marginBottom: '3rem' }}>
        {SECTIONS.map((s, i) => (
          <div key={i} style={{ background: 'var(--bg-card)', padding: '1.75rem 2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.3rem' }}>{s.icon}</span>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>{s.title}</h2>
            </div>
            <div style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.9rem', whiteSpace: 'pre-line' }}>
              {s.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
