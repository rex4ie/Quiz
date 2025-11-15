
import React from 'react';
import type { QuizSection, ShortAnswerQuestion } from '../types';
import { QuizSectionCard } from './QuizSectionCard';

interface Props {
  section: QuizSection<ShortAnswerQuestion[]>;
  userAnswers: { [key: number]: string };
  onAnswerChange: (questionIndex: number, answer: string) => void;
  isSubmitted: boolean;
}

const formatQuestionText = (text: string) => {
    return text.split('**').map((part, index) => 
        index % 2 === 1 ? <strong key={index}>{part}</strong> : part
    );
};

export const ShortAnswerSection: React.FC<Props> = ({ section, userAnswers, onAnswerChange, isSubmitted }) => {
  return (
    <QuizSectionCard title={section.title} instructions={section.instructions}>
      {section.questions.map((q, index) => {
        const userAnswer = userAnswers[index] || '';
        return (
          <div key={index} className="border-t border-slate-200 pt-4">
            <p className="font-semibold mb-3">{formatQuestionText(q.question)}</p>
            <textarea
              value={userAnswer}
              onChange={(e) => onAnswerChange(index, e.target.value)}
              disabled={isSubmitted}
              rows={3}
              className="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-slate-100"
              placeholder="Your answer..."
            />
            {isSubmitted && (
              <div className="mt-2 p-3 bg-blue-100 text-blue-800 rounded-lg">
                <h4 className="font-bold">Sample Answer:</h4>
                <p className="text-sm">{formatQuestionText(q.sampleAnswer)}</p>
              </div>
            )}
          </div>
        );
      })}
    </QuizSectionCard>
  );
};
