import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

export default function RefinanceCalculator() {
  const [currentBalance, setCurrentBalance] = useState(250000);
  const [currentRate, setCurrentRate] = useState(6.5);
  const [currentPayment, setCurrentPayment] = useState(1580);
  const [newRate, setNewRate] = useState(5.5);
  const [newTerm, setNewTerm] = useState(30);
  const [closingCosts, setClosingCosts] = useState(5000);

  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateRefinance();
  }, [currentBalance, currentRate, currentPayment, newRate, newTerm, closingCosts]);

  const calculateRefinance = () => {
    const r = newRate / 100 / 12;
    const n = newTerm * 12;
    
    if (r < 0 || n <= 0) return;

    let newMonthlyPayment;
    if (r === 0) {
      newMonthlyPayment = currentBalance / n;
    } else {
      newMonthlyPayment = (currentBalance * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    const monthlySavings = currentPayment - newMonthlyPayment;
    const breakEvenMonths = closingCosts / monthlySavings;

    setResult({
        newPayment: Math.round(newMonthlyPayment),
        monthlySavings: Math.round(monthlySavings),
        breakEvenMonths: Math.ceil(breakEvenMonths),
        totalNewCost: Math.round(newMonthlyPayment * n + closingCosts)
    });
  };

  return (
    <div className="container">
      <SEO 
        title="Mortgage Refinance Calculator – Should You Refinance?" 
        description="Calculate your potential savings from refinancing your mortgage. Find your break-even point and monthly savings instantly." 
        path="/finance/refinance-calculator"
      />
      
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8 px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-center">Mortgage Refinance Calculator</h1>
        
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="card shadow-lg border-2 border-primary-light">
            <h2 className="text-xl font-bold mb-6">Loan Comparison</h2>
            
            <div className="input-group">
              <label className="input-label">Remaining Balance ($)</label>
              <input type="number" className="input-field text-xl" value={currentBalance} onChange={e => setCurrentBalance(Number(e.target.value))} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="input-group">
                    <label className="input-label">Current Rate (%)</label>
                    <input type="number" step="0.1" className="input-field" value={currentRate} onChange={e => setCurrentRate(Number(e.target.value))} />
                </div>
                <div className="input-group">
                    <label className="input-label">Current Payment ($)</label>
                    <input type="number" className="input-field" value={currentPayment} onChange={e => setCurrentPayment(Number(e.target.value))} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="input-group">
                    <label className="input-label">New Rate (%)</label>
                    <input type="number" step="0.1" className="input-field border-primary" value={newRate} onChange={e => setNewRate(Number(e.target.value))} />
                </div>
                <div className="input-group">
                    <label className="input-label">New Term (Years)</label>
                    <input type="number" className="input-field border-primary" value={newTerm} onChange={e => setNewTerm(Number(e.target.value))} />
                </div>
            </div>

            <div className="input-group">
              <label className="input-label">Refinance Closing Costs ($)</label>
              <input type="number" className="input-field" value={closingCosts} onChange={e => setClosingCosts(Number(e.target.value))} />
            </div>
          </div>

          <div>
             <div className="card shadow-2xl bg-primary text-white sticky top-24 p-10 text-center">
                 <h2 className="text-xl font-bold mb-8 opacity-80 uppercase tracking-widest">Refinance Analysis</h2>
                 
                 {result && result.monthlySavings > 0 ? (
                    <div className="space-y-8">
                        <div className="p-8 bg-white bg-opacity-10 rounded-2xl border-2 border-white border-opacity-20 shadow-inner">
                            <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-70">Monthly Savings</p>
                            <p className="text-6xl font-black text-success-light">${result.monthlySavings.toLocaleString()}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                           <div className="p-4 bg-white bg-opacity-10 rounded-xl">
                              <p className="text-[10px] uppercase font-bold opacity-70 mb-1">New Payment</p>
                              <p className="text-2xl font-bold">${result.newPayment.toLocaleString()}/mo</p>
                           </div>
                           <div className="p-4 bg-white bg-opacity-10 rounded-xl">
                              <p className="text-[10px] uppercase font-bold opacity-70 mb-1">Break-Even</p>
                              <p className="text-2xl font-bold">{result.breakEvenMonths} Mos</p>
                           </div>
                        </div>
                    </div>
                 ) : result?.monthlySavings <= 0 ? (
                    <div className="py-20 text-red-100 font-bold leading-relaxed">
                        Refinancing would increase your monthly payment. Consider a shorter term or a lower rate.
                    </div>
                 ) : (
                    <div className="py-20 opacity-40">Calculating...</div>
                 )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
