import React, { useState } from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function GradeCalculator() {
  const [grades, setGrades] = useState([
    { id: 1, name: 'Assignment 1', score: 85, weight: 20 },
    { id: 2, name: 'Midterm', score: 78, weight: 30 },
    { id: 3, name: 'Final Exam', score: 92, weight: 50 },
  ]);

  const addGrade = () => {
    setGrades([...grades, { id: Date.now(), name: `Item ${grades.length + 1}`, score: 0, weight: 0 }]);
  };

  const removeGrade = (id) => {
    if (grades.length > 1) {
      setGrades(grades.filter(g => g.id !== id));
    }
  };

  const updateGrade = (id, field, value) => {
    setGrades(grades.map(g => g.id === id ? { ...g, [field]: value } : g));
  };

  const calculateFinalGrade = () => {
    let totalWeightedScore = 0;
    let totalWeight = 0;
    
    grades.forEach(g => {
      totalWeightedScore += (g.score * (g.weight / 100));
      totalWeight += g.weight;
    });
    
    return {
        final: totalWeight > 0 ? (totalWeightedScore / (totalWeight / 100)) : 0,
        totalWeight
    };
  };

  const { final, totalWeight } = calculateFinalGrade();

  const inputs = (
    <div className="space-y-4">
      <div className="hidden md:grid grid-cols-12 gap-2 text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-4 px-2">
          <div className="col-span-6">Assessment Name</div>
          <div className="col-span-3 text-center">Score %</div>
          <div className="col-span-2 text-center">Weight %</div>
          <div className="col-span-1"></div>
      </div>
      
      <div className="space-y-3">
        {grades.map(g => (
          <div key={g.id} className="grid grid-cols-12 gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-200 group hover:border-primary/20 transition">
             <div className="col-span-12 md:col-span-6">
                <input 
                  type="text" 
                  className="bg-transparent border-none focus:ring-0 text-sm font-bold w-full text-slate-900" 
                  placeholder="e.g. Final Exam"
                  value={g.name} 
                  onChange={e => updateGrade(g.id, 'name', e.target.value)} 
                />
             </div>
             <div className="col-span-5 md:col-span-3">
                <input 
                  type="number" 
                  className="input-field py-1.5 text-center font-black" 
                  value={g.score} 
                  onChange={e => updateGrade(g.id, 'score', Number(e.target.value))} 
                />
             </div>
             <div className="col-span-5 md:col-span-2">
                <input 
                  type="number" 
                  className="input-field py-1.5 text-center font-black" 
                  value={g.weight} 
                  onChange={e => updateGrade(g.id, 'weight', Number(e.target.value))} 
                />
             </div>
             <div className="col-span-2 md:col-span-1 flex justify-center">
                <button 
                  onClick={() => removeGrade(g.id)}
                  className="text-muted hover:text-red-500 transition-colors p-1"
                  title="Remove Item"
                >
                  <Trash2 size={16} />
                </button>
             </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={addGrade}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-slate-200 text-muted hover:border-primary/40 hover:text-primary-light transition text-sm font-bold uppercase tracking-widest mt-4"
      >
        <Plus size={16} /> Add Assessment
      </button>
    </div>
  );

  const results = (
    <div className="space-y-6">
      <div className="p-10 bg-primary/5 rounded-2xl border border-primary/20 text-center shadow-inner group transition-all">
        <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-2">Final Weighted Grade</p>
        <p className="text-7xl font-black text-slate-900 group-hover:scale-105 transition-transform">
          {final.toFixed(1)}<span className="text-2xl font-normal opacity-40 ml-1">%</span>
        </p>
      </div>
      
      <div className={`p-5 rounded-2xl border transition-all text-center ${totalWeight === 100 ? 'bg-green-500/10 border-green-500/20 text-green-600' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600'}`}>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60">Total Weight Allocated</p>
        <p className="text-3xl font-black">{totalWeight}%</p>
        {totalWeight !== 100 && (
          <p className="text-[10px] mt-2 font-medium">Total weight should equal 100% for calculation to be valid.</p>
        )}
      </div>
    </div>
  );

  const instructions = (
    <div className="space-y-4">
      <p>
        Stay on top of your academic performance with our Weighted Grade Calculator. It helps students understand their standing in a course by factoring in the different "weights" of various assessments.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li><strong>Assessment Name:</strong> Give each item a name (e.g., Midterm, Quiz 1).</li>
        <li><strong>Score (%):</strong> Enter the percentage grade you received (0-100).</li>
        <li><strong>Weight (%):</strong> Enter how much that assessment counts toward your final grade.</li>
      </ul>
    </div>
  );

  const formula = "Grade = Σ (Score × Weight) / 100";

  const examples = [
    {
      title: "Science Course",
      description: "Labs (30%), Midterm (30%), and Final (40%). This tool helps you calculate what you need on the final to get an A."
    },
    {
      title: "Passing Requirement",
      description: "If you have a 40% in assignments (worth 50%) and need a 50% overall to pass, this tool shows you need a 60% on the final exam."
    }
  ];

  const faqs = [
    {
      q: "What if my weights don't add up to 100?",
      a: "The calculator will still calculate a weighted average, but it won't represent your complete final course grade accurately unless all components are included."
    },
    {
      q: "Can I use this for GPA?",
      a: "While this calculates percentages, you can convert your final percentage to a GPA scale (4.0, etc.) once the final number is determined."
    }
  ];

  return (
    <CalculatorLayout
      title="Grade Calculator"
      seoTitle="Weighted Grade Calculator - Final Grade & GPA Tool"
      description="Calculate your final class grade or GPA based on weighted exams, assignments, and projects. Accurate, simple academic tracking."
      path="/other/grade-calculator"
      icon={GraduationCap}
      inputs={inputs}
      results={results}
      instructions={instructions}
      formula={formula}
      examples={examples}
      faqs={faqs}
    />
  );
}
