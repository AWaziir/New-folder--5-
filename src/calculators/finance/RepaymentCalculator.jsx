import React from 'react';
import LoanCalculator from './LoanCalculator';
import SEO from '../../components/SEO';

export default function RepaymentCalculator() {
  return (
    <>
      <SEO title="Repayment Calculator | Loan Estimator" description="Calculate your loan repayments easily." path="/finance/repayment-calculator" />
      <div className="pt-8"><LoanCalculator /></div>
    </>
  );
}
