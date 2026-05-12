import React, { useState } from 'react';
import { Droplets } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState(70);
  const [activity, setActivity] = useState(30); // minutes of exercise per day

  // General recommendation: 
  const calculateWater = () => {
    const baseIntake = weight * 0.033;
    const activityIntake = (activity / 30) * 0.35;
    return baseIntake + activityIntake;
  };

  const totalLiters = calculateWater();
  const totalGlasses = totalLiters / 0.25; // standard 250ml glass

  const inputs = (
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
            className="flex-grow h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <input 
            type="number" 
            className="input-field w-24 text-center font-black" 
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
            className="flex-grow h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-400"
          />
          <input 
            type="number" 
            className="input-field w-24 text-center font-black" 
            value={activity} 
            onChange={(e) => setActivity(Number(e.target.value))} 
          />
        </div>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6 text-center">
      <div className="p-10 bg-blue-600/20 rounded-2xl border border-blue-500/30 shadow-inner group transition-all">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-2">Daily hydration Goal</p>
        <p className="text-7xl font-black text-slate-900 group-hover:scale-105 transition-transform">
          {totalLiters.toFixed(2)} <span className="text-2xl font-normal opacity-40">Liters</span>
        </p>
      </div>
      
      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60">Equivalent Volume</p>
        <p className="text-2xl font-black text-slate-900">
          ~{Math.round(totalGlasses)} <span className="text-sm font-normal opacity-40">Glasses (250ml)</span>
        </p>
      </div>
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        Stay perfectly hydrated by knowing exactly how much water your body needs based on your physical dimensions and activity level. Hydration is key to energy, focus, and physical recovery.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Base Needs:</strong> Your body requires water for basic cellular functions even when sedentary.</li>
        <li><strong>Exercise Multiplier:</strong> Physical activity causes fluid loss through sweat, which must be replaced to prevent fatigue.</li>
      </ul>
    </div>
  );

  const formula = "Intake = (Weight × 0.033) + (Activity / 30 × 0.35)";

  const examples = [
    {
      title: "Sedentary Adult",
      description: "A 70kg adult with minimal exercise needs approximately 2.3 liters of water per day."
    },
    {
      title: "Active Athlete",
      description: "That same 70kg adult doing 60 minutes of intense cardio needs to increase their intake to 3.0 liters."
    }
  ];

  const faqs = [
    {
      q: "Does food count toward my water intake?",
      a: "Yes. Approximately 20% of your daily water intake comes from food, especially fruits and vegetables like watermelon and cucumber."
    },
    {
      q: "What are signs of dehydration?",
      a: "Common indicators include dark-colored urine, dry mouth, headaches, and general fatigue."
    }
  ];

  return (
    <CalculatorLayout
      title="Water Intake"
      seoTitle="Water Intake Calculator - Recommended Daily Hydration Tool"
      description="Calculate your recommended daily water consumption based on your weight and physical activity levels. Stay healthy and energized."
      path="/health/water-intake"
      icon={Droplets}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
    />
  );
}
