import React, { useState, useEffect } from 'react';
import { Cake } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

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
        const lastMonthDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        days += lastMonthDays;
        months--;
        if (months < 0) {
            months += 12;
            years--;
        }
    }

    setResult({ years, months, days });
  };

  const inputs = (
    <div className="space-y-4 text-center">
      <h2 className="text-xl font-bold mb-4 opacity-50 uppercase tracking-widest text-xs">When were you born?</h2>
      <div className="input-group max-w-xs mx-auto">
          <input 
            type="date" 
            className="input-field text-center font-black text-2xl !py-4" 
            value={birthDate} 
            onChange={e => setBirthDate(e.target.value)} 
          />
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6">
      {result ? (
        <div className="text-center group">
          <div className="p-8 bg-primary/5 rounded-2xl border border-primary/20 mb-6 group-hover:bg-primary-dark/40 transition">
            <p className="text-[8rem] leading-none font-black text-slate-900 mb-2">{result.years}</p>
            <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-60">Years Old</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="font-black text-3xl text-slate-900">{result.months}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Months</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="font-black text-3xl text-slate-900">{result.days}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Days</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-muted py-12 italic opacity-40">Select your birth date to see your exact age.</p>
      )}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        The Age Calculator is a simple yet precise tool that determines your exact age in years, months, and days based on your date of birth. It accounts for leap years and the varying lengths of months.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Accuracy:</strong> Our algorithm calculates age by comparing your birth date against the current system time.</li>
        <li><strong>Use Case:</strong> Useful for filling out legal documents, calculating milestones, or just satisfying curiosity.</li>
      </ul>
    </div>
  );

  const formula = "Age = Today's Date - Birth Date";

  const examples = [
    {
      title: "The 90's Baby",
      description: "Born on January 1, 1990? You can instantly see your transition into your 30s and exactly how many 'extra' months and days have passed since your last birthday."
    },
    {
      title: "Newborn Milestones",
      description: "Parents often use this to track exactly how many weeks or days old their baby is for medical checkups and developmental milestones."
    }
  ];

  const faqs = [
    {
      q: "Does it account for leap years?",
      a: "Yes. The calculator handles February 29th and adjusts the daily count correctly depending on whether a leap year is involved in the calculation period."
    },
    {
      q: "Is my data stored?",
      a: "No. All calculations are performed instantly in your browser. We do not store or transmit your birth date to any server."
    }
  ];

  return (
    <CalculatorLayout 
      title="Age Calculator"
      seoTitle="Age Calculator - How Old Am I? Exact Date of Birth"
      description="Find out exactly how old you are with our free age calculator. Calculate your precise age in years, months, and days based on your date of birth."
      path="/other/age-calculator"
      icon={Cake}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
    />
  );
}
