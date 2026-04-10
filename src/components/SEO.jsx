import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, path }) => {
  const fullTitle = `${title} | CalcPro.com.au`;
  const defaultDesc = "Free, fast, and accurate online calculators for finance, health, math, and measurement conversions.";
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <link rel="canonical" href={`https://calcpro.com.au${path || ''}`} />
      
      {/* Schema.org for Google */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "CalcPro.com.au",
          "url": "https://calcpro.com.au",
          "description": defaultDesc,
          "applicationCategory": "EducationalApplication"
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
