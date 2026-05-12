import React, { useState, useEffect } from 'react';
import { Landmark, TrendingUp, TrendingDown, DollarSign, PiggyBank, ShieldCheck } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import CalculatorLayout from '../../components/CalculatorLayout';

const TAX_BRACKETS_2024 = [
  { min: 0,       max: 11600,  rate: 0.10 },
  { min: 11600,   max: 47150,  rate: 0.12 },
  { min: 47150,   max: 100525, rate: 0.22 },
  { min: 100525,  max: 191950, rate: 0.24 },
  { min: 191950,  max: 243725, rate: 0.32 },
  { min: 243725,  max: 609350, rate: 0.35 },
  { min: 609350,  max: Infinity, rate: 0.37 }
];

function estimateFederalTax(annual) {
  let tax = 0;
  for (const bracket of TAX_BRACKETS_2024) {
    if (annual <= bracket.min) break;
    const taxable = Math.min(annual, bracket.max) - bracket.min;
    tax += taxable * bracket.rate;
  }
  return tax;
}

const EXPENSE_CATEGORIES = [
  { key: 'housing',       label: 'Rent / Mortgage',    icon: '🏠', color: '#ef4444' },
  { key: 'utilities',     label: 'Utilities & Bills',  icon: '💡', color: '#f97316' },
  { key: 'groceries',     label: 'Groceries & Food',   icon: '🛒', color: '#eab308' },
  { key: 'transport',     label: 'Transport & Car',     icon: '🚗', color: '#3b82f6' },
  { key: 'insurance',     label: 'Insurance',           icon: '🛡️', color: '#8b5cf6' },
  { key: 'entertainment', label: 'Entertainment',       icon: '🎬', color: '#ec4899' },
  { key: 'savings',       label: 'Savings / Investing', icon: '💰', color: '#10b981' },
  { key: 'other',         label: 'Other Expenses',      icon: '📦', color: '#6b7280' },
];

