import React, { useState } from 'react';
import { Dumbbell } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function IdealWeightCalculator() {
  const [height, setHeight] = useState(170); // cm
  const [gender, setGender] = useState('male');

  // Devine Formula (1974)
  // Men: Ideal Body Weight (kg) = 50 + 2.3 kg per inch over 5 feet
  // Women: Ideal Body Weight (kg) = 45.5 + 2.3 kg per inch over 5 feet
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

  const InputPanel = (
    <div className="space-y-6">
      <div className="flex gap-4">
        <button 
          className={`flex-1 py-3 rounded-lg font-bold border-2 transition ${gender === 'male' ? 'bg-primary border-primary text-white shadow-lg' : 'bg-secondary border-transparent text-muted'}`}
          onClick={() => setGender('male')}
        >
          Male
        </button>
        <button 
          className={`flex-1 py-3 rounded-lg font-bold border-2 transition ${gender === 'female' ? 'bg-primary border-primary text-white shadow-lg' : 'bg-secondary border-transparent text-muted'}`}
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
            className="w-full accent-primary h-2 bg-secondary rounded-lg appearance-none cursor-pointer flex-grow"
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

  const ResultPanel = (
    <div className="flex flex-col h-full justify-center">
      <div className="mb-6 p-8 bg-primary/10 rounded-xl border-2 border-primary/30 text-center flex flex-col items-center justify-center relative shadow-inner">
        <p className="text-primary-light mb-2 font-black uppercase tracking-widest text-sm drop-shadow">Ideal Body Weight</p>
        <p className="text-6xl font-black text-white drop-shadow-md">
          {ibw.toFixed(1)} <span className="text-2xl font-normal opacity-70">kg</span>
        </p>
      </div>
      
      <div className="p-4 bg-secondary/50 rounded-lg border-l-4 border-success text-center">
        <p className="text-muted text-sm font-bold uppercase mb-1">Recommended Range</p>
        <p className="text-xl font-black text-white">
          {rangeMin.toFixed(1)}kg - {rangeMax.toFixed(1)}kg
        </p>
      </div>
    </div>
  );

  const faqs = [
    {
      q: "What is the Devine Formula?",
      a: "The Devine formula is the most widely used formula for calculating ideal body weight in clinical settings. It was originally designed to help calculate dosages for specific medications but has become a standard general health metric."
    },
    {
      q: "Is ideal weight the same for everyone of the same height?",
      a: "No. While formulas provide a mathematical baseline, individual ideal weights vary based on muscle mass, bone density, and overall frame size. Athletes often weigh more than their 'ideal' weight due to muscle being denser than fat."
    }
  ];

  return (
    <CalculatorLayout
      title="Ideal Weight Calculator"
      description="Find the healthy weight range for your height and gender using scientifically backed formulas."
      path="/health/ideal-weight"
      icon={Dumbbell}
      inputs={InputPanel}
      results={ResultPanel}
      faqs={faqs}
      formula="Devine Formula: Men = 50kg + 2.3kg/inch over 5ft | Women = 45.5kg + 2.3kg/inch over 5ft"
    />
  );
}
