import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function TdeeCalculator() {
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(70);
  const [activity, setActivity] = useState(1.2);

  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateTdee();
  }, [age, gender, height, weight, activity]);

  const calculateTdee = () => {
    if (age <= 0 || height <= 0 || weight <= 0) return;

    let bmr;
    if (gender === 'male') {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    const maintenance = Math.round(bmr * activity);
    
    setResult({
      bmr: Math.round(bmr),
      maintenance,
      cutLow: Math.round(maintenance - 500),
      cutHigh: Math.round(maintenance - 1000),
      bulkLow: Math.round(maintenance + 300),
      bulkHigh: Math.round(maintenance + 500)
    });
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
      
      <div className="grid grid-cols-3 gap-4">
          <div className="input-group">
              <label className="input-label">Age</label>
              <input type="number" className="input-field font-black" value={age} onChange={e => setAge(Number(e.target.value))} />
          </div>
          <div className="input-group">
              <label className="input-label">Ht (cm)</label>
              <input type="number" className="input-field font-black" value={height} onChange={e => setHeight(Number(e.target.value))} />
          </div>
          <div className="input-group">
              <label className="input-label">Wt (kg)</label>
              <input type="number" className="input-field font-black" value={weight} onChange={e => setWeight(Number(e.target.value))} />
          </div>
      </div>

      <div className="input-group">
          <label className="input-label">Activity Level</label>
          <select className="input-field font-bold" value={activity} onChange={e => setActivity(Number(e.target.value))}>
              <option value={1.2}>Sedentary (No Exercise)</option>
              <option value={1.375}>Lightly Active (1-3 days/week)</option>
              <option value={1.55}>Moderately Active (3-5 days/week)</option>
              <option value={1.725}>Very Active (6-7 days/week)</option>
              <option value={1.9}>Extra Active (Athlete / Heavy Job)</option>
          </select>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6 text-center">
      {result ? (
        <div className="space-y-6">
          <div className="p-10 bg-primary/5 rounded-2xl border border-primary/20 shadow-inner group transition-all">
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-2">Maintenance Calories</p>
            <p className="text-7xl font-black text-slate-900 group-hover:scale-105 transition-transform">
                {result.maintenance}
            </p>
            <p className="text-xs font-bold uppercase tracking-widest opacity-40 mt-2">Energy Expenditure (TDEE)</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60 text-red-600">Weight Loss</p>
                <p className="text-2xl font-black text-slate-900">{result.cutLow}</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60 text-green-600">Weight Gain</p>
                <p className="text-2xl font-black text-slate-900">{result.bulkLow}</p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl text-center border border-slate-100">
              <span className="text-xs opacity-40 uppercase tracking-widest mr-2">Your BMR:</span>
              <span className="font-black text-slate-900">{result.bmr} kcal/day</span>
          </div>
        </div>
      ) : (
        <div className="py-12 italic opacity-40 text-center">Enter details to calculate TDEE...</div>
      )}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        Your Total Daily Energy Expenditure (TDEE) is an estimation of how many calories you burn per day when exercise is taken into account. It is calculated by first figuring out your Basal Metabolic Rate (BMR), then multiplying that value by an activity multiplier.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Maintenance:</strong> The number of calories you need to eat to stay exactly at your current weight.</li>
        <li><strong>Cutting:</strong> Eating below maintenance to lose body fat.</li>
        <li><strong>Bulking:</strong> Eating above maintenance to gain muscle mass.</li>
      </ul>
    </div>
  );

  const formula = "TDEE = BMR × Activity Multiplier";

  const examples = [
    {
      title: "Fitness Journey",
      description: "A sedentary person (TDEE 2,000) who starts exercising 4 days a week might see their TDEE jump to 2,500, allowing them to eat more while losing fat."
    },
    {
      title: "Calorie Deficit",
      description: "A standard deficit of 500 calories per day typically results in 0.5kg (1.1 lbs) of weight loss per week."
    }
  ];

  const faqs = [
    {
      q: "How accurate is TDEE?",
      a: "TDEE is an estimate. Metabolism varies from person to person. Use this as a starting point and adjust based on your actual weight changes over 2-3 weeks."
    },
    {
      q: "What if I have a physical job?",
      a: "Choose 'Very Active' or 'Extra Active'. Non-Exercise Activity Thermogenesis (NEAT) from movement throughout the day can significantly increase your TDEE."
    }
  ];

  return (
    <CalculatorLayout 
      title="TDEE"
      seoTitle="TDEE Calculator - Total Daily Energy Expenditure Tool"
      description="Discover how many calories your body actually burns per day based on your age, height, weight, and activity level. Plan your weight loss or gain with precision."
      path="/health/tdee-calculator"
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
