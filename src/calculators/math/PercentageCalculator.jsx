import React, { useState, useEffect } from 'react';
import { Percent } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function PercentageCalculator() {
  const [val1, setVal1] = useState(10);
  const [val2, setVal2] = useState(200);
  const [result1, setResult1] = useState(0);

  const [val3, setVal3] = useState(20);
  const [val4, setVal4] = useState(100);
  const [result2, setResult2] = useState(0);

  useEffect(() => {
    setResult1((val1 / 100) * val2);
  }, [val1, val2]);

  useEffect(() => {
    setResult2(val4 === 0 ? 0 : (val3 / val4) * 100);
  }, [val3, val4]);

  const inputs = (
    <div className="space-y-10">
      <div className="space-y-4">
        <h3 className="font-bold text-sm uppercase opacity-50">Calculate Value</h3>
        <div className="flex items-center gap-3 flex-wrap">
          <span>What is</span>
          <input type="number" className="input-field !w-24 text-center text-xl font-black" value={val1} onChange={e => setVal1(Number(e.target.value))} />
          <span>% of</span>
          <input type="number" className="input-field !w-32 text-center text-xl font-black" value={val2} onChange={e => setVal2(Number(e.target.value))} />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-sm uppercase opacity-50">Calculate Percentage</h3>
        <div className="flex items-center gap-3 flex-wrap">
          <input type="number" className="input-field !w-32 text-center text-xl font-black" value={val3} onChange={e => setVal3(Number(e.target.value))} />
          <span>is what percent of</span>
          <input type="number" className="input-field !w-32 text-center text-xl font-black" value={val4} onChange={e => setVal4(Number(e.target.value))} />
        </div>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6">
      <div className="p-10 bg-primary/5 rounded-2xl border border-primary/20 shadow-inner group transition-all text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-2">Calculated Value</p>
          <p className="text-6xl font-black text-slate-900 group-hover:scale-105 transition-transform">{result1.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
      </div>

      <div className="p-10 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner group transition-all text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-2">Calculated Percentage</p>
          <p className="text-6xl font-black text-primary-light group-hover:scale-105 transition-transform">{result2.toLocaleString(undefined, { maximumFractionDigits: 2 })}%</p>
      </div>
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        Perform common percentage calculations quickly and accurately. Percentages are a fundamental way to express a number as a fraction of 100.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Calculate Value:</strong> Finds a part of a whole (e.g., 20% of 500).</li>
        <li><strong>Calculate Percentage:</strong> Finds how one number relates to another as a ratio of 100.</li>
      </ul>
    </div>
  );

  const formula = "P = (Part / Whole) × 100";

  const examples = [
    {
      title: "Sales Tax Addition",
      description: "If an item costs $200 and sales tax is 10%, calculating 10% of 200 gives you $20 tax."
    },
    {
      title: "Score on a Test",
      description: "Getting 45 correct out of 50 questions? Calculating 45 as a percentage of 50 gives you 90%."
    }
  ];

  const faqs = [
    {
      q: "What does 'Percent' actually mean?",
      a: "The word comes from the Latin 'per centum', meaning 'by the hundred'."
    },
    {
      q: "Can percentages be greater than 100?",
      a: "Yes. For example, 200% of a number is simply double that number."
    }
  ];

  const whyUse = [
    { title: "Everyday Math", text: "Instantly calculate tips, discounts, tax amounts, grade scores, and financial growth without mental arithmetic." },
    { title: "Business & Finance", text: "Calculate profit margins, interest rates, price increases, budget allocations, and financial ratios." },
    { title: "Academic Performance", text: "Convert raw scores to percentages for tests, assignments, and course grades in seconds." },
    { title: "Shopping & Discounts", text: "Know the exact discount amount and final price before you reach the checkout on any sale item." }
  ];

  const keyFeatures = [
    { title: "Two Calculation Modes", text: "Calculate the value of a percentage (e.g., 20% of 500) and find what percentage one number is of another — both in one tool." },
    { title: "Instant Results", text: "Both calculations update in real time as you type — no button press needed." },
    { title: "High Precision", text: "Results display up to 2 decimal places for accurate financial and academic calculations." }
  ];

  const proTips = [
    "To calculate a percentage increase: ((New - Old) / Old) × 100. E.g., price rose from $80 to $100 = 25% increase.",
    "Tip calculation shortcut: 10% of the bill is easy (move decimal left). Double it for 20%, halve it for 5%.",
    "Percentage point vs percentage: if unemployment rises from 5% to 6%, it's a 1 percentage point increase but a 20% relative increase.",
    "For compound interest, percentage calculations compound — 5% per year for 2 years is not 10% total; it's 10.25%.",
    "When comparing percentage changes, always check the base: a 50% gain followed by a 50% loss does not return you to zero — it leaves you at 75% of start."
  ];

  const relatedTools = [
    { name: "Discount Calculator", path: "/finance/discount-calculator" },
    { name: "GST Calculator", path: "/finance/gst-calculator" },
    { name: "Sales Tax Calculator", path: "/finance/sales-tax-calculator" },
    { name: "Ratio Calculator", path: "/math/ratio-calculator" }
  ];

  return (
    <CalculatorLayout 
      title="Percentage Calculator"
      seoTitle="Percentage Calculator - Fast & Accurate Percentage Calculations"
      description="Calculate percentages easily: find the percentage of a number, determine what percent one number is of another, or calculate percentage change. Free and instant."
      path="/math/percentage-calculator"
      icon={Percent}
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
