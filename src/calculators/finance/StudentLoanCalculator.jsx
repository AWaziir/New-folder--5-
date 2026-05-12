import React, { useState, useEffect } from 'react';
import { GraduationCap } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

const REPAYMENT_PLANS = [
  { key: 'standard', label: 'Standard (10 years)', years: 10 },
  { key: 'extended', label: 'Extended (25 years)', years: 25 },
];

export default function StudentLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(30000);
  const [interestRate, setInterestRate] = useState(6.54);
  const [plan, setPlan] = useState('standard');
  const [graceMonths, setGraceMonths] = useState(6);
  const [extraPayment, setExtraPayment] = useState(0);
  const [result, setResult] = useState(null);

  useEffect(() => { calculate(); }, [loanAmount, interestRate, plan, graceMonths, extraPayment]);

  const calculate = () => {
    if (loanAmount <= 0) return;
    const years = plan === 'standard' ? 10 : 25;
    const months = years * 12;
    const monthlyRate = interestRate / 100 / 12;
    const graceInterest = loanAmount * monthlyRate * graceMonths;
    const principal = loanAmount + graceInterest;
    let monthlyPayment = monthlyRate === 0
      ? principal / months
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;

    let extraMonths = months;
    let extraInterestTotal = 0;
    if (extraPayment > 0) {
      let bal = principal; let mo = 0;
      while (bal > 0.01 && mo < 600) {
        const intCharge = bal * monthlyRate;
        bal -= Math.min(bal, monthlyPayment + extraPayment - intCharge);
        extraInterestTotal += intCharge;
        mo++;
      }
      extraMonths = mo;
    }

    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      graceInterest: graceInterest.toFixed(2),
      interestSaved: extraPayment > 0 ? (totalInterest - extraInterestTotal).toFixed(2) : '0',
      monthsSaved: months - extraMonths,
      payoffYears: Math.floor(months / 12),
      payoffMonths: months % 12,
    });
  };

  const inputs = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Total Loan Amount ($)</label>
        <input type="number" className="input-field text-xl font-black" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} />
      </div>
      <div className="input-group">
        <label className="input-label">Interest Rate (% per year)</label>
        <input type="number" step="0.01" className="input-field font-bold" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} />
        <p style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '0.25rem' }}>2024 Federal: Undergrad 6.53% | Grad 8.08%</p>
      </div>
      <div className="input-group">
        <label className="input-label">Repayment Plan</label>
        <select className="input-field" value={plan} onChange={e => setPlan(e.target.value)}>
          {REPAYMENT_PLANS.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="input-group">
          <label className="input-label">Grace Period (months)</label>
          <input type="number" className="input-field font-bold" value={graceMonths} onChange={e => setGraceMonths(Number(e.target.value))} />
        </div>
        <div className="input-group">
          <label className="input-label">Extra Monthly Payment ($)</label>
          <input type="number" className="input-field font-bold" value={extraPayment} onChange={e => setExtraPayment(Number(e.target.value))} />
        </div>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-5">
      {result ? (
        <>
          <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg,#245da215,#10b98110)', border: '1px solid #245da225', borderRadius: '1rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.5, marginBottom: '0.35rem' }}>Monthly Payment</p>
            <p style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a' }}>${Number(result.monthlyPayment).toLocaleString()}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Total Interest', val: `$${Number(result.totalInterest).toLocaleString()}`, color: '#ef4444' },
              { label: 'Total Repaid', val: `$${Number(result.totalPayment).toLocaleString()}`, color: '#0f172a' },
              { label: 'Grace Interest', val: `$${result.graceInterest}`, color: '#f59e0b' },
              { label: 'Payoff Time', val: `${result.payoffYears}y ${result.payoffMonths}m`, color: '#245da2' },
            ].map(item => (
              <div key={item.label} style={{ padding: '0.85rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <p style={{ fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '0.25rem' }}>{item.label}</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 900, color: item.color }}>{item.val}</p>
              </div>
            ))}
          </div>
          {extraPayment > 0 && Number(result.interestSaved) > 0 && (
            <div style={{ padding: '1rem 1.25rem', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '0.75rem' }}>
              <p style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: '#166534', marginBottom: '0.35rem' }}>💡 Extra Payment Savings</p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: '0.7rem', color: '#166534' }}>Interest Saved</p>
                  <p style={{ fontWeight: 900, fontSize: '1.1rem', color: '#14532d' }}>+${Number(result.interestSaved).toLocaleString()}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.7rem', color: '#166534' }}>Months Saved</p>
                  <p style={{ fontWeight: 900, fontSize: '1.1rem', color: '#14532d' }}>{result.monthsSaved} months</p>
                </div>
              </div>
            </div>
          )}
        </>
      ) : <div className="py-12 italic opacity-40 text-center">Enter loan details to calculate...</div>}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>This <strong>Student Loan Calculator</strong> helps you understand the true cost of education debt and explore payoff strategies. Enter your loan details to see monthly payments, total interest, and the impact of extra payments.</p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Grace Period:</strong> Most federal loans have a 6-month grace period after graduation. Interest still accrues on unsubsidized loans during this time.</li>
        <li><strong>Standard vs Extended:</strong> Standard plans (10 years) minimize total interest. Extended plans lower monthly payments but cost much more overall.</li>
        <li><strong>Extra Payments:</strong> Even $50 extra per month can save thousands in interest and shave years off your loan.</li>
      </ul>
    </div>
  );

  const formula = "M = P × [r(1+r)^n] / [(1+r)^n - 1]";

  const examples = [
    { title: "Average US Student Debt", description: "The average federal student loan debt is ~$37,000 at 6.54%. On the standard 10-year plan, this means $419/month and $13,280 total interest over the life of the loan." },
    { title: "Power of Extra Payments", description: "On a $30,000 loan at 6.54%, adding $100 extra/month reduces payoff from 10 to ~7.5 years and saves approximately $2,900 in interest." },
    { title: "Grace Period Impact", description: "A $30,000 unsubsidized loan at 6.54% accrues $981 in interest during a 6-month grace period — which capitalizes and increases your total debt before you even begin repayment." }
  ];

  const faqs = [
    { q: "What's the difference between subsidized and unsubsidized loans?", a: "With subsidized loans, the government pays the interest while you're in school. With unsubsidized loans, interest accrues from disbursement — making them more expensive long-term." },
    { q: "Should I pay off student loans or invest?", a: "If your rate is below 6–7%, historically investing in index funds outperforms. Above 7%, paying down debt first offers a guaranteed return equal to your interest rate." },
    { q: "Can I deduct student loan interest on my taxes?", a: "Yes — up to $2,500 of student loan interest may be deductible if your income is below $85,000 single ($170,000 married) in 2024." },
    { q: "What is income-driven repayment (IDR)?", a: "IDR plans cap monthly payments at 5–10% of discretionary income. After 10–25 years, remaining balances may be forgiven. Best for borrowers with high debt relative to income." }
  ];

  const whyUse = [
    { title: "Plan Your Repayment", text: "Compare standard and extended repayment plans to find the best fit for your income and goals." },
    { title: "Grace Period Cost", text: "See exactly how much interest accrues during your grace period — a hidden cost many borrowers miss." },
    { title: "Extra Payment Savings", text: "Discover how much time and interest extra monthly payments can eliminate from your loan." },
    { title: "Know Your Payoff Date", text: "Get a clear picture of exactly when you'll make your last student loan payment." }
  ];

  const keyFeatures = [
    { title: "Grace Period Modeling", text: "Accurately calculates interest accrual during the post-graduation grace period before payments begin." },
    { title: "Extra Payment Optimizer", text: "Real-time calculation of interest savings and months eliminated by paying extra each month." },
    { title: "Multiple Repayment Plans", text: "Instantly compare standard 10-year and extended 25-year repayment structures." }
  ];

  const proTips = [
    "Make interest-only payments during your grace period to prevent interest from capitalizing — it could save you hundreds.",
    "Refinancing federal loans into private loans can lower your rate but you lose access to income-driven repayment and forgiveness programs.",
    "Set up autopay — most federal loan servicers offer a 0.25% rate reduction for automatic payments.",
    "If pursuing Public Service Loan Forgiveness (PSLF), don't overpay — you could be leaving forgiveness money on the table.",
    "Consider biweekly half-payments instead of monthly payments — this equals one extra full payment per year."
  ];

  const relatedTools = [
    { name: "Loan Calculator", path: "/finance/loan-calculator" },
    { name: "Debt Payoff Calculator", path: "/finance/debt-payoff-calculator" },
    { name: "Salary Calculator", path: "/finance/salary-calculator" },
    { name: "Savings Calculator", path: "/finance/savings-calculator" }
  ];

  return (
    <CalculatorLayout
      title="Student Loan Calculator"
      seoTitle="Student Loan Calculator — Monthly Payments & Payoff Timeline 2024"
      description="Calculate your student loan monthly payments, total interest, and payoff date. See how extra payments can save thousands with our free student loan calculator."
      path="/finance/student-loan-calculator"
      icon={GraduationCap}
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
