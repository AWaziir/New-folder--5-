import React, { useState, useEffect } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';
import { ArrowRightLeft, Loader2 } from 'lucide-react';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [result, setResult] = useState(0);

  // Fetch live rates on mount
  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        // Using a public free API (ExchangeRate-API via Open.ER API)
        const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
        const data = await response.json();
        
        if (data.result === 'success') {
          setRates(data.rates);
          setError(null);
        } else {
          throw new Error('Failed to fetch rates');
        }
      } catch (err) {
        setError('Error loading live rates. Using fallback data.');
        // Fallback rates if API fails
        setRates({ USD: 1, EUR: 0.92, GBP: 0.79, JPY: 151, CAD: 1.35, AUD: 1.53, INR: 83.3 });
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [fromCurrency]);

  // Update result whenever amount or target currency changes
  useEffect(() => {
    if (rates[toCurrency]) {
      setResult(amount * rates[toCurrency]);
    }
  }, [amount, toCurrency, rates]);

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const currencies = Object.keys(rates).length > 0 ? Object.keys(rates) : ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'INR'];

  const getFlagUrl = (code) => `https://flagcdn.com/w40/${code.slice(0, 2).toLowerCase()}.png`;

  return (
    <div className="container">
      <SEO 
        title="Live Currency Converter & Exchange Rates" 
        description="Convert over 100+ global currencies with real-time exchange rates. Accurate financial data for travelers and investors." 
        path="/conversion/currency-converter"
      />
      
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8">
        <h1 className="text-3xl font-bold mb-2">Currency Converter</h1>
        <p className="text-muted mb-6 px-4">Get real-time exchange rates for over 100+ global currencies. Data updated automatically.</p>

        <div className="card shadow-xl highlight-border overflow-hidden p-0">
          <div className="p-8">
            <div className="grid gap-10 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
              
              {/* From Section */}
              <div className="space-y-4">
                <label className="input-label font-bold text-primary">From</label>
                <div className="input-group">
                   <div className="relative">
                      <input 
                        type="number" 
                        className="input-field text-2xl font-bold py-4 pr-16" 
                        value={amount} 
                        onChange={e => setAmount(Number(e.target.value))} 
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-muted">{fromCurrency}</span>
                   </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg border border-border-color shadow-inner">
                  <img src={getFlagUrl(fromCurrency)} alt={fromCurrency} className="w-8 h-6 rounded shadow-sm" />
                  <select 
                    className="flex-grow bg-transparent font-bold text-lg outline-none cursor-pointer"
                    value={fromCurrency}
                    onChange={e => setFromCurrency(e.target.value)}
                  >
                    {currencies.map(curr => <option key={curr} value={curr}>{curr}</option>)}
                  </select>
                </div>
              </div>

              {/* Swap Button (Mobile: Center, Desktop: Center) */}
              <div className="flex justify-center -my-4 md:my-0">
                <button 
                    onClick={swapCurrencies}
                    className="p-4 bg-primary text-white rounded-full shadow-lg hover:scale-110 active:rotate-180 transition-all duration-300 z-10"
                    title="Swap Currencies"
                >
                    <ArrowRightLeft size={24} />
                </button>
              </div>

              {/* To Section */}
              <div className="space-y-4">
                <label className="input-label font-bold text-success">To</label>
                <div className="input-group">
                    <div className="p-4 bg-secondary rounded-xl text-3xl font-bold text-success text-center border-2 border-success border-opacity-20 shadow-inner min-h-[72px] flex items-center justify-center">
                        {loading ? <Loader2 className="animate-spin text-success" /> : result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg border border-border-color shadow-inner">
                   <img src={getFlagUrl(toCurrency)} alt={toCurrency} className="w-8 h-6 rounded shadow-sm" />
                   <select 
                        className="flex-grow bg-transparent font-bold text-lg outline-none cursor-pointer"
                        value={toCurrency}
                        onChange={e => setToCurrency(e.target.value)}
                    >
                        {currencies.map(curr => <option key={curr} value={curr}>{curr}</option>)}
                    </select>
                </div>
              </div>

            </div>
          </div>

          <div className="bg-secondary p-6 text-center border-t border-border-color">
            <p className="text-sm font-medium text-muted">
                {loading ? 'Refreshing rates...' : `1 ${fromCurrency} = ${rates[toCurrency]?.toFixed(4)} ${toCurrency}`}
            </p>
            {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
          </div>
        </div>

        <AdPlaceholder text="Content Placement Ad" />
      </div>
    </div>
  );
}
