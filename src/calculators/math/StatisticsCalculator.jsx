import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

export default function StatisticsCalculator() {
  const [dataInput, setDataInput] = useState('10, 20, 30, 40, 50');
  const [result, setResult] = useState(null);

  const calculateStats = () => {
    // 1. Parse and clean data
    const nums = dataInput
      .split(/[, \s]+/)
      .map(Number)
      .filter(n => !isNaN(n));

    if (nums.length === 0) return;

    // 2. Mean
    const mean = nums.reduce((a, b) => a + b, 0) / nums.length;

    // 3. Median
    const sorted = [...nums].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

    // 4. Mode
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
    const mode = modes.length === nums.length ? 'None' : modes.join(', ');

    // 5. Range
    const rangeResult = Math.max(...nums) - Math.min(...nums);

    setResult({
        mean: mean.toFixed(2),
        median,
        mode,
        range: rangeResult,
        count: nums.length,
        min: Math.min(...nums),
        max: Math.max(...nums)
    });
  };

  useEffect(() => {
    calculateStats();
  }, [dataInput]);

  return (
    <div className="container">
      <SEO 
        title="Mean Median Mode Range Calculator – Free Statistics Tool" 
        description="Find the average, middle value, most frequent value, and spread of your data. Fast, free statistics calculator for mean, median, mode, and range." 
        path="/math/average-calculator"
      />
      
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8 px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-center">Mean, Median, Mode & Range Calculator</h1>
        
        <div className="grid gap-8 lg:grid-cols-2">
           <div className="card shadow-lg border-2 border-primary-light">
              <h2 className="text-xl font-bold mb-4">Dataset Input</h2>
              <p className="text-sm text-muted mb-4">Enter your numbers separated by commas, spaces, or new lines.</p>
              <textarea 
                className="input-field h-48 font-mono text-lg"
                value={dataInput}
                onChange={e => setDataInput(e.target.value)}
              />
           </div>

           <div>
              <div className="card highlight-border bg-primary text-white sticky top-24 shadow-2xl">
                 <h2 className="text-xl font-bold mb-8">Statistical Summary</h2>
                 
                 {result ? (
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white bg-opacity-10 rounded-lg text-center border-l-4 border-success">
                            <p className="text-[10px] uppercase font-bold opacity-70 mb-1">Mean (Average)</p>
                            <p className="text-2xl font-black">{result.mean}</p>
                        </div>
                        <div className="p-4 bg-white bg-opacity-10 rounded-lg text-center border-l-4 border-white">
                            <p className="text-[10px] uppercase font-bold opacity-70 mb-1">Median (Middle)</p>
                            <p className="text-2xl font-black">{result.median}</p>
                        </div>
                        <div className="p-4 bg-white bg-opacity-10 rounded-lg text-center border-l-4 border-orange-300">
                            <p className="text-[10px] uppercase font-bold opacity-70 mb-1">Mode (Frequent)</p>
                            <p className="text-2xl font-black">{result.mode}</p>
                        </div>
                        <div className="p-4 bg-white bg-opacity-10 rounded-lg text-center border-l-4 border-red-300">
                            <p className="text-[10px] uppercase font-bold opacity-70 mb-1">Range (Spread)</p>
                            <p className="text-2xl font-black">{result.range}</p>
                        </div>

                        <div className="col-span-2 pt-4 border-t border-white border-opacity-10 text-center opacity-80 text-sm italic">
                           <span>{result.count} values calculated from min {result.min} to max {result.max}</span>
                        </div>
                    </div>
                 ) : (
                    <div className="py-12 text-center opacity-40">Enter data.</div>
                 )}
              </div>
           </div>
        </div>

        {/* SEO CONTENT */}
        <section className="mt-16 space-y-12">
            <div className="card">
                <h2 className="text-2xl font-bold mb-4">What is Mean, Median, Mode, and Range?</h2>
                <p className="text-muted leading-relaxed">
                    In statistics, there are four primary ways to describe a dataset. These measurements provide a summary of the data, helping you find the average, the central point, the most frequent value, and the overall spread of your numbers. Our free calculator provides all four metrics instantly, saving time for students and researchers.
                </p>
            </div>

            <div className="card">
                <h2 className="text-2xl font-bold mb-4">How to Calculate the Statistics</h2>
                <div className="space-y-6 text-sm text-muted leading-relaxed">
                    <div>
                        <p className="font-bold text-primary">1. Mean (Arithmetic Average)</p>
                        <p>The sum of all numbers divided by the count. <i>Formula: (a+b+c) / 3</i></p>
                    </div>
                    <div>
                        <p className="font-bold text-primary">2. Median (Middle Value)</p>
                        <p>The number in the middle of a sorted list. If the list is even, it's the average of the two middle numbers.</p>
                    </div>
                    <div>
                        <p className="font-bold text-primary">3. Mode (Most Frequent Value)</p>
                        <p>The number that appears most often in the set. A dataset can have one mode, multiple modes, or no mode at all.</p>
                    </div>
                    <div>
                        <p className="font-bold text-primary">4. Range (The Spread)</p>
                        <p>The difference between the largest number and the smallest number. <i>Formula: Max - Min</i></p>
                    </div>
                </div>
            </div>

            <div className="card">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold text-lg mb-1">When is median more useful than mean?</h3>
                        <p className="text-muted">The median is often more useful when a dataset contains extreme "outliers" (very high or very low numbers), as the mean can be skewed by those extremes. For example, household income is usually measured by median.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-1">Can a set of numbers have no mode?</h3>
                        <p className="text-muted">Yes. If every number in your set appears the same number of times (e.g., 1, 2, 3), the set is said to have no mode.</p>
                    </div>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
}
