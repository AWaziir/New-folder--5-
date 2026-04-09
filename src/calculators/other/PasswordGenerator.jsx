import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  
  const [password, setPassword] = useState('Click generate to create password');
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    if (!useUpper && !useLower && !useNumbers && !useSymbols) {
      setPassword('Please select at least one option');
      return;
    }

    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let validChars = '';
    if (useUpper) validChars += upperChars;
    if (useLower) validChars += lowerChars;
    if (useNumbers) validChars += numberChars;
    if (useSymbols) validChars += symbolChars;

    // Ensure at least one character from each selected pool
    let generatedPassword = '';
    if (useUpper) generatedPassword += upperChars.charAt(Math.floor(Math.random() * upperChars.length));
    if (useLower) generatedPassword += lowerChars.charAt(Math.floor(Math.random() * lowerChars.length));
    if (useNumbers) generatedPassword += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
    if (useSymbols) generatedPassword += symbolChars.charAt(Math.floor(Math.random() * symbolChars.length));

    // Pad the rest
    for (let i = generatedPassword.length; i < length; i++) {
        generatedPassword += validChars.charAt(Math.floor(Math.random() * validChars.length));
    }

    // Shuffle the result since the first few characters are predictable
    generatedPassword = generatedPassword.split('').sort(() => 0.5 - Math.random()).join('');
    
    setPassword(generatedPassword);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (password === 'Click generate to create password' || password === 'Please select at least one option') return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const InputPanel = (
    <div className="space-y-6">
      <div className="input-group">
        <div className="flex justify-between items-center mb-2">
            <label className="input-label mb-0">Password Length: {length}</label>
            <span className="text-secondary-foreground font-bold">{length} characters</span>
        </div>
        <input 
            type="range" 
            min="6" 
            max="64" 
            value={length} 
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-primary h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer p-4 bg-secondary rounded-xl group border border-transparent hover:border-primary/30 transition">
            <input type="checkbox" checked={useUpper} onChange={e => setUseUpper(e.target.checked)} className="w-5 h-5 accent-primary" />
            <span className="font-bold text-muted group-hover:text-primary transition flex-grow">Include Uppercase Letters</span>
            <span className="text-muted text-sm">(A-Z)</span>
        </label>
        
        <label className="flex items-center gap-3 cursor-pointer p-4 bg-secondary rounded-xl group border border-transparent hover:border-primary/30 transition">
            <input type="checkbox" checked={useLower} onChange={e => setUseLower(e.target.checked)} className="w-5 h-5 accent-primary" />
            <span className="font-bold text-muted group-hover:text-primary transition flex-grow">Include Lowercase Letters</span>
            <span className="text-muted text-sm">(a-z)</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer p-4 bg-secondary rounded-xl group border border-transparent hover:border-primary/30 transition">
            <input type="checkbox" checked={useNumbers} onChange={e => setUseNumbers(e.target.checked)} className="w-5 h-5 accent-primary" />
            <span className="font-bold text-muted group-hover:text-primary transition flex-grow">Include Numbers</span>
            <span className="text-muted text-sm">(0-9)</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer p-4 bg-secondary rounded-xl group border border-transparent hover:border-primary/30 transition">
            <input type="checkbox" checked={useSymbols} onChange={e => setUseSymbols(e.target.checked)} className="w-5 h-5 accent-primary" />
            <span className="font-bold text-muted group-hover:text-primary transition flex-grow">Include Symbols</span>
            <span className="text-muted text-sm">(!@#$)</span>
        </label>
      </div>

      <button className="btn-primary w-full mt-6 py-4 text-lg print-hide shadow-lg hover:shadow-primary/50 transition-all font-bold" onClick={generatePassword}>
        Generate Password
      </button>
    </div>
  );

  const ResultPanel = (
    <div className="flex flex-col h-full justify-center">
        <div className="mb-6 p-6 bg-secondary/50 rounded-xl border border-border-color text-center flex flex-col items-center justify-center relative overflow-hidden group">
            <p className="text-muted mb-4 font-medium uppercase tracking-wider text-sm">Your Secure Password</p>
            <div className="w-full break-all px-2 font-mono text-2xl md:text-3xl font-black text-primary-light drop-shadow-md tracking-wider selection:bg-primary/30">
                {password}
            </div>
            
            <button 
                onClick={copyToClipboard}
                disabled={password === 'Click generate to create password' || password === 'Please select at least one option'}
                className="mt-8 px-8 py-3 bg-white/5 hover:bg-primary/20 border border-white/10 rounded-full font-bold transition-all disabled:opacity-30 flex items-center gap-2"
            >
                {copied ? (
                    <>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-success"><path d="M20 6L9 17l-5-5"/></svg>
                        <span className="text-success">Copied!</span>
                    </>
                ) : (
                    <>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                        Copy to Clipboard
                    </>
                )}
            </button>
        </div>
        
        <div className="mt-4 p-4 rounded-lg bg-success/10 border border-success/30 text-success text-center text-sm">
            <strong>Security Note:</strong> This password is generated entirely within your browser. No data is sent to our servers.
        </div>
    </div>
  );

  const faqs = [
    {
      q: "Is this password generator completely secure and private?",
      a: "Yes. This tool uses client-side JavaScript, meaning the password is mathematically constructed locally inside your browser. Your generated passwords are never logged, tracked, or transmitted over the internet."
    },
    {
      q: "What makes a strong password?",
      a: "A strong password is generally at least 16 characters long and contains a randomized mix of uppercase letters, lowercase letters, numbers, and symbols. Predictable patterns or dictionary words make passwords highly vulnerable to brute-force dictionary attacks."
    }
  ];

  return (
    <CalculatorLayout
      title="Secure Password Generator"
      description="Create ultra-secure, random passwords in one click. 100% private and runs locally in your browser to keep you safe from hackers."
      path="/other/password-generator"
      icon={Lock}
      inputs={InputPanel}
      results={ResultPanel}
      faqs={faqs}
      instructions={<p>Adjust the slider to choose your password length, toggle the character types you want to include, and click Generate. Use the Copy button to instantly save it to your clipboard.</p>}
    />
  );
}
