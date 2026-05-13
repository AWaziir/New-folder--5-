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
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">What is Body Mass Index (BMI)?</h3>
        <p className="text-slate-500 leading-relaxed">
          The Body Mass Index (BMI) is a globally recognized metric used to estimate whether a person has a healthy amount of body fat based on their height and weight. While it doesn't measure body fat directly, it correlates strongly with more direct measures of body fatness and is a critical screening tool for identifying potential weight-related health risks.
        </p>
      </div>

      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <h4 className="font-bold text-slate-900 mb-4">How to Interpret Your Results:</h4>
        <ul className="space-y-3 text-slate-600">
          <li className="flex gap-2">
            <span className="font-bold text-blue-600 shrink-0">Underweight (&lt; 18.5):</span> 
            <span>May suggest you are not eating enough or have an underlying medical condition. It's often associated with a higher risk of osteoporosis and a weakened immune system.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-green-600 shrink-0">Healthy Weight (18.5 – 24.9):</span> 
            <span>The target range for most adults. Staying in this range significantly reduces the risk of heart disease, type 2 diabetes, and certain cancers.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-yellow-600 shrink-0">Overweight (25 – 29.9):</span> 
            <span>Indicates you are carrying excess weight relative to your height. It's a signal to evaluate your diet and physical activity to prevent moving into the obesity category.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-red-600 shrink-0">Obesity (≥ 30):</span> 
            <span>Associated with a significantly increased risk of chronic diseases. Healthcare providers often use this as a primary indicator for metabolic health interventions.</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">A Vital Health Baseline</h3>
        <p className="text-slate-500 leading-relaxed">
          Think of your BMI as a baseline. It's a starting point for a conversation with your doctor about your overall wellness. By tracking your BMI over time, you can visualize the impact of lifestyle changes and stay motivated on your journey to a healthier you.
        </p>
      </div>
    </div>
  );

  const formula = "BMI = kg / m² (Metric) OR 703 × lbs / in² (Imperial)";

  const examples = [
    {
      title: "Average Healthy Adult",
      description: "An adult who is 175cm tall and weighs 70kg has a BMI of 22.9. This falls comfortably within the 'Healthy weight' range, indicating a lower risk of weight-related chronic conditions."
    },
    {
      title: "Weight Loss Goal Setting",
      description: "If an individual is 170cm and weighs 90kg, their BMI is 31.1 (Obesity). By using this tool, they can calculate that reaching 72kg would bring their BMI to 24.9, successfully moving into the 'Healthy weight' category."
    }
  ];

  const faqs = [
    {
      q: "Is BMI accurate for athletes?",
      a: "BMI can sometimes overestimate body fat in athletes or people with a muscular build because muscle is much denser than fat. A muscular person may have a 'high' BMI but very low body fat. For these individuals, waist-to-hip ratio or skinfold measurements are better metrics."
    },
    {
      q: "Why does the calculation use height squared?",
      a: "The height is squared because weight is generally proportional to the square of height in humans. This 'Power Law' relationship was first identified by Adolphe Quetelet in the 19th century and remains the foundation of the BMI formula today."
    },
    {
      q: "Is BMI the same for men and women?",
      a: "The BMI formula is the same for men and women. However, women naturally tend to have more body fat than men at the same BMI. Healthcare providers take gender and age into account when interpreting your BMI score in a clinical setting."
    },
    {
      q: "How often should I check my BMI?",
      a: "Weight can fluctuate daily due to hydration and other factors. We recommend checking your BMI once a month or once a week at the same time of day (preferably in the morning) to track meaningful trends in your health."
    },
    {
      q: "Is BMI used for children?",
      a: "While the formula is the same, BMI for children and teens (ages 2-19) is interpreted differently. It must be compared to growth charts for the child's specific age and biological sex to determine a BMI-for-age percentile."
    }
  ];

  const whyUse = [
    { title: "Risk Identification", text: "Quickly identify if you are in a weight category that increases your risk for hypertension, stroke, or type 2 diabetes." },
    { title: "Progress Tracking", text: "Perfect for monitoring the results of a new diet or fitness regimen with a standardized, objective numeric score." },
    { title: "Medical Standard", text: "Use the same tool that doctors and clinical researchers use to categorize health data and make treatment recommendations." },
    { title: "Universal Clarity", text: "Easily understand your weight status without needing expensive body composition equipment or professional help." }
  ];

  const keyFeatures = [
    { title: "Instant Conversion", text: "Seamlessly switch between Metric and Imperial units with zero re-typing required, making it easy for users worldwide." },
    { title: "Dynamic Analysis", text: "Your BMI and health category update live as you move the sliders or type in your measurements." },
    { title: "WHO Aligned", text: "Our categorization logic follows the official World Health Organization (WHO) body mass index classifications strictly." }
  ];

  const proTips = [
    "Muscle mass can skew results; if you're a bodybuilder, focus on body fat percentage instead.",
    "Waist circumference is a powerful secondary measure; aim for less than half your height in inches around your waist.",
    "Stay hydrated! Water retention can temporarily increase weight and affect your daily BMI reading.",
    "Use your BMI as a trend-line over months, not a day-to-day anxiety source.",
    "Always consult a healthcare professional before starting a drastic weight loss or exercise program based on your BMI."
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
