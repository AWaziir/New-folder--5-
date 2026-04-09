import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function DayOfWeekCalculator() {
  const [dateStr, setDateStr] = useState(new Date().toISOString().split('T')[0]);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const getDay = () => {
    const d = new Date(dateStr);
    return days[d.getDay()];
  };

  const dayName = getDay();

  const InputPanel = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Select Date</label>
        <input 
            type="date" 
            className="input-field text-xl" 
            value={dateStr} 
            onChange={(e) => setDateStr(e.target.value)} 
        />
      </div>
    </div>
  );

  const ResultPanel = (
    <div className="flex flex-col h-full justify-center">
      <div className="mb-6 p-10 bg-primary/10 rounded-xl border-2 border-primary/30 text-center flex flex-col items-center justify-center relative shadow-inner overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
            <Calendar size={120} />
        </div>
        <p className="text-primary-light mb-2 font-black uppercase tracking-widest text-sm drop-shadow">That day is a</p>
        <p className="text-6xl font-black text-white drop-shadow-md">
          {dayName}
        </p>
      </div>
      
      <div className="p-4 bg-secondary/50 rounded-lg border border-border-color text-center text-sm text-muted italic">
        "Time is what we want most, but what we use worst."
      </div>
    </div>
  );

  return (
    <CalculatorLayout
      title="Day of the Week Calculator"
      description="Find out exactly what day of the week any past or future date falls on."
      path="/other/day-of-week"
      icon={Calendar}
      inputs={InputPanel}
      results={ResultPanel}
    />
  );
}
