import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('1990-01-01');
  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateAge();
  }, [birthDate]);

  const calculateAge = () => {
    if (!birthDate) return;

    const today = new Date();
    const birth = new Date(birthDate);
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
        years--;
        months += 12;
    }
    
    if (days < 0) {
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, birth.getDate());
        days = Math.floor((today - lastMonth) / (1000 * 60 * 60 * 24));
        months--;
        if (months < 0) {
            months += 12;
            years--;
        }
    }

    setResult({ years, months, days });
  };

  return (
    <div className="container">
      <SEO 
        title="Age Calculator - How Old Am I? Exact Date of Birth" 
        description="Find out exactly how old you are with our free age calculator. Calculate your precise age in years, months, and days based on your date of birth." 
        path="/other/age-calculator"
      />
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8">
        <h1 className="text-3xl font-bold mb-2">Age Calculator</h1>
        <p className="text-muted mb-6">Find out exactly how old you are down to the day.</p>

        <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Date of Birth</h2>
            <div className="input-group">
                <input type="date" className="input-field" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
            </div>
          </div>

          <div>
            <div className="card sticky top-24 highlight-border">
              <h2 className="text-xl font-bold mb-6">Your Age</h2>
              {result ? (
                <div className="text-center group">
                  <p className="text-6xl font-extrabold text-primary mb-4 transition-transform group-hover:scale-105">{result.years}</p>
                  <p className="text-xl font-bold uppercase tracking-wider mb-8">Years Old</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-secondary rounded-lg">
                        <p className="font-bold text-2xl">{result.months}</p>
                        <p className="text-xs text-muted">Months</p>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                        <p className="font-bold text-2xl">{result.days}</p>
                        <p className="text-xs text-muted">Days</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-center text-muted py-8">Select a birthdate.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
