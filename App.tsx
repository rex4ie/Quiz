

import React, { useState, useCallback } from 'react';
import { quizData, totalGradableQuestions } from './constants';
// FIX: Import necessary types for type assertions.
import type { UserAnswers, QuizSection, MultipleChoiceQuestion, FillBlankQuestion, MatchingQuestionData, OddOneOutQuestion } from './types';
import { MultipleChoiceSection } from './components/MultipleChoiceSection';
import { FillBlankSection } from './components/FillBlankSection';
import { MatchingSection } from './components/MatchingSection';
import { OddOneOutSection } from './components/OddOneOutSection';
import { ShortAnswerSection } from './components/ShortAnswerSection';
import { Results } from './components/Results';

const App: React.FC = () => {
  const getInitialAnswers = (): UserAnswers => ({
    multipleChoice: {},
    fillInTheBlank: {},
    matching: {},
    oddOneOut: {},
    shortAnswer: {},
  });

  const [userAnswers, setUserAnswers] = useState<UserAnswers>(getInitialAnswers());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerChange = useCallback((section: keyof UserAnswers, questionIndex: number, answer: any) => {
    if (isSubmitted) return;
    setUserAnswers(prev => {
        const newSectionAnswers = { ...prev[section], [questionIndex]: answer };
        return { ...prev, [section]: newSectionAnswers };
    });
  }, [isSubmitted]);

  const handleSubmit = () => {
    let currentScore = 0;
    
    // Score Multiple Choice
    // FIX: Add type assertion to correctly type the section data from quizData array.
    const mcSection = quizData[0] as QuizSection<MultipleChoiceQuestion[]>;
    for (let i = 0; i < mcSection.questions.length; i++) {
      if (userAnswers.multipleChoice[i] === mcSection.questions[i].options[mcSection.questions[i].correctAnswerIndex]) {
        currentScore++;
      }
    }

    // Score Fill in the Blank
    // FIX: Add type assertion to correctly type the section data from quizData array.
    const fbSection = quizData[1] as QuizSection<FillBlankQuestion[]>;
    for (let i = 0; i < fbSection.questions.length; i++) {
      if (userAnswers.fillInTheBlank[i] === fbSection.questions[i].correctAnswer) {
        currentScore++;
      }
    }

    // Score Matching
    // FIX: Add type assertion to correctly type the section data from quizData array.
    const matchSection = quizData[2] as QuizSection<MatchingQuestionData>;
    for(let i = 0; i < matchSection.questions.columnA.length; i++) {
        const questionText = matchSection.questions.columnA[i];
        if (userAnswers.matching[i] === matchSection.questions.correctMatches[questionText]) {
            currentScore++;
        }
    }

    // Score Odd One Out (word only)
    // FIX: Add type assertion to correctly type the section data from quizData array.
    const oooSection = quizData[3] as QuizSection<OddOneOutQuestion[]>;
    for(let i = 0; i < oooSection.questions.length; i++) {
        if(userAnswers.oddOneOut[i]?.word === oooSection.questions[i].oddWord) {
            currentScore++;
        }
    }
    
    setScore(currentScore);
    setIsSubmitted(true);
    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    setUserAnswers(getInitialAnswers());
    setIsSubmitted(false);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-2">Difficult Vocabulary Quiz</h1>
          <p className="text-slate-600">Based on the provided word lists, test your mastery with these challenging questions.</p>
        </header>

        <main>
          {isSubmitted && <Results score={score} total={totalGradableQuestions} onReset={handleReset} />}

          <div className="space-y-8">
            <MultipleChoiceSection
                section={quizData[0]}
                userAnswers={userAnswers.multipleChoice}
                onAnswerChange={(index, answer) => handleAnswerChange('multipleChoice', index, answer)}
                isSubmitted={isSubmitted}
            />
            <FillBlankSection
                section={quizData[1]}
                userAnswers={userAnswers.fillInTheBlank}
                onAnswerChange={(index, answer) => handleAnswerChange('fillInTheBlank', index, answer)}
                isSubmitted={isSubmitted}
            />
            <MatchingSection
                section={quizData[2]}
                userAnswers={userAnswers.matching}
                onAnswerChange={(index, answer) => handleAnswerChange('matching', index, answer)}
                isSubmitted={isSubmitted}
            />
            <OddOneOutSection
                section={quizData[3]}
                userAnswers={userAnswers.oddOneOut}
                onAnswerChange={(index, answer) => handleAnswerChange('oddOneOut', index, answer)}
                isSubmitted={isSubmitted}
            />
            <ShortAnswerSection
                section={quizData[4]}
                userAnswers={userAnswers.shortAnswer}
                onAnswerChange={(index, answer) => handleAnswerChange('shortAnswer', index, answer)}
                isSubmitted={isSubmitted}
            />
          </div>

          {!isSubmitted && (
            <div className="mt-12 text-center">
              <button
                onClick={handleSubmit}
                className="bg-indigo-600 text-white font-bold py-3 px-10 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
              >
                Submit Answers
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;