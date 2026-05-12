import React, { useState, useEffect } from 'react';
import { Calculator, Delete } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [isRad, setIsRad] = useState(true); // Toggle between Radian and Degree

  const handleInput = (val) => {
    if (display === '0' && val !== '.' && val !== '0') {
      setDisplay(val);
    } else if (display === 'Error') {
      setDisplay(val);
      setExpression('');
    } else {
      setDisplay(display + val);
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setExpression('');
  };

  const backspace = () => {
    if (display.length > 1 && display !== 'Error') {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const calculate = () => {
    try {
      let processed = display;

      // Handle Degrees vs Radians for trig functions
      const trigSuffix = isRad ? '(' : '((Math.PI/180)*';
      const trigClose = isRad ? '' : ')';

      processed = processed
        .replace(/sin\(/g, `Math.sin${trigSuffix}`)
        .replace(/cos\(/g, `Math.cos${trigSuffix}`)
        .replace(/tan\(/g, `Math.tan${trigSuffix}`)
        .replace(/asin\(/g, `Math.asin${trigSuffix}`)
        .replace(/acos\(/g, `Math.acos${trigSuffix}`)
        .replace(/atan\(/g, `Math.atan${trigSuffix}`)
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/\^/g, '**')
        .replace(/\|([^\|]+)\|/g, 'Math.abs($1)');

      // Auto close parens if deg is used and parens are omitted, but let's just do standard auto-close
      const openCount = (processed.match(/\(/g) || []).length;
      const closeCount = (processed.match(/\)/g) || []).length;
      if (openCount > closeCount) {
        processed += ')'.repeat(openCount - closeCount);
      }

      // Handle factorial
      processed = processed.replace(/(\d+)!/g, (match, num) => {
        let n = parseInt(num);
        if (n === 0 || n === 1) return '1';
        let res = 1;
        for (let i = 2; i <= n; i++) res *= i;
        return res.toString();
      });

      const result = new Function(`return ${processed}`)();

      if (result === undefined || isNaN(result) || !isFinite(result)) {
        throw new Error('Invalid');
      }

      setExpression(display + ' =');
      
      // Formatting to prevent overly long decimals, but preserve integers
      let formattedResult = Number(result.toFixed(10));
      setDisplay(String(formattedResult));
    } catch (e) {
      setDisplay('Error');
    }
  };

  const funcKeys = [
    ['sin(', 'cos(', 'tan(', 'deg/rad'],
    ['asin(', 'acos(', 'atan(', 'π'],
    ['sqrt(', '^', 'log(', 'e'],
    ['ln(', '|x|', '!', 'ans'],
    ['(', ')', '%', 'Exp']
  ];

  const mainKeys = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+']
  ];

  const handleFuncKey = (btn) => {
    if (btn === 'deg/rad') {
      setIsRad(!isRad);
      return;
    }
    if (btn === 'ans') return; // Stub for Ans
    if (btn === '|x|') {
      handleInput('|');
      return;
    }
    if (btn === 'Exp') {
      handleInput('*10^');
      return;
    }
    if (btn === '%') {
      handleInput('/100');
      return;
    }
    handleInput(btn);
  };

  // Build Desmos-style Full Width UI
  const desmosUI = (
    <div className="max-w-4xl mx-auto card shadow-lg bg-[#f0f4f8] rounded-xl overflow-hidden border border-slate-300">
      
      {/* Display Area */}
      <div className="bg-white p-6 border-b border-slate-300 min-h-[160px] flex flex-col justify-between shadow-sm relative">
        <div className="text-right">
          <div className="text-slate-500 text-lg font-medium opacity-80 mb-2 truncate h-7">{expression}</div>
          <div className="text-slate-900 text-5xl md:text-6xl font-normal truncate tracking-tight">{display}</div>
        </div>
        
        {/* Toggle Indicator */}
        <div className="absolute bottom-4 left-6 text-sm font-bold text-slate-400">
           {isRad ? 'RAD' : 'DEG'}
        </div>
      </div>

      {/* Control Bar (Clear/Backspace on Desktop, or merged) */}
      <div className="bg-[#f0f4f8] pt-4 px-4 flex justify-end gap-2">
         <button onClick={clearAll} className="px-6 py-2 bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold rounded shadow-sm border border-slate-300 transition-colors">
            Clear All
         </button>
         <button onClick={backspace} className="px-6 py-2 bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold rounded shadow-sm border border-slate-300 flex items-center justify-center transition-colors">
            <Delete className="w-5 h-5" />
         </button>
      </div>

      {/* Keypads Area */}
      <div className="p-4 flex flex-col md:flex-row gap-4">
        
        {/* Left Pad (Functions) */}
        <div className="flex-[1] grid grid-cols-4 gap-2">
           {funcKeys.flat().map((btn, i) => (
              <button
                key={i}
                onClick={() => handleFuncKey(btn)}
                className={`
                  ${btn === 'deg/rad' ? (isRad ? 'bg-slate-200 text-slate-800' : 'bg-primary text-white') : 'bg-slate-50 text-slate-700 hover:bg-white'}
                  py-4 rounded font-medium text-sm md:text-base border border-slate-300 shadow-sm active:bg-slate-200 transition-colors
                  flex items-center justify-center
                `}
              >
                {btn === 'deg/rad' ? (isRad ? 'Rad' : 'Deg') : btn.replace('(', '')}
              </button>
           ))}
        </div>

        {/* Right Pad (Numpad) */}
        <div className="flex-[1] grid grid-cols-4 gap-2">
           {mainKeys.flat().map((btn, i) => {
              const isOp = ['/', '*', '-', '+'].includes(btn);
              const isEq = btn === '=';
              const isNum = !isOp && !isEq;

              return (
                <button
                  key={i}
                  onClick={() => {
                      if (isEq) calculate();
                      else handleInput(btn);
                  }}
                  className={`
                    ${isEq ? 'bg-[#2d70b3] text-white hover:bg-[#205a96] border-[#205a96]' : 
                      isOp ? 'bg-slate-200 text-slate-800 hover:bg-slate-300 border-slate-300' : 
                      'bg-white text-slate-900 hover:bg-slate-50 border-slate-300'}
                    py-4 rounded font-bold text-lg border shadow-sm active:scale-95 transition-transform
                    flex items-center justify-center
                  `}
                >
                  {btn}
                </button>
              )
           })}
        </div>

      </div>
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        A scientific calculator is an essential tool for students, engineers, and scientists. Unlike a basic calculator, it supports a wide range of advanced functions including trigonometry (sin, cos, tan), logarithms (log, ln), and exponential growth.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Trigonometry Support:</strong> Solve complex Sine, Cosine, and Tangent problems instantly in your browser. Note: Angles can be toggled between Degrees and Radians.</li>
        <li><strong>Scientific Notation:</strong> Use the "Exp" and logarithms for handling extremely large or small numbers.</li>
        <li><strong>Order of Operations:</strong> Use parentheses <code>()</code> to explicitly dictate the order of complex calculations.</li>
      </ul>
    </div>
  );

  const formula = "Computations are evaluated using standard mathematical order of operations (PEMDAS).";

  const examples = [
    {
      title: "Pythagorean Theorem",
      description: "Finding the hypotenuse if sides are 3 and 4: calculate sqrt(3^2 + 4^2) = 5."
    },
    {
      title: "Compound Interest Exponents",
      description: "Calculating growth over 10 years at 5%: 1.05^10. This gives the multiplier for your initial investment."
    }
  ];

  const faqs = [
    {
      q: "Does this use degrees or radians?",
      a: "You can toggle between Degrees and Radians using the Deg/Rad button on the keypad. The active mode is displayed in the bottom left corner of the screen."
    },
    {
      q: "What does 'e' mean?",
      a: "It represents Euler's number (approx 2.71828), which is the base of the natural logarithm, widely used in compound interest and calculus."
    }
  ];

  const whyUse = [
    { title: "Advanced Math", text: "Solve complex equations that go far beyond the capabilities of a standard calculator." },
    { title: "Engineering & Science", text: "Crucial for physics, chemistry, and engineering tasks that require trigonometry or logarithms." },
    { title: "Academic Standard", text: "Functions exactly like a physical scientific calculator used in high schools and universities." },
    { title: "Browser Convenience", text: "No need to download apps; access powerful computing directly from your browser." }
  ];

  const keyFeatures = [
    { title: "Trigonometric Functions", text: "Calculate sine, cosine, and tangent instantly (evaluated in radians)." },
    { title: "Logarithms & Exponents", text: "Handle natural logs, base-10 logs, and complex exponential growth equations." },
    { title: "Order of Operations", text: "Respects PEMDAS automatically, allowing you to use parentheses for grouping." }
  ];

  const proTips = [
    "Use the Deg/Rad toggle to quickly switch between angular measurements without doing manual conversions.",
    "Use the 'Exp' button as a shortcut for '* 10^' when entering scientific notation.",
    "Parentheses can be nested infinitely. Make sure you close as many as you open.",
    "Euler's number 'e' is pre-programmed for natural logarithm and compounding calculations."
  ];

  const relatedTools = [
    { name: "Basic Calculator", path: "/math/basic-calculator" },
    { name: "Statistics Calculator", path: "/math/statistics-calculator" },
    { name: "Percentage Calculator", path: "/math/percentage-calculator" },
    { name: "Random Number Generator", path: "/other/random-number-generator" }
  ];

  return (
    <CalculatorLayout
      title="Scientific Calculator"
      seoTitle="Advanced Online Scientific Calculator - Free & Accurate"
      description="Powerful online scientific calculator for algebra, trigonometry, and statistics. Free tool with sin, cos, tan, log, exponents, and more."
      path="/math/scientific-calculator"
      icon={Calculator}
      inputs={null}
      results={null}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
      whyUse={whyUse}
      keyFeatures={keyFeatures}
      proTips={proTips}
      relatedTools={relatedTools}
    >
      {/* We inject the Desmos UI as children so it spans full width instead of being constrained to the 50/50 inputs/results grid */}
      <div className="mb-12">
         {desmosUI}
      </div>
    </CalculatorLayout>
  );
}
