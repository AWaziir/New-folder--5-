import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState(100);
  const [discountPercent, setDiscountPercent] = useState(20);

  const discountAmount = (originalPrice * discountPercent) / 100;
  const finalPrice = originalPrice - discountAmount;

  const InputPanel = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Original Price ($)</label>
        <input 
            type="number" 
            className="input-field text-xl" 
            value={originalPrice} 
            onChange={(e) => setOriginalPrice(Number(e.target.value))} 
            min="0"
        />
      </div>

      <div className="input-group">
        <label className="input-label">Discount Percentage (%)</label>
        <div className="flex items-center gap-4">
            <input 
                type="range" 
                min="0" 
                max="100" 
                value={discountPercent} 
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-secondary rounded-lg appearance-none cursor-pointer flex-grow"
            />
            <input 
                type="number" 
                className="input-field w-24 text-center font-bold" 
                value={discountPercent} 
                onChange={(e) => setDiscountPercent(Number(e.target.value))} 
                min="0"
                max="100"
            />
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2 pt-2">
         {[10, 20, 25, 50].map(val => (
             <button 
                key={val} 
                onClick={() => setDiscountPercent(val)}
                className={`py-2 rounded-lg text-sm font-bold border transition-all ${discountPercent === val ? 'bg-primary border-primary text-white scale-105' : 'bg-secondary border-border-color text-muted hover:border-primary/50'}`}
             >
                 {val}%
             </button>
         ))}
      </div>
    </div>
  );

  const ResultPanel = (
    <div className="flex flex-col h-full justify-center">
        <div className="mb-6 p-8 bg-success/10 rounded-xl border-2 border-success/30 text-center flex flex-col items-center justify-center relative shadow-inner">
            <p className="text-success mb-2 font-black uppercase tracking-widest text-sm drop-shadow">Final Sale Price</p>
            <p className="text-6xl font-black text-white drop-shadow-md">
                ${finalPrice.toFixed(2)}
            </p>
        </div>
        
        <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-secondary/50 rounded-lg border-l-4 border-red-500">
                <span className="text-muted font-bold">Original Price</span>
                <span className="font-bold line-through text-red-400 opacity-80">${originalPrice.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-secondary/50 rounded-lg border-l-4 border-primary">
                <span className="text-muted font-bold">You Save</span>
                <span className="font-black text-primary-light text-xl">${discountAmount.toFixed(2)}</span>
            </div>
        </div>
    </div>
  );

  const faqs = [
    {
      q: "How do I calculate a discount manually?",
      a: "Convert the percentage to a decimal (e.g., 20% becomes 0.20), then multiply it by the original price to find your savings. Subtract your savings from the original price to get the final sale price."
    },
    {
      q: "Can I use this for sales tax?",
      a: "Yes! If you enter a negative discount (e.g., -10%), the calculator will actually add 10% to the original price, effectively calculating an addition or tax markup."
    }
  ];

  return (
    <CalculatorLayout
      title="Discount Calculator"
      description="Calculate sale price, savings, and original price. Perfect for shopping, black friday sales, and retail math."
      path="/finance/discount-calculator"
      icon={ShoppingCart}
      inputs={InputPanel}
      results={ResultPanel}
      faqs={faqs}
      formula="Final Price = Original Price - (Original Price × (Discount / 100))"
    />
  );
}
