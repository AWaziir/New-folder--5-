import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function ProfitLossCalculator() {
  const [costPrice, setCostPrice] = useState(100);
  const [sellingPrice, setSellingPrice] = useState(150);

  const profit = sellingPrice - costPrice;
  const profitMargin = (profit / sellingPrice) * 100;
  const markup = (profit / costPrice) * 100;
  
  const isProfit = profit >= 0;

  const InputPanel = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Cost Price ($)</label>
        <input 
            type="number" 
            className="input-field text-xl" 
            value={costPrice} 
            onChange={(e) => setCostPrice(Number(e.target.value))} 
        />
        <p className="text-xs text-muted mt-2">The total expense to produce or buy the item.</p>
      </div>

      <div className="input-group">
        <label className="input-label">Selling Price ($)</label>
        <input 
            type="number" 
            className="input-field text-xl" 
            value={sellingPrice} 
            onChange={(e) => setSellingPrice(Number(e.target.value))} 
        />
        <p className="text-xs text-muted mt-2">The price you charge your customer.</p>
      </div>
    </div>
  );

  const ResultPanel = (
    <div className="flex flex-col h-full justify-center">
      <div className={`mb-6 p-8 rounded-xl border-2 text-center flex flex-col items-center justify-center relative shadow-inner ${isProfit ? 'bg-success/10 border-success' : 'bg-red-500/10 border-red-500'}`}>
        <p className={`mb-2 font-black uppercase tracking-widest text-sm drop-shadow ${isProfit ? 'text-success' : 'text-red-400'}`}>
            {isProfit ? 'Net Profit' : 'Net Loss'}
        </p>
        <p className="text-6xl font-black text-white drop-shadow-md">
          ${Math.abs(profit).toFixed(2)}
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-secondary shadow-lg rounded-xl flex flex-col items-center border border-border-color">
              <span className={`text-xl font-black ${isProfit ? 'text-success-light' : 'text-red-400'}`}>{profitMargin.toFixed(2)}%</span>
              <span className="text-xs text-muted uppercase font-bold mt-1">Gross Margin</span>
          </div>
          <div className="p-4 bg-secondary shadow-lg rounded-xl flex flex-col items-center border border-border-color">
              <span className={`text-xl font-black ${isProfit ? 'text-primary-light' : 'text-red-400'}`}>{markup.toFixed(2)}%</span>
              <span className="text-xs text-muted uppercase font-bold mt-1">Markup</span>
          </div>
      </div>
    </div>
  );

  const faqs = [
    {
      q: "What is the difference between Margin and Markup?",
      a: "Markup is the percentage of the cost price that is added to reach the selling price. Margin is the percentage of the final selling price that is profit."
    },
    {
      q: "How do I calculate profit margin?",
      a: "The formula for profit margin is: (Profit / Selling Price) × 100. It tells you how much of every dollar of sales you keep as profit."
    }
  ];

  return (
    <CalculatorLayout
      title="Profit & Loss Calculator"
      description="Easily calculate your business profit, margins, and markup percentages to optimize your pricing strategy."
      path="/finance/profit-loss"
      icon={TrendingUp}
      inputs={InputPanel}
      results={ResultPanel}
      faqs={faqs}
      formula="Profit = Selling Price - Cost Price | Margin = (Profit / Selling Price) × 100"
    />
  );
}
