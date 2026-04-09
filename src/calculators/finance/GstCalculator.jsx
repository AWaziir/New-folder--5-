import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

export default function GstCalculator() {
  const [amount, setAmount] = useState(100);
  const [gstRate, setGstRate] = useState(10); // Default for Australia
  const [type, setType] = useState('add'); // add or remove

  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateGst();
  }, [amount, gstRate, type]);

  const calculateGst = () => {
    let gstAmount, totalAmount, originalAmount;

    if (type === 'add') {
      gstAmount = amount * (gstRate / 100);
      totalAmount = amount + gstAmount;
      originalAmount = amount;
    } else {
      totalAmount = amount;
      originalAmount = amount / (1 + gstRate / 100);
      gstAmount = amount - originalAmount;
    }

    setResult({
      gst: gstAmount.toFixed(2),
      total: totalAmount.toFixed(2),
      original: originalAmount.toFixed(2),
      rate: gstRate
    });
  };

  return (
    <div className="container">
      <SEO 
        title="GST Calculator Australia - Free & Accurate GST Tool" 
        description="Calculate GST for Australia (10%), NZ (15%), and UK (20%). Fast, free GST inclusive and exclusive calculator for business and personal use." 
        path="/finance/gst-calculator"
      />
      
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">GST Calculator Australia – Free & Accurate</h1>
        <p className="text-muted mb-10 text-center max-width-2xl mx-auto">
            Quickly calculate GST (Goods and Services Tax) for any amount. Support for adding GST or calculating the amount from a GST-inclusive price.
        </p>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Inputs */}
          <div className="card shadow-lg border-2 border-primary-light">
            <h2 className="text-xl font-bold mb-6">GST Details</h2>
            
            <div className="flex bg-secondary p-1 rounded-lg mb-6">
                <button 
                    className={`flex-1 py-3 rounded-md font-bold transition ${type === 'add' ? 'bg-primary text-white shadow-md' : 'text-muted'}`}
                    onClick={() => setType('add')}
                >
                    Add GST
                </button>
                <button 
                    className={`flex-1 py-3 rounded-md font-bold transition ${type === 'remove' ? 'bg-primary text-white shadow-md' : 'text-muted'}`}
                    onClick={() => setType('remove')}
                >
                    GST Inclusive
                </button>
            </div>

            <div className="input-group">
              <label className="input-label">Amount ($)</label>
              <input type="number" className="input-field text-xl" value={amount} onChange={e => setAmount(Number(e.target.value))} />
            </div>

            <div className="input-group">
              <label className="input-label">GST Rate (%)</label>
              <div className="flex gap-2">
                 <input type="number" className="input-field" value={gstRate} onChange={e => setGstRate(Number(e.target.value))} />
                 <select className="input-field w-auto" onChange={e => setGstRate(Number(e.target.value))}>
                    <option value="">Custom</option>
                    <option value="10">AU (10%)</option>
                    <option value="15">NZ (15%)</option>
                    <option value="20">UK (20%)</option>
                 </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div>
            <div className="card highlight-border bg-primary-dark text-white sticky top-24 shadow-2xl">
              <h2 className="text-xl font-bold mb-8">Calculation Breakdown</h2>
              
              {result ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-white border-opacity-10 pb-4">
                    <span className="text-primary-light font-medium">Original Price (excl. GST)</span>
                    <span className="text-2xl font-bold">${result.original}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-white border-opacity-10 pb-4">
                    <span className="text-success font-medium">GST Amount ({result.rate}%)</span>
                    <span className="text-2xl font-bold text-success">+ ${result.gst}</span>
                  </div>

                  <div className="pt-4 text-center">
                    <p className="text-sm text-primary-light uppercase font-bold tracking-widest mb-1">Total Price (incl. GST)</p>
                    <p className="text-5xl font-black text-white">${result.total}</p>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-primary-light opacity-50">
                  Enter an amount to see results.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SEO CONTENT SECTION */}
        <section className="mt-16 space-y-12">
            <div className="card">
                <h2 className="text-2xl font-bold mb-4">What is the GST Calculator?</h2>
                <p className="text-muted leading-relaxed">
                    The GST Calculator is a free online tool designed to help business owners, freelancers, and consumers quickly determine the Goods and Services Tax (GST) for products and services. Whether you need to <strong>add GST</strong> to a net price or <strong>remove GST</strong> from a total price, our tool provides instant, accurate results for Australia, New Zealand, the United Kingdom, and more.
                </p>
            </div>

            <div className="card">
                <h2 className="text-2xl font-bold mb-4">How to Use the GST Calculator</h2>
                <ol className="list-decimal pl-6 space-y-4 text-muted">
                    <li>Select whether you want to <strong>Add GST</strong> (calculate tax ON an amount) or <strong>Remove GST</strong> (calculate tax INCLUDED in an amount).</li>
                    <li>Enter the net or gross amount in the "Amount" field.</li>
                    <li>Select the standard GST rate (10% for Australia) or enter a custom percentage.</li>
                    <li>The results will automatically update with the original price, GST amount, and total price.</li>
                </ol>
            </div>

            <div className="card">
                <h2 className="text-2xl font-bold mb-4">GST Calculation Formula</h2>
                <div className="grid md:grid-cols-2 gap-8 mt-6">
                    <div className="p-4 bg-secondary rounded-lg">
                        <h3 className="font-bold mb-2">To Add GST (10%):</h3>
                        <p className="font-mono text-primary text-sm">GST Amount = Original Price × 0.10</p>
                        <p className="font-mono text-primary text-sm mt-1">Total Price = Original Price + GST Amount</p>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                        <h3 className="font-bold mb-2">To Remove GST (10%):</h3>
                        <p className="font-mono text-primary text-sm">Original Price = Total Price / 1.10</p>
                        <p className="font-mono text-primary text-sm mt-1">GST Amount = Total Price - Original Price</p>
                    </div>
                </div>
            </div>

            <div className="card">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions (FAQ)</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold text-lg mb-2">How much tax do I pay in Australia?</h3>
                        <p className="text-muted">In Australia, the standard GST rate is 10% on most goods and services. Our calculator helps you find exactly how much of that total is tax.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">What is a GST inclusive price?</h3>
                        <p className="text-muted">A GST inclusive price means the tax is already included in the displayed total. To find the net price, you must divide the total by 1.1 (for 10% GST).</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">Is GST the same as VAT?</h3>
                        <p className="text-muted">Yes, GST (Goods and Services Tax) is very similar to VAT (Value Added Tax) used in the UK and Europe. Both are consumption taxes applied at each stage of the supply chain.</p>
                    </div>
                </div>
            </div>
        </section>

        <AdPlaceholder text="Bottom Content Ad" />
      </div>
    </div>
  );
}
