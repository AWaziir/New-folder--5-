import React, { useState, useEffect } from 'react';
import { Scale } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

const UNITS = {
  kilogram:   { label: 'Kilograms (kg)',    factor: 1 },
  gram:       { label: 'Grams (g)',         factor: 0.001 },
  milligram:  { label: 'Milligrams (mg)',   factor: 0.000001 },
  pound:      { label: 'Pounds (lbs)',      factor: 0.453592 },
  ounce:      { label: 'Ounces (oz)',       factor: 0.0283495 },
  stone:      { label: 'Stone (st)',        factor: 6.35029 },
  tonne:      { label: 'Metric Tonnes (t)', factor: 1000 },
  ustons:     { label: 'US Tons (short)',   factor: 907.185 },
};

export default function WeightConverter() {
  const [value, setValue] = useState(1);
  const [fromUnit, setFromUnit] = useState('kilogram');
  const [toUnit, setToUnit] = useState('pound');
  const [result, setResult] = useState(0);

  useEffect(() => {
    setResult((value * UNITS[fromUnit].factor) / UNITS[toUnit].factor);
  }, [value, fromUnit, toUnit]);

  const swap = () => { setFromUnit(toUnit); setToUnit(fromUnit); };
  const fmt = (n) => n < 0.001 ? n.toExponential(4) : parseFloat(n.toPrecision(8)).toString();

  const multiConv = Object.entries(UNITS).map(([key, u]) => ({
    key, label: u.label,
    val: fmt((value * UNITS[fromUnit].factor) / u.factor)
  })).filter(x => x.key !== fromUnit);

  const inputs = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Value to Convert</label>
        <input type="number" className="input-field text-2xl font-black" value={value} onChange={e => setValue(Number(e.target.value))} />
      </div>
      <div className="input-group">
        <label className="input-label">From Unit</label>
        <select className="input-field font-bold" value={fromUnit} onChange={e => setFromUnit(e.target.value)}>
          {Object.entries(UNITS).map(([k, u]) => <option key={k} value={k}>{u.label}</option>)}
        </select>
      </div>
      <button onClick={swap} style={{ width: '100%', padding: '0.75rem', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '0.75rem', fontWeight: 700, fontSize: '0.85rem', color: '#475569', cursor: 'pointer' }}>⇅ Swap Units</button>
      <div className="input-group">
        <label className="input-label">To Unit</label>
        <select className="input-field font-bold" value={toUnit} onChange={e => setToUnit(e.target.value)}>
          {Object.entries(UNITS).map(([k, u]) => <option key={k} value={k}>{u.label}</option>)}
        </select>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-5">
      <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg,#245da215,#10b98110)', border: '1px solid #245da225', borderRadius: '1rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.5, marginBottom: '0.35rem' }}>Result</p>
        <p style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a' }}>{fmt(result)}</p>
        <p style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{UNITS[toUnit].label}</p>
      </div>
      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#475569', textAlign: 'center' }}>
        {value} {UNITS[fromUnit].label} = {fmt(result)} {UNITS[toUnit].label}
      </div>
      <div style={{ background: '#f8fafc', borderRadius: '1rem', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #e2e8f0' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569' }}>All Conversions for {value} {UNITS[fromUnit].label}</p>
        </div>
        {multiConv.map(({ key, label, val }) => (
          <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 1rem', borderBottom: '1px solid #f1f5f9' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{label}</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a' }}>{val}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>Our <strong>Weight Converter</strong> covers 8 units across metric and imperial systems — from milligrams to metric tonnes. Whether you're tracking your body weight, shipping packages, measuring ingredients, or doing scientific conversions, get instant, accurate results with a full multi-unit reference table.</p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Metric:</strong> Milligrams, grams, kilograms, and metric tonnes are all based on powers of 1,000.</li>
        <li><strong>Imperial/US:</strong> Ounces, pounds, stone (UK), and US short tons follow a non-decimal hierarchy.</li>
        <li><strong>Body Weight:</strong> In the UK and Ireland, body weight is often measured in stone and pounds. 1 stone = 14 pounds.</li>
      </ul>
    </div>
  );

  const formula = "Result = Input × (From Unit in kg) ÷ (To Unit in kg)";

  const examples = [
    { title: "Body Weight Conversion", description: "A 75 kg person weighs 165.35 lbs, or 11 stone 11.3 lbs. UK doctors and gyms often record weight in stone, making this conversion essential." },
    { title: "Baking Ingredients", description: "US recipes use cups and ounces; most international recipes use grams. 8 oz of flour ≈ 226.8g — critical for precision baking and pastry." },
    { title: "International Shipping", description: "Shipping rates are often calculated per kilogram internationally. 50 lbs of cargo = 22.68 kg, which may put you into a different pricing tier." }
  ];

  const faqs = [
    { q: "How many pounds in a kilogram?", a: "1 kilogram = 2.20462 pounds. Conversely, 1 pound = 0.453592 kg." },
    { q: "What is a stone (weight)?", a: "A stone is a British unit of weight equal to 14 pounds or 6.35029 kilograms. It's commonly used in the UK and Ireland for body weight but rarely elsewhere." },
    { q: "Metric tonne vs US ton?", a: "A metric tonne = 1,000 kg = 2,204.6 lbs. A US short ton = 2,000 lbs = 907.185 kg. A UK long ton = 2,240 lbs = 1,016 kg. Always specify which ton you mean in commercial contexts!" },
    { q: "What is the difference between weight and mass?", a: "Technically, mass (measured in kilograms) is constant; weight is the gravitational force on that mass and varies by location. On the Moon, your mass is the same but your weight is 1/6. In everyday usage, the terms are used interchangeably." }
  ];

  const whyUse = [
    { title: "International Shopping", text: "Convert clothing and shipping weights between kg and lbs when shopping from international retailers." },
    { title: "Health & Fitness", text: "Switch between pounds, kilograms, and stone for body weight tracking across different apps and scales." },
    { title: "Cooking & Recipes", text: "Convert ingredient weights from ounces to grams and back for precise baking and cooking." },
    { title: "Science & Education", text: "Convert between milligrams, grams, and kilograms for lab measurements, homework, and exams." }
  ];

  const keyFeatures = [
    { title: "8 Weight Units", text: "Covers mg, g, kg, metric tonne, oz, lbs, stone, and US short ton in one tool." },
    { title: "Full Reference Table", text: "See your input converted into all supported units at once — perfect for quick multi-unit comparison." },
    { title: "Instant Swap", text: "Reverse any conversion in one click with the built-in swap button." }
  ];

  const proTips = [
    "Quick mental trick: kg to lbs, multiply by 2.2. Lbs to kg, divide by 2.2 (or multiply by 0.454).",
    "1 stone = 14 lbs. To convert stone to kg: multiply stone by 6.35. E.g., 11 stone = 69.85 kg.",
    "For cooking, 1 cup of water weighs ~240ml ≈ 240g, but other ingredients vary significantly by density.",
    "Postal services often switch between kg and lbs for international shipping — always check which system your carrier uses.",
    "For nutrition labels, pay attention to serving size in grams — most food databases use grams as the base unit."
  ];

  const relatedTools = [
    { name: "Length Converter", path: "/conversion/length-converter" },
    { name: "Temperature Converter", path: "/conversion/temperature-converter" },
    { name: "BMI Calculator", path: "/health/bmi-calculator" },
    { name: "Ideal Weight Calculator", path: "/health/ideal-weight" }
  ];

  return (
    <CalculatorLayout
      title="Weight Converter"
      seoTitle="Weight Converter — kg to lbs, Stone, Grams, Tonnes & More"
      description="Convert weight between kg, lbs, grams, ounces, stone, milligrams, metric tonnes, and US tons. Instant metric and imperial weight conversion with full reference table."
      path="/conversion/weight-converter"
      icon={Scale}
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
