import React from 'react';
import RetirementCalculator from './RetirementCalculator';
import SEO from '../../components/SEO';

export default function SocialSecurityCalculator() {
  return (
    <>
      <SEO title="Social Security Calculator | Benefit Estimator" description="Estimate your social security retirement benefits based on current savings." path="/finance/social-security-calculator" />
      <div className="pt-8"><RetirementCalculator /></div>
    </>
  );
}
