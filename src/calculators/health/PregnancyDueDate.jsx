import React, { useState, useEffect } from 'react';
import { Baby } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

const TRIMESTERS = [
  { label: 'First Trimester', weeks: '1–12', desc: 'Major organ formation, embryo becomes a fetus.' },
  { label: 'Second Trimester', weeks: '13–26', desc: 'Rapid growth, movements felt, gender visible.' },
  { label: 'Third Trimester', weeks: '27–40', desc: 'Final development, lungs mature, baby positions for birth.' },
];

export default function PregnancyDueDate() {
  const [lastPeriod, setLastPeriod] = useState(new Date().toISOString().split('T')[0]);
  const [cycleLength, setCycleLength] = useState(28);
  const [result, setResult] = useState(null);

  useEffect(() => { calculate(); }, [lastPeriod, cycleLength]);

  const calculate = () => {
    if (!lastPeriod) return;
    const lmp = new Date(lastPeriod);
    const dueDate = new Date(lmp);
    dueDate.setDate(dueDate.getDate() + 280 + (cycleLength - 28));

    const today = new Date();
    const diffMs = dueDate - today;
    const daysRemaining = Math.max(0, Math.ceil(diffMs / 86400000));
    const weeksPregnant = Math.floor((today - lmp) / 604800000);
    const currentTrimester = weeksPregnant < 13 ? 1 : weeksPregnant < 27 ? 2 : 3;

    const conceptionDate = new Date(lmp);
    conceptionDate.setDate(lmp.getDate() + (cycleLength - 14));

    const fmt = d => d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const fmtShort = d => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    // Key milestone dates
    const milestones = [
      { label: 'End of 1st Trimester', date: new Date(lmp.getTime() + 12 * 7 * 86400000) },
      { label: 'Anatomy Scan (20 weeks)', date: new Date(lmp.getTime() + 20 * 7 * 86400000) },
      { label: 'Viability (24 weeks)', date: new Date(lmp.getTime() + 24 * 7 * 86400000) },
      { label: '3rd Trimester Begins', date: new Date(lmp.getTime() + 27 * 7 * 86400000) },
      { label: 'Full Term (37 weeks)', date: new Date(lmp.getTime() + 37 * 7 * 86400000) },
      { label: 'Estimated Due Date', date: dueDate },
    ];

    setResult({
      dueDate: fmt(dueDate),
      daysRemaining,
      weeksRemaining: Math.floor(daysRemaining / 7),
      extraDays: daysRemaining % 7,
      weeksPregnant: Math.max(0, weeksPregnant),
      currentTrimester,
      conceptionDate: fmt(conceptionDate),
      milestones: milestones.map(m => ({ label: m.label, date: fmtShort(m.date), passed: m.date < today })),
    });
  };

  const inputs = (
    <div className="space-y-6">
      <div style={{ padding: '1rem', background: '#fdf2f8', border: '1px solid #f9a8d4', borderRadius: '0.75rem' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#9d174d', marginBottom: '0.25rem' }}>🩺 Medical Disclaimer</p>
        <p style={{ fontSize: '0.7rem', color: '#831843', lineHeight: 1.5 }}>This calculator provides estimates based on Naegele's rule. Always confirm your due date with your healthcare provider via ultrasound.</p>
      </div>
      <div className="input-group">
        <label className="input-label">First Day of Last Menstrual Period (LMP)</label>
        <input type="date" className="input-field font-bold" value={lastPeriod} onChange={e => setLastPeriod(e.target.value)} />
      </div>
      <div className="input-group">
        <label className="input-label">Average Cycle Length (days)</label>
        <input type="number" className="input-field font-bold" value={cycleLength} min="20" max="45" onChange={e => setCycleLength(Number(e.target.value))} />
        <p style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '0.25rem' }}>Normal range: 21–35 days. Average: 28 days</p>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-5">
      {result ? (
        <>
          <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg,#fdf2f815,#f9a8d425)', border: '1px solid #f9a8d4', borderRadius: '1rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#9d174d', marginBottom: '0.35rem' }}>🎉 Estimated Due Date</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 900, color: '#831843' }}>{result.dueDate}</p>
            <p style={{ fontSize: '0.85rem', color: '#9d174d', marginTop: '0.35rem' }}>{result.weeksRemaining} weeks, {result.extraDays} days remaining</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Days Remaining', val: result.daysRemaining, color: '#8b5cf6' },
              { label: 'Weeks Pregnant', val: `${result.weeksPregnant} wks`, color: '#245da2' },
              { label: 'Trimester', val: `${result.currentTrimester}${result.currentTrimester === 1 ? 'st' : result.currentTrimester === 2 ? 'nd' : 'rd'}`, color: '#10b981' },
              { label: 'Est. Conception', val: result.conceptionDate.split(',')[0], color: '#f59e0b' },
            ].map(item => (
              <div key={item.label} style={{ padding: '0.85rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <p style={{ fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '0.2rem' }}>{item.label}</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 900, color: item.color }}>{item.val}</p>
              </div>
            ))}
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '1rem', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #e2e8f0' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: '#475569' }}>Pregnancy Milestones</p>
            </div>
            {result.milestones.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 1rem', borderBottom: '1px solid #f1f5f9', opacity: m.passed ? 0.5 : 1 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: m.passed ? '#94a3b8' : '#334155' }}>{m.passed ? '✓ ' : ''}{m.label}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: m.passed ? '#94a3b8' : '#245da2' }}>{m.date}</span>
              </div>
            ))}
          </div>
        </>
      ) : <div className="py-12 italic opacity-40 text-center">Select your LMP date to calculate...</div>}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>Our <strong>Pregnancy Due Date Calculator</strong> uses Naegele's rule — the standard method used by obstetricians worldwide — to estimate your baby's arrival. It adjusts for cycle lengths other than the standard 28 days and provides a complete pregnancy milestone timeline to help you track each important stage.</p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>LMP Method:</strong> Naegele's rule adds 280 days (40 weeks) to the first day of your last period. This is the most widely used dating method before an ultrasound is available.</li>
        <li><strong>Cycle Adjustment:</strong> If your cycle is longer than 28 days, ovulation (and likely conception) happened later, pushing the due date forward. Shorter cycles move it earlier.</li>
        <li><strong>Ultrasound Dating:</strong> After 10–14 weeks, an ultrasound measurement of the fetus is more accurate than LMP dating and may revise your due date.</li>
      </ul>
    </div>
  );

  const formula = "Due Date = LMP + 280 days + (Cycle Length − 28 days)   [Naegele's Rule, adjusted]";

  const examples = [
    { title: "Standard 28-Day Cycle", description: "LMP of January 1st + 280 days = October 8th as the estimated due date. Only 5% of babies are actually born on their exact due date — most arrive within 2 weeks either side." },
    { title: "Longer Cycle Adjustment", description: "With a 35-day cycle, ovulation occurs around day 21 (not day 14), meaning conception likely happened a week later. The due date shifts forward by 7 days compared to the standard 28-day calculation." },
    { title: "Trimester Planning", description: "Knowing your trimester helps schedule prenatal appointments: First trimester screening at 10–13 weeks, anatomy scan at 18–22 weeks, glucose test at 24–28 weeks, and weekly visits from 36 weeks onward." }
  ];

  const faqs = [
    { q: "How accurate is the due date calculator?", a: "The LMP-based calculation gives an estimated due date with about 2 weeks of uncertainty. Only about 5% of babies are born on their exact due date. Ultrasound before 14 weeks provides greater accuracy." },
    { q: "What is a full-term pregnancy?", a: "The American College of Obstetricians and Gynecologists (ACOG) defines full term as 39 weeks 0 days to 40 weeks 6 days. Early term is 37–38 weeks; late term is 41 weeks; post-term is 42+ weeks." },
    { q: "Can I calculate due date after IVF?", a: "For IVF pregnancies, due dates are calculated differently — typically adding 266 days from egg retrieval, or 263 days from a Day-3 embryo transfer, or 261 days from a Day-5 blastocyst transfer." },
    { q: "What if my LMP isn't regular?", a: "Irregular periods make LMP dating less reliable. In these cases, an early ultrasound (6–10 weeks) is the most accurate method for confirming gestational age and setting a due date." }
  ];

  const whyUse = [
    { title: "Plan Your Pregnancy Journey", text: "Know when to expect key milestones, prenatal tests, and your baby's arrival window." },
    { title: "Cycle-Adjusted Accuracy", text: "Unlike simple 28-day calculators, ours adjusts for your unique cycle length for a more accurate estimate." },
    { title: "Milestone Timeline", text: "Track first trimester end, anatomy scan, viability milestone, and full-term date all in one view." },
    { title: "Conception Estimate", text: "See the estimated conception date — useful for confirming consistency with known timing." }
  ];

  const keyFeatures = [
    { title: "Naegele's Rule", text: "Uses the standard obstetric dating formula, adjusted for your individual cycle length." },
    { title: "6 Pregnancy Milestones", text: "Complete timeline from 12-week scan to due date with dates calculated automatically." },
    { title: "Current Progress", text: "Shows how many weeks pregnant you are and which trimester you're currently in." }
  ];

  const proTips = [
    "Take prenatal vitamins with at least 400mcg of folic acid starting as soon as you begin trying to conceive — neural tube defects form in the first 4 weeks.",
    "Your anatomy scan at 18–22 weeks can reveal the baby's sex if you wish to know — ask your sonographer.",
    "Write down the date of your first fetal movements (quickening) — usually 16–25 weeks. Your doctor will ask.",
    "Avoid deli meats, raw fish, soft cheeses, and alcohol throughout pregnancy — listeria and other risks are higher during pregnancy.",
    "The third trimester starts at week 27, not week 28 — many sources are inconsistent on this."
  ];

  const relatedTools = [
    { name: "Period Calculator", path: "/health/period-calculator" },
    { name: "Ovulation Calculator", path: "/health/ovulation-calculator" },
    { name: "BMI Calculator", path: "/health/bmi-calculator" },
    { name: "Water Intake Calculator", path: "/health/water-intake" }
  ];

  return (
    <CalculatorLayout
      title="Pregnancy Due Date Calculator"
      seoTitle="Pregnancy Due Date Calculator — Naegele's Rule with Milestone Timeline"
      description="Calculate your pregnancy due date using Naegele's rule, adjusted for your cycle length. See trimester progress, key milestones, and estimated conception date."
      path="/health/pregnancy-due-date"
      icon={Baby}
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
