import React, { useState, useEffect } from 'react';
import { Hash } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function DecimalToFraction() {
  const [decimal, setDecimal] = useState('0.75');
  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateFraction();
  }, [decimal]);

  const calculateFraction = () => {
    const decVal = parseFloat(decimal);
    if (isNaN(decVal)) {
      setResult(null);
      return;
    }

    // Convert decimal to fraction algorithm
    const len = decimal.includes('.') ? decimal.split('.')[1].length : 0;
    const denominator = Math.pow(10, len);
    const numerator = decVal * denominator;

    const gcd = (a, b) => (b ? gcd(b, a % b) : a);
    const common = gcd(numerator, denominator);

    setResult({
      num: numerator / common,
      den: denominator / common
    });
  };

  const inputs = (
    <div className="space-y-4">
      <div className="input-group">
        <label className="input-label">Decimal Value</label>
        <input 
          type="text" 
          className="input-field text-xl font-bold" 
          placeholder="e.g. 0.125"
          value={decimal} 
          onChange={e => setDecimal(e.target.value)} 
        />
      </div>
    </div>
  );

  const results = result ? (
    <div className="space-y-6">
      <div className="p-10 bg-primary/10 rounded-2xl border-2 border-primary/20 text-center flex flex-col items-center justify-center">
        <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-6">Simplified Fraction</p>
        <div className="flex flex-col items-center gap-2">
            <span className="text-4xl font-black text-slate-900">{result.num}</span>
            <div className="w-16 h-1 bg-primary rounded-full"></div>
            <span className="text-4xl font-black text-slate-900">{result.den}</span>
        </div>
      </div>
      
      <div className="p-4 bg-slate-50 rounded-lg text-center">
          <p className="text-sm text-muted italic">Result: {result.num}/{result.den}</p>
      </div>
    </div>
  ) : (
    <div className="py-12 text-center opacity-40">Enter a decimal to see its fraction.</div>
  );

  return (
    <CalculatorLayout 
      title="Decimal to Fraction"
      seoTitle="Decimal to Fraction Calculator - Simple & Simplified Results"
      description="Convert any decimal into its simplest fraction form instantly. Includes step-by-step simplification using GCD."
      path="/math/decimal-to-fraction"
      icon={Hash}
      inputs={inputs}
      results={results}
      instructions={<p>Type in any decimal number (e.g., 0.5, 3.14) and our calculator will instantly find the numerator and denominator for the equivalent fraction in its simplest terms.</p>}
      formula="Fraction = (Decimal × 10ⁿ) / 10ⁿ"
      examples={[
        { title: "Standard Decimal", description: "0.25 becomes 1/4 after simplification." },
        { title: "Mixed Number", description: "1.5 becomes 3/2 (Improper Fraction)." }
      ]}
      faqs={[
        { q: "How does this work?", a: "We take the decimal, turn it into a fraction over a power of 10, then use the Greatest Common Divisor (GCD) to simplify it." }
      ]}
    />
  );
}
