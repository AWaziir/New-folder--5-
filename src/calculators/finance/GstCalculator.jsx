import React, { useState, useEffect } from 'react';
import { Receipt } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function GstCalculator() {
  const [amount, setAmount] = useState(100);
  const [gstRate, setGstRate] = useState(10); // Default for Australia
  const [type, setType] = useState('add'); // add or remove

  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateGst();
  }, [amount, gstRate, type]);

  const calculateGst = () => {
    let gstAmount, totalAmount, originalAmount;

    if (type === 'add') {
      gstAmount = amount * (gstRate / 100);
      totalAmount = amount + gstAmount;
      originalAmount = amount;
    } else {
      totalAmount = amount;
      originalAmount = amount / (1 + gstRate / 100);
      gstAmount = amount - originalAmount;
    }

    setResult({
      gst: gstAmount.toFixed(2),
      total: totalAmount.toFixed(2),
      original: originalAmount.toFixed(2),
      rate: gstRate
    });
  };

  const inputs = (
    <div className="space-y-6">
      <div className="flex bg-slate-100 p-1 rounded-lg">
          <button 
              className={`flex-1 py-3 rounded-md font-bold transition ${type === 'add' ? 'bg-primary text-white shadow-md' : 'text-muted'}`}
              onClick={() => setType('add')}
          >
              Add GST
          </button>
          <button 
              className={`flex-1 py-3 rounded-md font-bold transition ${type === 'remove' ? 'bg-primary text-white shadow-md' : 'text-muted'}`}
              onClick={() => setType('remove')}
          >
              GST Inclusive
          </button>
      </div>

      <div className="input-group">
        <label className="input-label">Amount ($)</label>
        <input type="number" className="input-field text-xl font-black" value={amount} onChange={e => setAmount(Number(e.target.value))} />
      </div>

      <div className="input-group">
        <label className="input-label">GST Rate (%)</label>
        <div className="flex gap-2">
           <input type="number" className="input-field font-black flex-grow" value={gstRate} onChange={e => setGstRate(Number(e.target.value))} />
           <select className="input-field w-auto font-bold" onChange={e => setGstRate(Number(e.target.value))}>
              <option value="">Custom</option>
              <option value="10">AU (10%)</option>
              <option value="15">NZ (15%)</option>
              <option value="20">UK (20%)</option>
           </select>
        </div>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6 text-center">
      {result ? (
        <div className="space-y-6">
          <div className="p-10 bg-primary/5 rounded-2xl border border-primary/20 shadow-inner group transition-all">
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-2">Total Amount (Gross)</p>
            <p className="text-5xl font-black text-slate-900 group-hover:scale-105 transition-transform">
                ${result.total}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60">Net (Excl. GST)</p>
                <p className="text-xl font-black text-slate-900">${result.original}</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60 text-pink-400">GST Portion</p>
                <p className="text-xl font-black text-pink-400">${result.gst}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-12 italic opacity-40 text-center">Enter amount to calculate GST...</div>
      )}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        Simplify your business bookkeeping with our versatile GST Calculator. Whether you need to add GST to a quote or extract it from a total receipt, this tool handles the math instantly for Australian and international standards.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Add GST:</strong> Used when you know the base price and need to find the final price for the customer.</li>
        <li><strong>GST Inclusive:</strong> Used when you have a total price and need to know the tax component for your BAS or tax return.</li>
        <li><strong>AU Standards:</strong> Australia’s Goods and Services Tax is 10%, but you can use custom rates for other regions.</li>
      </ul>
    </div>
  );

  const formula = "Total = Net × (1 + Rate/100) | Net = Total / (1 + Rate/100)";

  const examples = [
    {
      title: "Quoting a Client",
      description: "If you quote a task at $1,000 + GST, the total invoice amount to the client will be $1,100."
    },
    {
      title: "Receipt Extraction",
      description: "A retail receipt of $110 exactly includes $10 of GST and a base net price of $100."
    }
  ];

  const faqs = [
    {
      q: "What is the current GST rate in Australia?",
      a: "The standard Goods and Services Tax (GST) rate in Australia is 10% on most goods and services."
    },
    {
      q: "Is GST different from VAT?",
      a: "GST (Goods and Services Tax) and VAT (Value Added Tax) are functionally very similar; both are consumption taxes applied at each stage of the supply chain."
    }
  ];

  return (
    <CalculatorLayout 
      title="GST Australia"
      seoTitle="GST Calculator Australia - AU Inclusive & Exclusive Tool"
      description="Calculate GST for Australia (10%), NZ (15%), and more. Fast, free GST inclusive and exclusive calculator for business and personal bookkeeping."
      path="/finance/gst-calculator"
      icon={Receipt}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
    />
  );
}
