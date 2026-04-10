import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

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

  return (
    <div className="container">
      <SEO 
        title="Calorie Calculator - Daily Calorie Needs & Weight Loss" 
        description="Calculate your daily calorie needs with the Calorie Calculator. Estimate calories for weight maintenance, loss, or gain based on your activity level." 
        path="/health/calorie-calculator"
      />
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8">
        <h1 className="text-3xl font-bold mb-2">Calorie Calculator</h1>
        <p className="text-muted mb-6">Estimate your daily calorie needs for maintaining or losing weight.</p>

        <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Body Details</h2>
            <div className="flex gap-4 mb-4">
              <button 
                className={`flex-1 py-2 rounded-md font-medium transition ${gender === 'male' ? 'bg-primary text-white' : 'bg-secondary text-text-main'}`}
                onClick={() => setGender('male')}
              >
                Male
              </button>
              <button 
                className={`flex-1 py-2 rounded-md font-medium transition ${gender === 'female' ? 'bg-primary text-white' : 'bg-secondary text-text-main'}`}
                onClick={() => setGender('female')}
              >
                Female
              </button>
            </div>
            
            <div className="input-group">
                <label className="input-label">Age (years)</label>
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

            <div className="input-group">
                <label className="input-label">Activity Level</label>
                <select className="input-field" value={activity} onChange={e => setActivity(Number(e.target.value))}>
                    <option value={1.2}>Sedentary (No Exercise)</option>
                    <option value={1.375}>Lightly Active (1-3 days/week)</option>
                    <option value={1.55}>Moderately Active (3-5 days/week)</option>
                    <option value={1.725}>Very Active (6-7 days/week)</option>
                    <option value={1.9}>Extra Active (Physical Work/Daily Exercise)</option>
                </select>
            </div>
          </div>

          <div>
            <div className="card sticky top-24">
              <h2 className="text-xl font-bold mb-6">Daily Calories</h2>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-secondary rounded-lg text-center">
                    <p className="text-muted text-sm font-medium">BMR (Basal Metabolic Rate)</p>
                    <p className="text-2xl font-bold text-primary">{result.bmr} kcal/day</p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg text-center border-2 border-primary">
                    <p className="text-muted text-sm font-bold">Maintain Weight</p>
                    <p className="text-3xl font-bold text-primary">{result.maintenance} kcal/day</p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg text-center">
                    <p className="text-muted text-sm font-medium">Lose Weight (-0.5 kg/week)</p>
                    <p className="text-2xl font-bold text-primary">{result.loseWeight} kcal/day</p>
                  </div>
                </div>
              ) : (
                <p className="text-center text-muted">Complete the form to see results.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
