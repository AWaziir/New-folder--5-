import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState(50);
  const [tipPercentage, setTipPercentage] = useState(15);
  const [peopleCount, setPeopleCount] = useState(1);
  
  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateTip();
  }, [billAmount, tipPercentage, peopleCount]);

  const calculateTip = () => {
    if (billAmount <= 0 || peopleCount <= 0) return;

    const totalTip = billAmount * (tipPercentage / 100);
    const totalBill = billAmount + totalTip;
    const tipPerPerson = totalTip / peopleCount;
    const totalPerPerson = totalBill / peopleCount;

    setResult({
      tip: totalTip.toFixed(2),
      total: totalBill.toFixed(2),
      tipPerPerson: tipPerPerson.toFixed(2),
      totalPerPerson: totalPerPerson.toFixed(2)
    });
  };

  return (
    <div className="container">
      <SEO 
        title="Tip Calculator – Free & Accurate Split Bill Tool" 
        description="Quickly calculate tips and split bills with friends. Fast, free and easy to use tip calculator for any restaurant or service." 
        path="/other/tip-calculator"
      />
      
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Fast & Simple Tip Calculator – Split Your Bill Easily</h1>
        <p className="text-muted mb-10 text-center max-width-2xl mx-auto">
            Quickly calculate the tip and total bill amount. Whether you're dining alone or with a group, our tool makes splitting the bill instant and stress-free.
        </p>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Inputs */}
          <div className="card shadow-lg border-2 border-primary-light">
            <h2 className="text-xl font-bold mb-6">Bill Details</h2>
            
            <div className="input-group">
              <label className="input-label">Bill Amount ($)</label>
              <input type="number" className="input-field text-xl" value={billAmount} onChange={e => setBillAmount(Number(e.target.value))} />
            </div>

            <div className="input-group">
              <label className="input-label">Tip Percentage (%)</label>
              <div className="flex gap-2">
                  <input type="number" className="input-field" value={tipPercentage} onChange={e => setTipPercentage(Number(e.target.value))} />
                  <div className="flex gap-1 flex-wrap">
                      {[15, 18, 20, 25].map(pct => (
                          <button 
                            key={pct}
                            className={`px-3 py-1 text-xs font-bold rounded transition ${tipPercentage === pct ? 'bg-primary text-white' : 'bg-secondary text-primary hover:bg-primary-light hover:text-white'}`}
                            onClick={() => setTipPercentage(pct)}
                          >
                            {pct}%
                          </button>
                      ))}
                  </div>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Number of People</label>
              <input type="number" className="input-field" value={peopleCount} onChange={e => setPeopleCount(Math.max(1, Number(e.target.value)))} />
            </div>
          </div>

          {/* Results */}
          <div>
            <div className="card shadow-2xl highlight-border bg-white sticky top-24">
              <h2 className="text-xl font-bold mb-8">Split Bill Result</h2>
              
              {result ? (
                <div className="space-y-6">
                  <div className="p-6 bg-primary text-white rounded-xl text-center shadow-lg">
                    <p className="text-xs uppercase font-bold tracking-widest opacity-80 mb-1">Total Per Person</p>
                    <p className="text-5xl font-black">${result.totalPerPerson}</p>
                    <p className="text-sm opacity-60 mt-1">incl. ${result.tipPerPerson} tip</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-secondary rounded-lg text-center">
                        <p className="text-xs uppercase font-bold text-muted mb-1">Total Tip</p>
                        <p className="text-xl font-bold text-primary">${result.tip}</p>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg text-center">
                        <p className="text-xs uppercase font-bold text-muted mb-1">Total Bill</p>
                        <p className="text-xl font-bold text-primary">${result.total}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center opacity-40">
                  Enter bill amount.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SEO CONTENT SECTION */}
        <section className="mt-16 space-y-12">
            <div className="card">
                <h2 className="text-2xl font-bold mb-4">What is the Tip Calculator?</h2>
                <p className="text-muted leading-relaxed">
                    Our free Tip Calculator is a fast and simple tool designed to help you calculate the correct tip and split the bill among any number of people. Whether you're at a restaurant, a cafe, or using a delivery service, our tool makes it easy to ensure you're providing a fair gratuity while staying on top of your budget.
                </p>
            </div>

            <div className="card">
                <h2 className="text-2xl font-bold mb-4">How to Calculate Tip Manually</h2>
                <p className="text-muted leading-relaxed">
                    If you're not using our tool, the standard formula for calculating a tip is to take the total bill amount and multiply it by the tip percentage (as a decimal). For example, a 15% tip on a $100 bill is $100 × 0.15 = $15.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="p-4 bg-secondary rounded-lg text-center font-mono text-sm text-primary">
                        Tip = Bill × (Percentage / 100)
                    </div>
                    <div className="p-4 bg-secondary rounded-lg text-center font-mono text-sm text-primary">
                        Total = Bill + Tip
                    </div>
                </div>
            </div>

            <div className="card">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold text-lg mb-1">What is a standard tip?</h3>
                        <p className="text-muted">In the US, 15–20% is considered a standard tip for good service at restaurants. However, tipping culture varies widely by country and service type.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-1">Does the tip include tax?</h3>
                        <p className="text-muted">Most people calculate the tip based on the subtotal (the bill before tax), but it's also common to tip on the final total. Our tool works with whatever amount you enter!</p>
                    </div>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
}
