import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

export default function AutoLeaseCalculator() {
  const [msrp, setMsrp] = useState(35000);
  const [negotiatedPrice, setNegotiatedPrice] = useState(32000);
  const [downPayment, setDownPayment] = useState(3000);
  const [tradeIn, setTradeIn] = useState(0);
  const [leaseTerm, setLeaseTerm] = useState(36);
  const [moneyFactor, setMoneyFactor] = useState(0.0025); // ~6% APR
  const [residualPercent, setResidualPercent] = useState(60);
  const [salesTax, setSalesTax] = useState(7);

  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateLease();
  }, [msrp, negotiatedPrice, downPayment, tradeIn, leaseTerm, moneyFactor, residualPercent, salesTax]);

  const calculateLease = () => {
    const residualValue = msrp * (residualPercent / 100);
    const capitalizedCost = negotiatedPrice - downPayment - tradeIn;
    
    if (capitalizedCost < residualValue) {
        setResult({ error: 'Capitalized cost cannot be less than residual value.' });
        return;
    }

    // 1. Depreciation Fee = (Cap Cost - Residual) / Term
    const depreciationFee = (capitalizedCost - residualValue) / leaseTerm;
    
    // 2. Finance Fee (Money Factor) = (Cap Cost + Residual) * MF
    const financeFee = (capitalizedCost + residualValue) * moneyFactor;
    
    const monthlyBeforeTax = depreciationFee + financeFee;
    const taxAmount = monthlyBeforeTax * (salesTax / 100);
    const totalMonthly = monthlyBeforeTax + taxAmount;

    setResult({
        monthlyPayment: Math.round(totalMonthly),
        depreciation: Math.round(depreciationFee),
        finance: Math.round(financeFee),
        tax: Math.round(taxAmount),
        totalCost: Math.round(totalMonthly * leaseTerm + downPayment + tradeIn),
        residual: Math.round(residualValue)
    });
  };

  return (
    <div className="container">
      <SEO 
        title="Auto Lease Calculator – Accurate Car Lease Estimator" 
        description="Estimate your monthly car lease payments with precision. Includes MSRP, money factor, residual value, and sales tax calculations." 
        path="/finance/auto-lease-calculator"
      />
      
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8 px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-center text-primary">Auto Lease Calculator</h1>
        <p className="text-muted mb-10 text-center max-width-2xl mx-auto">Found the perfect car? Use our professional-grade estimator to calculate your exact monthly lease commitment.</p>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Inputs */}
          <div className="card shadow-lg border-2 border-primary-light">
            <h2 className="text-xl font-bold mb-6">Lease Details</h2>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="input-group">
                    <label className="input-label">MSRP ($)</label>
                    <input type="number" className="input-field" value={msrp} onChange={e => setMsrp(Number(e.target.value))} />
                </div>
                <div className="input-group">
                    <label className="input-label">Sale Price ($)</label>
                    <input type="number" className="input-field border-primary" value={negotiatedPrice} onChange={e => setNegotiatedPrice(Number(e.target.value))} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="input-group">
                    <label className="input-label">Down Payment ($)</label>
                    <input type="number" className="input-field" value={downPayment} onChange={e => setDownPayment(Number(e.target.value))} />
                </div>
                <div className="input-group">
                    <label className="input-label">Trade-In ($)</label>
                    <input type="number" className="input-field" value={tradeIn} onChange={e => setTradeIn(Number(e.target.value))} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="input-group">
                    <label className="input-label">Term (Months)</label>
                    <input type="number" className="input-field" value={leaseTerm} onChange={e => setLeaseTerm(Number(e.target.value))} />
                </div>
                <div className="input-group">
                    <label className="input-label">Money Factor</label>
                    <input type="number" step="0.0001" className="input-field" value={moneyFactor} onChange={e => setMoneyFactor(Number(e.target.value))} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="input-group">
                    <label className="input-label">Residual Value (%)</label>
                    <input type="number" className="input-field" value={residualPercent} onChange={e => setResidualPercent(Number(e.target.value))} />
                </div>
                <div className="input-group">
                    <label className="input-label">Sales Tax (%)</label>
                    <input type="number" className="input-field" value={salesTax} onChange={e => setSalesTax(Number(e.target.value))} />
                </div>
            </div>
          </div>

          {/* Results */}
          <div>
            <div className="card shadow-2xl bg-primary-dark text-white sticky top-24 shadow-xl p-8 border-none">
              <h2 className="text-xl font-bold mb-8 text-center uppercase tracking-widest opacity-80">Monthly Lease Payment</h2>
              
              {result && !result.error ? (
                <div className="space-y-8">
                  <div className="p-8 bg-white-10 rounded-2xl border-2 border-white border-opacity-20 text-center shadow-inner">
                    <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-70">Total Per Month</p>
                    <p className="text-6xl font-black text-white">${result.monthlyPayment.toLocaleString()}</p>
                    <p className="text-xs opacity-50 mt-2">${result.tax.toLocaleString()} included for sales tax</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm p-4 bg-white-5 rounded-lg">
                      <span className="opacity-70">Depreciation Fee</span>
                      <span className="font-bold">${result.depreciation.toLocaleString()}/mo</span>
                    </div>
                    <div className="flex justify-between items-center text-sm p-4 bg-white-5 rounded-lg">
                      <span className="opacity-70">Finance Fee</span>
                      <span className="font-bold text-primary-light">${result.finance.toLocaleString()}/mo</span>
                    </div>
                    <div className="flex justify-between items-center text-sm p-4 bg-white-5 rounded-lg border-t border-white border-opacity-10 pt-4 mt-4">
                      <span className="opacity-70">Residual Value</span>
                      <span className="font-bold">${result.residual.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm p-4 bg-white-5 rounded-lg">
                      <span className="opacity-70">Total Cost of Lease</span>
                      <span className="font-bold text-success-light">${result.totalCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ) : result?.error ? (
                <div className="py-20 text-red-100 font-bold leading-relaxed text-center">{result.error}</div>
              ) : (
                <div className="py-20 opacity-40 text-center">Calculating...</div>
              )}
            </div>
          </div>
        </div>

        <section className="mt-16 space-y-12">
            <div className="card">
                <h2 className="text-2xl font-bold mb-4">How is an Auto Lease Calculated?</h2>
                <p className="text-muted leading-relaxed">
                    Automotive leasing is slightly more complex than a standard car loan. Your monthly payment is composed of two primary parts: **Depreciation** and the **Finance Fee (Money Factor)**.
                </p>
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                    <div className="p-5 bg-secondary rounded-xl">
                        <h3 className="font-bold text-primary mb-2">Depreciation Fee</h3>
                        <p className="text-sm text-muted">This part covers the loss of value of the car during your lease term. It is calculated by taking the (Capitalized Cost - Residual Value) and dividing it by the number of months.</p>
                    </div>
                    <div className="p-5 bg-secondary rounded-xl">
                        <h3 className="font-bold text-primary mb-2">Money Factor</h3>
                        <p className="text-sm text-muted">The money factor is similar to an interest rate. Multiply the money factor by 2,400 to estimate the equivalent annual percentage rate (APR).</p>
                    </div>
                </div>
            </div>

            <div className="card">
                <h2 className="text-2xl font-bold mb-6">Common Leasing Terms</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold text-lg mb-1">MSRP</h3>
                        <p className="text-muted text-sm">Manufacturer’s Suggested Retail Price. This is the "sticker price" of the car before any negotiations.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-1">Residual Value</h3>
                        <p className="text-muted text-sm">The projected value of the car at the end of the lease. This is set by the leasing company and is a key factor in your payment.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-1">Cap Cost Reduction</h3>
                        <p className="text-muted text-sm">This is your down payment or trade-in value, which reduces the total amount being leased.</p>
                    </div>
                </div>
            </div>

            <div className="card">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold text-lg mb-1">Should I put money down on a lease?</h3>
                        <p className="text-muted text-sm">Generally, financial experts suggest putting as little money down as possible on a lease. Since you don't own the vehicle, a large down payment only reduces the monthly payment but doesn't build equity.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-1">What is a good residual value?</h3>
                        <p className="text-muted text-sm">A higher residual value is better for the lessee because it means you are only paying for the depreciation of a smaller portion of the car's price.</p>
                    </div>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
}
