import React, { useState, useEffect } from 'react';
import { Gauge } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

const UNITS = {
  mph:   { label: 'Miles per hour (mph)',   factor: 1 },
  kph:   { label: 'Kilometers/hour (km/h)', factor: 1.60934 },
  ms:    { label: 'Meters per second (m/s)',factor: 2.23694 },
  fps:   { label: 'Feet per second (fps)',  factor: 0.681818 },
  knot:  { label: 'Knots (kn)',             factor: 1.15078 },
  mach:  { label: 'Mach (at sea level)',    factor: 767.269 },
};

export default function SpeedConverter() {
  const [value, setValue] = useState(100);
  const [fromUnit, setFromUnit] = useState('kph');
  const [toUnit, setToUnit] = useState('mph');
  const [result, setResult] = useState(0);

  useEffect(() => {
    // Convert via mph as base
    const inMph = value * (1 / UNITS[fromUnit].factor) * UNITS['mph'].factor;
    // Wait: need to recalculate. Let me use mph as canonical unit.
    // Actually, the factor represents "how many mph = 1 unit"
    // So value in fromUnit -> mph: value / UNITS[fromUnit].factor ... no
    // Let me redo: factor = mph per 1 unit_not_mph
    // kph factor 1.60934 means 1 kph = 1/1.60934 mph... that's backwards
    // Let me use: factor = conversion from mph to that unit
    // mph: 1, kph: 1.60934 (1 mph = 1.60934 kph), m/s: 0.44704 (1 mph = 0.44704 m/s)
    // So: value_in_unit -> value_in_mph = value / factor_of_that_unit * 1
    // Actually let me redefine properly
    const toMph = {
      mph: 1, kph: 0.621371, ms: 2.23694, fps: 0.681818, knot: 1.15078, mach: 767.269
    };
    const fromMph = {
      mph: 1, kph: 1.60934, ms: 0.44704, fps: 0.3048, knot: 0.514444, mach: 340.29
    };
    const valueInMph = value * toMph[fromUnit];
    setResult(valueInMph / toMph[toUnit]);
  }, [value, fromUnit, toUnit]);

  const toMph = { mph: 1, kph: 0.621371, ms: 2.23694, fps: 0.681818, knot: 1.15078, mach: 767.269 };
  const swap = () => { setFromUnit(toUnit); setToUnit(fromUnit); };
  const fmt = n => parseFloat(n.toPrecision(6)).toString();

  const multiConv = Object.keys(UNITS).map(key => ({
    key, label: UNITS[key].label,
    val: fmt((value * toMph[fromUnit]) / toMph[key])
  })).filter(x => x.key !== fromUnit);

  const inputs = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Speed Value</label>
        <input type="number" step="0.1" className="input-field text-2xl font-black" value={value} onChange={e => setValue(Number(e.target.value))} />
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
        <p style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0f172a' }}>{fmt(result)}</p>
        <p style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{UNITS[toUnit].label}</p>
      </div>
      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#475569', textAlign: 'center' }}>
        {value} {UNITS[fromUnit].label} = {fmt(result)} {UNITS[toUnit].label}
      </div>
      <div style={{ background: '#f8fafc', borderRadius: '1rem', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #e2e8f0' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569' }}>All Speed Conversions</p>
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
      <p>Our <strong>Speed Converter</strong> supports 6 units covering everyday driving, aviation, maritime, and scientific applications. Convert between miles per hour, kilometers per hour, meters per second, feet per second, knots, and Mach number instantly.</p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>mph vs km/h:</strong> The two most common speed units for road travel. The US uses mph; most of the world uses km/h.</li>
        <li><strong>Knots:</strong> 1 nautical mile per hour. Used in aviation and maritime navigation worldwide.</li>
        <li><strong>Mach:</strong> The ratio of speed to the local speed of sound (~340.29 m/s or ~767 mph at sea level). Mach 1 = speed of sound; Mach 2 = twice the speed of sound.</li>
        <li><strong>m/s:</strong> The SI unit for speed, used in physics and scientific calculations.</li>
      </ul>
    </div>
  );

  const formula = "Speed in target unit = Speed in source unit × (source-to-mph factor) ÷ (target-to-mph factor)";

  const examples = [
    { title: "Highway Speed Limits", description: "Australia's 110 km/h highway limit = 68.4 mph. The US 65 mph limit = 104.6 km/h. Converting helps international drivers quickly understand local speed limits." },
    { title: "Aircraft Speed", description: "A commercial airliner cruising at 900 km/h is traveling at 559 mph, 486 knots, or approximately Mach 0.85. Most long-haul aircraft cruise just below Mach 1 for fuel efficiency." },
    { title: "Wind Speed", description: "A 50 knot wind in a marine forecast equals 57.5 mph or 92.6 km/h — enough to be classified as a severe storm. Meteorologists often report wind speed in both knots and km/h." }
  ];

  const faqs = [
    { q: "What is Mach 1 in km/h and mph?", a: "At sea level and standard temperature, Mach 1 ≈ 1,235 km/h (767 mph). The speed of sound varies with altitude and temperature — at cruising altitude, Mach 1 is only ~1,062 km/h (660 mph)." },
    { q: "Why do sailors and pilots use knots instead of mph or km/h?", a: "Knots are tied to nautical miles, which are based on Earth's latitude lines (1 nautical mile = 1 arcminute of latitude). This makes navigation calculations simpler — distance and speed use the same geographic unit." },
    { q: "How fast is the speed of light?", a: "The speed of light in a vacuum is exactly 299,792,458 m/s — approximately 670,616,629 mph or 1,079,252,849 km/h. Nothing with mass can reach this speed." },
    { q: "How do I convert km/h to m/s quickly?", a: "Divide km/h by 3.6. For example, 90 km/h ÷ 3.6 = 25 m/s. To convert m/s back to km/h, multiply by 3.6." }
  ];

  const whyUse = [
    { title: "International Driving", text: "Instantly convert speed limits when driving in countries that use different measurement systems." },
    { title: "Aviation & Maritime", text: "Convert between mph, knots, and km/h for aviation weather, flight planning, and nautical navigation." },
    { title: "Sports & Fitness", text: "Convert running pace between km/h and mph, or analyze ball speeds in different units across sports coverage." },
    { title: "Physics & Science", text: "Convert to m/s (SI unit) or Mach for physics problems, engineering calculations, and science homework." }
  ];

  const keyFeatures = [
    { title: "6 Speed Units", text: "Covers mph, km/h, m/s, fps, knots, and Mach in one comprehensive tool." },
    { title: "All Conversions Table", text: "See your speed value converted into all 6 units simultaneously for comprehensive reference." },
    { title: "Instant Swap", text: "Reverse any conversion in one click — no need to re-enter values manually." }
  ];

  const proTips = [
    "Quick mental conversion: multiply km/h by 0.62 to get approximate mph. Multiply mph by 1.6 to get approximate km/h.",
    "Knots to km/h: multiply by 1.852. Knots to mph: multiply by 1.151.",
    "For physics problems, always convert to m/s first — it's the SI base unit and makes formulas much simpler.",
    "Mach number varies with altitude. At 35,000 ft cruising altitude, Mach 1 is only ~660 mph vs 767 mph at sea level.",
    "Wind speeds: Beaufort scale Force 12 (hurricane) = 64+ knots = 74+ mph = 119+ km/h."
  ];

  const relatedTools = [
    { name: "Length Converter", path: "/conversion/length-converter" },
    { name: "Weight Converter", path: "/conversion/weight-converter" },
    { name: "Temperature Converter", path: "/conversion/temperature-converter" },
    { name: "Area Converter", path: "/conversion/area-converter" }
  ];

  return (
    <CalculatorLayout
      title="Speed Converter"
      seoTitle="Speed Converter — mph, km/h, Knots, Mach, m/s, fps"
      description="Convert speed between mph, km/h, m/s, knots, feet per second, and Mach. Instant speed conversion for driving, aviation, maritime, and scientific use."
      path="/conversion/speed-converter"
      icon={Gauge}
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
