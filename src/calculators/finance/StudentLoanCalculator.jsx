import React from 'react';
import LoanCalculator from './LoanCalculator';
import SEO from '../../components/SEO';

export default function StudentLoanCalculator() {
  return (
    <>
      <SEO title="Student Loan Calculator | Payoff Estimator" description="Estimate your student loan payments and total interest." path="/finance/student-loan-calculator" />
      <div className="pt-8"><LoanCalculator /></div>
    </>
  );
}
