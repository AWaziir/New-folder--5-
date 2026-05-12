import React, { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function RothIraCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [annualContribution, setAnnualContribution] = useState(7000);
  const [currentBalance, setCurrentBalance] = useState(5000);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [result, setResult] = useState(null);

  // 2024 Roth IRA contribution limits
  const LIMIT_UNDER50 = 7000;
  const LIMIT_OVER50 = 8000;

  useEffect(() => { calculate(); }, [currentAge, retirementAge, annualContribution, currentBalance, annualReturn]);

  const calculate = () => {
    const years = retirementAge - currentAge;
    if (years <= 0) return;
    const r = annualReturn / 100;
    const monthlyRate = r / 12;
    const months = years * 12;
    const monthlyContrib = annualContribution / 12;

    const futureFromCurrent = currentBalance * Math.pow(1 + r, years);
    const futureFromContribs = monthlyRate > 0
      ? monthlyContrib * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate
      : monthlyContrib * months;

    const total = futureFromCurrent + futureFromContribs;
    const totalContributed = annualContribution * years + currentBalance;
    const taxFreeGrowth = total - totalContributed;
    const monthlyIncome4Pct = (total * 0.04) / 12;
    const taxSavings = taxFreeGrowth * 0.22; // estimated at 22% bracket

    setResult({
      total: Math.round(total),
      totalContributed: Math.round(totalContributed),
      taxFreeGrowth: Math.round(taxFreeGrowth),
      monthlyIncome4Pct: Math.round(monthlyIncome4Pct),
      taxSavings: Math.round(taxSavings),
      limit: currentAge >= 50 ? LIMIT_OVER50 : LIMIT_UNDER50,
      overLimit: annualContribution > (currentAge >= 50 ? LIMIT_OVER50 : LIMIT_UNDER50),
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
        <label className="input-label">Current Roth IRA Balance ($)</label>
        <input type="number" className="input-field font-bold" value={currentBalance} onChange={e => setCurrentBalance(Number(e.target.value))} />
      </div>
      <div className="input-group">
        <label className="input-label">Annual Contribution ($)</label>
        <input type="number" className="input-field font-bold" value={annualContribution} onChange={e => setAnnualContribution(Number(e.target.value))} />
        <p style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '0.25rem' }}>
          2024 Limit: ${currentAge >= 50 ? '8,000' : '7,000'}/yr {currentAge >= 50 ? '(50+ catch-up)' : ''}
        </p>
      </div>
      <div className="input-group">
        <label className="input-label">Expected Annual Return (%)</label>
        <input type="number" step="0.5" className="input-field font-bold" value={annualReturn} onChange={e => setAnnualReturn(Number(e.target.value))} />
      </div>
    </div>
  );

  const results = (
    <div className="space-y-4">
      {result ? (
        <>
          {result.overLimit && (
            <div style={{ padding: '0.75rem 1rem', background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '0.75rem', fontSize: '0.75rem', color: '#92400e', fontWeight: 600 }}>
              ⚠️ Your contribution exceeds the 2024 limit of ${result.limit.toLocaleString()}. Excess contributions are subject to a 6% penalty.
            </div>
          )}
          <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg,#f0fdf415,#dcfce725)', border: '1px solid #86efac', borderRadius: '1rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#166534', marginBottom: '0.35rem' }}>🌱 Tax-Free Balance at Retirement</p>
            <p style={{ fontSize: '2.2rem', fontWeight: 900, color: '#14532d' }}>${result.total.toLocaleString()}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Total Contributed', val: `$${result.totalContributed.toLocaleString()}`, color: '#245da2' },
              { label: 'Tax-Free Growth', val: `+$${result.taxFreeGrowth.toLocaleString()}`, color: '#10b981' },
              { label: 'Est. Tax Savings', val: `~$${result.taxSavings.toLocaleString()}`, color: '#8b5cf6' },
              { label: 'Monthly Income (4%)', val: `$${result.monthlyIncome4Pct.toLocaleString()}/mo`, color: '#f59e0b' },
            ].map(item => (
              <div key={item.label} style={{ padding: '0.85rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <p style={{ fontSize: '0.55rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '0.2rem' }}>{item.label}</p>
                <p style={{ fontSize: '1rem', fontWeight: 900, color: item.color }}>{item.val}</p>
              </div>
            ))}
          </div>
        </>
      ) : <div className="py-12 italic opacity-40 text-center">Enter details to project your Roth IRA...</div>}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>A <strong>Roth IRA</strong> is an individual retirement account funded with after-tax dollars. While you get no tax deduction today, qualified withdrawals in retirement — including all investment growth — are completely <strong>tax-free</strong>. This makes it one of the most powerful long-term wealth-building tools available, especially for those who expect to be in a higher tax bracket in retirement.</p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>2024 Contribution Limit:</strong> $7,000/year ($8,000 if age 50+). Must have earned income at least equal to your contribution.</li>
        <li><strong>Income Limits:</strong> Single filers must earn under $161,000 to contribute fully (phased out up to $176,000). Married filing jointly: phase-out $230,000–$240,000.</li>
        <li><strong>Qualified Withdrawals:</strong> Tax-free and penalty-free after age 59½, provided the account has been open for at least 5 years.</li>
        <li><strong>Contribution Flexibility:</strong> Unlike 401k, you can withdraw your <em>contributions</em> (not earnings) at any time, tax and penalty-free.</li>
      </ul>
    </div>
  );

  const formula = "FV = PV×(1+r)^t + PMT×[(1+r)^t−1]/r   [All growth is tax-free at withdrawal]";

  const examples = [
    { title: "Starting at 25 — The Power of Time", description: "Contributing $7,000/year from age 25 to 65 at 7% return yields approximately $1.48M — completely tax-free in retirement. The same contributions starting at 35 yield only $700K. Time is the most powerful variable." },
    { title: "Backdoor Roth IRA", description: "High earners above income limits can use the 'backdoor' strategy: contribute to a non-deductible Traditional IRA, then immediately convert to Roth. This workaround is legal but has specific tax implications — consult a tax advisor." }
  ];

  const faqs = [
    { q: "Roth IRA vs Traditional IRA — which is better?", a: "Roth is generally better if you expect to be in a higher tax bracket in retirement, you're young (more years of tax-free growth), or you want flexibility without required minimum distributions (RMDs). Traditional is better if you need the tax deduction now or expect a lower tax rate in retirement." },
    { q: "What is the 5-year rule?", a: "To make tax-free qualified withdrawals from a Roth IRA, the account must have been open for at least 5 years AND you must be 59½ or older. Each conversion also has its own 5-year clock for penalty-free access." },
    { q: "Can I contribute to both a 401k and a Roth IRA?", a: "Yes! These are separate accounts with separate limits. You can contribute the maximum to both in the same year — $23,000 to 401k + $7,000 to Roth IRA = $30,000 in tax-advantaged savings in 2024." },
    { q: "Does a Roth IRA have Required Minimum Distributions (RMDs)?", a: "No. Unlike Traditional IRAs and 401ks, Roth IRAs are not subject to RMDs during the owner's lifetime. This makes them excellent for estate planning and leaving tax-free wealth to heirs." }
  ];

  const whyUse = [
    { title: "Tax-Free Retirement Income", text: "Roth IRA withdrawals are 100% tax-free in retirement — no federal tax on any of your growth, no matter how large." },
    { title: "Compare Contribution Strategies", text: "Model the impact of maxing out contributions vs contributing less each year over decades." },
    { title: "Estimate Tax Savings", text: "See the estimated tax savings compared to a taxable brokerage account at the 22% bracket." },
    { title: "Retirement Income Planning", text: "Translate your projected balance into estimated monthly tax-free income using the 4% withdrawal rule." }
  ];

  const keyFeatures = [
    { title: "2024 Limit Validation", text: "Automatically warns if your contribution exceeds IRS limits ($7,000 under 50, $8,000 for 50+)." },
    { title: "Tax-Free Growth Display", text: "Explicitly shows how much of your final balance is tax-free growth — the unique advantage of a Roth." },
    { title: "4% Rule Income Estimate", text: "Converts your projected balance into a sustainable monthly retirement income estimate." }
  ];

  const proTips = [
    "Max out your Roth IRA early in January each year rather than waiting — you get a full year of extra tax-free compounding.",
    "If your employer offers a Roth 401k option, consider splitting contributions between pre-tax traditional and post-tax Roth for tax diversification.",
    "Roth IRA contributions can be invested in virtually anything: stocks, ETFs, bonds, REITs. Avoid low-yield savings within a Roth IRA.",
    "If you exceed the income limit, research the 'backdoor Roth' strategy — a legal workaround available to high earners.",
    "Unlike a 401k, a Roth IRA is portable — it stays with you regardless of employer changes and you control the investments."
  ];

  const relatedTools = [
    { name: "401k Calculator", path: "/finance/401k-calculator" },
    { name: "Retirement Calculator", path: "/finance/retirement-calculator" },
    { name: "Investment Calculator", path: "/finance/investment-calculator" },
    { name: "Income Tax Calculator", path: "/finance/income-tax-calculator" }
  ];

  return (
    <CalculatorLayout
      title="Roth IRA Calculator"
      seoTitle="Roth IRA Calculator — Tax-Free Retirement Growth Projector 2024"
      description="Project your Roth IRA balance at retirement with tax-free growth modeling. See contribution limits, estimated tax savings, and monthly income with the 4% rule."
      path="/finance/roth-ira-calculator"
      icon={Leaf}
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
