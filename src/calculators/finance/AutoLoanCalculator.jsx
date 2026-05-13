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
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">Master Your Vehicle Financing</h3>
        <p className="text-slate-500 leading-relaxed">
          Buying a car is the second largest purchase most people make, yet many buyers focus only on the monthly payment rather than the total cost of the loan. Our professional Auto Loan Calculator empowers you to see the big picture. By factoring in sales tax, trade-in values, and down payments, you can walk into a dealership with the data you need to negotiate a fair deal.
        </p>
      </div>

      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <h4 className="font-bold text-slate-900 mb-4">Understanding the Inputs:</h4>
        <ul className="space-y-3 text-slate-600">
          <li><strong>Vehicle Price:</strong> The 'sticker price' or negotiated price of the car before any taxes, titles, or registration fees are added.</li>
          <li><strong>Down Payment:</strong> The cash you provide upfront. Every dollar you put down reduces your interest costs and monthly burden.</li>
          <li><strong>Trade-In Value:</strong> The amount the dealer gives you for your current car. In many jurisdictions, this also reduces the amount of sales tax you owe.</li>
          <li><strong>Loan Term:</strong> The number of months you have to pay back the loan. Shorter terms (36-48 months) save money on interest, while longer terms (72-84 months) lower the monthly payment but cost far more in the long run.</li>
          <li><strong>Sales Tax:</strong> A percentage based on your local state or province. This is added to the vehicle price and often rolled into the loan principal.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">The True Cost of Ownership</h3>
        <p className="text-slate-500 leading-relaxed">
          Our tool calculates the 'Total Vehicle Cost', which includes the original price, the sales tax, and every dollar of interest you will pay over the life of the loan. This 'Out-the-Door' number is the most important metric for determining if a car truly fits your long-term financial plan.
        </p>
      </div>
    </div>
  );

  const formula = "M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]";

  const examples = [
    {
      title: "The Standard New Car Deal",
      description: "A $40,000 SUV with a $5,000 down payment, a 60-month term, and a 6.5% interest rate results in a monthly payment of approximately $685. This illustrates how even with a down payment, a significant portion of your monthly budget goes toward the vehicle."
    },
    {
      title: "Saving Through Shorter Terms",
      description: "Taking a $25,000 loan at 5% interest over 36 months vs 72 months. The 36-month term requires $750/mo but costs only $1,980 in interest. The 72-month term costs $403/mo but nearly $4,000 in interest—double the cost of borrowing."
    }
  ];

  const faqs = [
    {
      q: "Does a trade-in reduce my sales tax?",
      a: "In many US states and regions, you only pay sales tax on the 'net' purchase price (Vehicle Price minus Trade-in Value). This 'tax credit' can save you hundreds of dollars compared to selling your car privately and then buying a new one without a trade-in."
    },
    {
      q: "What is a 'Good' auto loan interest rate?",
      a: "Interest rates are heavily dependent on your credit score. Borrowers with 'Excellent' credit (720+) can often secure rates between 4% and 6%. Borrowers with 'Fair' or 'Poor' credit may face rates exceeding 15%. Always check with a local credit union before accepting dealer financing."
    },
    {
      q: "Should I choose a 72-month or 84-month loan?",
      a: "While these long-term loans make expensive cars 'affordable' on a monthly basis, they are generally discouraged. You may end up 'underwater' (owing more than the car is worth) for most of the loan term, and you will pay thousands of extra dollars in interest."
    },
    {
      q: "Can I pay off my auto loan early?",
      a: "Most modern auto loans do not have prepayment penalties, meaning you can save money on interest by paying more than the minimum each month. However, always check your specific loan contract for 'precompute' interest clauses which might negate the benefits of early payoff."
    }
  ];

  const whyUse = [
    { title: "Dealer Independence", text: "Walk into the dealership knowing exactly what your payment should be, preventing 'payment packing' and hidden dealer markups." },
    { title: "Budget Protection", text: "Ensure your total transportation costs (including insurance and maintenance) don't exceed 15-20% of your take-home pay." },
    { title: "Tax Optimization", text: "Calculate the impact of sales tax and trade-in credits before you sign, helping you choose the most tax-efficient way to buy." },
    { title: "Loan Comparison", text: "Easily compare financing offers from banks, credit unions, and dealerships to find the lowest total cost of borrowing." }
  ];

  const keyFeatures = [
    { title: "Tax-Inclusive Math", text: "Unlike basic calculators, we include local sales tax estimates to give you a true 'out-the-door' price prediction." },
    { title: "Trade-In Logic", text: "Factor in the equity from your current vehicle to see how it slashes your monthly commitment and total interest." },
    { title: "Live Updates", text: "See your payment change in real-time as you tweak your interest rate or loan term, allowing for instant scenario testing." }
  ];

  const proTips = [
    "Aim to put at least 20% down to avoid being 'upside down' on your loan as the car depreciates.",
    "Get pre-approved for a loan from your bank or credit union before visiting the dealership.",
    "Keep your loan term to 60 months or less to minimize total interest and maintain equity.",
    "Check your credit report months in advance to ensure you qualify for the lowest possible interest rates.",
    "Don't forget to budget for gap insurance if you're making a small down payment on a new car."
  ];

  const relatedTools = [
    { name: "Auto Lease Calc", path: "/finance/auto-lease-calculator" },
    { name: "Loan Calculator", path: "/finance/loan-calculator" },
    { name: "Fuel Cost Calc", path: "/other/fuel-cost-calculator" },
    { name: "House Affordability", path: "/finance/house-affordability" }
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
      whyUse={whyUse}
      keyFeatures={keyFeatures}
      proTips={proTips}
      relatedTools={relatedTools}
    />
  );
}
