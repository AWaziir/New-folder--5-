import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function SalesTaxCalculator() {
  const [price, setPrice] = useState(100);
  const [taxRate, setTaxRate] = useState(8.5);
  const [quantity, setQuantity] = useState(1);
  const [mode, setMode] = useState('add'); // 'add' = price is pre-tax, 'remove' = price is post-tax
  const [result, setResult] = useState(null);

  useEffect(() => { calculate(); }, [price, taxRate, quantity, mode]);

  const calculate = () => {
    if (price <= 0 || taxRate < 0) return;
    const rate = taxRate / 100;
    let preTax, taxAmount, totalPrice;
    if (mode === 'add') {
      preTax = price;
      taxAmount = preTax * rate;
      totalPrice = preTax + taxAmount;
    } else {
      totalPrice = price;
      preTax = totalPrice / (1 + rate);
      taxAmount = totalPrice - preTax;
    }
    setResult({
      preTax: preTax.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
      totalTaxAll: (taxAmount * quantity).toFixed(2),
      grandTotal: (totalPrice * quantity).toFixed(2),
      perUnit: totalPrice.toFixed(2),
    });
  };

  const inputs = (
    <div className="space-y-6">
      <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '0.75rem', padding: '0.25rem' }}>
        {[{ k: 'add', l: 'Add Tax to Price' }, { k: 'remove', l: 'Remove Tax from Price' }].map(opt => (
          <button key={opt.k}
            style={{ flex: 1, padding: '0.6rem', borderRadius: '0.6rem', fontWeight: 700, fontSize: '0.8rem', transition: 'all 0.2s', background: mode === opt.k ? '#245da2' : 'transparent', color: mode === opt.k ? '#fff' : '#64748b' }}
            onClick={() => setMode(opt.k)}>{opt.l}</button>
        ))}
      </div>
      <div className="input-group">
        <label className="input-label">{mode === 'add' ? 'Pre-Tax Price ($)' : 'Total Price incl. Tax ($)'}</label>
        <input type="number" step="0.01" className="input-field text-xl font-black" value={price} onChange={e => setPrice(Number(e.target.value))} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="input-group">
          <label className="input-label">Sales Tax Rate (%)</label>
          <input type="number" step="0.01" className="input-field font-bold" value={taxRate} onChange={e => setTaxRate(Number(e.target.value))} />
        </div>
        <div className="input-group">
          <label className="input-label">Quantity</label>
          <input type="number" className="input-field font-bold" value={quantity} min="1" onChange={e => setQuantity(Number(e.target.value))} />
        </div>
      </div>
      <div style={{ background: '#f8fafc', borderRadius: '0.75rem', padding: '0.85rem', border: '1px solid #e2e8f0' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>Common US State Tax Rates</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {[{ s: 'CA', r: 7.25 }, { s: 'TX', r: 6.25 }, { s: 'NY', r: 4.0 }, { s: 'FL', r: 6.0 }, { s: 'WA', r: 6.5 }, { s: 'OR', r: 0 }].map(item => (
            <button key={item.s}
              style={{ padding: '0.2rem 0.6rem', borderRadius: '99px', fontSize: '0.65rem', fontWeight: 700, border: '1px solid #e2e8f0', background: taxRate === item.r ? '#245da2' : '#fff', color: taxRate === item.r ? '#fff' : '#475569', cursor: 'pointer' }}
              onClick={() => setTaxRate(item.r)}>{item.s} {item.r}%</button>
          ))}
        </div>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-4">
      {result ? (
        <>
          <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg,#245da215,#10b98110)', border: '1px solid #245da225', borderRadius: '1rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.5, marginBottom: '0.35rem' }}>{quantity > 1 ? 'Grand Total' : 'Total Price'}</p>
            <p style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a' }}>${quantity > 1 ? result.grandTotal : result.totalPrice}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Pre-Tax Price', val: `$${result.preTax}`, color: '#0f172a' },
              { label: 'Tax Amount', val: `+$${result.taxAmount}`, color: '#ef4444' },
              { label: 'Price per Unit', val: `$${result.perUnit}`, color: '#245da2' },
              { label: 'Total Tax (All Units)', val: `$${result.totalTaxAll}`, color: '#f59e0b' },
            ].map(item => (
              <div key={item.label} style={{ padding: '0.85rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <p style={{ fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '0.2rem' }}>{item.label}</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 900, color: item.color }}>{item.val}</p>
              </div>
            ))}
          </div>
        </>
      ) : <div className="py-12 italic opacity-40 text-center">Enter a price to calculate tax...</div>}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>Our <strong>Sales Tax Calculator</strong> works two ways: add tax to a pre-tax price to get the final total, or back-calculate the pre-tax price from a total that already includes tax. Enter a quantity to calculate the total for multiple items at once.</p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Add Tax Mode:</strong> Start with the item price (before tax), enter your local rate, and see the exact total you'll pay at checkout.</li>
        <li><strong>Remove Tax Mode:</strong> Know the total price but need to find the pre-tax amount? Enter the tax-inclusive total and extract the original price.</li>
        <li><strong>State + Local:</strong> Use the combined state + local rate. For example, Los Angeles combines California's 7.25% state rate with a 2.25% local rate for 9.5% total.</li>
      </ul>
    </div>
  );

  const formula = "Tax Amount = Pre-Tax Price × (Rate ÷ 100)   |   Pre-Tax = Total ÷ (1 + Rate)";

  const examples = [
    { title: "Shopping in California", description: "A $250 laptop in Los Angeles (9.5% combined tax) adds $23.75 in tax for a total of $273.75. Knowing this upfront prevents checkout surprises." },
    { title: "Business Expense Reporting", description: "If you paid $108.50 for a business lunch in an 8.5% tax state, the pre-tax amount is $100.00 and the tax was $8.50 — important for accurate expense reports." },
    { title: "Online Retail Tax", description: "Since the 2018 South Dakota v. Wayfair ruling, most online retailers now collect sales tax based on the buyer's state — even when buying from out-of-state sellers." }
  ];

  const faqs = [
    { q: "Which states have no sales tax?", a: "Oregon, Montana, New Hampshire, Delaware, and Alaska have no statewide sales tax. However, some Alaska localities do impose local sales taxes." },
    { q: "Is sales tax the same everywhere in a state?", a: "No. Most states allow counties and cities to add local sales taxes on top of the state rate. Always use the combined rate for your specific location." },
    { q: "Are groceries and medicine taxed?", a: "Many states exempt groceries and prescription medications from sales tax. Rules vary significantly by state." },
    { q: "Do I have to pay tax when shopping online?", a: "Yes — since the 2018 Supreme Court ruling, online retailers are required to collect sales tax in states where they have 'economic nexus' (typically 200+ transactions or $100,000+ in sales)." }
  ];

  const whyUse = [
    { title: "No Checkout Surprises", text: "Know your exact total before you reach the register by calculating tax upfront." },
    { title: "Business Accounting", text: "Back-calculate pre-tax prices from tax-inclusive totals for accurate expense reporting and bookkeeping." },
    { title: "Multi-Item Orders", text: "Calculate the total tax and price for bulk orders with the built-in quantity multiplier." },
    { title: "Rate Quick-Select", text: "Common US state tax rates are one click away — perfect for frequent travelers." }
  ];

  const keyFeatures = [
    { title: "Two Calculation Modes", text: "Add tax to a pre-tax price, or remove tax from a tax-inclusive total with a single toggle." },
    { title: "Quick State Rates", text: "Tap common state rates (CA, TX, NY, FL, WA, OR) to instantly apply without manual entry." },
    { title: "Quantity Multiplier", text: "Calculate total tax and grand total for multiple units in a single calculation." }
  ];

  const proTips = [
    "Always use the combined state + local tax rate, not just the state rate — local additions can add 2–3% more.",
    "If you're a business collecting sales tax, you must remit it to the state — it's not revenue, it's a liability.",
    "Tax-exempt items vary by state: clothing is exempt in Pennsylvania but taxed in California.",
    "Keep receipts for large tax-exempt purchases (business equipment, resale items) — you may need them for audits.",
    "If you travel frequently, bookmark the rates for states you visit most — CA (7.25%), TX (6.25%), NY (4% base + local)."
  ];

  const relatedTools = [
    { name: "GST Calculator", path: "/finance/gst-calculator" },
    { name: "VAT Calculator", path: "/finance/vat-calculator" },
    { name: "Discount Calculator", path: "/finance/discount-calculator" },
    { name: "Profit & Loss Calculator", path: "/finance/profit-loss" }
  ];

  return (
    <CalculatorLayout
      title="Sales Tax Calculator"
      seoTitle="Sales Tax Calculator — Add or Remove Tax Instantly (2024)"
      description="Calculate sales tax instantly. Add tax to a pre-tax price or back-calculate the pre-tax amount from a tax-inclusive total. Covers all US state tax rates."
      path="/finance/sales-tax-calculator"
      icon={ShoppingCart}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
      whyUse={whyUse}
      keyFeatures={keyFeatures}
      proTips={proTips}
      relatedTools={relatedTools}
    />
  );
}
