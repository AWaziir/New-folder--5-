import React, { useState } from 'react';
import SEO from '../components/SEO';

const TOPICS = [
  'General Question',
  'Bug Report',
  'Feature Request',
  'Calculator Error / Inaccuracy',
  'Privacy Concern',
  'Partnership / Advertising',
  'Other',
];

export default function ContactUs() {
  const [form, setForm]       = useState({ name: '', email: '', topic: TOPICS[0], message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors]   = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())     e.name    = 'Name is required.';
    if (!form.email.trim())    e.email   = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.';
    if (!form.message.trim())  e.message = 'Message is required.';
    else if (form.message.trim().length < 20) e.message = 'Message must be at least 20 characters.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
  };

  const update = (field, val) => {
    setForm(f => ({ ...f, [field]: val }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
  };

  return (
    <div className="container" style={{ maxWidth: '820px' }}>
      <SEO
        title="Contact Us"
        description="Get in touch with the CalcHub team. Report bugs, request features, or ask any question about our free online calculators."
        path="/contact"
      />

      {/* Header */}
      <div style={{ margin: '2.5rem 0 2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.9rem', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#67e8f9', marginBottom: '1.25rem' }}>
          💬 We reply within 48 hours
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '0.75rem' }}>Contact Us</h1>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '500px' }}>
          Have a question, found a bug, or want to suggest a new calculator? We'd love to hear from you.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginBottom: '3rem' }}>

        {/* ─ Form ─ */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '1.25rem', padding: '2rem' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '1.25rem' }}>✅</div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Message Sent!</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Thanks, <strong style={{ color: 'var(--text-secondary)' }}>{form.name}</strong>! We've received your message and will get back to you at <strong style={{ color: 'var(--text-secondary)' }}>{form.email}</strong> within 48 hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', topic: TOPICS[0], message: '' }); }}
                style={{
                  padding: '0.7rem 1.5rem', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)',
                  borderRadius: '0.65rem', color: '#67e8f9', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.9rem',
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Send a Message</h2>

              {/* Name */}
              <FormField label="Your Name" error={errors.name}>
                <input
                  type="text" className="input-field" placeholder="e.g. John Smith"
                  value={form.name} onChange={e => update('name', e.target.value)}
                  style={errors.name ? { borderColor: 'rgba(239,68,68,0.6)' } : {}}
                />
              </FormField>

              {/* Email */}
              <FormField label="Email Address" error={errors.email}>
                <input
                  type="email" className="input-field" placeholder="you@example.com"
                  value={form.email} onChange={e => update('email', e.target.value)}
                  style={errors.email ? { borderColor: 'rgba(239,68,68,0.6)' } : {}}
                />
              </FormField>

              {/* Topic */}
              <FormField label="Topic">
                <select className="input-field" value={form.topic} onChange={e => update('topic', e.target.value)}>
                  {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </FormField>

              {/* Message */}
              <FormField label="Message" error={errors.message}>
                <textarea
                  className="input-field"
                  placeholder="Please describe your question or issue in detail…"
                  value={form.message}
                  onChange={e => update('message', e.target.value)}
                  rows={5}
                  style={{
                    resize: 'vertical', minHeight: '120px',
                    ...(errors.message ? { borderColor: 'rgba(239,68,68,0.6)' } : {}),
                  }}
                />
              </FormField>

              <button
                type="submit"
                style={{
                  width: '100%', padding: '0.85rem',
                  background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                  border: 'none', borderRadius: '0.75rem', color: 'white',
                  fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'inherit',
                  boxShadow: '0 4px 15px rgba(124,58,237,0.35)', marginTop: '0.5rem',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Send Message →
              </button>
            </form>
          )}
        </div>

        {/* ─ Info Panel ─ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Info cards */}
          {[
            {
              icon: '🐛',
              title: 'Found a Bug?',
              desc: 'If a calculator is producing incorrect results, please let us know the inputs you used and what you expected. Screenshots are very helpful.',
              color: '#f87171',
            },
            {
              icon: '💡',
              title: 'Feature Request',
              desc: "Don't see the calculator you need? Tell us what you'd like to see and we'll consider adding it to CalcHub.",
              color: '#fbbf24',
            },
            {
              icon: '📊',
              title: 'Calculator Accuracy',
              desc: 'All our calculators are reviewed for mathematical accuracy. If you find a discrepancy, please share the details and we\'ll investigate quickly.',
              color: '#6ee7b7',
            },
            {
              icon: '🤝',
              title: 'Partnerships',
              desc: 'Interested in advertising or partnering with CalcHub? Select "Partnership / Advertising" in the topic dropdown and send us a message.',
              color: '#a78bfa',
            },
          ].map((c, i) => (
            <div key={i} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-color)',
              borderRadius: '1rem', padding: '1.25rem',
              display: 'flex', gap: '0.85rem', alignItems: 'flex-start',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = `${c.color}35`}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
            >
              <div style={{
                width: '2.25rem', height: '2.25rem', flexShrink: 0, borderRadius: '0.5rem',
                background: `${c.color}15`, border: `1px solid ${c.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem',
              }}>{c.icon}</div>
              <div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.3rem', color: 'var(--text-main)' }}>{c.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{c.desc}</p>
              </div>
            </div>
          ))}

          {/* Response time note */}
          <div style={{
            background: 'rgba(6,182,212,0.07)', border: '1px solid rgba(6,182,212,0.18)',
            borderRadius: '0.85rem', padding: '1rem 1.25rem',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
          }}>
            <span style={{ fontSize: '1.3rem' }}>⏱️</span>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              We typically respond within <strong style={{ color: '#67e8f9' }}>24–48 hours</strong> on business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, error, children }) {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      {children}
      {error && (
        <p style={{ color: '#f87171', fontSize: '0.78rem', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {error}
        </p>
      )}
    </div>
  );
}
