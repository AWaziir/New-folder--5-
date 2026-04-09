import React, { useState } from 'react';
import { PiggyBank } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function EmergencyFundCalculator() {
  const [monthlyExpenses, setMonthlyExpenses] = useState(3000);
  const [monthsTarget, setMonthsTarget] = useState(6);
  const [currentSavings, setCurrentSavings] = useState(5000);

  const targetAmount = monthlyExpenses * monthsTarget;
  const deficit = targetAmount - currentSavings;
  const progressPercent = Math.min((currentSavings / targetAmount) * 100, 100) || 0;

  const InputPanel = (
    <div className="space-y-4">
      <div className="input-group">
        <label className="input-label">Total Monthly Expenses ($)</label>
        <p className="text-xs text-muted mb-2">Rent, food, bills, transport, minimum debts.</p>
        <input 
            type="number" 
            className="input-field" 
            value={monthlyExpenses} 
            onChange={(e) => setMonthlyExpenses(Number(e.target.value))} 
        />
      </div>

      <div className="input-group mt-4">
        <label className="input-label">Target Safety Net (Months)</label>
        <p className="text-xs text-muted mb-2">Experts recommend 3-6 months. Freelancers: 6-12 months.</p>
        <select 
            className="input-field bg-main"
            value={monthsTarget}
            onChange={(e) => setMonthsTarget(Number(e.target.value))}
        >
            <option value={1}>1 Month (Absolute Minimum)</option>
            <option value={3}>3 Months (Standard)</option>
            <option value={6}>6 Months (Recommended)</option>
            <option value={9}>9 Months (Conservative)</option>
            <option value={12}>12 Months (Freelancer/High Risk)</option>
        </select>
      </div>

      <div className="input-group mt-4">
        <label className="input-label">Current Emergency Savings ($)</label>
        <input 
            type="number" 
            className="input-field" 
            value={currentSavings} 
            onChange={(e) => setCurrentSavings(Number(e.target.value))} 
        />
      </div>

      <button 
        className="btn-outline w-full mt-6 print-hide"
        onClick={() => { setMonthlyExpenses(0); setMonthsTarget(6); setCurrentSavings(0); }}
      >
        Clear Values
      </button>
    </div>
  );

  const ResultPanel = (
    <div>
        <div className="mb-6 p-6 bg-secondary/50 rounded-xl border border-border-color text-center flex flex-col items-center justify-center">
            <p className="text-muted mb-2 font-medium uppercase tracking-wider text-sm">Target Emergency Fund</p>
            <p className="text-5xl font-black text-primary-light mb-2 drop-shadow-md">
                ${targetAmount.toLocaleString()}
            </p>
        </div>

        <div className="space-y-4">
            <div>
                <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted">Funding Progress</span>
                    <span className="font-bold text-white">{progressPercent.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-main rounded-full h-3 border border-border-color overflow-hidden">
                    <div 
                        className="bg-primary h-3 rounded-full transition-all duration-500" 
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>
            </div>

            <div className={`p-4 rounded-lg mt-6 border ${deficit <= 0 ? 'bg-success/10 border-success/30 text-success' : 'bg-warning/10 border-warning/30 text-warning-vivid'}`}>
                {deficit <= 0 ? (
                    <div className="flex flex-col text-center">
                        <span className="font-bold text-lg mb-1">🎉 Fully Funded!</span>
                        <span className="text-sm text-white/80">You have officially reached your safety net target. You have a surplus of ${Math.abs(deficit).toLocaleString()}.</span>
                    </div>
                ) : (
                    <div className="flex flex-col text-center">
                        <span className="font-bold text-lg mb-1">Shortfall: ${deficit.toLocaleString()}</span>
                        <span className="text-sm text-white/80">You need to save this amount to reach your {monthsTarget}-month safety net.</span>
                    </div>
                )}
            </div>
        </div>
    </div>
  );

  const faqs = [
    {
      q: "What should be included in my monthly expenses?",
      a: "Only calculate essential survival expenses: Rent/mortgage, utilities, essential groceries, necessary transportation, insurance premiums, and minimum debt payments. Do not include dining out, entertainment, or luxury subscriptions."
    },
    {
      q: "Where should I keep my emergency fund?",
      a: "It must be highly liquid and accessible immediately. A High-Yield Savings Account (HYSA) is widely considered the best place. It earns interest while ensuring you can withdraw the cash instantly without market-loss penalties."
    }
  ];

  return (
    <CalculatorLayout
      title="Emergency Fund Calculator"
      description="Calculate exactly how much money you need in your emergency fund based on your monthly survival expenses and job security."
      path="/finance/emergency-fund"
      icon={PiggyBank}
      inputs={InputPanel}
      results={ResultPanel}
      faqs={faqs}
      formula="Target Amount = Monthly Essential Expenses × Target Months"
    />
  );
}
