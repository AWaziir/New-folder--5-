import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';

import MortgageCalculator from './calculators/finance/MortgageCalculator';
import LoanCalculator from './calculators/finance/LoanCalculator';
import InterestCalculator from './calculators/finance/InterestCalculator';
import HouseAffordability from './calculators/finance/HouseAffordability';
import SalaryCalculator from './calculators/finance/SalaryCalculator';
import AutoLoanCalculator from './calculators/finance/AutoLoanCalculator';
import GstCalculator from './calculators/finance/GstCalculator';
import RoiCalculator from './calculators/finance/RoiCalculator';
import AutoLeaseCalculator from './calculators/finance/AutoLeaseCalculator';
import SavingsCalculator from './calculators/finance/SavingsCalculator';
import InflationCalculator from './calculators/finance/InflationCalculator';
import RetirementCalculator from './calculators/finance/RetirementCalculator';
import CreditCardPayoffCalculator from './calculators/finance/CreditCardPayoffCalculator';
import TaxCalculatorAU from './calculators/finance/TaxCalculatorAU';
import RentCalculator from './calculators/finance/RentCalculator';
import MortgagePayoffCalculator from './calculators/finance/MortgagePayoffCalculator';
import RefinanceCalculator from './calculators/finance/RefinanceCalculator';
import RealEstateCalculator from './calculators/finance/RealEstateCalculator';
import RentalPropertyCalculator from './calculators/finance/RentalPropertyCalculator';
import DebtPayoffCalculator from './calculators/finance/DebtPayoffCalculator';
import RepaymentCalculator from './calculators/finance/RepaymentCalculator';
import StudentLoanCalculator from './calculators/finance/StudentLoanCalculator';
import InvestmentCalculator from './calculators/finance/InvestmentCalculator';
import CdCalculator from './calculators/finance/CdCalculator';
import IrrCalculator from './calculators/finance/IrrCalculator';
import Four01kCalculator from './calculators/finance/Four01kCalculator';
import RothIraCalculator from './calculators/finance/RothIraCalculator';
import SocialSecurityCalculator from './calculators/finance/SocialSecurityCalculator';
import IncomeTaxCalculator from './calculators/finance/IncomeTaxCalculator';
import SalesTaxCalculator from './calculators/finance/SalesTaxCalculator';
import VatCalculator from './calculators/finance/VatCalculator';
import EmergencyFundCalculator from './calculators/finance/EmergencyFundCalculator';
import DiscountCalculator from './calculators/finance/DiscountCalculator';
import ProfitLossCalculator from './calculators/finance/ProfitLossCalculator';

import BmiCalculator from './calculators/health/BmiCalculator';
import PregnancyDueDate from './calculators/health/PregnancyDueDate';
import PeriodCalculator from './calculators/health/PeriodCalculator';
import CalorieCalculator from './calculators/health/CalorieCalculator';
import BmrCalculator from './calculators/health/BmrCalculator';
import TdeeCalculator from './calculators/health/TdeeCalculator';
import IdealWeightCalculator from './calculators/health/IdealWeightCalculator';
import WaterIntakeCalculator from './calculators/health/WaterIntakeCalculator';

import PercentageCalculator from './calculators/math/PercentageCalculator';
import AverageCalculator from './calculators/math/AverageCalculator';
import FractionCalculator from './calculators/math/FractionCalculator';
import ScientificCalculator from './calculators/math/ScientificCalculator';
import BasicCalculator from './calculators/math/BasicCalculator';
import StatisticsCalculator from './calculators/math/StatisticsCalculator';
import PythagoreanCalculator from './calculators/math/PythagoreanCalculator';
import RatioCalculator from './calculators/math/RatioCalculator';
import StandardDeviationCalculator from './calculators/math/StandardDeviationCalculator';

import LengthConverter from './calculators/conversion/LengthConverter';
import WeightConverter from './calculators/conversion/WeightConverter';
import TemperatureConverter from './calculators/conversion/TemperatureConverter';
import CurrencyConverter from './calculators/conversion/CurrencyConverter';
import SpeedConverter from './calculators/conversion/SpeedConverter';
import AreaConverter from './calculators/conversion/AreaConverter';

