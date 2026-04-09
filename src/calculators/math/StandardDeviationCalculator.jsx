import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

export default function StandardDeviationCalculator() {
  const [dataInput, setDataInput] = useState('10, 20, 30, 40, 50');
  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateSD();
  }, [dataInput]);

  const calculateSD = () => {
    const nums = dataInput
      .split(/[, \s]+/)
      .map(Number)
      .filter(n => !isNaN(n));

    if (nums.length < 2) {
        setResult(null);
        return;
    }

    const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
    const variance = nums.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (nums.length - 1);
    const sd = Math.sqrt(variance);

    setResult({
        sd: sd.toFixed(4),
        variance: variance.toFixed(4),
        mean: mean.toFixed(2),
        count: nums.length
    });
  };

  return (
    <div className="container">
      <SEO 
        title="Standard Deviation Calculator – Fast & Free Stats Tool" 
        description="Calculate the standard deviation and variance of any dataset. Free online stats tool for population and sample calculations." 
        path="/math/standard-deviation"
      />
      
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8 px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-center">Standard Deviation Calculator</h1>
        
        <div className="grid gap-8 lg:grid-cols-2">
           <div className="card shadow-lg">
              <h2 className="text-xl font-bold mb-4">Input Dataset</h2>
              <textarea 
                className="input-field h-48 font-mono text-lg"
                value={dataInput}
                onChange={e => setDataInput(e.target.value)}
              />
           </div>

           <div>
              <div className="card bg-primary text-white shadow-2xl sticky top-24 p-8 text-center">
                 <h2 className="text-xl font-bold mb-8 opacity-80 uppercase tracking-widest">Statistical Results</h2>
                 
                 {result ? (
                    <div className="space-y-8">
                        <div className="p-8 bg-white bg-opacity-10 rounded-2xl border-2 border-white border-opacity-20 animate-pulse-subtle">
                           <p className="text-xs font-bold uppercase opacity-70 mb-2">Standard Deviation (σ)</p>
                           <p className="text-5xl font-black">{result.sd}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="p-4 bg-white bg-opacity-10 rounded-lg">
                              <p className="text-xs uppercase font-bold opacity-60 mb-1">Variance</p>
                              <p className="text-xl font-bold">{result.variance}</p>
                           </div>
                           <div className="p-4 bg-white bg-opacity-10 rounded-lg">
                              <p className="text-xs uppercase font-bold opacity-60 mb-1">Mean</p>
                              <p className="text-xl font-bold">{result.mean}</p>
                           </div>
                        </div>
                        <p className="text-sm opacity-50 italic">Calculated for {result.count} values</p>
                    </div>
                 ) : (
                    <div className="py-20 text-center opacity-40">Enter at least 2 numbers.</div>
                 )}
              </div>
           </div>
        </div>

        <section className="mt-16 space-y-12">
            <div className="card">
                <h2 className="text-2xl font-bold mb-4">What is Standard Deviation?</h2>
                <p className="text-muted leading-relaxed">
                    Standard deviation is a measure of the amount of variation or dispersion of a set of values. A low standard deviation indicates that the values tend to be close to the mean (average), while a high standard deviation indicates that the values are spread out over a wider range.
                </p>
            </div>
        </section>
      </div>
    </div>
  );
}
