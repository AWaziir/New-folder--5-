import React, { useState, useEffect } from 'react';
import { AlignCenterVertical } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function RatioCalculator() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);
  const [c, setC] = useState(3);
  const [d, setD] = useState(6);
  const [solvingFor, setSolvingFor] = useState('d');

  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateRatio();
  }, [a, b, c, d, solvingFor]);

  const calculateRatio = () => {
    let res = 0;
    try {
        if (solvingFor === 'a') res = d === 0 ? 'Error' : (b * c) / d;
        else if (solvingFor === 'b') res = c === 0 ? 'Error' : (a * d) / c;
        else if (solvingFor === 'c') res = b === 0 ? 'Error' : (a * d) / b;
        else res = a === 0 ? 'Error' : (b * c) / a;

        setResult(res === 'Error' ? 'Error' : parseFloat(res).toFixed(2));
    } catch (e) {
        setResult('Error');
    }
  };

  const inputs = (
    <div className="space-y-10">
      <h2 className="text-xl font-bold text-center opacity-70 uppercase tracking-widest text-xs">Ratio Solver (A:B = C:D)</h2>
      
      <div className="flex flex-wrap items-center justify-center gap-6 p-10 bg-slate-50 rounded-3xl border border-slate-200 shadow-inner">
         <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-black text-primary-light uppercase tracking-widest">A</span>
            <input 
              disabled={solvingFor === 'a'}
              type="number" 
              className={`input-field w-24 text-center font-black text-2xl !py-4 transition-all ${solvingFor === 'a' ? 'bg-primary border-primary text-slate-900 scale-110 shadow-lg' : ''}`} 
              value={solvingFor === 'a' ? result : a} 
              onChange={e => setA(Number(e.target.value))} 
            />
         </div>
         <div className="text-4xl font-black opacity-50">:</div>
         <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-black text-primary-light uppercase tracking-widest">B</span>
            <input 
              disabled={solvingFor === 'b'} 
              type="number" 
              className={`input-field w-24 text-center font-black text-2xl !py-4 transition-all ${solvingFor === 'b' ? 'bg-primary border-primary text-slate-900 scale-110 shadow-lg' : ''}`} 
              value={solvingFor === 'b' ? result : b} 
              onChange={e => setB(Number(e.target.value))} 
            />
         </div>
         <div className="text-4xl font-black text-primary">=</div>
         <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-black text-primary-light uppercase tracking-widest">C</span>
            <input 
              disabled={solvingFor === 'c'} 
              type="number" 
              className={`input-field w-24 text-center font-black text-2xl !py-4 transition-all ${solvingFor === 'c' ? 'bg-primary border-primary text-slate-900 scale-110 shadow-lg' : ''}`} 
              value={solvingFor === 'c' ? result : c} 
              onChange={e => setC(Number(e.target.value))} 
            />
         </div>
         <div className="text-4xl font-black opacity-50">:</div>
         <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-black text-primary-light uppercase tracking-widest">D</span>
            <input 
              disabled={solvingFor === 'd'} 
              type="number" 
              className={`input-field w-24 text-center font-black text-2xl !py-4 transition-all ${solvingFor === 'd' ? 'bg-primary border-primary text-slate-900 scale-110 shadow-lg' : ''}`} 
              value={solvingFor === 'd' ? result : d} 
              onChange={e => setD(Number(e.target.value))} 
            />
         </div>
      </div>

      <div className="text-center space-y-4">
         <p className="text-xs font-bold uppercase tracking-widest opacity-50">Solve for Variable</p>
         <div className="flex justify-center gap-3">
            {['a', 'b', 'c', 'd'].map(v => (
                <button 
                  key={v}
                  onClick={() => setSolvingFor(v)}
                  className={`w-14 h-14 rounded-full font-black text-xl transition-all ${solvingFor === v ? 'bg-primary text-white shadow-xl scale-110' : 'bg-slate-50 border border-slate-200 text-slate-900/50 hover:bg-slate-100'}`}
                >
                    {v.toUpperCase()}
                </button>
            ))}
         </div>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6">
      <div className="p-10 bg-primary-dark/40 rounded-3xl border border-primary/20 shadow-inner group transition-all text-center">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] opacity-60 mb-4 text-primary-light">Calculated Value for {solvingFor.toUpperCase()}</h2>
          <div className="text-7xl font-black text-slate-900 group-hover:scale-105 transition-transform">
            {result}
          </div>
          <p className="mt-6 text-sm font-bold opacity-40 uppercase tracking-widest">
            {solvingFor === 'a' && `${result} : ${b} = ${c} : ${d}`}
            {solvingFor === 'b' && `${a} : ${result} = ${c} : ${d}`}
            {solvingFor === 'c' && `${a} : ${b} = ${result} : ${d}`}
            {solvingFor === 'd' && `${a} : ${b} = ${c} : ${result}`}
          </p>
      </div>
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        A ratio is a way of comparing two or more values. In mathematics, it shows how many times one number contains another. The Ratio Calculator is designed to solve for a missing value (X) when two ratios are proportional (A:B = C:D).
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Solving for a specific variable:</strong> Click on A, B, C, or D to set the unknown variable. The calculator will automatically adjust the equation.</li>
        <li><strong>Real-time updates:</strong> The result calculates instantly as you type the known values.</li>
      </ul>
    </div>
  );

  const formula = "Cross-multiply: A × D = B × C. Then divide to isolate the unknown variable.";

  const examples = [
    {
      title: "Scaling a Recipe",
      description: "If a recipe calls for 2 cups of sugar for 3 cups of flour (2:3), and you want to use 6 cups of flour, you set A:B = C:D to 2:3 = X:6. Solving for C (or X) gives you 4."
    },
    {
      title: "Resizing Images",
      description: "If an image is 1920x1080 (16:9 ratio) and you want to scale the width to 1280 while maintaining the ratio, set 1920:1080 = 1280:D. Solving for D gives 720."
    }
  ];

  const faqs = [
    {
      q: "What does it mean when two ratios are proportional?",
      a: "It means the two ratios are equal when simplified. For example, 1:2 is proportional to 4:8 because multiplying both sides of 1:2 by 4 gives 4:8."
    },
    {
      q: "Can I use decimals or fractions?",
      a: "Yes, you can input decimals into the known variables. The calculator handles floating-point math automatically."
    }
  ];

  return (
    <CalculatorLayout 
      title="Ratio Calculator"
      seoTitle="Ratio Calculator - Solve Proportions (A:B = C:D)"
      description="Solve for the missing variable in any ratio or proportion. Free tool to calculate missing values in A:B = C:D ratios. Simple and fast."
      path="/math/ratio-calculator"
      icon={AlignCenterVertical}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
    />
  );
}
