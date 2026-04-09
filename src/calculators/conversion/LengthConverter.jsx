import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';

export default function LengthConverter() {
  const [value, setValue] = useState(1);
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('km');
  
  const [result, setResult] = useState(0);

  const units = {
    m: 1,
    km: 1000,
    cm: 0.01,
    mm: 0.001,
    inch: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mile: 1609.34
  };

  useEffect(() => {
    const valInMeters = value * units[fromUnit];
    const finalVal = valInMeters / units[toUnit];
    setResult(finalVal);
  }, [value, fromUnit, toUnit]);

  return (
    <div className="container">
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8">
        <h1 className="text-3xl font-bold mb-2">Length Converter</h1>
        <p className="text-muted mb-6">Easily convert between meters, kilometers, inches, feet, and more.</p>

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