export default function SalaryCalculator() {
  const [salary, setSalary]           = useState(75000);
  const [period, setPeriod]           = useState('annual');
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(52);
  const [filingStatus, setFilingStatus] = useState('single');

  const [expenses, setExpenses] = useState({
    housing: 1500, utilities: 200, groceries: 400, transport: 300,
    insurance: 150, entertainment: 200, savings: 300, other: 200
  });

  const [result, setResult] = useState(null);

  useEffect(() => { calculate(); }, [salary, period, hoursPerWeek, weeksPerYear, filingStatus, expenses]);

  const setExpense = (key, val) => setExpenses(prev => ({ ...prev, [key]: Number(val) }));

  const calculate = () => {
    let annual = salary;
    if (period === 'monthly') annual = salary * 12;
    else if (period === 'weekly') annual = salary * 52;
    else if (period === 'hourly') annual = salary * hoursPerWeek * weeksPerYear;

    const monthly = annual / 12;
    const weekly  = annual / 52;
    const daily   = annual / (weeksPerYear > 0 ? weeksPerYear * 5 : 260);
    const hourly  = annual / (weeksPerYear > 0 && hoursPerWeek > 0 ? weeksPerYear * hoursPerWeek : 2080);

    // Tax estimate (simplified federal; married filing jointly get ~double brackets)
    let taxableIncome = annual;
    if (filingStatus === 'married') taxableIncome = Math.max(0, annual - 27700);
    else taxableIncome = Math.max(0, annual - 13850);

    const annualTax = estimateFederalTax(taxableIncome);
    const fica = annual * 0.0765; // Social Security + Medicare

    const totalMonthlyExpenses = Object.values(expenses).reduce((a, b) => a + Number(b), 0);
    const monthlyTax = (annualTax + fica) / 12;
    const netMonthly = monthly - monthlyTax - totalMonthlyExpenses;
    const savingsRate = monthly > 0 ? ((expenses.savings / monthly) * 100) : 0;
    const expenseRatio = monthly > 0 ? (totalMonthlyExpenses / monthly) * 100 : 0;

    let budgetHealth = 'great';
    if (expenseRatio > 90) budgetHealth = 'danger';
    else if (expenseRatio > 75) budgetHealth = 'warning';

    setResult({
      annual: Math.round(annual), monthly: Math.round(monthly),
      weekly: Math.round(weekly), daily: Math.round(daily), hourly: hourly.toFixed(2),
      monthlyTax: Math.round(monthlyTax), annualTax: Math.round(annualTax + fica),
      effectiveRate: annual > 0 ? (((annualTax + fica) / annual) * 100).toFixed(1) : '0.0',
      totalMonthlyExpenses: Math.round(totalMonthlyExpenses),
      netMonthly: Math.round(netMonthly),
      savingsRate: savingsRate.toFixed(1),
      expenseRatio: expenseRatio.toFixed(1),
      budgetHealth,
    });
  };

  const chartData = result ? EXPENSE_CATEGORIES.map(cat => ({
    name: cat.label, value: expenses[cat.key], color: cat.color
  })).filter(d => d.value > 0) : [];

  const healthColors = { great: '#10b981', warning: '#f59e0b', danger: '#ef4444' };
  const healthLabels = { great: '✅ Healthy Budget', warning: '⚠️ Tight Budget', danger: '🚨 Over Budget' };

  const inputs = (
    <div className="space-y-6">
      {/* Income */}
      <div style={{ background: 'linear-gradient(135deg,#245da215,#10b98110)', border: '1px solid #245da230', borderRadius: '1rem', padding: '1.25rem' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#245da2', marginBottom: '0.75rem' }}>💼 Income</p>

        <div className="input-group">
          <label className="input-label">Payment Frequency</label>
          <select className="input-field font-bold" value={period} onChange={e => setPeriod(e.target.value)}>
            <option value="annual">Annual Salary</option>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="hourly">Hourly Rate</option>
          </select>
        </div>

        <div className="input-group">
          <label className="input-label">Amount ($)</label>
          <input type="number" className="input-field text-xl font-black" value={salary}
            onChange={e => setSalary(Number(e.target.value))} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="input-group">
            <label className="input-label">Hrs / Week</label>
            <input type="number" className="input-field font-bold" value={hoursPerWeek}
              onChange={e => setHoursPerWeek(Number(e.target.value))} />
          </div>
          <div className="input-group">
            <label className="input-label">Weeks / Year</label>
            <input type="number" className="input-field font-bold" value={weeksPerYear}
              onChange={e => setWeeksPerYear(Number(e.target.value))} />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Tax Filing Status</label>
          <select className="input-field" value={filingStatus} onChange={e => setFilingStatus(e.target.value)}>
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
      </div>

      {/* Expenses */}
      <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '1rem', padding: '1.25rem' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#c2410c', marginBottom: '0.75rem' }}>🧾 Monthly Expenses</p>
        <div className="space-y-4">
          {EXPENSE_CATEGORIES.map(cat => (
            <div key={cat.key} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.2rem', width: '1.5rem', textAlign: 'center', flexShrink: 0 }}>{cat.icon}</span>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', minWidth: '120px', flexShrink: 0 }}>{cat.label}</label>
              <div style={{ position: 'relative', flex: 1 }}>
                <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: '#94a3b8', fontSize: '0.9rem' }}>$</span>
                <input
                  type="number"
                  style={{ width: '100%', paddingLeft: '1.5rem', padding: '0.5rem 0.5rem 0.5rem 1.5rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', fontWeight: 700, fontSize: '0.9rem', background: '#fff', outline: 'none' }}
                  value={expenses[cat.key]}
                  onChange={e => setExpense(cat.key, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-5">
      {result ? (
        <>
          {/* Gross Income Hero */}
          <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg,#245da210,#10b98108)', borderRadius: '1rem', border: '1px solid #245da225', textAlign: 'center' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.5, marginBottom: '0.35rem' }}>Annual Gross Income</p>
            <p style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>${result.annual.toLocaleString()}</p>
          </div>

          {/* Frequency Grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Monthly', val: `$${result.monthly.toLocaleString()}` },
              { label: 'Weekly',  val: `$${result.weekly.toLocaleString()}` },
              { label: 'Daily',   val: `$${result.daily.toLocaleString()}` },
              { label: 'Hourly',  val: `$${result.hourly}` },
            ].map(item => (
              <div key={item.label} style={{ padding: '0.85rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <p style={{ fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.5, marginBottom: '0.25rem' }}>{item.label}</p>
                <p style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0f172a' }}>{item.val}</p>
              </div>
            ))}
          </div>

          {/* Tax Estimate */}
          <div style={{ padding: '1rem 1.25rem', background: '#fef3c7', borderRadius: '0.75rem', border: '1px solid #fcd34d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#92400e', marginBottom: '0.15rem' }}>Est. Monthly Tax (Fed + FICA)</p>
              <p style={{ fontSize: '1.4rem', fontWeight: 900, color: '#78350f' }}>-${result.monthlyTax.toLocaleString()}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: '#92400e', opacity: 0.7 }}>Effective Rate</p>
              <p style={{ fontSize: '1.2rem', fontWeight: 900, color: '#78350f' }}>{result.effectiveRate}%</p>
            </div>
          </div>

          {/* Expenses */}
          <div style={{ padding: '1rem 1.25rem', background: '#fef2f2', borderRadius: '0.75rem', border: '1px solid #fca5a5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#991b1b', marginBottom: '0.15rem' }}>Total Monthly Expenses</p>
              <p style={{ fontSize: '1.4rem', fontWeight: 900, color: '#7f1d1d' }}>-${result.totalMonthlyExpenses.toLocaleString()}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: '#991b1b', opacity: 0.7 }}>of Income</p>
              <p style={{ fontSize: '1.2rem', fontWeight: 900, color: '#7f1d1d' }}>{result.expenseRatio}%</p>
            </div>
          </div>

          {/* Net Income */}
          <div style={{ padding: '1.25rem', background: result.netMonthly >= 0 ? 'linear-gradient(135deg,#dcfce7,#d1fae5)' : 'linear-gradient(135deg,#fee2e2,#fecaca)', borderRadius: '1rem', border: `1px solid ${result.netMonthly >= 0 ? '#86efac' : '#fca5a5'}`, textAlign: 'center' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: result.netMonthly >= 0 ? '#166534' : '#991b1b', marginBottom: '0.35rem' }}>
              {result.netMonthly >= 0 ? '💰 Monthly Net (After Tax & Expenses)' : '⚠️ Monthly Deficit'}
            </p>
            <p style={{ fontSize: '2.2rem', fontWeight: 900, color: result.netMonthly >= 0 ? '#14532d' : '#7f1d1d', lineHeight: 1 }}>
              {result.netMonthly >= 0 ? '+' : ''}{result.netMonthly.toLocaleString() }
            </p>
          </div>

          {/* Budget Health */}
          <div style={{ padding: '0.85rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>Budget Health</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: healthColors[result.budgetHealth] }}>{healthLabels[result.budgetHealth]}</span>
            </div>
            <div style={{ background: '#e2e8f0', borderRadius: '9999px', height: '8px', overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: '9999px',
                width: `${Math.min(100, result.expenseRatio)}%`,
                background: healthColors[result.budgetHealth],
                transition: 'width 0.5s ease'
              }} />
            </div>
            <p style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '0.35rem' }}>Savings Rate: {result.savingsRate}% of gross</p>
          </div>
        </>
      ) : (
        <div className="py-12 italic opacity-40 text-center">Enter income to view breakdown...</div>
      )}
    </div>
  );

  const expenseChart = result && chartData.length > 0 ? (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '1.25rem', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
      <h3 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '1rem', color: '#0f172a' }}>📊 Monthly Expense Breakdown</h3>
      <div style={{ height: '220px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
              {chartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
            <Tooltip formatter={(val) => `$${Number(val).toLocaleString()}/mo`} />
            <Legend iconType="circle" iconSize={10} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  ) : null;

  const instructions = (
    <div className="space-y-4">
      <p>
        This comprehensive <strong>Income & Expenses Calculator</strong> goes beyond a simple salary converter — it helps you understand your complete financial picture. Enter your gross income, add your recurring monthly expenses, and instantly see your estimated taxes, net take-home pay, and budget health score.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Gross Income:</strong> Enter your income before tax in any frequency — hourly, weekly, monthly, or annual.</li>
        <li><strong>Tax Estimate:</strong> We use the 2024 US federal tax brackets (including FICA: Social Security 6.2% + Medicare 1.45%) for a quick estimate. This does not include state taxes.</li>
        <li><strong>Monthly Expenses:</strong> Enter your real recurring expenses. The more accurate, the better your net income picture.</li>
        <li><strong>Savings Rate:</strong> Financial experts recommend saving at least 15–20% of gross income. The 50/30/20 rule suggests 50% needs, 30% wants, 20% savings.</li>
      </ul>
    </div>
  );

  const formula = "Net Monthly = (Annual ÷ 12) − Monthly Tax − Monthly Expenses";

  const examples = [
    {
      title: "The $75,000 Salaried Professional",
      description: "On a $75,000 annual salary, your gross monthly income is $6,250. After ~$1,200/month in estimated federal tax and $2,950 in common expenses, your net surplus is approximately $2,100/month — a healthy 28% savings opportunity."
    },
    {
      title: "The $50/hr Contractor",
      description: "A $50/hour contractor working 40hrs/week, 48 weeks/year earns $96,000 annually. Unlike employees, contractors must set aside 15.3% for self-employment tax — always factor this into your expense planning."
    },
    {
      title: "Understanding the 50/30/20 Budget Rule",
      description: "On a $60,000 salary, the 50/30/20 rule suggests: $2,500/month for needs (housing, food, transport), $1,500 for wants (dining, entertainment), and $1,000 toward savings and debt repayment."
    }
  ];

  const faqs = [
    {
      q: "Does this calculator include state income taxes?",
      a: "No — this tool estimates US federal income tax and FICA (Social Security + Medicare). State taxes vary greatly: from 0% in states like Texas and Florida to over 13% in California. Always consult a tax professional for a complete picture."
    },
    {
      q: "Should I enter my salary before or after superannuation/401k?",
      a: "Enter your gross salary before any pre-tax deductions. If your 401k contribution is taken pre-tax, it reduces your taxable income, but for budgeting purposes your gross is your starting point."
    },
    {
      q: "What is the difference between gross and net income?",
      a: "Gross income is what you earn before any deductions. Net income (take-home pay) is what remains after taxes, social security, Medicare, and other deductions are withheld. Net is what actually hits your bank account."
    },
    {
      q: "What is a good savings rate?",
      a: "Financial experts typically recommend saving 15–20% of your gross income for retirement alone. The popular 50/30/20 rule allocates 20% to savings and debt repayment. Even 10% is a great starting point if you're new to budgeting."
    },
    {
      q: "Why is my budget health showing 'warning' or 'danger'?",
      a: "If your combined expenses exceed 75–90% of your gross income (before tax), it signals a tight or over-stretched budget. Consider reviewing discretionary expenses like entertainment and subscriptions first."
    }
  ];

  const whyUse = [
    { title: "Job Offer Comparisons", text: "Accurately compare a $90k salaried role vs a $60/hr contract by understanding true net take-home." },
    { title: "Household Budgeting", text: "Get a crystal-clear monthly picture of income vs expenses — the foundation of any financial plan." },
    { title: "Salary Negotiation", text: "Know your exact hourly worth before entering a salary discussion with confidence." },
    { title: "Financial Goal Setting", text: "Understand how much is truly available for savings, debt repayment, or investing each month." }
  ];

  const keyFeatures = [
    { title: "8 Expense Categories", text: "Track housing, utilities, groceries, transport, insurance, entertainment, savings, and miscellaneous." },
    { title: "Federal Tax Estimate", text: "Applies 2024 US federal tax brackets plus FICA (7.65%) for a realistic take-home estimate." },
    { title: "Budget Health Meter", text: "Visual indicator that instantly flags if your expenses are eating too much of your income." }
  ];

  const proTips = [
    "Always clarify if a job offer is 'Base Salary' or 'Total Compensation' — bonuses, equity, and benefits add significant value.",
    "Contractors typically need 30–40% higher hourly rates than employees to account for taxes, no paid leave, and no employer benefits.",
    "The 50/30/20 rule is a starting guide: 50% needs, 30% wants, 20% savings. Adjust based on your debt situation.",
    "If you have high-interest debt (>7%), prioritize paying that over investing. The guaranteed return beats most markets.",
    "Track your actual expenses for 3 months before setting a budget — most people underestimate spending by 20–30%."
  ];

  const relatedTools = [
    { name: "Tax Calculator (AU)", path: "/finance/tax-calculator-australia" },
    { name: "Income Tax Calculator (US)", path: "/finance/income-tax-calculator" },
    { name: "Savings Calculator", path: "/finance/savings-calculator" },
    { name: "Retirement Calculator", path: "/finance/retirement-calculator" }
  ];

  return (
    <CalculatorLayout
      title="Income & Expenses Calculator"
      seoTitle="Income & Expenses Calculator — Salary, Tax & Budget Planner 2024"
      description="Calculate your take-home pay after tax and expenses. Enter your salary and monthly costs to instantly see your net income, budget health, and savings rate."
      path="/finance/salary-calculator"
      icon={Landmark}
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
    >
      {expenseChart}
    </CalculatorLayout>
  );
}
