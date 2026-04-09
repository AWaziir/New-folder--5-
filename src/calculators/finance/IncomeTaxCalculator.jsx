import React from 'react';
import SalaryCalculator from './SalaryCalculator';
import SEO from '../../components/SEO';

export default function IncomeTaxCalculator() {
  return (
    <>
      <SEO title="Income Tax Calculator | Take-Home Pay Estimator" description="Estimate your income tax and calculate your true take-home pay." path="/finance/income-tax-calculator" />
      <div className="pt-8"><SalaryCalculator /></div>
    </>
  );
}
