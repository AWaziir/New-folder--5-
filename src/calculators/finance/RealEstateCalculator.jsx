import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

export default function RealEstateCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(400000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [closingCosts, setClosingCosts] = useState(12000);
  const [monthlyRent, setMonthlyRent] = useState(2800);
  const [annualTaxes, setAnnualTaxes] = useState(4800);
  const [monthlyInsurance, setMonthlyInsurance] = useState(150);
  const [monthlyHOA, setMonthlyHOA] = useState(250);
  const [vacancyRate, setVacancyRate] = useState(5);

  const [result, setResult] = useState(null);

  useEffect(() => {
    calculatePerformance();
  }, [purchasePrice, downPaymentPercent, interestRate, loanTerm, closingCosts, monthlyRent, annualTaxes, monthlyInsurance, monthlyHOA, vacancyRate]);

  const calculatePerformance = () => {
    // 1. Loan Details
    const downPaymentAmount = purchasePrice * (downPaymentPercent / 100);
    const loanAmount = purchasePrice - downPaymentAmount;
    const totalCashInvested = downPaymentAmount + closingCosts;

    const r = interestRate / 100 / 12;
    const n = loanTerm * 12;
    let monthlyMortgage = 0;
    if (loanAmount > 0 && n > 0) {
      if (r === 0) {
        monthlyMortgage = loanAmount / n;
      } else {
        monthlyMortgage = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      }
    }

    // 2. Monthly Expenses
    const monthlyTaxes = annualTaxes / 12;
    const monthlyVacancy = monthlyRent * (vacancyRate / 100);
    const totalMonthlyExpenses = monthlyMortgage + monthlyTaxes + monthlyInsurance + monthlyHOA + monthlyVacancy;

    // 3. Performance Metrics
    const monthlyCashFlow = monthlyRent - totalMonthlyExpenses;
    const annualNetOperatingIncome = (monthlyRent - monthlyTaxes - monthlyInsurance - monthlyHOA - monthlyVacancy) * 12;
    const capRate = (annualNetOperatingIncome / purchasePrice) * 100;
    const cashOnCash = ((monthlyCashFlow * 12) / totalCashInvested) * 100;
    const grm = purchasePrice / (monthlyRent * 12);

    setResult({
        monthlyMortgage: Math.round(monthlyMortgage),
        monthlyCashFlow: Math.round(monthlyCashFlow),
        totalCashInvested: Math.round(totalCashInvested),
        capRate: capRate.toFixed(2),
        cashOnCash: cashOnCash.toFixed(2),
        grm: grm.toFixed(2)
    });
  };

  return (
    <div className="container">
      <SEO 
        title="Real Estate Investment Calculator – Comprehensive ROI Tracker" 
        description="Analyze real estate property performance with ease. Calculate CAP rate, Cash-on-Cash Return, and Net Cash Flow instantly with our free investment tool." 
        path="/finance/real-estate-calculator"
      />
      
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8 px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-center">Real Estate Calculator</h1>
        <p className="text-muted mb-10 text-center max-width-2xl mx-auto">Is it a good deal? Use our comprehensive analytics tool to evaluate any rental property before you buy.</p>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Inputs Section */}
          <div className="space-y-6">
            <div className="card shadow-md border-2 border-primary-light">
              <h2 className="text-xl font-bold mb-6 text-primary flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm">1</span> 
                Purchase & Financing
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="input-group">
                  <label className="input-label">Purchase Price ($)</label>
                  <input type="number" className="input-field" value={purchasePrice} onChange={e => setPurchasePrice(Number(e.target.value))} />
                </div>
                <div className="input-group">
                  <label className="input-label">Down Pmt (%)</label>
                  <input type="number" className="input-field" value={downPaymentPercent} onChange={e => setDownPaymentPercent(Number(e.target.value))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="input-group">
                  <label className="input-label">Interest Rate (%)</label>
                  <input type="number" step="0.1" className="input-field" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} />
                </div>
                <div className="input-group">
                  <label className="input-label">Closing Costs ($)</label>
                  <input type="number" className="input-field" value={closingCosts} onChange={e => setClosingCosts(Number(e.target.value))} />
                </div>
              </div>
            </div>

            <div className="card shadow-md border-2 border-primary-light">
              <h2 className="text-xl font-bold mb-6 text-primary flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm">2</span> 
                Income & Expenses
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="input-group">
                  <label className="input-label">Monthly Rent ($)</label>
                  <input type="number" className="input-field border-primary" value={monthlyRent} onChange={e => setMonthlyRent(Number(e.target.value))} />
                </div>
                <div className="input-group">
                  <label className="input-label">Vacancy (%)</label>
                  <input type="number" className="input-field" value={vacancyRate} onChange={e => setVacancyRate(Number(e.target.value))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="input-group">
                  <label className="input-label">Annual Taxes ($)</label>
                  <input type="number" className="input-field" value={annualTaxes} onChange={e => setAnnualTaxes(Number(e.target.value))} />
                </div>
                <div className="input-group">
                  <label className="input-label">Monthly HOA ($)</label>
                  <input type="number" className="input-field" value={monthlyHOA} onChange={e => setMonthlyHOA(Number(e.target.value))} />
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div>
            <div className="card shadow-2xl bg-primary-dark text-white sticky top-24 p-8 border-none overflow-hidden min-h-[450px] flex flex-col justify-center relative">
              <div className="absolute bottom-[-10px] right-[-10px] pointer-events-none z-0" style={{ opacity: 0.03 }}>
                 <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/></svg>
              </div>
              
              <h2 className="text-xl font-bold mb-8 text-center uppercase tracking-widest opacity-80 relative z-10">Investment Analysis</h2>
              
              {result ? (
                <div className="space-y-8 relative z-10">
                  <div className="p-8 bg-white-10 rounded-2xl border-2 border-white-20 text-center shadow-inner">
                    <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-70">Monthly Net Cash Flow</p>
                    <p className={`text-6xl font-black ${result.monthlyCashFlow >= 0 ? 'text-success-light' : 'text-red-300'}`}>
                        ${result.monthlyCashFlow.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-white-5 rounded-2xl border border-white-10 text-center">
                      <p className="text-[10px] font-bold uppercase opacity-60 mb-2">CAP Rate</p>
                      <p className="text-2xl font-black text-primary-light">{result.capRate}%</p>
                    </div>
                    <div className="p-5 bg-white-5 rounded-2xl border border-white-10 text-center">
                      <p className="text-[10px] font-bold uppercase opacity-60 mb-2">Cash on Cash</p>
                      <p className="text-2xl font-black text-white">{result.cashOnCash}%</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm p-4 bg-white-5 rounded-xl">
                      <span className="opacity-70">Mortgage P&I</span>
                      <span className="font-bold">${result.monthlyMortgage.toLocaleString()}/mo</span>
                    </div>
                    <div className="flex justify-between items-center text-sm p-4 bg-white-5 rounded-xl">
                      <span className="opacity-70">Initial Cash Needed</span>
                      <span className="font-bold text-success-light">${result.totalCashInvested.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm p-4 bg-white-10 rounded-xl mt-4 border-t border-white-10 pt-4">
                      <span className="opacity-70 font-bold">Gross Rent Multiplier</span>
                      <span className="font-bold">{result.grm}</span>
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
                <h2 className="text-2xl font-bold mb-4">Key Real Estate Investment Metrics</h2>
                <p className="text-muted leading-relaxed">
                    Analyzing rental property involves looking beyond just the monthly rent. Professional investors focus on these high-CPC authority metrics:
                </p>
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                    <div className="p-6 bg-secondary rounded-xl">
                        <h3 className="font-bold text-primary mb-2">CAP Rate (Capitalization Rate)</h3>
                        <p className="text-sm text-muted">A measure of the unleveraged rate of return a property will generate. It compares the Net Operating Income (NOI) to the property's purchase price.</p>
                    </div>
                    <div className="p-6 bg-secondary rounded-xl">
                        <h3 className="font-bold text-primary mb-2">Cash-on-Cash Return</h3>
                        <p className="text-sm text-muted">This metric shows the yield on your actual out-of-pocket cash investment. It is the annual cash flow divided by the total initial cash invested (down payment + closing costs).</p>
                    </div>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
}
