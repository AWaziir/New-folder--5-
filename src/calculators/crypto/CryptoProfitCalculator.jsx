import React, { useState, useEffect, useCallback } from 'react';
import { Bitcoin, TrendingUp, Calculator, Receipt } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

/* ─────────────────────────────────────────────
   CoinGecko free API — top 200 by market cap
───────────────────────────────────────────── */
const COINGECKO_URL =
  'https://api.coingecko.com/api/v3/coins/markets' +
  '?vs_currency=usd&order=market_cap_desc&per_page=200&page=1' +
  '&sparkline=false&price_change_percentage=24h';

const TAX_BRACKETS = [
  { label: 'Short-Term < 1 yr — 22%', rate: 0.22 },
  { label: 'Short-Term < 1 yr — 24%', rate: 0.24 },
  { label: 'Short-Term < 1 yr — 32%', rate: 0.32 },
  { label: 'Long-Term > 1 yr — 0%', rate: 0.00 },
  { label: 'Long-Term > 1 yr — 15%', rate: 0.15 },
  { label: 'Long-Term > 1 yr — 20%', rate: 0.20 },
  { label: 'Custom Rate', rate: null },
];

/* ── helpers ── */
const usd = (n) => Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pct = (n) => (n >= 0 ? '+' : '') + Number(n).toFixed(2) + '%';
const coins = (n) => n == null ? '—' : (n < 0.0001 ? Number(n).toExponential(4) : Number(n).toLocaleString('en-US', { maximumFractionDigits: 8 }));

