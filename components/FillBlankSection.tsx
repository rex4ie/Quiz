
import React from 'react';
import type { QuizSection, FillBlankQuestion } from '../types';
import { QuizSectionCard } from './QuizSectionCard';

interface Props {
  section: QuizSection<FillBlankQuestion[]> & { wordBank: string[] };
  userAnswers: { [key: number]: string };
  onAnswerChange: (questionIndex: number, answer: string) => void;
  isSubmitted: boolean;
}

export const FillBlankSection: React.FC<Props> = ({ section, userAnswers, onAnswerChange, isSubmitted }) => {
  return (
    <QuizSectionCard title={section.title} instructions={section.instructions}>
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="font-semibold">Word Bank:</span>
        {section.wordBank.map(word => (
            <span key={word} className="bg-slate-200 text-slate-700 px-2 py-1 rounded-md text-sm">{word}</span>
        ))}
      </div>
      {section.questions.map((q, index) => {
        const selectedAnswer = userAnswers[index] || '';
        const isCorrect = selectedAnswer === q.correctAnswer;
        
        let feedbackClasses = 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500';
        if (isSubmitted) {
          if (isCorrect) {
            feedbackClasses = 'bg-green-100 border-green-500 text-green-800';
          } else {
            feedbackClasses = 'bg-red-100 border-red-500 text-red-800';
          }
        }

        return (
          <div key={index} className="border-t border-slate-200 pt-4">
            <div className="flex items-center flex-wrap gap-2">
                <span>{q.sentenceParts[0]}</span>
                <select
                    value={selectedAnswer}
                    onChange={(e) => onAnswerChange(index, e.target.value)}
                    disabled={isSubmitted}
                    className={`rounded-md shadow-sm w-40 ${feedbackClasses}`}
                >
                    <option value="" disabled>Select a word</option>
                    {section.wordBank.map(word => (
                        <option key={word} value={word}>{word}</option>
                    ))}
                </select>
                <span>{q.sentenceParts[1]}</span>
            </div>
            {isSubmitted && !isCorrect && (
              <div className="mt-2 p-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm">
                <strong>Correct Answer:</strong> {q.correctAnswer}
              </div>
            )}
          </div>
        );
      })}
    </QuizSectionCard>
  );
};
