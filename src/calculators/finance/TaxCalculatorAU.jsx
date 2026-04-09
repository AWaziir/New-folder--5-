import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

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
        // If $85k includes super, we extract taxable income
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

  return (
    <div className="container">
      <SEO 
        title="Tax Calculator Australia 2026 – Free Income Tax Estimator" 
        description="Calculate your take-home pay with our fast, free Australian income tax calculator 2026. Includes 2026 Stage 3 tax cuts, Medicare Levy, and Superannuation." 
        path="/finance/tax-calculator-australia"
      />
      
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Tax Calculator Australia – 2024/25 Estimator</h1>
        <p className="text-muted mb-10 text-center max-width-2xl mx-auto">
            Find out exactly how much tax you pay in Australia. Calculate your monthly, weekly, and daily take-home pay with the latest tax rates.
        </p>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Inputs */}
          <div className="card shadow-lg border-2 border-primary-light">
            <h2 className="text-xl font-bold mb-6">Income Details</h2>
            
            <div className="input-group">
              <label className="input-label">Annual Salary (Gross) ($)</label>
              <input type="number" className="input-field text-xl" value={annualSalary} onChange={e => setAnnualSalary(Number(e.target.value))} />
            </div>

            <div className="flex gap-4 mb-6">
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

          {/* Results */}
          <div>
            <div className="card shadow-2xl highlight-border bg-primary-dark text-white sticky top-24">
              <h2 className="text-xl font-bold mb-8">Take-Home Pay Summary</h2>
              
              {result ? (
                <div className="space-y-6">
                  <div className="p-6 bg-white bg-opacity-10 rounded-xl text-center border-2 border-white border-opacity-20">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Total Annual Take-Home</p>
                    <p className="text-5xl font-black text-white">${result.takeHome.toLocaleString()}</p>
                    <p className="text-sm opacity-60 mt-2">${result.totalTax.toLocaleString()} Total Tax Paid</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white bg-opacity-10 rounded-lg text-center border-l-4 border-primary-light">
                        <p className="text-xs uppercase font-bold opacity-70 mb-1">Monthly Pay</p>
                        <p className="text-2xl font-bold text-white">${result.monthly.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-white bg-opacity-10 rounded-lg text-center border-l-4 border-success">
                        <p className="text-xs uppercase font-bold opacity-70 mb-1">Weekly Pay</p>
                        <p className="text-2xl font-bold text-success">${result.weekly.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="pt-4 space-y-3 opacity-80">
                     <div className="flex justify-between text-xs p-2 rounded bg-white bg-opacity-5">
                         <span>Taxable Income</span>
                         <span className="font-bold">${result.taxable.toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between text-xs p-2 rounded bg-white bg-opacity-5">
                         <span>Superannuation ({superRate}%)</span>
                         <span className="font-bold">${result.super.toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between text-xs p-2 rounded bg-white bg-opacity-5 text-red-300">
                         <span>Income Tax (Stage 3 Cuts)</span>
                         <span className="font-bold">${result.tax.toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between text-xs p-2 rounded bg-white bg-opacity-5 text-orange-200">
                         <span>Medicare Levy (2%)</span>
                         <span className="font-bold">${result.levy.toLocaleString()}</span>
                     </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center opacity-40 italic">
                  Calculating your pay...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SEO CONTENT SECTION */}
        <section className="mt-16 space-y-12">
            <div className="card">
                <h2 className="text-2xl font-bold mb-4 text-primary">How Much Tax Do I Pay in Australia?</h2>
                <p className="text-muted leading-relaxed">
                    Personal income tax in Australia is progressive, meaning the more you earn, the higher your tax rate. As of July 1, 2024, the Australian government implemented the <strong>Stage 3 Tax Cuts</strong>, which significantly reduced the tax brackets for middle-income earners. Our calculator is fully updated with these 2024/25 rates, allowing you to estimate your exact take-home pay, including superannuation and the medicare levy.
                </p>
            </div>

            <div className="card">
                <h2 className="text-2xl font-bold mb-4">Australian Tax Brackets 2024-25</h2>
                <div className="overflow-x-auto shadow-inner rounded-xl mt-6">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead className="bg-secondary text-primary uppercase font-bold text-xs">
                            <tr>
                                <th className="p-4 border-b border-border-color">Income Bracket</th>
                                <th className="p-4 border-b border-border-color">Tax Rate</th>
                            </tr>
                        </thead>
                        <tbody className="text-muted">
                            <tr className="border-b border-border-color">
                                <td className="p-4">$0 – $18,200</td>
                                <td className="p-4">Nil</td>
                            </tr>
                            <tr className="border-b border-border-color">
                                <td className="p-4">$18,201 – $45,000</td>
                                <td className="p-4">16c for each $1 over $18,200</td>
                            </tr>
                            <tr className="border-b border-border-color">
                                <td className="p-4">$45,001 – $135,000</td>
                                <td className="p-4">$4,288 plus 30c for each $1 over $45,000</td>
                            </tr>
                            <tr className="border-b border-border-color">
                                <td className="p-4">$135,001 – $190,000</td>
                                <td className="p-4">$31,288 plus 37c for each $1 over $135,000</td>
                            </tr>
                            <tr>
                                <td className="p-4">$190,001 and over</td>
                                <td className="p-4">$51,638 plus 45c for each $1 over $190,000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="card">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold text-lg mb-1">What is the Medicare Levy?</h3>
                        <p className="text-muted">The Medicare Levy is a 2% tax on taxable income that helps fund Australia's public health system. Some low-income earners are exempt or pay a reduced rate.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-1">Is Superannuation taxed?</h3>
                        <p className="text-muted">Employer super contributions are typically taxed at a flat rate of 15% within the fund, rather than at your personal income tax rate.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-1">How can I reduce my taxable income?</h3>
                        <p className="text-muted">You can often reduce your taxable income through work-related deductions, charitable donations, or salary sacrificing into your superannuation fund.</p>
                    </div>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
}
