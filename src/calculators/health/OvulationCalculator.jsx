import React, { useState, useEffect } from 'react';
import { CalendarHeart } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function OvulationCalculator() {
  const [lastPeriod, setLastPeriod] = useState(new Date().toISOString().split('T')[0]);
  const [cycleLength, setCycleLength] = useState(28);

  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateOvulation();
  }, [lastPeriod, cycleLength]);

  const calculateOvulation = () => {
    const start = new Date(lastPeriod);
    if (isNaN(start.getTime())) return;

    // Ovulation usually occurs 14 days before the next period starts
    const nextPeriod = new Date(start);
    nextPeriod.setDate(start.getDate() + cycleLength);

    const ovulationDay = new Date(nextPeriod);
    ovulationDay.setDate(nextPeriod.getDate() - 14);

    const fertileWindowStart = new Date(ovulationDay);
    fertileWindowStart.setDate(ovulationDay.getDate() - 3);

    const fertileWindowEnd = new Date(ovulationDay);
    fertileWindowEnd.setDate(ovulationDay.getDate() + 1);

    const formatDate = (date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    setResult({
      ovulation: formatDate(ovulationDay),
      fertileStart: formatDate(fertileWindowStart),
      fertileEnd: formatDate(fertileWindowEnd),
      nextPeriod: formatDate(nextPeriod)
    });
  };

  const inputs = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">First Day of Last Period</label>
        <input 
          type="date" 
          className="input-field font-bold" 
          value={lastPeriod} 
          onChange={e => setLastPeriod(e.target.value)} 
        />
      </div>

      <div className="input-group">
        <label className="input-label">Average Cycle Length (Days)</label>
        <input 
          type="number" 
          className="input-field font-black" 
          value={cycleLength} 
          onChange={e => setCycleLength(Number(e.target.value))} 
        />
        <p className="text-[10px] mt-1 opacity-40 uppercase font-bold">The usual is 28 days.</p>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6">
      {result ? (
        <div className="space-y-6 text-center">
          <div className="p-8 bg-primary/5 rounded-2xl border border-primary/20 shadow-inner group transition-all">
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-2">Estimated Ovulation Day</p>
            <p className="text-4xl font-black text-slate-900 group-hover:scale-105 transition-transform">
              {result.ovulation}
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60 text-green-600">Peak Fertility Window</p>
              <p className="text-xl font-black text-slate-900">
                {result.fertileStart} – {result.fertileEnd}
              </p>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60">Next Period Prediction</p>
              <p className="text-xl font-black text-slate-900">{result.nextPeriod}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-12 italic opacity-40 text-center">Predicting ovulation...</div>
      )}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        Planning for a family starts with understanding your body's natural rhythms. Our Ovulation Calculator predicts your peak fertility days based on your menstrual cycle length, helping you identify the optimal time for conception.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Peak Fertility:</strong> This window includes the day of ovulation and the several days leading up to it.</li>
        <li><strong>Cycle Consistency:</strong> For the most accurate result, track your cycle for 3-4 months to find your true average.</li>
      </ul>
    </div>
  );

  const formula = "Ovulation = (Next Period Start Date) - 14 Days";

  const examples = [
    {
      title: "Standard Cycle",
      description: "For a woman with a consistent 28-day cycle, ovulation typically occurs on Day 14."
    },
    {
      title: "Longer Cycle",
      description: "In a 34-day cycle, ovulation usually occurs around Day 20."
    }
  ];

  const faqs = [
    {
      q: "Can I use this to avoid pregnancy?",
      a: "This calculator is for estimation and planning. It should not be used as a primary method of contraception (the 'rhythm method') as cycles can be irregular."
    },
    {
      q: "Is ovulation always 14 days before a period?",
      a: "The 'luteal phase' (time between ovulation and the next period) is usually 12-16 days, but 14 is the most common average used in calculations."
    }
  ];

  return (
    <CalculatorLayout 
      title="Ovulation Calculator"
      seoTitle="Ovulation Calculator - Peak Fertility & Cycle Tracker"
      description="Calculate your most fertile days and estimated ovulation date based on your menstrual cycle. Fast, accurate, and free fertility tracking."
      path="/health/ovulation-calculator"
      icon={CalendarHeart}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
    />
  );
}
