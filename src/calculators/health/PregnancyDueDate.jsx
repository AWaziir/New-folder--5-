import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';

export default function PregnancyDueDate() {
  const [lastPeriod, setLastPeriod] = useState(new Date().toISOString().split('T')[0]);
  const [cycleLength, setCycleLength] = useState(28);
  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateDueDate();
  }, [lastPeriod, cycleLength]);

  const calculateDueDate = () => {
    if (!lastPeriod) return;

    const lmpDate = new Date(lastPeriod);
    const dueDate = new Date(lmpDate);
    // Naegele's rule: LMP + 280 days (approx)
    // Most use + 7 days - 3 months + 1 year
    dueDate.setDate(dueDate.getDate() + 280 + (cycleLength - 28));
    
    const today = new Date();
    const diffTime = Math.abs(dueDate - today);
    const diffDays = Math.ceil(dueDate < today ? 0 : diffTime / (1000 * 60 * 60 * 24));
    const weeksLeft = Math.floor(diffDays / 7);
    const daysLeft = diffDays % 7;

    setResult({
      dueDate: dueDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      daysRemaining: diffDays,
      weeksRemaining: weeksLeft,
      extraDaysLeft: daysLeft
    });
  };

  return (
    <div className="container">
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8">
        <h1 className="text-3xl font-bold mb-2">Pregnancy Due Date Calculator</h1>
        <p className="text-muted mb-6">Estimate your due date based on your last menstrual period (LMP).</p>

        <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Pregnancy Details</h2>
            <div className="input-group">
              <label className="input-label">Last Period Start Date</label>
              <input 
                type="date" 
                className="input-field" 
                value={lastPeriod} 
                onChange={e => setLastPeriod(e.target.value)} 
              />
            </div>
            <div className="input-group">
              <label className="input-label">Avg. Cycle Length (days)</label>
              <input 
                type="number" 
                className="input-field" 
                value={cycleLength} 
                onChange={e => setCycleLength(Number(e.target.value))} 
              />
            </div>
          </div>

          <div>
            <div className="card sticky top-24">
              <h2 className="text-xl font-bold mb-6">Estimated Due Date</h2>
              {result ? (
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary mb-2">{result.dueDate}</p>
                  <p className="text-lg text-muted">That's approximately in</p>
                  <p className="text-2xl font-bold mt-2">{result.weeksRemaining} weeks, {result.extraDaysLeft} days</p>
                </div>
              ) : (
                <p className="text-center text-muted">Select a date to calculate.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
