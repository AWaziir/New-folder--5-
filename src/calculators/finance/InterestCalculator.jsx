import React, { useState, useEffect } from 'react';
import { PiggyBank } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

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

  const inputs = (
    <div className="space-y-6">
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
  );

  const results = (
    <div className="space-y-6">
      {result ? (
        <>
          <div className="p-6 bg-primary/5 rounded-xl text-center border border-primary/20">
            <p className="text-xs font-bold uppercase opacity-80 mb-1">Total Balance</p>
            <p className="text-4xl font-black text-slate-900">${Number(result.totalAmount).toLocaleString()}</p>
          </div>
          
          <div className="p-4 bg-slate-50 rounded-lg text-center border-l-4 border-success">
              <p className="text-xs uppercase font-bold text-success opacity-80 mb-1">Interest Earned</p>
              <p className="text-2xl font-bold text-slate-900">${Number(result.totalInterest).toLocaleString()}</p>
          </div>
        </>
      ) : (
        <div className="py-12 text-center opacity-40">Please enter valid values.</div>
      )}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        Witness the power of compounding. Compound interest is interest calculated on the initial principal, which also includes all of the accumulated interest from previous periods.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Principal:</strong> The initial amount of money you invest or save.</li>
        <li><strong>Interest Rate:</strong> Your estimated annual return or interest percentage.</li>
        <li><strong>Compounding:</strong> How often the interest is added to your balance. The more frequent, the faster your money grows.</li>
      </ul>
    </div>
  );

  const formula = "A = P(1 + r/n)^(nt)";

  const examples = [
    {
      title: "The $10k Challenge",
      description: "Investing $10,000 at a 7% interest rate compounded monthly for 30 years will result in a total balance of over $81,100."
    },
    {
      title: "Daily vs. Annual",
      description: "Compounding $5,000 daily vs annually at 5% over 10 years results in a difference of about $35 – small but significant over large sums and long periods."
    }
  ];

  const faqs = [
    {
      q: "What is the 'Rule of 72'?",
      a: "It is a shortcut to estimate how long it takes to double your money. Divide 72 by your interest rate (e.g., at 6% interest, 72/6 = 12 years to double)."
    },
    {
      q: "Does this include taxes?",
      a: "No. This calculator shows gross growth. In reality, you may need to pay capital gains or income tax on your interest earnings."
    }
  ];

  return (
    <CalculatorLayout 
      title="Compound Interest Calculator"
      seoTitle="Compound Interest Calculator - Savings Growth & Returns"
      description="Calculate how your savings grow over time with the Compound Interest Calculator. See the power of compounding with daily, monthly, or yearly options."
      path="/finance/interest-calculator"
      icon={PiggyBank}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
    />
  );
}
