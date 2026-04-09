import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';

export default function TemperatureConverter() {
  const [value, setValue] = useState(0);
  const [fromUnit, setFromUnit] = useState('Celsius');
  const [toUnit, setToUnit] = useState('Fahrenheit');
  
  const [result, setResult] = useState(32);

  const convert = (val, from, to) => {
    let celsius;
    if (from === 'Celsius') celsius = val;
    else if (from === 'Fahrenheit') celsius = (val - 32) * 5 / 9;
    else if (from === 'Kelvin') celsius = val - 273.15;

    if (to === 'Celsius') return celsius;
    else if (to === 'Fahrenheit') return (celsius * 9 / 5) + 32;
    else if (to === 'Kelvin') return celsius + 273.15;
  };

  useEffect(() => {
    setResult(convert(value, fromUnit, toUnit));
  }, [value, fromUnit, toUnit]);

  return (
    <div className="container">
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8">
        <h1 className="text-3xl font-bold mb-2">Temperature Converter</h1>
        <p className="text-muted mb-6">Convert between Celsius, Fahrenheit, and Kelvin.</p>

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
                <option value="Celsius">Celsius</option>
                <option value="Fahrenheit">Fahrenheit</option>
                <option value="Kelvin">Kelvin</option>
              </select>
            </div>

            <div className="text-center font-bold text-2xl text-primary">=</div>

            <div className="input-group">
              <label className="input-label">To</label>
              <div className="p-4 bg-secondary rounded-lg mb-2 text-center text-4xl font-bold text-primary">
                {result.toFixed(2).replace(/\.00$/, '')}
              </div>
              <select 
                className="input-field"
                value={toUnit}
                onChange={e => setToUnit(e.target.value)}
              >
                <option value="Celsius">Celsius</option>
                <option value="Fahrenheit">Fahrenheit</option>
                <option value="Kelvin">Kelvin</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
