
import React from 'react';
import type { QuizSection, OddOneOutQuestion } from '../types';
import { QuizSectionCard } from './QuizSectionCard';

interface Props {
  section: QuizSection<OddOneOutQuestion[]>;
  userAnswers: { [key: number]: { word: string; reason: string } };
  onAnswerChange: (questionIndex: number, answer: { word: string; reason: string }) => void;
  isSubmitted: boolean;
}

export const OddOneOutSection: React.FC<Props> = ({ section, userAnswers, onAnswerChange, isSubmitted }) => {
  return (
    <QuizSectionCard title={section.title} instructions={section.instructions}>
      {section.questions.map((q, index) => {
        const userAnswer = userAnswers[index] || { word: '', reason: '' };
        const isCorrect = userAnswer.word === q.oddWord;

        return (
          <div key={index} className="border-t border-slate-200 pt-4">
            <p className="font-semibold mb-3">Group {index + 1}:</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {q.group.map(word => {
                    const isSelected = userAnswer.word === word;
                    
                    let feedbackClasses = 'bg-slate-200 hover:bg-slate-300';
                    if (isSubmitted) {
                        if (word === q.oddWord) {
                            feedbackClasses = 'bg-green-200 text-green-900 ring-2 ring-green-500';
                        } else if (isSelected && !isCorrect) {
                            feedbackClasses = 'bg-red-200 text-red-900 ring-2 ring-red-500';
                        }
                    } else if (isSelected) {
                        feedbackClasses = 'bg-indigo-500 text-white';
                    }

                    return (
                        <button
                            key={word}
                            onClick={() => onAnswerChange(index, { ...userAnswer, word })}
                            disabled={isSubmitted}
                            className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${feedbackClasses}`}
                        >
                            {word}
                        </button>
                    );
                })}
            </div>
            <div className="flex flex-col">
                <label className="font-semibold mb-1">Reason:</label>
                <input
                    type="text"
                    value={userAnswer.reason}
                    onChange={e => onAnswerChange(index, { ...userAnswer, reason: e.target.value })}
                    disabled={isSubmitted}
                    className="rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 w-full"
                />
            </div>
            {isSubmitted && (
              <div className="mt-2 p-3 bg-yellow-100 text-yellow-800 rounded-lg text-sm">
                <strong>Correct Answer:</strong> {q.oddWord} <br/>
                <strong>Reason:</strong> {q.reason}
              </div>
            )}
          </div>
        );
      })}
    </QuizSectionCard>
  );
};
