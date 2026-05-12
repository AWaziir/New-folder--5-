import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

const VAT_RATES = [
  { country: 'UK', rate: 20 }, { country: 'Germany', rate: 19 },
  { country: 'France', rate: 20 }, { country: 'Australia (GST)', rate: 10 },
  { country: 'Canada (HST)', rate: 13 }, { country: 'India (GST)', rate: 18 },
  { country: 'EU Average', rate: 21 },
];

export default function VatCalculator() {
  const [amount, setAmount] = useState(1000);
  const [vatRate, setVatRate] = useState(20);
  const [mode, setMode] = useState('add'); // add tax vs remove tax
  const [result, setResult] = useState(null);

  useEffect(() => { calculate(); }, [amount, vatRate, mode]);

  const calculate = () => {
    if (amount <= 0 || vatRate < 0) return;
    const rate = vatRate / 100;
    let net, vatAmount, gross;
    if (mode === 'add') {
      net = amount;
      vatAmount = net * rate;
      gross = net + vatAmount;
    } else {
      gross = amount;
      net = gross / (1 + rate);
      vatAmount = gross - net;
    }
    setResult({
      net: net.toFixed(2),
      vatAmount: vatAmount.toFixed(2),
      gross: gross.toFixed(2),
      vatPercOfGross: ((vatAmount / gross) * 100).toFixed(1),
    });
  };

  const inputs = (
    <div className="space-y-6">
      <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '0.75rem', padding: '0.25rem' }}>
        {[{ k: 'add', l: 'Add VAT' }, { k: 'remove', l: 'Remove VAT' }].map(opt => (
          <button key={opt.k}
            style={{ flex: 1, padding: '0.65rem', borderRadius: '0.6rem', fontWeight: 700, fontSize: '0.85rem', transition: 'all 0.2s', background: mode === opt.k ? '#245da2' : 'transparent', color: mode === opt.k ? '#fff' : '#64748b' }}
            onClick={() => setMode(opt.k)}>{opt.l}</button>
        ))}
      </div>
      <div className="input-group">
        <label className="input-label">{mode === 'add' ? 'Net Amount (Excl. VAT)' : 'Gross Amount (Incl. VAT)'}</label>
        <input type="number" step="0.01" className="input-field text-xl font-black" value={amount} onChange={e => setAmount(Number(e.target.value))} />
      </div>
      <div className="input-group">
        <label className="input-label">VAT / GST Rate (%)</label>
        <input type="number" step="0.1" className="input-field font-bold" value={vatRate} onChange={e => setVatRate(Number(e.target.value))} />
      </div>
      <div style={{ background: '#f8fafc', borderRadius: '0.75rem', padding: '0.85rem', border: '1px solid #e2e8f0' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>Quick Select by Country</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {VAT_RATES.map(v => (
            <button key={v.country}
              style={{ padding: '0.2rem 0.6rem', borderRadius: '99px', fontSize: '0.65rem', fontWeight: 700, border: '1px solid #e2e8f0', background: vatRate === v.rate ? '#245da2' : '#fff', color: vatRate === v.rate ? '#fff' : '#475569', cursor: 'pointer' }}
              onClick={() => setVatRate(v.rate)}>{v.country} {v.rate}%</button>
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
            <p style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.5, marginBottom: '0.35rem' }}>Gross (VAT Inclusive)</p>
            <p style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a' }}>${Number(result.gross).toLocaleString()}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Net (Excl. VAT)', val: `$${Number(result.net).toLocaleString()}`, color: '#10b981' },
              { label: 'VAT Amount', val: `+$${Number(result.vatAmount).toLocaleString()}`, color: '#ef4444' },
              { label: 'VAT Rate Applied', val: `${vatRate}%`, color: '#245da2' },
              { label: 'VAT % of Gross', val: `${result.vatPercOfGross}%`, color: '#8b5cf6' },
            ].map(item => (
              <div key={item.label} style={{ padding: '0.85rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <p style={{ fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '0.2rem' }}>{item.label}</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 900, color: item.color }}>{item.val}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', height: '12px', borderRadius: '99px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            <div style={{ width: `${(Number(result.net) / Number(result.gross)) * 100}%`, background: '#10b981', transition: 'width 0.4s' }} title="Net" />
            <div style={{ flex: 1, background: '#ef4444' }} title="VAT" />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ fontSize: '0.65rem', color: '#10b981', fontWeight: 700 }}>● Net Amount</span>
            <span style={{ fontSize: '0.65rem', color: '#ef4444', fontWeight: 700 }}>● VAT Portion</span>
          </div>
        </>
      ) : <div className="py-12 italic opacity-40 text-center">Enter an amount to calculate VAT...</div>}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p><strong>Value Added Tax (VAT)</strong> is a consumption tax applied at each stage of the supply chain. Our calculator handles both directions: add VAT to a net price to get the consumer-facing gross price, or remove VAT from a gross price to recover the original net amount — essential for business accounting and invoice reconciliation.</p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Add VAT:</strong> Enter the net (ex-VAT) price. The calculator adds the VAT and shows the gross price a customer pays.</li>
        <li><strong>Remove VAT:</strong> Enter the gross (VAT-inclusive) price and extract the net amount — crucial for accurate bookkeeping.</li>
        <li><strong>Rates vary widely:</strong> EU VAT ranges from 17% (Luxembourg) to 27% (Hungary). Australia's GST is 10%, Canada's HST varies by province (5–15%), and the UK charges 20%.</li>
      </ul>
    </div>
  );

  const formula = "VAT Amount = Net × Rate   |   Net = Gross ÷ (1 + Rate)   |   Gross = Net × (1 + Rate)";

  const examples = [
    { title: "UK Business Invoice", description: "A UK consultant invoices £5,000 net for services. At 20% VAT: the VAT amount is £1,000, and the gross invoice total is £6,000. The client pays £6,000 but can reclaim the £1,000 VAT if VAT-registered." },
    { title: "Removing GST (Australia)", description: "A receipt shows AUD $1,100 for a business laptop. Removing 10% GST: Net = $1,100 ÷ 1.1 = $1,000. GST = $100. The business can claim the $100 GST credit on their BAS." },
    { title: "EU Cross-Border Sales", description: "From 2021, EU sellers selling goods to consumers in other EU countries must charge VAT at the buyer's country rate via the OSS (One Stop Shop) scheme." }
  ];

  const faqs = [
    { q: "What's the difference between VAT and sales tax?", a: "Sales tax (US) is collected only at the final point of sale. VAT is collected at every stage of production — but each business in the chain can reclaim the VAT it paid, so only the end consumer ultimately bears the cost." },
    { q: "Can businesses reclaim VAT?", a: "Yes. VAT-registered businesses can reclaim the VAT they pay on business purchases (input VAT) against the VAT they collect from customers (output VAT). Only the net difference is paid to or reclaimed from the tax authority." },
    { q: "Do I need to charge VAT?", a: "In the UK and EU, you must register for VAT once your taxable turnover exceeds the threshold (£85,000 in the UK for 2024). In Australia, GST registration is required when your turnover exceeds AUD $75,000." },
    { q: "Is VAT the same as GST?", a: "They are essentially the same concept with different names. 'GST' (Goods and Services Tax) is used in Australia, Canada, New Zealand, Singapore, and India. 'VAT' is used in the UK and most of Europe." }
  ];

  const whyUse = [
    { title: "Invoice Calculations", text: "Quickly calculate gross invoices from net rates, or extract net amounts from VAT-inclusive totals." },
    { title: "International Business", text: "Handle VAT for UK, EU, Australia, Canada, and India with quick-select country rates." },
    { title: "Bookkeeping & BAS/VAT Returns", text: "Accurately separate VAT from gross amounts for quarterly tax return submissions." },
    { title: "Price Verification", text: "Verify that the VAT amount on a supplier invoice is mathematically correct." }
  ];

  const keyFeatures = [
    { title: "Add & Remove VAT", text: "Toggle between adding VAT to a net price or removing VAT from a gross price — handles both business scenarios." },
    { title: "Global Rate Quick-Select", text: "One-click rates for UK (20%), Germany (19%), Australia (10%), Canada (13%), France (20%), and more." },
    { title: "Visual Split Bar", text: "A color-coded bar instantly shows the proportion of net vs VAT in the total gross price." }
  ];

  const proTips = [
    "When removing VAT from a gross figure, always divide by (1 + rate) — never subtract the percentage directly, as this gives the wrong answer.",
    "If you're VAT-registered, keeping your input and output VAT records accurate is essential for quarterly filings.",
    "Zero-rated (0% VAT) and exempt items are different: zero-rated businesses can still reclaim input VAT; exempt businesses cannot.",
    "For EU businesses: from 2021, the OSS/IOSS scheme lets you report all EU cross-border B2C VAT in one single quarterly return.",
    "Australia's GST has a broad base — most goods and services are taxable at 10%, with food staples and medical supplies being key exemptions."
  ];

  const relatedTools = [
    { name: "GST Calculator", path: "/finance/gst-calculator" },
    { name: "Sales Tax Calculator", path: "/finance/sales-tax-calculator" },
    { name: "Discount Calculator", path: "/finance/discount-calculator" },
    { name: "Profit & Loss Calculator", path: "/finance/profit-loss" }
  ];

  return (
    <CalculatorLayout
      title="VAT Calculator"
      seoTitle="VAT Calculator — Add or Remove Value Added Tax (UK, EU, AU, CA)"
      description="Calculate VAT instantly. Add VAT to a net price or remove VAT from a gross total. Supports UK (20%), EU, Australian GST (10%), Canadian HST, and more."
      path="/finance/vat-calculator"
      icon={Globe}
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
