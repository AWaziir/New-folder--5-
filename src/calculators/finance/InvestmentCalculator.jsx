import React from 'react';
import SavingsCalculator from './SavingsCalculator';
import SEO from '../../components/SEO';

export default function InvestmentCalculator() {
  return (
    <>
      <SEO title="Investment Calculator | ROI Predictor" description="Calculate your long-term investment growth." path="/finance/investment-calculator" />
      <div className="pt-8"><SavingsCalculator /></div>
    </>
  );
}
