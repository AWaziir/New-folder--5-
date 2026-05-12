import React, { useState, useEffect } from 'react';
import { Sigma } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function AverageCalculator() {
  const [numbersIn, setNumbersIn] = useState('10, 20, 30, 40, 50');
  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateAverage();
  }, [numbersIn]);

  const calculateAverage = () => {
    const nums = numbersIn.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
    if (nums.length === 0) {
      setResult(null);
      return;
    }

    const sum = nums.reduce((a, b) => a + b, 0);
    const avg = sum / nums.length;
    const count = nums.length;

    setResult({ avg: avg.toFixed(2), sum, count });
  };

  const inputs = (
    <div className="space-y-4">
      <label className="input-label">Enter numbers separated by commas, spaces, or new lines</label>
      <textarea 
        className="input-field min-h-[200px] font-mono text-sm leading-relaxed" 
        value={numbersIn} 
        onChange={e => setNumbersIn(e.target.value)} 
        placeholder="e.g. 10, 20, 30, 40"
      />
    </div>
  );

  const results = (
    <div className="space-y-6">
      {result ? (
        <div className="space-y-6">
          <div className="p-8 bg-primary/5 rounded-2xl text-center border border-primary/20 shadow-inner">
            <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Arithmetic Mean (Average)</p>
            <p className="text-6xl font-black text-slate-900">{result.avg}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <p className="text-xs uppercase font-bold opacity-50 mb-1">Count</p>
              <p className="text-2xl font-bold text-slate-900">{result.count}</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <p className="text-xs uppercase font-bold opacity-50 mb-1">Total Sum</p>
              <p className="text-2xl font-bold text-slate-900">{result.sum.toLocaleString()}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-12 text-center text-muted opacity-40 italic">
          Enter a list of numbers to see results.
        </div>
      )}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        The Arithmetic Mean is the most common type of average. It is found by adding up all the numbers in a data set and then dividing by the count of those numbers.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Input:</strong> You can paste large lists of numbers directly into the field.</li>
        <li><strong>Delimiters:</strong> The calculator accepts commas, spaces, or new lines as separators.</li>
        <li><strong>Real-time:</strong> Results update instantly as you type.</li>
      </ul>
    </div>
  );

  const formula = "Mean = Sum of Items / Number of Items";

  const examples = [
    {
      title: "Class Test Scores",
      description: "Scores: 85, 90, 78, 92, 88. The sum is 433, divided by 5 students, resulting in an average of 86.6."
    },
    {
      title: "Weekly Grocery Spend",
      description: "If you spent $120, $150, $110, and $140 over 4 weeks, your average weekly spend is $130."
    }
  ];

  const faqs = [
    {
      q: "Is the mean the same as the median?",
      a: "No. The mean is the total sum divided by the count. The median is the 'middle' number when all values are sorted in order. This calculator specifically calculates the mean."
    },
    {
      q: "Does this handle negative numbers?",
      a: "Yes, the calculator correctly accounts for negative values in both the sum and the final average calculation."
    }
  ];

  return (
    <CalculatorLayout 
      title="Average Calculator"
      seoTitle="Average Calculator - Find the Mean, Sum & Count"
      description="Quickly calculate the arithmetic mean (average), total sum, and count for any set of numbers. Fast, free, and supports large data sets."
      path="/math/average-calculator"
      icon={Sigma}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
    />
  );
}
