import React, { useState, useEffect } from 'react';
import { DollarSign } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState(50);
  const [tipPercentage, setTipPercentage] = useState(15);
  const [peopleCount, setPeopleCount] = useState(1);
  
  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateTip();
  }, [billAmount, tipPercentage, peopleCount]);

  const calculateTip = () => {
    if (billAmount <= 0 || peopleCount <= 0) return;

    const totalTip = billAmount * (tipPercentage / 100);
    const totalBill = billAmount + totalTip;
    const tipPerPerson = totalTip / peopleCount;
    const totalPerPerson = totalBill / peopleCount;

    setResult({
      tip: totalTip.toFixed(2),
      total: totalBill.toFixed(2),
      tipPerPerson: tipPerPerson.toFixed(2),
      totalPerPerson: totalPerPerson.toFixed(2)
    });
  };

  const inputs = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Bill Amount ($)</label>
        <input type="number" className="input-field text-xl" value={billAmount} onChange={e => setBillAmount(Number(e.target.value))} />
      </div>

      <div className="input-group">
        <label className="input-label">Tip Percentage (%)</label>
        <div className="flex gap-2">
            <input type="number" className="input-field" value={tipPercentage} onChange={e => setTipPercentage(Number(e.target.value))} />
            <div className="flex gap-1 flex-wrap">
                {[15, 18, 20, 25].map(pct => (
                    <button 
                      key={pct}
                      className={`px-3 py-1 text-xs font-bold rounded transition ${tipPercentage === pct ? 'bg-primary text-white' : 'bg-slate-50 text-primary hover:bg-primary hover:text-slate-900'}`}
                      onClick={() => setTipPercentage(pct)}
                    >
                      {pct}%
                    </button>
                ))}
            </div>
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">Number of People</label>
        <input type="number" className="input-field" value={peopleCount} onChange={e => setPeopleCount(Math.max(1, Number(e.target.value)))} />
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6">
      {result ? (
        <div className="space-y-6 text-center">
          <div className="p-8 bg-primary/5 rounded-2xl border border-primary/20 shadow-inner group">
            <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Total Per Person</p>
            <p className="text-6xl font-black text-slate-900 group-hover:scale-105 transition">${result.totalPerPerson}</p>
            <p className="text-xs font-bold opacity-40 mt-1">incl. ${result.tipPerPerson} tip</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xs uppercase font-bold opacity-40 mb-1">Total Tip</p>
                <p className="text-xl font-bold text-slate-900">${result.tip}</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xs uppercase font-bold opacity-40 mb-1">Final Bill</p>
                <p className="text-xl font-bold text-slate-900">${result.total}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-12 text-center opacity-40 italic">Calculating...</div>
      )}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        Easily determine how much to tip and how to split the check with friends. Our Tip Calculator is designed for speed and clarity at the end of a meal.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Bill Amount:</strong> Enter the total amount shown on your receipt.</li>
        <li><strong>Tip %:</strong> 15-20% is standard in many regions, but you can enter any custom value.</li>
        <li><strong>Split:</strong> Enter the number of people sharing the cost to get the per-person breakdown.</li>
      </ul>
    </div>
  );

  const formula = "Total = Bill + (Bill × Tip%)";

  const examples = [
    {
      title: "Solo Dinner",
      description: "A $60 meal with a 20% tip results in a $12 tip and a $72 total bill."
    },
    {
      title: "Group Splitting",
      description: "A $200 bill for 4 people with an 18% tip ($36) means each person pays exactly $59."
    }
  ];

  const faqs = [
    {
      q: "Should I tip on the pre-tax or post-tax amount?",
      a: "Most etiquette guides suggest tipping on the pre-tax subtotal, but tipping on the final total is common and appreciated by service staff."
    },
    {
      q: "What is a standard tip for great service?",
      a: "In the United States, 20% is widely considered the benchmark for excellent service at restaurants."
    }
  ];

  return (
    <CalculatorLayout 
      title="Tip Calculator"
      seoTitle="Tip Calculator - Split the Bill & Calculate Gratuity"
      description="Quickly calculate tips and split bills with friends. Fast, free and easy to use tip calculator for any restaurant or service."
      path="/other/tip-calculator"
      icon={DollarSign}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
    />
  );
}
