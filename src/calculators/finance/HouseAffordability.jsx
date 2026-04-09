import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

export default function HouseAffordability() {
  const [annualIncome, setAnnualIncome] = useState(75000);
  const [monthlyDebt, setMonthlyDebt] = useState(500);
  const [downPayment, setDownPayment] = useState(25000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateAffordability();
  }, [annualIncome, monthlyDebt, downPayment, interestRate, loanTerm]);

  const calculateAffordability = () => {
    // 28/36 rule: 
    // Housing costs shouldn't exceed 28% of gross monthly income.
    // Total debt shouldn't exceed 36% of gross monthly income.
    
    const monthlyGrossIncome = annualIncome / 12;
    const maxMonthlyHousingPayment = Math.min(
        monthlyGrossIncome * 0.28,
        (monthlyGrossIncome * 0.36) - monthlyDebt
    );

    if (maxMonthlyHousingPayment <= 0) {
        setResult(null);
        return;
    }

    // Mortgage formula: P = M * [ (1+r)^n - 1 ] / [ r * (1+r)^n ]
    const r = interestRate / 100 / 12;
    const n = loanTerm * 12;
    
    const maxLoanAmount = maxMonthlyHousingPayment * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
    const affordabilityResult = maxLoanAmount + downPayment;

    setResult({
        totalPrice: Math.round(affordabilityResult),
        maxLoan: Math.round(maxLoanAmount),
        maxMonthlyPayment: Math.round(maxMonthlyHousingPayment)
    });
  };

  return (
    <div className="container">
      <SEO 
        title="House Affordability Calculator" 
        description="Find out how much house you can afford based on your income, debts, and down payment." 
        path="/finance/house-affordability"
      />
      
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8">
        <h1 className="text-3xl font-bold mb-2">How Much House Can I Afford?</h1>
        <p className="text-muted mb-6">Calculate your home buying power based on the 28/36 debt rule.</p>

        <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Financial Details</h2>
            
            <div className="input-group">
              <label className="input-label">Gross Annual Income ($)</label>
              <input type="number" className="input-field" value={annualIncome} onChange={e => setAnnualIncome(Number(e.target.value))} />
            </div>

            <div className="input-group">
              <label className="input-label">Monthly Debt Payments ($)</label>
              <input type="number" className="input-field" value={monthlyDebt} onChange={e => setMonthlyDebt(Number(e.target.value))} />
              <p className="text-sm text-muted mt-1">Car loans, student loans, credit cards.</p>
            </div>

            <div className="input-group">
              <label className="input-label">Down Payment ($)</label>
              <input type="number" className="input-field" value={downPayment} onChange={e => setDownPayment(Number(e.target.value))} />
            </div>

            <div className="input-group">
              <label className="input-label">Interest Rate (%)</label>
              <input type="number" className="input-field" step="0.01" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} />
            </div>
          </div>

          <div>
            <div className="card sticky top-24 highlight-border">
              <h2 className="text-xl font-bold mb-6">Affordability Result</h2>
              
              {result ? (
                <div className="text-center">
                  <div className="mb-6 p-6 bg-secondary rounded-xl">
                    <p className="text-muted text-sm font-bold uppercase mb-1">Max Home Price</p>
                    <p className="text-4xl font-bold text-primary">${result.totalPrice.toLocaleString()}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm p-3 bg-secondary rounded-lg">
                        <span className="text-muted">Estimated Loan Amount</span>
                        <span className="font-bold">${result.maxLoan.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm p-3 bg-secondary rounded-lg">
                        <span className="text-muted">Max Monthly Payment</span>
                        <span className="font-bold text-success">${result.maxMonthlyPayment.toLocaleString()}/mo</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-red-500">
                  <p className="font-bold">Affordability Warning</p>
                  <p className="text-sm mt-2">Based on your debts, your home buying power is currently $0. Consider reducing monthly debt payments.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <AdPlaceholder text="Mid-Content Ad" />

        <div className="card mt-8">
            <h2 className="text-2xl font-bold mb-4">The 28/36 Rule Explained</h2>
            <p className="text-muted leading-relaxed">
                Most lenders use the 28/36 rule to determine your borrowing capacity:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-3 text-muted">
                <li><strong>28% Front-End Ratio:</strong> Your monthly housing costs (principal, interest, taxes, and insurance) should not exceed 28% of your gross monthly income.</li>
                <li><strong>36% Back-End Ratio:</strong> Your total debt obligations (housing costs + other debts like car loans/credit cards) should not exceed 36% of your gross monthly income.</li>
            </ul>
        </div>
      </div>
    </div>
  );
}
