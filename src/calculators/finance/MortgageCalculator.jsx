import React, { useState, useEffect } from 'react';
import { Home as HomeIcon } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

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

  const inputs = (
    <div className="space-y-4">
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

      <button onClick={resetForm} className="btn-outline w-full mt-4 print-hide">
        Reset Values
      </button>
    </div>
  );

  const results = result ? (
    <div className="space-y-6">
      <div className="p-6 bg-primary-dark/30 rounded-2xl border border-primary/30 text-center">
        <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-70">Monthly Payment</p>
        <p className="text-5xl font-black text-primary-light">${Number(result.monthlyPayment).toLocaleString()}</p>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm p-3 bg-white-5 rounded-lg">
          <span className="opacity-70">Principal Amount</span>
          <span className="font-bold">${Number(result.principal).toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-sm p-3 bg-white-5 rounded-lg">
          <span className="opacity-70">Total Interest</span>
          <span className="font-bold text-success">${Number(result.totalInterest).toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-sm p-3 bg-white-5 rounded-lg border-t border-white-10 pt-4 mt-2">
          <span className="font-bold">Total Loan Cost</span>
          <span className="font-bold text-lg">${Number(result.totalPayment).toLocaleString()}</span>
        </div>
      </div>
    </div>
  ) : (
    <div className="py-12 text-center opacity-40">
      Please enter valid numbers to see your results.
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        Planning for a home is one of the biggest financial decisions you'll ever make. Our Mortgage Calculator helps you understand exactly how much your monthly principal and interest payments will be based on the home's price, your down payment, the interest rate, and the loan term.
      </p>
      <ol className="list-decimal pl-5 space-y-2">
        <li><strong>Enter the Home Price:</strong> This is the total purchase price of the property.</li>
        <li><strong>Enter your Down Payment:</strong> The amount of cash you're paying upfront. A 20% down payment is recommended to avoid PMI.</li>
        <li><strong>Select Loan Term:</strong> Choose how many years you'll be paying off the loan (standard is 30 years).</li>
        <li><strong>Enter Interest Rate:</strong> The annual percentage rate provided by your lender.</li>
      </ol>
    </div>
  );

  const formula = "M = P [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]";

  const examples = [
    {
      title: "First-Time Home Buyer",
      description: "A buyer purchasing a $400,000 home with a 10% down payment ($40,000) at a 6.5% interest rate for 30 years would have a monthly principal and interest payment of approximately $2,275."
    },
    {
      title: "Refinancing to 15 Years",
      description: "Alternatively, taking a $250,000 loan balance at a 5.5% interest rate for a 15-year term would result in monthly payments of $2,042, allowing the homeowner to build equity much faster."
    }
  ];

  const faqs = [
    {
      q: "Does this include property taxes and insurance?",
      a: "No. This calculator focuses on the Principal and Interest (P&I). Depending on your location and lender, your actual monthly bill will likely include property taxes, homeowners insurance, and potentially Private Mortgage Insurance (PMI) or HOA fees."
    },
    {
      q: "How can I lower my monthly mortgage payment?",
      a: "The most effective ways to lower your monthly payment are: making a larger down payment, securing a lower interest rate, or extending the loan term (e.g., from 15 to 30 years)."
    },
    {
      q: "What is PMI?",
      a: "Private Mortgage Insurance (PMI) is usually required if your down payment is less than 20%. It protects the lender, not you, and adds an extra monthly cost to your mortgage until you reach 20% equity."
    }
  ];

  return (
    <CalculatorLayout 
      title="Mortgage Calculator"
      seoTitle="Mortgage Calculator - Monthly Repayment & Interest Tool"
      description="Estimate your monthly mortgage payments with our fast, free online tool. Calculate loan totals, interest, and payoff dates instantly."
      path="/finance/mortgage-calculator"
      icon={HomeIcon}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
    />
  );
}
