import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Printer, Share2, Info, HelpCircle, BookOpen, 
  Lightbulb, CheckCircle2, ChevronRight, Calculator,
  FileText, TrendingUp, AlertCircle, Sparkles
} from 'lucide-react';
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
  examples,
  whyUse,
  keyFeatures,
  proTips,
  relatedTools = []
}) {
  const [copied, setCopied] = useState(false);
  const location = useLocation();

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-main relative overflow-hidden pb-20">
      <SEO title={seoTitle || title} description={description} path={path} />

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10 pt-12">
        
        {/* Header Section */}
        <header className="mb-12 text-center max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in-up">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-premium flex items-center justify-center text-primary">
              {Icon ? <Icon size={24} /> : <Calculator size={24} />}
            </div>
            <div className="h-px w-8 bg-border-color" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">Professional Suite</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {title}
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {description}
          </p>

          <div className="flex items-center justify-center gap-4 mt-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <button onClick={handleShare} className="flex items-center gap-2 px-6 py-2.5 bg-white rounded-full text-sm font-bold shadow-sm border border-slate-100 hover:shadow-md transition-all text-slate-600">
              <Share2 size={16} /> {copied ? 'Copied!' : 'Share'}
            </button>
            <button onClick={handlePrint} className="flex items-center gap-2 px-6 py-2.5 bg-white rounded-full text-sm font-bold shadow-sm border border-slate-100 hover:shadow-md transition-all text-slate-600 hidden md:flex">
              <Printer size={16} /> Print Report
            </button>
          </div>
        </header>

        <AdPlaceholder text="Top Leaderboard" className="mb-12 max-w-4xl mx-auto rounded-2xl" />

        <div className="max-w-6xl mx-auto">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Calculator Card */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-[2rem] shadow-premium border border-white/40 overflow-hidden backdrop-blur-sm bg-opacity-80">
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                  {/* Inputs Column */}
                  <div className="p-8 md:p-10 bg-slate-50 border-r border-slate-100">
                    <div className="flex items-center gap-2 mb-8">
                      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Sparkles size={16} />
                      </div>
                      <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">Configure</h2>
                    </div>
                    <div className="space-y-1">
                      {inputs}
                    </div>
                  </div>

                  {/* Results Column */}
                  <div className="p-8 md:p-10 bg-white">
                    <div className="flex items-center gap-2 mb-8">
                      <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                        <TrendingUp size={16} />
                      </div>
                      <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">Analysis</h2>
                    </div>
                    <div className="space-y-1">
                      {results}
                    </div>
                    
                    <div className="mt-10 pt-8 border-t border-slate-100">
                      <AdPlaceholder text="Mid-Result" className="h-32" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Extra Visual Elements (Charts, etc) */}
              {children && (
                <div className="mt-8">
                  {children}
                </div>
              )}

              {/* Knowledge Base Section */}
              <div className="mt-20 space-y-20">
                
                {/* 1. Overview & Why Use */}
                {(instructions || whyUse) && (
                  <section id="overview" className="space-y-10">
                    <div className="max-w-2xl">
                       <h2 className="text-3xl font-black text-slate-900 mb-4 flex items-center gap-3">
                         <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                           <Info size={20} />
                         </div>
                         Overview & Benefits
                       </h2>
                       <div className="text-lg text-slate-500 leading-relaxed">
                         {instructions}
                       </div>
                    </div>
                    
                    {whyUse && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {whyUse.map((item, i) => (
                          <div key={i} className="group p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-start gap-4">
                              <div className="mt-1 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 group-hover:scale-110 transition-transform">
                                <CheckCircle2 size={14} />
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                                <p className="text-sm text-slate-500 leading-relaxed">{item.text}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                )}

                {/* 2. Key Features */}
                {keyFeatures && (
                  <section id="features" className="bg-slate-900 rounded-[2.5rem] p-10 md:p-16 text-white relative overflow-hidden">
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
                    <div className="relative z-10">
                      <h2 className="text-3xl font-black mb-12 flex items-center gap-3">
                        <Lightbulb className="text-warning" size={32} />
                        Key Features
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {keyFeatures.map((feat, i) => (
                          <div key={i} className="space-y-4">
                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-primary-light">
                              {i + 1}
                            </div>
                            <h4 className="text-lg font-bold">{feat.title}</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">{feat.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {/* 3. Formula & Practical Scenarios */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {formula && (
                    <section id="formula" className="bg-primary/5 rounded-[2rem] p-8 border border-primary/10">
                      <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                        <BookOpen size={20} /> Mathematical Formula
                      </h3>
                      <div className="bg-white/80 backdrop-blur rounded-2xl p-6 font-mono text-center text-primary shadow-sm border border-white">
                        {formula}
                      </div>
                      <p className="mt-4 text-xs text-primary/60 italic text-center">Standardized formula used for industry accuracy.</p>
                    </section>
                  )}
                  
                  {examples && examples.length > 0 && (
                    <section id="examples" className="bg-accent/5 rounded-[2rem] p-8 border border-accent/10">
                      <h3 className="text-xl font-bold text-accent mb-4 flex items-center gap-2">
                        <FileText size={20} /> Practical Examples
                      </h3>
                      <div className="space-y-3">
                        {examples.map((ex, idx) => (
                          <div key={idx} className="bg-white/80 backdrop-blur rounded-xl p-4 border border-white shadow-sm">
                            <p className="text-sm font-bold text-slate-900 mb-1">{ex.title}</p>
                            <p className="text-xs text-slate-500 leading-relaxed">{ex.description}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>

                {/* 4. Expert Q&A (FAQ) */}
                {faqs && faqs.length > 0 && (
                  <section id="faq" className="max-w-3xl mx-auto space-y-10">
                    <div className="text-center">
                      <h2 className="text-3xl font-black text-slate-900 mb-2">Expert Q&A</h2>
                      <p className="text-slate-500">Everything you need to know about {title}</p>
                    </div>
                    <div className="space-y-4">
                      {faqs.map((faq, idx) => (
                        <div key={idx} className="group bg-white rounded-2xl border border-slate-100 p-6 hover:border-primary/30 transition-all shadow-sm">
                           <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-start gap-3">
                             <HelpCircle size={20} className="text-primary mt-1 shrink-0" />
                             {faq.q}
                           </h4>
                           <div className="pl-8 text-slate-500 text-sm leading-relaxed">
                             {faq.a}
                           </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* 5. Pro Tips */}
                {proTips && (
                  <section id="tips" className="bg-gradient-to-br from-warning/10 to-orange-50 rounded-[2.5rem] p-10 border border-warning/20">
                    <h2 className="text-2xl font-black text-warning mb-8 flex items-center gap-3">
                      <AlertCircle size={28} />
                      Pro Tips for Accuracy
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {proTips.map((tip, i) => (
                        <div key={i} className="flex gap-3 bg-white/50 backdrop-blur rounded-2xl p-4 border border-white shadow-sm">
                          <span className="text-warning font-black">#</span>
                          <p className="text-sm text-slate-700 leading-relaxed">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

              </div>
            </div>

            {/* Sticky Sidebar */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              
              {/* Quick Nav Card */}
              <div className="bg-white rounded-[2rem] p-8 shadow-premium border border-slate-100">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                  <ChevronRight size={14} className="text-primary" /> Navigation
                </h3>
                <nav className="space-y-1">
                  {[
                    { name: 'Overview', id: 'overview', icon: Info },
                    { name: 'Features', id: 'features', icon: Lightbulb },
                    { name: 'Formula', id: 'formula', icon: BookOpen },
                    { name: 'Scenarios', id: 'examples', icon: FileText },
                    { name: 'FAQ', id: 'faq', icon: HelpCircle },
                    { name: 'Expert Tips', id: 'tips', icon: AlertCircle }
                  ].map(item => (
                    <a 
                      key={item.id}
                      href={`#${item.id}`}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-primary hover:bg-primary/5 transition-all text-sm font-bold group"
                    >
                      <item.icon size={16} className="opacity-40 group-hover:opacity-100" />
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Related Tools Card */}
              <div className="bg-white rounded-[2rem] p-8 shadow-premium border border-slate-100">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                  <Calculator size={14} className="text-primary" /> Related Tools
                </h3>
                <div className="grid gap-2">
                  {relatedTools.map((tool, i) => (
                    <Link 
                      key={i} 
                      to={tool.path}
                      className="group flex items-center justify-between p-4 bg-slate-50/50 hover:bg-white rounded-2xl border border-transparent hover:border-primary/20 hover:shadow-md transition-all text-slate-700"
                    >
                      <span className="text-sm font-bold group-hover:text-primary">{tool.name}</span>
                      <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-primary" />
                    </Link>
                  ))}
                </div>
              </div>

              <AdPlaceholder text="Sidebar Ad" className="h-[400px] rounded-3xl" />
            </aside>

          </div>
        </div>
      </div>
    </div>
  );
}
