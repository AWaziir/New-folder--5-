import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Activity } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function BmiCalculator() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [gender, setGender] = useState(searchParams.get('gender') || 'male');
  const [unitSystem, setUnitSystem] = useState(searchParams.get('unit') || 'metric');
  const [cm, setCm] = useState(Number(searchParams.get('cm')) || 170);
  const [kg, setKg] = useState(Number(searchParams.get('kg')) || 70);
  const [ft, setFt] = useState(Number(searchParams.get('ft')) || 5);
  const [inch, setInch] = useState(Number(searchParams.get('in')) || 7);
  const [lbs, setLbs] = useState(Number(searchParams.get('lbs')) || 150);

  const [result, setResult] = useState(null);

  useEffect(() => {
    // Update URL sync
    setSearchParams({
        gender, unit: unitSystem, cm, kg, ft, in: inch, lbs
    }, { replace: true });
    
    calculateBMI();
  }, [gender, unitSystem, cm, kg, ft, inch, lbs, setSearchParams]);

  const calculateBMI = () => {
    let bmiValue = 0;
    
    if (unitSystem === 'metric') {
      if (cm > 0 && kg > 0) {
        const heightM = cm / 100;
        bmiValue = kg / (heightM * heightM);
      }
    } else {
      if ((ft > 0 || inch > 0) && lbs > 0) {
        const totalInches = (ft * 12) + inch;
        bmiValue = 703 * lbs / (totalInches * totalInches);
      }
    }

    if (bmiValue > 0 && bmiValue < 100) { 
      let category = '';
      let colorClass = '';
      
      if (bmiValue < 18.5) {
        category = 'Underweight';
        colorClass = 'text-blue-600';
      } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        category = 'Normal weight';
        colorClass = 'text-green-600';
      } else if (bmiValue >= 25 && bmiValue <= 29.9) {
        category = 'Overweight';
        colorClass = 'text-yellow-600';
      } else {
        category = 'Obesity';
        colorClass = 'text-red-600';
      }

      setResult({
        bmi: bmiValue.toFixed(1),
        category,
        colorClass
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

        <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-200">
            <button 
                className={`flex-1 py-2 rounded-md text-xs font-bold transition ${unitSystem === 'metric' ? 'bg-slate-100 text-slate-900' : 'text-muted'}`}
                onClick={() => setUnitSystem('metric')}
            >
                Metric
            </button>
            <button 
                className={`flex-1 py-2 rounded-md text-xs font-bold transition ${unitSystem === 'imperial' ? 'bg-slate-100 text-slate-900' : 'text-muted'}`}
                onClick={() => setUnitSystem('imperial')}
            >
                Imperial
            </button>
        </div>
        
        {unitSystem === 'metric' ? (
            <div className="space-y-4">
                <div className="input-group">
                    <label className="input-label">Height (cm)</label>
                    <input type="number" className="input-field font-black" value={cm} onChange={e => setCm(Number(e.target.value))} />
                </div>
                <div className="input-group">
                    <label className="input-label">Weight (kg)</label>
                    <input type="number" className="input-field font-black" value={kg} onChange={e => setKg(Number(e.target.value))} />
                </div>
            </div>
        ) : (
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="input-group">
                        <label className="input-label">Height (ft)</label>
                        <input type="number" className="input-field font-black" value={ft} onChange={e => setFt(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Height (in)</label>
                        <input type="number" max="11" className="input-field font-black" value={inch} onChange={e => setInch(Number(e.target.value))} />
                    </div>
                </div>
                <div className="input-group">
                    <label className="input-label">Weight (lbs)</label>
                    <input type="number" className="input-field font-black" value={lbs} onChange={e => setLbs(Number(e.target.value))} />
                </div>
            </div>
        )}
    </div>
  );

  const results = (
    <div className="space-y-6">
        {result ? (
            <div className="space-y-6 text-center">
                <div className="p-10 bg-primary/5 rounded-2xl border border-primary/20 shadow-inner group transition-all">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-2">Your Body Mass Index</p>
                    <p className="text-7xl font-black text-slate-900 group-hover:scale-105 transition-transform">{result.bmi}</p>
                    <p className={`text-sm font-bold uppercase tracking-widest mt-2 ${result.colorClass}`}>{result.category}</p>
                </div>
                
                <div className="space-y-2">
                    {[
                        { label: 'Underweight', range: '< 18.5', active: result.category === 'Underweight', color: 'text-blue-600' },
                        { label: 'Normal weight', range: '18.5 - 24.9', active: result.category === 'Normal weight', color: 'text-green-600' },
                        { label: 'Overweight', range: '25 - 29.9', active: result.category === 'Overweight', color: 'text-yellow-600' },
                        { label: 'Obesity', range: '≥ 30', active: result.category === 'Obesity', color: 'text-red-600' },
                    ].map((cat) => (
                        <div key={cat.label} className={`flex justify-between p-3 rounded-xl border transition-all ${cat.active ? `bg-slate-50 border-slate-300 scale-[1.02] shadow-sm ${cat.color}` : 'border-transparent opacity-40 text-slate-900 text-xs'}`}>
                            <span className="font-bold">{cat.label}</span>
                            <span className="font-mono">{cat.range}</span>
                        </div>
                    ))}
                </div>
            </div>
        ) : (
            <div className="py-12 italic opacity-40 text-center">Enter your details to calculate BMI.</div>
        )}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
        <p>
            The Body Mass Index (BMI) is a universal standard used to determine whether a person is at a healthy weight for their height. It provides a simple numeric score that categorizes people into different health ranges.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm">
            <li><strong>Underweight:</strong> May indicate malnutrition or underlying health issues.</li>
            <li><strong>Normal:</strong> The target range for optimal cardiovascular health.</li>
            <li><strong>Overweight/Obese:</strong> Indicates an increased risk for type 2 diabetes and heart disease.</li>
        </ul>
    </div>
  );

  const formula = "BMI = kg / m² (Metric) OR 703 × lbs / in² (Imperial)";

  const examples = [
    {
      title: "Average Adult",
      description: "A 175cm person weighing 70kg has a BMI of 22.9, which is squarely within the 'Normal weight' category."
    },
    {
      title: "Weight Management Goal",
      description: "If a person is 175cm and weighs 90kg (BMI 29.4), reducing weight to 76kg would bring them into the healthy 'Normal' range."
    }
  ];

  const faqs = [
      {
          q: "Is BMI accurate for everyone?",
          a: "It is an excellent general population tool but can be inaccurate for athletes with high muscle mass, as muscle is denser than fat."
      },
      {
          q: "What is the BMI range for seniors?",
          a: "Some healthcare providers suggest that a slightly higher BMI (25-27) may be beneficial for older adults to protect against bone density loss."
      }
  ];

  const whyUse = [
    { title: "Health Screening", text: "A quick and easy way to screen for weight categories that may lead to health problems." },
    { title: "Universal Standard", text: "Used by doctors and healthcare professionals worldwide to assess weight-related risks." },
    { title: "Baseline Metric", text: "Provides a reliable baseline for tracking weight management progress over time." },
    { title: "Risk Assessment", text: "Identify potential risks for conditions like type 2 diabetes and hypertension." }
  ];

  const keyFeatures = [
    { title: "Dual Unit Systems", text: "Seamlessly switch between Metric (cm/kg) and Imperial (ft/in/lbs) units." },
    { title: "WHO Standards", text: "Categorization based on official World Health Organization (WHO) BMI classifications." },
    { title: "Visual Comparison", text: "Instant visual feedback showing where you sit on the spectrum of health categories." }
  ];

  const proTips = [
    "Muscle is denser than fat, so athletes might have a high BMI without being overweight.",
    "Waist circumference is a great secondary measure to use alongside BMI.",
    "For children and teens, BMI is interpreted differently using age-and-gender-specific percentiles.",
    "Hydration levels and time of day can slightly affect weight; weigh yourself at the same time for consistency."
  ];

  const relatedTools = [
    { name: "BMR Calculator", path: "/health/bmr-calculator" },
    { name: "Calorie Calculator", path: "/health/calorie-calculator" },
    { name: "Ideal Weight Calculator", path: "/health/ideal-body-weight-calculator" },
    { name: "Body Fat Calculator", path: "/health/body-fat-calculator" }
  ];

  return (
    <CalculatorLayout 
        title="BMI Calculator"
        seoTitle="Advanced BMI Calculator - Body Mass Index & Health Analysis"
        description="Understand your weight in context. Calculate your BMI using WHO standards and get insights into your health category and risk factors."
        path="/health/bmi-calculator"
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
