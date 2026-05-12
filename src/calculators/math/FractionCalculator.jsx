import React, { useState, useEffect } from 'react';
import { Sigma } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

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

  const inputs = (
    <div className="space-y-8 overflow-x-auto pb-4">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 min-w-max mx-auto">
        {/* Input 1 */}
        <div className="flex items-center gap-3">
            <input type="number" placeholder="Whole" className="input-field text-center font-black text-xl h-24 shadow-inner" style={{ width: '85px' }} value={whole1} onChange={e => setWhole1(e.target.value)} />
            <div className="flex flex-col gap-2">
                <input type="number" placeholder="Num" className="input-field text-center font-black shadow-sm" style={{ width: '85px' }} value={num1} onChange={e => setNum1(e.target.value)} />
                <hr className="border-t-[3px] border-slate-300 rounded" />
                <input type="number" placeholder="Den" className="input-field text-center font-black shadow-sm" style={{ width: '85px' }} value={den1} onChange={e => setDen1(e.target.value)} />
            </div>
        </div>

        {/* Operation */}
        <select className="px-6 py-4 rounded-xl border-none shadow-md text-3xl font-black text-slate-900 bg-primary hover:bg-primary-dark transition-all cursor-pointer" value={operation} onChange={e => setOperation(e.target.value)}>
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">×</option>
            <option value="/">÷</option>
        </select>

        {/* Input 2 */}
        <div className="flex items-center gap-3">
            <input type="number" placeholder="Whole" className="input-field text-center font-black text-xl h-24 shadow-inner" style={{ width: '85px' }} value={whole2} onChange={e => setWhole2(e.target.value)} />
            <div className="flex flex-col gap-2">
                <input type="number" placeholder="Num" className="input-field text-center font-black shadow-sm" style={{ width: '85px' }} value={num2} onChange={e => setNum2(e.target.value)} />
                <hr className="border-t-[3px] border-slate-300 rounded" />
                <input type="number" placeholder="Den" className="input-field text-center font-black shadow-sm" style={{ width: '85px' }} value={den2} onChange={e => setDen2(e.target.value)} />
            </div>
        </div>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6">
      {result ? (
        <div className="space-y-6 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-4">Simplified Result</p>
            <div className="flex items-center justify-center p-8 bg-primary/5 rounded-2xl border border-primary/20 shadow-inner group transition-all group-hover:scale-105">
                <div className="flex flex-col gap-2 items-center">
                    <span className="text-5xl font-black text-slate-900">{result.num}</span>
                    <hr className="border-t-[4px] border-primary w-20 rounded" />
                    <span className="text-5xl font-black text-slate-900">{result.den}</span>
                </div>
            </div>

            <div className="grid gap-4 mt-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center text-center">
                <p className="text-[10px] uppercase font-bold tracking-[0.1em] opacity-50 mb-2">Decimal</p>
                <p className="text-3xl font-black text-primary-light">{result.decimal}</p>
              </div>

              {Math.abs(result.num) >= result.den && result.mixed.num !== 0 && (
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                    <p className="text-[10px] uppercase font-bold tracking-[0.1em] opacity-50 mb-2">Mixed Number</p>
                    <div className="flex items-center gap-2 text-slate-900 font-black">
                        <span className="text-3xl">{result.mixed.whole}</span>
                        <div className="flex flex-col items-center text-lg">
                            <span>{result.mixed.num}</span>
                            <hr className="border-t-2 border-slate-1000 w-full rounded" />
                            <span>{result.mixed.den}</span>
                        </div>
                    </div>
                  </div>
              )}
            </div>
        </div>
      ) : (
        <div className="py-12 italic opacity-40 text-center">Enter valid fractions.</div>
      )}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        The Fraction Calculator supports addition, subtraction, multiplication, and division of proper, improper, and mixed fractions.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Mixed Fractions:</strong> Enter a value in the "Whole" field. For simple fractions, leave the "Whole" field empty.</li>
        <li><strong>Simplification:</strong> All results are automatically reduced to their simplest form using the Greatest Common Divisor (GCD).</li>
      </ul>
    </div>
  );

  const formula = "a/b + c/d = (ad + bc)/bd | a/b × c/d = (ac)/(bd)";

  const examples = [
    {
      title: "Adding Mixed Numbers",
      description: "Entering 1 1/2 + 2 3/4 evaluates to 3/2 + 11/4 = 17/4, which simplifies to the mixed number 4 1/4."
    },
    {
      title: "Multiplying Fractions",
      description: "Computing 2/3 × 3/4 equals 6/12, which automatically simplifies to 1/2 (or 0.5 as a decimal)."
    }
  ];

  const faqs = [
    {
      q: "Why do denominators have to be common for addition and subtraction?",
      a: "You can only add or subtract fractions if they represent parts of the same whole (a common denominator). For multiplication and division, this is not required."
    },
    {
      q: "What happens if a denominator is zero?",
      a: "A fraction with a zero in the denominator is undefined in mathematics. The calculator will return an error."
    }
  ];

  return (
    <CalculatorLayout 
      title="Fraction Calculator"
      seoTitle="Fraction Calculator - Add, Subtract, Multiply & Divide Fractions"
      description="Calculate simple or mixed fractions easily. This calculator adds, subtracts, multiplies, and divides fractions, automatically simplifying the result."
      path="/math/fraction-calculator"
      icon={Sigma}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
    />
  );
}
