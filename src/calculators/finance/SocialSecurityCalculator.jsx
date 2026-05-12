import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

// Simplified SSB estimate based on AIME approximations
function estimateBenefit(annualEarnings, yearsWorked, claimAge) {
  // Approximate AIME from career average
  const monthlyAvg = (annualEarnings / 12);
  // Simplified PIA formula (2024 bend points approximation)
  let pia = 0;
  if (monthlyAvg <= 1174) pia = monthlyAvg * 0.9;
  else if (monthlyAvg <= 7078) pia = 1174 * 0.9 + (monthlyAvg - 1174) * 0.32;
  else pia = 1174 * 0.9 + (7078 - 1174) * 0.32 + (monthlyAvg - 7078) * 0.15;
  // Adjust for claiming age (FRA = 67 for born after 1960)
  const fra = 67;
  let adjustedBenefit = pia;
  if (claimAge < fra) {
    const monthsEarly = (fra - claimAge) * 12;
    const reduction = Math.min(36, monthsEarly) * (5 / 9 / 100) + Math.max(0, monthsEarly - 36) * (5 / 12 / 100);
    adjustedBenefit = pia * (1 - reduction);
  } else if (claimAge > fra) {
    const yearsLate = claimAge - fra;
    adjustedBenefit = pia * (1 + yearsLate * 0.08);
  }
  return Math.round(adjustedBenefit);
}

const CLAIM_AGES = [62, 63, 64, 65, 66, 67, 68, 69, 70];

