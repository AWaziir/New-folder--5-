import React, { useState } from 'react';
import AdPlaceholder from '../../components/AdPlaceholder';
import SEO from '../../components/SEO';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');

  const handleInput = (val) => {
    if (display === '0' && val !== '.') {
      setDisplay(val);
    } else {
      setDisplay(display + val);
    }
  };

  const clear = () => {
    setDisplay('0');
    setExpression('');
  };

  const calculate = () => {
    try {
      let processed = display
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/PI/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/\^/g, '**');

      const openCount = (processed.match(/\(/g) || []).length;
      const closeCount = (processed.match(/\)/g) || []).length;
      if (openCount > closeCount) {
          processed += ')'.repeat(openCount - closeCount);
      }

      const result = new Function(`return ${processed}`)();
      
      if (result === undefined || isNaN(result) || !isFinite(result)) {
          throw new Error('Invalid');
      }

      setExpression(display + ' =');
      setDisplay(String(Number(result.toFixed(8))));
    } catch (e) {
      setDisplay('Error');
    }
  };

  const buttons = [
    ['sin(', 'cos(', 'tan(', '(', ')'],
    ['log(', 'ln(', 'sqrt(', '^', 'PI'],
    ['7', '8', '9', '/', 'C'],
    ['4', '5', '6', '*', 'e'],
    ['1', '2', '3', '-', 'Exp'],
    ['0', '.', '=', '+', 'del']
  ];

  return (
    <div className="container">
      <SEO 
        title="Scientific Calculator Online – Free, Fast & Accurate" 
        description="Powerful online scientific calculator for algebra, trigonometry, and statistics. Free tool with sin, cos, tan, log, and more functions." 
        path="/math/scientific-calculator"
      />
      
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8 px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-center">Scientific Calculator</h1>
        
        <div className="card shadow-2xl bg-primary-dark p-6 rounded-3xl max-width-lg mx-auto overflow-hidden border-2 border-white border-opacity-10">
           {/* Display Slot */}
           <div className="bg-black bg-opacity-60 p-6 rounded-2xl mb-6 text-right font-mono min-h-[140px] flex flex-col justify-end shadow-inner border border-white border-opacity-10">
              <div className="text-primary-light text-sm font-bold opacity-80 mb-2 truncate">{expression}</div>
              <div className="text-white text-4xl font-bold truncate leading-tight">{display}</div>
           </div>

           {/* Buttons Grid */}
           <div className="grid grid-cols-5 gap-2 md:gap-3">
              {buttons.flat().map((btn, i) => {
                const isOp = ['/', '*', '-', '+'].includes(btn);
                const isSci = ['sin(', 'cos(', 'tan(', 'log(', 'ln(', 'sqrt(', '^', 'PI', 'e', '(', ')', 'Exp'].includes(btn);
                const isAction = btn === '=' || btn === 'C' || btn === 'del';
                
                let bgColor = 'bg-white bg-opacity-20';
                let textColor = 'text-white';
                
                if (btn === '=') { bgColor = 'bg-primary'; textColor = 'text-white'; }
                else if (btn === 'C' || btn === 'del') { bgColor = 'bg-red-500'; textColor = 'text-white'; }
                else if (isOp) { bgColor = 'bg-primary-dark border border-primary-light border-opacity-30'; textColor = 'text-primary-light'; }
                else if (isSci) { bgColor = 'bg-white bg-opacity-5'; textColor = 'text-primary-light text-opacity-80'; }

                return (
                  <button
                    key={i}
                    onClick={() => {
                        if (btn === '=') calculate();
                        else if (btn === 'C') clear();
                        else if (btn === 'del') setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
                        else if (btn === 'Exp') handleInput('*10^');
                        else handleInput(btn);
                    }}
                    className={`
                      ${bgColor} ${textColor}
                      py-4 md:py-5 rounded-xl font-bold text-sm transition-all active:scale-95 hover:brightness-125
                      shadow-sm flex items-center justify-center
                    `}
                  >
                    {btn === 'Exp' ? 'Exp' : btn.replace('(', '')}
                  </button>
                );
              })}
           </div>
        </div>

        <section className="mt-16 space-y-12">
            <div className="card">
                <h2 className="text-2xl font-bold mb-4">Why Use an Online Scientific Calculator?</h2>
                <p className="text-muted leading-relaxed">
                    A scientific calculator is an essential tool for students, engineers, and scientists. Unlike a basic calculator, it supports a wide range of advanced functions including trigonometry (sin, cos, tan), logarithms (log, ln), and exponential growth. Our free online calculator is designed to be accessible on any device, providing precision and speed for your complex math problems.
                </p>
                <div className="grid md:grid-cols-2 gap-8 mt-6">
                    <div className="p-5 bg-secondary rounded-xl border border-primary-light border-opacity-20">
                        <h3 className="font-bold text-primary mb-2">Trigonometry Support</h3>
                        <p className="text-sm text-muted">Solve complex Sine, Cosine, and Tangent problems instantly in your browser.</p>
                    </div>
                    <div className="p-5 bg-secondary rounded-xl border border-primary-light border-opacity-20">
                        <h3 className="font-bold text-primary mb-2">Scientific Notation</h3>
                        <p className="text-sm text-muted">Use the "Exp" and logarithms for handling extremely large or small numbers.</p>
                    </div>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
}
