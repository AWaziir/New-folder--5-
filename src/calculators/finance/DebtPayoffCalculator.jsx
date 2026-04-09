import React from 'react';
import CreditCardPayoffCalculator from './CreditCardPayoffCalculator';
import SEO from '../../components/SEO';

export default function DebtPayoffCalculator() {
  return (
    <>
      <SEO title="Debt Payoff Calculator | Plan Your Freedom" description="Calculate your path to being debt-free." path="/finance/debt-payoff-calculator" />
      <div className="pt-8"><CreditCardPayoffCalculator /></div>
    </>
  );
}
