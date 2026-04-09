import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Printer, Share2, Calculator, Info } from 'lucide-react';
import AdPlaceholder from '../../components/AdPlaceholder';

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
  const [copied, setCopied] = useState(false);

  // Update URL and calculate when inputs change
  useEffect(() => {
    const newParams = {
      amount: loanAmount.toString(),
      term: loanTerm.toString(),
      rate: interestRate.toString()
    };
    setSearchParams(newParams, { replace: true });
    calculateLoan();
  }, [loanAmount, loanTerm, interestRate, setSearchParams]);

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

    // Generate amortization schedule summarize by year
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

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setLoanAmount(10000);
    setLoanTerm(5);
    setInterestRate(5);
  };

  const chartData = result ? [
    { name: 'Principal', value: Number(loanAmount), color: '#3b82f6' },
    { name: 'Total Interest', value: Number(result.totalInterest), color: '#8b5cf6' }
  ] : [];

  return (
    <div className="container">
      <AdPlaceholder text="Top Banner Ad" />

      <div className="max-width-4xl mx-auto my-8">
        <div className="flex justify-between items-end mb-6 print-hide">
            <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2 text-primary-light">
                    <Calculator className="w-8 h-8 text-primary" />
                    Loan Calculator
                </h1>
                <p className="text-muted">Determine your monthly payment and total interest for any type of loan.</p>
            </div>
            <div className="flex gap-2">
                <button onClick={handleShare} className="btn-outline flex items-center gap-2">
                    <Share2 className="w-4 h-4" /> {copied ? 'Copied!' : 'Share Link'}
                </button>
                <button onClick={handlePrint} className="btn-outline flex items-center gap-2">
                    <Printer className="w-4 h-4" /> Print
                </button>
            </div>
        </div>

        {/* Print-only Header */}
        <div className="hidden print:block mb-8">
           <h1 className="text-3xl font-bold text-black border-b border-gray-400 pb-2 mb-4">Loan Calculator Report</h1>
           <p className="text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
        </div>

        <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Loan Details</h2>
            
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

            <button onClick={resetForm} className="btn-outline w-full mt-4 print-hide">
              Reset
            </button>
          </div>

          <div>
            <div className="card sticky top-24">
              <h2 className="text-xl font-bold mb-6">Results</h2>
              
              {result ? (
                <div>
                  <div className="mb-6 p-4 bg-secondary rounded-lg text-center">
                    <p className="text-muted mb-1 font-medium">Monthly Payment</p>
                    <p className="text-4xl font-bold text-primary-light">${Number(result.monthlyPayment).toLocaleString()}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-border-color pb-2">
                      <span className="text-muted">Total Interest</span>
                      <span className="font-bold">${Number(result.totalInterest).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-b border-border-color pb-2 mt-2">
                      <span className="text-muted">Total Payback</span>
                      <span className="font-bold">${Number(result.totalPayment).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Chart section */}
                  <div className="mt-8 h-48 print-hide">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={75}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                </div>
              ) : (
                <div className="py-8 text-center text-muted">
                  Enter valid values to calculate.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Amortization Schedule (Print & Web) */}
        {schedule.length > 0 && (
          <div className="mt-8 card overflow-x-auto">
             <h2 className="text-xl font-bold mb-4">Annual Amortization Schedule</h2>
             <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-border-color">
                        <th className="py-2 px-2 text-muted font-medium">Year</th>
                        <th className="py-2 px-2 text-muted font-medium">Principal Paid</th>
                        <th className="py-2 px-2 text-muted font-medium">Interest Paid</th>
                        <th className="py-2 px-2 text-muted font-medium">Remaining Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {schedule.map((row) => (
                        <tr key={row.year} className="border-b border-border-color/50">
                            <td className="py-3 px-2 font-medium">{row.year}</td>
                            <td className="py-3 px-2">${Number(row.principal).toLocaleString()}</td>
                            <td className="py-3 px-2">${Number(row.interest).toLocaleString()}</td>
                            <td className="py-3 px-2">${Number(row.balance).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
             </table>
          </div>
        )}

        {/* SEO & Educational Content */}
        <div className="mt-12 card print-hide bg-secondary/30 mb-8 border-t-4 border-t-primary border-l-0 border-r-0 border-b-0 rounded-none">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Info className="w-6 h-6 text-primary" />
              How the Loan Calculator Works
          </h2>
          
          <div className="space-y-6 text-muted leading-relaxed">
            <section>
                <h3 className="text-xl font-semibold text-white mb-2">What is a Loan Calculator?</h3>
                <p>
                    A loan calculator is a powerful tool designed to help you determine the monthly payments and the total financial cost associated with borrowing money. Whether you are looking at a personal loan, an auto loan, or a mortgage, understanding your payment schedule is the first step in responsible financial planning. By adjusting the loan amount, term, and interest rate, you can visualize how different variables affect your monthly constraints and long-term financial health.
                </p>
            </section>

            <section>
                <h3 className="text-xl font-semibold text-white mb-2">The Loan Formula</h3>
                <p className="mb-4">The standard mathematical formula used to calculate the fixed monthly payment for a fully amortizing loan is:</p>
                
                <div className="bg-main p-6 rounded-xl border border-border-color font-mono text-center my-4 overflow-x-auto text-primary-light">
                    M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1 ]
                </div>
                
                <ul className="list-none space-y-2 mt-4 ml-2">
                    <li className="flex gap-2"><span className="text-primary font-bold w-6">M</span> <span className="flex-1">= Total monthly payment</span></li>
                    <li className="flex gap-2"><span className="text-primary font-bold w-6">P</span> <span className="flex-1">= The principal loan amount (the initial amount you borrow)</span></li>
                    <li className="flex gap-2"><span className="text-primary font-bold w-6">i</span> <span className="flex-1">= Monthly interest rate (your yearly interest rate divided by 12)</span></li>
                    <li className="flex gap-2"><span className="text-primary font-bold w-6">n</span> <span className="flex-1">= Number of months (your loan term in years multiplied by 12)</span></li>
                </ul>
            </section>

            <section>
                <h3 className="text-xl font-semibold text-white mb-2">Why Does Amortization Matter?</h3>
                <p className="mb-3">
                    Amortization refers to the process of paying off debt with a fixed repayment schedule in regular installments over time. In an amortized loan, your initial payments primarily go toward covering the interest fee. As the term progresses, a larger portion of each payment goes toward paying down the principal balance.
                </p>
                <p>
                    This is why longer-term loans result in significantly higher total interest paid, even if the monthly payment is lower. Using our amortization schedule above, you can see exactly how much of your money is going to the lender versus reducing your debt each year.
                </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
