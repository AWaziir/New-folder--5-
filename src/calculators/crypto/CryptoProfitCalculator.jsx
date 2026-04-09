import React, { useState, useEffect, useCallback } from 'react';
import SEO from '../../components/SEO';
import AdPlaceholder from '../../components/AdPlaceholder';

/* ─────────────────────────────────────────────
   CoinGecko free API — top 200 by market cap
───────────────────────────────────────────── */
const COINGECKO_URL =
  'https://api.coingecko.com/api/v3/coins/markets' +
  '?vs_currency=usd&order=market_cap_desc&per_page=200&page=1' +
  '&sparkline=false&price_change_percentage=24h';

const TAX_BRACKETS = [
  { label: 'Short-Term  < 1 yr  —  22%', rate: 0.22 },
  { label: 'Short-Term  < 1 yr  —  24%', rate: 0.24 },
  { label: 'Short-Term  < 1 yr  —  32%', rate: 0.32 },
  { label: 'Long-Term   > 1 yr  —   0%', rate: 0.00 },
  { label: 'Long-Term   > 1 yr  —  15%', rate: 0.15 },
  { label: 'Long-Term   > 1 yr  —  20%', rate: 0.20 },
  { label: 'Custom Rate',                 rate: null  },
];

/* ── helpers ── */
const usd   = (n) => Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pct   = (n) => (n >= 0 ? '+' : '') + Number(n).toFixed(2) + '%';
const coins = (n) => n == null ? '—' : (n < 0.0001 ? Number(n).toExponential(4) : Number(n).toLocaleString('en-US', { maximumFractionDigits: 8 }));