import AgeCalculator from './calculators/other/AgeCalculator';
import TipCalculator from './calculators/other/TipCalculator';
import PasswordGenerator from './calculators/other/PasswordGenerator';
import DateDifferenceCalculator from './calculators/other/DateDifferenceCalculator';
import DayOfWeekCalculator from './calculators/other/DayOfWeekCalculator';
import TimeZoneConverter from './calculators/other/TimeZoneConverter';
import GradeCalculator from './calculators/other/GradeCalculator';
import FuelCostCalculator from './calculators/other/FuelCostCalculator';
import RandomNumberGenerator from './calculators/other/RandomNumberGenerator';
import CryptoProfitCalculator from './calculators/crypto/CryptoProfitCalculator';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import TermsOfService from './pages/TermsOfService';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="category/:categoryId" element={<CategoryPage />} />
        
        {/* Finance Calculators */}
        <Route path="finance/mortgage-calculator" element={<MortgageCalculator />} />
        <Route path="finance/loan-calculator" element={<LoanCalculator />} />
        <Route path="finance/interest-calculator" element={<InterestCalculator />} />
        <Route path="finance/house-affordability" element={<HouseAffordability />} />
        <Route path="finance/real-estate-calculator" element={<RealEstateCalculator />} />
        <Route path="finance/rental-property-calculator" element={<RentalPropertyCalculator />} />
        <Route path="finance/rent-calculator" element={<RentCalculator />} />
        <Route path="finance/mortgage-payoff" element={<MortgagePayoffCalculator />} />
        <Route path="finance/refinance-calculator" element={<RefinanceCalculator />} />
        <Route path="finance/salary-calculator" element={<SalaryCalculator />} />
        <Route path="finance/auto-loan-calculator" element={<AutoLoanCalculator />} />
        <Route path="finance/auto-lease-calculator" element={<AutoLeaseCalculator />} />
        <Route path="finance/gst-calculator" element={<GstCalculator />} />
        <Route path="finance/roi-calculator" element={<RoiCalculator />} />
        <Route path="finance/savings-calculator" element={<SavingsCalculator />} />
        <Route path="finance/inflation-calculator" element={<InflationCalculator />} />
        <Route path="finance/retirement-calculator" element={<RetirementCalculator />} />
        <Route path="finance/credit-card-calculator" element={<CreditCardPayoffCalculator />} />
        <Route path="finance/tax-calculator-australia" element={<TaxCalculatorAU />} />
        <Route path="finance/debt-payoff-calculator" element={<DebtPayoffCalculator />} />
        <Route path="finance/repayment-calculator" element={<RepaymentCalculator />} />
        <Route path="finance/student-loan-calculator" element={<StudentLoanCalculator />} />
        <Route path="finance/investment-calculator" element={<InvestmentCalculator />} />
        <Route path="finance/cd-calculator" element={<CdCalculator />} />
        <Route path="finance/irr-calculator" element={<IrrCalculator />} />
        <Route path="finance/401k-calculator" element={<Four01kCalculator />} />
        <Route path="finance/roth-ira-calculator" element={<RothIraCalculator />} />
        <Route path="finance/social-security-calculator" element={<SocialSecurityCalculator />} />
        <Route path="finance/income-tax-calculator" element={<IncomeTaxCalculator />} />
        <Route path="finance/sales-tax-calculator" element={<SalesTaxCalculator />} />
        <Route path="finance/vat-calculator" element={<VatCalculator />} />
        <Route path="finance/emergency-fund" element={<EmergencyFundCalculator />} />
        <Route path="finance/discount-calculator" element={<DiscountCalculator />} />
        <Route path="finance/profit-loss" element={<ProfitLossCalculator />} />
        
        {/* Health Calculators */}
        <Route path="health/bmi-calculator" element={<BmiCalculator />} />
        <Route path="health/pregnancy-due-date" element={<PregnancyDueDate />} />
        <Route path="health/period-calculator" element={<PeriodCalculator />} />
        <Route path="health/calorie-calculator" element={<CalorieCalculator />} />
        <Route path="health/bmr-calculator" element={<BmrCalculator />} />
        <Route path="health/tdee-calculator" element={<TdeeCalculator />} />
        <Route path="health/ideal-weight" element={<IdealWeightCalculator />} />
        <Route path="health/water-intake" element={<WaterIntakeCalculator />} />
        
        {/* Math Calculators */}
        <Route path="math/percentage-calculator" element={<PercentageCalculator />} />
        <Route path="math/average-calculator" element={<StatisticsCalculator />} />
        <Route path="math/fraction-calculator" element={<FractionCalculator />} />
        <Route path="math/scientific-calculator" element={<ScientificCalculator />} />
        <Route path="math/basic-calculator" element={<BasicCalculator />} />
        <Route path="math/pythagorean-calculator" element={<PythagoreanCalculator />} />
        <Route path="math/ratio-calculator" element={<RatioCalculator />} />
        <Route path="math/standard-deviation" element={<StandardDeviationCalculator />} />
        
        {/* Other / Conversion Calculators */}
        <Route path="conversion/length-converter" element={<LengthConverter />} />
        <Route path="conversion/weight-converter" element={<WeightConverter />} />
        <Route path="conversion/temperature-converter" element={<TemperatureConverter />} />
        <Route path="conversion/currency-converter" element={<CurrencyConverter />} />
        <Route path="conversion/speed-converter" element={<SpeedConverter />} />
        <Route path="conversion/area-converter" element={<AreaConverter />} />
        
        <Route path="other/age-calculator" element={<AgeCalculator />} />
        <Route path="other/tip-calculator" element={<TipCalculator />} />
        <Route path="other/password-generator" element={<PasswordGenerator />} />
        <Route path="other/date-difference" element={<DateDifferenceCalculator />} />
        <Route path="other/day-of-week" element={<DayOfWeekCalculator />} />
        <Route path="other/time-zone-converter" element={<TimeZoneConverter />} />
        <Route path="other/grade-calculator" element={<GradeCalculator />} />
        <Route path="other/fuel-cost" element={<FuelCostCalculator />} />
        <Route path="other/random-number" element={<RandomNumberGenerator />} />

        {/* Crypto Calculators */}
        <Route path="crypto/profit-calculator" element={<CryptoProfitCalculator />} />

        {/* Static Pages */}
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="terms-of-service" element={<TermsOfService />} />
      </Route>
    </Routes>
  );
}

export default App;
