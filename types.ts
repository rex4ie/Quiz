
export interface MultipleChoiceQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  feedback: string;
}

export interface FillBlankQuestion {
  sentenceParts: [string, string];
  correctAnswer: string;
}

export interface MatchingQuestionData {
  columnA: string[];
  columnB: string[];
  correctMatches: Record<string, string>;
}

export interface OddOneOutQuestion {
  group: string[];
  oddWord: string;
  reason: string;
}

export interface ShortAnswerQuestion {
  question: string;
  sampleAnswer: string;
}

export interface QuizSection<T> {
  title: string;
  instructions: string;
  questions: T;
}

export interface UserAnswers {
    multipleChoice: { [key: number]: string };
    fillInTheBlank: { [key: number]: string };
    matching: { [key: number]: string };
    oddOneOut: { [key: number]: { word: string; reason: string } };
    shortAnswer: { [key: number]: string };
}
