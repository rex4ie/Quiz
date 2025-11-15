
import React from 'react';
import type { QuizSection, MultipleChoiceQuestion } from '../types';
import { QuizSectionCard } from './QuizSectionCard';

interface Props {
  section: QuizSection<MultipleChoiceQuestion[]>;
  userAnswers: { [key: number]: string };
  onAnswerChange: (questionIndex: number, answer: string) => void;
  isSubmitted: boolean;
}

export const MultipleChoiceSection: React.FC<Props> = ({ section, userAnswers, onAnswerChange, isSubmitted }) => {
  return (
    <QuizSectionCard title={section.title} instructions={section.instructions}>
      {section.questions.map((q, index) => {
        const selectedAnswer = userAnswers[index];
        const correctAnswer = q.options[q.correctAnswerIndex];
        return (
          <div key={index} className="border-t border-slate-200 pt-4">
            <p className="font-semibold mb-3">{q.question}</p>
            <div className="space-y-2">
              {q.options.map((option, optionIndex) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === correctAnswer;
                
                let feedbackClasses = 'border-slate-300';
                if (isSubmitted) {
                  if (isCorrect) {
                    feedbackClasses = 'bg-green-100 border-green-500 text-green-800';
                  } else if (isSelected && !isCorrect) {
                    feedbackClasses = 'bg-red-100 border-red-500 text-red-800';
                  }
                }
                
                return (
                  <label
                    key={optionIndex}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${feedbackClasses} ${!isSubmitted ? 'hover:bg-slate-100' : 'cursor-default'}`}
                  >
                    <input
                      type="radio"
                      name={`mc-q-${index}`}
                      value={option}
                      checked={isSelected}
                      onChange={(e) => onAnswerChange(index, e.target.value)}
                      disabled={isSubmitted}
                      className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="ml-3">{option}</span>
                  </label>
                );
              })}
            </div>
            {isSubmitted && selectedAnswer !== correctAnswer && (
              <div className="mt-2 p-3 bg-yellow-100 text-yellow-800 rounded-lg text-sm">
                <strong>Correct Answer:</strong> {correctAnswer} <br/>
                <strong>Reason:</strong> {q.feedback}
              </div>
            )}
          </div>
        );
      })}
    </QuizSectionCard>
  );
};
