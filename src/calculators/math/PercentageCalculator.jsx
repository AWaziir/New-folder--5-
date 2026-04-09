import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';

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

  return (
    <div className="container">
      <SEO 
        title="Percentage Calculator Increase and Decrease" 
        description="Learn how to calculate percentage of a number easily with our percentage calculator increase and decrease." 
        path="/math/percentage-calculator"
      />
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8">
        <h1 className="text-3xl font-bold mb-2">Percentage Calculator</h1>
        <p className="text-muted mb-6">Calculate percentage relationships quickly and easily.</p>

        <div className="grid gap-8">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">What IS X% of Y?</h2>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-muted">What is</span>
              <input 
                type="number" 
                className="input-field" 
                style={{ width: '100px' }}
                value={val1} 
                onChange={e => setVal1(Number(e.target.value))} 
              />
              <span className="text-muted">% of</span>
              <input 
                type="number" 
                className="input-field" 
                style={{ width: '150px' }}
                value={val2} 
                onChange={e => setVal2(Number(e.target.value))} 
              />
              <span className="font-bold">=</span>
              <span className="p-2 px-6 bg-secondary rounded-lg font-bold text-primary">{result1.toFixed(2)}</span>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold mb-4">X is what percent of Y?</h2>
            <div className="flex items-center gap-4 flex-wrap">
              <input 
                type="number" 
                className="input-field" 
                style={{ width: '150px' }}
                value={val3} 
                onChange={e => setVal3(Number(e.target.value))} 
              />
              <span className="text-muted">is what percent of</span>
              <input 
                type="number" 
                className="input-field" 
                style={{ width: '150px' }}
                value={val4} 
                onChange={e => setVal4(Number(e.target.value))} 
              />
              <span className="font-bold">=</span>
              <span className="p-2 px-6 bg-secondary rounded-lg font-bold text-primary">{result2.toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
