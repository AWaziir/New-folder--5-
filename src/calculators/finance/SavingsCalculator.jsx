import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

export default function SavingsCalculator() {
  const [initialBalance, setInitialBalance] = useState(1000);
  const [monthlyContribution, setMonthlyContribution] = useState(100);
  const [interestRate, setInterestRate] = useState(5);
  const [years, setYears] = useState(10);
  
  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateSavings();
  }, [initialBalance, monthlyContribution, interestRate, years]);

  const calculateSavings = () => {
    if (years <= 0) return;

    const n = 12; // Monthly compounding
    const r = interestRate / 100 / n;
    const t = years * n;
    
    // Total = P(1 + r/n)^(nt) + PMT * [((1 + r/n)^(nt) - 1) / (r/n)]
    const futureBalanceFromInitial = initialBalance * Math.pow(1 + r, t);
    let futureBalanceFromContributions;
    if (r === 0) {
      futureBalanceFromContributions = monthlyContribution * t;
    } else {
      futureBalanceFromContributions = monthlyContribution * (Math.pow(1 + r, t) - 1) / r;
    }
    const totalBalance = futureBalanceFromInitial + futureBalanceFromContributions;
    
    const totalContributions = initialBalance + (monthlyContribution * t);
    const totalInterest = totalBalance - totalContributions;

    setResult({
      total: Math.round(totalBalance),
      interest: Math.round(totalInterest),
      contributions: Math.round(totalContributions)
    });
  };

  return (
    <div className="container">
      <SEO 
        title="Savings Calculator – Free & Accurate Savings Growth Tool" 
        description="Calculate how much your savings will grow over time. Plan your monthly contributions and see the power of compound interest." 
        path="/finance/savings-calculator"
      />
      
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Savings Growth Calculator – Reach Your Goals Fast</h1>
        <p className="text-muted mb-10 text-center max-width-2xl mx-auto">
            Find out exactly how much your savings will be worth in the future. Plan your path to financial freedom with monthly contributions.
        </p>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Inputs */}
          <div className="card shadow-lg border-2 border-primary-light">
            <h2 className="text-xl font-bold mb-6">Savings & Contributions</h2>
            
            <div className="input-group">
              <label className="input-label">Initial Savings Balance ($)</label>
              <input type="number" className="input-field text-xl" value={initialBalance} onChange={e => setInitialBalance(Number(e.target.value))} />
            </div>

            <div className="input-group">
              <label className="input-label">Monthly Contribution ($)</label>
              <input type="number" className="input-field text-xl" value={monthlyContribution} onChange={e => setMonthlyContribution(Number(e.target.value))} />
            </div>

            <div className="flex gap-4">
                <div className="input-group flex-1">
                    <label className="input-label">Annual Interest Rate (%)</label>
                    <input type="number" step="0.1" className="input-field" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} />
                </div>
                <div className="input-group flex-1">
                    <label className="input-label">Years of Saving</label>
                    <input type="number" className="input-field" value={years} onChange={e => setYears(Number(e.target.value))} />
                </div>
            </div>
          </div>

          {/* Results */}
          <div>
            <div className="card highlight-border bg-primary-dark text-white shadow-xl sticky top-24">
              <h2 className="text-xl font-bold mb-8">Future Balance Summary</h2>
              
              {result ? (
                <div className="space-y-8">
                  <div className="p-6 bg-white bg-opacity-10 rounded-xl text-center">
                    <p className="text-sm font-bold uppercase tracking-widest opacity-80 mb-1">Estimated Total Balance</p>
                    <p className="text-5xl font-black text-white">${result.total.toLocaleString()}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-white bg-opacity-10 rounded-lg text-center border-l-4 border-success">
                        <p className="text-xs uppercase font-bold opacity-70 mb-1">Total Interest</p>
                        <p className="text-2xl font-bold text-success">+ ${result.interest.toLocaleString()}</p>
                    </div>
                    <div className="p-5 bg-white bg-opacity-10 rounded-lg text-center border-l-4 border-primary-light">
                        <p className="text-xs uppercase font-bold opacity-70 mb-1">Total Contributed</p>
                        <p className="text-lg font-bold">${result.contributions.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center opacity-50">
                  Fill in your details.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SEO CONTENT SECTION */}
        <section className="mt-16 space-y-12">
            <div className="card">
                <h2 className="text-2xl font-bold mb-4">How Much Will My Savings Be Worth?</h2>
                <p className="text-muted leading-relaxed">
                    Our free Savings Calculator allows you to project your future wealth by accounting for both your initial investment and ongoing monthly contributions. Using the power of <strong>compound interest</strong>, you can see how even small amounts saved regularly can grow into a significant nest egg over time.
                </p>
            </div>

            <div className="card">
                <h2 className="text-2xl font-bold mb-4">The Magic of Compound Interest</h2>
                <p className="text-muted leading-relaxed">
                    Compound interest is interest calculated on the initial principal and also on the accumulated interest of previous periods. Put simply, your money earns more money, which then earns even more money. The longer you save, the more powerful this effect becomes.
                </p>
                <div className="p-6 bg-secondary rounded-lg mt-6 shadow-inner text-center font-mono text-primary text-sm">
                    A = P(1 + r/n)^(nt) + PMT × [ ((1 + r/n)^(nt) - 1) / (r/n) ]
                </div>
            </div>

            <div className="card">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold text-lg mb-1">What is a good savings rate?</h3>
                        <p className="text-muted">A common rule of thumb is the 50/30/20 rule, which suggests saving 20% of your income. However, any amount saved consistently is better than none.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-1">How often is the interest compounded?</h3>
                        <p className="text-muted">Our calculator uses monthly compounding, which is standard for most high-yield savings accounts and monthly contribution plans.</p>
                    </div>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
}
