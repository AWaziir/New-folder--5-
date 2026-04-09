import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0]);

  const calculateDiff = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const weeks = Math.floor(diffDays / 7);
    const remainingDays = diffDays % 7;
    
    // Approximate months/years
    const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const totalYears = end.getFullYear() - start.getFullYear();

    return {
      days: diffDays,
      weeks,
      remainingDays,
      months: Math.abs(totalMonths),
      years: Math.abs(totalYears)
    };
  };

  const diff = calculateDiff();

  const InputPanel = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Start Date</label>
        <input 
            type="date" 
            className="input-field" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
        />
      </div>

      <div className="input-group">
        <label className="input-label">End Date</label>
        <input 
            type="date" 
            className="input-field" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
        />
      </div>
    </div>
  );

  const ResultPanel = (
    <div className="space-y-4">
      <div className="p-6 bg-primary/10 rounded-xl border-2 border-primary/30 text-center flex flex-col items-center justify-center relative shadow-inner">
        <p className="text-primary-light mb-1 font-black uppercase tracking-widest text-xs">Total Duration</p>
        <p className="text-5xl font-black text-white drop-shadow-md">
          {diff.days.toLocaleString()} <span className="text-xl font-normal opacity-70">Days</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-secondary shadow-lg rounded-xl flex flex-col items-center border border-border-color">
              <span className="text-xl font-black text-white">{diff.weeks}w {diff.remainingDays}d</span>
              <span className="text-xs text-muted uppercase font-bold mt-1">Weeks & Days</span>
          </div>
          <div className="p-4 bg-secondary shadow-lg rounded-xl flex flex-col items-center border border-border-color">
              <span className="text-xl font-black text-white">~{diff.months}</span>
              <span className="text-xs text-muted uppercase font-bold mt-1">Total Months</span>
          </div>
      </div>
    </div>
  );

  return (
    <CalculatorLayout
      title="Date Difference Calculator"
      description="Calculate the exact number of days, weeks, and months between two dates."
      path="/other/date-difference"
      icon={Calendar}
      inputs={InputPanel}
      results={ResultPanel}
    />
  );
}
