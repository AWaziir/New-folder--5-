import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, path }) => {
  const fullTitle = `${title} | CalcHub`;
  const defaultDesc = "Free, fast, and accurate online calculators for finance, health, math, and measurement conversions.";
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <link rel="canonical" href={`https://calchub.net${path || ''}`} />
      
      {/* Schema.org for Google */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "CalcHub",
          "url": "https://calchub.net",
          "description": defaultDesc,
          "applicationCategory": "EducationalApplication"
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
