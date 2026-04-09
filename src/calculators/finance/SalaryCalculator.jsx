import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

export default function SalaryCalculator() {
  const [salary, setSalary] = useState(75000);
  const [period, setPeriod] = useState('annual');
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(52);

  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateBreakdown();
  }, [salary, period, hoursPerWeek, weeksPerYear]);

  const calculateBreakdown = () => {
    let annual = salary;
    if (period === 'monthly') annual = salary * 12;
    else if (period === 'weekly') annual = salary * 52;
    else if (period === 'hourly') annual = salary * hoursPerWeek * weeksPerYear;

    const monthly = annual / 12;
    const biweekly = annual / 26;
    const weekly = annual / 52;
    const daily = annual / (weeksPerYear * 5);
    const hourly = annual / (weeksPerYear * hoursPerWeek);

    setResult({
        annual: Math.round(annual),
        monthly: Math.round(monthly),
        biweekly: Math.round(biweekly),
        weekly: Math.round(weekly),
        daily: Math.round(daily),
        hourly: hourly.toFixed(2)
    });
  };

  return (
    <div className="container">
      <SEO 
        title="Salary & Income Calculator" 
        description="Convert your salary to hourly, weekly, bi-weekly, or monthly income instantly." 
        path="/finance/salary-calculator"
      />
      
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8">
        <h1 className="text-3xl font-bold mb-2">Salary & Income Breakdown</h1>
        <p className="text-muted mb-6">Convert your pay between various time periods and see your true hourly rate.</p>

        <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Salary Details</h2>
            
            <div className="flex gap-4 mb-4">
              <select className="input-field flex-1" value={period} onChange={e => setPeriod(e.target.value)}>
                <option value="annual">Annual Salary</option>
                <option value="monthly">Monthly Salary</option>
                <option value="weekly">Weekly Salary</option>
                <option value="hourly">Hourly Rate</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Amount ($)</label>
              <input type="number" className="input-field" value={salary} onChange={e => setSalary(Number(e.target.value))} />
            </div>

            <div className="flex gap-4">
              <div className="input-group flex-1">
                <label className="input-label">Hours Per Week</label>
                <input type="number" className="input-field" value={hoursPerWeek} onChange={e => setHoursPerWeek(Number(e.target.value))} />
              </div>
              <div className="input-group flex-1">
                <label className="input-label">Weeks Per Year</label>
                <input type="number" className="input-field" value={weeksPerYear} onChange={e => setWeeksPerYear(Number(e.target.value))} />
              </div>
            </div>
          </div>

          <div>
            <div className="card sticky top-24 highlight-border shadow-lg">
              <h2 className="text-xl font-bold mb-6">Income Breakdown</h2>
              
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-secondary rounded-lg">
                    <p className="text-muted text-xs font-bold uppercase mb-1">Annual Total</p>
                    <p className="text-2xl font-bold text-primary">${result.annual.toLocaleString()}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-secondary rounded-lg">
                        <p className="text-muted text-xs font-bold uppercase mb-1">Monthly</p>
                        <p className="text-lg font-bold">${result.monthly.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                        <p className="text-muted text-xs font-bold uppercase mb-1">Bi-Weekly</p>
                        <p className="text-lg font-bold">${result.biweekly.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                        <p className="text-muted text-xs font-bold uppercase mb-1">Daily</p>
                        <p className="text-lg font-bold">${result.daily.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg border-2 border-primary">
                        <p className="text-primary text-xs font-bold uppercase mb-1">Hourly Rate</p>
                        <p className="text-lg font-bold text-primary">${result.hourly}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-muted">Calculating...</div>
              )}
            </div>
          </div>
        </div>

        <AdPlaceholder text="Mid-Content Ad" />
      </div>
    </div>
  );
}
