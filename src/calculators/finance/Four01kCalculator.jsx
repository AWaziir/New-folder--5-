import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function Four01kCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentBalance, setCurrentBalance] = useState(10000);
  const [annualSalary, setAnnualSalary] = useState(70000);
  const [contributionPct, setContributionPct] = useState(10);
  const [employerMatchPct, setEmployerMatchPct] = useState(4);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [result, setResult] = useState(null);

  useEffect(() => { calculate(); }, [currentAge, retirementAge, currentBalance, annualSalary, contributionPct, employerMatchPct, annualReturn]);

  const calculate = () => {
    const years = retirementAge - currentAge;
    if (years <= 0) return;
    const r = annualReturn / 100;
    const employeeContrib = (contributionPct / 100) * annualSalary;
    const effectiveMatchPct = Math.min(contributionPct, employerMatchPct);
    const employerContrib = (effectiveMatchPct / 100) * annualSalary;
    const totalMonthlyContrib = (employeeContrib + employerContrib) / 12;
    const monthlyRate = r / 12;
    const months = years * 12;

    const futureFromCurrent = currentBalance * Math.pow(1 + r, years);
    const futureFromContribs = monthlyRate > 0
      ? totalMonthlyContrib * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate
      : totalMonthlyContrib * months;
    const total = futureFromCurrent + futureFromContribs;
    const totalContributions = (employeeContrib + employerContrib) * years + currentBalance;
    const interest = total - totalContributions;
    const monthlyInRetirement = (total * 0.04) / 12; // 4% rule

    setResult({
      total: Math.round(total),
      totalContributions: Math.round(totalContributions),
      interest: Math.round(interest),
      monthlyInRetirement: Math.round(monthlyInRetirement),
      annualEmployeeContrib: Math.round(employeeContrib),
      annualEmployerContrib: Math.round(employerContrib),
    });
  };

  const inputs = (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="input-group">
          <label className="input-label">Current Age</label>
          <input type="number" className="input-field font-bold" value={currentAge} onChange={e => setCurrentAge(Number(e.target.value))} />
        </div>
        <div className="input-group">
          <label className="input-label">Retirement Age</label>
          <input type="number" className="input-field font-bold" value={retirementAge} onChange={e => setRetirementAge(Number(e.target.value))} />
        </div>
      </div>
      <div className="input-group">
        <label className="input-label">Current 401k Balance ($)</label>
        <input type="number" className="input-field font-bold" value={currentBalance} onChange={e => setCurrentBalance(Number(e.target.value))} />
      </div>
      <div className="input-group">
        <label className="input-label">Annual Salary ($)</label>
        <input type="number" className="input-field font-bold" value={annualSalary} onChange={e => setAnnualSalary(Number(e.target.value))} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="input-group">
          <label className="input-label">Your Contribution (%)</label>
          <input type="number" step="0.5" className="input-field font-bold" value={contributionPct} onChange={e => setContributionPct(Number(e.target.value))} />
        </div>
        <div className="input-group">
          <label className="input-label">Employer Match (%)</label>
          <input type="number" step="0.5" className="input-field font-bold" value={employerMatchPct} onChange={e => setEmployerMatchPct(Number(e.target.value))} />
        </div>
      </div>
      <div className="input-group">
        <label className="input-label">Expected Annual Return (%)</label>
        <input type="number" step="0.5" className="input-field font-bold" value={annualReturn} onChange={e => setAnnualReturn(Number(e.target.value))} />
        <p style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '0.25rem' }}>Historical S&P 500 average: ~7% inflation-adjusted</p>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-4">
      {result ? (
        <>
          <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg,#245da215,#10b98110)', border: '1px solid #245da225', borderRadius: '1rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.5, marginBottom: '0.35rem' }}>Projected Balance at Retirement</p>
            <p style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0f172a' }}>${result.total.toLocaleString()}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Your Contributions', val: `$${result.annualEmployeeContrib.toLocaleString()}/yr`, color: '#245da2' },
              { label: 'Employer Match', val: `$${result.annualEmployerContrib.toLocaleString()}/yr`, color: '#10b981' },
              { label: 'Total Invested', val: `$${result.totalContributions.toLocaleString()}`, color: '#475569' },
              { label: 'Investment Growth', val: `+$${result.interest.toLocaleString()}`, color: '#f59e0b' },
            ].map(item => (
              <div key={item.label} style={{ padding: '0.85rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <p style={{ fontSize: '0.55rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '0.2rem' }}>{item.label}</p>
                <p style={{ fontSize: '1rem', fontWeight: 900, color: item.color }}>{item.val}</p>
              </div>
            ))}
          </div>
          <div style={{ padding: '1rem 1.25rem', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '0.75rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: '#166534', marginBottom: '0.25rem' }}>Monthly Income in Retirement (4% Rule)</p>
            <p style={{ fontSize: '2rem', fontWeight: 900, color: '#14532d' }}>${result.monthlyInRetirement.toLocaleString()}/mo</p>
          </div>
        </>
      ) : <div className="py-12 italic opacity-40 text-center">Enter your details to project your 401k...</div>}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>A <strong>401(k)</strong> is an employer-sponsored retirement savings plan in the US. Contributions are made pre-tax, reducing your taxable income today, and the account grows tax-deferred until retirement. This calculator projects your balance at retirement and estimates your monthly income using the 4% withdrawal rule.</p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>2024 Contribution Limit:</strong> $23,000/year ($30,500 if age 50+, thanks to catch-up contributions).</li>
        <li><strong>Employer Match:</strong> This is essentially free money — always contribute at least enough to get the full employer match.</li>
        <li><strong>4% Rule:</strong> A widely-used retirement guideline suggesting you can safely withdraw 4% of your portfolio per year without depleting it over a 30-year retirement.</li>
      </ul>
    </div>
  );

  const formula = "FV = PV×(1+r)^t + PMT×[(1+r)^t − 1]/r   (Compound Growth with Monthly Contributions)";

  const examples = [
    { title: "Starting Early at 25", description: "Contributing 10% of a $60,000 salary at 25 (with 4% employer match) and retiring at 65 at 7% returns yields approximately $1.4M — the power of 40 years of compounding." },
    { title: "The Employer Match Trap", description: "If your employer matches 4% and you only contribute 3%, you're leaving 1% of your salary — potentially thousands of dollars annually — on the table. Always get the full match first." }
  ];

  const faqs = [
    { q: "Traditional 401k vs Roth 401k?", a: "Traditional: contributions are pre-tax (reduce income now, pay tax in retirement). Roth: contributions are after-tax (pay tax now, withdrawals in retirement are tax-free). If you expect to be in a higher tax bracket in retirement, Roth may be better." },
    { q: "What happens to my 401k if I change jobs?", a: "You have several options: roll it into your new employer's plan, roll it into a Traditional IRA, or leave it with your old employer if the plan allows. Cashing out triggers taxes and a 10% penalty before age 59½." },
    { q: "What is vesting?", a: "Vesting determines when employer contributions are officially 'yours'. Cliff vesting means you own 0% until a specific date (e.g., 3 years), then 100%. Graded vesting increases your ownership over time (e.g., 20% per year over 5 years)." }
  ];

  const whyUse = [
    { title: "Retirement Readiness", text: "See if you're on track to retire comfortably at your target age with your current contribution rate." },
    { title: "Optimize Contributions", text: "Find the contribution percentage that maximizes your employer match without over-contributing." },
    { title: "Visualize Compounding", text: "See the dramatic difference compounding makes over 30–40 years of tax-deferred growth." },
    { title: "Plan Your Income", text: "Get a realistic estimate of your monthly retirement income using the 4% safe withdrawal rule." }
  ];

  const keyFeatures = [
    { title: "Employer Match Modeling", text: "Accurately calculates the effective employer contribution based on your contribution rate and their match cap." },
    { title: "4% Rule Estimate", text: "Instantly converts your projected balance into estimated monthly retirement income." },
    { title: "Real Return Setting", text: "Use the default 7% (historical inflation-adjusted S&P average) or customize for conservative/aggressive portfolios." }
  ];

  const proTips = [
    "Always contribute at least enough to get your full employer match — it's an instant 50–100% return on that portion of savings.",
    "In your 20s–30s, a growth-oriented portfolio (80–90% stocks) is generally appropriate given your long time horizon.",
    "The 2024 catch-up contribution limit lets those 50+ add an extra $7,500/year — a powerful accelerator in the final stretch.",
    "Avoid 401k loans unless absolutely necessary — borrowed money misses market growth and you repay with after-tax dollars.",
    "Consider increasing your contribution by 1% every time you get a raise — you won't miss what you never see."
  ];

  const relatedTools = [
    { name: "Retirement Calculator", path: "/finance/retirement-calculator" },
    { name: "Roth IRA Calculator", path: "/finance/roth-ira-calculator" },
    { name: "Investment Calculator", path: "/finance/investment-calculator" },
    { name: "Salary Calculator", path: "/finance/salary-calculator" }
  ];

  return (
    <CalculatorLayout
      title="401k Calculator"
      seoTitle="401k Calculator — Retirement Savings Projection 2024"
      description="Project your 401k balance at retirement. Calculate employer match value, total growth through compound interest, and estimated monthly retirement income."
      path="/finance/401k-calculator"
      icon={TrendingUp}
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
