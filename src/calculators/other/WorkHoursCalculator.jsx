import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function WorkHoursCalculator() {
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [breakMin, setBreakMin] = useState(30);
  const [hourlyRate, setHourlyRate] = useState(35);

  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateWorkHours();
  }, [startTime, endTime, breakMin, hourlyRate]);

  const calculateWorkHours = () => {
    if (!startTime || !endTime) return;

    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);

    let diffMin = (endH * 60 + endM) - (startH * 60 + startM);
    
    if (diffMin < 0) diffMin += 24 * 60;

    const workMin = diffMin - breakMin;
    const hours = (workMin / 60);
    const totalPay = hours * hourlyRate;

    setResult({
      h: Math.floor(workMin / 60),
      m: workMin % 60,
      dec: hours.toFixed(2),
      pay: totalPay.toFixed(2)
    });
  };

  const inputs = (
    <div className="space-y-4">
      <div className="flex gap-4">
          <div className="input-group flex-1">
            <label className="input-label">Start Time</label>
            <input type="time" className="input-field" value={startTime} onChange={e => setStartTime(e.target.value)} />
          </div>
          <div className="input-group flex-1">
            <label className="input-label">End Time</label>
            <input type="time" className="input-field" value={endTime} onChange={e => setEndTime(e.target.value)} />
          </div>
      </div>

      <div className="input-group">
        <label className="input-label">Break Duration (Minutes)</label>
        <input type="number" className="input-field" value={breakMin} onChange={e => setBreakMin(Number(e.target.value))} />
      </div>

      <div className="input-group">
        <label className="input-label">Hourly Rate ($)</label>
        <input type="number" className="input-field" value={hourlyRate} onChange={e => setHourlyRate(Number(e.target.value))} />
      </div>
    </div>
  );

  const results = result ? (
    <div className="space-y-6">
      <div className="p-6 bg-success/10 rounded-xl text-center border border-success/30">
        <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Total Pay Estimate</p>
        <p className="text-4xl font-black text-success-light">${result.pay}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-lg text-center">
            <p className="text-xs uppercase font-bold opacity-70 mb-1">Total Hours</p>
            <p className="text-xl font-bold text-slate-900">{result.h}h {result.m}m</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-lg text-center">
            <p className="text-xs uppercase font-bold opacity-70 mb-1">Decimal Hours</p>
            <p className="text-xl font-bold text-slate-900">{result.dec}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="py-12 text-center opacity-40 italic">Calculate your shift earnings.</div>
  );

  return (
    <CalculatorLayout 
      title="Work Hours Calculator"
      seoTitle="Work Hours Calculator - Calculate Shift Pay & Time"
      description="Track your daily work hours, deduct breaks, and estimate your pay. Perfect for freelancers, shift workers, and small business owners."
      path="/other/work-hours-calculator"
      icon={Clock}
      inputs={inputs}
      results={results}
      instructions={<p>Enter your shift start and end times, then specify any unpaid break time (e.g., 30 or 60 minutes). Optionally enter your hourly rate to see an estimate of your gross earnings for that shift.</p>}
      formula="Working Time = (End - Start) - Break"
      examples={[
        { title: "Standard 8-Hour Shift", description: "9 AM to 5 PM with a 30-minute break equals 7.5 chargeable hours." },
        { title: "Part-Time Evening", description: "6 PM to 10 PM with no break equals exactly 4.0 hours." }
      ]}
      faqs={[
        { q: "Is this for payroll?", a: "This is a tool for personal estimation. Always check your official timesheet or payroll software for final earnings." }
      ]}
    />
  );
}
