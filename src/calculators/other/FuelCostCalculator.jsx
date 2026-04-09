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

  const InputPanel = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Trip Distance (km)</label>
        <input 
            type="number" 
            className="input-field text-xl" 
            value={distance} 
            onChange={(e) => setDistance(Number(e.target.value))} 
        />
      </div>

      <div className="input-group">
        <label className="input-label">Fuel Efficiency (L/100km)</label>
        <input 
            type="number" 
            className="input-field text-xl" 
            value={efficiency} 
            onChange={(e) => setEfficiency(Number(e.target.value))} 
        />
      </div>

      <div className="input-group">
        <label className="input-label">Fuel Price ($ per liter)</label>
        <input 
            type="number" 
            step="0.01"
            className="input-field text-xl" 
            value={price} 
            onChange={(e) => setPrice(Number(e.target.value))} 
        />
      </div>
    </div>
  );

  const ResultPanel = (
    <div className="flex flex-col h-full justify-center">
      <div className="mb-6 p-8 bg-primary/10 rounded-xl border-2 border-primary/30 text-center flex flex-col items-center justify-center relative shadow-inner">
        <p className="text-primary-light mb-2 font-black uppercase tracking-widest text-sm drop-shadow">Estimated Trip Cost</p>
        <p className="text-6xl font-black text-white drop-shadow-md">
          ${totalCost.toFixed(2)}
        </p>
      </div>
      
      <div className="p-4 bg-secondary/50 rounded-lg border-l-4 border-success text-center">
        <p className="text-muted text-sm font-bold uppercase mb-1">Fuel Required</p>
        <p className="text-xl font-black text-white">
          {fuelNeeded.toFixed(2)} <span className="text-sm font-normal opacity-70">Liters</span>
        </p>
      </div>
    </div>
  );

  const faqs = [
    {
      q: "How is trip cost calculated?",
      a: "The formula is (Distance / 100) * Efficiency * Price. For example, a 200km trip in a car that uses 10L/100km at $2/L would cost (200/100) * 10 * 2 = $40."
    },
    {
      q: "How do I find my car's fuel efficiency?",
      a: "Most modern cars display this on the dashboard. Alternatively, you can calculate it by filling your tank, resetting your trip meter, driving, and then dividing the liters used by the kilometers traveled (multiplied by 100)."
    }
  ];

  return (
    <CalculatorLayout
      title="Fuel Cost Calculator"
      description="Estimate the total cost of fuel for your next road trip based on distance and vehicle efficiency."
      path="/other/fuel-cost"
      icon={Car}
      inputs={InputPanel}
      results={ResultPanel}
      faqs={faqs}
      formula="Cost = (Distance / 100) × Fuel Consumption × Price per Liter"
    />
  );
}
