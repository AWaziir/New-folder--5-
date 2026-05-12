import React, { useState } from 'react';
import { Car } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function FuelCostCalculator() {
  const [distance, setDistance] = useState(100);
  const [efficiency, setEfficiency] = useState(8); // L/100km
  const [price, setPrice] = useState(1.80); // price per liter

  const calculateCost = () => {
    const fuelNeeded = (distance / 100) * efficiency;
    const totalCost = fuelNeeded * price;
    return {
        fuelNeeded,
        totalCost
    };
  };

  const { fuelNeeded, totalCost } = calculateCost();

  const inputs = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Trip Distance (km)</label>
        <input 
            type="number" 
            className="input-field text-xl font-black" 
            value={distance} 
            onChange={(e) => setDistance(Number(e.target.value))} 
        />
      </div>

      <div className="input-group">
        <label className="input-label">Fuel Efficiency (L/100km)</label>
        <input 
            type="number" 
            className="input-field text-xl font-black" 
            value={efficiency} 
            onChange={(e) => setEfficiency(Number(e.target.value))} 
        />
      </div>

      <div className="input-group">
        <label className="input-label">Fuel Price ($ per liter)</label>
        <input 
            type="number" 
            step="0.01"
            className="input-field text-xl font-black" 
            value={price} 
            onChange={(e) => setPrice(Number(e.target.value))} 
        />
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6 text-center">
      <div className="p-10 bg-primary/5 rounded-2xl border border-primary/20 shadow-inner group transition-all">
        <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-2">Estimated Trip Cost</p>
        <p className="text-7xl font-black text-slate-900 group-hover:scale-105 transition-transform">
          ${totalCost.toFixed(2)}
        </p>
      </div>
      
      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60">Fuel Required</p>
        <p className="text-3xl font-black text-slate-900">
          {fuelNeeded.toFixed(2)} <span className="text-sm font-normal opacity-40">Liters</span>
        </p>
      </div>
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        Planning a road trip? Our Fuel Cost Calculator helps you estimate exactly how much you'll spend on petrol or diesel based on your vehicle's fuel efficiency.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Distance:</strong> Total kilometers you plan to drive.</li>
        <li><strong>Efficiency:</strong> Your car's fuel economy in Liters per 100km.</li>
        <li><strong>Price:</strong> Current cost of fuel at the pump.</li>
      </ul>
    </div>
  );

  const formula = "Cost = (Distance / 100) × Efficiency × Price";

  const examples = [
    {
      title: "Weekend Getaway",
      description: "Driving 300km in a car that uses 8L/100km with fuel at $1.90/L will cost you approximately $45.60."
    },
    {
      title: "Daily Commute",
      description: "If your round trip is 40km daily, you can calculate your weekly commute costs to better manage your budget."
    }
  ];

  const faqs = [
    {
      q: "How accurate is this estimate?",
      a: "The estimate is mathematically perfect but depends on your vehicle efficiency. Real-world fuel usage can vary with traffic, load, and driving style."
    },
    {
      q: "Where do I find my L/100km rating?",
      a: "Check your car's manual or dashboard 'Averge Consumption' metric. Modern cars often track this in real-time."
    }
  ];

  return (
    <CalculatorLayout
      title="Fuel Cost Calculator"
      seoTitle="Fuel Cost Calculator - Road Trip Petrol Expense Tool"
      description="Estimate the total cost of fuel for your next road trip based on distance and vehicle efficiency. Fast, free petrol cost estimator."
      path="/other/fuel-cost"
      icon={Car}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
    />
  );
}
