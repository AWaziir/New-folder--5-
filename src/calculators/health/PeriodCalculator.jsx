import React, { useState, useEffect } from 'react';
import { CalendarDays } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

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

    const formatDate = (date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    setResult({
      nextPeriod: formatDate(nextPeriodDate),
      ovulation: formatDate(ovulationDate),
      fertileWindow: `${formatDate(fertileStart)} - ${formatDate(fertileEnd)}`
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

      <div className="grid grid-cols-2 gap-4">
        <div className="input-group">
            <label className="input-label">Cycle Length (Days)</label>
            <input 
                type="number" 
                className="input-field font-black" 
                value={cycleLength} 
                onChange={e => setCycleLength(Number(e.target.value))} 
            />
            <p className="text-[10px] mt-1 opacity-40 uppercase font-bold">Normal: 21–35</p>
        </div>
        <div className="input-group">
            <label className="input-label">Duration (Days)</label>
            <input 
                type="number" 
                className="input-field font-black" 
                value={periodDuration} 
                onChange={e => setPeriodDuration(Number(e.target.value))} 
            />
            <p className="text-[10px] mt-1 opacity-40 uppercase font-bold">Normal: 3–7</p>
        </div>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6">
      {result ? (
        <div className="space-y-6">
          <div className="p-8 bg-primary/5 rounded-2xl border border-primary/20 shadow-inner text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-2">Next Period Starts</p>
            <p className="text-4xl font-black text-slate-900">{result.nextPeriod}</p>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60 text-green-600">Estimated Ovulation</p>
              <p className="text-xl font-black text-slate-900">{result.ovulation}</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60 text-orange-400">High Fertility Window</p>
                <p className="text-lg font-black text-slate-900">{result.fertileWindow}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-12 italic opacity-40 text-center">Calculate your cycle...</div>
      )}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        Take control of your health with our advanced Period Calculator. By tracking your menstrual cycle, you can predict when your next period will arrive and identify your most fertile window for conception.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>LMP:</strong> Enter the first day of your most recent period.</li>
        <li><strong>Cycle Length:</strong> The number of days between the start of one period and the start of the next.</li>
        <li><strong>Consistency:</strong> The more accurate your data, the better the prediction.</li>
      </ul>
    </div>
  );

  const formula = "Next Period = Last Period Date + Cycle Length";

  const examples = [
    {
      title: "Planned Pregnancy",
      description: "Identifying the 6-day fertile window (ovulation day plus the 5 days before) significantly increases the probability of conception."
    },
    {
      title: "Holiday Planning",
      description: "Avoid surprises by checking your future cycle dates before booking your next beach getaway."
    }
  ];

  const faqs = [
    {
      q: "Is cycle variation normal?",
      a: "Yes. It's completely normal for your cycle to vary by a few days month-to-month due to stress, diet, or travel."
    },
    {
      q: "When should I see a doctor?",
      a: "Consult a professional if your cycle is consistently shorter than 21 days, longer than 35 days, or if you miss periods regularly."
    }
  ];

  const whyUse = [
    { title: "Predict Your Next Period", text: "Know exactly when to expect your next period so you can plan travel, events, and daily life with confidence." },
    { title: "Identify Fertile Window", text: "Understand your 6-day fertile window to either plan for pregnancy or track your cycle for natural family planning." },
    { title: "Monitor Cycle Health", text: "Tracking cycle length over time helps identify irregularities that may indicate hormonal imbalances or other health concerns." },
    { title: "Ovulation Awareness", text: "Pinpoint your estimated ovulation date — the most important day for conception timing and cycle understanding." }
  ];

  const keyFeatures = [
    { title: "Next Period Prediction", text: "Calculates your next expected period start date based on your LMP and average cycle length." },
    { title: "Fertile Window", text: "Identifies your estimated 6-day fertile window: 5 days before ovulation plus ovulation day itself." },
    { title: "Variable Cycle Support", text: "Handles cycle lengths from 21 to 35 days, accommodating natural variation in menstrual cycles." }
  ];

  const proTips = [
    "Track 3–6 months of cycles before relying on predictions — the more data, the more accurate your averages.",
    "Ovulation predictor kits (OPKs) test for an LH surge typically 24–48 hours before ovulation — more reliable than calendar tracking.",
    "Basal body temperature (BBT) rises 0.2–0.5°C after ovulation. Tracking BBT daily can confirm ovulation occurred.",
    "Cervical mucus changes throughout your cycle: dry after period → sticky → creamy → egg-white (peak fertility) → dry again.",
    "Stress, illness, travel, and significant weight changes can delay ovulation and shift your cycle by days or even weeks."
  ];

  const relatedTools = [
    { name: "Ovulation Calculator", path: "/health/ovulation-calculator" },
    { name: "Pregnancy Due Date", path: "/health/pregnancy-due-date" },
    { name: "BMI Calculator", path: "/health/bmi-calculator" },
    { name: "Water Intake Calculator", path: "/health/water-intake" }
  ];

  return (
    <CalculatorLayout 
        title="Period Calculator"
        seoTitle="Period Calculator - Cycle Tracker & Ovulation Predictor"
        description="Predict your next period, ovulation day, and fertile window with our easy-to-use cycle tracker. Stay informed about your reproductive health."
        path="/health/period-calculator"
        icon={CalendarDays}
        inputs={inputs}
        results={results}
        instructions={instructions}
        formula={formula}
        examples={examples}
        faqs={faqs}
        whyUse={whyUse}
        keyFeatures={keyFeatures}
        proTips={proTips}
        relatedTools={relatedTools}
    />
  );
}
