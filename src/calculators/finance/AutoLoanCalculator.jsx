import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

export default function AutoLoanCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState(35000);
  const [downPayment, setDownPayment] = useState(5000);
  const [tradeIn, setTradeIn] = useState(0);
  const [loanTerm, setLoanTerm] = useState(60);
  const [interestRate, setInterestRate] = useState(5.5);
  const [salesTax, setSalesTax] = useState(7);

  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateAutoLoan();
  }, [vehiclePrice, downPayment, tradeIn, loanTerm, interestRate, salesTax]);

  const calculateAutoLoan = () => {
    const amountToTax = vehiclePrice - tradeIn;
    const taxAmount = amountToTax * (salesTax / 100);
    const loanPrincipal = (vehiclePrice + taxAmount) - downPayment - tradeIn;

    if (loanPrincipal <= 0) {
      setResult(null);
      return;
    }

    const monthlyRate = interestRate / 100 / 12;
    const n = loanTerm;

    let monthlyPayment;
    if (monthlyRate === 0) {
      monthlyPayment = loanPrincipal / n;
    } else {
      monthlyPayment = (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    }
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - loanPrincipal;

    setResult({
      monthlyPayment: Math.round(monthlyPayment),
      totalInterest: Math.round(totalInterest),
      totalLoan: Math.round(loanPrincipal),
      totalCost: Math.round(vehiclePrice + totalInterest + taxAmount)
    });
  };

  return (
    <div className="container">
      <SEO 
        title="Auto Loan Calculator" 
        description="Calculate monthly payments for your next car. Determine total interest and loan principal instantly." 
        path="/finance/auto-loan-calculator"
      />
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8">
        <h1 className="text-3xl font-bold mb-2">Auto Loan Calculator</h1>
        <p className="text-muted mb-6">Estimate your monthly car payments and find out exactly what you'll pay in interest.</p>

        <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Loan Details</h2>
            
            <div className="input-group">
                <label className="input-label">Vehicle Price ($)</label>
                <input type="number" className="input-field" value={vehiclePrice} onChange={e => setVehiclePrice(Number(e.target.value))} />
            </div>

            <div className="flex gap-4">
                <div className="input-group flex-1">
                    <label className="input-label">Down Payment</label>
                    <input type="number" className="input-field" value={downPayment} onChange={e => setDownPayment(Number(e.target.value))} />
                </div>
                <div className="input-group flex-1">
                    <label className="input-label">Trade-In Value</label>
                    <input type="number" className="input-field" value={tradeIn} onChange={e => setTradeIn(Number(e.target.value))} />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
                <div className="input-group col-span-1">
                    <label className="input-label">Rate (%)</label>
                    <input type="number" step="0.1" className="input-field" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} />
                </div>
                <div className="input-group col-span-1">
                    <label className="input-label">Term (mos)</label>
                    <input type="number" className="input-field" value={loanTerm} onChange={e => setLoanTerm(Number(e.target.value))} />
                </div>
                <div className="input-group col-span-1">
                    <label className="input-label">Tax (%)</label>
                    <input type="number" className="input-field" value={salesTax} onChange={e => setSalesTax(Number(e.target.value))} />
                </div>
            </div>
          </div>

          <div>
            <div className="card sticky top-24 highlight-border">
              <h2 className="text-xl font-bold mb-6">Payment Summary</h2>
              {result ? (
                <div className="text-center">
                   <div className="p-6 bg-secondary rounded-xl mb-4">
                        <p className="text-muted text-sm uppercase font-bold mb-1">Monthly Payment</p>
                        <p className="text-5xl font-bold text-primary">${result.monthlyPayment}</p>
                   </div>
                   
                   <div className="space-y-3">
                       <div className="flex justify-between p-3 bg-secondary rounded-lg text-sm">
                           <span className="text-muted">Total Loan Principal</span>
                           <span className="font-bold">${result.totalLoan.toLocaleString()}</span>
                       </div>
                       <div className="flex justify-between p-3 bg-secondary rounded-lg text-sm border-l-4 border-primary">
                           <span className="text-muted">Total Interest Paid</span>
                           <span className="font-bold text-primary">${result.totalInterest.toLocaleString()}</span>
                       </div>
                       <div className="flex justify-between p-3 bg-secondary rounded-lg text-sm border-l-4 border-success">
                           <span className="text-muted">Total Cost of Vehicle</span>
                           <span className="font-bold text-success">${result.totalCost.toLocaleString()}</span>
                       </div>
                   </div>
                </div>
              ) : (
                <p className="text-center text-muted py-8">Adjust the loan details.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
