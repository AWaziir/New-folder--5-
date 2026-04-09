import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

export default function PythagoreanCalculator() {
  const [sideA, setSideA] = useState(3);
  const [sideB, setSideB] = useState(4);
  const [hypotenuseC, setHypotenuseC] = useState(5);
  const [findValue, setFindValue] = useState('c'); // 'a', 'b' or 'c'

  const [result, setResult] = useState(null);

  useEffect(() => {
    calculatePythagoras();
  }, [sideA, sideB, hypotenuseC, findValue]);

  const calculatePythagoras = () => {
    let res = 0;
    if (findValue === 'c') {
        res = Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
    } else if (findValue === 'a') {
        res = Math.sqrt(Math.pow(hypotenuseC, 2) - Math.pow(sideB, 2));
    } else {
        res = Math.sqrt(Math.pow(hypotenuseC, 2) - Math.pow(sideA, 2));
    }

    setResult(isNaN(res) ? 'Invalid' : res.toFixed(3));
  };

  return (
    <div className="container">
      <SEO 
        title="Pythagorean Theorem Calculator – Free & Accurate Right Triangle Tool" 
        description="Solve for any side of a right-angled triangle using the Pythagorean Theorem (a² + b² = c²). Fast, free, and simple geometry tool for students." 
        path="/math/pythagorean-calculator"
      />
      
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8 px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-center">Pythagorean Theorem Calculator</h1>
        
        <div className="grid gap-8 lg:grid-cols-2">
           <div className="card shadow-lg border-2 border-primary-light">
              <h2 className="text-xl font-bold mb-4">Calculate Triangle Sides</h2>
              <div className="bg-secondary p-1 rounded-lg mb-6 flex">
                  {['a', 'b', 'c'].map(v => (
                      <button 
                        key={v}
                        className={`flex-1 py-3 rounded-md font-bold transition ${findValue === v ? 'bg-primary text-white shadow-md' : 'text-muted'}`}
                        onClick={() => setFindValue(v)}
                      >
                         Find {v.toUpperCase()}
                      </button>
                  ))}
              </div>

              {findValue !== 'a' && (
                  <div className="input-group">
                      <label className="input-label">Side A</label>
                      <input type="number" className="input-field text-xl" value={sideA} onChange={e => setSideA(Number(e.target.value))} />
                  </div>
              )}
              {findValue !== 'b' && (
                  <div className="input-group">
                      <label className="input-label">Side B</label>
                      <input type="number" className="input-field text-xl" value={sideB} onChange={e => setSideB(Number(e.target.value))} />
                  </div>
              )}
              {findValue !== 'c' && (
                  <div className="input-group">
                      <label className="input-label">Hypotenuse C</label>
                      <input type="number" className="input-field text-xl" value={hypotenuseC} onChange={e => setHypotenuseC(Number(e.target.value))} />
                  </div>
              )}
           </div>

           <div>
              <div className="card highlight-border bg-primary text-white sticky top-24 shadow-2xl overflow-hidden p-0 text-center">
                 <div className="p-8">
                    <h2 className="text-xl font-bold mb-8">Side {findValue.toUpperCase()} Length</h2>
                    <div className="p-8 bg-white bg-opacity-10 rounded-2xl border-2 border-white border-opacity-20 mb-6">
                        <p className="text-6xl font-black text-white">{result}</p>
                    </div>
                    <div className="text-primary-light font-bold text-sm tracking-widest uppercase">
                        {findValue === 'c' ? 'a² + b² = c²' : findValue === 'a' ? 'c² - b² = a²' : 'c² - a² = b²'}
                    </div>
                 </div>

                 <div className="bg-primary-dark p-6 text-xs text-primary-light border-t border-white border-opacity-5 font-mono">
                    √( {findValue === 'c' ? `${sideA}² + ${sideB}²` : findValue === 'a' ? `${hypotenuseC}² - ${sideB}²` : `${hypotenuseC}² - ${sideA}²`} ) = {result}
                 </div>
              </div>
           </div>
        </div>

        {/* SEO CONTENT */}
        <section className="mt-16 space-y-12">
            <div className="card">
                <h2 className="text-2xl font-bold mb-4">What is the Pythagorean Theorem?</h2>
                <p className="text-muted leading-relaxed">
                    The Pythagorean Theorem is a fundamental principle in geometry that relates the three sides of a right-angled triangle. It states that for any right triangle, the square of the hypotenuse (the side opposite the right angle) is equal to the sum of the squares of the other two sides.
                </p>
                <div className="p-6 bg-secondary rounded-xl text-center text-primary font-bold text-2xl mt-6 shadow-inner italic">
                  a² + b² = c²
                </div>
            </div>

            <div className="card">
                <h2 className="text-2xl font-bold mb-4">How to Use the Calculator</h2>
                <ol className="list-decimal pl-6 space-y-4 text-muted">
                    <li>Select which side you want to find (A, B, or the Hypotenuse C).</li>
                    <li>Enter the lengths of the other two sides into the input fields.</li>
                    <li>The result will automatically update with the exact length of the missing side.</li>
                </ol>
            </div>

            <div className="card">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold text-lg mb-1">What is the Hypotenuse?</h3>
                        <p className="text-muted">The hypotenuse is the longest side of a right-angled triangle and is always the side opposite the 90-degree angle.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-1">Can this calculator solve all triangles?</h3>
                        <p className="text-muted">No. The Pythagorean theorem only applies to right-angled triangles (triangles that have one 90-degree angle).</p>
                    </div>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
}
