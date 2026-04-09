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

  const InputPanel = (
    <div className="space-y-4">
      <div className="hidden md:grid grid-cols-12 gap-2 text-xs font-bold text-muted uppercase tracking-wider mb-2 px-2">
          <div className="col-span-6">Assessment Name</div>
          <div className="col-span-3 text-center">Score (%)</div>
          <div className="col-span-2 text-center">Weight (%)</div>
          <div className="col-span-1"></div>
      </div>
      
      {grades.map(g => (
        <div key={g.id} className="grid grid-cols-12 gap-2 items-center bg-secondary/30 p-2 rounded-lg border border-border-color/50">
           <div className="col-span-12 md:col-span-6">
              <input 
                type="text" 
                className="input-field py-2 text-sm" 
                placeholder="e.g. Final Exam"
                value={g.name} 
                onChange={e => updateGrade(g.id, 'name', e.target.value)} 
              />
           </div>
           <div className="col-span-5 md:col-span-3">
              <input 
                type="number" 
                className="input-field py-2 text-center" 
                value={g.score} 
                onChange={e => updateGrade(g.id, 'score', Number(e.target.value))} 
              />
           </div>
           <div className="col-span-5 md:col-span-2">
              <input 
                type="number" 
                className="input-field py-2 text-center" 
                value={g.weight} 
                onChange={e => updateGrade(g.id, 'weight', Number(e.target.value))} 
              />
           </div>
           <div className="col-span-2 md:col-span-1 flex justify-center">
              <button 
                onClick={() => removeGrade(g.id)}
                className="text-muted hover:text-red-500 transition"
                title="Remove Item"
              >
                <Trash2 size={18} />
              </button>
           </div>
        </div>
      ))}
      
      <button 
        onClick={addGrade}
        className="btn-outline w-full flex items-center justify-center gap-2 py-3 border-dashed"
      >
        <Plus size={16} /> Add Assessment
      </button>
    </div>
  );

  const ResultPanel = (
    <div className="flex flex-col h-full justify-center">
      <div className="mb-6 p-8 bg-primary/10 rounded-xl border-2 border-primary/30 text-center flex flex-col items-center justify-center relative shadow-inner">
        <p className="text-primary-light mb-2 font-black uppercase tracking-widest text-sm drop-shadow">Final Weighted Grade</p>
        <p className="text-6xl font-black text-white drop-shadow-md">
          {final.toFixed(1)} <span className="text-2xl font-normal opacity-70">%</span>
        </p>
      </div>
      
      <div className={`p-4 rounded-lg border-l-4 text-center transition-all ${totalWeight === 100 ? 'bg-success/10 border-success text-success' : 'bg-warning/10 border-warning text-warning-vivid'}`}>
        <p className="text-xs font-bold uppercase mb-1">Total Weight Allocated</p>
        <p className="text-xl font-black">{totalWeight}%</p>
        {totalWeight !== 100 && <p className="text-[10px] mt-1 opacity-80">Warning: Total weight should equal 100% for accurate results.</p>}
      </div>
    </div>
  );

  return (
    <CalculatorLayout
      title="Weighted Grade Calculator"
      description="Calculate your final class grade or GPA based on weighted exams, assignments, and projects."
      path="/other/grade-calculator"
      icon={GraduationCap}
      inputs={InputPanel}
      results={ResultPanel}
      instructions={<p>Enter the name, your score, and the importance (weight) of each assessment. The calculator will determine your overall weighted average for the course.</p>}
    />
  );
}
