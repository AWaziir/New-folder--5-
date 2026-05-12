import React, { useState, useEffect } from 'react';
import { Home as HomeIcon, Info } from 'lucide-react';
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
    <div className="space-y-6">
      <div className="calc-input-group">
        <label className="calc-label">Home Price</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
          <input 
            type="number" 
            className="calc-input pl-8" 
            value={homePrice} 
            onChange={e => setHomePrice(Number(e.target.value))} 
          />
        </div>
      </div>

      <div className="calc-input-group">
        <label className="calc-label">Down Payment</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
          <input 
            type="number" 
            className="calc-input pl-8" 
            value={downPayment} 
            onChange={e => setDownPayment(Number(e.target.value))} 
          />
        </div>
      </div>

      <div className="calc-input-group">
        <label className="calc-label">Loan Term</label>
        <select 
          className="calc-input calc-select"
          value={loanTerm}
          onChange={e => setLoanTerm(Number(e.target.value))}
        >
          <option value={10}>10 Years</option>
          <option value={15}>15 Years</option>
          <option value={20}>20 Years</option>
          <option value={30}>30 Years</option>
        </select>
      </div>

      <div className="calc-input-group">
        <label className="calc-label">Annual Interest Rate</label>
        <div className="relative">
          <input 
            type="number" 
            step="0.01"
            className="calc-input pr-10" 
            value={interestRate} 
            onChange={e => setInterestRate(Number(e.target.value))} 
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
        </div>
      </div>

      <button onClick={resetForm} className="w-full py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors border-2 border-dashed border-slate-100 rounded-2xl hover:border-primary/20 hover:bg-primary/5 mt-4">
        Reset Calculation
      </button>
    </div>
  );

  const results = result ? (
    <div className="space-y-8">
      <div className="text-center p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
        <span className="calc-result-badge mb-4">Estimated Monthly Payment</span>
        <div className="calc-result-value">
          <span className="text-2xl align-top mt-2 inline-block mr-1 opacity-40">$</span>
          {Number(result.monthlyPayment).toLocaleString()}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="calc-stat-card">
          <span className="text-sm font-bold text-slate-500">Principal Amount</span>
          <span className="font-black text-slate-900">${Number(result.principal).toLocaleString()}</span>
        </div>
        <div className="calc-stat-card">
          <span className="text-sm font-bold text-slate-500">Total Interest</span>
          <span className="font-black text-emerald-500">${Number(result.totalInterest).toLocaleString()}</span>
        </div>
        <div className="calc-stat-card bg-primary text-white border-none shadow-lg shadow-primary/20">
          <span className="text-sm font-bold opacity-80">Total Loan Cost</span>
          <span className="text-xl font-black">${Number(result.totalPayment).toLocaleString()}</span>
        </div>
      </div>
    </div>
  ) : (
    <div className="py-20 text-center">
      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <Info className="text-slate-300" />
      </div>
      <p className="text-slate-400 font-medium">Enter details to see analysis</p>
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

  const whyUse = [
    { title: "Financial Planning", text: "Crucial for determining if a property fits within your long-term monthly budget." },
    { title: "Comparison Shopping", text: "Compare different loan offers from lenders by seeing the impact of rate changes." },
    { title: "Amortization Insight", text: "Understand how much of your payment goes toward principal vs interest over time." },
    { title: "Down Payment Strategy", text: "See how increasing your upfront cash reduces your monthly burden and total interest." }
  ];

  const keyFeatures = [
    { title: "Dynamic Calculations", text: "Results update instantly as you adjust price, rate, or term sliders." },
    { title: "Total Cost Breakdown", text: "See the true cost of the loan including every dollar of interest paid over 30 years." },
    { title: "Currency Formatting", text: "Professional output with commas and localized currency symbols for clarity." }
  ];

  const proTips = [
    "Aim for a 20% down payment to avoid paying Private Mortgage Insurance (PMI).",
    "Even a 0.5% lower interest rate can save you tens of thousands of dollars over the life of the loan.",
    "Consider a 15-year term if you want to pay off your home faster and save significantly on total interest.",
    "Always check your local property tax rates, as they are not included in this P&I calculation.",
    "Get pre-approved by a lender to know your actual interest rate before starting your home search."
  ];

  const relatedTools = [
    { name: "House Affordability", path: "/finance/house-affordability" },
    { name: "Rent Calculator", path: "/finance/rent-calculator" },
    { name: "Mortgage Payoff", path: "/finance/mortgage-payoff" },
    { name: "Refinance Calculator", path: "/finance/refinance-calculator" }
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
      whyUse={whyUse}
      keyFeatures={keyFeatures}
      proTips={proTips}
      relatedTools={relatedTools}
    />
  );
}
