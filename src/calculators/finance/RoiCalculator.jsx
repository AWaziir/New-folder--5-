import React, { useState, useEffect } from 'react';
import { BarChart2 } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function RoiCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [finalValue, setFinalValue] = useState(15000);
  const [investmentPeriod, setInvestmentPeriod] = useState(1); // Years

  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateRoi();
  }, [initialInvestment, finalValue, investmentPeriod]);

  const calculateRoi = () => {
    if (initialInvestment <= 0) return;

    const netProfit = finalValue - initialInvestment;
    const roi = (netProfit / initialInvestment) * 100;
    
    // Annualized ROI = [(FinalValue / InitialValue) ^ (1/n) - 1] * 100
    const annualizedRoi = (Math.pow(finalValue / initialInvestment, 1 / (investmentPeriod > 0 ? investmentPeriod : 1)) - 1) * 100;

    setResult({
      profit: netProfit.toFixed(2),
      roi: roi.toFixed(1),
      annualized: annualizedRoi.toFixed(1)
    });
  };

  const inputs = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Initial Investment Amount ($)</label>
        <input type="number" className="input-field text-xl font-black" value={initialInvestment} onChange={e => setInitialInvestment(Number(e.target.value))} />
      </div>

      <div className="input-group">
        <label className="input-label">Final Value ($)</label>
        <input type="number" className="input-field text-xl font-black" value={finalValue} onChange={e => setFinalValue(Number(e.target.value))} />
      </div>

      <div className="input-group">
        <label className="input-label">Investment Period (Years)</label>
        <input type="number" className="input-field font-black" value={investmentPeriod} onChange={e => setInvestmentPeriod(Number(e.target.value))} />
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6 text-center">
      {result ? (
        <div className="space-y-6">
          <div className="p-10 bg-primary/5 rounded-2xl border border-primary/20 shadow-inner group transition-all">
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-2">Total ROI</p>
            <p className="text-7xl font-black text-slate-900 group-hover:scale-105 transition-transform">
                {result.roi}%
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60 text-green-600">Net Profit</p>
                <p className="text-2xl font-black text-slate-900">${Number(result.profit).toLocaleString()}</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60 text-primary-light">Annualized Roi</p>
                <p className="text-2xl font-black text-slate-900">{result.annualized}%</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-12 italic opacity-40 text-center">Calculate your return...</div>
      )}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        Measure the efficiency and profitability of your capital. This ROI (Return on Investment) Calculator provides both your raw percentage gain and an annualized growth rate, which is critical for comparing different opportunities over different timeframes.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Initial Cost:</strong> The total amount of capital used to acquire the asset, including any fees or commissions.</li>
        <li><strong>Final Value:</strong> The current market value or the price at which you sold the asset.</li>
        <li><strong>Annualized ROI:</strong> Also known as CAGR (Compound Annual Growth Rate), this shows what your percentage return would be if stretched evenly over each year.</li>
      </ul>
    </div>
  );

  const formula = "ROI = [(Final Value - Cost) / Cost] × 100";

  const examples = [
    {
      title: "Stock Market Performance",
      description: "Investing $10,000 and selling for $14,000 after 3 years results in a 40% total ROI, with a 11.8% annualized return."
    },
    {
      title: "Real Estate Flip",
      description: "A $200,000 investment that sells for $250,000 after just 12 months represents a 25% total and annualized ROI."
    }
  ];

  const faqs = [
    {
      q: "What is a 'good' ROI?",
      a: "This varies by asset class. In the stock market, 7-10% is the long-term historical norm. In venture capital, 30%+ is often targeted."
    },
    {
      q: "Does this include dividends?",
      a: "For the most accurate result, you should add any dividends or rent received during the period to your 'Final Value' before calculating."
    }
  ];

  return (
    <CalculatorLayout 
      title="ROI"
      seoTitle="ROI Calculator - Return on Investment & Profitability Analysis"
      description="Quickly calculate your total Return on Investment (ROI) and annualized growth rate for any asset. Free tool with formulas and examples."
      path="/finance/roi-calculator"
      icon={BarChart2}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
    />
  );
}
