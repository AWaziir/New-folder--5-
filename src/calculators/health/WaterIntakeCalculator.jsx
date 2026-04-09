import React, { useState } from 'react';
import { Droplets } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState(70);
  const [activity, setActivity] = useState(30); // minutes of exercise per day

  // General recommendation: 
  // Base: 0.033 liters per kilogram of body weight
  // Activity: Add ~350ml (0.35L) for every 30 mins of exercise
  const calculateWater = () => {
    const baseIntake = weight * 0.033;
    const activityIntake = (activity / 30) * 0.35;
    return baseIntake + activityIntake;
  };

  const totalLiters = calculateWater();
  const totalGlasses = totalLiters / 0.25; // standard 250ml glass

  const InputPanel = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Body Weight (kg)</label>
        <div className="flex items-center gap-4">
          <input 
            type="range" 
            min="30" 
            max="200" 
            value={weight} 
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full accent-primary h-2 bg-secondary rounded-lg appearance-none cursor-pointer flex-grow"
          />
          <input 
            type="number" 
            className="input-field w-24 text-center font-bold" 
            value={weight} 
            onChange={(e) => setWeight(Number(e.target.value))} 
          />
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">Daily Exercise (minutes)</label>
        <div className="flex items-center gap-4">
          <input 
            type="range" 
            min="0" 
            max="180" 
            step="15"
            value={activity} 
            onChange={(e) => setActivity(Number(e.target.value))}
            className="w-full accent-primary h-2 bg-secondary rounded-lg appearance-none cursor-pointer flex-grow"
          />
          <input 
            type="number" 
            className="input-field w-24 text-center font-bold" 
            value={activity} 
            onChange={(e) => setActivity(Number(e.target.value))} 
          />
        </div>
      </div>
    </div>
  );

  const ResultPanel = (
    <div className="flex flex-col h-full justify-center">
      <div className="mb-6 p-8 bg-blue-500/10 rounded-xl border-2 border-blue-500/30 text-center flex flex-col items-center justify-center relative shadow-inner">
        <p className="text-blue-400 mb-2 font-black uppercase tracking-widest text-sm drop-shadow">Daily Water Intake</p>
        <p className="text-6xl font-black text-white drop-shadow-md">
          {totalLiters.toFixed(2)} <span className="text-2xl font-normal opacity-70">Liters</span>
        </p>
      </div>
      
      <div className="p-4 bg-secondary/50 rounded-lg border-l-4 border-blue-400 text-center">
        <p className="text-muted text-sm font-bold uppercase mb-1">Equivalent to</p>
        <p className="text-xl font-black text-white">
          ~{Math.round(totalGlasses)} Glasses <span className="text-sm font-normal opacity-60">(250ml each)</span>
        </p>
      </div>
    </div>
  );

  const faqs = [
    {
      q: "Does coffee or tea count toward water intake?",
      a: "Yes, though pure water is best. Beverages like coffee and tea do contribute to your daily hydration, though their caffeine content has a mild diuretic effect."
    },
    {
      q: "Why does exercise increase water needs?",
      a: "When you exercise, your body loses fluids through sweat to regulate temperature. Replacing these fluids is critical to prevent dehydration, which can lead to fatigue and reduced performance."
    }
  ];

  return (
    <CalculatorLayout
      title="Water Intake Calculator"
      description="Calculate your recommended daily water consumption based on your weight and physical activity levels."
      path="/health/water-intake"
      icon={Droplets}
      inputs={InputPanel}
      results={ResultPanel}
      faqs={faqs}
      instructions={<p>Enter your current weight and the average amount of time you spend exercising each day. The calculator will provide a target fluid intake to keep you properly hydrated.</p>}
    />
  );
}
