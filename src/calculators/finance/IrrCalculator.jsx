import React from 'react';
import RoiCalculator from './RoiCalculator';
import SEO from '../../components/SEO';

export default function IrrCalculator() {
  return (
    <>
      <SEO title="IRR Calculator | Internal Rate of Return Estimator" description="Calculate internal rate of return for your investments." path="/finance/irr-calculator" />
      <div className="pt-8"><RoiCalculator /></div>
    </>
  );
}
