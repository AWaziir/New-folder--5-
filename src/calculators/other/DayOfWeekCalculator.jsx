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

  const inputs = (
    <div className="space-y-6 text-center">
      <div className="input-group max-w-xs mx-auto">
        <label className="input-label opacity-60 uppercase text-xs font-bold tracking-widest mb-3">Select a Date</label>
        <input 
            type="date" 
            className="input-field text-2xl font-black text-center" 
            value={dateStr} 
            onChange={(e) => setDateStr(e.target.value)} 
        />
      </div>
    </div>
  );

  const results = (
    <div className="flex flex-col h-full justify-center">
      <div className="p-10 bg-primary/5 rounded-2xl border border-primary/20 text-center flex flex-col items-center justify-center relative shadow-inner overflow-hidden group">
        <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition">
            <Calendar size={180} />
        </div>
        <p className="text-primary-light mb-2 font-black uppercase tracking-widest text-xs opacity-60">That day falls on a</p>
        <p className="text-6xl font-black text-slate-900 drop-shadow-lg group-hover:scale-110 transition">
          {dayName}
        </p>
      </div>
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        Ever wondered what day of the week you were born on? Or what day a future holiday falls on? This tool uses the Gregorian calendar calculation to find the exact day for any date.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Pick a Date:</strong> Use the calendar input to select any date in history or the future.</li>
        <li><strong>Instant Result:</strong> The day of the week (Monday-Sunday) appears immediately.</li>
      </ul>
    </div>
  );

  const formula = "Zeller's Congruence or Date Object Logic";

  const examples = [
    {
      title: "Historical Events",
      description: "Did you know that July 4, 1776, was a Thursday? You can verify historical milestones with ease."
    },
    {
      title: "Wedding Planning",
      description: "Check if your preferred date next year falls on a Saturday or Sunday before booking your venue."
    }
  ];

  const faqs = [
    {
      q: "Does this work for dates far in the future?",
      a: "Yes. The calculator uses standard JavaScript Date logic which is accurate for several thousand years into the future."
    },
    {
      q: "Is it the same globally?",
      a: "Yes, this tool assumes the Gregorian calendar, which is the standard civil calendar used internationally today."
    }
  ];

  return (
    <CalculatorLayout
      title="Day of the Week"
      seoTitle="Day of the Week Calculator - What day was I born?"
      description="Find out exactly what day of the week any past or future date falls on. Fast, accurate, and free day finder tool."
      path="/other/day-of-week"
      icon={Calendar}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
    />
  );
}
