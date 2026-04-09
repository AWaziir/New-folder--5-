import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

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

  return (
    <div className="container">
      <SEO 
        title="BMR Calculator (Basal Metabolic Rate)" 
        description="Calculate your Basal Metabolic Rate (BMR) - the number of calories your body needs to function at rest." 
        path="/health/bmr-calculator"
      />
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8">
        <h1 className="text-3xl font-bold mb-2">BMR Calculator</h1>
        <p className="text-muted mb-6">Estimate your Basal Metabolic Rate using the Mifflin-St Jeor equation.</p>

        <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Body Details</h2>
            <div className="flex gap-4 mb-4">
              <button className={`flex-1 py-2 rounded-md font-medium ${gender === 'male' ? 'bg-primary text-white' : 'bg-secondary'}`} onClick={() => setGender('male')}>Male</button>
              <button className={`flex-1 py-2 rounded-md font-medium ${gender === 'female' ? 'bg-primary text-white' : 'bg-secondary'}`} onClick={() => setGender('female')}>Female</button>
            </div>
            
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

          <div>
            <div className="card sticky top-24 highlight-border">
              <h2 className="text-xl font-bold mb-6">BMR Result</h2>
              {result ? (
                <div className="text-center">
                  <div className="p-6 bg-secondary rounded-xl mb-4">
                    <p className="text-4xl font-bold text-primary">{result}</p>
                    <p className="text-sm text-muted mt-1 uppercase font-bold">Calories / Day</p>
                  </div>
                  <p className="text-sm text-muted px-4 leading-relaxed">
                      This is the energy your body requires to maintain normal functions (heartbeat, breathing, temperature) while at complete rest.
                  </p>
                </div>
              ) : (
                <p className="text-center text-muted py-8">Complete the form to see results.</p>
              )}
            </div>
          </div>
        </div>

        <div className="card mt-8">
            <h3 className="text-xl font-bold mb-4">BMR vs. TDEE</h3>
            <p className="text-muted leading-relaxed">
                BMR is your baseline at rest. If you are active, you'll need more calories. To see how much you need with exercise, use our <strong>TDEE Calculator</strong>.
            </p>
        </div>
      </div>
    </div>
  );
}
