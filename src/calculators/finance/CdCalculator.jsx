import React, { useState, useEffect } from 'react';
import { Banknote } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function CdCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [apy, setApy] = useState(5.0);
  const [term, setTerm] = useState(12);
  const [termUnit, setTermUnit] = useState('months');
  const [compounding, setCompounding] = useState('monthly');
  const [result, setResult] = useState(null);

  const compoundingMap = { daily: 365, monthly: 12, quarterly: 4, annually: 1 };

  useEffect(() => { calculate(); }, [principal, apy, term, termUnit, compounding]);

  const calculate = () => {
    if (principal <= 0 || apy < 0 || term <= 0) return;
    const n = compoundingMap[compounding];
    const r = apy / 100;
    const t = termUnit === 'months' ? term / 12 : term;
    const totalValue = principal * Math.pow(1 + r / n, n * t);
    const interest = totalValue - principal;
    const effectiveRate = (Math.pow(1 + r / n, n) - 1) * 100;
    setResult({
      totalValue: totalValue.toFixed(2),
      interest: interest.toFixed(2),
      effectiveRate: effectiveRate.toFixed(3),
      monthlyInterest: (interest / (t * 12)).toFixed(2),
    });
  };

  const inputs = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Initial Deposit ($)</label>
        <input type="number" className="input-field text-xl font-black" value={principal}
          onChange={e => setPrincipal(Number(e.target.value))} />
      </div>
      <div className="input-group">
        <label className="input-label">Annual Percentage Yield — APY (%)</label>
        <input type="number" step="0.01" className="input-field font-bold" value={apy}
          onChange={e => setApy(Number(e.target.value))} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="input-group">
          <label className="input-label">Term Length</label>
          <input type="number" className="input-field font-bold" value={term}
            onChange={e => setTerm(Number(e.target.value))} />
        </div>
        <div className="input-group">
          <label className="input-label">Term Unit</label>
          <select className="input-field" value={termUnit} onChange={e => setTermUnit(e.target.value)}>
            <option value="months">Months</option>
            <option value="years">Years</option>
          </select>
        </div>
      </div>
      <div className="input-group">
        <label className="input-label">Compounding Frequency</label>
        <select className="input-field" value={compounding} onChange={e => setCompounding(e.target.value)}>
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="annually">Annually</option>
        </select>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-5">
      {result ? (
        <>
          <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg,#245da215,#10b98110)', border: '1px solid #245da225', borderRadius: '1rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.5, marginBottom: '0.35rem' }}>Total Value at Maturity</p>
            <p style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a' }}>${Number(result.totalValue).toLocaleString()}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Interest Earned', val: `+$${Number(result.interest).toLocaleString()}`, color: '#10b981' },
              { label: 'Effective Rate', val: `${result.effectiveRate}%`, color: '#245da2' },
              { label: 'Original Deposit', val: `$${Number(principal).toLocaleString()}`, color: '#64748b' },
              { label: 'Monthly Interest', val: `$${result.monthlyInterest}`, color: '#8b5cf6' },
            ].map(item => (
              <div key={item.label} style={{ padding: '0.85rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <p style={{ fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '0.25rem' }}>{item.label}</p>
                <p style={{ fontSize: '1.15rem', fontWeight: 900, color: item.color }}>{item.val}</p>
              </div>
            ))}
          </div>
          {/* Deposit vs Interest Bar */}
          <div style={{ background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #e2e8f0', padding: '1rem' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>Principal vs Interest</p>
            <div style={{ display: 'flex', height: '10px', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{ width: `${(principal / Number(result.totalValue)) * 100}%`, background: '#245da2' }} />
              <div style={{ flex: 1, background: '#10b981' }} />
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.65rem', color: '#245da2', fontWeight: 700 }}>● Principal</span>
              <span style={{ fontSize: '0.65rem', color: '#10b981', fontWeight: 700 }}>● Interest Earned</span>
            </div>
          </div>
        </>
      ) : <div className="py-12 italic opacity-40 text-center">Enter deposit details to calculate...</div>}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>A <strong>Certificate of Deposit (CD)</strong> is a savings product offered by banks and credit unions that pays a fixed interest rate in exchange for leaving a lump sum deposit untouched for a specified term. CDs typically offer higher interest rates than regular savings accounts because you agree not to withdraw the funds early.</p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>APY vs APR:</strong> APY (Annual Percentage Yield) includes the effect of compounding — it's the true annual return. Always compare CDs using APY.</li>
        <li><strong>FDIC/NCUA Insured:</strong> US bank CDs are insured up to $250,000 per depositor per institution — making them virtually risk-free.</li>
        <li><strong>Early Withdrawal Penalty:</strong> Most CDs charge a penalty (typically 60–150 days of interest) if you withdraw before the maturity date.</li>
      </ul>
    </div>
  );

  const formula = "A = P × (1 + r/n)^(n×t)   where r = APY, n = compounding periods/year, t = years";

  const examples = [
    { title: "High-Yield 12-Month CD", description: "Depositing $10,000 in a 12-month CD at 5.0% APY (monthly compounding) yields $10,511.62 at maturity — earning $511.62 in guaranteed, FDIC-insured interest." },
    { title: "CD Ladder Strategy", description: "Instead of locking $20,000 in one 3-year CD, split it into four $5,000 CDs maturing at 6, 12, 18, and 24 months. This gives you liquidity every 6 months while capturing higher rates." },
    { title: "Comparing Compounding", description: "On a $50,000 deposit at 4.5% for 5 years: daily compounding yields $62,553 vs annual compounding at $62,315 — a difference of $238 purely from compounding frequency." }
  ];

  const faqs = [
    { q: "What happens when a CD matures?", a: "Most banks offer a short grace period (typically 7–10 days) to withdraw, renew, or transfer the funds. If you take no action, the CD usually auto-renews at the current rate." },
    { q: "Are CD rates negotiable?", a: "For large deposits ($100,000+, known as 'Jumbo CDs'), many institutions will negotiate rates. Standard CDs are fixed, but you can shop around for the best available APY." },
    { q: "Should I choose a longer or shorter CD term?", a: "If you believe interest rates will rise, stick to shorter terms (3–6 months) so you can reinvest at higher rates. If rates are expected to fall, lock in a longer term today." },
    { q: "How is CD interest taxed?", a: "CD interest is taxed as ordinary income in the year it's credited, even if you don't withdraw it. You'll receive a 1099-INT from your bank." }
  ];

  const whyUse = [
    { title: "Risk-Free Growth", text: "CDs are FDIC-insured up to $250,000, making them one of the safest investment vehicles available." },
    { title: "Compare CD Offers", text: "Instantly see how changing APY, term length, or compounding frequency affects your final return." },
    { title: "Plan Your CD Ladder", text: "Calculate multiple CDs at different terms to build a CD ladder strategy for regular liquidity." },
    { title: "Guaranteed Returns", text: "Unlike stocks or bonds, your CD return is fixed at purchase — no market risk whatsoever." }
  ];

  const keyFeatures = [
    { title: "Compounding Frequency", text: "Compare daily, monthly, quarterly, and annual compounding to see which maximizes your return." },
    { title: "Months or Years", text: "Enter your CD term in either months or years for flexible calculation of short and long-term CDs." },
    { title: "Effective Rate Display", text: "See the true annual effective rate (APY) after compounding — essential for comparing different offers." }
  ];

  const proTips = [
    "Always compare APY — not APR — when shopping for CDs. APY accounts for compounding and is the true annual return.",
    "Check your state's credit unions — they often offer 0.25–0.50% higher APY than national banks.",
    "Consider a CD ladder: split your deposit across 3, 6, 12, and 24-month CDs so you're never fully locked in.",
    "Check for 'no-penalty CD' options that let you withdraw early without fees — great if rates are rising.",
    "Remember that CD interest is taxable income. If you're in a high tax bracket, compare after-tax returns with municipal bonds."
  ];

  const relatedTools = [
    { name: "Savings Calculator", path: "/finance/savings-calculator" },
    { name: "Interest Calculator", path: "/finance/interest-calculator" },
    { name: "Investment Calculator", path: "/finance/investment-calculator" },
    { name: "Retirement Calculator", path: "/finance/retirement-calculator" }
  ];

  return (
    <CalculatorLayout
      title="CD Calculator"
      seoTitle="CD Calculator — Certificate of Deposit Return Estimator 2024"
      description="Calculate your Certificate of Deposit (CD) earnings with our free CD calculator. Compare APY, term lengths, and compounding frequencies to maximize your savings."
      path="/finance/cd-calculator"
      icon={Banknote}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
      whyUse={whyUse}
      keyFeatures={keyFeatures}
      proTips={proTips}
      relatedTools={relatedTools}
    />
  );
}
