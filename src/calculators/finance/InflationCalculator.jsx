import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

export default function InflationCalculator() {
  const [initialAmount, setInitialAmount] = useState(100);
  const [startYear, setStartYear] = useState(2000);
  const [endYear, setEndYear] = useState(new Date().getFullYear());
  const [inflationRate, setInflationRate] = useState(3.5); // Average approx

  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateInflation();
  }, [initialAmount, startYear, endYear, inflationRate]);

  const calculateInflation = () => {
    const years = endYear - startYear;
    if (years < 0) return;

    // Compound Inflation: A = P(1 + r)^t
    const futureValue = initialAmount * Math.pow(1 + (inflationRate / 100), years);
    const cumulativeInflation = ((futureValue - initialAmount) / initialAmount) * 100;

    setResult({
      futureValue: futureValue.toFixed(2),
      cumulative: cumulativeInflation.toFixed(1),
      years
    });
  };

  return (
    <div className="container">
      <SEO 
        title="Inflation Calculator – Free & Accurate Cost of Living Tool" 
        description="Calculate how inflation affects your purchasing power over time. Compare dollar values across different years with our fast, free tool." 
        path="/finance/inflation-calculator"
      />
      
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Inflation Calculator – Purchasing Power Tool</h1>
        <p className="text-muted mb-10 text-center max-width-2xl mx-auto">
            Find out how much the same amount of money would be worth in a different year. Calculate historical price changes and cumulative inflation.
        </p>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Inputs */}
          <div className="card shadow-lg border-2 border-primary-light">
            <h2 className="text-xl font-bold mb-6">Inflation Details</h2>
            
            <div className="input-group">
              <label className="input-label">Amount at Start Year ($)</label>
              <input type="number" className="input-field text-xl" value={initialAmount} onChange={e => setInitialAmount(Number(e.target.value))} />
            </div>

            <div className="flex gap-4">
                <div className="input-group flex-1">
                    <label className="input-label">Start Year</label>
                    <input type="number" className="input-field" value={startYear} onChange={e => setStartYear(Number(e.target.value))} />
                </div>
                <div className="input-group flex-1">
                    <label className="input-label">End Year</label>
                    <input type="number" className="input-field" value={endYear} onChange={e => setEndYear(Number(e.target.value))} />
                </div>
            </div>

            <div className="input-group">
              <label className="input-label">Avg. Annual Inflation Rate (%)</label>
              <input type="number" step="0.1" className="input-field text-xl" value={inflationRate} onChange={e => setInflationRate(Number(e.target.value))} />
              <p className="text-xs text-muted mt-2">Historically, inflation averages around 2-4% annually in major economies.</p>
            </div>
          </div>

          {/* Results */}
          <div>
            <div className="card shadow-2xl highlight-border bg-primary-dark text-white sticky top-24">
              <h2 className="text-xl font-bold mb-8">Purchasing Power Result</h2>
              
              {result ? (
                <div className="space-y-8">
                  <div className="p-6 bg-white bg-opacity-10 rounded-xl text-center">
                    <p className="text-sm font-bold uppercase tracking-widest opacity-80 mb-1">${initialAmount} in {startYear} is worth</p>
                    <p className="text-5xl font-black text-white">${result.futureValue}</p>
                    <p className="text-sm opacity-80 mt-2">in the year {endYear}</p>
                  </div>
                  
                  <div className="p-5 bg-white bg-opacity-10 rounded-lg text-center border-l-4 border-red-500">
                     <p className="text-xs uppercase font-bold opacity-70 mb-1">Cumulative Inflation</p>
                     <p className="text-3xl font-bold text-white">+{result.cumulative}%</p>
                     <p className="text-xs opacity-60 mt-1">Over {result.years} years</p>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center opacity-40 italic">
                  End Year must be after Start Year.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SEO CONTENT SECTION */}
        <section className="mt-16 space-y-12">
            <div className="card">
                <h2 className="text-2xl font-bold mb-4">What is Inflation?</h2>
                <p className="text-muted leading-relaxed">
                    Inflation is the rate at which the general level of prices for goods and services is rising, and consequently, the purchasing power of currency is falling. Put simply, one dollar today will typically buy less than it did twenty years ago. Our inflation calculator helps you visualize this decay of value using compound interest formulas.
                </p>
            </div>

            <div className="card">
                <h2 className="text-2xl font-bold mb-4">How to Use the Inflation Calculator</h2>
                <p className="text-muted leading-relaxed">
                    Our tool is easy to use for both historical research and future projections. Simply enter the initial budget or cost, the range of years you're interested in, and the average annual inflation rate. The calculator instantly displays what the equivalent purchasing power would be in the end year.
                </p>
            </div>

            <div className="card">
                <h2 className="text-2xl font-bold mb-4">How to Calculate Inflation Manually</h2>
                <p className="text-muted leading-relaxed">
                    To calculate the future value of money adjusted for inflation, you use the compound interest formula:
                </p>
                <div className="p-6 bg-secondary rounded-lg mt-6 shadow-inner text-center font-mono text-primary text-sm">
                    Future Value = Current Amount × (1 + Inflation Rate)^Number of Years
                </div>
            </div>

            <div className="card">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold text-lg mb-1">What is a normal inflation rate?</h3>
                        <p className="text-muted">Central banks in many developed countries, such as the US, UK, and Australia, typically target an inflation rate of approximately 2% per year to maintain economic stability.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-1">How does high inflation affect me?</h3>
                        <p className="text-muted">High inflation reduces your standard of living if your wages don't increase at the same rate. It makes essentials like food, fuel, and housing more expensive over time.</p>
                    </div>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
}
