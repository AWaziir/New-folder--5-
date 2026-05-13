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
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">How to Use the Mortgage Calculator</h3>
        <p className="text-slate-500 leading-relaxed">
          Planning for a home is one of the biggest financial decisions you'll ever make. Our professional Mortgage Calculator helps you strip away the complexity of home financing. By inputting your purchase details, you can understand exactly how much your monthly principal and interest payments will be, allowing you to budget with confidence and explore different financial scenarios.
        </p>
      </div>
      
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <h4 className="font-bold text-slate-900 mb-4">Step-by-Step Guide:</h4>
        <ol className="list-decimal pl-5 space-y-3 text-slate-600">
          <li><strong>Enter the Home Price:</strong> This is the total purchase price of the property you are looking to buy.</li>
          <li><strong>Enter your Down Payment:</strong> The amount of cash you're paying upfront. A higher down payment reduces your loan amount and interest costs. A 20% down payment is often recommended to avoid Private Mortgage Insurance (PMI).</li>
          <li><strong>Select Loan Term:</strong> Choose the duration of your loan. While 30 years is the most common, shorter terms like 15 years can save you significant amounts in interest over time.</li>
          <li><strong>Enter Interest Rate:</strong> The annual percentage rate (APR) provided by your lender. Even a small change in this rate can drastically affect your total loan cost.</li>
        </ol>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">Understanding Your Results</h3>
        <p className="text-slate-500 leading-relaxed">
          Once you enter your data, the calculator provides a comprehensive breakdown. The <strong>Monthly Payment</strong> is your core recurring cost. The <strong>Total Interest</strong> shows the cost of borrowing over the full term, and the <strong>Total Loan Cost</strong> gives you the big picture: the principal plus every cent of interest you'll pay.
        </p>
      </div>
    </div>
  );

  const formula = "M = P [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]";

  const examples = [
    {
      title: "First-Time Home Buyer Scenario",
      description: "A buyer purchasing a $400,000 home with a 10% down payment ($40,000) at a 6.5% interest rate for 30 years would have a monthly principal and interest payment of approximately $2,275. This helps the buyer decide if they can afford the monthly carry before talking to a bank."
    },
    {
      title: "The Power of a 15-Year Term",
      description: "Taking a $250,000 loan balance at a 5.5% interest rate for a 15-year term results in monthly payments of $2,042. While the payment is higher than a 30-year term, the homeowner builds equity much faster and saves over $100,000 in interest."
    }
  ];

  const faqs = [
    {
      q: "Does this include property taxes and insurance?",
      a: "No. This calculator focuses on the 'P&I'—Principal and Interest. In many cases, your actual monthly mortgage bill will be higher because it will also include property taxes, homeowners insurance, and potentially Private Mortgage Insurance (PMI) or HOA fees. We recommend adding 1-2% of the home's value for annual taxes and insurance to get a more accurate monthly total."
    },
    {
      q: "How can I lower my monthly mortgage payment?",
      a: "There are three primary levers to lower your monthly payment: 1) Make a larger down payment to reduce the loan principal. 2) Secure a lower interest rate through better credit or points. 3) Extend the loan term (e.g., from 15 to 30 years), though this increases the total interest you pay over time."
    },
    {
      q: "What is PMI and when do I pay it?",
      a: "Private Mortgage Insurance (PMI) is an extra monthly fee required by lenders if your down payment is less than 20% of the home's value. It protects the lender in case of default. Once your home equity reaches 20%, you can typically request to have PMI removed."
    },
    {
      q: "Should I choose a Fixed or Variable Rate?",
      a: "A Fixed-Rate mortgage offers stability as your interest rate never changes. A Variable or Adjustable-Rate Mortgage (ARM) may offer a lower starting rate but can increase significantly over time based on market conditions. This calculator helps you model the 'worst-case' by inputting higher potential rates."
    },
    {
      q: "How do extra payments affect my mortgage?",
      a: "Making even one extra payment per year toward your principal can shave years off your loan term and save you thousands in interest. Use our Mortgage Payoff Calculator to see exactly how much you can save by paying extra."
    }
  ];

  const whyUse = [
    { title: "Precision Planning", text: "Accurately forecast your monthly housing costs to ensure your new home remains a blessing, not a financial burden." },
    { title: "Smart Comparison", text: "Effortlessly compare different loan scenarios and lender offers side-by-side to find the most cost-effective path to homeownership." },
    { title: "Equity Awareness", text: "Visualize how your payments are split between paying off your debt and paying the bank, helping you plan for future refinancing." },
    { title: "Interest Optimization", text: "Understand the massive impact of interest rates and terms on your total wealth over the next 15 to 30 years." }
  ];

  const keyFeatures = [
    { title: "Real-Time Updates", text: "Experience instant calculations as you adjust your inputs, allowing for rapid-fire scenario testing." },
    { title: "Full Cost Visibility", text: "Go beyond the monthly payment to see the 'True Cost' of your home over the lifetime of the loan." },
    { title: "Mobile Optimized", text: "Access professional financial tools on the go—perfect for checking affordability while at an open house." }
  ];

  const proTips = [
    "Aim for a 20% down payment to eliminate PMI costs and instantly lower your monthly bill.",
    "Improve your credit score before applying; even a 0.5% rate reduction saves a fortune over 30 years.",
    "Consider a 15-year term if your budget allows—you'll own your home sooner and pay far less interest.",
    "Always budget for 'Hidden Costs' like maintenance, repairs, and utilities which aren't in a mortgage payment.",
    "Model your payment at a 1-2% higher interest rate to see if you can still afford the home if rates rise before you lock."
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
