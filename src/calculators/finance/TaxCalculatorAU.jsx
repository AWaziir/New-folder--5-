import React, { useState, useEffect } from 'react';
import { Briefcase } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function TaxCalculatorAU() {
  const [annualSalary, setAnnualSalary] = useState(85000);
  const [superRate, setSuperRate] = useState(11.5); // Current AU super rate
  const [includeSuper, setIncludeSuper] = useState(false);
  const [medicareLevy, setMedicareLevy] = useState(true);

  const [result, setResult] = useState(null);

  // Australian Tax Rates 2024-2025 (Stage 3 Tax Cuts)
  const calculateTax = () => {
    let taxableIncome = annualSalary;
    let superAmount = 0;

    if (includeSuper) {
        taxableIncome = annualSalary / (1 + superRate / 100);
        superAmount = annualSalary - taxableIncome;
    } else {
        superAmount = annualSalary * (superRate / 100);
    }

    let tax = 0;
    const income = taxableIncome;

    if (income <= 18200) {
        tax = 0;
    } else if (income <= 45000) {
        tax = (income - 18200) * 0.16;
    } else if (income <= 135000) {
        tax = 4288 + (income - 45000) * 0.30;
    } else if (income <= 190000) {
        tax = 31288 + (income - 135000) * 0.37;
    } else {
        tax = 51638 + (income - 190000) * 0.45;
    }

    const levyAmount = medicareLevy ? (taxableIncome * 0.02) : 0;
    const totalTax = tax + levyAmount;
    const takeHomePay = taxableIncome - totalTax;

    setResult({
        taxable: Math.round(taxableIncome),
        tax: Math.round(tax),
        super: Math.round(superAmount),
        levy: Math.round(levyAmount),
        totalTax: Math.round(totalTax),
        takeHome: Math.round(takeHomePay),
        monthly: Math.round(takeHomePay / 12),
        weekly: Math.round(takeHomePay / 52),
    });
  };

  useEffect(() => {
    calculateTax();
  }, [annualSalary, superRate, includeSuper, medicareLevy]);

  const inputs = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Annual Salary (Gross) ($)</label>
        <input type="number" className="input-field text-xl" value={annualSalary} onChange={e => setAnnualSalary(Number(e.target.value))} />
      </div>

      <div className="flex gap-4">
          <button 
            className={`flex-1 py-3 rounded-lg text-sm font-bold transition border-2 ${!includeSuper ? 'bg-primary text-white border-primary shadow-lg scale-105' : 'bg-secondary text-muted border-transparent'}`}
            onClick={() => setIncludeSuper(false)}
          >
              Excl. Super
          </button>
          <button 
             className={`flex-1 py-3 rounded-lg text-sm font-bold transition border-2 ${includeSuper ? 'bg-primary text-white border-primary shadow-lg scale-105' : 'bg-secondary text-muted border-transparent'}`}
             onClick={() => setIncludeSuper(true)}
          >
              Incl. Super
          </button>
      </div>

      <div className="input-group">
          <label className="input-label">Superannuation Rate (%)</label>
          <input type="number" step="0.1" className="input-field" value={superRate} onChange={e => setSuperRate(Number(e.target.value))} />
      </div>

      <label className="flex items-center gap-3 cursor-pointer p-4 bg-secondary rounded-xl group">
          <input type="checkbox" checked={medicareLevy} onChange={e => setMedicareLevy(e.target.checked)} className="w-5 h-5 accent-primary" />
          <span className="font-bold text-muted group-hover:text-primary transition">Include Medicare Levy (2.0%)</span>
      </label>
    </div>
  );

  const results = result ? (
    <div className="space-y-6">
      <div className="p-6 bg-primary-dark/30 rounded-xl text-center border border-primary/30">
        <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Total Annual Take-Home</p>
        <p className="text-5xl font-black text-white">${result.takeHome.toLocaleString()}</p>
        <p className="text-sm opacity-60 mt-2">${result.totalTax.toLocaleString()} Total Tax Paid</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white/5 rounded-lg text-center border-l-4 border-primary-light">
            <p className="text-xs uppercase font-bold opacity-70 mb-1">Monthly Pay</p>
            <p className="text-xl font-bold text-white">${result.monthly.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-white/5 rounded-lg text-center border-l-4 border-success">
            <p className="text-xs uppercase font-bold opacity-70 mb-1">Weekly Pay</p>
            <p className="text-xl font-bold text-success">${result.weekly.toLocaleString()}</p>
        </div>
      </div>

      <div className="pt-4 space-y-3">
         <div className="flex justify-between text-xs p-2 rounded bg-white/5">
             <span className="opacity-70">Taxable Income</span>
             <span className="font-bold">${result.taxable.toLocaleString()}</span>
         </div>
         <div className="flex justify-between text-xs p-2 rounded bg-white/5">
             <span className="opacity-70">Superannuation ({superRate}%)</span>
             <span className="font-bold">${result.super.toLocaleString()}</span>
         </div>
         <div className="flex justify-between text-xs p-2 rounded bg-white/5 text-red-300">
             <span>Income Tax (Stage 3)</span>
             <span className="font-bold">${result.tax.toLocaleString()}</span>
         </div>
      </div>
    </div>
  ) : (
    <div className="py-12 text-center opacity-40">Calculating your pay...</div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        Understand your actual earnings in Australia after tax and superannuation. Our AU Tax Calculator is fully updated for the 2024/25 financial year, including the latest <strong>Stage 3 Tax Cuts</strong>.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Salary Type:</strong> Choose whether your entered salary already includes superannuation or is "Plus Super".</li>
        <li><strong>Medicare Levy:</strong> Most Australians pay a 2% levy to fund public health. You can deselect this if you are exempt.</li>
        <li><strong>View Breakdown:</strong> See exactly how much goes to the ATO, how much to your super fund, and what ends up in your bank account weekly or monthly.</li>
      </ul>
    </div>
  );

  const examples = [
    {
      title: "Average AU Earner ($95,000)",
      description: "An Aussie earning $95k (Excl Super) will take home approximately $74,212 per year after paying $18,888 in income tax and a $1,900 Medicare levy."
    },
    {
      title: "High Earner ($250,000)",
      description: "A high earner on $250k will pay $78,638 in income tax and a $5,000 Medicare levy, resulting in a monthly take-home pay of around $13,864."
    }
  ];

  const faqs = [
    {
      q: "What are the Stage 3 Tax Cuts?",
      a: "Effective July 1, 2024, the government reduced the 19c rate to 16c and the 32.5c rate to 30c, while also increasing the thresholds. This means almost all Australian taxpayers now pay less tax than in previous years."
    },
    {
      q: "What is Superannuation Guarantee?",
      a: "This is the minimum percentage of your ordinary earnings that your employer must pay into your super fund. As of July 2024, the rate is 11.5%, and it will increase to 12% in July 2025."
    }
  ];

  return (
    <CalculatorLayout 
      title="Australia Income Tax Calculator"
      seoTitle="Australia Income Tax Calculator 2026 - Take House Pay"
      description="Calculate your take-home pay with our fast, free Australian income tax calculator. Includes 2024/25 Stage 3 tax cuts, Medicare Levy, and Superannuation estimates."
      path="/finance/tax-calculator-australia"
      icon={Briefcase}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula="Tax = Base + (Income - Bracket Start) × Rate %"
      examples={examples}
      faqs={faqs}
    />
  );
}
