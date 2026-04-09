import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

export default function RentalPropertyCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(350000);
  const [renovationCosts, setRenovationCosts] = useState(15000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [monthlyRent, setMonthlyRent] = useState(2500);
  const [otherIncome, setOtherIncome] = useState(0);
  const [propertyTaxes, setPropertyTaxes] = useState(3600);
  const [insurance, setInsurance] = useState(1200);
  const [maintenancePercent, setMaintenancePercent] = useState(10);
  const [managementPercent, setManagementPercent] = useState(8);
  const [appreciationRate, setAppreciationRate] = useState(3);

  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateRental();
  }, [purchasePrice, renovationCosts, downPaymentPercent, interestRate, monthlyRent, otherIncome, propertyTaxes, insurance, maintenancePercent, managementPercent, appreciationRate]);

  const calculateRental = () => {
    const downPayment = purchasePrice * (downPaymentPercent / 100);
    const loanAmount = purchasePrice - downPayment;
    const initialCash = downPayment + renovationCosts + (purchasePrice * 0.03); // ~3% closing costs

    const r = interestRate / 100 / 12;
    const n = 30 * 12; // Standard 30 year
    let monthlyMortgage = 0;
    if (loanAmount > 0) {
      if (r === 0) {
        monthlyMortgage = loanAmount / n;
      } else {
        monthlyMortgage = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      }
    }

    const grossIncome = monthlyRent + otherIncome;
    const monthlyTaxes = propertyTaxes / 12;
    const monthlyInsurance = insurance / 12;
    const monthlyMaintenance = monthlyRent * (maintenancePercent / 100);
    const monthlyManagement = monthlyRent * (managementPercent / 100);

    const totalExpenses = monthlyMortgage + monthlyTaxes + monthlyInsurance + monthlyMaintenance + monthlyManagement;
    const monthlyCashFlow = grossIncome - totalExpenses;
    
    // Annualized results
    const annualCashFlow = monthlyCashFlow * 12;
    const annualAppreciation = purchasePrice * (appreciationRate / 100);
    const totalAnnualReturn = annualCashFlow + annualAppreciation;
    const returnOnInvestment = (totalAnnualReturn / initialCash) * 100;

    setResult({
        initialCash: Math.round(initialCash),
        monthlyCashFlow: Math.round(monthlyCashFlow),
        totalAnnualReturn: Math.round(totalAnnualReturn),
        roi: returnOnInvestment.toFixed(2),
        cashFlowProjection: Math.round(annualCashFlow * 10), // Simple 10y (not compounded for simplicity)
        appreciationProjection: Math.round(purchasePrice * Math.pow(1 + (appreciationRate / 100), 10))
    });
  };

  return (
    <div className="container">
      <SEO 
        title="Rental Property Calculator – Detailed ROI & Cash Flow Analysis" 
        description="Plan your real estate wealth with precision. Calculate cash-on-cash return, ROI, and long-term appreciation with our professional rental property tool." 
        path="/finance/rental-property-calculator"
      />
      
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8 px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-center">Rental Property Calculator</h1>
        <p className="text-muted mb-10 text-center max-width-2xl mx-auto">Optimize your portfolio. Analyze monthly operations, management fees, and long-term appreciation in one powerful dashboard.</p>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Inputs */}
          <div className="space-y-6">
            <div className="card shadow-lg">
                <h2 className="text-xl font-bold mb-6 text-primary">Property Setup</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="input-group">
                        <label className="input-label">Purchase Price ($)</label>
                        <input type="number" className="input-field" value={purchasePrice} onChange={e => setPurchasePrice(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Renovations ($)</label>
                        <input type="number" className="input-field" value={renovationCosts} onChange={e => setRenovationCosts(Number(e.target.value))} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="input-group">
                        <label className="input-label">Interest Rate (%)</label>
                        <input type="number" step="0.1" className="input-field" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Appreciation (%)</label>
                        <input type="number" step="0.1" className="input-field" value={appreciationRate} onChange={e => setAppreciationRate(Number(e.target.value))} />
                    </div>
                </div>
            </div>

            <div className="card shadow-lg">
                <h2 className="text-xl font-bold mb-6 text-primary">Monthly Operations</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="input-group">
                        <label className="input-label">Monthly Rent ($)</label>
                        <input type="number" className="input-field border-primary" value={monthlyRent} onChange={e => setMonthlyRent(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Mgmt Fee (%)</label>
                        <input type="number" className="input-field" value={managementPercent} onChange={e => setManagementPercent(Number(e.target.value))} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="input-group">
                        <label className="input-label">Maintenance (%)</label>
                        <input type="number" className="input-field" value={maintenancePercent} onChange={e => setMaintenancePercent(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Other Income ($)</label>
                        <input type="number" className="input-field" value={otherIncome} onChange={e => setOtherIncome(Number(e.target.value))} />
                    </div>
                </div>
            </div>
          </div>

          {/* Results */}
          <div>
            <div className="card shadow-2xl bg-primary-dark text-white sticky top-24 shadow-xl p-8 border-none flex flex-col justify-center relative rounded-2xl min-h-[450px]">
              <div className="absolute bottom-[-10px] right-[-10px] pointer-events-none z-0" style={{ opacity: 0.03 }}>
                 <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
              </div>

              <h2 className="text-xl font-bold mb-8 text-center uppercase tracking-widest opacity-80 relative z-10">Rental Performance</h2>
              
              {result ? (
                <div className="relative z-10 space-y-8">
                  <div className="p-8 bg-white-10 rounded-2xl border-2 border-white-20 text-center shadow-inner">
                    <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-70">Monthly Net Cash Flow</p>
                    <p className={`text-6xl font-black ${result.monthlyCashFlow >= 0 ? 'text-white' : 'text-danger-light'}`}>
                        ${result.monthlyCashFlow.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-white-5 rounded-xl text-center">
                      <p className="text-[10px] font-bold uppercase opacity-60 mb-2">Total ROI (%)</p>
                      <p className="text-2xl font-black text-primary-light">{result.roi}%</p>
                    </div>
                    <div className="p-5 bg-white-5 rounded-xl text-center">
                      <p className="text-[10px] font-bold uppercase opacity-60 mb-2">Cash Needed</p>
                      <p className="text-2xl font-black text-white">${result.initialCash.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-white-10 pt-6">
                    <p className="text-xs font-bold uppercase opacity-50 mb-2 text-center tracking-widest">10-Year Wealth Projection</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                            <p className="text-sm opacity-70">Total Cash Flow</p>
                            <p className="text-lg font-bold">${result.cashFlowProjection.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm opacity-70">Property Value</p>
                            <p className="text-lg font-bold">${result.appreciationProjection.toLocaleString()}</p>
                        </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-20 opacity-40 text-center italic">Awaiting calculation data...</div>
              )}
            </div>
          </div>
        </div>

        <section className="mt-16 space-y-12">
            <div className="card">
                <h2 className="text-2xl font-bold mb-4">Rental Property Analytics Guide</h2>
                <p className="text-muted leading-relaxed">
                    A successful rental property isn't just about collecting rent. It's about optimizing the spread between your gross income and your total cost of ownership.
                </p>
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                    <div className="p-6 bg-secondary rounded-xl border-l-4 border-primary">
                        <h3 className="font-bold text-primary mb-2">Operating Expenses</h3>
                        <p className="text-sm text-muted">Includes property taxes, insurance, management fees (usually 8-12%), and a maintenance reserve (ideally 1% of property value annually or 10-15% of rent).</p>
                    </div>
                    <div className="p-6 bg-secondary rounded-xl border-l-4 border-primary">
                        <h3 className="font-bold text-primary mb-2">Appreciation Return</h3>
                        <p className="text-sm text-muted">While cash flow covers your monthly bills, appreciation is where long-term wealth is built. Even a 3% annual growth can double your property value over time.</p>
                    </div>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
}
