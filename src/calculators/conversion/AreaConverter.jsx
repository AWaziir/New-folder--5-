import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function AreaConverter() {
  const [value, setValue] = useState(1);
  const [unit, setUnit] = useState('sqm');
  
  const conversions = {
    sqm: 1,
    sqft: 10.7639,
    acres: 0.000247105,
    hectares: 0.0001,
    sqkm: 0.000001
  };

  const unitLabels = {
    sqm: 'Square Meters (m²)',
    sqft: 'Square Feet (ft²)',
    acres: 'Acres (ac)',
    hectares: 'Hectares (ha)',
    sqkm: 'Square Kilometers (km²)'
  };

  const convertValue = (toUnit) => {
    const sqmValue = value / conversions[unit];
    return sqmValue * conversions[toUnit];
  };

  const InputPanel = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Value to Convert</label>
        <input 
            type="number" 
            className="input-field text-xl" 
            value={value} 
            onChange={(e) => setValue(Number(e.target.value))} 
        />
      </div>

      <div className="input-group">
        <label className="input-label">Original Unit</label>
        <select 
            className="input-field"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
        >
            {Object.entries(unitLabels).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
            ))}
        </select>
      </div>
    </div>
  );

  const ResultPanel = (
    <div className="space-y-4">
        {Object.entries(unitLabels).map(([targetUnit, label]) => {
            if (targetUnit === unit) return null;
            const converted = convertValue(targetUnit);
            return (
                <div key={targetUnit} className="p-4 bg-secondary/50 rounded-xl border border-border-color flex justify-between items-center group hover:border-primary/50 transition-all">
                    <span className="text-muted text-sm font-bold uppercase tracking-wider">{label.split(' (')[0]}</span>
                    <span className="text-xl font-black text-white">
                        {converted.toLocaleString(undefined, { maximumFractionDigits: 6 })} 
                        <span className="ml-1 text-sm text-primary-light">{targetUnit === 'sqm' ? 'm²' : targetUnit}</span>
                    </span>
                </div>
            );
        })}
    </div>
  );

  return (
    <CalculatorLayout
      title="Area Converter"
      description="Convert between Square Meters, Square Feet, Acres, and Hectares instantly."
      path="/conversion/area-converter"
      icon={MapPin}
      inputs={InputPanel}
      results={ResultPanel}
    />
  );
}
