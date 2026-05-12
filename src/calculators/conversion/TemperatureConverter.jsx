import React, { useState, useEffect } from 'react';
import { Thermometer } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

const UNITS = ['Celsius', 'Fahrenheit', 'Kelvin', 'Rankine'];

function convert(value, from, to) {
  let celsius;
  if (from === 'Celsius') celsius = value;
  else if (from === 'Fahrenheit') celsius = (value - 32) * 5 / 9;
  else if (from === 'Kelvin') celsius = value - 273.15;
  else if (from === 'Rankine') celsius = (value - 491.67) * 5 / 9;

  if (to === 'Celsius') return celsius;
  if (to === 'Fahrenheit') return celsius * 9 / 5 + 32;
  if (to === 'Kelvin') return celsius + 273.15;
  if (to === 'Rankine') return (celsius + 273.15) * 9 / 5;
}

const REFERENCE_POINTS = [
  { label: 'Absolute Zero', C: -273.15, F: -459.67, K: 0, R: 0 },
  { label: 'Water Freezes', C: 0, F: 32, K: 273.15, R: 491.67 },
  { label: 'Room Temperature', C: 22, F: 71.6, K: 295.15, R: 531.27 },
  { label: 'Body Temperature', C: 37, F: 98.6, K: 310.15, R: 558.27 },
  { label: 'Water Boils', C: 100, F: 212, K: 373.15, R: 671.67 },
];

