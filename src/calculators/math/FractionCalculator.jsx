import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

export default function FractionCalculator() {
  const [whole1, setWhole1] = useState('');
  const [num1, setNum1] = useState(1);
  const [den1, setDen1] = useState(2);
  const [whole2, setWhole2] = useState('');
  const [num2, setNum2] = useState(1);
  const [den2, setDen2] = useState(4);
  const [operation, setOperation] = useState('+');

  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateFractions();
  }, [num1, den1, num2, den2, operation]);

  const calculateFractions = () => {
    const d1 = Number(den1);
    const d2 = Number(den2);
    
    if (d1 === 0 || d2 === 0) {
      setResult(null);
      return;
    }

    // Convert mixed to improper
    const getImproperNum = (w, n, d) => {
      const numW = Number(w);
      const numN = Number(n);
      if (numW === 0) return numN;
      return (Math.abs(numW) * d + numN) * (numW < 0 ? -1 : 1);
    };

    const n1 = getImproperNum(whole1 || 0, num1 || 0, d1);
    const n2 = getImproperNum(whole2 || 0, num2 || 0, d2);

    let resultNum, resultDen;
    switch (operation) {
      case '+':
        resultNum = n1 * d2 + n2 * d1;
        resultDen = d1 * d2;
        break;
      case '-':
        resultNum = n1 * d2 - n2 * d1;
        resultDen = d1 * d2;
        break;
      case '*':
        resultNum = n1 * n2;
        resultDen = d1 * d2;
        break;
      case '/':
        resultNum = n1 * d2;
        resultDen = d1 * n2;
        break;
      default:
        return;
    }

    if (resultDen === 0) {
      setResult(null);
      return;
    }

    const common = Math.abs(gcd(resultNum, resultDen));
    const simplifiedNum = resultNum / common;
    const simplifiedDen = resultDen / common;

    setResult({
      num: simplifiedNum,
      den: simplifiedDen,
      decimal: (simplifiedNum / simplifiedDen).toFixed(2),
      mixed: {
        whole: Math.floor(Math.abs(simplifiedNum) / simplifiedDen) * (simplifiedNum < 0 ? -1 : 1),
        num: Math.abs(simplifiedNum) % simplifiedDen,
        den: simplifiedDen
      }
    });
  };

  return (
    <div className="container">
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8">
        <h1 className="text-3xl md:text-5xl font-black mb-4 text-center">Fraction Calculator</h1>
        <p className="text-muted mb-10 text-center">Calculate simple or mixed fractions with complete accuracy.</p>

        <div className="glass-panel p-10 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary opacity-5 rounded-full blur-2xl animate-pulse-ring"></div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
            {/* Input 1 */}
            <div className="flex items-center gap-3">
                <input type="number" placeholder="Whole" className="input-field text-center font-bold text-lg h-20 shadow-inner bg-white bg-opacity-80" style={{ width: '80px' }} value={whole1} onChange={e => setWhole1(e.target.value)} />
                <div className="flex flex-col gap-2">
                    <input type="number" placeholder="Num" className="input-field text-center font-bold shadow-sm" style={{ width: '80px' }} value={num1} onChange={e => setNum1(e.target.value)} />
                    <hr className="border-t-[3px] border-text-main rounded" />
                    <input type="number" placeholder="Den" className="input-field text-center font-bold shadow-sm" style={{ width: '80px' }} value={den1} onChange={e => setDen1(e.target.value)} />
                </div>
            </div>

            {/* Operation */}
            <select className="px-6 py-4 rounded-xl border-none shadow-md text-3xl font-black text-white bg-primary hover:bg-primary-dark transition-all" value={operation} onChange={e => setOperation(e.target.value)}>
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="*">×</option>
                <option value="/">÷</option>
            </select>

            {/* Input 2 */}
            <div className="flex items-center gap-3">
                <input type="number" placeholder="Whole" className="input-field text-center font-bold text-lg h-20 shadow-inner bg-white bg-opacity-80" style={{ width: '80px' }} value={whole2} onChange={e => setWhole2(e.target.value)} />
                <div className="flex flex-col gap-2">
                    <input type="number" placeholder="Num" className="input-field text-center font-bold shadow-sm" style={{ width: '80px' }} value={num2} onChange={e => setNum2(e.target.value)} />
                    <hr className="border-t-[3px] border-text-main rounded" />
                    <input type="number" placeholder="Den" className="input-field text-center font-bold shadow-sm" style={{ width: '80px' }} value={den2} onChange={e => setDen2(e.target.value)} />
                </div>
            </div>

            <div className="text-4xl text-primary font-black ml-2">=</div>

            {/* Result */}
            {result ? (
                <div className="flex items-center justify-center bg-white p-6 rounded-2xl shadow-inner border-2 border-border-color min-w-[120px]">
                    <div className="flex flex-col gap-2 items-center">
                        <span className="text-3xl font-black text-text-main">{result.num}</span>
                        <hr className="border-t-[3px] border-primary w-16" />
                        <span className="text-3xl font-black text-text-main">{result.den}</span>
                    </div>
                </div>
            ) : (
                <div className="text-red-500 font-bold">Error</div>
            )}
          </div>

          <AdPlaceholder text="Content Ad" />

          {result && (
              <div className="bg-white bg-opacity-50 p-6 rounded-2xl text-center mt-10 border border-border-color">
                <h3 className="font-bold mb-4 uppercase tracking-widest text-xs opacity-70">Other Representations</h3>
                <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-border-color">
                    <p className="text-xs text-muted font-bold uppercase tracking-widest mb-1">Decimal</p>
                    <p className="text-3xl font-black text-primary">{result.decimal}</p>
                  </div>
                  {Math.abs(result.num) >= result.den && result.mixed.num !== 0 && (
                      <div className="bg-white p-4 rounded-xl shadow-sm border border-border-color flex flex-col items-center justify-center">
                        <p className="text-xs text-muted font-bold uppercase tracking-widest mb-1">Mixed Number</p>
                        <div className="flex items-center gap-2 text-primary font-black">
                            <span className="text-4xl">{result.mixed.whole}</span>
                            <div className="flex flex-col items-center text-xl">
                                <span>{result.mixed.num}</span>
                                <hr className="border-t-2 border-primary w-full" />
                                <span>{result.mixed.den}</span>
                            </div>
                        </div>
                      </div>
                  )}
                </div>
              </div>
          )}
        </div>
      </div>
    </div>
  );
}
