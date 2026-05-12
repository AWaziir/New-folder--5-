import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Trash2, PieChart as PieIcon, DollarSign, Wallet, CreditCard, Home, Car, Heart, Briefcase, Zap } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const CATEGORIES = [
  { id: 'housing', name: 'Housing', icon: Home, color: '#245da2' },
  { id: 'transport', name: 'Transport', icon: Car, color: '#10b981' },
  { id: 'food', name: 'Food & Dining', icon: ShoppingCart, color: '#f59e0b' },
  { id: 'utilities', name: 'Utilities', icon: Zap, color: '#6366f1' },
  { id: 'health', name: 'Health & Wellness', icon: Heart, color: '#ef4444' },
  { id: 'entertainment', name: 'Entertainment', icon: Zap, color: '#ec4899' },
  { id: 'shopping', name: 'Shopping', icon: Briefcase, color: '#8b5cf6' },
  { id: 'other', name: 'Other', icon: Wallet, color: '#64748b' },
];

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Rent/Mortgage', amount: 1500, category: 'housing' },
    { id: 2, name: 'Groceries', amount: 400, category: 'food' },
    { id: 3, name: 'Car Payment', amount: 350, category: 'transport' },
    { id: 4, name: 'Electricity', amount: 120, category: 'utilities' },
  ]);
  const [newName, setNewName] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('housing');
  const [monthlyIncome, setMonthlyIncome] = useState(5000);
  const [chartData, setChartData] = useState([]);
  const [totals, setTotals] = useState({ total: 0, balance: 0, savingsRate: 0 });

  useEffect(() => {
    const total = expenses.reduce((sum, item) => sum + item.amount, 0);
    const balance = monthlyIncome - total;
    const savingsRate = monthlyIncome > 0 ? (balance / monthlyIncome) * 100 : 0;
    
    setTotals({ total, balance, savingsRate });

    // Prepare chart data
    const data = CATEGORIES.map(cat => {
      const catTotal = expenses
        .filter(e => e.category === cat.id)
        .reduce((sum, e) => sum + e.amount, 0);
      return { name: cat.name, value: catTotal, color: cat.color };
    }).filter(d => d.value > 0);
    
    setChartData(data);
  }, [expenses, monthlyIncome]);

  const addExpense = (e) => {
    e.preventDefault();
    if (!newName || !newAmount) return;
    const newItem = {
      id: Date.now(),
      name: newName,
      amount: parseFloat(newAmount),
      category: newCategory
    };
    setExpenses([...expenses, newItem]);
    setNewName('');
    setNewAmount('');
  };

  const removeExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const inputs = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Monthly Net Income ($)</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
          <input 
            type="number" 
            className="input-field pl-8 font-black text-xl" 
            value={monthlyIncome} 
            onChange={e => setMonthlyIncome(Number(e.target.value))} 
          />
        </div>
      </div>

      <div className="card-premium p-6 rounded-2xl border border-slate-200">
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-primary" /> Add New Expense
        </h3>
        <form onSubmit={addExpense} className="space-y-4">
          <div className="input-group mb-0">
            <input 
              type="text" 
              placeholder="Expense Name (e.g. Netflix)" 
              className="input-field text-sm" 
              value={newName} 
              onChange={e => setNewName(e.target.value)} 
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
             <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">$</span>
                <input 
                  type="number" 
                  placeholder="Amount" 
                  className="input-field pl-6 text-sm" 
                  value={newAmount} 
                  onChange={e => setNewAmount(e.target.value)} 
                />
             </div>
             <select 
               className="input-field text-sm" 
               value={newCategory} 
               onChange={e => setNewCategory(e.target.value)}
             >
               {CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
             </select>
          </div>
          <button type="submit" className="btn-primary w-full py-2.5 text-sm rounded-xl">
             Add Expense
          </button>
        </form>
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {expenses.map((exp) => {
          const cat = CATEGORIES.find(c => c.id === exp.category);
          const Icon = cat?.icon || Wallet;
          return (
            <div key={exp.id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100 shadow-sm group hover:border-primary/30 transition-all">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${cat?.color}15`, color: cat?.color }}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{exp.name}</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{cat?.name}</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <span className="text-sm font-black text-slate-900">${exp.amount.toLocaleString()}</span>
                  <button onClick={() => removeExpense(exp.id)} className="text-slate-300 hover:text-danger transition-colors">
                    <Trash2 size={14} />
                  </button>
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="card-premium p-6 rounded-2xl text-center bg-primary/5 border-primary/20">
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">Total Monthly Expenses</p>
           <p className="text-4xl font-black text-slate-900">${totals.total.toLocaleString()}</p>
        </div>
        <div className={`card-premium p-6 rounded-2xl text-center ${totals.balance >= 0 ? 'bg-success/5 border-success/20' : 'bg-danger/5 border-danger/20'}`}>
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Remaining Balance</p>
           <p className={`text-4xl font-black ${totals.balance >= 0 ? 'text-success' : 'text-danger'}`}>
             ${totals.balance.toLocaleString()}
           </p>
        </div>
      </div>

      <div className="card-premium p-5 rounded-2xl border border-slate-100">
         <div className="flex justify-between items-end mb-2">
            <p className="text-xs font-bold text-slate-500">Savings Rate</p>
            <p className="text-lg font-black text-primary">{Math.max(0, totals.savingsRate).toFixed(1)}%</p>
         </div>
         <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500" 
              style={{ width: `${Math.min(100, Math.max(0, totals.savingsRate))}%` }}
            />
         </div>
         <p className="text-[10px] text-slate-400 mt-2 text-center">
            {totals.savingsRate >= 20 ? '✅ Excellent! You are hitting the 50/30/20 rule target.' : '💡 Try to aim for a 20% savings rate for long-term wealth.'}
         </p>
      </div>

      <div className="h-[220px] w-full">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center italic text-slate-300 text-sm">
            Add expenses to see breakdown
          </div>
        )}
      </div>
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>Managing your monthly expenses is the first step toward financial freedom. Our <strong>Monthly Expense Tracker</strong> allows you to list every outgoing payment, categorize them, and visualize where your money goes compared to your income.</p>
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <h4 className="text-sm font-bold text-slate-900 mb-2">How to Use:</h4>
        <ol className="list-decimal pl-5 text-sm space-y-1 text-slate-600">
          <li>Enter your <strong>Net Monthly Income</strong> (take-home pay).</li>
          <li>Add individual expenses by name and amount.</li>
          <li>Select the appropriate category for each expense.</li>
          <li>Review your <strong>Savings Rate</strong> and expense breakdown.</li>
        </ol>
      </div>
    </div>
  );

  const formula = "Net Balance = Income - Sum(Expenses) | Savings Rate = (Balance / Income) × 100";

  const examples = [
    { title: "The 50/30/20 Rule", description: "Financial experts often recommend the 50/30/20 rule: 50% for needs (housing, food), 30% for wants (entertainment), and 20% for savings and debt repayment." },
    { title: "Cutting the Fat", description: "Use the tracker to identify 'hidden' subscription costs. A $15/mo service you don't use is $180/year that could be in your savings account." }
  ];

  const faqs = [
    { q: "What should I count as monthly income?", a: "Use your 'Net Income' — the actual amount that hits your bank account after taxes and deductions. This gives you the most accurate picture of your spending power." },
    { q: "Is this tracker private?", a: "Yes. All data remains in your browser's local memory. We do not store or transmit your financial data to any server." },
    { q: "How often should I update this?", a: "At least once a month. Reviewing your expenses at the end of each month helps you adjust your spending habits for the following month." }
  ];

  const whyUse = [
    { title: "Identify Waste", text: "Visualize exactly where your money is going to find unused subscriptions or excessive dining costs." },
    { title: "Hit Savings Goals", text: "Track your progress toward the recommended 20% savings rate for retirement and emergencies." },
    { title: "Visual Breakdown", text: "See your spending distributed across 8 major life categories via our dynamic pie chart." },
    { title: "Budget Planning", text: "Plan for upcoming big purchases by understanding your current monthly surplus." }
  ];

  const keyFeatures = [
    { title: "Live Charting", text: "Interactive pie chart updates instantly as you add or remove expenses." },
    { title: "8 Categories", text: "Pre-defined categories with intuitive icons for clean organization of your budget." },
    { title: "Savings Rate Meter", text: "Real-time feedback on your financial health based on your income-to-expense ratio." }
  ];

  const proTips = [
    "Always round up your expenses slightly to create a safety margin in your budget.",
    "If your balance is negative, start by cutting from the 'Entertainment' and 'Shopping' categories first.",
    "Automate your 20% savings at the start of the month — treat it as an essential 'expense' you pay to yourself.",
    "Categorize 'Coffee Runs' and 'Dining Out' under Food, but keep an eye on how fast they add up compared to groceries.",
    "Use your 'Other' category for unexpected one-time costs like gifts or minor repairs."
  ];

  const relatedTools = [
    { name: "Salary Calculator", path: "/finance/salary-calculator" },
    { name: "Debt Payoff Calculator", path: "/finance/debt-payoff-calculator" },
    { name: "Savings Calculator", path: "/finance/savings-calculator" },
    { name: "Loan Calculator", path: "/finance/loan-calculator" }
  ];

  return (
    <CalculatorLayout 
      title="Monthly Expense Tracker"
      seoTitle="Monthly Expense Tracker - Budget Planner & Savings Calculator"
      description="Track every dollar. List your monthly expenses, categorize your spending, and calculate your savings rate with our interactive budget tool."
      path="/finance/expense-tracker"
      icon={Wallet}
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
  );
}