export default function CryptoProfitCalculator() {
  const [tab, setTab] = useState('profit');

  /* ── market data ── */
  const [coinList, setCoinList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  /* ── profit state ── */
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [coinSearch, setCoinSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [investment, setInvestment] = useState(1000);
  const [buyPrice, setBuyPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [fees, setFees] = useState(0.5);
  const [profitResult, setProfitResult] = useState(null);

  /* ── DCA state ── */
  const [dcaRows, setDcaRows] = useState([{ price: '', amount: '' }, { price: '', amount: '' }]);
  const [dcaSell, setDcaSell] = useState('');
  const [dcaResult, setDcaResult] = useState(null);

  /* ── Tax state ── */
  const [taxGain, setTaxGain] = useState('');
  const [taxIdx, setTaxIdx] = useState(0);
  const [customRate, setCustomRate] = useState(15);
  const [taxResult, setTaxResult] = useState(null);

  const fetchCoins = useCallback(async () => {
    setLoading(true);
    setApiError(null);
    try {
      const res = await fetch(COINGECKO_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setCoinList(data);
      setLastUpdated(new Date());
      if (!selectedCoin && data.length > 0) {
        const btc = data.find(c => c.symbol === 'btc') || data[0];
        setSelectedCoin(btc);
        setBuyPrice(String(btc.current_price));
      }
    } catch (e) {
      setApiError('Manual entry mode enabled.');
    } finally {
      setLoading(false);
    }
  }, [selectedCoin]);

  useEffect(() => { fetchCoins(); }, []); // eslint-disable-line

  useEffect(() => {
    const id = setInterval(fetchCoins, 60_000);
    return () => clearInterval(id);
  }, [fetchCoins]);

  const handleSelectCoin = (coin) => {
    setSelectedCoin(coin);
    setBuyPrice(String(coin.current_price));
    setCoinSearch('');
    setDropdownOpen(false);
    setProfitResult(null);
  };

  const calcProfit = useCallback(() => {
    const inv = parseFloat(investment);
    const buy = parseFloat(buyPrice);
    const sell = parseFloat(sellPrice);
    const fee = parseFloat(fees) / 100;

    if (!inv || !buy || !sell || buy <= 0 || inv <= 0) {
      setProfitResult(null);
      return;
    }

    const buyFee = inv * fee;
    const investNet = inv - buyFee;
    const coinsOwned = investNet / buy;
    const grossValue = coinsOwned * sell;
    const sellFee = grossValue * fee;
    const netValue = grossValue - sellFee;
    const profit = netValue - inv;
    const roi = (profit / inv) * 100;
    const breakeven = buy * (1 + fee) / (1 - fee);
    const multiplier = sell / buy;

    setProfitResult({ coinsOwned, grossValue, sellFee, netValue, profit, roi, buyFee, breakeven, multiplier });
  }, [investment, buyPrice, sellPrice, fees]);

  useEffect(() => { calcProfit(); }, [calcProfit]);

  const calcDCA = () => {
    const valid = dcaRows.filter(r => r.price && r.amount && +r.price > 0 && +r.amount > 0);
    if (valid.length === 0) { setDcaResult(null); return; }

    let totalCoins = 0, totalSpent = 0;
    valid.forEach(r => {
      totalCoins += +r.amount / +r.price;
      totalSpent += +r.amount;
    });

    const avgPrice = totalSpent / totalCoins;
    const sellVal = dcaSell ? totalCoins * +dcaSell : null;
    const profit = sellVal != null ? sellVal - totalSpent : null;
    const roi = profit != null ? (profit / totalSpent) * 100 : null;
    const breakeven = avgPrice;

    setDcaResult({ totalCoins, totalSpent, avgPrice, sellVal, profit, roi, breakeven });
  };

  useEffect(() => {
    const gain = parseFloat(taxGain);
    if (!gain || isNaN(gain)) { setTaxResult(null); return; }
    const rate = TAX_BRACKETS[taxIdx].rate != null ? TAX_BRACKETS[taxIdx].rate : customRate / 100;
    const taxOwed = Math.max(0, gain * rate);
    const afterTax = gain - taxOwed;
    setTaxResult({ taxOwed, afterTax, rate: rate * 100, gain });
  }, [taxGain, taxIdx, customRate]);

  const filtered = coinSearch.trim()
    ? coinList.filter(c =>
        c.name.toLowerCase().includes(coinSearch.toLowerCase()) ||
        c.symbol.toLowerCase().includes(coinSearch.toLowerCase())
      ).slice(0, 50)
    : coinList.slice(0, 50);

  const isProfit = profitResult && profitResult.profit >= 0;

  const inputs = (
    <div className="space-y-6">
      <div className="flex bg-slate-100 p-1 rounded-lg mb-4">
        {[
          { id: 'profit', label: 'Profit', icon: TrendingUp },
          { id: 'dca', label: 'DCA', icon: Calculator },
          { id: 'tax', label: 'Tax', icon: Receipt },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2 rounded-md font-bold transition flex items-center justify-center gap-2 ${tab === t.id ? 'bg-primary text-white shadow-md' : 'text-muted'}`}
          >
            <t.icon size={16} />
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'profit' && (
        <div className="space-y-4">
          <div className="input-group relative">
            <label className="input-label">Select Coin</label>
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="input-field cursor-pointer flex items-center justify-between"
            >
              {selectedCoin ? (
                <div className="flex items-center gap-3">
                  <img src={selectedCoin.image} alt="" className="w-5 h-5 rounded-full" />
                  <span className="font-bold">{selectedCoin.name}</span>
                  <span className="text-xs opacity-50 uppercase">{selectedCoin.symbol}</span>
                </div>
              ) : <span>{loading ? 'Loading...' : 'Select Coin'}</span>}
              <span className="text-primary font-bold">
                {selectedCoin ? `$${usd(selectedCoin.current_price)}` : ''}
              </span>
            </div>

            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 z-50 bg-white border border-slate-200 rounded-xl shadow-2xl mt-2 overflow-hidden">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full p-3 border-b outline-none font-medium"
                  value={coinSearch}
                  onChange={e => setCoinSearch(e.target.value)}
                  onClick={e => e.stopPropagation()}
                />
                <div className="max-h-60 overflow-y-auto">
                  {filtered.map(coin => (
                    <div
                      key={coin.id}
                      onClick={() => handleSelectCoin(coin)}
                      className="p-3 hover:bg-slate-50 cursor-pointer flex items-center justify-between border-b last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <img src={coin.image} alt="" className="w-5 h-5 rounded-full" />
                        <div>
                          <p className="font-bold text-sm leading-tight">{coin.name}</p>
                          <p className="text-xs text-muted uppercase">{coin.symbol}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm">${usd(coin.current_price)}</p>
                        <p className={`text-[10px] ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {coin.price_change_percentage_24h >= 0 ? '▲' : '▼'}{Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="input-group">
              <label className="input-label">Investment ($)</label>
              <input type="number" className="input-field" value={investment} onChange={e => setInvestment(e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">Fee (%)</label>
              <input type="number" className="input-field" value={fees} onChange={e => setFees(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="input-group">
              <label className="input-label">Buy Price ($)</label>
              <input type="number" className="input-field" value={buyPrice} onChange={e => setBuyPrice(e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">Sell Price ($)</label>
              <input type="number" className="input-field" value={sellPrice} onChange={e => setSellPrice(e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {tab === 'dca' && (
        <div className="space-y-4">
          <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
            {dcaRows.map((row, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input type="number" className="input-field flex-1" placeholder="Price" value={row.price} onChange={e => { const r = [...dcaRows]; r[i].price = e.target.value; setDcaRows(r); }} />
                <input type="number" className="input-field flex-1" placeholder="Amount" value={row.amount} onChange={e => { const r = [...dcaRows]; r[i].amount = e.target.value; setDcaRows(r); }} />
                {dcaRows.length > 1 && (
                  <button onClick={() => setDcaRows(dcaRows.filter((_, idx) => idx !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">×</button>
                )}
              </div>
            ))}
          </div>
          <button onClick={() => setDcaRows([...dcaRows, { price: '', amount: '' }])} className="w-full py-2 border-2 border-dashed border-slate-200 rounded-lg text-sm font-bold text-muted hover:border-primary hover:text-primary transition">
            + Add Purchase
          </button>
          <div className="input-group">
            <label className="input-label">Current/Target Price ($)</label>
            <input type="number" className="input-field" value={dcaSell} onChange={e => setDcaSell(e.target.value)} />
          </div>
          <button onClick={calcDCA} className="w-full py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20">Calculate DCA</button>
        </div>
      )}

      {tab === 'tax' && (
        <div className="space-y-4">
          <div className="input-group">
            <label className="input-label">Total Capital Gain ($)</label>
            <input type="number" className="input-field" value={taxGain} onChange={e => setTaxGain(e.target.value)} />
          </div>
          <div className="input-group">
            <label className="input-label">Tax Bracket</label>
            <select className="input-field" value={taxIdx} onChange={e => setTaxIdx(Number(e.target.value))}>
              {TAX_BRACKETS.map((b, i) => <option key={i} value={i}>{b.label}</option>)}
            </select>
          </div>
          {TAX_BRACKETS[taxIdx].rate === null && (
            <div className="input-group">
              <label className="input-label">Custom Rate (%)</label>
              <input type="number" className="input-field" value={customRate} onChange={e => setCustomRate(e.target.value)} />
            </div>
          )}
        </div>
      )}
    </div>
  );

  const results = (
    <div className="space-y-6">
      {tab === 'profit' && profitResult && (
        <div className="space-y-6">
          <div className={`p-8 rounded-2xl text-center border shadow-inner group transition ${isProfit ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">{isProfit ? 'Total Profit' : 'Total Loss'}</p>
            <p className={`text-5xl font-black group-hover:scale-105 transition ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
              {isProfit ? '+' : ''}{usd(profitResult.profit)}
            </p>
            <p className={`text-lg font-bold mt-2 ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
              {pct(profitResult.roi)} ROI
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-[10px] uppercase font-bold opacity-40 tracking-widest mb-1">Coins Owned</p>
              <p className="text-lg font-black text-slate-900">{coins(profitResult.coinsOwned)}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-[10px] uppercase font-bold opacity-40 tracking-widest mb-1">Breakeven</p>
              <p className="text-lg font-black text-slate-900">${usd(profitResult.breakeven)}</p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-50 rounded-lg text-center flex justify-between items-center px-6">
            <span className="text-xs opacity-40 font-bold uppercase">Total Fees:</span>
            <span className="font-bold text-slate-900">${usd(profitResult.buyFee + profitResult.sellFee)}</span>
          </div>
        </div>
      )}

      {tab === 'dca' && dcaResult && (
        <div className="space-y-6">
          <div className="p-8 bg-primary/5 rounded-2xl text-center border border-primary/20 shadow-inner group">
            <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Average Entry Price</p>
            <p className="text-5xl font-black text-slate-900 group-hover:scale-105 transition">${usd(dcaResult.avgPrice)}</p>
            <p className="text-xs font-bold uppercase tracking-widest opacity-40 mt-2">Cost Basis</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-[10px] uppercase font-bold opacity-40 tracking-widest mb-1">Total Spent</p>
              <p className="text-lg font-black text-slate-900">${usd(dcaResult.totalSpent)}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-[10px] uppercase font-bold opacity-40 tracking-widest mb-1">Total Coins</p>
              <p className="text-lg font-black text-slate-900">{coins(dcaResult.totalCoins)}</p>
            </div>
          </div>

          {dcaResult.profit !== null && (
            <div className={`p-4 rounded-xl border text-center ${dcaResult.profit >= 0 ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
              <p className="text-xs font-bold uppercase mb-1">Estimated {dcaResult.profit >= 0 ? 'Profit' : 'Loss'}</p>
              <p className="text-2xl font-black">{dcaResult.profit >= 0 ? '+' : ''}${usd(dcaResult.profit)} ({pct(dcaResult.roi)})</p>
            </div>
          )}
        </div>
      )}

      {tab === 'tax' && taxResult && (
        <div className="space-y-6">
          <div className="p-8 bg-red-50 rounded-2xl text-center border border-red-200 shadow-inner group">
            <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Estimated Tax Owed</p>
            <p className="text-5xl font-black text-red-600 group-hover:scale-105 transition">${usd(taxResult.taxOwed)}</p>
            <p className="text-xs font-bold uppercase tracking-widest opacity-40 mt-2">at {taxResult.rate.toFixed(1)}% rate</p>
          </div>

          <div className="p-6 bg-green-50 rounded-xl border border-green-200 text-center">
            <p className="text-xs uppercase font-bold opacity-40 tracking-widest mb-1 text-green-600">Net After-Tax Profit</p>
            <p className="text-3xl font-black text-slate-900">${usd(taxResult.afterTax)}</p>
          </div>
        </div>
      )}

      {((tab === 'profit' && !profitResult) || (tab === 'dca' && !dcaResult) || (tab === 'tax' && !taxResult)) && (
        <div className="py-20 text-center text-muted opacity-40 italic">Enter details to see calculations.</div>
      )}
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        The Crypto Profit Calculator is a multi-purpose tool designed for traders and investors to track their performance, average down, and plan for tax season.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Profit / Loss:</strong> Calculate the return on a single trade, including buy/sell fees and ROI percentage.</li>
        <li><strong>DCA (Dollar-Cost Averaging):</strong> Find your average entry price when buying a coin at different price points over time.</li>
        <li><strong>Tax Estimator:</strong> Get a rough estimate of your federal capital gains tax liability (US-based brackets).</li>
      </ul>
    </div>
  );

  const formula = "Net Profit = (Sell Value - Sell Fee) - (Buy Value + Buy Fee)";

  const examples = [
    {
      title: "Bitcoin Breakout",
      description: "Investing $1,000 in BTC at $30,000 and selling at $60,000 results in a $990 net profit (assuming 0.5% fees), essentially doubling your money."
    },
    {
      title: "DCA Strategy",
      description: "Buying $500 of ETH at $4,000 and another $500 at $2,000 brings your average cost down to $2,666 per coin."
    }
  ];

  const faqs = [
    {
      q: "Are the crypto prices live?",
      a: "Yes, we fetch top 200 coin prices every 60 seconds from the CoinGecko API. You can also manually override prices."
    },
    {
      q: "How are crypto taxes calculated?",
      a: "Most jurisdictions treat crypto as property. Capital gains are calculated as the difference between your cost basis and the fair market value at the time of sale."
    }
  ];

  return (
    <CalculatorLayout
      title="Crypto Profit Calculator"
      seoTitle="Crypto Profit Calculator - ROI, DCA & Tax Estimator"
      description="Calculate cryptocurrency profit, loss, ROI, and DCA average price with live token prices. Estimate capital gains tax for Bitcoin, Ethereum, and 200+ coins."
      path="/crypto/profit-calculator"
      icon={Bitcoin}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
    />
  );
}
