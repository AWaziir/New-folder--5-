import React, { useState, useEffect } from 'react';
import { HardDrive } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

const UNITS = {
  bit:  { label: 'Bits (b)',          toBytes: 0.125 },
  byte: { label: 'Bytes (B)',         toBytes: 1 },
  kb:   { label: 'Kilobytes (KB)',    toBytes: 1024 },
  mb:   { label: 'Megabytes (MB)',    toBytes: 1048576 },
  gb:   { label: 'Gigabytes (GB)',    toBytes: 1073741824 },
  tb:   { label: 'Terabytes (TB)',    toBytes: 1099511627776 },
  pb:   { label: 'Petabytes (PB)',    toBytes: 1.126e15 },
  kbit: { label: 'Kilobits (Kb)',     toBytes: 125 },
  mbit: { label: 'Megabits (Mb)',     toBytes: 125000 },
  gbit: { label: 'Gigabits (Gb)',     toBytes: 125000000 },
};

export default function DataStorageConverter() {
  const [value, setValue] = useState(1);
  const [fromUnit, setFromUnit] = useState('gb');
  const [toUnit, setToUnit] = useState('mb');
  const [result, setResult] = useState(0);

  useEffect(() => {
    const inBytes = value * UNITS[fromUnit].toBytes;
    setResult(inBytes / UNITS[toUnit].toBytes);
  }, [value, fromUnit, toUnit]);

  const swap = () => { setFromUnit(toUnit); setToUnit(fromUnit); };
  const fmt = n => n < 0.0001 ? n.toExponential(4) : parseFloat(n.toPrecision(8)).toString();

  const mainUnits = ['byte', 'kb', 'mb', 'gb', 'tb'];
  const multiConv = mainUnits.map(key => ({
    key, label: UNITS[key].label,
    val: fmt((value * UNITS[fromUnit].toBytes) / UNITS[key].toBytes)
  })).filter(x => x.key !== fromUnit);

  const inputs = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Data Size Value</label>
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
      <div style={{ background: '#f8fafc', borderRadius: '0.75rem', padding: '0.85rem', border: '1px solid #e2e8f0' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>Quick Reference</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {[{ l: '1 Photo', gb: 0.004 }, { l: '1 Song (MP3)', gb: 0.004 }, { l: '1 HD Movie', gb: 4 }, { l: '1 Game', gb: 50 }].map(ref => (
            <button key={ref.l}
              style={{ padding: '0.2rem 0.6rem', borderRadius: '99px', fontSize: '0.65rem', fontWeight: 700, border: '1px solid #e2e8f0', background: '#fff', color: '#475569', cursor: 'pointer' }}
              onClick={() => { setValue(ref.gb); setFromUnit('gb'); }}>📁 {ref.l} (~{ref.gb < 0.01 ? ref.gb * 1000 + 'MB' : ref.gb + 'GB'})</button>
          ))}
        </div>
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
          <p style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569' }}>Common Unit Reference</p>
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
      <p>Our <strong>Data Storage Converter</strong> covers 10 units from bits to petabytes, including both storage units (bytes, KB, MB, GB, TB) and transmission rate units (kilobits, megabits, gigabits). It uses binary (base-2) conversion (1 KB = 1,024 bytes), matching how computers actually measure storage.</p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Bits vs Bytes:</strong> 8 bits = 1 byte. Internet speeds are measured in Megabits (Mb/s), while file sizes use Megabytes (MB). A 100 Mb/s internet connection transfers 12.5 MB per second.</li>
        <li><strong>Binary vs Decimal:</strong> This calculator uses binary prefixes (1 KB = 1,024 bytes) — how operating systems measure storage. Hard drive manufacturers use decimal (1 KB = 1,000 bytes), which is why a "1TB" drive shows as ~931 GB in Windows.</li>
        <li><strong>Real-World Scale:</strong> 1 GB ≈ 250 photos, 200 songs, or a 2-hour SD video. 1 TB ≈ 250,000 photos or 500 hours of HD video.</li>
      </ul>
    </div>
  );

  const formula = "Result = Input × (Source unit in bytes) ÷ (Target unit in bytes)   [1 KB = 1,024 bytes]";

  const examples = [
    { title: "Internet Speed vs File Size", description: "With a 100 Mb/s (megabits per second) internet connection, you download at 12.5 MB/s (megabytes). A 4GB movie takes approximately 320 seconds (5.3 minutes) to download." },
    { title: "Phone Storage Planning", description: "A 256 GB smartphone: 4K video uses ~375 MB/min, so you can record approximately 683 minutes (11.4 hours) of 4K footage. At typical JPEG quality, the same storage holds ~64,000 photos." },
    { title: "Cloud Storage Tiers", description: "Google One's 100 GB tier vs 2 TB tier: 100 GB holds ~25,000 photos. 2 TB = 2,048 GB = 500,000 photos — helping you decide the right storage tier for your needs." }
  ];

  const faqs = [
    { q: "Why does my 1 TB hard drive show as 931 GB?", a: "Hard drive manufacturers use decimal (1 TB = 1,000,000,000,000 bytes). Operating systems use binary (1 TB = 1,099,511,627,776 bytes). The difference (~7.4%) is why physical drives appear smaller than advertised." },
    { q: "What is the difference between Mb and MB?", a: "Capital 'B' = Bytes. Lowercase 'b' = bits. 1 MB = 8 Mb. Internet speeds (e.g., 100 Mb/s) use Megabits. File sizes (e.g., 5 MB photo) use Megabytes. This distinction is critical for understanding download times." },
    { q: "How big is a Petabyte?", a: "1 Petabyte = 1,024 TB = 1,048,576 GB. It would take about 4,000 iPhones with 256 GB each to hold 1 PB. Major tech companies store data in Petabytes and Exabytes." },
    { q: "What is a Gigabit Internet connection?", a: "Gigabit internet = 1,000 Mb/s = 125 MB/s. A 4K movie (30 GB) downloads in ~240 seconds (4 minutes). Practical speeds are often 60–80% of the advertised peak." }
  ];

  const whyUse = [
    { title: "Download Time Estimates", text: "Convert internet speeds (Mb/s) to file transfer rates (MB/s) to calculate how long downloads will take." },
    { title: "Storage Planning", text: "Understand how many photos, videos, or songs fit in a given amount of storage before buying a device or plan." },
    { title: "Cloud & Server Work", text: "Convert between bits and bytes for network configuration, cloud storage pricing, and data transfer calculations." },
    { title: "Tech Comparisons", text: "Compare storage tiers, USB speeds, and SSD capacities across different unit systems." }
  ];

  const keyFeatures = [
    { title: "10 Data Units", text: "Covers bits, bytes, KB, MB, GB, TB, PB, kilobits, megabits, and gigabits in one tool." },
    { title: "Quick Reference Examples", text: "One-click presets for common file sizes: photo, song, HD movie, and game download." },
    { title: "Binary Conversion", text: "Uses accurate binary conversion (1 KB = 1,024 bytes) matching how operating systems report storage." }
  ];

  const proTips = [
    "ISPs advertise speeds in Megabits (Mb/s). Divide by 8 to get your actual download speed in Megabytes (MB/s). 100 Mb/s = 12.5 MB/s.",
    "USB 3.0 transfers at ~5 Gb/s (625 MB/s). USB 4 at ~40 Gb/s (5,000 MB/s). SATA SSDs max around 600 MB/s; NVMe SSDs reach 7,000+ MB/s.",
    "Video file sizes: 1080p HD ≈ 1.5–2 GB/hour. 4K HDR ≈ 10–15 GB/hour. 4K at 60fps ≈ 25–35 GB/hour.",
    "Streaming doesn't store files locally, but uses data: Netflix 4K uses ~7 GB/hour. Factor this into your monthly data cap calculations.",
    "When comparing storage prices, always calculate cost-per-gigabyte to find the true value of different capacity options."
  ];

  const relatedTools = [
    { name: "Length Converter", path: "/conversion/length-converter" },
    { name: "Speed Converter", path: "/conversion/speed-converter" },
    { name: "Area Converter", path: "/conversion/area-converter" },
    { name: "Currency Converter", path: "/conversion/currency-converter" }
  ];

  return (
    <CalculatorLayout
      title="Data Storage Converter"
      seoTitle="Data Storage Converter — Bits, Bytes, KB, MB, GB, TB, Petabytes"
      description="Convert data storage units instantly: bits, bytes, kilobytes, megabytes, gigabytes, terabytes, petabytes, and network speed units (Mb/s). Binary & decimal options."
      path="/conversion/data-storage-converter"
      icon={HardDrive}
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