export default function TemperatureConverter() {
  const [value, setValue] = useState(100);
  const [fromUnit, setFromUnit] = useState('Celsius');
  const [toUnit, setToUnit] = useState('Fahrenheit');
  const [result, setResult] = useState(0);

  useEffect(() => { setResult(convert(value, fromUnit, toUnit)); }, [value, fromUnit, toUnit]);

  const swap = () => { setFromUnit(toUnit); setToUnit(fromUnit); };
  const fmt = (n) => parseFloat(n.toFixed(4)).toString();
  const allResults = UNITS.map(u => ({ unit: u, val: fmt(convert(value, fromUnit, u)) }));

  const inputs = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Temperature Value</label>
        <input type="number" step="0.1" className="input-field text-2xl font-black" value={value} onChange={e => setValue(Number(e.target.value))} />
      </div>
      <div className="input-group">
        <label className="input-label">From Scale</label>
        <select className="input-field font-bold" value={fromUnit} onChange={e => setFromUnit(e.target.value)}>
          {UNITS.map(u => <option key={u} value={u}>{u} ({u === 'Celsius' ? '°C' : u === 'Fahrenheit' ? '°F' : u === 'Kelvin' ? 'K' : '°R'})</option>)}
        </select>
      </div>
      <button onClick={swap} style={{ width: '100%', padding: '0.75rem', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '0.75rem', fontWeight: 700, fontSize: '0.85rem', color: '#475569', cursor: 'pointer' }}>⇅ Swap Scales</button>
      <div className="input-group">
        <label className="input-label">To Scale</label>
        <select className="input-field font-bold" value={toUnit} onChange={e => setToUnit(e.target.value)}>
          {UNITS.map(u => <option key={u} value={u}>{u} ({u === 'Celsius' ? '°C' : u === 'Fahrenheit' ? '°F' : u === 'Kelvin' ? 'K' : '°R'})</option>)}
        </select>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-5">
      <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg,#245da215,#10b98110)', border: '1px solid #245da225', borderRadius: '1rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.5, marginBottom: '0.35rem' }}>Result</p>
        <p style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a' }}>{fmt(result)}°</p>
        <p style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{toUnit}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {allResults.map(({ unit, val }) => (
          <div key={unit} style={{ padding: '0.85rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', opacity: 0.5, marginBottom: '0.2rem' }}>{unit}</p>
            <p style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a' }}>{val}°</p>
          </div>
        ))}
      </div>
      <div style={{ background: '#f8fafc', borderRadius: '1rem', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #e2e8f0' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569' }}>Key Reference Points</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 0 }}>
          {['Point', '°C', '°F', 'K', '°R'].map(h => (
            <div key={h} style={{ padding: '0.4rem 0.6rem', fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', color: '#475569', background: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>{h}</div>
          ))}
          {REFERENCE_POINTS.map(pt => (
            <React.Fragment key={pt.label}>
              <div style={{ padding: '0.5rem 0.6rem', fontSize: '0.7rem', fontWeight: 700, color: '#334155', borderBottom: '1px solid #f1f5f9' }}>{pt.label}</div>
              {[pt.C, pt.F, pt.K, pt.R].map((v, i) => (
                <div key={i} style={{ padding: '0.5rem 0.6rem', fontSize: '0.7rem', fontWeight: 600, color: '#64748b', borderBottom: '1px solid #f1f5f9', textAlign: 'right' }}>{v}</div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>Our <strong>Temperature Converter</strong> supports all four major temperature scales — Celsius, Fahrenheit, Kelvin, and Rankine. It includes a built-in reference table of key temperature milestones like the freezing and boiling points of water, body temperature, and absolute zero.</p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Celsius (°C):</strong> The global standard, used by most countries. Water freezes at 0°C and boils at 100°C at sea level.</li>
        <li><strong>Fahrenheit (°F):</strong> Used in the United States. Water freezes at 32°F and boils at 212°F.</li>
        <li><strong>Kelvin (K):</strong> The SI base unit of temperature. Used in science and engineering. 0K = absolute zero (no degree symbol used).</li>
        <li><strong>Rankine (°R):</strong> Like Kelvin but using Fahrenheit-sized degrees. Used in some US engineering applications.</li>
      </ul>
    </div>
  );

  const formula = "°F = (°C × 9/5) + 32   |   K = °C + 273.15   |   °C = (°F − 32) × 5/9";

  const examples = [
    { title: "Weather Forecasting", description: "A 30°C summer day in Australia equals 86°F for American visitors. A 10°F winter day in New York is -12.2°C — well below freezing." },
    { title: "Cooking Conversions", description: "A recipe at 350°F is 177°C (Gas Mark 4 in UK ovens). Baking at 180°C = 356°F ≈ 350°F for most practical purposes." },
    { title: "Scientific Absolute Zero", description: "Absolute zero (0 K = -273.15°C = -459.67°F) is the theoretical temperature at which all molecular motion stops. Nothing can be colder." }
  ];

  const faqs = [
    { q: "At what temperature do Celsius and Fahrenheit intersect?", a: "Celsius and Fahrenheit are equal at exactly -40°. Both scales read -40 at that point — a useful fact for temperature range comparisons." },
    { q: "Why does the US use Fahrenheit?", a: "Fahrenheit was standardized in the early 1700s in Europe, and the US adopted it before the metric system became the global norm. The US remains one of only three countries that use Fahrenheit officially." },
    { q: "Why does Kelvin have no degree symbol?", a: "By SI convention, Kelvin is an absolute thermodynamic temperature unit and is not measured in 'degrees'. The temperature is simply stated as '273.15 K', not '273.15°K'." },
    { q: "What is room temperature in Kelvin?", a: "Standard room temperature (22°C / 71.6°F) = 295.15 K. In scientific work, 298 K (25°C) is commonly used as 'standard temperature'." }
  ];

  const whyUse = [
    { title: "International Travel", text: "Instantly convert weather forecasts between Celsius and Fahrenheit when traveling between the US and other countries." },
    { title: "Cooking & Baking", text: "Convert oven temperatures between Fahrenheit (US recipes) and Celsius (European/Australian recipes) with precision." },
    { title: "Science & Engineering", text: "Convert to Kelvin for thermodynamic calculations, or Rankine for US-based engineering standards." },
    { title: "Quick Reference", text: "Built-in reference table of key temperature points saves time during study, cooking, or professional work." }
  ];

  const keyFeatures = [
    { title: "4 Temperature Scales", text: "Supports Celsius, Fahrenheit, Kelvin, and Rankine — covering everyday and scientific needs." },
    { title: "Reference Table", text: "Built-in table of key reference points (absolute zero, freezing, boiling, body temp) for instant context." },
    { title: "All-Scale Display", text: "See your input temperature converted into all 4 scales simultaneously." }
  ];

  const proTips = [
    "Quick Celsius to Fahrenheit estimate: double the Celsius value and add 30 (e.g., 20°C ≈ 70°F). Not exact but fast for weather.",
    "For baking: 180°C = 350°F is the most common conversion. 200°C = 400°F for higher-heat cooking.",
    "Human body temperature varies: 37°C (98.6°F) is the textbook average, but normal ranges from 36.1°C–37.2°C (97°F–99°F).",
    "When setting scientific experiments, use Kelvin to avoid negative temperatures — all Kelvin values are positive or zero.",
    "Meat thermometer readings: Beef medium (63°C/145°F), Pork well-done (71°C/160°F), Chicken (74°C/165°F)."
  ];

  const relatedTools = [
    { name: "Length Converter", path: "/conversion/length-converter" },
    { name: "Weight Converter", path: "/conversion/weight-converter" },
    { name: "Speed Converter", path: "/conversion/speed-converter" },
    { name: "Area Converter", path: "/conversion/area-converter" }
  ];

  return (
    <CalculatorLayout
      title="Temperature Converter"
      seoTitle="Temperature Converter — Celsius, Fahrenheit, Kelvin, Rankine"
      description="Convert temperatures instantly between Celsius, Fahrenheit, Kelvin, and Rankine. Includes a reference table of key temperature milestones."
      path="/conversion/temperature-converter"
      icon={Thermometer}
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
