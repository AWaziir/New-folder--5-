import React, { useState, useEffect } from 'react';
import { Square } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

const UNITS = {
  sqm:    { label: 'Square Meters (m²)',     toSqm: 1 },
  sqkm:   { label: 'Square Kilometers (km²)',toSqm: 1e6 },
  sqcm:   { label: 'Square Centimeters (cm²)',toSqm: 0.0001 },
  sqft:   { label: 'Square Feet (ft²)',       toSqm: 0.092903 },
  sqin:   { label: 'Square Inches (in²)',     toSqm: 0.00064516 },
  sqyd:   { label: 'Square Yards (yd²)',      toSqm: 0.836127 },
  sqmi:   { label: 'Square Miles (mi²)',      toSqm: 2.59e6 },
  acre:   { label: 'Acres (ac)',              toSqm: 4046.86 },
  hectare:{ label: 'Hectares (ha)',           toSqm: 10000 },
};

export default function AreaConverter() {
  const [value, setValue] = useState(1);
  const [fromUnit, setFromUnit] = useState('acre');
  const [toUnit, setToUnit] = useState('sqm');
  const [result, setResult] = useState(0);

  useEffect(() => {
    const inSqm = value * UNITS[fromUnit].toSqm;
    setResult(inSqm / UNITS[toUnit].toSqm);
  }, [value, fromUnit, toUnit]);

  const swap = () => { setFromUnit(toUnit); setToUnit(fromUnit); };
  const fmt = n => n < 0.0001 ? n.toExponential(4) : parseFloat(n.toPrecision(7)).toString();

  const multiConv = Object.entries(UNITS).map(([key, u]) => ({
    key, label: u.label,
    val: fmt((value * UNITS[fromUnit].toSqm) / u.toSqm)
  })).filter(x => x.key !== fromUnit);

  const inputs = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Area Value</label>
        <input type="number" step="any" className="input-field text-2xl font-black" value={value} onChange={e => setValue(Number(e.target.value))} />
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
        <p style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', wordBreak: 'break-all' }}>{fmt(result)}</p>
        <p style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{UNITS[toUnit].label}</p>
      </div>
      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#475569', textAlign: 'center' }}>
        {value} {UNITS[fromUnit].label} = {fmt(result)} {UNITS[toUnit].label}
      </div>
      <div style={{ background: '#f8fafc', borderRadius: '1rem', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #e2e8f0' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569' }}>All Area Conversions</p>
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
      <p>Our <strong>Area Converter</strong> handles 9 units covering everyday real estate, agriculture, construction, and scientific measurement. Convert between square meters, square feet, acres, hectares, square kilometers, square miles, and more — instantly.</p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Real Estate:</strong> In the US, property is measured in square feet and acres. Most of the world uses square meters and hectares.</li>
        <li><strong>Agriculture:</strong> Farms are measured in acres (US/UK) or hectares (international). 1 hectare = 2.471 acres.</li>
        <li><strong>Land Area:</strong> Large regions are measured in square kilometers (km²) or square miles (mi²). 1 km² = 0.386 mi².</li>
      </ul>
    </div>
  );

  const formula = "Area in target = Area in source × (source in m²) ÷ (target in m²)";

  const examples = [
    { title: "House Size Comparison", description: "A 2,000 sq ft US home equals 185.8 m². In Europe, this would be considered a generous-sized apartment. Knowing both helps when comparing international property listings." },
    { title: "Farm Acreage", description: "A 100-hectare farm equals 247 acres — roughly the size of 100 standard American football fields. Globally, most agricultural land is reported in hectares." },
    { title: "Country Size", description: "Vatican City (0.44 km²) = 108.7 acres = 44 hectares. Australia (7.7 million km²) = 1.9 billion acres — context that the all-conversions table makes instantly understandable." }
  ];

  const faqs = [
    { q: "How many square feet are in an acre?", a: "1 acre = 43,560 square feet. An acre is approximately the size of a football field (without end zones). It's the most common unit for measuring land in the US." },
    { q: "What is the difference between a hectare and an acre?", a: "1 hectare = 10,000 m² = 2.471 acres. Hectares are the metric standard for land area. Many real estate markets outside the US report land in hectares." },
    { q: "How do I convert square meters to square feet?", a: "Multiply square meters by 10.7639. Or divide square feet by 10.7639 to get square meters. A useful approximation: 1 m² ≈ 10.76 ft²." },
    { q: "What is a square mile?", a: "1 square mile = 640 acres = 2.59 km² = 258.999 hectares. It's used for large geographic areas, particularly in the US and UK." }
  ];

  const whyUse = [
    { title: "Real Estate & Property", text: "Convert property sizes between square feet and square meters when comparing international listings." },
    { title: "Construction & Flooring", text: "Calculate material quantities that may be listed in different area units than your project measurements." },
    { title: "Agriculture & Land", text: "Switch between acres and hectares for international farming, land surveying, and agricultural data." },
    { title: "Geographic Comparisons", text: "Convert countries, parks, or regions between km² and square miles for meaningful size comparisons." }
  ];

  const keyFeatures = [
    { title: "9 Area Units", text: "Covers m², km², cm², ft², in², yd², mi², acres, and hectares in one comprehensive tool." },
    { title: "Full Reference Table", text: "See your area converted into all 9 units simultaneously — perfect for real estate and agriculture work." },
    { title: "Instant Swap", text: "Reverse any conversion in one click without re-entering values." }
  ];

  const proTips = [
    "Quick conversion: 1 m² ≈ 10.76 ft². For rooms, multiply width × length in meters to get m², then × 10.76 for ft².",
    "For land buying: 1 acre ≈ 4047 m² ≈ 0.4 hectares. A half-acre residential lot ≈ 2023 m².",
    "Flooring and tiling: always add 10–15% to your area calculation for cuts and waste.",
    "1 square kilometer = 100 hectares = 247 acres — useful for comparing national parks and geographic regions.",
    "Paint coverage is usually stated in m² per litre or ft² per gallon. Convert your room area accordingly."
  ];

  const relatedTools = [
    { name: "Length Converter", path: "/conversion/length-converter" },
    { name: "Weight Converter", path: "/conversion/weight-converter" },
    { name: "Speed Converter", path: "/conversion/speed-converter" },
    { name: "Data Storage Converter", path: "/conversion/data-storage-converter" }
  ];

  return (
    <CalculatorLayout
      title="Area Converter"
      seoTitle="Area Converter — Square Feet, Acres, Hectares, m², km² & More"
      description="Convert area between square meters, square feet, acres, hectares, square kilometers, square miles, and more. Essential for real estate, agriculture, and construction."
      path="/conversion/area-converter"
      icon={Square}
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
