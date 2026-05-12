import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [contribution, setContribution] = useState(500);
  const [frequency, setFrequency] = useState(12); // monthly
  const [returnRate, setReturnRate] = useState(7);
  const [years, setYears] = useState(20);
  
  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateInvestment();
  }, [initialInvestment, contribution, frequency, returnRate, years]);

  const calculateInvestment = () => {
    if (years <= 0) return;

    const r = returnRate / 100 / frequency;
    const t = years * frequency;
    
    const futureValuePrincipal = initialInvestment * Math.pow(1 + r, t);
    let futureValueContributions;
    if (r === 0) {
      futureValueContributions = contribution * t;
    } else {
      futureValueContributions = contribution * (Math.pow(1 + r, t) - 1) / r;
    }
    
    const totalBalance = futureValuePrincipal + futureValueContributions;
    const totalContributed = initialInvestment + (contribution * t);
    const totalProfit = totalBalance - totalContributed;

    setResult({
      total: Math.round(totalBalance),
      profit: Math.round(totalProfit),
      contributed: Math.round(totalContributed)
    });
  };

  const inputs = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Initial Investment ($)</label>
        <input type="number" className="input-field text-xl font-black" value={initialInvestment} onChange={e => setInitialInvestment(Number(e.target.value))} />
      </div>

      <div className="input-group">
        <label className="input-label">Recurring Contribution ($)</label>
        <input type="number" className="input-field text-xl font-black" value={contribution} onChange={e => setContribution(Number(e.target.value))} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="input-group">
            <label className="input-label">Frequency</label>
            <select className="input-field font-bold" value={frequency} onChange={e => setFrequency(Number(e.target.value))}>
                <option value={12}>Monthly</option>
                <option value={1}>Annually</option>
                <option value={52}>Weekly</option>
                <option value={26}>Bi-Weekly</option>
            </select>
        </div>
        <div className="input-group">
            <label className="input-label">Years</label>
            <input type="number" className="input-field font-black" value={years} onChange={e => setYears(Number(e.target.value))} />
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">Exp. Annual Return (%)</label>
        <input type="number" step="0.1" className="input-field font-black" value={returnRate} onChange={e => setReturnRate(Number(e.target.value))} />
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6 text-center">
      {result ? (
        <div className="space-y-6">
          <div className="p-10 bg-primary/5 rounded-2xl border border-primary/20 shadow-inner group transition-all">
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-2">Estimated Wealth</p>
            <p className="text-5xl font-black text-slate-900 group-hover:scale-105 transition-transform">
                ${result.total.toLocaleString()}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60 text-green-600">Total Profit</p>
              <p className="text-2xl font-black text-slate-900">${result.profit.toLocaleString()}</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60 text-primary-light">Total Invested</p>
              <p className="text-2xl font-black text-slate-900">${result.contributed.toLocaleString()}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-12 italic opacity-40 text-center">Calculate your future wealth...</div>
      )}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        Harness the power of compound interest to build your financial future. This Investment Return Calculator allows you to project your ending wealth by combining a starting lump sum with recurring contributions over any time horizon.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Principal:</strong> The amount of money you are starting with today.</li>
        <li><strong>Compound Growth:</strong> This is where your interest begins to earn interest, leading to exponential gains over time.</li>
        <li><strong>Return Rate:</strong> Higher returns generally mean higher risk. Index funds historically offer 7-10% annually.</li>
      </ul>
    </div>
  );

  const formula = "FV = P(1+r)ⁿ + PMT × [( (1+r)ⁿ - 1 ) / r]";

  const examples = [
    {
      title: "The Stock Market Standard",
      description: "Investing $1,000 monthly into a diversified index fund (8% return) for 30 years results in approximately $1.5 Million."
    },
    {
      title: "The Power of Starting Early",
      description: "A $10,000 initial sum left alone for 40 years at 10% annual growth becomes over $450,000 without a single extra dollar added."
    }
  ];

  const faqs = [
    {
      q: "What return rate is realistic?",
      a: "For long-term stock market investing, 7-10% is common. For high-yield savings or CDs, expect 4-5% in the current market environment."
    },
    {
      q: "Does this account for taxes?",
      a: "No. This tool calculates gross returns. Taxes and inflation will impact your final 'purchasing power' in the future."
    }
  ];

  return (
    <CalculatorLayout 
      title="Investment Return"
      seoTitle="Investment Return Calculator - Compound Growth & ROI Tracker"
      description="Estimate your future investment growth with compound interest and recurring contributions. Plan your retirement or wealth building strategy today."
      path="/finance/investment-calculator"
      icon={TrendingUp}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
    />
  );
}
