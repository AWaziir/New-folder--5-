import { 
  DollarSign, HeartPulse, Calculator, Scale, Home, Car, TrendingUp, PiggyBank, Receipt, 
  ShoppingCart, Activity, Zap, Watch, Calendar, GraduationCap, MapPin, Dumbbell, Baby,
  Clock, Hash, Network, Lock, Droplets, Thermometer, Globe, Info, Bitcoin, Coins
} from 'lucide-react';

export const categories = [
  {
    id: 'finance',
    name: 'Financial Calculators',
    icon: DollarSign,
    description: 'Professional tools for mortgage, loans, investments, taxes, and personal budget.',
    subcategories: [
      {
        name: 'Mortgage & Real Estate',
        icon: Home,
        calculators: [
          { id: 'mortgage-calculator', name: 'Mortgage Calculator', description: 'Ultimate mortgage calculator australia with extra payments.', path: '/finance/mortgage-calculator' },
          { id: 'house-affordability', name: 'House Affordability Calculator', description: 'Find exactly how much mortgage can I afford australia.', path: '/finance/house-affordability' },
          { id: 'rent-calculator', name: 'Rent Calculator', description: 'Affordable rent based on income.', path: '/finance/rent-calculator' },
          { id: 'mortgage-payoff', name: 'Mortgage Payoff Calculator', description: 'Shorten loan with extra payments.', path: '/finance/mortgage-payoff' },
          { id: 'refinance-calculator', name: 'Refinance Calculator', description: 'Should you refinance your mortgage?', path: '/finance/refinance-calculator' },
          { id: 'real-estate-calculator', name: 'Real Estate Calculator', description: 'Analyze real estate investments.', path: '/finance/real-estate-calculator' },
          { id: 'rental-property-calculator', name: 'Rental Property Calculator', description: 'Analyze rental property ROI.', path: '/finance/rental-property-calculator' },
        ]
      },
      {
        name: 'Loans & Debt',
        icon: Receipt,
        calculators: [
          { id: 'loan-calculator', name: 'Loan EMI Calculator', description: 'Monthly payment, total interest & amortization.', path: '/finance/loan-calculator' },
          { id: 'auto-loan-calculator', name: 'Auto Loan Calculator', description: 'Calculate monthly car payments.', path: '/finance/auto-loan-calculator' },
          { id: 'auto-lease-calculator', name: 'Auto Lease Calculator', description: 'Lease vs buy comparison.', path: '/finance/auto-lease-calculator' },
          { id: 'credit-card-calculator', name: 'Credit Card Calculator', description: 'Credit card interest and payments.', path: '/finance/credit-card-calculator' },
          { id: 'debt-payoff-calculator', name: 'Debt Payoff Calculator', description: 'Plan to pay off your debts.', path: '/finance/debt-payoff-calculator' },
          { id: 'repayment-calculator', name: 'Repayment Calculator', description: 'Best loan repayment calculator with interest and fees.', path: '/finance/repayment-calculator' },
          { id: 'student-loan-calculator', name: 'Student Loan Calculator', description: 'Manage student loan debt.', path: '/finance/student-loan-calculator' },
        ]
      },
      {
        name: 'Investment & Savings',
        icon: TrendingUp,
        calculators: [
          { id: 'interest-calculator', name: 'Compound Interest', description: 'Grow your savings with compounding power.', path: '/finance/interest-calculator' },
          { id: 'investment-calculator', name: 'Investment Calculator', description: 'Project investment values.', path: '/finance/investment-calculator' },
          { id: 'roi-calculator', name: 'ROI Calculator', description: 'Return on investment calculator.', path: '/finance/roi-calculator' },
          { id: 'savings-calculator', name: 'Savings Calculator', description: 'Plan your savings goals.', path: '/finance/savings-calculator' },
          { id: 'emergency-fund', name: 'Emergency Fund', description: 'Calculate safety net targets.', path: '/finance/emergency-fund' },
          { id: 'cd-calculator', name: 'CD Calculator', description: 'Certificate of Deposit earnings.', path: '/finance/cd-calculator' },
          { id: 'irr-calculator', name: 'IRR Calculator', description: 'Internal Rate of Return.', path: '/finance/irr-calculator' },
        ]
      },
      {
        name: 'Retirement',
        icon: PiggyBank,
        calculators: [
          { id: 'retirement-calculator', name: 'Retirement Calculator', description: 'Am I saving enough for retirement?', path: '/finance/retirement-calculator' },
          { id: '401k-calculator', name: '401k Calculator', description: '401k growth and contributions.', path: '/finance/401k-calculator' },
          { id: 'roth-ira-calculator', name: 'Roth IRA Calculator', description: 'Roth IRA vs Traditional IRA.', path: '/finance/roth-ira-calculator' },
          { id: 'social-security-calculator', name: 'Social Security Calculator', description: 'Estimate social security benefits.', path: '/finance/social-security-calculator' },
        ]
      },
      {
        name: 'Tax & Salary',
        icon: ShoppingCart,
        calculators: [
          { id: 'salary-calculator', name: 'Salary Calculator', description: 'Breakdown of your paycheck.', path: '/finance/salary-calculator' },
          { id: 'income-tax-calculator', name: 'Income Tax Calculator', description: 'The official tax calculator australia 2026 update.', path: '/finance/income-tax-calculator' },
          { id: 'sales-tax-calculator', name: 'GST / Tax Calculator', description: 'Add or remove GST/VAT from any amount.', path: '/finance/sales-tax-calculator' },
          { id: 'profit-loss', name: 'Profit & Loss', description: 'Cost, selling price & profit margin.', path: '/finance/profit-loss' },
        ]
      }
    ]
  },
  {
    id: 'health',
    name: 'Fitness & Health',
    icon: HeartPulse,
    description: 'Track Body Mass Index, calories, body fat, and fitness metrics.',
    subcategories: [
      {
        name: 'Fitness & Weight',
        icon: Activity,
        calculators: [
          { id: 'bmi-calculator', name: 'BMI Calculator', description: 'Body mass index with health interpretation.', path: '/health/bmi-calculator' },
          { id: 'calorie-calculator', name: 'Calorie Calculator', description: 'Daily calorie needs using Harris-Benedict.', path: '/health/calorie-calculator' },
          { id: 'bmr-calculator', name: 'BMR Calculator', description: 'Basal Metabolic Rate.', path: '/health/bmr-calculator' },
          { id: 'tdee-calculator', name: 'TDEE Calculator', description: 'Free calorie calculator for weight loss female australia.', path: '/health/tdee-calculator' },
          { id: 'ideal-weight', name: 'Ideal Weight', description: 'Healthy weight range for your height.', path: '/health/ideal-weight' },
          { id: 'water-intake', name: 'Water Intake', description: 'Daily water requirement for your body.', path: '/health/water-intake' },
        ]
      },
      {
        name: 'Pregnancy & Family',
        icon: Baby,
        calculators: [
          { id: 'pregnancy-due-date', name: 'Due Date Calculator', description: 'Estimate your baby due date.', path: '/health/pregnancy-due-date' },
          { id: 'period-calculator', name: 'Period Calculator', description: 'Know exactly when is my next period calculator accurate.', path: '/health/period-calculator' },
        ]
      }
    ]
  },
  {
    id: 'math',
    name: 'Math Calculators',
    icon: Calculator,
    description: 'Tools for algebra, geometry, statistics, and advanced arithmetic.',
    subcategories: [
        {
            name: 'General Math',
            icon: Calculator,
            calculators: [
                { id: 'percentage-calculator', name: 'Percentage Calculator', description: 'Find percentages, increases, decreases & ratios.', path: '/math/percentage-calculator' },
                { id: 'scientific-calculator', name: 'Scientific Calculator', description: 'Trig, log, powers, roots and more.', path: '/math/scientific-calculator' },
                { id: 'fraction-calculator', name: 'Fraction Calculator', description: 'Add, subtract, multiply & divide fractions.', path: '/math/fraction-calculator' },
                { id: 'basic-calculator', name: 'Basic Calculator', description: 'Arithmetic calculator.', path: '/math/basic-calculator' },
                { id: 'ratio-calculator', name: 'Ratio Calculator', description: 'Simplify & scale ratios instantly.', path: '/math/ratio-calculator' },
            ]
        },
        {
            name: 'Geometry',
            icon: Hash,
            calculators: [
                { id: 'pythagorean-calculator', name: 'Pythagorean Calculator', description: 'Solve for angles and sides.', path: '/math/pythagorean-calculator' },
            ]
        },
        {
            name: 'Statistics',
            icon: TrendingUp,
            calculators: [
                { id: 'average-calculator', name: 'Average Calculator', description: 'Mean, median & mode of any number set.', path: '/math/average-calculator' },
                { id: 'standard-deviation', name: 'Standard Deviation', description: 'Measure of variability.', path: '/math/standard-deviation' },
            ]
        }
    ]
  },
  {
    id: 'other',
    name: 'Other Calculators',
    icon: Zap,
    description: 'Everyday utilities including time, date, grade, and units conversion.',
    subcategories: [
        {
            name: 'Time & Date',
            icon: Calendar,
            calculators: [
                { id: 'age-calculator', name: 'Age Calculator', description: 'Exact age in years, months and days.', path: '/other/age-calculator' },
                { id: 'date-difference', name: 'Date Difference', description: 'Days, weeks & months between two dates.', path: '/other/date-difference' },
                { id: 'day-of-week', name: 'Day of the Week', description: 'Find what day any date falls on.', path: '/other/day-of-week' },
                { id: 'time-zone-converter', name: 'Time Zone Converter', description: 'Convert time across world time zones.', path: '/other/time-zone-converter' },
            ]
        },
        {
            name: 'Other Utilities',
            icon: GraduationCap,
            calculators: [
                { id: 'tip-calculator', name: 'Tip Calculator', description: 'Split bills and calculate tips easily.', path: '/other/tip-calculator' },
                { id: 'discount-calculator', name: 'Discount Calculator', description: 'Sale price, savings & original price.', path: '/finance/discount-calculator' },
                { id: 'grade-calculator', name: 'Grade Calculator', description: 'Weighted grade & GPA calculator.', path: '/other/grade-calculator' },
                { id: 'fuel-cost', name: 'Fuel Cost Calculator', description: 'Trip fuel cost and mileage.', path: '/other/fuel-cost' },
                { id: 'random-number', name: 'Random Number', description: 'Generate random numbers in any range.', path: '/other/random-number' },
                { id: 'password-generator', name: 'Password Generator', description: 'Strong random passwords in one click.', path: '/other/password-generator' },
            ]
        }
    ]
  },
  {
    id: 'conversion',
    name: 'Conversion Tools',
    icon: Scale,
    description: 'Quickly convert between lengths, weights, temperatures, and global currencies.',
    calculators: [
        { id: 'length-converter', name: 'Length Converter', description: 'km, m, cm, mm, miles, feet, inches', path: '/conversion/length-converter' },
        { id: 'weight-converter', name: 'Weight Converter', description: 'kg, g, lbs, oz, stone conversions.', path: '/conversion/weight-converter' },
        { id: 'temperature-converter', name: 'Temperature Converter', description: 'Celsius, Fahrenheit, Kelvin', path: '/conversion/temperature-converter' },
        { id: 'currency-converter', name: 'Currency Calculator', description: 'Live usd to aud today live rate currency converter with live rates free.', path: '/conversion/currency-converter' },
        { id: 'speed-converter', name: 'Speed Converter', description: 'km/h, mph, m/s, knots', path: '/conversion/speed-converter' },
        { id: 'area-converter', name: 'Area Converter', description: 'm², ft², acres, hectares and more', path: '/conversion/area-converter' },
    ]
  },
  ,
  {
    id: 'crypto',
    name: 'Crypto Calculators',
    icon: Bitcoin,
    description: 'Calculate cryptocurrency profit, loss, DCA average entry price, and capital gains tax.',
    subcategories: [
      {
        name: 'Profit & Portfolio',
        icon: TrendingUp,
        calculators: [
          { id: 'crypto-profit-calculator', name: 'Crypto Profit Calculator', description: 'Calculate profit, loss, and ROI on any crypto trade.', path: '/crypto/profit-calculator' },
          { id: 'crypto-dca-calculator', name: 'DCA Calculator', description: 'Average your entry price across multiple buys.', path: '/crypto/profit-calculator' },
          { id: 'crypto-tax-estimator', name: 'Crypto Tax Estimator', description: 'Estimate capital gains tax on crypto profits.', path: '/crypto/profit-calculator' },
        ]
      },
    ]
  }
];

export const getCategoryById = (id) => categories.find(cat => cat.id === id);

export const getAllCalculators = () => {
    let list = [];
    categories.forEach(cat => {
        if (cat.subcategories) {
            cat.subcategories.forEach(sub => {
                list = list.concat(sub.calculators);
            });
        }
        if (cat.calculators) {
            list = list.concat(cat.calculators);
        }
    });
    return list;
};
