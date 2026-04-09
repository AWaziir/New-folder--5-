import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(1000);
  const [investmentReturn, setInvestmentReturn] = useState(7);
  const [inflationRate, setInflationRate] = useState(3);
  
  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateRetirement();
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, investmentReturn, inflationRate]);

  const calculateRetirement = () => {
    const yearsToRetire = retirementAge - currentAge;
    if (yearsToRetire <= 0) return;

    const n = 12; // Monthly compounding
    const realReturn = (investmentReturn - inflationRate) / 100 / n; // Adjusted for inflation
    const t = yearsToRetire * n;
    
    // Future Value = P(1 + r)^t + PMT * [((1 + r)^t - 1) / r]
    const futureSavingsFromInitial = currentSavings * Math.pow(1 + realReturn, t);
    let futureSavingsFromContributions;
    if (realReturn === 0) {
      futureSavingsFromContributions = monthlyContribution * t;
    } else {
      futureSavingsFromContributions = monthlyContribution * (Math.pow(1 + realReturn, t) - 1) / realReturn;
    }
    const totalRetirementFund = futureSavingsFromInitial + futureSavingsFromContributions;
    
    // 4% Rule for monthly income in retirement
    const monthlyRetirementIncome = (totalRetirementFund * 0.04) / 12;

    setResult({
      totalFund: Math.round(totalRetirementFund),
      monthlyIncome: Math.round(monthlyRetirementIncome),
      yearsSaving: yearsToRetire
    });
  };

  return (
    <div className="container">
      <SEO 
        title="Retirement Calculator – Free & Accurate Financial Planning Tool" 
        description="Am I saving enough for retirement? Calculate your future retirement fund and estimated monthly income with our free, professional-grade tool." 
        path="/finance/retirement-calculator"
      />
      
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Retirement Calculator – Plan Your Future Independence</h1>
        <p className="text-muted mb-10 text-center max-width-2xl mx-auto">
            Find out if your savings are on track. Estimate your total retirement fund adjusted for inflation and see how much you can spend monthly.
        </p>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Inputs */}
          <div className="card shadow-lg border-2 border-primary-light">
            <h2 className="text-xl font-bold mb-6">Retirement Details</h2>
            
            <div className="flex gap-4">
                <div className="input-group flex-1">
                    <label className="input-label">Current Age</label>
                    <input type="number" className="input-field" value={currentAge} onChange={e => setCurrentAge(Number(e.target.value))} />
                </div>
                <div className="input-group flex-1">
                    <label className="input-label">Retire Age</label>
                    <input type="number" className="input-field" value={retirementAge} onChange={e => setRetirementAge(Number(e.target.value))} />
                </div>
            </div>

            <div className="input-group">
              <label className="input-label">Current Savings ($)</label>
              <input type="number" className="input-field text-xl" value={currentSavings} onChange={e => setCurrentSavings(Number(e.target.value))} />
            </div>

            <div className="input-group">
              <label className="input-label">Monthly Contribution ($)</label>
              <input type="number" className="input-field text-xl" value={monthlyContribution} onChange={e => setMonthlyContribution(Number(e.target.value))} />
            </div>

            <div className="flex gap-4">
                <div className="input-group flex-1">
                    <label className="input-label">Return (%)</label>
                    <input type="number" step="0.1" className="input-field" value={investmentReturn} onChange={e => setInvestmentReturn(Number(e.target.value))} />
                </div>
                <div className="input-group flex-1">
                    <label className="input-label">Inflation (%)</label>
                    <input type="number" step="0.1" className="input-field" value={inflationRate} onChange={e => setInflationRate(Number(e.target.value))} />
                </div>
            </div>
          </div>

          {/* Results */}
          <div>
            <div className="card shadow-2xl highlight-border bg-primary text-white sticky top-24">
              <h2 className="text-xl font-bold mb-8">Retirement Fund Goal</h2>
              
              {result ? (
                <div className="space-y-8">
                  <div className="p-6 bg-white bg-opacity-10 rounded-xl text-center">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Total Fund Value at Age {retirementAge}</p>
                    <p className="text-5xl font-black text-white">${result.totalFund.toLocaleString()}</p>
                    <p className="text-sm opacity-60 mt-1">(In Today's Dollars)</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-white bg-opacity-10 rounded-lg text-center border-l-4 border-success">
                        <p className="text-xs uppercase font-bold opacity-70 mb-1">Estimated Monthly Income</p>
                        <p className="text-2xl font-bold text-success">${result.monthlyIncome.toLocaleString()}</p>
                        <p className="text-[10px] uppercase font-bold opacity-50 mt-1">Based on 4% Rule</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center opacity-40 italic">
                  Select a retirement age greater than your current age.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SEO CONTENT SECTION */}
        <section className="mt-16 space-y-12">
            <div className="card">
                <h2 className="text-2xl font-bold mb-4">What is a Retirement Calculator?</h2>
                <p className="text-muted leading-relaxed">
                    A retirement calculator is a critical planning tool for anyone looking to achieve financial independence. It helps you project how much money you will have when you stop working, based on your current savings, monthly contributions, and expected investment returns. Our tool is uniquely powerful because it automatically adjusts for <strong>inflation</strong>, ensuring your results are presented in "today's dollars" for accurate planning.
                </p>
            </div>

            <div className="card">
                <h2 className="text-2xl font-bold mb-4">The Importance of Inflation Adjustment</h2>
                <p className="text-muted leading-relaxed">
                    Most retirement tools fail to account for the decaying purchasing power of money. A million dollars forty years from now will buy far less than it does today. Our calculator uses a "real return" method, subtracting the expected inflation rate from your investment return. This provides a pragmatic, conservative view of your future wealth.
                </p>
            </div>

            <div className="card">
                <h2 className="text-2xl font-bold mb-4">What is the 4% Rule?</h2>
                <p className="text-muted leading-relaxed">
                    The 4% rule is an industry-standard guideline for withdrawal rates in retirement. It suggests that if you withdraw 4% of your total portfolio value in the first year of retirement (and adjust for inflation thereafter), your money is highly likely to last for at least 30 years. Our calculator uses this rule to estimate your potential monthly income.
                </p>
            </div>

            <div className="card">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold text-lg mb-1">How much should I have saved by 30?</h3>
                        <p className="text-muted">Financial experts often suggest having one time your annual salary saved by age 30. Use our calculator to see how your current savings project forward.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-1">What is a good investment return?</h3>
                        <p className="text-muted">Historically, the stock market averages 7–10% before inflation. For a conservative retirement plan, many experts suggest using 5–7%.</p>
                    </div>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
}
