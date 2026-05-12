import React, { useState, useEffect } from 'react';
import { Tag } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState(100);
  const [discountPercentage, setDiscountPercentage] = useState(20);
  const [taxPercentage, setTaxPercentage] = useState(0);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const discountAmount = originalPrice * (discountPercentage / 100);
    const discountedPrice = originalPrice - discountAmount;
    const taxAmount = discountedPrice * (taxPercentage / 100);
    const finalPrice = discountedPrice + taxAmount;

    setResult({
      savings: discountAmount.toFixed(2),
      discounted: discountedPrice.toFixed(2),
      tax: taxAmount.toFixed(2),
      final: finalPrice.toFixed(2)
    });
  }, [originalPrice, discountPercentage, taxPercentage]);

  const inputs = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Original Price ($)</label>
        <input 
          type="number" 
          className="input-field text-xl font-black" 
          value={originalPrice} 
          onChange={e => setOriginalPrice(Number(e.target.value))} 
        />
      </div>

      <div className="input-group">
        <label className="input-label">Discount Percentage (%)</label>
        <div className="flex gap-2">
            <input 
              type="number" 
              className="input-field text-xl font-black" 
              value={discountPercentage} 
              onChange={e => setDiscountPercentage(Number(e.target.value))} 
            />
            <div className="flex gap-1 flex-wrap">
                {[10, 20, 25, 50, 75].map(pct => (
                    <button 
                      key={pct}
                      className={`px-3 py-1 text-xs font-bold rounded transition ${discountPercentage === pct ? 'bg-primary text-white' : 'bg-slate-50 text-primary hover:bg-primary hover:text-slate-900'}`}
                      onClick={() => setDiscountPercentage(pct)}
                    >
                      {pct}%
                    </button>
                ))}
            </div>
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">Sales Tax (%) - Optional</label>
        <input 
          type="number" 
          className="input-field" 
          value={taxPercentage} 
          onChange={e => setTaxPercentage(Number(e.target.value))} 
        />
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6 text-center">
      {result ? (
        <div className="space-y-6">
          <div className="p-10 bg-primary/5 rounded-2xl border border-primary/20 shadow-inner group transition-all">
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-2">Final Price</p>
            <p className="text-7xl font-black text-slate-900 group-hover:scale-105 transition-transform">
              ${result.final}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60 text-green-600">You Save</p>
              <p className="text-3xl font-black text-slate-900">${result.savings}</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60">Tax Amount</p>
              <p className="text-3xl font-black text-slate-900">${result.tax}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-12 italic opacity-40">Calculating...</div>
      )}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        Master the sales with our Discount Calculator. Whether it's a seasonal clearance or a coupon code, this tool tells you exactly how much you'll pay at the checkout.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Original Price:</strong> The price before any discounts.</li>
        <li><strong>Discount %:</strong> The percentage off (e.g., 20% off).</li>
        <li><strong>Sales Tax:</strong> If applicable, add the tax percentage to see the true final cost.</li>
      </ul>
    </div>
  );

  const formula = "Final Price = (Original - Discount) + Tax";

  const examples = [
    {
      title: "Holiday Sale",
      description: "A $200 jacket with 25% off costs $150. If there is a 10% sales tax, the final total is $165."
    },
    {
      title: "Grocery Savings",
      description: "Using a 10% coupon on a $50 shop saves you $5 instantly."
    }
  ];

  const faqs = [
    {
      q: "How do I calculate a discount manually?",
      a: "Multiply the original price by the discount decimal (e.g., 20% is 0.20), then subtract that number from the original price."
    },
    {
      q: "Does this handle stacked discounts?",
      a: "This tool handles one primary discount percentage. If you have multiple, add them together or apply them sequentially."
    }
  ];

  return (
    <CalculatorLayout
      title="Discount Calculator"
      seoTitle="Discount Calculator - Sale Price & Savings Tool"
      description="Quickly calculate the final price after discounts and taxes. Find out exactly how much you save with our free sale price calculator."
      path="/other/discount-calculator"
      icon={Tag}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
    />
  );
}
