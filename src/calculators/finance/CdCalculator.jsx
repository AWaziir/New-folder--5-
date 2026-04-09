import React from 'react';
import InterestCalculator from './InterestCalculator';
import SEO from '../../components/SEO';

export default function CdCalculator() {
  return (
    <>
      <SEO title="CD Calculator | Certificate of Deposit Returns" description="Calculate your Certificate of Deposit earnings." path="/finance/cd-calculator" />
      <div className="pt-8"><InterestCalculator /></div>
    </>
  );
}
