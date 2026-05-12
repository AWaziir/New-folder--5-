import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calculator } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function LoanCalculator() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize state from URL or defaults
  const initialAmount = Number(searchParams.get('amount')) || 10000;
  const initialTerm = Number(searchParams.get('term')) || 5;
  const initialRate = Number(searchParams.get('rate')) || 5;

  const [loanAmount, setLoanAmount] = useState(initialAmount);
  const [loanTerm, setLoanTerm] = useState(initialTerm);
  const [interestRate, setInterestRate] = useState(initialRate);
  
  const [result, setResult] = useState(null);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const newParams = {
      amount: loanAmount.toString(),
      term: loanTerm.toString(),
      rate: interestRate.toString()
    };
    setSearchParams(newParams, { replace: true });
    calculateLoan();
  }, [loanAmount, loanTerm, interestRate]);

  const calculateLoan = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (principal <= 0 || monthlyRate < 0 || numberOfPayments <= 0) {
      setResult(null);
      setSchedule([]);
      return;
    }

    let monthlyPayment;
    if (monthlyRate === 0) {
      monthlyPayment = principal / numberOfPayments;
    } else {
      monthlyPayment = 
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }
      
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalPayment: totalPayment.toFixed(2)
    });

    let balance = principal;
    const newSchedule = [];
    let yearlyInterest = 0;
    let yearlyPrincipal = 0;

    for (let i = 1; i <= numberOfPayments; i++) {
        const interestPaid = balance * monthlyRate;
        const principalPaid = monthlyPayment - interestPaid;
        balance -= principalPaid;
        if(balance < 0) balance = 0;
        
        yearlyInterest += interestPaid;
        yearlyPrincipal += principalPaid;

        if (i % 12 === 0 || i === numberOfPayments) {
           newSchedule.push({
               year: Math.ceil(i/12),
               interest: yearlyInterest.toFixed(2),
               principal: yearlyPrincipal.toFixed(2),
               balance: balance.toFixed(2)
           });
           yearlyInterest = 0;
           yearlyPrincipal = 0;
        }
    }
    setSchedule(newSchedule);
  };

  const chartData = [
    { name: 'Principal', value: Number(loanAmount), color: '#3b82f6' },
    { name: 'Total Interest', value: result ? Number(result.totalInterest) : 0, color: '#8b5cf6' }
  ];

  const inputs = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Loan Amount ($)</label>
        <input 
          type="number" 
          className="input-field" 
          value={loanAmount} 
          onChange={e => setLoanAmount(Number(e.target.value))} 
        />
      </div>

      <div className="input-group">
        <label className="input-label">Loan Term (years)</label>
        <input 
          type="number" 
          className="input-field" 
          value={loanTerm} 
          onChange={e => setLoanTerm(Number(e.target.value))} 
        />
      </div>

      <div className="input-group">
        <label className="input-label">Interest Rate (%)</label>
        <input 
          type="number" 
          step="0.01"
          className="input-field" 
          value={interestRate} 
          onChange={e => setInterestRate(Number(e.target.value))} 
        />
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6">
      {result ? (
        <>
          <div className="p-6 bg-primary/5 rounded-xl text-center border border-primary/20">
            <p className="text-xs font-bold uppercase opacity-80 mb-1">Monthly Payment</p>
            <p className="text-4xl font-black text-slate-900">${Number(result.monthlyPayment).toLocaleString()}</p>
          </div>
          
          <div className="space-y-3">
              <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-muted">Total Interest</span>
                <span className="font-bold text-slate-900">${Number(result.totalInterest).toLocaleString()}</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-muted">Total Payback</span>
                <span className="font-bold text-slate-900">${Number(result.totalPayment).toLocaleString()}</span>
              </div>
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <div className="py-12 text-center opacity-40">Please enter loan details.</div>
      )}
    </div>
  );

  const whyUse = [
    { title: "Financial Clarity", text: "Get a clear picture of your future monthly obligations before you commit to any debt." },
    { title: "Interest Optimization", text: "See exactly how much you'll pay in interest and explore ways to minimize it." },
    { title: "Strategic Planning", text: "Compare different terms and rates to find the perfect balance for your budget." },
    { title: "Amortization Insights", text: "Understand how your principal decreases over time through our detailed schedule." }
  ];

  const keyFeatures = [
    { title: "Real-time Calculations", text: "Results update instantly as you adjust any input parameter." },
    { title: "Visual Analytics", text: "Interactive charts help you visualize the ratio of principal vs. interest." },
    { title: "Full Amortization", text: "Access a complete breakdown of every payment over the entire loan term." }
  ];

  const proTips = [
    "Always check for prepayment penalties before making extra payments.",
    "A shorter loan term usually means a lower interest rate but higher monthly payments.",
    "Consider the APR (Annual Percentage Rate) for a truer cost of borrowing including fees.",
    "Use our 'Extra Payments' feature (coming soon) to see how much you can save."
  ];

  const relatedTools = [
    { name: "Mortgage Calculator", path: "/finance/mortgage-calculator" },
    { name: "Auto Loan Calculator", path: "/finance/auto-loan-calculator" },
    { name: "Interest Calculator", path: "/finance/interest-calculator" },
    { name: "Debt Payoff Calculator", path: "/finance/debt-payoff-calculator" }
  ];

  return (
    <>
      <CalculatorLayout 
        title="Loan Calculator"
        seoTitle="Advanced Loan EMI Calculator - Monthly Payment & Interest Analysis"
        description="Plan your finances with precision. Estimate monthly repayments, total interest costs, and view a comprehensive amortization schedule for any loan type."
        path="/finance/loan-calculator"
        icon={Calculator}
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
      
      {schedule.length > 0 && (
          <div className="container max-width-6xl mx-auto -mt-10 mb-20 px-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="card card-premium overflow-x-auto shadow-premium highlight-border">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">Annual Amortization Schedule</h2>
                        <p className="text-muted text-sm mt-1">Detailed breakdown of your loan repayment journey year-by-year.</p>
                    </div>
                    <div className="hidden md:block">
                        <span className="tag-badge">Precision Data</span>
                    </div>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 text-primary-light uppercase font-black text-xs tracking-widest">
                        <tr>
                            <th className="py-4 px-6 rounded-l-xl">Year</th>
                            <th className="py-4 px-6">Principal Paid</th>
                            <th className="py-4 px-6">Interest Paid</th>
                            <th className="py-4 px-6 rounded-r-xl">Remaining Balance</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {schedule.map((row) => (
                            <tr key={row.year} className="border-b border-slate-100 hover:bg-white/3 transition-colors group">
                                <td className="py-5 px-6 font-bold text-slate-900 group-hover:text-primary-light">{row.year}</td>
                                <td className="py-5 px-6 text-secondary">${Number(row.principal).toLocaleString()}</td>
                                <td className="py-5 px-6 text-red-600/80">${Number(row.interest).toLocaleString()}</td>
                                <td className="py-5 px-6 font-bold text-success">${Number(row.balance).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10 text-center">
                    <p className="text-xs text-muted">
                        <Info className="w-3 h-3 inline mr-1" /> 
                        This schedule is an estimate. Actual values may vary based on your lender's specific calculation method.
                    </p>
                </div>
            </div>
          </div>
      )}
    </>
  );
}
