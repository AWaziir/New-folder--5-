import React, { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function CalorieCalculator() {
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(70);
  const [activity, setActivity] = useState(1.2); // Sedentary

  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateCalories();
  }, [age, gender, height, weight, activity]);

  const calculateCalories = () => {
    if (age <= 0 || height <= 0 || weight <= 0) return;

    let bmr;
    if (gender === 'male') {
      // Mifflin-St Jeor Formula
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    const maintenance = Math.round(bmr * activity);
    
    setResult({
      bmr: Math.round(bmr),
      maintenance,
      loseWeight: Math.round(maintenance - 500),
      gainWeight: Math.round(maintenance + 500)
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
            <input type="number" className="input-field" value={age} onChange={e => setAge(Number(e.target.value))} />
        </div>
        <div className="input-group">
            <label className="input-label">Ht (cm)</label>
            <input type="number" className="input-field" value={height} onChange={e => setHeight(Number(e.target.value))} />
        </div>
        <div className="input-group">
            <label className="input-label">Wt (kg)</label>
            <input type="number" className="input-field" value={weight} onChange={e => setWeight(Number(e.target.value))} />
        </div>
      </div>

      <div className="input-group">
          <label className="input-label">Activity Level</label>
          <select className="input-field font-bold" value={activity} onChange={e => setActivity(Number(e.target.value))}>
              <option value={1.2}>Sedentary (No Exercise)</option>
              <option value={1.375}>Lightly Active (1-3 days/week)</option>
              <option value={1.55}>Moderately Active (3-5 days/week)</option>
              <option value={1.725}>Very Active (6-7 days/week)</option>
              <option value={1.9}>Extra Active (Physical Work/Daily Exercise)</option>
          </select>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6">
      {result ? (
        <div className="space-y-6">
          <div className="p-8 bg-primary/5 rounded-2xl text-center border border-primary/20 shadow-inner group">
            <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Weight Maintenance</p>
            <p className="text-6xl font-black text-slate-900 group-hover:scale-105 transition">{result.maintenance.toLocaleString()}</p>
            <p className="text-xs font-bold uppercase tracking-widest opacity-40 mt-2">Calories / Day</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <p className="text-xs uppercase font-bold opacity-40 tracking-widest mb-1 text-pink-400">Weight Loss</p>
                <p className="text-2xl font-black text-slate-900">{result.loseWeight.toLocaleString()}</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <p className="text-xs uppercase font-bold opacity-40 tracking-widest mb-1 text-green-600">Muscle Gain</p>
                <p className="text-2xl font-black text-slate-900">{result.gainWeight.toLocaleString()}</p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg text-center">
              <span className="text-xs opacity-40 mr-2">Your BMR:</span>
              <span className="font-bold text-slate-900">{result.bmr} kcal</span>
          </div>
        </div>
      ) : (
        <div className="py-12 text-center text-muted opacity-40 italic">Enter details.</div>
      )}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        Calculate your Total Daily Energy Expenditure (TDEE). This tool estimates how many calories your body burns in a day based on your age, gender, dimensions, and activity level.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>BMR:</strong> The calories your body burns just staying alive in a resting state.</li>
        <li><strong>Activity Multiplier:</strong> Adjust your calories based on how much you move.</li>
        <li><strong>Deficit:</strong> Eating 500 calories less than maintenance typically leads to ~0.5kg weight loss per week.</li>
      </ul>
    </div>
  );

  const formula = "Mifflin-St Jeor Equation × Activity Factor";

  const examples = [
    {
      title: "Active Lifter",
      description: "A 90kg male who is 'Very Active' may need over 3,500 calories to maintain weight, while a sedentary person of the same size may only need 2,400."
    },
    {
      title: "Fat Loss Phase",
      description: "If your maintenance is 2,500 Cal, set your goal to 2,000 Cal to see steady fat loss while maintaining energy."
    }
  ];

  const faqs = [
    {
      q: "How accurate is the Mifflin-St Jeor formula?",
      a: "It is widely considered the most accurate formula for predicting RMR in non-obese individuals. However, individual metabolic variations always exist."
    },
    {
      q: "Can I eat anything as long as I hit the total?",
      a: "For weight change, total calories are king. For body composition and health, the distribution of macronutrients (protein, carbs, fats) matters significantly."
    }
  ];

  return (
    <CalculatorLayout 
      title="Calorie Calculator"
      seoTitle="Calorie Calculator - Daily Energy Expenditure Tool"
      description="Estimate your daily calorie needs for weight maintenance, loss, or gain. Personalized calorie tracking based on the Mifflin-St Jeor formula."
      path="/health/calorie-calculator"
      icon={Flame}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
    />
  );
}
