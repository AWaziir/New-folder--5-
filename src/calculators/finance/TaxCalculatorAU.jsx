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
        <label className="input-label">Annual Gross Income ($)</label>
        <input type="number" className="input-field text-xl font-black" value={annualSalary} onChange={e => setAnnualSalary(Number(e.target.value))} />
      </div>

      <div className="flex bg-slate-100 p-1 rounded-lg">
          <button 
            className={`flex-1 py-3 rounded-md font-bold transition ${!includeSuper ? 'bg-primary text-white shadow-md' : 'text-muted'}`}
            onClick={() => setIncludeSuper(false)}
          >
              Excl. Super
          </button>
          <button 
             className={`flex-1 py-3 rounded-md font-bold transition ${includeSuper ? 'bg-primary text-white shadow-md' : 'text-muted'}`}
             onClick={() => setIncludeSuper(true)}
          >
              Incl. Super
          </button>
      </div>

      <div className="input-group">
          <label className="input-label">Super Rate (%)</label>
          <input type="number" step="0.1" className="input-field font-bold" value={superRate} onChange={e => setSuperRate(Number(e.target.value))} />
      </div>

      <label className="flex items-center gap-3 cursor-pointer p-4 bg-slate-50 rounded-2xl border border-slate-200 group">
          <input type="checkbox" checked={medicareLevy} onChange={e => setMedicareLevy(e.target.checked)} className="w-5 h-5 accent-primary" />
          <span className="font-bold text-xs uppercase tracking-widest text-muted group-hover:text-slate-900 transition">Include Medicare Levy (2.0%)</span>
      </label>
    </div>
  );

  const results = (
    <div className="space-y-6 text-center">
      {result ? (
        <div className="space-y-6">
          <div className="p-10 bg-primary/5 rounded-2xl border border-primary/20 shadow-inner group transition-all">
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-2">Total Take-Home Pay</p>
            <p className="text-5xl font-black text-slate-900 group-hover:scale-105 transition-transform">
                ${result.takeHome.toLocaleString()}
            </p>
            <p className="text-xs font-bold uppercase tracking-widest opacity-40 mt-2">Annual Net Income</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60">Weekly</p>
                <p className="text-xl font-black text-slate-900">${result.weekly.toLocaleString()}</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60">Monthly</p>
                <p className="text-xl font-black text-slate-900">${result.monthly.toLocaleString()}</p>
            </div>
          </div>

          <div className="pt-4 space-y-2">
             <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest p-3 rounded-xl bg-slate-50 border border-slate-100">
                 <span className="opacity-40">Taxable Income</span>
                 <span className="text-slate-900">${result.taxable.toLocaleString()}</span>
             </div>
             <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest p-3 rounded-xl bg-slate-50 border border-slate-100">
                 <span className="opacity-40">Employer Super ({superRate}%)</span>
                 <span className="text-slate-900">${result.super.toLocaleString()}</span>
             </div>
             <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600">
                 <span>Annual Income Tax</span>
                 <span className="font-black">-${result.totalTax.toLocaleString()}</span>
             </div>
          </div>
        </div>
      ) : (
        <div className="py-12 italic opacity-40 text-center">Calculate your Australian tax...</div>
      )}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        Plan your financial life in Australia with precision. Our Income Tax Calculator is updated for the 2024-2025 financial year, incorporating the landmark <strong>Stage 3 Tax Cuts</strong> and current Superannuation Guarantee rates.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Salary Type:</strong> Specify if your package is "plus super" or "inclusive of super" to ensure accurate taxable income.</li>
        <li><strong>Medicare Levy:</strong> Generally 2% of your taxable income, used to fund public healthcare in Australia.</li>
        <li><strong>Stage 3 Cuts:</strong> We automatically apply the updated tax brackets effective from July 1, 2024.</li>
      </ul>
    </div>
  );

  const formula = "Tax = Bracket Base + (Income - Floor) × Marginal Rate";

  const examples = [
    {
      title: "Average AU Worker ($95k)",
      description: "With the Stage 3 cuts, a person on $95,000 (excluding super) will take home approximately $74,212 per year after paying $20,788 in total tax/levies."
    },
    {
      title: "High Income Earner ($180k)",
      description: "An Aussie on $180,000 will pay roughly $47,938 in income tax and a $3,600 Medicare Levy, resulting in $128,462 net."
    }
  ];

  const faqs = [
    {
      q: "What are the latest tax brackets?",
      a: "From July 2024, the 19% rate dropped to 16%, and the 32.5% rate dropped to 30%. The 37% bracket now starts at $135,001 instead of $120,001."
    },
    {
      q: "What is Superannuation Guarantee?",
      a: "As of July 2024, the mandatory employer contribution rate is 11.5%. It is scheduled to reach 12% in July 2025."
    }
  ];

  return (
    <CalculatorLayout 
      title="AU Tax"
      seoTitle="Australia Income Tax Calculator 2024-2025 - Take Home Pay"
      description="Calculate your take-home pay with our updated Australian income tax calculator. Includes Stage 3 tax cuts, Medicare Levy, and Superannuation estimates."
      path="/finance/tax-calculator-australia"
      icon={Briefcase}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
    />
  );
}
