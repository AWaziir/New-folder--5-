import React, { useState, useEffect } from 'react';
import { Ruler } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

const UNITS = {
  meter:      { label: 'Meters (m)',       factor: 1 },
  kilometer:  { label: 'Kilometers (km)',  factor: 1000 },
  centimeter: { label: 'Centimeters (cm)', factor: 0.01 },
  millimeter: { label: 'Millimeters (mm)', factor: 0.001 },
  inch:       { label: 'Inches (in)',      factor: 0.0254 },
  foot:       { label: 'Feet (ft)',        factor: 0.3048 },
  yard:       { label: 'Yards (yd)',       factor: 0.9144 },
  mile:       { label: 'Miles (mi)',       factor: 1609.344 },
  nautical:   { label: 'Nautical Miles',  factor: 1852 },
};

export default function LengthConverter() {
  const [value, setValue] = useState(1);
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('foot');
  const [result, setResult] = useState(0);

  useEffect(() => {
    const inMeters = value * UNITS[fromUnit].factor;
    setResult(inMeters / UNITS[toUnit].factor);
  }, [value, fromUnit, toUnit]);

  const swap = () => { setFromUnit(toUnit); setToUnit(fromUnit); };
  const fmt = (n) => n < 0.001 ? n.toExponential(4) : parseFloat(n.toPrecision(8)).toString();

  const multiConversion = Object.entries(UNITS).map(([key, u]) => ({
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
      <button onClick={swap} style={{ width: '100%', padding: '0.75rem', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '0.75rem', fontWeight: 700, fontSize: '0.85rem', color: '#475569', cursor: 'pointer', transition: 'all 0.2s' }}
        onMouseEnter={e => e.target.style.background = '#e2e8f0'} onMouseLeave={e => e.target.style.background = '#f1f5f9'}>
        ⇅ Swap Units
      </button>
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
          <p style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569' }}>All Conversions for {value} {UNITS[fromUnit].label}</p>
        </div>
        {multiConversion.map(({ key, label, val }) => (
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
      <p>Our <strong>Length Converter</strong> supports 9 units across both imperial and metric systems — from millimeters to miles. Convert any length instantly with real-time results and see all unit conversions simultaneously in the reference table below the main result.</p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Metric System:</strong> Used by most of the world. Base unit is the meter. Prefixes (kilo, centi, milli) indicate powers of 10.</li>
        <li><strong>Imperial System:</strong> Used primarily in the US, UK (partially), and Myanmar. Includes inches, feet, yards, and miles.</li>
        <li><strong>Swap Button:</strong> Instantly reverse the conversion direction — no need to re-select units manually.</li>
      </ul>
    </div>
  );

  const formula = "Result = Input × (From Unit in Meters) ÷ (To Unit in Meters)";

  const examples = [
    { title: "Marathon Distance", description: "A marathon is 26.2 miles. Converting to kilometers: 26.2 × 1.60934 = 42.195 km — the globally recognized marathon distance." },
    { title: "Room Measurements", description: "A room measured at 12 feet × 10 feet converts to 3.658 m × 3.048 m = 11.15 m² — essential when buying metric-sized flooring." },
    { title: "Screen Size", description: "A 65-inch TV diagonal = 165.1 cm = 1.651 m. Knowing metric equivalents helps when checking furniture and room clearance." }
  ];

  const faqs = [
    { q: "How many feet are in a meter?", a: "1 meter = 3.28084 feet, or approximately 3 feet 3.37 inches. Conversely, 1 foot = 0.3048 meters." },
    { q: "What is a nautical mile?", a: "A nautical mile (1,852 m) is based on the circumference of the Earth — one nautical mile equals one arcminute of latitude. It's used in aviation and maritime navigation." },
    { q: "Why does the US still use imperial measurements?", a: "Primarily historical inertia. The US came close to metrication in the 1970s but the Metric Conversion Act of 1975 made it voluntary. Most scientific and medical fields in the US already use the metric system." },
    { q: "What's the difference between a UK and a US mile?", a: "There is no difference — both the UK and US use the international mile of exactly 1,609.344 meters. However, the UK also uses the nautical mile in some contexts." }
  ];

  const whyUse = [
    { title: "Travel & Navigation", text: "Convert between miles and kilometers for road trips across countries with different measurement systems." },
    { title: "Construction & DIY", text: "Switch between feet/inches and centimeters/meters when reading plans or buying materials internationally." },
    { title: "Sports & Fitness", text: "Convert running distances between km and miles, or track heights in both metric and imperial." },
    { title: "Education", text: "Instantly verify unit conversion calculations for school, exams, or science projects." }
  ];

  const keyFeatures = [
    { title: "9 Length Units", text: "Covers mm, cm, m, km, inch, foot, yard, mile, and nautical mile in one calculator." },
    { title: "All Conversions Table", text: "See your value converted into every supported unit simultaneously — great for quick reference." },
    { title: "Instant Swap", text: "Reverse the conversion direction instantly with the swap button — no re-selection needed." }
  ];

  const proTips = [
    "For quick mental conversions: 1 foot ≈ 30cm, 1 inch ≈ 2.54cm, 1 mile ≈ 1.6km, 1 km ≈ 0.62 miles.",
    "When buying international fabric or carpet, always convert measurements — a 'meter' vs 'yard' error can mean a 10% shortage.",
    "1 nautical mile per hour = 1 knot. Ships and planes still use knots, making nautical miles critical for navigation.",
    "The metric system is base-10, making conversions straightforward: 1m = 100cm = 1,000mm = 0.001km.",
    "For astronomy: 1 light-year ≈ 9.461 × 10^15 meters. Our calculator handles extremely small and large numbers via scientific notation."
  ];

  const relatedTools = [
    { name: "Weight Converter", path: "/conversion/weight-converter" },
    { name: "Temperature Converter", path: "/conversion/temperature-converter" },
    { name: "Speed Converter", path: "/conversion/speed-converter" },
    { name: "Area Converter", path: "/conversion/area-converter" }
  ];

  return (
    <CalculatorLayout
      title="Length Converter"
      seoTitle="Length Converter — Meters, Feet, Inches, Miles, KM & More"
      description="Convert lengths instantly between metric and imperial units. Supports meters, kilometers, centimeters, millimeters, inches, feet, yards, miles, and nautical miles."
      path="/conversion/length-converter"
      icon={Ruler}
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
