import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function SpeedConverter() {
  const [value, setValue] = useState(100);
  const [unit, setUnit] = useState('kmh');
  
  const conversions = {
    kmh: 1,
    mph: 0.621371,
    ms: 0.277778,
    knots: 0.539957
  };

  const unitLabels = {
    kmh: 'Kilometers per hour (km/h)',
    mph: 'Miles per hour (mph)',
    ms: 'Meters per second (m/s)',
    knots: 'Knots (kn)'
  };

  const convertValue = (toUnit) => {
    // Convert from unit to kmh, then from kmh to toUnit
    const kmhValue = value / conversions[unit];
    return kmhValue * conversions[toUnit];
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
                        {converted.toLocaleString(undefined, { maximumFractionDigits: 4 })} 
                        <span className="ml-1 text-sm text-primary-light">{targetUnit === 'kmh' ? 'km/h' : targetUnit === 'ms' ? 'm/s' : targetUnit}</span>
                    </span>
                </div>
            );
        })}
    </div>
  );

  return (
    <CalculatorLayout
      title="Speed Converter"
      description="Convert between km/h, mph, m/s, and knots instantly with high precision."
      path="/conversion/speed-converter"
      icon={Zap}
      inputs={InputPanel}
      results={ResultPanel}
    />
  );
}
