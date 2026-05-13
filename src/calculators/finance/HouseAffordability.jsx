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
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">How Much House Can You Truly Afford?</h3>
        <p className="text-slate-500 leading-relaxed">
          The most common mistake new home buyers make is looking at properties before understanding their actual buying power. Our House Affordability Calculator uses the industry-standard <strong>28/36 Rule</strong> to provide a realistic estimate of the maximum home price you can sustain without becoming "house poor."
        </p>
      </div>

      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <h4 className="font-bold text-slate-900 mb-4">The 28/36 Rule Explained:</h4>
        <ul className="space-y-4 text-slate-600">
          <li className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold text-xs">1</div>
            <div>
              <span className="font-bold text-slate-900">The 28% Front-End Ratio:</span>
              <p className="text-sm mt-1">Lenders typically prefer that your total monthly housing costs (principal, interest, taxes, and insurance) do not exceed 28% of your gross monthly income.</p>
            </div>
          </li>
          <li className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold text-xs">2</div>
            <div>
              <span className="font-bold text-slate-900">The 36% Back-End Ratio:</span>
              <p className="text-sm mt-1">Your total monthly debt obligations (including the new mortgage PLUS car loans, student loans, and credit card minimums) should not exceed 36% of your gross income.</p>
            </div>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">Beyond the Mortgage</h3>
        <p className="text-slate-500 leading-relaxed">
          While this calculator gives you a "Max Price," it's important to remember that owning a home involves additional costs like property taxes, homeowners insurance, maintenance (typically 1% of the home value per year), and utilities. We recommend aiming for a price slightly below your maximum to ensure you have a financial safety net for life's surprises.
        </p>
      </div>
    </div>
  );

  const formula = "Mortgage P&I = P * [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]";

  const examples = [
    {
      title: "The Dual-Income Household",
      description: "A couple earning a combined $120,000 annually with $600 in monthly student loan payments and a $40,000 down payment. At a 6% interest rate, they could comfortably afford a home priced around $480,000 while staying within safe debt-to-income limits."
    },
    {
      title: "The Debt-Free Single Buyer",
      description: "A buyer earning $80,000 with zero monthly debt and $30,000 saved for a down payment. Because they have no existing debt, they can maximize their 36% ratio, allowing them to afford a home up to $310,000, roughly 4x their annual salary."
    }
  ];

  const faqs = [
    {
      q: "What is 'Gross Annual Income'?",
      a: "This is your total income before any taxes or deductions are taken out. For self-employed individuals, lenders usually look at the net profit shown on your last two years of tax returns."
    },
    {
      q: "What should I include in 'Monthly Debt'?",
      a: "Include any recurring debt payments with 10 or more months remaining. This includes car loans, student loans, child support, alimony, and the minimum payments on all credit cards. Do not include utilities or groceries."
    },
    {
      q: "Can I afford more if I have a 20% down payment?",
      a: "Yes! A larger down payment reduces the amount you need to borrow, which lowers your monthly interest costs. It also eliminates the need for Private Mortgage Insurance (PMI), which can save you $100-$300 per month, directly increasing your home buying power."
    },
    {
      q: "How do interest rates affect affordability?",
      a: "Interest rates have a massive impact. A 1% increase in interest rates can reduce your home buying power by approximately 10%. For example, if you can afford a $400,000 home at 5%, you might only afford a $360,000 home at 6%."
    },
    {
      q: "What is PITI?",
      a: "PITI stands for Principal, Interest, Taxes, and Insurance. These four components make up your total monthly housing payment. This calculator focuses on P&I, so ensure you have extra room in your budget for the 'T' and 'I'."
    }
  ];

  const whyUse = [
    { title: "Confidence in Shopping", text: "Filter out homes that are financially out of reach before you fall in love with them, saving time and emotional energy." },
    { title: "Lender Preparation", text: "Enter your pre-approval meeting with a clear understanding of your debt-to-income ratios and what a bank is likely to offer." },
    { title: "Financial Stability", text: "Ensure your mortgage payment doesn't prevent you from saving for retirement, vacations, or your children's education." },
    { title: "Market Realism", text: "Adjust interest rates to see how changing market conditions affect your ability to buy in specific neighborhoods." }
  ];

  const keyFeatures = [
    { title: "Dual-Ratio Logic", text: "Our engine simultaneously calculates both the 28% and 36% ratios to ensure you meet the most stringent lender requirements." },
    { title: "Debt Sensitivity", text: "See exactly how much more home you could afford if you paid off your car or student loans before applying for a mortgage." },
    { title: "Instant Scenarios", text: "Toggle between 15-year and 30-year terms to see how loan duration impacts your maximum purchase price." }
  ];

  const proTips = [
    "Pay off small high-interest debts before applying for a mortgage to instantly boost your 'Back-End' ratio.",
    "Don't forget to save an additional 2-3% of the home price for closing costs—don't use your entire savings for the down payment.",
    "Lenders 'stress test' your income. If your income is variable (commission/bonus), use a conservative 2-year average.",
    "A higher credit score doesn't just lower your rate; it also lowers your PMI costs, further increasing affordability.",
    "Consider the 'total cost of living' in a new home, including property taxes which vary wildly by zip code."
  ];

  const relatedTools = [
    { name: "Mortgage Calculator", path: "/finance/mortgage-calculator" },
    { name: "Rent vs Buy Calc", path: "/finance/rent-vs-buy" },
    { name: "Mortgage Payoff", path: "/finance/mortgage-payoff" },
    { name: "Real Estate ROI", path: "/finance/real-estate-calculator" }
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
      whyUse={whyUse}
      keyFeatures={keyFeatures}
      proTips={proTips}
      relatedTools={relatedTools}
    />
  );
}
