import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Activity } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function BmiCalculator() {
  const [searchParams, setSearchParams] = useSearchParams();

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
        unit: unitSystem, cm, kg, ft, in: inch, lbs
    }, { replace: true });
    
    calculateBMI();
  }, [unitSystem, cm, kg, ft, inch, lbs, setSearchParams]);

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

    if (bmiValue > 0 && bmiValue < 100) { // arbitrary max for sanity check
      let category = '';
      let colorClass = '';
      
      if (bmiValue < 18.5) {
        category = 'Underweight';
        colorClass = 'text-blue-500';
      } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        category = 'Normal weight';
        colorClass = 'text-success';
      } else if (bmiValue >= 25 && bmiValue <= 29.9) {
        category = 'Overweight';
        colorClass = 'text-warning-vivid';
      } else {
        category = 'Obesity';
        colorClass = 'text-danger';
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

  const resetForm = () => {
    setUnitSystem('metric');
    setCm(170);
    setKg(70);
    setFt(5);
    setInch(7);
    setLbs(150);
  };

  // Build the Inputs Panel
  const InputPanel = (
    <>
        <div className="flex gap-4 mb-6 print-hide">
            <button 
                className={`flex-1 py-2 rounded-md font-medium transition ${unitSystem === 'metric' ? 'bg-primary text-white' : 'bg-secondary text-text-main hover:bg-border-color'}`}
                onClick={() => setUnitSystem('metric')}
            >
                Metric (cm/kg)
            </button>
            <button 
                className={`flex-1 py-2 rounded-md font-medium transition ${unitSystem === 'imperial' ? 'bg-primary text-white' : 'bg-secondary text-text-main hover:bg-border-color'}`}
                onClick={() => setUnitSystem('imperial')}
            >
                US Units (ft/lbs)
            </button>
        </div>
        
        {unitSystem === 'metric' ? (
            <div className="space-y-4">
                <div className="input-group">
                    <label className="input-label">Height (Centimeters)</label>
                    <input type="number" className="input-field" value={cm} onChange={e => setCm(Number(e.target.value))} />
                </div>
                <div className="input-group">
                    <label className="input-label">Weight (Kilograms)</label>
                    <input type="number" className="input-field" value={kg} onChange={e => setKg(Number(e.target.value))} />
                </div>
            </div>
        ) : (
            <div className="space-y-4">
                <div className="flex gap-4">
                    <div className="input-group flex-1">
                        <label className="input-label">Height (ft)</label>
                        <input type="number" className="input-field" value={ft} onChange={e => setFt(Number(e.target.value))} />
                    </div>
                    <div className="input-group flex-1">
                        <label className="input-label">Height (in)</label>
                        <input type="number" max="11" className="input-field" value={inch} onChange={e => setInch(Number(e.target.value))} />
                    </div>
                </div>
                <div className="input-group">
                    <label className="input-label">Weight (Pounds)</label>
                    <input type="number" className="input-field" value={lbs} onChange={e => setLbs(Number(e.target.value))} />
                </div>
            </div>
        )}

        <button onClick={resetForm} className="btn-outline w-full mt-6 print-hide">
            Clear / Reset Values
        </button>
    </>
  );

  // Build the Results Panel
  const ResultPanel = result ? (
    <div>
        <div className="mb-6 p-6 bg-secondary/50 rounded-xl border border-border-color text-center flex flex-col items-center justify-center">
            <p className="text-muted mb-2 font-medium uppercase tracking-wider text-sm">Your Calculated BMI</p>
            <p className="text-6xl font-black text-primary-light mb-2 drop-shadow-md">{result.bmi}</p>
            <div className={`mt-2 px-6 py-2 rounded-full font-bold text-lg bg-opacity-10 border ${result.colorClass.replace('text-', 'bg-').replace('vivid', '500')} ${result.colorClass.replace('text-', 'border-').replace('vivid', '500')} ${result.colorClass}`}>
                {result.category}
            </div>
        </div>
        
        <h3 className="font-bold text-white mb-4 mt-6">Standard Weight Categories</h3>
        <div className="space-y-2 text-sm font-medium">
            <div className={`flex justify-between p-3 rounded-lg border ${result.category === 'Underweight' ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' : 'border-transparent text-muted'} transition-all`}>
                <span>Underweight</span>
                <span>Less than 18.5</span>
            </div>
            <div className={`flex justify-between p-3 rounded-lg border ${result.category === 'Normal weight' ? 'bg-success/20 border-success/50 text-success' : 'border-transparent text-muted'} transition-all`}>
                <span>Normal weight</span>
                <span>18.5 - 24.9</span>
            </div>
            <div className={`flex justify-between p-3 rounded-lg border ${result.category === 'Overweight' ? 'bg-warning/20 border-warning/50 text-warning' : 'border-transparent text-muted'} transition-all`}>
                <span>Overweight</span>
                <span>25 - 29.9</span>
            </div>
            <div className={`flex justify-between p-3 rounded-lg border ${result.category === 'Obesity' ? 'bg-danger/20 border-danger/50 text-danger' : 'border-transparent text-muted'} transition-all`}>
                <span>Obesity</span>
                <span>30 or greater</span>
            </div>
        </div>
    </div>
  ) : (
    <div className="py-12 flex flex-col items-center justify-center text-center text-muted">
        <Activity className="w-12 h-12 mb-4 opacity-20" />
        <p>Please enter your height and weight<br/>to see your BMI results.</p>
    </div>
  );

  const instructions = (
    <p>
        The Body Mass Index (BMI) is a simple, internationally recognized index of weight-for-height that is commonly used to classify underweight, overweight, and obesity in adults. It is calculated by dividing your weight in kilograms by the square of your height in meters. It is designed to act as a general screener for potential health problems rather than a definitive diagnostic tool.
    </p>
  );

  const formula = "BMI = kg / m²   OR   BMI = (lbs / in²) × 703";

  const faqs = [
      {
          q: "What is a healthy BMI?",
          a: "According to the World Health Organization (WHO), a healthy Adult BMI falls exactly between 18.5 and 24.9. Falling outside this range implies having an increased risk for cardiovascular issues or malnutrition."
      },
      {
          q: "Is BMI accurate for athletes?",
          a: "BMI is largely inaccurate for bodybuilders, athletes, and pregnant women. Because muscle tissue is significantly denser than fat, a highly muscular athlete might naturally trigger the 'Obese' category despite having an extremely low body fat percentage."
      },
      {
          q: "Does BMI measure body fat directly?",
          a: "No. BMI is strictly a ratio of weight versus height. If you want an accurate measure of your actual body composition, you should look into Body Fat Percentage calculators using the U.S. Navy method or biological impedance scales."
      }
  ];

  return (
    <CalculatorLayout 
        title="BMI Calculator"
        seoTitle="BMI Calculator - Body Mass Index for Adults & Kids"
        description="Instantly calculate your Body Mass Index (BMI) and discover whether your weight falls into a healthy range according to WHO standards."
        path="/health/bmi-calculator"
        icon={Activity}
        inputs={InputPanel}
        results={ResultPanel}
        instructions={instructions}
        formula={formula}
        faqs={faqs}
    />
  );
}
