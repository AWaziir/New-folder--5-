import React, { useState, useEffect } from 'react';
import { CreditCard } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function CreditCardPayoffCalculator() {
  const [balance, setBalance] = useState(5000);
  const [interestRate, setInterestRate] = useState(19.99);
  const [targetType, setTargetType] = useState('monthly'); // monthly or time
  const [targetValue, setTargetValue] = useState(250); // monthly payment or months to payoff

  const [result, setResult] = useState(null);

  useEffect(() => {
    calculatePayoff();
  }, [balance, interestRate, targetType, targetValue]);

  const calculatePayoff = () => {
    const r = interestRate / 100 / 12;
    if (balance <= 0 || r < 0) return;

    if (targetType === 'monthly') {
      const monthlyPayment = targetValue;
      if (monthlyPayment <= balance * r) {
        setResult({ error: 'Monthly payment too low to ever pay off the interest.' });
        return;
      }
      
      let months;
      if (r === 0) {
        months = balance / monthlyPayment;
      } else {
        months = -Math.log(1 - (balance * r) / monthlyPayment) / Math.log(1 + r);
      }
      const totalPaid = monthlyPayment * months;
      const totalInterest = totalPaid - balance;

      setResult({
        months: Math.ceil(months),
        totalInterest: Math.round(totalInterest),
        totalPaid: Math.round(totalPaid),
        monthlyPayment: Math.round(monthlyPayment)
      });
    } else {
      const months = targetValue;
      if (months <= 0) return;
      
      let monthlyPayment;
      if (r === 0) {
        monthlyPayment = balance / months;
      } else {
        monthlyPayment = (balance * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
      }
      const totalPaid = monthlyPayment * months;
      const totalInterest = totalPaid - balance;

      setResult({
        months: Math.round(months),
        totalInterest: Math.round(totalInterest),
        totalPaid: Math.round(totalPaid),
        monthlyPayment: Math.round(monthlyPayment)
      });
    }
  };

  const inputs = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Current Balance ($)</label>
        <input type="number" className="input-field text-xl font-black" value={balance} onChange={e => setBalance(Number(e.target.value))} />
      </div>

      <div className="input-group">
        <label className="input-label">Annual Interest Rate (%)</label>
        <input type="number" step="0.01" className="input-field font-black" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} />
      </div>

      <div className="flex bg-slate-100 p-1 rounded-lg">
          <button 
            className={`flex-1 py-3 rounded-md font-bold transition ${targetType === 'monthly' ? 'bg-primary text-white shadow-md' : 'text-muted'}`}
            onClick={() => { setTargetType('monthly'); setTargetValue(250); }}
          >
              Fix Payment
          </button>
          <button 
            className={`flex-1 py-3 rounded-md font-bold transition ${targetType === 'time' ? 'bg-primary text-white shadow-md' : 'text-muted'}`}
            onClick={() => { setTargetType('time'); setTargetValue(12); }}
          >
              Fix Time
          </button>
      </div>

      <div className="input-group">
         <label className="input-label font-bold">
             {targetType === 'monthly' ? 'Monthly Payment ($)' : 'Desired Months to Pay Off'}
         </label>
         <input type="number" className="input-field text-xl font-black" value={targetValue} onChange={e => setTargetValue(Number(e.target.value))} />
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6">
      {result && !result.error ? (
        <div className="space-y-6 text-center">
          <div className="p-10 bg-primary/5 rounded-2xl border border-primary/20 shadow-inner group transition-all">
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-2">Months to Freedom</p>
            <p className="text-7xl font-black text-slate-900 group-hover:scale-105 transition-transform">
              {result.months}
            </p>
            <p className="text-xs font-bold uppercase tracking-widest opacity-40 mt-2">Target Date: ~{(result.months / 12).toFixed(1)} Years</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60 text-red-600">Total Interest</p>
              <p className="text-2xl font-black text-slate-900">${result.totalInterest.toLocaleString()}</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60 text-green-600">Total Payment</p>
              <p className="text-2xl font-black text-slate-900">${result.totalPaid.toLocaleString()}</p>
            </div>
          </div>

          {targetType === 'time' && (
            <div className="p-5 bg-primary/10 rounded-2xl border border-primary/20">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 text-primary-light">Required Monthly Payment</p>
                <p className="text-3xl font-black text-slate-900">${result.monthlyPayment.toLocaleString()}</p>
            </div>
          )}
        </div>
      ) : result?.error ? (
        <div className="py-12 text-center text-red-600 font-bold px-4">{result.error}</div>
      ) : (
        <div className="py-12 italic opacity-40 text-center">Enter details to see payoff strategy.</div>
      )}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        Crush your credit card debt by visualizing exactly how long it will take to reach zero balance. This tool helps you compare two strategies: paying a fixed amount every month or aiming for a specific debt-free date.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Fixed Payment:</strong> Best for budgeting a specific amount each month to clear debt.</li>
        <li><strong>Fixed Time:</strong> Best for users with a specific goal date (e.g., "I want to be debt-free by December").</li>
      </ul>
    </div>
  );

  const formula = "Months = -log(1 - (Balance*r)/Payment) / log(1 + r)";

  const examples = [
    {
      title: "The Minimum Payment Trap",
      description: "Paying only $100/mo on a $5,000 balance at 21% APR would take nearly 9 years and cost over $6,000 in interest alone."
    },
    {
      title: "Acceleration Strategy",
      description: "By increasing the payment to $250/mo, you clear the same debt in just 2 years and save over $4,500 in interest."
    }
  ];

  const faqs = [
    {
      q: "What is APR?",
      a: "Annual Percentage Rate. It is the yearly cost of borrowing funds, expressed as a percentage."
    },
    {
      q: "Can I pay off my debt faster?",
      a: "Yes. Any amount paid above the minimum reduces the principal balance, which in turn reduces the amount of interest calculated in the following months."
    }
  ];

  return (
    <CalculatorLayout 
      title="Credit Card Payoff"
      seoTitle="Credit Card Payoff Calculator - Debt Freedom Roadmap"
      description="Calculate how long it will take to pay off your credit card balance. Compare fixed monthly payments versus target payoff dates."
      path="/finance/credit-card-calculator"
      icon={CreditCard}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
    />
  );
}
