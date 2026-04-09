import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);
  
  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateMortgage();
  }, [homePrice, downPayment, loanTerm, interestRate]);

  const calculateMortgage = () => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (principal <= 0 || monthlyRate < 0 || numberOfPayments <= 0) {
      setResult(null);
      return;
    }

    let monthlyPayment;
    if (monthlyRate === 0) {
      monthlyPayment = principal / numberOfPayments;
    } else {
      monthlyPayment = 
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }
      
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      principal,
      totalInterest: totalInterest.toFixed(2),
      totalPayment: totalPayment.toFixed(2)
    });
  };

  const resetForm = () => {
    setHomePrice(300000);
    setDownPayment(60000);
    setLoanTerm(30);
    setInterestRate(6.5);
  };

  return (
    <div className="container">
      <SEO 
        title="Mortgage Calculator Australia With Extra Payments" 
        description="The ultimate mortgage calculator australia with extra payments. Estimate your monthly mortgage payments with our fast, free online calculator." 
        path="/finance/mortgage-calculator"
      />
      
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8 px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-center">Mortgage Calculator</h1>
        <p className="text-muted mb-10 text-center max-width-2xl mx-auto">Calculate your monthly mortgage payments including principal and interest with precision and ease.</p>

        <div className="grid gap-8 lg:grid-cols-2">
          
          <div className="card shadow-lg border-2 border-primary-light">
            <h2 className="text-xl font-bold mb-4">Input Details</h2>
            
            <div className="input-group">
              <label className="input-label">Home Price ($)</label>
              <input 
                type="number" 
                className="input-field" 
                value={homePrice} 
                onChange={e => setHomePrice(Number(e.target.value))} 
              />
            </div>

            <div className="input-group">
              <label className="input-label">Down Payment ($)</label>
              <input 
                type="number" 
                className="input-field" 
                value={downPayment} 
                onChange={e => setDownPayment(Number(e.target.value))} 
              />
            </div>

            <div className="input-group">
              <label className="input-label">Loan Term (years)</label>
              <select 
                className="input-field"
                value={loanTerm}
                onChange={e => setLoanTerm(Number(e.target.value))}
              >
                <option value={10}>10 Years</option>
                <option value={15}>15 Years</option>
                <option value={20}>20 Years</option>
                <option value={30}>30 Years</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Interest Rate (%)</label>
              <input 
                type="number" 
                step="0.01"
                className="input-field" 
                value={interestRate} 
                onChange={e => setInterestRate(Number(e.target.value))} 
              />
            </div>

            <button onClick={resetForm} className="btn-outline w-full mt-4">
              Reset Values
            </button>
          </div>

          <div>
            <div className="card shadow-2xl bg-primary-dark text-white sticky top-24 highlight-border p-8 border-none">
              <h2 className="text-xl font-bold mb-8 text-center uppercase tracking-widest opacity-80">Payment Results</h2>
              
              {result ? (
                <div>
                  <div className="mb-8 p-8 bg-white-10 rounded-2xl border-2 border-white border-opacity-20 text-center shadow-inner">
                    <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-70">Monthly Payment</p>
                    <p className="text-5xl font-black text-white">${Number(result.monthlyPayment).toLocaleString()}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm p-4 bg-white-5 rounded-lg border-l-4 border-success">
                      <span className="opacity-70 font-medium">Principal Amount</span>
                      <span className="font-bold">${Number(result.principal).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm p-4 bg-white-5 rounded-lg border-l-4 border-primary-light">
                      <span className="opacity-70 font-medium">Total Interest</span>
                      <span className="font-bold text-success-light">${Number(result.totalInterest).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm p-4 bg-white-5 rounded-lg border-l-4 border-white">
                      <span className="opacity-70 font-medium">Total Loan Cost</span>
                      <span className="font-bold">${Number(result.totalPayment).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center opacity-40">
                  Please enter valid numbers to see your results.
                </div>
              )}
            </div>
          </div>

        </div>

        <AdPlaceholder text="Mid-Content Ad" />

        <div className="card mt-8">
          <h2 className="text-2xl font-bold mb-4">How is the Mortgage Calculated?</h2>
          <p className="mb-4">
            Our mortgage calculator uses the standard formula to calculate your monthly principal and interest payments:
          </p>
          <div className="p-4 bg-secondary rounded-lg mb-4 text-center font-bold text-lg">
            M = P [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]
          </div>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>M</strong> = Total monthly payment</li>
            <li><strong>P</strong> = The principal loan amount (Home Price - Down Payment)</li>
            <li><strong>r</strong> = Your monthly interest rate (Annual Rate / 12)</li>
            <li><strong>n</strong> = Number of payments over the loan's lifetime (Years * 12)</li>
          </ul>
          
          <h3 className="text-xl font-bold mt-6 mb-2">Frequently Asked Questions</h3>
          <div className="mb-4">
            <h4 className="font-bold">What is a good down payment?</h4>
            <p className="text-muted">A 20% down payment is standard and often helps you avoid paying Private Mortgage Insurance (PMI).</p>
          </div>
          <div className="mb-4">
            <h4 className="font-bold">Does this include taxes and insurance?</h4>
            <p className="text-muted">This specific calculator only computes the principal and interest. Property taxes, home insurance, and HOA fees will increase your actual total monthly payment.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
