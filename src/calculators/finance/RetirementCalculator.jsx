import React, { useState, useEffect } from 'react';
import { Palmtree } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

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

  const inputs = (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
          <div className="input-group">
              <label className="input-label">Current Age</label>
              <input type="number" className="input-field font-black" value={currentAge} onChange={e => setCurrentAge(Number(e.target.value))} />
          </div>
          <div className="input-group">
              <label className="input-label">Retire Age</label>
              <input type="number" className="input-field font-black" value={retirementAge} onChange={e => setRetirementAge(Number(e.target.value))} />
          </div>
      </div>

      <div className="input-group">
        <label className="input-label">Current Savings ($)</label>
        <input type="number" className="input-field text-xl font-black" value={currentSavings} onChange={e => setCurrentSavings(Number(e.target.value))} />
      </div>

      <div className="input-group">
        <label className="input-label">Monthly Savings ($)</label>
        <input type="number" className="input-field text-xl font-black" value={monthlyContribution} onChange={e => setMonthlyContribution(Number(e.target.value))} />
      </div>

      <div className="grid grid-cols-2 gap-4">
          <div className="input-group">
              <label className="input-label">Return (%)</label>
              <input type="number" step="0.1" className="input-field font-bold" value={investmentReturn} onChange={e => setInvestmentReturn(Number(e.target.value))} />
          </div>
          <div className="input-group">
              <label className="input-label">Inflation (%)</label>
              <input type="number" step="0.1" className="input-field font-bold" value={inflationRate} onChange={e => setInflationRate(Number(e.target.value))} />
          </div>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6 text-center">
      {result ? (
        <div className="space-y-6">
          <div className="p-10 bg-primary/5 rounded-2xl border border-primary/20 shadow-inner group transition-all">
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-2">Fund at Age {retirementAge}</p>
            <p className="text-5xl font-black text-slate-900 group-hover:scale-105 transition-transform">
                ${result.totalFund.toLocaleString()}
            </p>
            <p className="text-xs font-bold uppercase tracking-widest opacity-40 mt-2">Today's Purchasing Power</p>
          </div>
          
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60 text-green-600">Monthly Retirement Income</p>
              <p className="text-3xl font-black text-slate-900">${result.monthlyIncome.toLocaleString()}</p>
              <p className="text-[10px] uppercase font-bold opacity-30 mt-1">Based on the 4% Rule</p>
          </div>
        </div>
      ) : (
        <div className="py-12 italic opacity-40 text-center">Calculate your retirement...</div>
      )}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        Design your path to financial freedom. This Retirement Calculator helps you determine the ultimate size of your nest egg and the sustainable monthly income it can provide once you stop working.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Real Return:</strong> We automatically adjust your investment returns for inflation to show you what your money will feel like in today's terms.</li>
        <li><strong>Nesting Period:</strong> The longer you save, the more time compound interest has to work its magic.</li>
        <li><strong>4% Rule:</strong> A standard financial benchmark suggesting you can safely withdraw 4% of your fund annually without running out of money.</li>
      </ul>
    </div>
  );

  const formula = "FV = P(1+r)ⁿ + PMT × [( (1+r)ⁿ - 1 ) / r]";

  const examples = [
    {
      title: "The Financial Independence Path",
      description: "Investing $2,000 monthly from age 25 to 45 with a 7% return turns into a $1.3 Million fund (in today's dollars)."
    },
    {
      title: "Steady Accumulation",
      description: "Saving $750/month from age 30 to 65 at 6% return creates a fund of over $650,000, providing ~$2,200/mo extra income."
    }
  ];

  const faqs = [
    {
      q: "What is a safe withdrawal rate?",
      a: "The '4% Rule' suggests that if you withdraw 4% of your starting retirement balance each year, your money should last at least 30 years."
    },
    {
      q: "Should I include government pensions?",
      a: "This tool calculates your private savings. You should add any expected Social Security or employer pensions to the monthly figure provided here."
    }
  ];

  return (
    <CalculatorLayout 
      title="Retirement"
      seoTitle="Retirement Calculator - Financial Independence Planner"
      description="Estimate your future retirement fund and sustainable monthly income. Plan your path to financial independence with our advanced retirement modeling tool."
      path="/finance/retirement-calculator"
      icon={Palmtree}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
    />
  );
}
