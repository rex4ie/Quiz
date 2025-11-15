
import React from 'react';

interface QuizSectionCardProps {
  title: string;
  instructions: string;
  children: React.ReactNode;
}

export const QuizSectionCard: React.FC<QuizSectionCardProps> = ({ title, instructions, children }) => {
  return (
    <section className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-700 mb-1">{title}</h2>
      <p className="text-slate-500 mb-6">{instructions}</p>
      <div className="space-y-6">
        {children}
      </div>
    </section>
  );
};
