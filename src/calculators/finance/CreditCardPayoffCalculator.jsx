import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

export default function CreditCardPayoffCalculator() {
  const [balance, setBalance] = useState(5000);
  const [interestRate, setInterestRate] = useState(19.99);
  const [targetType, setTargetType] = useState('monthly'); // monthly or time
  const [targetValue, setTargetValue] = useState(250); // monthly payment or months to payoff

  const [result, setResult] = useState(null);

  useEffect(() => {
    calculatePayoff();
  }, [balance, interestRate, targetType, targetValue]);

  const calculatePayoff = () => {
    const r = interestRate / 100 / 12;
    if (balance <= 0 || r < 0) return;

    if (targetType === 'monthly') {
      const monthlyPayment = targetValue;
      if (monthlyPayment <= balance * r) {
        setResult({ error: 'Monthly payment too low to ever pay off the interest.' });
        return;
      }
      
      // n = -log(1 - (B*r)/M) / log(1 + r)
      let months;
      if (r === 0) {
        months = balance / monthlyPayment;
      } else {
        months = -Math.log(1 - (balance * r) / monthlyPayment) / Math.log(1 + r);
      }
      const totalPaid = monthlyPayment * months;
      const totalInterest = totalPaid - balance;

      setResult({
        months: Math.ceil(months),
        totalInterest: Math.round(totalInterest),
        totalPaid: Math.round(totalPaid),
        monthlyPayment: Math.round(monthlyPayment)
      });
    } else {
      const months = targetValue;
      if (months <= 0) return;
      
      // M = (B * r * (1 + r)^n) / ((1 + r)^n - 1)
      let monthlyPayment;
      if (r === 0) {
        monthlyPayment = balance / months;
      } else {
        monthlyPayment = (balance * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
      }
      const totalPaid = monthlyPayment * months;
      const totalInterest = totalPaid - balance;

      setResult({
        months: Math.round(months),
        totalInterest: Math.round(totalInterest),
        totalPaid: Math.round(totalPaid),
        monthlyPayment: Math.round(monthlyPayment)
      });
    }
  };

  return (
    <div className="container">
      <SEO 
        title="Credit Card Payoff Calculator – Debt Free Faster" 
        description="Find out how long it will take to pay off your credit card balance. Calculate your monthly payment or time to debt freedom instantly." 
        path="/finance/credit-card-calculator"
      />
      
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Credit Card Payoff Calculator – Become Debt Free</h1>
        <p className="text-muted mb-10 text-center max-width-2xl mx-auto">
            Take control of your debt. Find out exactly when you'll be debt-free or how much you need to pay each month to meet your goals.
        </p>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Inputs */}
          <div className="card shadow-lg border-2 border-primary-light">
            <h2 className="text-xl font-bold mb-6">Card Details</h2>
            
            <div className="input-group">
              <label className="input-label">Current Balance ($)</label>
              <input type="number" className="input-field text-xl" value={balance} onChange={e => setBalance(Number(e.target.value))} />
            </div>

            <div className="input-group">
              <label className="input-label">Annual Interest Rate (%)</label>
              <input type="number" step="0.01" className="input-field text-xl" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} />
            </div>

            <div className="flex bg-secondary p-1 rounded-lg mb-6">
                <button 
                  className={`flex-1 py-3 rounded-md font-bold transition ${targetType === 'monthly' ? 'bg-primary text-white shadow-md' : 'text-muted'}`}
                  onClick={() => { setTargetType('monthly'); setTargetValue(250); }}
                >
                    Fix Payment
                </button>
                <button 
                  className={`flex-1 py-3 rounded-md font-bold transition ${targetType === 'time' ? 'bg-primary text-white shadow-md' : 'text-muted'}`}
                  onClick={() => { setTargetType('time'); setTargetValue(12); }}
                >
                    Fix Time
                </button>
            </div>

            <div className="input-group">
               <label className="input-label">
                   {targetType === 'monthly' ? 'Monthly Payment ($)' : 'Desired Months to Pay Off'}
               </label>
               <input type="number" className="input-field text-xl" value={targetValue} onChange={e => setTargetValue(Number(e.target.value))} />
            </div>
          </div>

          {/* Results */}
          <div>
            <div className="card shadow-2xl bg-primary-dark text-white sticky top-24 p-8 border-none flex flex-col justify-center relative rounded-2xl min-h-[450px]">
              <div className="absolute bottom-[-10px] right-[-10px] pointer-events-none z-0" style={{ opacity: 0.03 }}>
                 <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H3V6h18v12zm-9-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
              </div>

              <h2 className="text-xl font-bold mb-8 text-center uppercase tracking-widest opacity-80 relative z-10">Payoff Strategy</h2>
              
              {result && !result.error ? (
                <div className="space-y-8 relative z-10">
                  <div className="p-8 bg-white-10 rounded-2xl border-2 border-white-20 text-center shadow-inner">
                    <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-70">Time to Debt Freedom</p>
                    <p className="text-5xl font-black text-white">{result.months} Months</p>
                    <p className="text-sm opacity-50 mt-2">Approximately {(result.months / 12).toFixed(1)} Years</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-5 bg-white-5 rounded-xl flex justify-between items-center border-l-4 border-danger-vivid">
                        <span className="text-sm font-bold opacity-70">Total Interest</span>
                        <span className="text-xl font-black text-danger-vivid">+ ${result.totalInterest.toLocaleString()}</span>
                    </div>
                    <div className="p-5 bg-white-5 rounded-xl flex justify-between items-center border-l-4 border-success-vivid">
                        <span className="text-sm font-bold opacity-70">Total Repayment</span>
                        <span className="text-xl font-black text-success-vivid">${result.totalPaid.toLocaleString()}</span>
                    </div>
                    {targetType === 'time' && (
                        <div className="p-5 bg-white-5 rounded-xl flex justify-between items-center border-l-4 border-primary-light">
                           <span className="text-sm font-bold opacity-70">Required Payment</span>
                           <span className="text-xl font-black text-primary-light">${result.monthlyPayment.toLocaleString()}/mo</span>
                        </div>
                    )}
                  </div>
                </div>
              ) : result?.error ? (
                <div className="py-12 text-center text-red-500 font-bold px-6 leading-relaxed">
                  <p>{result.error}</p>
                </div>
              ) : (
                <div className="py-12 text-center opacity-40 italic">
                  Enter balance.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SEO CONTENT SECTION */}
        <section className="mt-16 space-y-12">
            <div className="card">
                <h2 className="text-2xl font-bold mb-4">What is a Credit Card Payoff Calculator?</h2>
                <p className="text-muted leading-relaxed">
                    A credit card payoff calculator is a powerful tool designed to help you plan your journey out of high-interest debt. Unlike a simple mortgage, credit card balances can often feel like an endless cycle if you only pay the minimum. Our tool allows you to input your current balance and Interest Rate (APR) to see exactly how much you can save by increasing your monthly payments.
                </p>
            </div>

            <div className="card">
                <h2 className="text-2xl font-bold mb-4">How Minimum Payments Keep You in Debt</h2>
                <p className="text-muted leading-relaxed">
                    Credit card companies often set minimum monthly payments as low as 2-3% of your balance. Because credit cards carry high interest rates (often over 20%), a large portion of that minimum payment goes toward interest, not the principal balance. This can lead to debt that takes decades to pay off. Increasing your payment by even $50 a month can save you thousands in interest charges.
                </p>
            </div>

            <div className="card">
                <h2 className="text-2xl font-bold mb-4">How to Eliminate Credit Card Debt Faster</h2>
                <ul className="list-disc pl-6 space-y-4 text-muted">
                    <li><strong>Increase Monthly Payments:</strong> Even small increases significantly reduce the time and total interest paid.</li>
                    <li><strong>The Debt Avalanche Method:</strong> Focus on paying off the card with the highest interest rate first while making minimum payments on others.</li>
                    <li><strong>The Debt Snowball Method:</strong> Pay off the smallest balance first to build momentum and psychological wins.</li>
                    <li><strong>Balance Transfers:</strong> Consider transferring your debt to a card with a 0% introductory APR to stop interest growth for a period.</li>
                </ul>
            </div>

            <div className="card">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold text-lg mb-1">What is APR?</h3>
                        <p className="text-muted">APR stands for Annual Percentage Rate. It is the interest rate you are charged on your balance if you carry it from month to month.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-1">Should I pay more than the minimum?</h3>
                        <p className="text-muted">Absolutely. Paying even slightly more than the minimum can shave years off your debt payoff timeline and save you thousands in interest charges.</p>
                    </div>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
}
