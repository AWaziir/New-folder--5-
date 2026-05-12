import React, { useState, useEffect } from 'react';
import { Receipt } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

const BRACKETS_2024 = {
  single: [
    { min: 0, max: 11600, rate: 10 },
    { min: 11600, max: 47150, rate: 12 },
    { min: 47150, max: 100525, rate: 22 },
    { min: 100525, max: 191950, rate: 24 },
    { min: 191950, max: 243725, rate: 32 },
    { min: 243725, max: 609350, rate: 35 },
    { min: 609350, max: Infinity, rate: 37 },
  ],
  married: [
    { min: 0, max: 23200, rate: 10 },
    { min: 23200, max: 94300, rate: 12 },
    { min: 94300, max: 201050, rate: 22 },
    { min: 201050, max: 383900, rate: 24 },
    { min: 383900, max: 487450, rate: 32 },
    { min: 487450, max: 731200, rate: 35 },
    { min: 731200, max: Infinity, rate: 37 },
  ],
  hoh: [
    { min: 0, max: 16550, rate: 10 },
    { min: 16550, max: 63100, rate: 12 },
    { min: 63100, max: 100500, rate: 22 },
    { min: 100500, max: 191950, rate: 24 },
    { min: 191950, max: 243700, rate: 32 },
    { min: 243700, max: 609350, rate: 35 },
    { min: 609350, max: Infinity, rate: 37 },
  ],
};

const STANDARD_DEDUCTIONS = { single: 14600, married: 29200, hoh: 21900 };

function calcTax(income, brackets) {
  let tax = 0;
  for (const b of brackets) {
    if (income <= b.min) break;
    tax += (Math.min(income, b.max) - b.min) * (b.rate / 100);
  }
  return tax;
}

