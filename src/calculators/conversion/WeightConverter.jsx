import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';

export default function WeightConverter() {
  const [value, setValue] = useState(1);
  const [fromUnit, setFromUnit] = useState('kg');
  const [toUnit, setToUnit] = useState('lbs');
  
  const [result, setResult] = useState(0);

  const units = {
    kg: 1,
    g: 0.001,
    mg: 0.000001,
    lbs: 0.453592,
    oz: 0.0283495,
    stone: 6.35029
  };

  useEffect(() => {
    const valInKg = value * units[fromUnit];
    const finalVal = valInKg / units[toUnit];
    setResult(finalVal);
  }, [value, fromUnit, toUnit]);

  return (
    <div className="container">
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8">
        <h1 className="text-3xl font-bold mb-2">Weight Converter</h1>
        <p className="text-muted mb-6">Convert between kilograms, grams, pounds, ounces, and stones.</p>

        <div className="card">
          <div className="grid gap-6 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            <div className="input-group">
              <label className="input-label">From</label>
              <input 
                type="number" 
                className="input-field mb-2" 
                value={value} 
                onChange={e => setValue(Number(e.target.value))} 
              />
              <select 
                className="input-field"
                value={fromUnit}
                onChange={e => setFromUnit(e.target.value)}
              >
                {Object.keys(units).map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>

            <div className="text-center font-bold text-2xl text-primary">=</div>

            <div className="input-group">
              <label className="input-label">To</label>
              <div className="p-4 bg-secondary rounded-lg mb-2 text-center text-4xl font-bold text-primary">
                {result.toFixed(4).replace(/\.?0+$/, '')}
              </div>
              <select 
                className="input-field"
                value={toUnit}
                onChange={e => setToUnit(e.target.value)}
              >
                {Object.keys(units).map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
