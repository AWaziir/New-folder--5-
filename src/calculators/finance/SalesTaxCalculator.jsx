import React from 'react';
import PercentageCalculator from '../math/PercentageCalculator';
import SEO from '../../components/SEO';

export default function SalesTaxCalculator() {
  return (
    <>
      <SEO title="Sales Tax Calculator | Add Tax to Price" description="Calculate sales tax quickly. Add or subtract tax percentages from any price." path="/finance/sales-tax-calculator" />
      <div className="pt-8"><PercentageCalculator /></div>
    </>
  );
}
