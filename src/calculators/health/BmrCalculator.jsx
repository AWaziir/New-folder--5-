import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function BmrCalculator() {
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(70);

  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateBmr();
  }, [age, gender, height, weight]);

  const calculateBmr = () => {
    if (age <= 0 || height <= 0 || weight <= 0) return;

    let bmr;
    if (gender === 'male') {
      // Mifflin-St Jeor
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    setResult(Math.round(bmr));
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

      <div className="grid grid-cols-1 gap-4">
        <div className="input-group">
            <label className="input-label">Age (Years)</label>
            <input type="number" className="input-field font-black" value={age} onChange={e => setAge(Number(e.target.value))} />
        </div>
        <div className="input-group">
            <label className="input-label">Height (cm)</label>
            <input type="number" className="input-field font-black" value={height} onChange={e => setHeight(Number(e.target.value))} />
        </div>
        <div className="input-group">
            <label className="input-label">Weight (kg)</label>
            <input type="number" className="input-field font-black" value={weight} onChange={e => setWeight(Number(e.target.value))} />
        </div>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6">
      {result ? (
        <div className="space-y-6 text-center">
          <div className="p-10 bg-primary/5 rounded-2xl border border-primary/20 shadow-inner group transition-all">
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-2">Basal Metabolic Rate</p>
            <p className="text-7xl font-black text-slate-900 group-hover:scale-105 transition-transform">
              {result.toLocaleString()}
            </p>
            <p className="text-xs font-bold uppercase tracking-widest opacity-40 mt-2">Calories / Day</p>
          </div>
          <p className="text-xs text-muted leading-relaxed px-4 opacity-60">
            This is the energy required to keep your body functioning at rest.
          </p>
        </div>
      ) : (
        <div className="py-12 italic opacity-40 text-center">Calculating BMR...</div>
      )}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        Your Basal Metabolic Rate (BMR) is the amount of energy (calories) your body burns to maintain vital functions like breathing, circulation, and cell production while you are at complete rest.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Metabolism:</strong> BMR accounts for 60-75% of your total daily calorie expenditure.</li>
        <li><strong>Resting State:</strong> To measure BMR accurately, your body must be at rest and in a temperate environment.</li>
      </ul>
    </div>
  );

  const formula = "Mifflin-St Jeor Equation";

  const examples = [
    {
      title: "Weight Loss Strategy",
      description: "Knowing your BMR helps you set a realistic calorie deficit. If your BMR is 1,600 and you are moderately active (TDEE ~2,200), eating 1,700 calories will ensure steady weight loss."
    },
    {
      title: "Age & Metabolism",
      description: "As you age, BMR typically decreases by 2-3% per decade, which is why calorie requirements often change over time."
    }
  ];

  const faqs = [
    {
      q: "Difference between BMR and RMR?",
      a: "BMR is measured under strict restrictive conditions, while RMR (Resting Metabolic Rate) is measured under less restrictive conditions. They are often within 10% of each other."
    },
    {
      q: "Can I increase my BMR?",
      a: "Yes. Muscle tissue burns more calories at rest than fat tissue. Increasing your lean muscle mass through strength training will raise your BMR."
    }
  ];

  const whyUse = [
    { title: "Foundation for Weight Loss", text: "BMR is the baseline for any effective diet plan. Eat below your TDEE (BMR × activity factor) to lose weight; above it to gain." },
    { title: "Understand Your Metabolism", text: "Learn how age, gender, height, and weight interact to determine how many calories you burn every day just to stay alive." },
    { title: "Set Realistic Calorie Goals", text: "Never guess at calorie targets again — use your BMR as the scientific starting point for any nutrition plan." },
    { title: "Track Metabolic Changes", text: "Recalculate as you lose weight or gain muscle to keep your calorie targets accurate over time." }
  ];

  const keyFeatures = [
    { title: "Mifflin-St Jeor Formula", text: "Uses the gold-standard equation recommended by the Academy of Nutrition and Dietetics for most accurate BMR estimates." },
    { title: "Gender-Specific Calculation", text: "Applies different formulas for males and females, accounting for average body composition differences." },
    { title: "Instant Results", text: "BMR updates in real time as you adjust age, height, weight, or gender — no button press needed." }
  ];

  const proTips = [
    "Your BMR is not the same as how many calories you should eat — multiply BMR by your activity factor to get TDEE (Total Daily Energy Expenditure).",
    "Muscle burns ~6 cal/lb/day at rest while fat burns ~2 cal/lb/day — building lean muscle raises your BMR over time.",
    "Crash diets below 1,200 cal/day (women) or 1,500 cal/day (men) can suppress BMR through metabolic adaptation.",
    "BMR decreases roughly 2–3% per decade after age 30 — adjust calorie targets as you age.",
    "The Mifflin-St Jeor formula is most accurate for average-build adults. Athletes and very obese individuals may see less accuracy."
  ];

  const relatedTools = [
    { name: "TDEE Calculator", path: "/health/tdee-calculator" },
    { name: "Calorie Calculator", path: "/health/calorie-calculator" },
    { name: "BMI Calculator", path: "/health/bmi-calculator" },
    { name: "Ideal Weight Calculator", path: "/health/ideal-weight" }
  ];

  return (
    <CalculatorLayout 
      title="BMR Calculator"
      seoTitle="BMR Calculator - Basal Metabolic Rate Estimator"
      description="Calculate your Basal Metabolic Rate (BMR) using the Mifflin-St Jeor equation. Discover how many calories your body burns at complete rest."
      path="/health/bmr-calculator"
      icon={Activity}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
      whyUse={whyUse}
      keyFeatures={keyFeatures}
      proTips={proTips}
      relatedTools={relatedTools}
    />
  );
}
