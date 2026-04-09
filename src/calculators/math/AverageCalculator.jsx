import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';

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

  return (
    <div className="container">
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8">
        <h1 className="text-3xl font-bold mb-2">Average Calculator</h1>
        <p className="text-muted mb-6">Calculate the average (mean), count, and sum for a set of numbers.</p>

        <div className="card">
          <label className="input-label">Enter numbers separated by commas or spaces</label>
          <textarea 
            className="input-field min-h-[150px] mb-4" 
            value={numbersIn} 
            onChange={e => setNumbersIn(e.target.value)} 
            placeholder="e.g. 10, 20, 30, 40"
          />

          {result ? (
            <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <div className="p-6 bg-secondary rounded-lg text-center">
                <p className="text-muted mb-1 font-medium">Average (Mean)</p>
                <p className="text-4xl font-bold text-primary">{result.avg}</p>
              </div>
              <div className="p-6 bg-secondary rounded-lg text-center">
                <p className="text-muted mb-1 font-medium">Count</p>
                <p className="text-3xl font-bold text-primary">{result.count}</p>
              </div>
              <div className="p-6 bg-secondary rounded-lg text-center">
                <p className="text-muted mb-1 font-medium">Sum</p>
                <p className="text-3xl font-bold text-primary">{result.sum}</p>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-muted">
              Enter numbers to see the calculation results.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
