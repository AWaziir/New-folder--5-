import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

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
      const finalEquation = equation + display;
      const sanitized = finalEquation.replace(/[^-()\d/*+.]/g, ''); 
      const result = new Function('return ' + sanitized)();
      
      if (!isFinite(result)) {
        setDisplay('Error');
        setEquation('');
        return;
      }

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

  const btnClass = "h-16 md:h-20 text-xl font-bold rounded-2xl transition-all shadow-sm active:scale-95 flex items-center justify-center border-b-4";
  const numBtn = "bg-white border-slate-200 text-slate-800 hover:bg-slate-50 border-b-slate-300";
  const opBtn = "bg-primary border-primary-hover text-white shadow-lg shadow-primary/20 border-b-primary-hover/50 hover:brightness-110";
  const specialBtn = "bg-slate-100 border-slate-200 text-primary border-b-slate-300 hover:bg-slate-200";
  const successBtn = "bg-emerald-500 border-emerald-600 text-white shadow-lg shadow-emerald-500/20 border-b-emerald-700 hover:brightness-110";

  const inputs = (
    <div className="bg-slate-900 p-6 md:p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden border-8 border-slate-800">
       {/* Screen Display */}
       <div className="bg-[#1e293b] rounded-3xl p-8 mb-8 shadow-inner text-right border border-white/5 relative z-10 flex flex-col justify-end min-h-[160px] group">
          <div className="text-primary-light/40 text-sm min-h-[1.5rem] font-mono tracking-widest truncate mb-2">{equation}</div>
          <div className="text-5xl font-black tracking-tighter text-white truncate animate-fade-in" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {display}
          </div>
          {/* Subtle Glow */}
          <div className="absolute inset-0 bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
       </div>

       {/* Keypad Grid */}
       <div className="grid grid-cols-4 gap-3 md:gap-4 relative z-10">
         <button onClick={handleClear} className={`${btnClass} ${specialBtn}`}>AC</button>
         <button onClick={toggleSign} className={`${btnClass} ${specialBtn}`}>+/-</button>
         <button onClick={handlePercentage} className={`${btnClass} ${specialBtn}`}>%</button>
         <button onClick={() => handleOperator('/')} className={`${btnClass} ${opBtn}`}>÷</button>

         <button onClick={() => handleNumber('7')} className={`${btnClass} ${numBtn}`}>7</button>
         <button onClick={() => handleNumber('8')} className={`${btnClass} ${numBtn}`}>8</button>
         <button onClick={() => handleNumber('9')} className={`${btnClass} ${numBtn}`}>9</button>
         <button onClick={() => handleOperator('*')} className={`${btnClass} ${opBtn}`}>×</button>

         <button onClick={() => handleNumber('4')} className={`${btnClass} ${numBtn}`}>4</button>
         <button onClick={() => handleNumber('5')} className={`${btnClass} ${numBtn}`}>5</button>
         <button onClick={() => handleNumber('6')} className={`${btnClass} ${numBtn}`}>6</button>
         <button onClick={() => handleOperator('-')} className={`${btnClass} ${opBtn}`}>-</button>

         <button onClick={() => handleNumber('1')} className={`${btnClass} ${numBtn}`}>1</button>
         <button onClick={() => handleNumber('2')} className={`${btnClass} ${numBtn}`}>2</button>
         <button onClick={() => handleNumber('3')} className={`${btnClass} ${numBtn}`}>3</button>
         <button onClick={() => handleOperator('+')} className={`${btnClass} ${opBtn}`}>+</button>

         <button onClick={() => handleNumber('0')} className={`${btnClass} ${numBtn} col-span-2 !justify-start pl-10`}>0</button>
         <button onClick={handleDecimal} className={`${btnClass} ${numBtn}`}>.</button>
         <button onClick={calculateResult} className={`${btnClass} ${successBtn}`}>=</button>
       </div>
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>Our <strong>Basic Calculator</strong> is designed for fast, reliable everyday arithmetic. Whether you are splitting a bill, checking a receipt, or helping with homework, it provides an intuitive interface that works seamlessly on any device.</p>
      <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
        <li><strong>Standard Order:</strong> Operations are processed as you enter them. For complex algebraic order of operations, use our Scientific Calculator.</li>
        <li><strong>Memory:</strong> The top display tracks your current equation history for easy double-checking.</li>
        <li><strong>Precision:</strong> Results are displayed with up to 8 decimal points for accuracy.</li>
      </ul>
    </div>
  );

  const formula = "Result = x [op] y   (Basic Arithmetic)";

  const examples = [
    { title: "Split a Bill", description: "Calculating a $150 dinner bill split 4 ways? Simply enter 150 ÷ 4 = $37.50." },
    { title: "Shopping Discount", description: "Want to find 20% of $80? Enter 80 × 20 % = $16." }
  ];

  const faqs = [
    { q: "What does 'AC' stand for?", a: "AC stands for 'All Clear'. It resets both the current display and the entire equation history back to zero." },
    { q: "Can I use negative numbers?", a: "Yes. Use the +/- button to toggle the sign of the currently displayed number between positive and negative." },
    { q: "Does it support brackets?", a: "This basic version processes linear arithmetic. For brackets and complex nested equations, please use our Scientific Calculator." }
  ];

  const whyUse = [
    { title: "Zero Latency", text: "Instant calculations without page reloads or server delays." },
    { title: "Privacy First", text: "Calculations run entirely in your browser. Your data is never saved or shared." },
    { title: "Mobile Optimized", text: "Large buttons designed for easy touch-screen interaction on any smartphone." },
    { title: "Equation Tracking", text: "See your full operation history at the top of the screen to prevent mistakes." }
  ];

  const keyFeatures = [
    { title: "Large Tactile Buttons", text: "Designed to mimic professional handheld calculators for a familiar user experience." },
    { title: "Dark Mode Display", text: "High-contrast digital screen for maximum legibility in any lighting condition." },
    { title: "One-Click Clear", text: "Quickly reset your work and start over without multiple clicks." }
  ];

  const proTips = [
    "Use the % button immediately after a number to convert it to its decimal equivalent (e.g., 20 % = 0.2).",
    "Double check the top history line before clicking '=' to ensure you entered the numbers correctly.",
    "For complex financial math like interest rates, consider using our dedicated Compound Interest tools.",
    "On desktop, you can often use your physical numeric keypad for even faster input."
  ];

  const relatedTools = [
    { name: "Scientific Calculator", path: "/math/scientific-calculator" },
    { name: "Percentage Calculator", path: "/math/percentage-calculator" },
    { name: "Fraction Calculator", path: "/math/fraction-calculator" },
    { name: "Statistics Calculator", path: "/math/average-calculator" }
  ];

  return (
    <CalculatorLayout
      title="Basic Calculator"
      seoTitle="Basic Calculator - Free Online Arithmetic Tool"
      description="Perform quick addition, subtraction, multiplication, and division with our free, high-performance basic online calculator."
      path="/math/basic-calculator"
      icon={Calculator}
      inputs={inputs}
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
