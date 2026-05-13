import React, { useState, useEffect } from 'react';
import { Car } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

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
    const amountToTax = Math.max(0, vehiclePrice - tradeIn);
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

  const inputs = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Vehicle Price ($)</label>
        <input type="number" className="input-field" value={vehiclePrice} onChange={e => setVehiclePrice(Number(e.target.value))} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="input-group">
          <label className="input-label">Down Payment ($)</label>
          <input type="number" className="input-field" value={downPayment} onChange={e => setDownPayment(Number(e.target.value))} />
        </div>
        <div className="input-group">
          <label className="input-label">Trade-In Value ($)</label>
          <input type="number" className="input-field" value={tradeIn} onChange={e => setTradeIn(Number(e.target.value))} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="input-group">
          <label className="input-label">Rate (%)</label>
          <input type="number" step="0.1" className="input-field" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} />
        </div>
        <div className="input-group">
          <label className="input-label">Term (mo)</label>
          <input type="number" className="input-field" value={loanTerm} onChange={e => setLoanTerm(Number(e.target.value))} />
        </div>
        <div className="input-group">
          <label className="input-label">Tax (%)</label>
          <input type="number" step="0.1" className="input-field" value={salesTax} onChange={e => setSalesTax(Number(e.target.value))} />
        </div>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6">
      {result ? (
        <div className="space-y-6">
          <div className="p-8 bg-primary/5 rounded-2xl text-center border border-primary/20 shadow-inner group">
            <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Monthly Payment</p>
            <p className="text-6xl font-black text-slate-900 group-hover:scale-105 transition">${result.monthlyPayment.toLocaleString()}</p>
            <p className="text-xs font-bold uppercase tracking-widest opacity-40 mt-2">Principal & Interest</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <p className="text-xs uppercase font-bold opacity-40 tracking-widest mb-1 text-primary">Total Interest</p>
              <p className="text-2xl font-black text-slate-900">${result.totalInterest.toLocaleString()}</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <p className="text-xs uppercase font-bold opacity-40 tracking-widest mb-1 text-green-600">Loan Amount</p>
              <p className="text-2xl font-black text-slate-900">${result.totalLoan.toLocaleString()}</p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg text-center">
            <span className="text-xs opacity-40 mr-2 uppercase font-bold">Total Vehicle Cost:</span>
            <span className="font-bold text-slate-900">${result.totalCost.toLocaleString()}</span>
          </div>
        </div>
      ) : (
        <div className="py-12 text-center text-muted opacity-40 italic">Adjust details to see payment estimate.</div>
      )}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        Buying a car involves more than just the sticker price. This calculator helps you see the true cost of ownership.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Vehicle Price:</strong> The agreed purchase price before taxes and fees.</li>
        <li><strong>Down Payment:</strong> Cash you pay upfront to reduce the loan amount.</li>
        <li><strong>Trade-In:</strong> The value of your current car if you sell it to the dealer.</li>
        <li><strong>Loan Term:</strong> Common terms are 36, 48, 60, or 72 months.</li>
      </ul>
    </div>
  );

  const formula = "M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]";

  const examples = [
    {
      title: "Average New Car",
      description: "A $40,000 car with $5,000 down, a 60-month term, and a 6% interest rate results in a monthly payment of roughly $676."
    },
    {
      title: "Aggressive Payoff",
      description: "Shortening the term from 60 to 36 months increases the monthly payment but saves thousands in interest charges."
    }
  ];

  const faqs = [
    {
      q: "Does trade-in value reduce sales tax?",
      a: "In many US states, you only pay sales tax on the 'net' price (Vehicle Price - Trade-in Value), which can save you hundreds of dollars."
    },
    {
      q: "What is a good interest rate for an auto loan?",
      a: "Rates vary by credit score and market conditions. Top-tier scores often get rates between 3-6%, while subprime rates can exceed 15%."
    }
  ];

  return (
    <CalculatorLayout
      title="Auto Loan Calculator"
      seoTitle="Auto Loan Calculator - Monthly Car Payment Estimator"
      description="Calculate your monthly car loan payments, total interest, and vehicle cost. Plan your next vehicle purchase with our professional auto loan tool."
      path="/finance/auto-loan-calculator"
      icon={Car}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
    />
  );
}
