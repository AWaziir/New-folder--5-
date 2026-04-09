import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

export default function RentCalculator() {
  const [grossIncome, setGrossIncome] = useState(60000);
  const [debts, setDebts] = useState(500);
  const [percentage, setPercentage] = useState(30);

  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateRent();
  }, [grossIncome, debts, percentage]);

  const calculateRent = () => {
    const monthlyGross = grossIncome / 12;
    const maxRent = (monthlyGross * (percentage / 100));
    
    setResult({
        maxRent: Math.round(maxRent),
        remaining: Math.round(monthlyGross - maxRent - debts)
    });
  };

  return (
    <div className="container">
      <SEO 
        title="Rent Calculator – How Much Rent Can I Afford?" 
        description="Calculate your affordable monthly rent based on your annual income and the 30% rule. Free tool for renters and house hunters." 
        path="/finance/rent-calculator"
      />
      
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8 px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-center">Rent Affordability Calculator</h1>
        
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="card shadow-lg border-2 border-primary-light">
            <h2 className="text-xl font-bold mb-6">Financial Inputs</h2>
            
            <div className="input-group">
              <label className="input-label">Annual Gross Income ($)</label>
              <input type="number" className="input-field text-xl" value={grossIncome} onChange={e => setGrossIncome(Number(e.target.value))} />
            </div>

            <div className="input-group">
              <label className="input-label">Monthly Debt Payments ($)</label>
              <input type="number" className="input-field text-xl" value={debts} onChange={e => setDebts(Number(e.target.value))} />
              <p className="text-xs text-muted mt-1">Car loans, student loans, credit cards, etc.</p>
            </div>

            <div className="input-group">
                <label className="input-label">Income Percentage for Rent (%)</label>
                <div className="flex gap-4 mb-4">
                    {[25, 30, 35].map(p => (
                        <button 
                          key={p}
                          onClick={() => setPercentage(p)}
                          className={`flex-1 py-2 rounded-lg font-bold border-2 transition ${percentage === p ? 'bg-primary text-white border-primary shadow-md' : 'bg-secondary text-muted border-transparent'}`}
                        >
                            {p}%
                        </button>
                    ))}
                </div>
                <input type="range" min="10" max="50" step="1" className="w-full accent-primary" value={percentage} onChange={e => setPercentage(Number(e.target.value))} />
            </div>
          </div>

          <div>
            <div className="card shadow-2xl highlight-border bg-primary text-white sticky top-24 text-center p-10">
              <h2 className="text-xl font-bold mb-8 opacity-80">Your Affordable Rent</h2>
              
              {result ? (
                <div className="space-y-8">
                  <div className="p-8 bg-white bg-opacity-10 rounded-2xl border-2 border-white border-opacity-20">
                    <p className="text-6xl font-black">${result.maxRent.toLocaleString()}</p>
                    <p className="text-sm font-bold opacity-60 uppercase tracking-widest mt-2">Maximum Per Month</p>
                  </div>
                  
                  <div className="p-4 bg-white bg-opacity-10 rounded-xl">
                      <p className="text-[10px] uppercase font-bold opacity-70 mb-1">Estimated Leftover Monthly</p>
                      <p className="text-2xl font-bold">${result.remaining.toLocaleString()}</p>
                      <p className="text-[10px] opacity-50 mt-1">(After Rent and Debt)</p>
                  </div>
                </div>
              ) : (
                <div className="py-12 opacity-40">Calculating...</div>
              )}
            </div>
          </div>
        </div>

        <section className="mt-16 space-y-12">
            <div className="card">
                <h2 className="text-2xl font-bold mb-4">How Much Should I Spend on Rent?</h2>
                <p className="text-muted leading-relaxed">
                    A common rule of thumb is the <strong>30% rule</strong>, which suggests that your monthly rent should not exceed 30% of your gross monthly income. This is a standard used by many landlords and property managers to determine if a tenant can afford an apartment. However, if you have significant debt, you may want to aim lower (25%) to ensure you have enough for savings and other expenses.
                </p>
            </div>
        </section>
      </div>
    </div>
  );
}
