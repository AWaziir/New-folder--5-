import React, { useState, useEffect } from 'react';
import { PiggyBank } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function SavingsCalculator() {
  const [initialBalance, setInitialBalance] = useState(1000);
  const [monthlyContribution, setMonthlyContribution] = useState(100);
  const [interestRate, setInterestRate] = useState(5);
  const [years, setYears] = useState(10);
  
  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateSavings();
  }, [initialBalance, monthlyContribution, interestRate, years]);

  const calculateSavings = () => {
    if (years <= 0) return;

    const n = 12; // Monthly compounding
    const r = interestRate / 100 / n;
    const t = years * n;
    
    // Total = P(1 + r/n)^(nt) + PMT * [((1 + r/n)^(nt) - 1) / (r/n)]
    const futureBalanceFromInitial = initialBalance * Math.pow(1 + r, t);
    let futureBalanceFromContributions;
    if (r === 0) {
      futureBalanceFromContributions = monthlyContribution * t;
    } else {
      futureBalanceFromContributions = monthlyContribution * (Math.pow(1 + r, t) - 1) / r;
    }
    const totalBalance = futureBalanceFromInitial + futureBalanceFromContributions;
    
    const totalContributions = initialBalance + (monthlyContribution * t);
    const totalInterest = totalBalance - totalContributions;

    setResult({
      total: Math.round(totalBalance),
      interest: Math.round(totalInterest),
      contributions: Math.round(totalContributions)
    });
  };

  const inputs = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Initial Savings Balance ($)</label>
        <input type="number" className="input-field text-xl" value={initialBalance} onChange={e => setInitialBalance(Number(e.target.value))} />
      </div>

      <div className="input-group">
        <label className="input-label">Monthly Contribution ($)</label>
        <input type="number" className="input-field text-xl" value={monthlyContribution} onChange={e => setMonthlyContribution(Number(e.target.value))} />
      </div>

      <div className="flex gap-4">
          <div className="input-group flex-1">
              <label className="input-label">Interest Rate (%)</label>
              <input type="number" step="0.1" className="input-field" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} />
          </div>
          <div className="input-group flex-1">
              <label className="input-label">Years of Saving</label>
              <input type="number" className="input-field" value={years} onChange={e => setYears(Number(e.target.value))} />
          </div>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6">
      {result ? (
        <div className="space-y-6">
          <div className="p-6 bg-primary/5 rounded-xl text-center border border-primary/20">
            <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Estimated Total Balance</p>
            <p className="text-5xl font-black text-slate-900">${result.total.toLocaleString()}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg text-center border-l-4 border-success">
                <p className="text-xs uppercase font-bold opacity-70 mb-1">Interest</p>
                <p className="text-xl font-bold text-success">+ ${result.interest.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg text-center border-l-4 border-primary-light">
                <p className="text-xs uppercase font-bold opacity-70 mb-1">Contributions</p>
                <p className="text-xl font-bold text-slate-900">${result.contributions.toLocaleString()}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-12 text-center opacity-40 italic">Enter details to see your growth.</div>
      )}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        Plan your financial future with precision. This calculator projects your savings growth including initial balances, regular monthly contributions, and estimated interest returns.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Initial Savings:</strong> Your current starting balance.</li>
        <li><strong>Monthly Contribution:</strong> How much you plan to save each month.</li>
        <li><strong>Interest Rate:</strong> Your expected annual percentage yield (APY).</li>
        <li><strong>Years:</strong> Your desired savings timeframe.</li>
      </ul>
    </div>
  );

  const formula = "A = P(1+r)ᵗ + PMT × [( (1+r)ᵗ - 1 ) / r]";

  const examples = [
    {
      title: "The Coffee Savings Strategy",
      description: "Saving $200 a month instead of spending it on daily luxures for 10 years at 5% interest turns into over $31,000."
    },
    {
      title: "Long Term Wealth",
      description: "Investing $5,000 initial + $500 monthly at 8% interest for 20 years results in a total balance of approximately $311,000."
    }
  ];

  const faqs = [
    {
      q: "What is APY vs APR?",
      a: "APY (Annual Percentage Yield) reflects the total amount of interest you earn in a year including compounding. APR (Annual Percentage Rate) is the stated interest rate without compounding."
    },
    {
      q: "Is interest usually compounded monthly?",
      a: "Yes, most High Yield Savings Accounts (HYSA) compound interest monthly even if the rate is stated annually."
    }
  ];

  const whyUse = [
    { title: "Visualize Compound Growth", text: "See how money grows exponentially over time when interest earns interest — one of the most powerful forces in personal finance." },
    { title: "Set Savings Goals", text: "Work backward from a target amount to find the monthly contribution needed to reach your goal by a specific date." },
    { title: "Compare Savings Accounts", text: "Instantly see how a 0.5% difference in APY affects your balance over 10–20 years — the difference is often thousands of dollars." },
    { title: "Emergency Fund Planning", text: "Calculate how long it will take to build a 3–6 month emergency fund with your current monthly savings rate." }
  ];

  const keyFeatures = [
    { title: "Monthly Compounding", text: "Calculates interest compounded monthly — matching how most High Yield Savings Accounts (HYSAs) actually work." },
    { title: "Initial Balance Support", text: "Include an existing savings balance so projections reflect your actual starting point, not just future contributions." },
    { title: "Interest vs Contributions", text: "Clearly separates total interest earned from total money you contributed — showing the exact value compounding adds." }
  ];

  const proTips = [
    "High Yield Savings Accounts (HYSAs) often pay 10–20x more than traditional banks. Always shop for the best APY.",
    "Even small increases matter: raising your monthly savings by $50 adds over $7,700 to your balance over 10 years at 5% APY.",
    "The 50/30/20 rule suggests putting 20% of take-home pay toward savings — start there if you're unsure how much to save.",
    "For goals under 5 years, HYSAs or CDs are better than stocks. For 10+ year goals, investing historically outperforms savings accounts.",
    "Automate your savings transfer on payday — paying yourself first removes the temptation to spend first and save what's left."
  ];

  const relatedTools = [
    { name: "Investment Calculator", path: "/finance/investment-calculator" },
    { name: "CD Calculator", path: "/finance/cd-calculator" },
    { name: "Retirement Calculator", path: "/finance/retirement-calculator" },
    { name: "Emergency Fund Calculator", path: "/finance/emergency-fund" }
  ];

  return (
    <CalculatorLayout 
      title="Savings Growth Calculator"
      seoTitle="Savings Calculator - Monthly Contribution & Interest Growth"
      description="Calculate how much your savings will grow over time with compound interest. Plan monthly contributions and visualize the power of consistent saving."
      path="/finance/savings-calculator"
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
