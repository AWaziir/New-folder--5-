import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

export default function PeriodCalculator() {
  const [lastPeriod, setLastPeriod] = useState(new Date().toISOString().split('T')[0]);
  const [cycleLength, setCycleLength] = useState(28);
  const [periodDuration, setPeriodDuration] = useState(5);
  
  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateCycle();
  }, [lastPeriod, cycleLength, periodDuration]);

  const calculateCycle = () => {
    if (!lastPeriod) return;

    const lmpDate = new Date(lastPeriod);
    
    // 1. Next Period Start Date
    const nextPeriodDate = new Date(lmpDate);
    nextPeriodDate.setDate(lmpDate.getDate() + cycleLength);

    // 2. Ovulation Date (approx 14 days before next period for most)
    const ovulationDate = new Date(nextPeriodDate);
    ovulationDate.setDate(nextPeriodDate.getDate() - 14);

    // 3. Fertile Window (approx 5 days before ovulation + ovulation day)
    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(ovulationDate.getDate() - 5);
    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(ovulationDate.getDate() + 1);

    const formatDate = (date) => date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    setResult({
      nextPeriod: formatDate(nextPeriodDate),
      ovulation: formatDate(ovulationDate),
      fertileWindow: `${formatDate(fertileStart)} - ${formatDate(fertileEnd)}`
    });
  };

  return (
    <div className="container">
      <SEO 
        title="When Is My Next Period Calculator Accurate" 
        description="Track your cycle, predict your next period, and find your most fertile days with our easy period calculator. When is my next period calculator accurate." 
        path="/health/period-calculator"
      />
      
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8">
        <h1 className="text-3xl font-bold mb-2">Period Calculator</h1>
        <p className="text-muted mb-6">Track your menstrual cycle and predict your next period, ovulation, and fertile window.</p>

        <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Cycle Details</h2>
            
            <div className="input-group">
              <label className="input-label">First Day of Last Period</label>
              <input 
                type="date" 
                className="input-field" 
                value={lastPeriod} 
                onChange={e => setLastPeriod(e.target.value)} 
              />
            </div>

            <div className="input-group">
              <label className="input-label">Average Cycle Length (days)</label>
              <input 
                type="number" 
                className="input-field" 
                value={cycleLength} 
                onChange={e => setCycleLength(Number(e.target.value))} 
              />
              <p className="text-sm text-muted mt-1">Normal: 21–35 days</p>
            </div>

            <div className="input-group">
              <label className="input-label">Period Duration (days)</label>
              <input 
                type="number" 
                className="input-field" 
                value={periodDuration} 
                onChange={e => setPeriodDuration(Number(e.target.value))} 
              />
              <p className="text-sm text-muted mt-1">Normal: 3–7 days</p>
            </div>
          </div>

          <div>
            <div className="card sticky top-24">
              <h2 className="text-xl font-bold mb-6">Your Predictions</h2>
              
              {result ? (
                <div className="space-y-6">
                  <div className="p-4 bg-secondary rounded-lg text-center border-l-4 border-primary">
                    <p className="text-muted text-sm font-medium mb-1 uppercase tracking-wider">Next Period Starts</p>
                    <p className="text-2xl font-bold text-primary">{result.nextPeriod}</p>
                  </div>
                  
                  <div className="p-4 bg-secondary rounded-lg text-center border-l-4 border-success">
                    <p className="text-muted text-sm font-medium mb-1 uppercase tracking-wider">Estimated Ovulation</p>
                    <p className="text-2xl font-bold text-success">{result.ovulation}</p>
                  </div>

                  <div className="p-4 bg-secondary rounded-lg text-center border-l-4 border-orange-400">
                    <p className="text-muted text-sm font-medium mb-1 uppercase tracking-wider">Fertile Window</p>
                    <p className="text-xl font-bold text-orange-500">{result.fertileWindow}</p>
                    <p className="text-xs text-muted mt-2">Best days for conception</p>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-muted">
                  Select your last period date to see predictions.
                </div>
              )}
            </div>
          </div>
        </div>

        <AdPlaceholder text="Mid-Content Ad" />

        <div className="card mt-8">
          <h2 className="text-2xl font-bold mb-4">Understanding Your Cycle</h2>
          <p className="mb-4 text-muted">
            A menstrual cycle is measured from the first day of one period to the first day of the next. Every woman's cycle is different, but the average length is 28 days.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <div>
              <h3 className="text-lg font-bold mb-2">What is Ovulation?</h3>
              <p className="text-muted text-sm leading-relaxed">
                Ovulation is when a mature egg is released from the ovary. It usually happens about 14 days before your next period starts. This is your most fertile point.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">The Fertile Window</h3>
              <p className="text-muted text-sm leading-relaxed">
                The fertile window includes the day of ovulation and the five days leading up to it. Sperm can live inside the female body for up to five days, while an egg lives for about 24 hours.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold mt-8 mb-4">FAQ</h3>
          <div className="space-y-4">
            <details className="border-b border-border-color pb-4">
              <summary className="font-bold cursor-pointer hover:text-primary transition">Is this calculator 100% accurate?</summary>
              <p className="text-muted text-sm mt-2">No. This is an estimate based on averages. Stress, illness, and diet can all affect your cycle length and ovulation timing.</p>
            </details>
            <details className="border-b border-border-color pb-4">
              <summary className="font-bold cursor-pointer hover:text-primary transition">Can I use this for birth control?</summary>
              <p className="text-muted text-sm mt-2">No, this calendar method should not be used as a primary form of contraception as cycles can vary significantly month-to-month.</p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
