import React, { useState, useEffect } from 'react';
import { Sigma } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function StatisticsCalculator() {
  const [dataInput, setDataInput] = useState('10, 20, 30, 40, 50');
  const [result, setResult] = useState(null);

  const calculateStats = () => {
    // Parse and clean data
    const nums = dataInput
      .split(/[, \s]+/)
      .map(Number)
      .filter(n => !isNaN(n));

    if (nums.length === 0) return;

    // Mean
    const mean = nums.reduce((a, b) => a + b, 0) / nums.length;

    // Median
    const sorted = [...nums].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

    // Mode
    const counts = {};
    nums.forEach(n => counts[n] = (counts[n] || 0) + 1);
    let maxCount = 0;
    let modes = [];
    for (const n in counts) {
        if (counts[n] > maxCount) {
            maxCount = counts[n];
            modes = [Number(n)];
        } else if (counts[n] === maxCount) {
            modes.push(Number(n));
        }
    }
    const modeStr = modes.length === nums.length ? 'None' : modes.join(', ');

    // Range
    const rangeResult = Math.max(...nums) - Math.min(...nums);

    setResult({
        mean: mean.toFixed(2),
        median,
        mode: modeStr,
        range: rangeResult,
        count: nums.length,
        min: Math.min(...nums),
        max: Math.max(...nums)
    });
  };

  useEffect(() => {
    calculateStats();
  }, [dataInput]);

  const inputs = (
    <div className="space-y-4">
      <label className="input-label">Enter numbers separated by commas, spaces, or new lines</label>
      <textarea 
        className="input-field min-h-[250px] font-mono text-lg font-bold leading-relaxed" 
        value={dataInput} 
        onChange={e => setDataInput(e.target.value)} 
        placeholder="e.g. 10, 20, 30, 40"
      />
    </div>
  );

  const results = (
    <div className="space-y-6">
      {result ? (
        <div className="space-y-6">
          <div className="p-10 bg-primary/5 rounded-2xl text-center border border-primary/20 shadow-inner group transition-all">
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-2">Arithmetic Mean</p>
            <p className="text-7xl font-black text-slate-900 group-hover:scale-105 transition-transform">{result.mean}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-50 mb-1">Median</p>
              <p className="text-2xl font-black text-slate-900">{result.median}</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-50 mb-1 text-pink-400">Mode</p>
              <p className="text-2xl font-black text-pink-400">{result.mode}</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-50 mb-1 text-green-600">Range</p>
              <p className="text-2xl font-black text-green-600">{result.range}</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-50 mb-1 text-primary-light">Count</p>
              <p className="text-2xl font-black text-primary-light">{result.count}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-12 text-center text-muted opacity-40 italic">
          Enter data to see summary...
        </div>
      )}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        In statistics, there are four primary ways to describe a dataset. These measurements provide a summary of the data, helping you find the average, the central point, the most frequent value, and the overall spread of your numbers.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Mean:</strong> The total sum divided by the count.</li>
        <li><strong>Median:</strong> The middle number in a sorted list.</li>
        <li><strong>Mode:</strong> The value that appears most frequently.</li>
        <li><strong>Range:</strong> The distance between the highest and lowest values.</li>
      </ul>
    </div>
  );

  const formula = "Mean = Σx / n";

  const examples = [
    {
      title: "Exam Scores",
      description: "Scores: 85, 90, 78, 92, 88. Result: Mean 86.6, Median 88, Range 14."
    },
    {
      title: "Store Sales",
      description: "Daily sales values can be processed to find the representative 'typical' day using the median."
    }
  ];

  const faqs = [
    {
      q: "Mean vs Median?",
      a: "The mean can be skewed by extreme outliers. The median is often better for representing 'typical' values in skewed data, like household income."
    },
    {
      q: "Can there be multiple modes?",
      a: "Yes. If two numbers appear with the same maximum frequency, the dataset is bimodal."
    }
  ];

  return (
    <CalculatorLayout 
      title="Statistics Calculator"
      seoTitle="Mean Median Mode Range Calculator - Statistical Summary Tool"
      description="Find the average, middle value, most frequent value, and spread of your data. Fast, free statistics calculator for mean, median, mode, and range."
      path="/math/statistics-calculator"
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
