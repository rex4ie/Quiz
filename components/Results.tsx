
import React from 'react';

interface ResultsProps {
  score: number;
  total: number;
  onReset: () => void;
}

export const Results: React.FC<ResultsProps> = ({ score, total, onReset }) => {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  
  let feedbackMessage = '';
  if (percentage >= 90) {
    feedbackMessage = 'Excellent work! You have a strong vocabulary.';
  } else if (percentage >= 70) {
    feedbackMessage = 'Great job! You know your words well.';
  } else if (percentage >= 50) {
    feedbackMessage = 'Good effort! Keep practicing to improve.';
  } else {
    feedbackMessage = 'Keep studying! Every attempt helps you learn.';
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 text-center mb-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-2">Quiz Complete!</h2>
      <p className="text-lg text-slate-600 mb-4">You scored</p>
      <p className="text-6xl font-extrabold text-indigo-600 mb-4">
        {score} / {total}
      </p>
      <div className="w-full bg-slate-200 rounded-full h-4 mb-4">
        <div 
          className="bg-indigo-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-xl font-medium text-slate-700 mb-6">{feedbackMessage}</p>
      <button
        onClick={onReset}
        className="bg-slate-600 text-white font-bold py-2 px-8 rounded-lg shadow-md hover:bg-slate-700 transition-colors duration-300"
      >
        Try Again
      </button>
    </div>
  );
};