export default function IncomeTaxCalculator() {
  const [grossIncome, setGrossIncome] = useState(75000);
  const [filingStatus, setFilingStatus] = useState('single');
  const [additionalDeductions, setAdditionalDeductions] = useState(0);
  const [withholding, setWithholding] = useState(8000);
  const [result, setResult] = useState(null);

  useEffect(() => { calculate(); }, [grossIncome, filingStatus, additionalDeductions, withholding]);

  const calculate = () => {
    if (grossIncome <= 0) return;
    const stdDeduction = STANDARD_DEDUCTIONS[filingStatus];
    const totalDeductions = stdDeduction + Number(additionalDeductions);
    const taxableIncome = Math.max(0, grossIncome - totalDeductions);
    const brackets = BRACKETS_2024[filingStatus];
    const federalTax = calcTax(taxableIncome, brackets);
    const marginalRate = brackets.find(b => taxableIncome <= b.max)?.rate ?? 37;
    const effectiveRate = grossIncome > 0 ? (federalTax / grossIncome) * 100 : 0;
    const fica = Math.min(grossIncome, 168600) * 0.062 + grossIncome * 0.0145;
    const totalTax = federalTax + fica;
    const refundOrOwed = withholding - federalTax;

    setResult({
      taxableIncome: Math.round(taxableIncome),
      federalTax: Math.round(federalTax),
      fica: Math.round(fica),
      totalTax: Math.round(totalTax),
      effectiveRate: effectiveRate.toFixed(1),
      marginalRate,
      totalDeductions: Math.round(totalDeductions),
      netIncome: Math.round(grossIncome - totalTax),
      monthlyNet: Math.round((grossIncome - totalTax) / 12),
      refundOrOwed: Math.round(refundOrOwed),
    });
  };

  const inputs = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Annual Gross Income ($)</label>
        <input type="number" className="input-field text-xl font-black" value={grossIncome} onChange={e => setGrossIncome(Number(e.target.value))} />
      </div>
      <div className="input-group">
        <label className="input-label">Filing Status</label>
        <select className="input-field" value={filingStatus} onChange={e => setFilingStatus(e.target.value)}>
          <option value="single">Single</option>
          <option value="married">Married Filing Jointly</option>
          <option value="hoh">Head of Household</option>
        </select>
      </div>
      <div className="input-group">
        <label className="input-label">Additional Deductions ($)</label>
        <input type="number" className="input-field font-bold" value={additionalDeductions} onChange={e => setAdditionalDeductions(Number(e.target.value))} />
        <p style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '0.25rem' }}>Mortgage interest, charitable donations, etc. (beyond standard deduction)</p>
      </div>
      <div className="input-group">
        <label className="input-label">Total Tax Withheld (W-2 Box 2, $)</label>
        <input type="number" className="input-field font-bold" value={withholding} onChange={e => setWithholding(Number(e.target.value))} />
      </div>
    </div>
  );

  const results = (
    <div className="space-y-4">
      {result ? (
        <>
          <div style={{ padding: '1.25rem', background: 'linear-gradient(135deg,#245da215,#10b98110)', border: '1px solid #245da225', borderRadius: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <p style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.5 }}>Estimated Federal Tax</p>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#245da2', background: '#245da215', padding: '0.2rem 0.5rem', borderRadius: '99px' }}>{result.marginalRate}% Bracket</span>
            </div>
            <p style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a' }}>${result.federalTax.toLocaleString()}</p>
            <p style={{ fontSize: '0.7rem', color: '#64748b' }}>Effective Rate: {result.effectiveRate}%</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'FICA (SS + Medicare)', val: `$${result.fica.toLocaleString()}`, color: '#f59e0b' },
              { label: 'Total Tax Burden', val: `$${result.totalTax.toLocaleString()}`, color: '#ef4444' },
              { label: 'Taxable Income', val: `$${result.taxableIncome.toLocaleString()}`, color: '#0f172a' },
              { label: 'Total Deductions', val: `$${result.totalDeductions.toLocaleString()}`, color: '#10b981' },
              { label: 'Annual Net Income', val: `$${result.netIncome.toLocaleString()}`, color: '#245da2' },
              { label: 'Monthly Take-Home', val: `$${result.monthlyNet.toLocaleString()}`, color: '#8b5cf6' },
            ].map(item => (
              <div key={item.label} style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <p style={{ fontSize: '0.55rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '0.2rem' }}>{item.label}</p>
                <p style={{ fontSize: '1rem', fontWeight: 900, color: item.color }}>{item.val}</p>
              </div>
            ))}
          </div>
          <div style={{ padding: '1rem 1.25rem', background: result.refundOrOwed >= 0 ? '#f0fdf4' : '#fef2f2', border: `1px solid ${result.refundOrOwed >= 0 ? '#86efac' : '#fca5a5'}`, borderRadius: '0.75rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: result.refundOrOwed >= 0 ? '#166534' : '#991b1b', marginBottom: '0.25rem' }}>
              {result.refundOrOwed >= 0 ? '💚 Estimated Refund' : '🔴 Estimated Amount Owed'}
            </p>
            <p style={{ fontSize: '2rem', fontWeight: 900, color: result.refundOrOwed >= 0 ? '#14532d' : '#7f1d1d' }}>
              ${Math.abs(result.refundOrOwed).toLocaleString()}
            </p>
          </div>
        </>
      ) : <div className="py-12 italic opacity-40 text-center">Enter income details to calculate...</div>}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>This <strong>US Income Tax Estimator</strong> uses 2024 federal tax brackets to give you a quick estimate of your tax liability. It applies the standard deduction for your filing status, calculates your federal income tax bracket by bracket, and adds FICA taxes (Social Security + Medicare).</p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Standard Deduction 2024:</strong> Single $14,600 | Married Filing Jointly $29,200 | Head of Household $21,900.</li>
        <li><strong>FICA:</strong> 6.2% Social Security (on income up to $168,600) + 1.45% Medicare on all income.</li>
        <li><strong>This is an estimate only.</strong> It does not include state taxes, credits (Child Tax Credit, EITC), investment income, or self-employment tax. Consult a tax professional for exact figures.</li>
      </ul>
    </div>
  );

  const formula = "Federal Tax = Sum of (Taxable Income in each bracket × Bracket Rate)";

  const examples = [
    { title: "$75,000 Single Filer", description: "Gross $75,000 − $14,600 standard deduction = $60,400 taxable income. Federal tax: ~$9,114 (15.1% effective rate). Add FICA of ~$5,738. Total tax burden: ~$14,852. Monthly net take-home: ~$5,012." },
    { title: "Married Couple, $150,000", description: "Combined $150,000 − $29,200 deduction = $120,800 taxable. Federal tax: ~$18,848 (12.6% effective). FICA: ~$11,475. Monthly net: ~$9,973." },
  ];

  const faqs = [
    { q: "Does this include state income tax?", a: "No. State taxes vary from 0% (Texas, Florida, Nevada) to over 13% (California). Always add your state's rate for a complete picture." },
    { q: "What is the difference between marginal and effective tax rate?", a: "Your marginal rate is the rate applied to your LAST dollar of income (your tax bracket). Your effective rate is the average rate across all your income — always lower than the marginal rate due to lower bracket rates on earlier income." },
    { q: "Should I itemize or take the standard deduction?", a: "Take the standard deduction if your itemized deductions (mortgage interest, charitable donations, state taxes capped at $10,000) total less than $14,600 for a single filer. Most people take the standard deduction." },
    { q: "What are tax credits vs deductions?", a: "Deductions reduce your taxable income. Credits directly reduce your tax bill dollar-for-dollar. Credits are generally more valuable — a $1,000 credit saves $1,000 in tax, while a $1,000 deduction only saves $220 if you're in the 22% bracket." }
  ];

  const whyUse = [
    { title: "Pre-Filing Estimate", text: "Get a solid estimate of your tax liability before filing season to avoid surprises." },
    { title: "W-4 Adjustment", text: "If you're owed a large refund or owe a lot, use this to adjust your W-4 withholding." },
    { title: "Salary Negotiation", text: "Know your real take-home when evaluating job offers in different tax brackets." },
    { title: "Financial Planning", text: "Understand how bonuses, side income, or retirement contributions affect your tax bill." }
  ];

  const keyFeatures = [
    { title: "2024 Tax Brackets", text: "Uses the latest IRS inflation-adjusted tax brackets for the 2024 tax year." },
    { title: "Three Filing Statuses", text: "Supports Single, Married Filing Jointly, and Head of Household calculations." },
    { title: "Refund/Owed Estimate", text: "Enter your W-2 withholding to see if you're getting a refund or owe at tax time." }
  ];

  const proTips = [
    "Contribute to a 401k or Traditional IRA to reduce your taxable income dollar-for-dollar up to contribution limits.",
    "If you're self-employed, you pay 15.3% self-employment tax (both employee and employer FICA portions).",
    "The 'marriage penalty' or 'marriage bonus' depends on the income split — equal earners often pay more, unequal earners often pay less.",
    "Health Savings Account (HSA) contributions are triple tax-advantaged: tax-deductible, tax-free growth, tax-free withdrawals for medical expenses.",
    "Review your W-4 every year especially after major life events: marriage, divorce, new child, or salary change."
  ];

  const relatedTools = [
    { name: "Salary Calculator", path: "/finance/salary-calculator" },
    { name: "Tax Calculator (Australia)", path: "/finance/tax-calculator-australia" },
    { name: "GST Calculator", path: "/finance/gst-calculator" },
    { name: "Retirement Calculator", path: "/finance/retirement-calculator" }
  ];

  return (
    <CalculatorLayout
      title="Income Tax Calculator"
      seoTitle="Income Tax Calculator — 2024 US Federal Tax Estimator"
      description="Estimate your 2024 US federal income tax using official tax brackets. See your effective rate, marginal bracket, FICA taxes, and estimated refund or amount owed."
      path="/finance/income-tax-calculator"
      icon={Receipt}
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
