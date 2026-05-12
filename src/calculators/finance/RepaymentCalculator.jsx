import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function RepaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState(25000);
  const [interestRate, setInterestRate] = useState(7.5);
  const [loanTerm, setLoanTerm] = useState(5);
  const [termUnit, setTermUnit] = useState('years');
  const [frequency, setFrequency] = useState('monthly');
  const [result, setResult] = useState(null);

  const frequencyMap = { weekly: 52, fortnightly: 26, monthly: 12 };

  useEffect(() => { calculate(); }, [loanAmount, interestRate, loanTerm, termUnit, frequency]);

  const calculate = () => {
    if (loanAmount <= 0) return;
    const periodsPerYear = frequencyMap[frequency];
    const totalPeriods = termUnit === 'years' ? loanTerm * periodsPerYear : Math.round(loanTerm * periodsPerYear / 12);
    const ratePerPeriod = interestRate / 100 / periodsPerYear;

    let payment;
    if (ratePerPeriod === 0) {
      payment = loanAmount / totalPeriods;
    } else {
      payment = (loanAmount * ratePerPeriod * Math.pow(1 + ratePerPeriod, totalPeriods)) /
        (Math.pow(1 + ratePerPeriod, totalPeriods) - 1);
    }

    const totalRepaid = payment * totalPeriods;
    const totalInterest = totalRepaid - loanAmount;
    const interestRatio = (totalInterest / totalRepaid) * 100;

    // Comparison: weekly vs monthly
    const monthlyPayment = (() => {
      const n = 12, t = termUnit === 'years' ? loanTerm * n : loanTerm;
      const r = interestRate / 100 / n;
      return r === 0 ? loanAmount / t : (loanAmount * r * Math.pow(1 + r, t)) / (Math.pow(1 + r, t) - 1);
    })();

    setResult({
      payment: payment.toFixed(2),
      totalRepaid: totalRepaid.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      interestRatio: interestRatio.toFixed(1),
      totalPeriods,
      frequency,
    });
  };

  const freqLabel = { weekly: 'week', fortnightly: 'fortnight', monthly: 'month' };

  const inputs = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Loan Amount ($)</label>
        <input type="number" className="input-field text-xl font-black" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} />
      </div>
      <div className="input-group">
        <label className="input-label">Interest Rate (% per year)</label>
        <input type="number" step="0.01" className="input-field font-bold" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="input-group">
          <label className="input-label">Loan Term</label>
          <input type="number" className="input-field font-bold" value={loanTerm} onChange={e => setLoanTerm(Number(e.target.value))} />
        </div>
        <div className="input-group">
          <label className="input-label">Term Unit</label>
          <select className="input-field" value={termUnit} onChange={e => setTermUnit(e.target.value)}>
            <option value="years">Years</option>
            <option value="months">Months</option>
          </select>
        </div>
      </div>
      <div className="input-group">
        <label className="input-label">Repayment Frequency</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {Object.keys(frequencyMap).map(f => (
            <button key={f}
              style={{ flex: 1, padding: '0.65rem 0.5rem', borderRadius: '0.6rem', fontWeight: 700, fontSize: '0.75rem', transition: 'all 0.2s', background: frequency === f ? '#245da2' : '#f1f5f9', color: frequency === f ? '#fff' : '#64748b', border: 'none', cursor: 'pointer', textTransform: 'capitalize' }}
              onClick={() => setFrequency(f)}>{f}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-5">
      {result ? (
        <>
          <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg,#245da215,#10b98110)', border: '1px solid #245da225', borderRadius: '1rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.5, marginBottom: '0.35rem' }}>{result.frequency.charAt(0).toUpperCase() + result.frequency.slice(1)} Repayment</p>
            <p style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a' }}>${Number(result.payment).toLocaleString()}</p>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>per {freqLabel[result.frequency]} × {result.totalPeriods} payments</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Total Repaid', val: `$${Number(result.totalRepaid).toLocaleString()}`, color: '#0f172a' },
              { label: 'Total Interest', val: `$${Number(result.totalInterest).toLocaleString()}`, color: '#ef4444' },
              { label: 'Principal', val: `$${loanAmount.toLocaleString()}`, color: '#245da2' },
              { label: 'Interest Ratio', val: `${result.interestRatio}%`, color: '#f59e0b' },
            ].map(item => (
              <div key={item.label} style={{ padding: '0.85rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <p style={{ fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '0.2rem' }}>{item.label}</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 900, color: item.color }}>{item.val}</p>
              </div>
            ))}
          </div>
          <div style={{ background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #e2e8f0', padding: '1rem' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>Principal vs Interest</p>
            <div style={{ display: 'flex', height: '10px', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{ width: `${100 - Number(result.interestRatio)}%`, background: '#245da2' }} />
              <div style={{ flex: 1, background: '#ef4444' }} />
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.4rem' }}>
              <span style={{ fontSize: '0.65rem', color: '#245da2', fontWeight: 700 }}>● Principal {(100 - Number(result.interestRatio)).toFixed(1)}%</span>
              <span style={{ fontSize: '0.65rem', color: '#ef4444', fontWeight: 700 }}>● Interest {result.interestRatio}%</span>
            </div>
          </div>
        </>
      ) : <div className="py-12 italic opacity-40 text-center">Enter loan details to calculate...</div>}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>Our <strong>Repayment Calculator</strong> helps you find your exact repayment amount for weekly, fortnightly, or monthly payment schedules. Choosing a higher frequency payment schedule (weekly or fortnightly instead of monthly) can significantly reduce the total interest paid over the life of a loan.</p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Weekly vs Monthly:</strong> Making weekly repayments of 1/4 of a monthly payment is equivalent to making 13 monthly payments per year (52 weeks ÷ 4 = 13) instead of 12 — accelerating payoff and reducing interest.</li>
        <li><strong>Fortnightly:</strong> 26 fortnightly payments ≈ 13 monthly payments per year — the same benefit as weekly but with fewer transactions.</li>
        <li><strong>Interest Rate:</strong> Enter the annual rate. The calculator divides it by the payment frequency to get the per-period rate.</li>
      </ul>
    </div>
  );

  const formula = "P = (r × PV) / (1 − (1+r)^(−n))   where r = rate per period, n = total periods";

  const examples = [
    { title: "Mortgage Weekly vs Monthly", description: "On a $400,000 mortgage at 6% over 30 years: monthly payments of $2,398/month ($863,280 total). Switching to weekly ($554/week) equals $864,384 paid but finishes ~2.5 years earlier saving ~$35,000 in interest." },
    { title: "Car Loan Fortnightly", description: "A $30,000 car loan at 7.5% over 5 years: monthly payment of $601. Fortnightly payment of $277. The extra annual payment equivalent saves ~$450 in interest and shortens the loan by ~2 months." }
  ];

  const faqs = [
    { q: "Does paying fortnightly really save money?", a: "Yes. Because interest is typically calculated daily, making payments more frequently means your outstanding balance reduces sooner, resulting in less interest accrued each period. You also make the equivalent of one extra monthly payment per year." },
    { q: "What is an amortizing loan?", a: "An amortizing loan has fixed regular payments where early payments are mostly interest and later payments are mostly principal. Our repayment calculator uses the standard amortization formula." },
    { q: "Can I switch between payment frequencies?", a: "Many lenders allow you to change payment frequency. Always check your loan agreement — some have restrictions or fees for changing repayment schedules." },
    { q: "What's better: extra payments or higher frequency?", a: "Extra payments (lump sum) reduce principal immediately and save the most interest. Higher frequency has a smaller but consistent effect. Both are effective strategies — combine them for maximum impact." }
  ];

  const whyUse = [
    { title: "Compare Payment Frequencies", text: "Instantly see how weekly, fortnightly, and monthly payments differ in total interest cost." },
    { title: "Loan Affordability", text: "Check if repayments fit your budget at different frequencies before committing to a loan." },
    { title: "Interest Savings", text: "Understand how choosing weekly over monthly payments can save hundreds or thousands in interest." },
    { title: "Any Loan Type", text: "Works for mortgages, car loans, personal loans, business loans — any amortizing loan structure." }
  ];

  const keyFeatures = [
    { title: "3 Payment Frequencies", text: "Compare weekly, fortnightly, and monthly repayment amounts with a single button toggle." },
    { title: "Interest Ratio Visual", text: "Color-coded bar shows what percentage of your total repayments is interest vs principal." },
    { title: "Flexible Terms", text: "Enter loan terms in either years or months — accommodating both mortgages and short-term loans." }
  ];

  const proTips = [
    "Make your first repayment on the same day as the loan is drawn — every day without a payment accrues interest.",
    "Even one extra payment per year can reduce a 30-year mortgage by 3–5 years depending on your rate.",
    "Offset accounts work differently from extra repayments — offset reduces the balance interest is calculated on without technically reducing the loan balance.",
    "Use your tax refund as a lump-sum payment against your mortgage — it immediately reduces the principal interest is calculated on.",
    "Always check if your loan has redraw facilities — this lets you access extra repayments if needed, giving flexibility while still saving interest."
  ];

  const relatedTools = [
    { name: "Loan Calculator", path: "/finance/loan-calculator" },
    { name: "Mortgage Calculator", path: "/finance/mortgage-calculator" },
    { name: "Debt Payoff Calculator", path: "/finance/debt-payoff-calculator" },
    { name: "Interest Calculator", path: "/finance/interest-calculator" }
  ];

  return (
    <CalculatorLayout
      title="Repayment Calculator"
      seoTitle="Repayment Calculator — Weekly, Fortnightly & Monthly Loan Repayments"
      description="Calculate loan repayments for any frequency: weekly, fortnightly, or monthly. Compare total interest costs and find your most affordable payment schedule."
      path="/finance/repayment-calculator"
      icon={RefreshCw}
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
