import React from 'react';
import PercentageCalculator from '../math/PercentageCalculator';
import SEO from '../../components/SEO';

export default function VatCalculator() {
  return (
    <>
      <SEO title="VAT Calculator | Value Added Tax Estimator" description="Quickly calculate VAT additions and deductions for your business." path="/finance/vat-calculator" />
      <div className="pt-8"><PercentageCalculator /></div>
    </>
  );
}
