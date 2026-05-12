import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function TimeDuration() {
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');

  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateDuration();
  }, [startTime, endTime]);

  const calculateDuration = () => {
    if (!startTime || !endTime) return;

    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);

    let diffMin = (endH * 60 + endM) - (startH * 60 + startM);
    
    // If negative, assume it's the next day
    if (diffMin < 0) {
        diffMin += 24 * 60;
    }

    const hours = Math.floor(diffMin / 60);
    const minutes = diffMin % 60;

    setResult({
      h: hours,
      m: minutes,
      totalMin: diffMin,
      dec: (diffMin / 60).toFixed(2)
    });
  };

  const inputs = (
    <div className="space-y-4">
      <div className="input-group">
        <label className="input-label">Start Time</label>
        <input type="time" className="input-field" value={startTime} onChange={e => setStartTime(e.target.value)} />
      </div>

      <div className="input-group">
        <label className="input-label">End Time</label>
        <input type="time" className="input-field" value={endTime} onChange={e => setEndTime(e.target.value)} />
      </div>
    </div>
  );

  const results = result ? (
    <div className="space-y-6">
      <div className="p-6 bg-primary/5 rounded-xl text-center border border-primary/20">
        <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Time Elapsed</p>
        <p className="text-4xl font-black text-primary-light">{result.h}h {result.m}m</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-lg text-center">
            <p className="text-xs uppercase font-bold opacity-70 mb-1">Total Minutes</p>
            <p className="text-xl font-bold text-slate-900">{result.totalMin}</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-lg text-center">
            <p className="text-xs uppercase font-bold opacity-70 mb-1">Decimal Hours</p>
            <p className="text-xl font-bold text-slate-900">{result.dec}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="py-12 text-center opacity-40 italic">Select times to see duration.</div>
  );

  return (
    <CalculatorLayout 
      title="Time Duration Calculator"
      seoTitle="Time Duration Calculator - Calculate Hours & Minutes Between Times"
      description="Easily calculate the duration between two times in hours and minutes. Perfect for time tracking, planning, and scheduling."
      path="/other/time-duration"
      icon={Clock}
      inputs={inputs}
      results={results}
      instructions={<p>Enter a start time and an end time. If the end time is 'earlier' than the start time, the calculator will automatically assume the duration spans into the next day.</p>}
      formula="Duration = End Time - Start Time"
      examples={[
        { title: "Standard Work Day", description: "9:00 AM to 5:00 PM equals exactly 8 hours." },
        { title: "Overnight Shift", description: "10:00 PM to 6:00 AM equals 8 hours (next day calculation)." }
      ]}
      faqs={[
        { q: "What are decimal hours?", a: "Decimal hours are hours represented as a fraction (e.g., 8h 30m = 8.5). This is commonly used for payroll processing." }
      ]}
    />
  );
}
