import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

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
    const annualizedRoi = (Math.pow(finalValue / initialInvestment, 1 / investmentPeriod) - 1) * 100;

    setResult({
      profit: netProfit.toFixed(2),
      roi: roi.toFixed(2),
      annualized: annualizedRoi.toFixed(2)
    });
  };

  return (
    <div className="container">
      <SEO 
        title="ROI Calculator - Free & Accurate Return on Investment Tool" 
        description="Calculate your Return on Investment (ROI) and annualized returns for any asset. Fast, free, and simple ROI tool with formulas, examples, and accuracy." 
        path="/finance/roi-calculator"
      />
      
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">ROI Calculator – Return on Investment Tool</h1>
        <p className="text-muted mb-10 text-center max-width-2xl mx-auto">
            Measure the efficiency and profitability of your investments. Calculate both total ROI and annualized returns instantly.
        </p>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Inputs */}
          <div className="card shadow-lg border-2 border-primary-light">
            <h2 className="text-xl font-bold mb-6">Investment Details</h2>
            
            <div className="input-group">
              <label className="input-label">Initial Investment Amount ($)</label>
              <input type="number" className="input-field text-xl" value={initialInvestment} onChange={e => setInitialInvestment(Number(e.target.value))} />
            </div>

            <div className="input-group">
              <label className="input-label">Final Value ($)</label>
              <input type="number" className="input-field text-xl" value={finalValue} onChange={e => setFinalValue(Number(e.target.value))} />
            </div>

            <div className="input-group">
              <label className="input-label">Investment Period (Years)</label>
              <input type="number" className="input-field text-xl" value={investmentPeriod} onChange={e => setInvestmentPeriod(Number(e.target.value))} />
            </div>
          </div>

          {/* Results */}
          <div>
            <div className="card highlight-border bg-primary shadow-xl text-white sticky top-24">
              <h2 className="text-xl font-bold mb-8">ROI Summary</h2>
              
              {result ? (
                <div className="space-y-8">
                  <div className="p-6 bg-white bg-opacity-10 rounded-xl text-center">
                    <p className="text-sm font-bold uppercase tracking-widest opacity-70 mb-1">Total ROI</p>
                    <p className="text-5xl font-black">{result.roi}%</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white bg-opacity-10 rounded-lg text-center border border-white border-opacity-10">
                        <p className="text-xs uppercase font-bold opacity-60 mb-1">Net Profit</p>
                        <p className="text-xl font-bold">${Number(result.profit).toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-white bg-opacity-20 rounded-lg text-center border-l-4 border-white">
                        <p className="text-xs uppercase font-bold opacity-80 mb-1">Annualized ROI</p>
                        <p className="text-xl font-bold">{result.annualized}%</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center opacity-50">
                  Enter costs to calculate ROI.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SEO CONTENT SECTION */}
        <section className="mt-16 space-y-12">
            <div className="card">
                <h2 className="text-2xl font-bold mb-4">What is Return on Investment (ROI)?</h2>
                <p className="text-muted leading-relaxed">
                    Return on Investment (ROI) is a popular financial metric used to evaluate the efficiency and profitability of an investment. It measures how much you gained or lost on an investment relative to its initial cost. Our ROI Calculator provides an instant percentage return and an annualized ROI, helping you compare different investment opportunities fairly.
                </p>
            </div>

            <div className="card">
                <h2 className="text-2xl font-bold mb-4">How to Calculate ROI</h2>
                <p className="text-muted leading-relaxed">
                    The basic ROI calculation is simple. You take the net gain (Final Value - Initial Cost) and divide it by the initial cost, then multiply by 100 to get a percentage.
                </p>
                <div className="p-4 bg-secondary rounded-lg font-mono text-primary text-sm mt-6 text-center shadow-inner">
                    ROI = [ (Final Value - Initial Cost) / Initial Cost ] × 100
                </div>
            </div>

            <div className="card">
                <h2 className="text-2xl font-bold mb-4">Why Annualized ROI Matters</h2>
                <p className="text-muted leading-relaxed">
                    While total ROI tells you the total percentage gain, it doesn't account for time. A 50% return over 10 years is very different from a 50% return over 1 year. Annualized ROI (or Compound Annual Growth Rate) allows you to see the average yearly return, making it easier to compare investments with different durations.
                </p>
            </div>

            <div className="card">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold text-lg mb-1">What is a good ROI?</h3>
                        <p className="text-muted">A "good" ROI depends on the asset class and risk level. Generally, an annualized ROI of 7-10% is considered good for stock market index funds, while real estate or private equity may seek higher returns.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-1">Can ROI be negative?</h3>
                        <p className="text-muted">Yes. A negative ROI means your final value is less than your initial investment, indicating a loss.</p>
                    </div>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
}