export default function SocialSecurityCalculator() {
  const [annualEarnings, setAnnualEarnings] = useState(65000);
  const [currentAge, setCurrentAge] = useState(45);
  const [claimAge, setClaimAge] = useState(67);
  const [result, setResult] = useState(null);

  useEffect(() => { calculate(); }, [annualEarnings, currentAge, claimAge]);

  const calculate = () => {
    if (annualEarnings <= 0 || currentAge <= 0) return;
    const monthly62 = estimateBenefit(annualEarnings, 35, 62);
    const monthly67 = estimateBenefit(annualEarnings, 35, 67);
    const monthly70 = estimateBenefit(annualEarnings, 35, 70);
    const monthlySelected = estimateBenefit(annualEarnings, 35, claimAge);
    const annual = monthlySelected * 12;
    // Break-even: delay from 62 to selected
    const extraMonthly = monthlySelected - monthly62;
    const costOfDelay = monthly62 * (claimAge - 62) * 12;
    const breakEvenMonths = extraMonthly > 0 ? Math.ceil(costOfDelay / extraMonthly) : 0;
    const breakEvenAge = claimAge + Math.ceil(breakEvenMonths / 12);

    setResult({ monthly62, monthly67, monthly70, monthlySelected, annual, breakEvenAge, claimAge });
  };

  const inputs = (
    <div className="space-y-5">
      <div style={{ padding: '0.85rem 1rem', background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '0.75rem', fontSize: '0.75rem', color: '#92400e', fontWeight: 600 }}>
        ℹ️ This is a simplified estimate. For your actual projected benefit, create an account at <strong>ssa.gov/myaccount</strong> to see your personalized Social Security statement.
      </div>
      <div className="input-group">
        <label className="input-label">Average Annual Earnings ($)</label>
        <input type="number" className="input-field text-xl font-black" value={annualEarnings} onChange={e => setAnnualEarnings(Number(e.target.value))} />
        <p style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '0.25rem' }}>Your average career gross earnings (pre-tax)</p>
      </div>
      <div className="input-group">
        <label className="input-label">Current Age</label>
        <input type="number" className="input-field font-bold" value={currentAge} onChange={e => setCurrentAge(Number(e.target.value))} />
      </div>
      <div className="input-group">
        <label className="input-label">Planned Claiming Age</label>
        <select className="input-field font-bold" value={claimAge} onChange={e => setClaimAge(Number(e.target.value))}>
          {CLAIM_AGES.map(a => <option key={a} value={a}>{a}{a === 62 ? ' (Earliest)' : a === 67 ? ' (Full Retirement Age)' : a === 70 ? ' (Maximum)' : ''}</option>)}
        </select>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-4">
      {result ? (
        <>
          <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg,#245da215,#10b98110)', border: '1px solid #245da225', borderRadius: '1rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.5, marginBottom: '0.35rem' }}>Est. Monthly Benefit at Age {result.claimAge}</p>
            <p style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a' }}>${result.monthlySelected.toLocaleString()}</p>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>${result.annual.toLocaleString()} per year</p>
          </div>
          <div style={{ background: '#f8fafc', borderRadius: '1rem', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <div style={{ padding: '0.65rem 1rem', borderBottom: '1px solid #e2e8f0', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: '#475569' }}>Monthly Benefit Comparison</div>
            {[
              { label: 'Claim at 62 (Early)', val: result.monthly62, color: '#ef4444', note: '-30% vs FRA' },
              { label: 'Claim at 67 (Full)', val: result.monthly67, color: '#245da2', note: 'Full Retirement Age' },
              { label: 'Claim at 70 (Maximum)', val: result.monthly70, color: '#10b981', note: '+24% vs FRA' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', borderBottom: '1px solid #f1f5f9' }}>
                <div>
                  <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>{item.label}</p>
                  <p style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{item.note}</p>
                </div>
                <p style={{ fontSize: '1.1rem', fontWeight: 900, color: item.color }}>${item.val.toLocaleString()}/mo</p>
              </div>
            ))}
          </div>
          {result.claimAge > 62 && (
            <div style={{ padding: '1rem 1.25rem', background: '#f8f4ff', border: '1px solid #c4b5fd', borderRadius: '0.75rem' }}>
              <p style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: '#6d28d9', marginBottom: '0.35rem' }}>Break-Even Age vs Claiming at 62</p>
              <p style={{ fontSize: '1.4rem', fontWeight: 900, color: '#5b21b6' }}>~Age {result.breakEvenAge}</p>
              <p style={{ fontSize: '0.7rem', color: '#7c3aed' }}>After this age, delaying to {result.claimAge} pays off more in total benefits.</p>
            </div>
          )}
        </>
      ) : <div className="py-12 italic opacity-40 text-center">Enter earnings to estimate benefits...</div>}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>This <strong>Social Security Benefits Estimator</strong> uses simplified SSA benefit formulas to give you an approximate monthly benefit at different claiming ages. Social Security benefits are calculated from your highest 35 years of earnings, indexed for inflation, then adjusted based on when you choose to start receiving them relative to your Full Retirement Age (FRA).</p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>FRA (Full Retirement Age):</strong> For anyone born in 1960 or later, the FRA is 67. Claiming before 67 permanently reduces your monthly benefit; waiting until 70 increases it.</li>
        <li><strong>Early Claiming (62):</strong> Reduces your benefit by up to 30%. Useful if you have health concerns or need immediate income.</li>
        <li><strong>Delayed Claiming (70):</strong> Earns 8% more for each year you delay past FRA — the highest guaranteed "investment" available. Maximum benefit at age 70.</li>
        <li><strong>35-Year Average:</strong> Years with no earnings count as zeros in your average. Working 35+ years replaces lower-earning years.</li>
      </ul>
    </div>
  );

  const formula = "PIA = 90% × (AIME up to $1,174) + 32% × (AIME $1,174–$7,078) + 15% × (AIME above $7,078)";

  const examples = [
    { title: "Delaying from 62 to 70 — The Breakeven", description: "On a $1,500/mo benefit at 62 vs $2,640/mo at 70 (max): you forgo 8 years × $1,500 = $144,000. The extra $1,140/mo pays that back in ~126 months (~age 80). If you live past 80, delaying to 70 wins financially." },
    { title: "Spousal Benefit Strategy", description: "A spouse who earned little or nothing can receive up to 50% of the higher-earning spouse's benefit at FRA. This creates a strategic decision: one partner claims early, the other delays to 70 to maximize the survivor benefit." }
  ];

  const faqs = [
    { q: "How is my Social Security benefit calculated?", a: "The SSA calculates your Average Indexed Monthly Earnings (AIME) from your highest 35 years of inflation-adjusted earnings. A formula with three 'bend points' converts AIME to your Primary Insurance Amount (PIA) — the benefit you receive at FRA." },
    { q: "Is Social Security taxable?", a: "Up to 85% of your Social Security benefits may be taxable if your 'combined income' (AGI + half your SS + tax-exempt interest) exceeds $34,000 (single) or $44,000 (married filing jointly)." },
    { q: "Can I claim Social Security while still working?", a: "Yes, but if you claim before FRA, your benefit is reduced $1 for every $2 you earn above $22,320 (2024 limit). This reduction disappears the year you reach FRA." },
    { q: "What happens to my benefit when my spouse dies?", a: "The surviving spouse receives the higher of their own benefit or 100% of the deceased spouse's benefit. This is why delaying the higher earner's benefit to 70 is often recommended — it maximizes the survivor benefit." }
  ];

  const whyUse = [
    { title: "Compare Claiming Strategies", text: "See exactly how much more (or less) you'll receive monthly by claiming at 62, 67, or 70." },
    { title: "Break-Even Analysis", text: "Calculate the break-even age — the point where delaying your claim pays off more in total lifetime benefits." },
    { title: "Retirement Income Planning", text: "Factor your estimated SS benefit into your overall retirement income plan alongside 401k and IRA withdrawals." },
    { title: "Spousal Planning", text: "Understand how your benefit affects spousal and survivor benefits for household income planning." }
  ];

  const keyFeatures = [
    { title: "Three Claiming Ages", text: "Shows estimated monthly benefits at 62 (early), 67 (FRA), and 70 (maximum) for instant comparison." },
    { title: "Break-Even Calculator", text: "Automatically calculates the age at which delaying your claim becomes financially superior." },
    { title: "Benefit Comparison Table", text: "Side-by-side view of benefits at all three key ages with percentage impact relative to FRA." }
  ];

  const proTips = [
    "Create a free account at ssa.gov/myaccount for your official earnings record and personalized benefit estimates — far more accurate than any calculator.",
    "If you're in poor health, claiming early at 62 may make sense. If you're healthy and expect to live into your 80s, delaying to 70 typically pays off.",
    "Married couples should coordinate strategies: the lower earner claims early for immediate income; the higher earner delays to 70 to maximize survivor benefits.",
    "Social Security benefits receive an annual COLA (Cost of Living Adjustment) based on inflation — your real purchasing power is partially protected.",
    "Working part-time while collecting SS before FRA can trigger the earnings test, temporarily reducing your benefit. After FRA, you can earn any amount with no reduction."
  ];

  const relatedTools = [
    { name: "Retirement Calculator", path: "/finance/retirement-calculator" },
    { name: "401k Calculator", path: "/finance/401k-calculator" },
    { name: "Roth IRA Calculator", path: "/finance/roth-ira-calculator" },
    { name: "Income Tax Calculator", path: "/finance/income-tax-calculator" }
  ];

  return (
    <CalculatorLayout
      title="Social Security Calculator"
      seoTitle="Social Security Calculator — Estimate Your Retirement Benefits 2024"
      description="Estimate your Social Security monthly benefit at age 62, 67, and 70. Compare claiming strategies, find your break-even age, and plan your retirement income."
      path="/finance/social-security-calculator"
      icon={Users}
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
