import React from 'react';
import RetirementCalculator from './RetirementCalculator';
import SEO from '../../components/SEO';

export default function RothIraCalculator() {
  return (
    <>
      <SEO title="Roth IRA Calculator | Tax-Free Retirement Growth" description="Calculate the long term growth of your Roth IRA." path="/finance/roth-ira-calculator" />
      <div className="pt-8"><RetirementCalculator /></div>
    </>
  );
}
