import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

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
    const monthlyGrossIncome = annualIncome / 12;
    const maxMonthlyHousingPayment = Math.min(
        monthlyGrossIncome * 0.28,
        (monthlyGrossIncome * 0.36) - monthlyDebt
    );

    if (maxMonthlyHousingPayment <= 0) {
        setResult(null);
        return;
    }

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

  const inputs = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Gross Annual Income ($)</label>
        <input type="number" className="input-field" value={annualIncome} onChange={e => setAnnualIncome(Number(e.target.value))} />
      </div>

      <div className="input-group">
        <label className="input-label">Monthly Debt Payments ($)</label>
        <input type="number" className="input-field" value={monthlyDebt} onChange={e => setMonthlyDebt(Number(e.target.value))} />
        <p className="text-xs text-muted mt-2 italic">Include car loans, student loans, and credit card minimums.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="input-group">
          <label className="input-label">Down Payment ($)</label>
          <input type="number" className="input-field" value={downPayment} onChange={e => setDownPayment(Number(e.target.value))} />
        </div>
        <div className="input-group">
          <label className="input-label">Interest Rate (%)</label>
          <input type="number" step="0.1" className="input-field" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} />
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">Loan Term (Years)</label>
        <select className="input-field font-bold" value={loanTerm} onChange={e => setLoanTerm(Number(e.target.value))}>
          <option value={30}>30 Years (Standard)</option>
          <option value={20}>20 Years</option>
          <option value={15}>15 Years</option>
          <option value={10}>10 Years</option>
        </select>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6">
      {result ? (
        <div className="space-y-6">
          <div className="p-8 bg-primary/5 rounded-2xl text-center border border-primary/20 shadow-inner group">
            <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Max Home Price</p>
            <p className="text-6xl font-black text-slate-900 group-hover:scale-105 transition">${result.totalPrice.toLocaleString()}</p>
            <p className="text-xs font-bold uppercase tracking-widest opacity-40 mt-2">Based on 28/36 Rule</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <p className="text-xs uppercase font-bold opacity-40 tracking-widest mb-1 text-primary">Loan Amount</p>
              <p className="text-2xl font-black text-slate-900">${result.maxLoan.toLocaleString()}</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <p className="text-xs uppercase font-bold opacity-40 tracking-widest mb-1 text-green-600">Monthly P&I</p>
              <p className="text-2xl font-black text-slate-900">${result.maxMonthlyPayment.toLocaleString()}</p>
            </div>
          </div>

          <div className="p-4 bg-amber-50 rounded-lg text-center border border-amber-200">
            <p className="text-xs text-amber-800 leading-relaxed font-medium">
              Note: This estimate only covers Principal and Interest. Remember to budget for property taxes, insurance (PITI), and maintenance.
            </p>
          </div>
        </div>
      ) : (
        <div className="py-12 text-center text-red-500 bg-red-50 rounded-xl border border-red-200">
          <p className="font-bold">Affordability Warning</p>
          <p className="text-sm mt-2 px-4 italic opacity-80">Your monthly debt exceeds the recommended 36% ratio. Try reducing debt or increasing down payment.</p>
        </div>
      )}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        Finding out "how much house can I afford" is the first step in the home-buying journey. Lenders look at two key ratios.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>28% Front-End Ratio:</strong> Your housing costs shouldn't exceed 28% of your gross monthly income.</li>
        <li><strong>36% Back-End Ratio:</strong> Your total debt (housing + existing debt) shouldn't exceed 36% of your income.</li>
        <li><strong>Down Payment:</strong> A larger down payment reduces your loan size and improves affordability.</li>
      </ul>
    </div>
  );

  const formula = "Mortgage P&I = P * [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]";

  const examples = [
    {
      title: "Average Earner",
      description: "A household earning $100,000 with $400 in monthly debts can typically afford a home around $425,000 with 10% down."
    },
    {
      title: "Debt-Free Buyer",
      description: "Zero monthly debt significantly increases your borrowing power, potentially adding $50,000+ to your maximum home price."
    }
  ];

  const faqs = [
    {
      q: "What is the 28/36 rule?",
      a: "It's a guideline lenders use: spend no more than 28% of gross income on housing and no more than 36% on total debt."
    },
    {
      q: "Does this include property tax?",
      a: "This basic calculator focuses on the loan. In reality, you should add ~1-2% of the home's value per year for taxes and insurance."
    }
  ];

  return (
    <CalculatorLayout
      title="House Affordability Calculator"
      seoTitle="House Affordability Calculator - How Much House Can I Afford?"
      description="Estimate your home buying power based on income, debt, and the 28/36 rule. Discover your maximum house price and monthly mortgage payment."
      path="/finance/house-affordability"
      icon={Home}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
    />
  );
}
