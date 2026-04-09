import React, { useState } from 'react';
import SEO from '../../components/SEO';
import AdPlaceholder from '../../components/AdPlaceholder';

export default function BasicCalculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (num) => {
    if (display === '0' || display === 'Error') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op) => {
    if (display === 'Error') return;
    setEquation(equation + display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculateResult = () => {
    if (display === 'Error') return;
    try {
      // Evaluate the equation string securely
      const finalEquation = equation + display;
      // Note: In a real prod environment we'd use a parser, but for this basic app eval with strict sanitization is a functional proxy.
      const sanitized = finalEquation.replace(/[^-()\d/*+.]/g, ''); 
      const result = new Function('return ' + sanitized)();
      
      // Handle division by zero
      if (!isFinite(result)) {
        setDisplay('Error');
        setEquation('');
        return;
      }

      // Format result nicely
      const formattedResult = Number.isInteger(result) ? result.toString() : parseFloat(result.toFixed(8)).toString();
      setDisplay(formattedResult);
      setEquation('');
    } catch (e) {
      setDisplay('Error');
      setEquation('');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const handleDecimal = () => {
    if (display === 'Error') return;
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const toggleSign = () => {
    if (display === 'Error' || display === '0') return;
    setDisplay(display.startsWith('-') ? display.substring(1) : '-' + display);
  };

  const handlePercentage = () => {
    if (display === 'Error' || display === '0') return;
    const value = parseFloat(display) / 100;
    setDisplay(value.toString());
  };

  const btnClass = "p-4 text-2xl font-medium rounded-2xl transition-all shadow-sm active:scale-95 hover:-translate-y-1";
  const numDark = "bg-white border text-text-main hover:bg-gray-50";
  const opBlue = "bg-primary text-white shadow-md hover:bg-primary-dark";
  const specialGray = "bg-secondary text-primary font-bold hover:brightness-95";

  return (
    <div className="container">
      <SEO 
        title="Basic Calculator | Free Online Arithmetic Tool" 
        description="A fast, free online basic calculator for standard arithmetic operations: addition, subtraction, multiplication, division, and percentages." 
        path="/math/basic-calculator"
      />
      
      <AdPlaceholder text="Top Banner Ad - Default" />

      <div className="max-width-xl mx-auto my-12 px-4">
        <h1 className="text-3xl md:text-5xl font-black mb-4 text-center tracking-tight">Basic Calculator</h1>
        <p className="text-muted mb-10 text-center max-width-2xl mx-auto">A hyper-fast online tool for everyday math.</p>

        <div className="glass-panel rounded-3xl p-6 shadow-2xl relative overflow-hidden">
          {/* Animated Background Blob inside calculator */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-5 rounded-full blur-2xl animate-pulse-ring"></div>

          {/* Screen Display */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-inner text-right border-2 border-border-color relative z-10 flex flex-col justify-end min-h-[140px]">
             <div className="text-muted text-lg min-h-[1.5rem] font-mono tracking-widest truncate">{equation}</div>
             <div className="text-5xl font-black tracking-tight mt-1 truncate" style={{ fontFamily: "monospace" }}>{display}</div>
          </div>

          {/* Keypad Grid */}
          <div className="grid grid-cols-4 gap-3 relative z-10">
            <button onClick={handleClear} className={`${btnClass} ${specialGray}`}>AC</button>
            <button onClick={toggleSign} className={`${btnClass} ${specialGray}`}>+/-</button>
            <button onClick={handlePercentage} className={`${btnClass} ${specialGray}`}>%</button>
            <button onClick={() => handleOperator('/')} className={`${btnClass} ${opBlue}`}>÷</button>

            <button onClick={() => handleNumber('7')} className={`${btnClass} ${numDark}`}>7</button>
            <button onClick={() => handleNumber('8')} className={`${btnClass} ${numDark}`}>8</button>
            <button onClick={() => handleNumber('9')} className={`${btnClass} ${numDark}`}>9</button>
            <button onClick={() => handleOperator('*')} className={`${btnClass} ${opBlue}`}>×</button>

            <button onClick={() => handleNumber('4')} className={`${btnClass} ${numDark}`}>4</button>
            <button onClick={() => handleNumber('5')} className={`${btnClass} ${numDark}`}>5</button>
            <button onClick={() => handleNumber('6')} className={`${btnClass} ${numDark}`}>6</button>
            <button onClick={() => handleOperator('-')} className={`${btnClass} ${opBlue}`}>-</button>

            <button onClick={() => handleNumber('1')} className={`${btnClass} ${numDark}`}>1</button>
            <button onClick={() => handleNumber('2')} className={`${btnClass} ${numDark}`}>2</button>
            <button onClick={() => handleNumber('3')} className={`${btnClass} ${numDark}`}>3</button>
            <button onClick={() => handleOperator('+')} className={`${btnClass} ${opBlue}`}>+</button>

            <button onClick={() => handleNumber('0')} className={`${btnClass} ${numDark} col-span-2 text-left pl-8`}>0</button>
            <button onClick={handleDecimal} className={`${btnClass} ${numDark}`}>.</button>
            <button onClick={calculateResult} className={`${btnClass} bg-success text-white hover:bg-emerald-600 shadow-md`}>=</button>
          </div>
        </div>
      </div>
      
      <AdPlaceholder text="Bottom Content Ad" />
    </div>
  );
}
