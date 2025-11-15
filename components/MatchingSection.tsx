
import React from 'react';
import type { QuizSection, MatchingQuestionData } from '../types';
import { QuizSectionCard } from './QuizSectionCard';

interface Props {
  section: QuizSection<MatchingQuestionData>;
  userAnswers: { [key: number]: string };
  onAnswerChange: (questionIndex: number, answer: string) => void;
  isSubmitted: boolean;
}

export const MatchingSection: React.FC<Props> = ({ section, userAnswers, onAnswerChange, isSubmitted }) => {
  const { columnA, columnB, correctMatches } = section.questions;

  return (
    <QuizSectionCard title={section.title} instructions={section.instructions}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <h3 className="font-bold text-lg mb-2 text-center bg-slate-100 p-2 rounded-t-lg">Column A</h3>
            <div className="space-y-2">
                {columnA.map((item, index) => {
                    const selectedAnswer = userAnswers[index] || '';
                    const correctAnswer = correctMatches[item];
                    const isCorrect = selectedAnswer === correctAnswer;

                    let feedbackClasses = 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500';
                     if (isSubmitted) {
                        feedbackClasses = isCorrect ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500';
                    }

                    return (
                        <div key={index} className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm">
                            <span className="font-semibold">{item}</span>
                            <select
                                value={selectedAnswer}
                                onChange={e => onAnswerChange(index, e.target.value)}
                                disabled={isSubmitted}
                                className={`rounded-md shadow-sm w-48 text-sm ${feedbackClasses}`}
                            >
                                <option value="" disabled>Select a match</option>
                                {columnB.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    );
                })}
            </div>
        </div>
        <div>
            <h3 className="font-bold text-lg mb-2 text-center bg-slate-100 p-2 rounded-t-lg">Column B</h3>
            <ul className="list-none space-y-2">
                {columnB.map(item => (
                    <li key={item} className="p-3 bg-slate-50 rounded-lg">{item}</li>
                ))}
            </ul>
        </div>
      </div>
       {isSubmitted && (
            <div className="mt-4 border-t border-slate-200 pt-4">
                <h4 className="font-bold mb-2">Correct Answers:</h4>
                <ul className="list-disc list-inside text-sm text-slate-600">
                    {Object.entries(correctMatches).map(([key, value]) => (
                        <li key={key}><strong>{key.split('. ')[1]}:</strong> {value}</li>
                    ))}
                </ul>
            </div>
        )}
    </QuizSectionCard>
  );
};
