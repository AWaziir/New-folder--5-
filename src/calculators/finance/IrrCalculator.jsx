import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

function computeIRR(cashFlows, guess = 0.1) {
  // Newton-Raphson method
  let rate = guess;
  for (let iter = 0; iter < 1000; iter++) {
    let npv = 0, dnpv = 0;
    for (let t = 0; t < cashFlows.length; t++) {
      const factor = Math.pow(1 + rate, t);
      npv += cashFlows[t] / factor;
      dnpv -= t * cashFlows[t] / (factor * (1 + rate));
    }
    const newRate = rate - npv / dnpv;
    if (Math.abs(newRate - rate) < 1e-8) return newRate;
    rate = newRate;
  }
  return null;
}

function computeNPV(cashFlows, rate) {
  return cashFlows.reduce((sum, cf, t) => sum + cf / Math.pow(1 + rate, t), 0);
}

export default function IrrCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(100000);
  const [discountRate, setDiscountRate] = useState(10);
  const [cashFlows, setCashFlows] = useState([30000, 40000, 35000, 30000, 25000]);
  const [result, setResult] = useState(null);

  const updateCF = (index, value) => {
    const updated = [...cashFlows];
    updated[index] = Number(value);
    setCashFlows(updated);
  };

  const addYear = () => setCashFlows([...cashFlows, 0]);
  const removeYear = () => cashFlows.length > 1 && setCashFlows(cashFlows.slice(0, -1));

  const calculate = () => {
    const flows = [-initialInvestment, ...cashFlows];
    const irr = computeIRR(flows);
    const npv = computeNPV(flows, discountRate / 100);
    const totalCashIn = cashFlows.reduce((a, b) => a + b, 0);
    const netProfit = totalCashIn - initialInvestment;
    const paybackYears = (() => {
      let cumulative = 0;
      for (let i = 0; i < cashFlows.length; i++) {
        cumulative += cashFlows[i];
        if (cumulative >= initialInvestment) return i + 1;
      }
      return null;
    })();

    setResult({
      irr: irr !== null ? (irr * 100).toFixed(2) : 'N/A',
      npv: npv.toFixed(2),
      totalCashIn: totalCashIn,
      netProfit: netProfit,
      paybackYears,
      viable: irr !== null && irr * 100 > discountRate && npv > 0,
    });
  };

  const inputs = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Initial Investment ($)</label>
        <input type="number" className="input-field text-xl font-black" value={initialInvestment} onChange={e => setInitialInvestment(Number(e.target.value))} />
        <p style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '0.25rem' }}>Enter as positive number (invested at Year 0)</p>
      </div>
      <div className="input-group">
        <label className="input-label">Discount Rate / Hurdle Rate (%)</label>
        <input type="number" step="0.5" className="input-field font-bold" value={discountRate} onChange={e => setDiscountRate(Number(e.target.value))} />
        <p style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '0.25rem' }}>Your required minimum return (WACC or opportunity cost)</p>
      </div>
      <div>
        <label className="input-label">Annual Cash Flows ($)</label>
        <div className="space-y-3" style={{ marginTop: '0.5rem' }}>
          {cashFlows.map((cf, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', width: '50px', textAlign: 'right', flexShrink: 0 }}>Year {i + 1}</span>
              <input type="number" className="input-field font-bold" value={cf} onChange={e => updateCF(i, e.target.value)} style={{ flex: 1 }} />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
          <button onClick={addYear} style={{ flex: 1, padding: '0.5rem', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 700, color: '#166534', cursor: 'pointer' }}>+ Add Year</button>
          <button onClick={removeYear} style={{ flex: 1, padding: '0.5rem', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 700, color: '#991b1b', cursor: 'pointer' }}>− Remove Year</button>
        </div>
      </div>
      <button onClick={calculate} style={{ width: '100%', padding: '0.85rem', background: '#245da2', color: '#fff', borderRadius: '0.75rem', fontWeight: 800, fontSize: '0.95rem', border: 'none', cursor: 'pointer' }}>
        Calculate IRR & NPV
      </button>
    </div>
  );

  const results = (
    <div className="space-y-4">
      {result ? (
        <>
          <div style={{ padding: '1.25rem', background: result.viable ? 'linear-gradient(135deg,#f0fdf415,#dcfce725)' : 'linear-gradient(135deg,#fef2f215,#fee2e225)', border: `1px solid ${result.viable ? '#86efac' : '#fca5a5'}`, borderRadius: '1rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: result.viable ? '#166534' : '#991b1b', marginBottom: '0.35rem' }}>Internal Rate of Return (IRR)</p>
            <p style={{ fontSize: '3rem', fontWeight: 900, color: result.viable ? '#14532d' : '#7f1d1d' }}>{result.irr}%</p>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: result.viable ? '#166534' : '#991b1b' }}>
              {result.viable ? `✅ Exceeds hurdle rate (${discountRate}%) — INVEST` : `❌ Below hurdle rate (${discountRate}%) — PASS`}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'NPV', val: `$${Math.round(Number(result.npv)).toLocaleString()}`, color: Number(result.npv) >= 0 ? '#10b981' : '#ef4444' },
              { label: 'Payback Period', val: result.paybackYears ? `${result.paybackYears} years` : '>Term', color: '#245da2' },
              { label: 'Total Cash In', val: `$${result.totalCashIn.toLocaleString()}`, color: '#0f172a' },
              { label: 'Net Profit', val: `${result.netProfit >= 0 ? '+' : ''}$${result.netProfit.toLocaleString()}`, color: result.netProfit >= 0 ? '#10b981' : '#ef4444' },
            ].map(item => (
              <div key={item.label} style={{ padding: '0.85rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <p style={{ fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '0.2rem' }}>{item.label}</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 900, color: item.color }}>{item.val}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={{ padding: '3rem 1rem', textAlign: 'center', opacity: 0.4, fontStyle: 'italic' }}>
          Enter cash flows and click Calculate to see IRR & NPV...
        </div>
      )}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>The <strong>Internal Rate of Return (IRR)</strong> is the discount rate at which an investment's Net Present Value (NPV) equals zero. It represents the annualized return an investment is expected to generate. Investors use IRR to compare potential investments and decide if a project exceeds their minimum required return (hurdle rate).</p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Investment Decision Rule:</strong> If IRR {'>'} Hurdle Rate (your required return / WACC), the investment is worth considering. If IRR {'<'} Hurdle Rate, reject it.</li>
        <li><strong>NPV Rule:</strong> If NPV {'>'} 0 at your discount rate, the project creates value. NPV and IRR usually agree on the decision.</li>
        <li><strong>Cash Flows:</strong> Enter your expected annual returns from the investment. Negative values are allowed if some years generate a loss.</li>
        <li><strong>Payback Period:</strong> The number of years to recover the initial investment from cumulative cash flows (undiscounted).</li>
      </ul>
    </div>
  );

  const formula = "IRR = rate r where: Σ [CFₜ / (1+r)^t] = 0   |   NPV = Σ [CFₜ / (1+r)^t]";

  const examples = [
    { title: "Real Estate Investment", description: "Buying a rental property for $200,000 generating $18,000/year net for 10 years plus a $220,000 sale at year 10 yields an IRR of approximately 11.2% — likely exceeding most investors' 8–10% hurdle rate." },
    { title: "Business Expansion", description: "A $100,000 machine investment generating $30,000/year for 5 years has an IRR of ~15%. If the company's WACC is 10%, the project adds value and NPV is positive — a clear 'invest' decision." }
  ];

  const faqs = [
    { q: "What is the difference between IRR and NPV?", a: "NPV gives the absolute dollar value created by a project (requires you to specify a discount rate). IRR gives the percentage return rate (no discount rate needed, but you compare it to your hurdle rate). Both should align in the invest/reject decision." },
    { q: "What is a good IRR?", a: "It depends on context. For real estate, 12–15% is often considered good. For venture capital, 20–30%+ is typical. For corporate investments, IRR should exceed the company's WACC (typically 8–12% for large companies)." },
    { q: "Can IRR be negative?", a: "Yes. A negative IRR means the project destroys more value than it creates — you'd be better off not investing." },
    { q: "Why does IRR sometimes fail?", a: "When cash flows change sign more than once (e.g., negative, positive, negative), multiple IRRs can exist. In these cases, Modified IRR (MIRR) or NPV is more reliable." }
  ];

  const whyUse = [
    { title: "Investment Decisions", text: "Compare the IRR of competing projects against your hurdle rate to objectively rank investment opportunities." },
    { title: "Business Case Analysis", text: "Justify capital expenditure by showing projected IRR exceeds the company's cost of capital (WACC)." },
    { title: "Real Estate Analysis", text: "Calculate total return on property investments including rental income and appreciation over the hold period." },
    { title: "NPV Crosscheck", text: "Use both IRR and NPV to confirm investment decisions — they should always point in the same direction." }
  ];

  const keyFeatures = [
    { title: "Newton-Raphson IRR", text: "Uses professional-grade iterative algorithm for accurate IRR calculation across up to 20+ years of cash flows." },
    { title: "NPV at Custom Rate", text: "Calculates Net Present Value at your specified hurdle rate for a complete investment analysis picture." },
    { title: "Invest/Pass Signal", text: "Automatic green/red decision signal compares calculated IRR against your entered hurdle rate." }
  ];

  const proTips = [
    "Always use IRR alongside NPV — a high IRR on a small investment may be less valuable than a lower IRR on a large one.",
    "Your discount rate should reflect your opportunity cost: what else could you do with this money? At minimum, it should exceed inflation.",
    "For real estate, include all costs (stamp duty, maintenance, vacancies) in the initial investment and annual cash flows for accurate IRR.",
    "A common mistake: IRR implicitly assumes reinvestment at the IRR rate. Modified IRR (MIRR) uses a more realistic reinvestment rate assumption.",
    "When comparing projects with different scales, compare NPVs — not just IRRs. A 30% IRR on $1,000 creates less value than 15% on $1,000,000."
  ];

  const relatedTools = [
    { name: "Investment Calculator", path: "/finance/investment-calculator" },
    { name: "ROI Calculator", path: "/finance/roi-calculator" },
    { name: "Retirement Calculator", path: "/finance/retirement-calculator" },
    { name: "Savings Calculator", path: "/finance/savings-calculator" }
  ];

  return (
    <CalculatorLayout
      title="IRR Calculator"
      seoTitle="IRR Calculator — Internal Rate of Return & NPV Analysis"
      description="Calculate Internal Rate of Return (IRR) and Net Present Value (NPV) for any investment. Enter your cash flows and discount rate for a complete investment analysis."
      path="/finance/irr-calculator"
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
