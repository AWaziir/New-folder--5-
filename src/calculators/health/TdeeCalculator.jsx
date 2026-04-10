import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

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

  return (
    <div className="container">
      <SEO 
        title="TDEE Calculator - Total Daily Energy Expenditure" 
        description="Calculate your Total Daily Energy Expenditure (TDEE) with our fast, free calculator. Estimate your maintenance calories based on your activity level and goals." 
        path="/health/tdee-calculator"
      />
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8">
        <h1 className="text-3xl font-bold mb-2">TDEE Calculator</h1>
        <p className="text-muted mb-6">Estimate your total daily calories burned based on exercise and activity habits.</p>

        <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Body Details</h2>
            <div className="flex gap-2 mb-4">
              <button className={`flex-1 py-1 rounded-md font-medium text-sm ${gender === 'male' ? 'bg-primary text-white' : 'bg-secondary'}`} onClick={() => setGender('male')}>Male</button>
              <button className={`flex-1 py-1 rounded-md font-medium text-sm ${gender === 'female' ? 'bg-primary text-white' : 'bg-secondary'}`} onClick={() => setGender('female')}>Female</button>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
                <div className="input-group">
                    <label className="input-label">Age</label>
                    <input type="number" className="input-field" value={age} onChange={e => setAge(Number(e.target.value))} />
                </div>
                <div className="input-group">
                    <label className="input-label">Height (cm)</label>
                    <input type="number" className="input-field" value={height} onChange={e => setHeight(Number(e.target.value))} />
                </div>
                <div className="input-group">
                    <label className="input-label">Weight (kg)</label>
                    <input type="number" className="input-field" value={weight} onChange={e => setWeight(Number(e.target.value))} />
                </div>
            </div>

            <div className="input-group">
                <label className="input-label">Activity Level</label>
                <select className="input-field" value={activity} onChange={e => setActivity(Number(e.target.value))}>
                    <option value={1.2}>Sedentary (Job / Sitting)</option>
                    <option value={1.375}>Lightly Active (1-3 days/week)</option>
                    <option value={1.55}>Moderately Active (4-5 days/week)</option>
                    <option value={1.725}>Very Active (6-7 days/week)</option>
                    <option value={1.9}>Extra Active (Athlete / Heavy Job)</option>
                </select>
            </div>
          </div>

          <div>
            <div className="card sticky top-24 highlight-border">
              <h2 className="text-xl font-bold mb-6">Maintenance Calories</h2>
              {result ? (
                <div className="text-center">
                  <div className="p-6 bg-secondary rounded-xl mb-6 scale-up">
                    <p className="text-4xl font-bold text-primary">{result.maintenance}</p>
                    <p className="text-sm text-muted mt-1 uppercase font-bold">Calories Per Day</p>
                  </div>
                  
                  <div className="grid gap-3 text-sm text-left">
                     <div className="flex justify-between p-3 bg-red-50 text-red-700 rounded-lg border-l-4 border-red-500">
                        <span>Fat Loss (Cutting)</span>
                        <span className="font-bold">{result.cutLow} kcal</span>
                     </div>
                     <div className="flex justify-between p-3 bg-green-50 text-green-700 rounded-lg border-l-4 border-green-500">
                        <span>Muscle Gain (Bulking)</span>
                        <span className="font-bold">{result.bulkLow} kcal</span>
                     </div>
                  </div>
                </div>
              ) : (
                <p className="text-center text-muted py-8">Enter your details.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
