import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

export default function MortgagePayoffCalculator() {
  const [balance, setBalance] = useState(300000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [yearsRemaining, setYearsRemaining] = useState(25);
  const [extraPayment, setExtraPayment] = useState(200);

  const [result, setResult] = useState(null);

  useEffect(() => {
    calculatePayoff();
  }, [balance, interestRate, yearsRemaining, extraPayment]);

  const calculatePayoff = () => {
    const r = interestRate / 100 / 12;
    const n = yearsRemaining * 12;
    
    // Normal Monthly Payment
    let M;
    if (r === 0) {
      M = balance / n;
    } else {
      M = (balance * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    const totalWithNoExtra = M * n;

    // Accelerated Monthly Payment
    const acceleratedM = M + extraPayment;
    
    // Avoid error if payment is less than interest
    if (r > 0 && acceleratedM <= balance * r) {
        setResult({ error: 'Monthly payment too low to pay off interest.' });
        return;
    }

    let newN;
    if (r === 0) {
      newN = balance / acceleratedM;
    } else {
      newN = -Math.log(1 - (balance * r) / acceleratedM) / Math.log(1 + r);
    }
    const totalWithExtra = acceleratedM * newN;

    setResult({
        normalPayment: Math.round(M),
        acceleratedMonths: Math.ceil(newN),
        monthsSaved: Math.round(n - newN),
        interestSaved: Math.round(totalWithNoExtra - totalWithExtra),
        totalPaid: Math.round(totalWithExtra)
    });
  };

  return (
    <div className="container">
      <SEO 
        title="Mortgage Payoff Calculator – Pay Off Your Home Faster" 
        description="Calculate how much time and interest you can save by making extra mortgage payments. Fast, free mortgage payoff planning tool." 
        path="/finance/mortgage-payoff"
      />
      
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8 px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-center">Mortgage Payoff Calculator</h1>
        
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="card shadow-lg border-2 border-primary-light">
            <h2 className="text-xl font-bold mb-6">Current Mortgage Details</h2>
            
            <div className="input-group">
              <label className="input-label">Current Balance ($)</label>
              <input type="number" className="input-field text-xl" value={balance} onChange={e => setBalance(Number(e.target.value))} />
            </div>

            <div className="flex gap-4">
                <div className="input-group flex-1">
                    <label className="input-label">Interest Rate (%)</label>
                    <input type="number" step="0.1" className="input-field" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} />
                </div>
                <div className="input-group flex-1">
                    <label className="input-label">Years Remaining</label>
                    <input type="number" className="input-field" value={yearsRemaining} onChange={e => setYearsRemaining(Number(e.target.value))} />
                </div>
            </div>

            <div className="input-group">
              <label className="input-label">Extra Monthly Payment ($)</label>
              <input type="number" className="input-field text-xl border-primary" value={extraPayment} onChange={e => setExtraPayment(Number(e.target.value))} />
            </div>
          </div>

          <div>
             <div className="card shadow-2xl bg-primary text-white sticky top-24 p-10 text-center">
                 <h2 className="text-xl font-bold mb-8 opacity-80 uppercase tracking-widest">Payoff Acceleration Summary</h2>
                 
                 {result && !result.error ? (
                    <div className="space-y-8">
                        <div className="p-8 bg-white bg-opacity-10 rounded-2xl border-2 border-white border-opacity-20">
                            <p className="text-sm font-bold opacity-60 mb-2 uppercase tracking-widest">Total Interest Saved!</p>
                            <p className="text-6xl font-black text-success-light">${result.interestSaved.toLocaleString()}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                           <div className="p-4 bg-white bg-opacity-10 rounded-xl">
                              <p className="text-[10px] uppercase font-bold opacity-70 mb-1">Time Saved</p>
                              <p className="text-2xl font-bold">{Math.floor(result.monthsSaved / 12)} yrs {result.monthsSaved % 12} mos</p>
                           </div>
                           <div className="p-4 bg-white bg-opacity-10 rounded-xl">
                              <p className="text-[10px] uppercase font-bold opacity-70 mb-1">New Payoff Term</p>
                              <p className="text-2xl font-bold">{Math.floor(result.acceleratedMonths / 12)} yrs {result.acceleratedMonths % 12} mos</p>
                           </div>
                        </div>
                        <p className="text-xs opacity-50">Standard payment: ${result.normalPayment.toLocaleString()}/mo</p>
                    </div>
                 ) : result?.error ? (
                    <div className="py-20 text-red-100 font-bold leading-relaxed">{result.error}</div>
                 ) : (
                    <div className="py-20 opacity-40">Calculating...</div>
                 )}
             </div>
          </div>
        </div>

        <section className="mt-16 space-y-12">
            <div className="card">
                <h2 className="text-2xl font-bold mb-4">The Power of Extra Mortgage Payments</h2>
                <p className="text-muted leading-relaxed">
                    Making even a small extra payment on your mortgage every month can save you tens of thousands of dollars in interest over the life of the loan. This is because every extra dollar you pay goes directly toward the principal balance, reducing the amount of interest that accrues in following months. This "accelerated payoff" strategy is one of the most effective ways to build home equity faster and reach debt-freedom earlier.
                </p>
            </div>
        </section>
      </div>
    </div>
  );
}
