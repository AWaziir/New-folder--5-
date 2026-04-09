import React, { useState } from 'react';
import { Hash, RotateCcw } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function RandomNumberGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const generate = () => {
    const minVal = Math.ceil(min);
    const maxVal = Math.floor(max);
    
    if (minVal >= maxVal) {
        setResult("Error: Min must be less than Max");
        return;
    }
    
    const num = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
    setResult(num);
    setHistory([num, ...history].slice(0, 10));
  };

  const InputPanel = (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
          <div className="input-group">
            <label className="input-label">Minimum</label>
            <input 
                type="number" 
                className="input-field text-xl text-center" 
                value={min} 
                onChange={(e) => setMin(Number(e.target.value))} 
            />
          </div>
          <div className="input-group">
            <label className="input-label">Maximum</label>
            <input 
                type="number" 
                className="input-field text-xl text-center" 
                value={max} 
                onChange={(e) => setMax(Number(e.target.value))} 
            />
          </div>
      </div>

      <button className="btn-primary w-full py-4 text-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-primary/50 transition-all font-bold" onClick={generate}>
        <RotateCcw size={20} /> Generate Number
      </button>

      {history.length > 0 && (
          <div className="mt-8">
              <label className="text-xs font-bold text-muted uppercase tracking-widest mb-3 block">Recent Numbers</label>
              <div className="flex flex-wrap gap-2">
                  {history.map((h, i) => (
                      <span key={i} className="px-3 py-1 bg-secondary rounded-full border border-border-color text-xs text-muted font-bold">
                          {h}
                      </span>
                  ))}
              </div>
          </div>
      )}
    </div>
  );

  const ResultPanel = (
    <div className="flex flex-col h-full justify-center">
      <div className="p-12 bg-primary/10 rounded-2xl border-2 border-primary/30 text-center flex flex-col items-center justify-center relative shadow-inner group overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10 animate-pulse"></div>
        <p className="text-primary-light mb-4 font-black uppercase tracking-widest text-sm drop-shadow">Random Result</p>
        <p className="text-8xl font-black text-white drop-shadow-md transition-all duration-300 group-hover:scale-110">
          {result !== null ? result : '?'}
        </p>
      </div>
    </div>
  );

  return (
    <CalculatorLayout
      title="Random Number Generator"
      description="Generate random numbers within any range instantly. Perfect for games, decisions, and research."
      path="/other/random-number"
      icon={Hash}
      inputs={InputPanel}
      results={ResultPanel}
    />
  );
}
