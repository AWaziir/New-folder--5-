import React, { useState } from 'react';
import { Dumbbell } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function IdealWeightCalculator() {
  const [height, setHeight] = useState(170); // cm
  const [gender, setGender] = useState('male');

  // Devine Formula (1974)
  const calculateIdealWeight = () => {
    const heightInInches = height / 2.54;
    const inchesOver5Feet = Math.max(0, heightInInches - 60);
    
    let ibw;
    if (gender === 'male') {
      ibw = 50 + (2.3 * inchesOver5Feet);
    } else {
      ibw = 45.5 + (2.3 * inchesOver5Feet);
    }
    
    return ibw;
  };

  const ibw = calculateIdealWeight();
  // Range is usually +/- 10%
  const rangeMin = ibw * 0.9;
  const rangeMax = ibw * 1.1;

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

      <div className="input-group">
        <label className="input-label">Height (cm)</label>
        <div className="flex items-center gap-4">
          <input 
            type="range" 
            min="100" 
            max="250" 
            value={height} 
            onChange={(e) => setHeight(Number(e.target.value))}
            className="flex-grow h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <input 
            type="number" 
            className="input-field w-24 text-center font-bold" 
            value={height} 
            onChange={(e) => setHeight(Number(e.target.value))} 
            min="100"
            max="250"
          />
        </div>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6 text-center">
      <div className="p-10 bg-primary/5 rounded-2xl border border-primary/20 shadow-inner group transition-all">
        <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-2">Ideal Body Weight</p>
        <p className="text-7xl font-black text-slate-900 group-hover:scale-105 transition-transform">
          {ibw.toFixed(1)} <span className="text-2xl font-normal opacity-40">kg</span>
        </p>
      </div>
      
      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60">Healthy Range (±10%)</p>
        <p className="text-2xl font-black text-slate-900">
          {rangeMin.toFixed(1)}kg - {rangeMax.toFixed(1)}kg
        </p>
      </div>
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        What is your "perfect" weight? While health is multifaceted, scientists have developed several formulas to estimate the ideal weight for a person's height and gender.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Devine Formula:</strong> One of the most accurate and widely used medical standards for establishing a baseline for medication dosage and health goals.</li>
        <li><strong>Body Type:</strong> Remember that these formulas do not account for muscle mass or bone density. A very muscular individual may weigh more than their "ideal" while still being extremely healthy.</li>
      </ul>
    </div>
  );

  const formula = "Devine Formula (50kg/45.5kg + 2.3kg/inch over 5ft)";

  const examples = [
    {
      title: "Average Male (177cm)",
      description: "A 5'10\" man has an ideal weight of approximately 73kg according to the Devine formula."
    },
    {
      title: "Average Female (162cm)",
      description: "A 5'4\" woman has an ideal weight of approximately 54.7kg according to the same standard."
    }
  ];

  const faqs = [
    {
      q: "Is ideal weight the same for everyone?",
      a: "No. It is a mathematical model. Your specific ideal weight depends on your body composition (lean muscle vs fat mass)."
    },
    {
      q: "Why is muscle mass important?",
      a: "Muscle is significantly denser than fat. Athletes often fall into 'overweight' categories on simple height-weight charts while having very low body fat percentages."
    }
  ];

  return (
    <CalculatorLayout
      title="Ideal Weight Calculator"
      seoTitle="Ideal Weight Calculator - Scientifically Proven Healthy Weight"
      description="Find the healthy weight range for your height and gender using scientifically backed formulas like the Devine and Robinson equations."
      path="/health/ideal-weight"
      icon={Dumbbell}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
    />
  );
}
