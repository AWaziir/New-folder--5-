import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

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

  return (
    <div className="container">
      <SEO 
        title="Ratio Calculator – Solve Proportions (A:B = C:D)" 
        description="Solve for X in any ratio or proportion. Free tool to calculate missing values in A:B = C:D ratios. Simple and fast for students." 
        path="/math/ratio-calculator"
      />
      
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8 px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-center">Ratio Calculator</h1>
        
        <div className="grid gap-8 lg:grid-cols-2">
           <div className="card shadow-lg">
              <h2 className="text-xl font-bold mb-6 text-center">Ratio Solver (A:B = C:D)</h2>
              
              <div className="flex flex-wrap items-center justify-center gap-6 p-6 bg-secondary rounded-2xl border-2 border-primary border-opacity-10">
                 <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-bold text-primary">A</span>
                    <input 
                      disabled={solvingFor === 'a'}
                      type="number" 
                      className={`input-field w-20 text-center ${solvingFor === 'a' ? 'bg-primary text-white font-bold border-none' : ''}`} 
                      value={solvingFor === 'a' ? result : a} 
                      onChange={e => setA(Number(e.target.value))} 
                    />
                 </div>
                 <div className="text-2xl font-bold">:</div>
                 <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-bold text-primary">B</span>
                    <input 
                      disabled={solvingFor === 'b'} 
                      type="number" 
                      className={`input-field w-20 text-center ${solvingFor === 'b' ? 'bg-primary text-white font-bold border-none' : ''}`} 
                      value={solvingFor === 'b' ? result : b} 
                      onChange={e => setB(Number(e.target.value))} 
                    />
                 </div>
                 <div className="text-2xl font-bold">=</div>
                 <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-bold text-primary">C</span>
                    <input 
                      disabled={solvingFor === 'c'} 
                      type="number" 
                      className={`input-field w-20 text-center ${solvingFor === 'c' ? 'bg-primary text-white font-bold border-none' : ''}`} 
                      value={solvingFor === 'c' ? result : c} 
                      onChange={e => setC(Number(e.target.value))} 
                    />
                 </div>
                 <div className="text-2xl font-bold">:</div>
                 <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-bold text-primary">D</span>
                    <input 
                      disabled={solvingFor === 'd'} 
                      type="number" 
                      className={`input-field w-20 text-center ${solvingFor === 'd' ? 'bg-primary text-white font-bold border-none' : ''}`} 
                      value={solvingFor === 'd' ? result : d} 
                      onChange={e => setD(Number(e.target.value))} 
                    />
                 </div>
              </div>

              <div className="mt-8">
                 <p className="text-sm font-bold text-center mb-4">Solve for:</p>
                 <div className="flex justify-center gap-2">
                    {['a', 'b', 'c', 'd'].map(v => (
                        <button 
                          key={v}
                          onClick={() => setSolvingFor(v)}
                          className={`w-12 h-12 rounded-full font-bold transition-all ${solvingFor === v ? 'bg-primary text-white shadow-lg scale-110' : 'bg-secondary text-muted'}`}
                        >
                            {v.toUpperCase()}
                        </button>
                    ))}
                 </div>
              </div>
           </div>

           <div className="flex flex-col justify-center">
              <div className="card bg-primary text-white shadow-2xl border-none p-10 text-center">
                 <h2 className="text-xl font-bold mb-4 opacity-80">Final Ratio Result</h2>
                 <div className="text-5xl font-black mb-4">
                    {result}:{(solvingFor === 'a' || solvingFor === 'c') ? (solvingFor === 'a' ? b : d) : (solvingFor === 'b' ? a : c)}
                 </div>
                 <p className="text-sm opacity-60">Solving for {solvingFor.toUpperCase()} where {a}:{b} = {c}:{d}</p>
              </div>
           </div>
        </div>

        <section className="mt-16 space-y-12">
            <div className="card">
                <h2 className="text-2xl font-bold mb-4">What is a Ratio?</h2>
                <p className="text-muted leading-relaxed">
                    A ratio is a way of comparing two or more values. In mathematics, it shows how many times one number contains another. For example, if you have 8 oranges and 6 lemons, the ratio of oranges to lemons is 8:6 (which can be simplified to 4:3).
                </p>
            </div>
        </section>
      </div>
    </div>
  );
}
