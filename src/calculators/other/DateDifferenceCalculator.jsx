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

  const inputs = (
    <div className="space-y-6">
      <div className="input-group text-center">
        <label className="input-label opacity-60 uppercase text-xs font-bold tracking-widest">Start Date</label>
        <input 
            type="date" 
            className="input-field max-w-xs mx-auto text-center font-bold" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
        />
      </div>

      <div className="input-group text-center">
        <label className="input-label opacity-60 uppercase text-xs font-bold tracking-widest">End Date</label>
        <input 
            type="date" 
            className="input-field max-w-xs mx-auto text-center font-bold" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
        />
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6">
      <div className="p-8 bg-primary/5 rounded-2xl border border-primary/20 text-center shadow-inner group">
        <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-2">Total Duration</p>
        <p className="text-6xl font-black text-slate-900 group-hover:scale-105 transition">
          {diff.days.toLocaleString()} <span className="text-xl font-normal opacity-40">Days</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <p className="text-xs uppercase font-bold opacity-40 tracking-widest mb-1">Weeks & Days</p>
              <p className="text-2xl font-black text-slate-900">{diff.weeks}w {diff.remainingDays}d</p>
          </div>
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <p className="text-xs uppercase font-bold opacity-40 tracking-widest mb-1">Total Months</p>
              <p className="text-2xl font-black text-slate-900">~{diff.months}</p>
          </div>
      </div>
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        Our Date Difference Calculator provides the exact count of days between any two dates on the calendar. Whether you're counting down to a vacation or measuring a project's timeline, this tool gives you the precision you need.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Start & End:</strong> Simply pick two dates. The calculator will determine the absolute distance between them.</li>
        <li><strong>Business Use:</strong> Great for calculating invoice aging, project durations, or contract lengths.</li>
      </ul>
    </div>
  );

  const formula = "Difference = End Date - Start Date";

  const examples = [
    {
      title: "Holiday Countdown",
      description: "Planning a trip for next month? Select today as the start and the first day of your trip as the end to see the exact sleeps remaining."
    },
    {
      title: "Project Milestone",
      description: "If a project started on Feb 1st and ended on April 15th, you can see it spans exactly 73 days (or 10 weeks and 3 days)."
    }
  ];

  const faqs = [
    {
      q: "Does it include the end date?",
      a: "The calculation measures the duration between the two dates. Broadly, it answers 'how many days pass between date A and date B'."
    },
    {
      q: "Can I use dates in the past?",
      a: "Yes. The calculator works identically for past, future, or a mix of both, providing the absolute difference."
    }
  ];

  return (
    <CalculatorLayout
      title="Date Difference"
      seoTitle="Date Difference Calculator - Exactly How Many Days?"
      description="Calculate the exact number of days, weeks, and months between two dates. Professional-grade date counter for projects, events, and milestones."
      path="/other/date-difference"
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