/* ══════════════════════════════════════════════════════════ */
export default function CryptoProfitCalculator() {
  const [tab, setTab] = useState('profit');

  /* ── market data ── */
  const [coinList, setCoinList]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [apiError, setApiError]       = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  /* ── profit state ── */
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [coinSearch, setCoinSearch]     = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [investment, setInvestment]     = useState(1000);
  const [buyPrice, setBuyPrice]         = useState('');
  const [sellPrice, setSellPrice]       = useState('');
  const [fees, setFees]                 = useState(0.5);
  const [profitResult, setProfitResult] = useState(null);

  /* ── DCA state ── */
  const [dcaRows, setDcaRows]           = useState([{ price: '', amount: '' }, { price: '', amount: '' }]);
  const [dcaSell, setDcaSell]           = useState('');
  const [dcaResult, setDcaResult]       = useState(null);

  /* ── Tax state ── */
  const [taxGain, setTaxGain]           = useState('');
  const [taxIdx, setTaxIdx]             = useState(0);
  const [customRate, setCustomRate]     = useState(15);
  const [taxResult, setTaxResult]       = useState(null);

  /* ══════ FETCH COINS ══════ */
  const fetchCoins = useCallback(async () => {
    setLoading(true);
    setApiError(null);
    try {
      const res = await fetch(COINGECKO_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setCoinList(data);
      setLastUpdated(new Date());
      // pre-select Bitcoin
      if (!selectedCoin && data.length > 0) {
        const btc = data.find(c => c.symbol === 'btc') || data[0];
        setSelectedCoin(btc);
        setBuyPrice(String(btc.current_price));
      }
    } catch (e) {
      setApiError('Could not fetch prices. Using manual entry mode.');
    } finally {
      setLoading(false);
    }
  }, []); // eslint-disable-line

  useEffect(() => { fetchCoins(); }, [fetchCoins]);

  /* Auto-refresh every 60 s */
  useEffect(() => {
    const id = setInterval(fetchCoins, 60_000);
    return () => clearInterval(id);
  }, [fetchCoins]);

  /* When coin changes, sync buy price to current market price */
  const handleSelectCoin = (coin) => {
    setSelectedCoin(coin);
    setBuyPrice(String(coin.current_price));
    setCoinSearch('');
    setDropdownOpen(false);
    setProfitResult(null);
  };

  /* ══════ PROFIT CALCULATION ══════ */
  const calcProfit = useCallback(() => {
    const inv  = parseFloat(investment);
    const buy  = parseFloat(buyPrice);
    const sell = parseFloat(sellPrice);
    const fee  = parseFloat(fees) / 100;

    if (!inv || !buy || !sell || buy <= 0 || inv <= 0) {
      setProfitResult(null);
      return;
    }

    const buyFee         = inv * fee;
    const investNet      = inv - buyFee;
    const coinsOwned     = investNet / buy;
    const grossValue     = coinsOwned * sell;
    const sellFee        = grossValue * fee;
    const netValue       = grossValue - sellFee;
    const profit         = netValue - inv;
    const roi            = (profit / inv) * 100;
    const breakeven      = buy * (1 + fee) / (1 - fee);
    const multiplier     = sell / buy;

    setProfitResult({ coinsOwned, grossValue, sellFee, netValue, profit, roi, buyFee, breakeven, multiplier });
  }, [investment, buyPrice, sellPrice, fees]);

  useEffect(() => { calcProfit(); }, [calcProfit]);

  /* ══════ DCA CALCULATION ══════ */
  const calcDCA = () => {
    const valid = dcaRows.filter(r => r.price && r.amount && +r.price > 0 && +r.amount > 0);
    if (valid.length === 0) { setDcaResult(null); return; }

    let totalCoins = 0, totalSpent = 0;
    valid.forEach(r => {
      totalCoins += +r.amount / +r.price;
      totalSpent += +r.amount;
    });

    const avgPrice  = totalSpent / totalCoins;
    const sellVal   = dcaSell ? totalCoins * +dcaSell : null;
    const profit    = sellVal != null ? sellVal - totalSpent : null;
    const roi       = profit  != null ? (profit / totalSpent) * 100 : null;
    const breakeven = avgPrice;

    setDcaResult({ totalCoins, totalSpent, avgPrice, sellVal, profit, roi, breakeven });
  };

  const addRow    = ()        => setDcaRows([...dcaRows, { price: '', amount: '' }]);
  const removeRow = (i)       => setDcaRows(dcaRows.filter((_, idx) => idx !== i));
  const updateRow = (i, k, v) => { const r = [...dcaRows]; r[i][k] = v; setDcaRows(r); };

  /* ══════ TAX CALCULATION ══════ */
  useEffect(() => {
    const gain = parseFloat(taxGain);
    if (!gain || isNaN(gain)) { setTaxResult(null); return; }
    const rate     = TAX_BRACKETS[taxIdx].rate != null ? TAX_BRACKETS[taxIdx].rate : customRate / 100;
    const taxOwed  = Math.max(0, gain * rate);
    const afterTax = gain - taxOwed;
    setTaxResult({ taxOwed, afterTax, rate: rate * 100, gain });
  }, [taxGain, taxIdx, customRate]);

  /* ══════ FILTERED COIN SEARCH ══════ */
  const filtered = coinSearch.trim()
    ? coinList.filter(c =>
        c.name.toLowerCase().includes(coinSearch.toLowerCase()) ||
        c.symbol.toLowerCase().includes(coinSearch.toLowerCase())
      ).slice(0, 50)
    : coinList.slice(0, 50);

  const isProfit = profitResult && profitResult.profit >= 0;

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     RENDER
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  return (
    <div className="container" style={{ maxWidth: '1000px' }}>
      <SEO
        title="Crypto Profit Calculator — Real-Time Prices"
        description="Calculate cryptocurrency profit, loss, ROI, DCA average price, and capital gains tax with live prices for the top 200 coins. Bitcoin, Ethereum, Solana & more."
        path="/crypto/profit-calculator"
      />

      <AdPlaceholder text="Crypto Top Banner Ad" />

      {/* ── Page Header ── */}
      <div style={{ margin: '1.75rem 0 1.5rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '3rem', height: '3rem', borderRadius: '0.85rem', flexShrink: 0,
            background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.4rem', boxShadow: '0 0 16px rgba(245,158,11,0.2)',
          }}>₿</div>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '0.2rem' }}>
              Crypto Profit Calculator
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Live prices · Top 200 coins · Profit, DCA & Tax
            </p>
          </div>
        </div>

        {/* Live price badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {loading && (
            <span style={{ fontSize: '0.78rem', color: 'var(--text-faint)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fbbf24', display: 'inline-block', animation: 'pulse-ring 1.5s infinite' }} />
              Fetching prices…
            </span>
          )}
          {!loading && lastUpdated && !apiError && (
            <button onClick={fetchCoins} style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              fontSize: '0.75rem', color: '#10b981', background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.25)', borderRadius: '9999px',
              padding: '0.3rem 0.75rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600,
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
              Live · {lastUpdated.toLocaleTimeString()} · Refresh
            </button>
          )}
          {apiError && (
            <span style={{ fontSize: '0.75rem', color: '#f87171', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '9999px', padding: '0.3rem 0.75rem' }}>
              ⚠ Manual mode
            </span>
          )}
        </div>
      </div>

      {apiError && (
        <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '0.75rem', fontSize: '0.85rem', color: '#fbbf24' }}>
          ⚠️ {apiError} — You can still manually type any buy/sell price below.
        </div>
      )}

      {/* ── Tabs ── */}
      <div style={{
        display: 'flex', gap: '0.35rem', marginBottom: '1.75rem',
        background: 'var(--bg-card)', border: '1px solid var(--border-color)',
        borderRadius: '0.9rem', padding: '0.35rem',
      }}>
        {[
          { id: 'profit', label: '📈 Profit / Loss' },
          { id: 'dca',    label: '📊 DCA Calculator' },
          { id: 'tax',    label: '🧾 Tax Estimator' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1, padding: '0.65rem 1rem', borderRadius: '0.6rem',
              border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              fontWeight: 600, fontSize: '0.875rem', transition: 'all 0.2s ease',
              background: tab === t.id ? 'linear-gradient(135deg, #f59e0b, #f97316)' : 'transparent',
              color: tab === t.id ? 'white' : 'var(--text-muted)',
              boxShadow: tab === t.id ? '0 4px 14px rgba(245,158,11,0.35)' : 'none',
            }}
          >{t.label}</button>
        ))}
      </div>

      {/* ══════════════════════════════════════════
          TAB 1 — PROFIT / LOSS
      ══════════════════════════════════════════ */}
      {tab === 'profit' && (
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>

          {/* ─ Inputs ─ */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '1rem', padding: '1.75rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Trade Details</h2>

            {/* Coin Selector */}
            <div style={{ marginBottom: '1.25rem', position: 'relative' }}>
              <label className="input-label">Cryptocurrency (Top 200 by Market Cap)</label>

              {/* Selected display / search trigger */}
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.6rem 1rem', background: 'var(--bg-surface)',
                  border: `1px solid ${dropdownOpen ? 'rgba(245,158,11,0.5)' : 'var(--border-color)'}`,
                  borderRadius: '0.65rem', cursor: 'pointer',
                  transition: 'border-color 0.2s',
                  boxShadow: dropdownOpen ? '0 0 0 3px rgba(245,158,11,0.12)' : 'none',
                }}
              >
                {selectedCoin ? (
                  <>
                    <img src={selectedCoin.image} alt={selectedCoin.name} style={{ width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0 }} onError={e => e.target.style.display='none'} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{selectedCoin.name}</span>
                      <span style={{ marginLeft: '0.4rem', fontSize: '0.75rem', color: 'var(--text-faint)', textTransform: 'uppercase' }}>{selectedCoin.symbol}</span>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fbbf24', fontFamily: "'Space Grotesk', sans-serif" }}>
                        ${usd(selectedCoin.current_price)}
                      </span>
                      <span style={{ fontSize: '0.72rem', marginLeft: '0.3rem', color: selectedCoin.price_change_percentage_24h >= 0 ? '#6ee7b7' : '#fca5a5' }}>
                        {selectedCoin.price_change_percentage_24h >= 0 ? '▲' : '▼'}
                        {Math.abs(selectedCoin.price_change_percentage_24h).toFixed(2)}%
                      </span>
                    </div>
                  </>
                ) : (
                  <span style={{ color: 'var(--text-faint)', fontSize: '0.9rem' }}>
                    {loading ? 'Loading coins…' : 'Select a cryptocurrency'}
                  </span>
                )}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-faint)" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              {/* Dropdown */}
              {dropdownOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 100,
                  background: 'var(--bg-elevated)', border: '1px solid rgba(245,158,11,0.3)',
                  borderRadius: '0.85rem', boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                  overflow: 'hidden',
                }}>
                  {/* Search */}
                  <div style={{ padding: '0.6rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ position: 'relative' }}>
                      <svg style={{ position: 'absolute', left: '0.7rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)' }}
                        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                      </svg>
                      <input
                        autoFocus
                        type="text"
                        placeholder="Search coins…"
                        value={coinSearch}
                        onChange={e => setCoinSearch(e.target.value)}
                        onClick={e => e.stopPropagation()}
                        style={{
                          width: '100%', padding: '0.5rem 0.75rem 0.5rem 2rem',
                          background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                          borderRadius: '0.5rem', color: 'var(--text-main)',
                          fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  {/* List */}
                  <div style={{ maxHeight: '260px', overflowY: 'auto' }}>
                    {loading && coinList.length === 0 ? (
                      <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-faint)', fontSize: '0.875rem' }}>Loading top 200 coins…</div>
                    ) : filtered.length === 0 ? (
                      <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-faint)', fontSize: '0.875rem' }}>No coins match "{coinSearch}"</div>
                    ) : filtered.map((coin, idx) => (
                      <div
                        key={coin.id}
                        onClick={() => handleSelectCoin(coin)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.65rem',
                          padding: '0.55rem 0.85rem', cursor: 'pointer',
                          background: selectedCoin?.id === coin.id ? 'rgba(245,158,11,0.1)' : 'transparent',
                          borderBottom: '1px solid var(--border-color)',
                          transition: 'background 0.1s',
                        }}
                        onMouseEnter={e => { if (selectedCoin?.id !== coin.id) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                        onMouseLeave={e => { if (selectedCoin?.id !== coin.id) e.currentTarget.style.background = 'transparent'; }}
                      >
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-faint)', width: '1.5rem', textAlign: 'right', flexShrink: 0 }}>{coin.market_cap_rank}</span>
                        <img src={coin.image} alt={coin.name} style={{ width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0 }} onError={e => e.target.style.display='none'} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{coin.name}</span>
                          <span style={{ marginLeft: '0.35rem', fontSize: '0.7rem', color: 'var(--text-faint)', textTransform: 'uppercase' }}>{coin.symbol}</span>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div style={{ fontWeight: 700, fontSize: '0.85rem', fontFamily: "'Space Grotesk', sans-serif" }}>${usd(coin.current_price)}</div>
                          <div style={{ fontSize: '0.68rem', color: coin.price_change_percentage_24h >= 0 ? '#6ee7b7' : '#fca5a5' }}>
                            {coin.price_change_percentage_24h >= 0 ? '▲' : '▼'}{Math.abs(coin.price_change_percentage_24h || 0).toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <NumField label="Investment Amount ($)" value={investment} onChange={setInvestment} prefix="$" />
            <NumField
              label={`Buy Price ($ per ${selectedCoin?.symbol?.toUpperCase() || 'coin'})`}
              value={buyPrice}
              onChange={setBuyPrice}
              prefix="$"
              hint={selectedCoin ? `Market: $${usd(selectedCoin.current_price)}` : undefined}
            />
            <NumField
              label={`Sell / Target Price ($)`}
              value={sellPrice}
              onChange={setSellPrice}
              prefix="$"
              hint="Enter the price you plan to sell at"
            />
            <NumField label="Trading Fee (%)" value={fees} onChange={setFees} suffix="%" step="0.1" />
          </div>

          {/* ─ Results ─ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {profitResult ? (
              <>
                {/* Main P&L card */}
                <div style={{
                  background: isProfit
                    ? 'linear-gradient(135deg, rgba(16,185,129,0.14), rgba(6,182,212,0.07))'
                    : 'linear-gradient(135deg, rgba(239,68,68,0.14), rgba(245,158,11,0.06))',
                  border: `1px solid ${isProfit ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
                  borderRadius: '1rem', padding: '1.75rem', textAlign: 'center',
                }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    {isProfit ? '🚀 Profit' : '📉 Loss'}
                  </p>
                  <p style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', color: isProfit ? '#6ee7b7' : '#fca5a5', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '0.25rem' }}>
                    {profitResult.profit >= 0 ? '+' : '−'}${usd(Math.abs(profitResult.profit))}
                  </p>
                  <p style={{ fontSize: '1.05rem', fontWeight: 700, color: isProfit ? '#34d399' : '#f87171' }}>
                    {pct(profitResult.roi)} ROI
                  </p>
                  {profitResult.multiplier && (
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                      {profitResult.multiplier.toFixed(2)}× multiplier
                    </p>
                  )}
                </div>

                {/* Stats grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                  <StatCard label="Coins Owned"     value={coins(profitResult.coinsOwned)}    color="#f59e0b" />
                  <StatCard label="Net Proceeds"     value={`$${usd(profitResult.netValue)}`}  color="#a78bfa" />
                  <StatCard label="Breakeven Price"  value={`$${usd(profitResult.breakeven)}`} color="#67e8f9" />
                  <StatCard label="Total Fees"       value={`$${usd(profitResult.buyFee + profitResult.sellFee)}`} color="#fb923c" />
                </div>

                {/* Breakdown table */}
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '1rem', padding: '1.25rem' }}>
                  <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-faint)', marginBottom: '1rem' }}>Breakdown</p>
                  {[
                    ['Investment',                     `$${usd(investment)}`],
                    ['Buy Fee',                        `−$${usd(profitResult.buyFee)}`],
                    [`${selectedCoin?.symbol?.toUpperCase() || 'Coins'} Purchased`, `${coins(profitResult.coinsOwned)}`],
                    ['Gross Sell Value',               `$${usd(profitResult.grossValue)}`],
                    ['Sell Fee',                       `−$${usd(profitResult.sellFee)}`],
                    ['Net Proceeds',                   `$${usd(profitResult.netValue)}`],
                    ['Net Profit / Loss',              `${profitResult.profit >= 0 ? '+' : '−'}$${usd(Math.abs(profitResult.profit))}`],
                  ].map(([k, v], i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid var(--border-color)' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{k}</span>
                      <span style={{ fontWeight: 600, fontSize: '0.82rem', fontFamily: "'Space Grotesk', sans-serif" }}>{v}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <Placeholder text="Fill in Investment, Buy Price & Sell Price" />
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          TAB 2 — DCA CALCULATOR
      ══════════════════════════════════════════ */}
      {tab === 'dca' && (
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '1rem', padding: '1.75rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Dollar-Cost Averaging</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '1.5rem' }}>
              Add every purchase to calculate your average entry price across all buys.
            </p>

            {/* Column headers */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2rem', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-faint)' }}>Buy Price ($)</span>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-faint)' }}>Amount Spent ($)</span>
              <span />
            </div>

            {dcaRows.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2rem', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                <input type="number" className="input-field" placeholder="e.g. 30000" value={row.price}
                  onChange={e => updateRow(i, 'price', e.target.value)} min="0" step="any" style={{ padding: '0.6rem 0.8rem', fontSize: '0.875rem' }} />
                <input type="number" className="input-field" placeholder="e.g. 500" value={row.amount}
                  onChange={e => updateRow(i, 'amount', e.target.value)} min="0" step="any" style={{ padding: '0.6rem 0.8rem', fontSize: '0.875rem' }} />
                {dcaRows.length > 1 ? (
                  <button onClick={() => removeRow(i)} style={{
                    width: '2rem', height: '2rem', borderRadius: '0.45rem', flexShrink: 0,
                    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                    color: '#f87171', fontSize: '1.1rem', cursor: 'pointer', fontFamily: 'inherit',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>×</button>
                ) : <div />}
              </div>
            ))}

            <button onClick={addRow} style={{
              width: '100%', padding: '0.55rem', marginTop: '0.25rem', marginBottom: '1.25rem',
              background: 'rgba(245,158,11,0.07)', border: '1px dashed rgba(245,158,11,0.35)',
              borderRadius: '0.6rem', color: '#fbbf24', fontWeight: 600, fontSize: '0.82rem',
              cursor: 'pointer', fontFamily: 'inherit',
            }}>+ Add Purchase</button>

            <NumField label="Current / Sell Price ($) — optional" value={dcaSell} onChange={setDcaSell} prefix="$" step="any" />

            <button onClick={calcDCA} style={{
              width: '100%', padding: '0.85rem',
              background: 'linear-gradient(135deg, #f59e0b, #f97316)',
              border: 'none', borderRadius: '0.75rem', color: 'white',
              fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: '0 4px 15px rgba(245,158,11,0.35)',
            }}>Calculate DCA Average</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {dcaResult ? (
              <>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(245,158,11,0.14), rgba(249,115,22,0.07))',
                  border: '1px solid rgba(245,158,11,0.3)',
                  borderRadius: '1rem', padding: '1.75rem', textAlign: 'center',
                }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Average Entry Price</p>
                  <p style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#fbbf24', fontFamily: "'Space Grotesk', sans-serif" }}>
                    ${usd(dcaResult.avgPrice)}
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                  <StatCard label="Total Invested"  value={`$${usd(dcaResult.totalSpent)}`} color="#f59e0b" />
                  <StatCard label="Total Coins"     value={coins(dcaResult.totalCoins)}      color="#a78bfa" />
                  {dcaResult.sellVal != null && <>
                    <StatCard label="Portfolio Value" value={`$${usd(dcaResult.sellVal)}`}   color="#67e8f9" />
                    <StatCard label="ROI"             value={pct(dcaResult.roi)}              color={dcaResult.roi >= 0 ? '#6ee7b7' : '#fca5a5'} />
                    <div style={{ gridColumn: '1/-1' }}>
                      <StatCard
                        label={dcaResult.profit >= 0 ? '🚀 Total Profit' : '📉 Total Loss'}
                        value={`${dcaResult.profit >= 0 ? '+' : '−'}$${usd(Math.abs(dcaResult.profit))}`}
                        color={dcaResult.profit >= 0 ? '#6ee7b7' : '#fca5a5'}
                        large
                      />
                    </div>
                  </>}
                </div>
              </>
            ) : (
              <Placeholder text="Add purchases above and click Calculate" />
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          TAB 3 — TAX ESTIMATOR
      ══════════════════════════════════════════ */}
      {tab === 'tax' && (
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '1rem', padding: '1.75rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Capital Gains Tax Estimate</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '1.5rem' }}>
              US federal capital gains brackets. Not financial or legal advice.
            </p>

            <NumField label="Total Capital Gain / Profit ($)" value={taxGain} onChange={setTaxGain} prefix="$" step="any" />

            <div style={{ marginBottom: '1.25rem' }}>
              <label className="input-label">Tax Bracket</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {TAX_BRACKETS.map((b, i) => (
                  <button key={i} onClick={() => setTaxIdx(i)} style={{
                    padding: '0.6rem 0.9rem', borderRadius: '0.6rem', cursor: 'pointer',
                    textAlign: 'left', fontFamily: 'inherit', fontWeight: 500, fontSize: '0.85rem',
                    border: `1px solid ${taxIdx === i ? 'rgba(245,158,11,0.5)' : 'var(--border-color)'}`,
                    background: taxIdx === i ? 'rgba(245,158,11,0.1)' : 'var(--bg-surface)',
                    color: taxIdx === i ? '#fbbf24' : 'var(--text-muted)',
                    transition: 'all 0.15s ease',
                  }}>{b.label}</button>
                ))}
              </div>
            </div>

            {TAX_BRACKETS[taxIdx].rate === null && (
              <NumField label="Custom Tax Rate (%)" value={customRate} onChange={setCustomRate} suffix="%" step="0.1" min={0} max={100} />
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {taxResult && taxGain ? (
              <>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(239,68,68,0.12), rgba(245,158,11,0.06))',
                  border: '1px solid rgba(239,68,68,0.25)',
                  borderRadius: '1rem', padding: '1.75rem', textAlign: 'center',
                }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    🧾 Estimated Tax Owed
                  </p>
                  <p style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#fca5a5', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '0.25rem' }}>
                    ${usd(taxResult.taxOwed)}
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>at {taxResult.rate.toFixed(1)}% effective rate</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                  <StatCard label="Gross Profit"    value={`$${usd(taxResult.gain)}`}     color="#f59e0b" />
                  <StatCard label="Tax Owed"        value={`−$${usd(taxResult.taxOwed)}`} color="#f87171" />
                  <div style={{ gridColumn: '1/-1' }}>
                    <StatCard label="After-Tax Gain" value={`$${usd(taxResult.afterTax)}`} color="#6ee7b7" large />
                  </div>
                </div>

                <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: '0.75rem', padding: '1rem' }}>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                    ⚠️ <strong style={{ color: 'var(--text-secondary)' }}>Disclaimer:</strong> This is a simplified US federal estimate only. Actual taxes vary by state, income level, deductions, and other factors. Consult a registered tax professional.
                  </p>
                </div>
              </>
            ) : (
              <Placeholder text="Enter your profit and select a tax bracket" />
            )}
          </div>
        </div>
      )}

      <AdPlaceholder text="Crypto Mid-Content Ad" />
    </div>
  );
}

/* ── Sub-components ── */

function NumField({ label, value, onChange, prefix, suffix, step, min, max, hint }) {
  return (
    <div className="input-group">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
        <label className="input-label" style={{ marginBottom: 0 }}>{label}</label>
        {hint && <span style={{ fontSize: '0.7rem', color: 'var(--text-faint)' }}>{hint}</span>}
      </div>
      <div style={{ position: 'relative' }}>
        {prefix && <span style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)', fontWeight: 600, fontSize: '0.9rem', pointerEvents: 'none' }}>{prefix}</span>}
        <input
          type="number" className="input-field"
          value={value} onChange={e => onChange(e.target.value)}
          min={min} max={max} step={step || 'any'}
          style={{ paddingLeft: prefix ? '1.85rem' : undefined, paddingRight: suffix ? '2.5rem' : undefined }}
        />
        {suffix && <span style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)', fontWeight: 600, fontSize: '0.9rem', pointerEvents: 'none' }}>{suffix}</span>}
      </div>
    </div>
  );
}

function StatCard({ label, value, color, large }) {
  return (
    <div style={{
      background: 'var(--bg-card)', border: `1px solid ${color}25`,
      borderRadius: '0.75rem', padding: large ? '1rem 1.25rem' : '0.85rem 1rem',
    }}>
      <p style={{ fontSize: '0.67rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-faint)', marginBottom: '0.3rem' }}>{label}</p>
      <p style={{ fontSize: large ? '1.4rem' : '1rem', fontWeight: 800, color, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>{value}</p>
    </div>
  );
}

function Placeholder({ text }) {
  return (
    <div style={{
      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg-card)', border: '1px solid var(--border-color)',
      borderRadius: '1rem', padding: '3rem', textAlign: 'center', color: 'var(--text-faint)', minHeight: '200px',
    }}>
      <div>
        <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🪙</div>
        <p style={{ fontWeight: 500, fontSize: '0.875rem' }}>{text}</p>
      </div>
    </div>
  );
}
