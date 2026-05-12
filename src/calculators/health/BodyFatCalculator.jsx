import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function BodyFatCalculator() {
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [neck, setNeck] = useState(40);
  const [waist, setWaist] = useState(85);
  const [hip, setHip] = useState(90); // Only for women

  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateBodyFat();
  }, [gender, weight, height, neck, waist, hip]);

  const calculateBodyFat = () => {
    let bf = 0;
    
    // U.S. Navy Method (Metric)
    if (gender === 'male') {
        if (waist > neck && height > 0) {
            bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
        }
    } else {
        if ((waist + hip - neck) > 0 && height > 0) {
            bf = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)) - 450;
        }
    }

    if (bf > 0 && bf < 60) {
        let category = '';
        if (gender === 'male') {
            if (bf < 6) category = 'Essential Fat';
            else if (bf < 14) category = 'Athletes';
            else if (bf < 18) category = 'Fitness';
            else if (bf < 25) category = 'Average';
            else category = 'Obese';
        } else {
            if (bf < 14) category = 'Essential Fat';
            else if (bf < 21) category = 'Athletes';
            else if (bf < 25) category = 'Fitness';
            else if (bf < 32) category = 'Average';
            else category = 'Obese';
        }

        const fatMass = (bf / 100) * weight;
        const leanMass = weight - fatMass;

        setResult({
            percentage: bf.toFixed(1),
            category,
            fatMass: fatMass.toFixed(1),
            leanMass: leanMass.toFixed(1)
        });
    } else {
        setResult(null);
    }
  };

  const inputs = (
    <div className="space-y-6">
      <div className="flex bg-slate-100 p-1 rounded-lg">
          <button 
              className={`flex-1 py-3 rounded-md font-bold transition ${gender === 'male' ? 'bg-primary text-white shadow-md' : 'text-muted'}`}
              onClick={() => setGender('male')}
          >
              Male
          </button>
          <button 
              className={`flex-1 py-3 rounded-md font-bold transition ${gender === 'female' ? 'bg-primary text-white shadow-md' : 'text-muted'}`}
              onClick={() => setGender('female')}
          >
              Female
          </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="input-group">
            <label className="input-label">Weight (kg)</label>
            <input type="number" className="input-field font-black" value={weight} onChange={e => setWeight(Number(e.target.value))} />
        </div>
        <div className="input-group">
            <label className="input-label">Height (cm)</label>
            <input type="number" className="input-field font-black" value={height} onChange={e => setHeight(Number(e.target.value))} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="input-group">
            <label className="input-label">Neck (cm)</label>
            <input type="number" className="input-field" value={neck} onChange={e => setNeck(Number(e.target.value))} />
        </div>
        <div className="input-group">
            <label className="input-label">Waist (cm)</label>
            <input type="number" className="input-field" value={waist} onChange={e => setWaist(Number(e.target.value))} />
        </div>
      </div>

      {gender === 'female' && (
        <div className="input-group">
          <label className="input-label">Hips (cm)</label>
          <input type="number" className="input-field" value={hip} onChange={e => setHip(Number(e.target.value))} />
        </div>
      )}
    </div>
  );

  const results = (
    <div className="space-y-6">
      {result ? (
        <div className="space-y-6 text-center">
          <div className="p-8 bg-primary/5 rounded-2xl border border-primary/20 shadow-inner group transition-all">
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-2">Body Fat Percentage</p>
            <p className="text-7xl font-black text-slate-900 group-hover:scale-105 transition-transform">
              {result.percentage}%
            </p>
            <p className="text-sm font-bold uppercase tracking-widest text-primary-light mt-2">{result.category}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60">Fat Mass</p>
              <p className="text-2xl font-black text-slate-900">{result.fatMass} <span className="text-xs font-normal">kg</span></p>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60">Lean Mass</p>
              <p className="text-2xl font-black text-slate-900">{result.leanMass} <span className="text-xs font-normal">kg</span></p>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-12 italic opacity-40 text-center">Calculating Body Fat...</div>
      )}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        The U.S. Navy Method Body Fat Calculator provides an estimation of your body composition based on circumference measurements. While not as precise as a DEXA scan, it is a highly convenient tool for tracking long-term body fat trends.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Measurement:</strong> Use a flexible tape measure. Measure your neck (below larynx), waist (at navel for men, narrowest point for women), and hips (for women).</li>
        <li><strong>Time of Day:</strong> For consistency, measure yourself first thing in the morning on an empty stomach.</li>
      </ul>
    </div>
  );

  const formula = "Log-based U.S. Navy Circumference Equation";

  const examples = [
    {
      title: "Athletic Build",
      description: "A male at 10-12% body fat typically exhibits visible abdominal definition and lean muscle separation throughout the body."
    },
    {
      title: "Health & Vitality",
      description: "For women, staying between 21% and 30% is generally considered healthy and sustainable for long-term hormononal health and fitness."
    }
  ];

  const faqs = [
    {
      q: "How accurate is the Navy Method?",
      a: "It is generally accurate within ±3-4% for most people. Its primary value is in tracking changes over time using the same measurement technique."
    },
    {
      q: "Why do women need to measure hips?",
      a: "Women tend to store more fat in the lower body (gynoid distribution). The Navy formula for women includes hip measurements to account for this anatomical difference."
    }
  ];

  return (
    <CalculatorLayout 
      title="Body Fat Calculator"
      seoTitle="Body Fat Calculator - U.S. Navy Method Estimator"
      description="Estimate your body fat percentage using the U.S. Navy circumference method. Track your fitness progress with fat mass and lean mass breakdowns."
      path="/health/body-fat-calculator"
      icon={Activity}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
    />
  );
}
