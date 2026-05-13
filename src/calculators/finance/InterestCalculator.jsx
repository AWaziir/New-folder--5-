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
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">The Magic of Compound Interest</h3>
        <p className="text-slate-500 leading-relaxed">
          Albert Einstein once called compound interest the "eighth wonder of the world." Unlike simple interest, which is only calculated on the initial amount you deposit, compound interest is calculated on the initial principal AND all the accumulated interest from previous periods. This creates a "snowball effect" where your wealth grows at an accelerating rate over time.
        </p>
      </div>

      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <h4 className="font-bold text-slate-900 mb-4">Key Variables to Consider:</h4>
        <ul className="space-y-3 text-slate-600">
          <li><strong>Initial Principal:</strong> This is your starting point. The larger the initial seed, the more interest it generates from day one.</li>
          <li><strong>Annual Interest Rate:</strong> Your expected rate of return. Even a 1% difference can lead to a massive variance in your final balance over 20 or 30 years.</li>
          <li><strong>Investment Term:</strong> Time is the most critical ingredient in compounding. The longer you leave your money untouched, the more dramatic the growth curve becomes.</li>
          <li><strong>Compounding Frequency:</strong> This determines how often the interest is calculated and added back to your balance. Daily compounding generates more wealth than annual compounding.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">Why Time Matters More Than Money</h3>
        <p className="text-slate-500 leading-relaxed">
          Our calculator demonstrates that starting early is often more important than starting with a lot of money. By visualizing the growth of your principal, you can see exactly when the "interest on interest" begins to outpace your initial contribution, which is the hallmark of true financial independence.
        </p>
      </div>
    </div>
  );

  const formula = "A = P(1 + r/n)^(nt)";

  const examples = [
    {
      title: "The $10k Long-Term Challenge",
      description: "If you invest $10,000 at a 7% interest rate compounded monthly for 30 years, you will end up with over $81,100. This example shows how a modest initial investment can octuple in value over a career lifespan."
    },
    {
      title: "Impact of Compounding Frequency",
      description: "Compounding $5,000 daily vs annually at 5% over 10 years results in a difference of about $35. While it seems small, on a $1,000,000 portfolio, that difference grows to thousands of dollars every single year."
    }
  ];

  const faqs = [
    {
      q: "What is the 'Rule of 72'?",
      a: "The Rule of 72 is a quick mental math shortcut used to estimate how long it will take for your money to double at a fixed annual interest rate. Simply divide 72 by your interest rate. For example, if you earn 6% interest, your money will double in approximately 12 years (72 / 6 = 12)."
    },
    {
      q: "Does this calculator include taxes or inflation?",
      a: "No. This tool calculates gross returns. In the real world, you should account for 'Real Returns' by subtracting the inflation rate and potential capital gains taxes from your final balance to see your actual purchasing power."
    },
    {
      q: "What is the difference between APR and APY?",
      a: "APR (Annual Percentage Rate) does not account for compounding within the year, while APY (Annual Percentage Yield) does. This calculator uses the compounding frequency you select to give you an accurate APY-based final balance."
    },
    {
      q: "Is compounding interest good for debt?",
      a: "Compounding is a double-edged sword. While it builds wealth in savings, it also accelerates the growth of debt (like credit card balances). Always prioritize paying off high-interest compound debt before focusing on low-interest compound savings."
    }
  ];

  const whyUse = [
    { title: "Wealth Forecasting", text: "Predict your future financial status with high precision by modeling different interest and time scenarios." },
    { title: "Strategic Saving", text: "Determine exactly how much you need to save today to reach a specific financial goal in the future." },
    { title: "Investment Analysis", text: "Evaluate the true potential of different investment vehicles by comparing their compounding frequencies." },
    { title: "Educational Insight", text: "Visually understand why 'time in the market' beats 'timing the market' through the power of growth curves." }
  ];

  const keyFeatures = [
    { title: "Custom Compounding", text: "Toggle between daily, monthly, quarterly, and annual compounding to see the subtle but powerful impact on your returns." },
    { title: "Instant Feedback", text: "Results recalculate the moment you change a single digit, allowing for rapid experimentation with your financial goals." },
    { title: "Large Scale Math", text: "Our engine handles massive principal amounts and long terms with floating-point precision for institutional-grade accuracy." }
  ];

  const proTips = [
    "Start as early as possible. Ten years of compounding in your 20s is worth more than thirty years of compounding in your 50s.",
    "Small increases in your interest rate make a massive difference; always shop around for the best high-yield savings accounts.",
    "Reinvest your dividends! Compound interest only works if you keep the 'interest earned' inside the account to generate its own interest.",
    "Beware of fees. A 1% management fee can eat up to 25% of your total compounded wealth over 30 years.",
    "Use the 'Daily' compounding option if you're modeling modern high-yield savings accounts or crypto staking rewards."
  ];

  const relatedTools = [
    { name: "Investment ROI", path: "/finance/investment-calculator" },
    { name: "Savings Calculator", path: "/finance/savings-calculator" },
    { name: "Roth IRA Calc", path: "/finance/roth-ira-calculator" },
    { name: "401k Calculator", path: "/finance/401k-calculator" }
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
      whyUse={whyUse}
      keyFeatures={keyFeatures}
      proTips={proTips}
      relatedTools={relatedTools}
    />
  );
}
