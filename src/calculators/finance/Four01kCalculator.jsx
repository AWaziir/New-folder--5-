import React from 'react';
import RetirementCalculator from './RetirementCalculator';
import SEO from '../../components/SEO';

export default function Four01kCalculator() {
  return (
    <>
      <SEO title="401k Calculator | Retirement Growth Estimator" description="Estimate your 401k plan growth and plan your retirement." path="/finance/401k-calculator" />
      <div className="pt-8"><RetirementCalculator /></div>
    </>
  );
}
