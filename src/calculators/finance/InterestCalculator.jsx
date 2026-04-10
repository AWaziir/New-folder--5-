import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

export default function InterestCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [interestRate, setInterestRate] = useState(5);
  const [term, setTerm] = useState(10);
  const [compoundsPerYear, setCompoundsPerYear] = useState(12);
  
  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateInterest();
  }, [principal, interestRate, term, compoundsPerYear]);

  const calculateInterest = () => {
    if (principal <= 0 || interestRate < 0 || term <= 0) {
      setResult(null);
      return;
    }

    const r = interestRate / 100;
    const n = compoundsPerYear;
    const t = term;

    // Compound Interest Formula: A = P(1 + r/n)^(nt)
    const totalAmount = principal * Math.pow(1 + r/n, n * t);
    const totalInterest = totalAmount - principal;

    setResult({
      totalAmount: totalAmount.toFixed(2),
      totalInterest: totalInterest.toFixed(2)
    });
  };

  return (
    <div className="container">
      <SEO 
        title="Compound Interest Calculator - Savings Growth & Returns" 
        description="Calculate how your savings grow over time with the Compound Interest Calculator. See the power of compounding with daily, monthly, or yearly options." 
        path="/finance/interest-calculator"
      />
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8">
        <h1 className="text-3xl font-bold mb-2">Compound Interest Calculator</h1>
        <p className="text-muted mb-6">Calculate how your savings grow over time with compound interest.</p>

        <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Savings Details</h2>
            
            <div className="input-group">
              <label className="input-label">Initial Principal ($)</label>
              <input 
                type="number" 
                className="input-field" 
                value={principal} 
                onChange={e => setPrincipal(Number(e.target.value))} 
              />
            </div>

            <div className="input-group">
              <label className="input-label">Annual Interest Rate (%)</label>
              <input 
                type="number" 
                step="0.01"
                className="input-field" 
                value={interestRate} 
                onChange={e => setInterestRate(Number(e.target.value))} 
              />
            </div>

            <div className="input-group">
              <label className="input-label">Term (years)</label>
              <input 
                type="number" 
                className="input-field" 
                value={term} 
                onChange={e => setTerm(Number(e.target.value))} 
              />
            </div>

            <div className="input-group">
              <label className="input-label">Compounding Frequency</label>
              <select 
                className="input-field"
                value={compoundsPerYear}
                onChange={e => setCompoundsPerYear(Number(e.target.value))}
              >
                <option value={365}>Daily</option>
                <option value={12}>Monthly</option>
                <option value={4}>Quarterly</option>
                <option value={2}>Semi-annually</option>
                <option value={1}>Annually</option>
              </select>
            </div>
          </div>

          <div>
            <div className="card sticky top-24">
              <h2 className="text-xl font-bold mb-6">Results</h2>
              
              {result ? (
                <div>
                  <div className="mb-6 p-4 bg-secondary rounded-lg text-center">
                    <p className="text-muted mb-1 font-medium">Total Balance</p>
                    <p className="text-4xl font-bold text-primary">${Number(result.totalAmount).toLocaleString()}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-border-color pb-2">
                      <span className="text-muted">Interest Earned</span>
                      <span className="font-bold">${Number(result.totalInterest).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-muted">
                  Enter valid values to calculate.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
