import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../../components/CalculatorLayout';
import { ArrowRightLeft, Loader2, Coins } from 'lucide-react';

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
        setRates({ USD: 1, EUR: 0.92, GBP: 0.79, JPY: 151, CAD: 1.35, AUD: 1.53, INR: 83.3, BTC: 0.000015 });
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [fromCurrency]);

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

  const inputs = (
    <div className="space-y-6">
      <div>
        <label className="input-label">Amount & Source Currency</label>
        <div className="relative mb-3">
          <input 
            type="number" 
            className="input-field text-xl font-bold py-4 pr-16" 
            value={amount} 
            onChange={e => setAmount(Number(e.target.value))} 
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-muted">{fromCurrency}</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg border border-border-color">
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

      <div className="flex justify-center">
        <button 
            onClick={swapCurrencies}
            className="p-3 bg-primary text-white rounded-full shadow-lg hover:rotate-180 transition-all duration-500"
            title="Swap Currencies"
        >
            <ArrowRightLeft size={20} />
        </button>
      </div>

      <div>
        <label className="input-label">Target Currency</label>
        <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg border border-border-color">
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
  );

  const results = (
    <div className="space-y-6">
      <div className="p-6 bg-success/10 rounded-2xl border border-success/30 text-center">
        <p className="text-xs font-bold uppercase tracking-widest mb-2 text-success opacity-70">Converted Amount</p>
        <div className="text-4xl font-black text-white flex items-center justify-center gap-2">
           {loading ? <Loader2 className="animate-spin text-success" /> : result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
           <span className="text-xl text-success">{toCurrency}</span>
        </div>
      </div>

      <div className="p-4 bg-white-5 rounded-lg border border-white-10 text-center">
          <p className="text-sm text-muted">
             {loading ? 'Refreshing rates...' : `Live Exchange Rate: 1 ${fromCurrency} = ${rates[toCurrency]?.toFixed(4)} ${toCurrency}`}
          </p>
          {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        Moving money across borders? Our Currency Converter provides real-time exchange rates for over 160 global currencies. Whether you're traveling, shopping overseas, or managing international business, stay up-to-date with live market data.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Select Source:</strong> Pick the currency you currently have.</li>
        <li><strong>Select Target:</strong> Choose the currency you want to receive.</li>
        <li><strong>Enter Amount:</strong> Type the value you wish to convert.</li>
        <li><strong>View Conversion:</strong> Our engine automatically fetches the latest interbank rates to give you a precise result.</li>
      </ul>
    </div>
  );

  const formula = "Target Amount = Source Amount × Exchange Rate";

  const examples = [
    {
      title: "Online Shopping (USD to AUD)",
      description: "If you're buying a $50 USD item from an Australian store, with an exchange rate of 1.53, you would be paying approximately $76.50 AUD (excluding international transaction fees)."
    },
    {
      title: "Holiday Budgeting (GBP to JPY)",
      description: "Allocating £1,000 for a trip to Tokyo with a rate of 192 JPY per Pound would give you a budget of ¥192,000 Yen."
    }
  ];

  const faqs = [
    {
      q: "How often are the exchange rates updated?",
      a: "Our rates are updated every 24 hours on the free tier, reflecting the current interbank market price."
    },
    {
      q: "Is this the same rate I'll get at the bank?",
      a: "No. Banks and exchange kiosks usually apply a 'spread' or commission of 2% to 10% on top of the interbank rate. This tool shows the 'mid-market' rate, which is the truest value of the currency."
    },
    {
      q: "Can I convert Cryptocurrencies?",
      a: "Yes! Our system supports top-tier crypto assets like BTC (Bitcoin) and ETH (Ethereum) against standard fiat currencies."
    }
  ];

  return (
    <CalculatorLayout 
      title="Currency Converter"
      seoTitle="Live Currency Converter - Real-Time Exchange Rates"
      description="Convert 160+ world currencies with our live currency converter. Get real-time exchange rates, charts, and accurate financial data instantly."
      path="/conversion/currency-converter"
      icon={Coins}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
    />
  );
}
