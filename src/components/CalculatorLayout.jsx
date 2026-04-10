import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Printer, Share2, Info, HelpCircle, BookOpen } from 'lucide-react';
import SEO from './SEO';
import AdPlaceholder from './AdPlaceholder';

export default function CalculatorLayout({
  title,
  seoTitle,
  description,
  path,
  icon: Icon,
  inputs,
  results,
  children,
  formula,
  instructions,
  faqs,
  examples
}) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container">
      <SEO title={seoTitle || title} description={description} path={path} />

      <AdPlaceholder text="Top Banner Ad" className="print-hide" />

      <div className="max-width-4xl mx-auto my-8">
        
        {/* Header Actions */}
        <div className="flex justify-between items-end mb-6 print-hide">
            <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-3 text-primary-light">
                    {Icon && <Icon className="w-8 h-8 text-primary" />}
                    {title}
                </h1>
                <p className="text-muted">{description}</p>
            </div>
            <div className="flex gap-2">
                <button onClick={handleShare} className="btn-outline flex items-center gap-2">
                    <Share2 className="w-4 h-4" /> {copied ? 'Copied!' : 'Share Link'}
                </button>
                <button onClick={handlePrint} className="btn-outline flex items-center gap-2 hidden md:flex">
                    <Printer className="w-4 h-4" /> Print
                </button>
            </div>
        </div>

        {/* Print Only Header */}
        <div className="hidden print:block mb-8">
           <h1 className="text-3xl font-bold text-black border-b border-gray-400 pb-2 mb-4">{title} - Report</h1>
           <p className="text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
        </div>

        {/* Core Calculator Area */}
        <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          
          {/* Input Form Column */}
          <div className="flex flex-col gap-6">
            <div className="card h-full">
               <h2 className="text-xl font-bold mb-6 border-b border-border-color pb-2">Inputs</h2>
               {inputs}
            </div>
          </div>

          {/* Results Column */}
          <div className="flex flex-col gap-6">
            <div className="card sticky top-24 h-full">
               <h2 className="text-xl font-bold mb-6 border-b border-border-color pb-2">Results</h2>
               {results}
               <div className="mt-8">
                 <AdPlaceholder text="Mid-Result Ad" className="print-hide" />
               </div>
            </div>
          </div>
        </div>

        {/* Optional Extra Elements (Charts, Data Tables) */}
        {children && (
           <div className="mt-8">
              {children}
           </div>
        )}

        {/* SEO / Educational Content Area */}
        <div className="mt-16 print-hide space-y-6">
            
            {/* Instructions & Formula */}
            {(instructions || formula) && (
              <div className="card bg-secondary/30 border-t-4 border-t-primary rounded-none">
                 <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                     <BookOpen className="w-6 h-6 text-primary" />
                     How to use the {title}
                 </h2>
                 <div className="text-muted leading-relaxed space-y-4">
                     {instructions && <div>{instructions}</div>}
                     
                     {formula && (
                         <div className="mt-6">
                             <h3 className="text-lg font-bold text-white mb-3">Mathematical Formula Used:</h3>
                             <div className="bg-main p-4 rounded-lg border border-border-color font-mono text-center text-primary-light overflow-x-auto">
                                 {formula}
                             </div>
                         </div>
                     )}
                 </div>
              </div>
            )}

            {/* Examples Section */}
            {examples && examples.length > 0 && (
              <div className="card border-l-4 border-l-success border-r-0 border-b-0 border-t-0 rounded-none">
                 <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                     <span className="text-success text-2xl font-black">?</span>
                     Real-World Examples
                 </h2>
                 <div className="space-y-6">
                    {examples.map((ex, idx) => (
                       <div key={idx} className="bg-main/50 p-5 rounded-xl border border-border-color">
                           <h3 className="text-lg font-bold text-success-light mb-2">{ex.title}</h3>
                           <p className="text-muted leading-relaxed italic">{ex.description}</p>
                       </div>
                    ))}
                 </div>
              </div>
            )}

            {/* SEO FAQ Section */}
            {faqs && faqs.length > 0 && (
              <div className="card border-l-4 border-l-accent border-r-0 border-b-0 border-t-0 rounded-none">
                 <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                     <HelpCircle className="w-6 h-6 text-accent" />
                     Frequently Asked Questions
                 </h2>
                 <div className="space-y-6">
                    {faqs.map((faq, idx) => (
                       <div key={idx} className="border-b border-border-color pb-4 last:border-0 last:pb-0">
                           <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                           <p className="text-muted leading-relaxed">{faq.a}</p>
                       </div>
                    ))}
                 </div>
              </div>
            )}

        </div>
      </div>
    </div>
  );
}
