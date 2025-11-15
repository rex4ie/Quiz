
import type { QuizSection, MultipleChoiceQuestion, FillBlankQuestion, MatchingQuestionData, OddOneOutQuestion, ShortAnswerQuestion } from './types';

const multipleChoiceSection: QuizSection<MultipleChoiceQuestion[]> = {
  title: 'Section 1: Multiple Choice',
  instructions: 'Choose the best answer that completes the sentence or answers the question.',
  questions: [
    {
      question: '1. If a politician is described as modest, they are most likely to:',
      options: [
        'a) Talk constantly about their royal connections.',
        'b) Preach about how they are the sole reason for the city\'s success.',
        'c) Credit their team and the voters for any achievements.',
        'd) Occupy the best office and demand an elite salary.'
      ],
      correctAnswerIndex: 2,
      feedback: 'Modest is a synonym for humble.'
    },
    {
      question: '2. Which of the following would NOT be a primary concern for archaeology?',
      options: [
        'a) The interior of an Egyptian pyramid.',
        'b) Studying the core of a 2,000-year-old tree to see its age.',
        'c) Analyzing metal fragments made by an ancient blacksmith.',
        'd) A chamber found buried under a modern city.'
      ],
      correctAnswerIndex: 1,
      feedback: 'This is dendrology; archaeology is the study of human history and ancient societies.'
    },
    {
      question: '3. A company might need to compensate its employees if:',
      options: [
        'a) The employees exceed their sales goals and earn a bonus.',
        'b) A new project arises that requires them to work overtime.',
        'c) The company prospers and decides to share the profits.',
        'd) The CEO founds a new branch in a different province.'
      ],
      correctAnswerIndex: 1,
      feedback: 'Compensate means to pay someone for work or something lost.'
    },
    {
      question: '4. A person who is part of the elite group in society would LEAST likely be:',
      options: [
        'a) A benefactor who donates millions to a university.',
        'b) Someone with a distinct accent from a working-class neighborhood.',
        'c) A royal family member.',
        'd) Someone who has glory from winning a major award.'
      ],
      correctAnswerIndex: 1,
      feedback: 'The elite are a high-level group, often associated with wealth and power, not a typical working-class background.'
    }
  ]
};

const fillBlankSection: QuizSection<FillBlankQuestion[]> & { wordBank: string[] } = {
  title: 'Section 2: Fill in the Blank',
  instructions: 'Use the words from the word bank to complete the sentences. Each word is used only once.',
  wordBank: ['sustain', 'forge', 'channel', 'acre', 'agreement', 'corridor'],
  questions: [
    { sentenceParts: ['1. It is very difficult to ', ' a friendship when you never see each other.'], correctAnswer: 'sustain' },
    { sentenceParts: ['2. The long, narrow ', ' was dark, with doors on either side.'], correctAnswer: 'corridor' },
    { sentenceParts: ['3. They signed a formal ', ' to never compete in the same market.'], correctAnswer: 'agreement' },
    { sentenceParts: ['4. A farmer needs at least one ', ' of land to grow a small crop.'], correctAnswer: 'acre' },
    { sentenceParts: ['5. They had to dig a deep ', ' to redirect the water from the flood.'], correctAnswer: 'channel' },
    { sentenceParts: ['6. The two rival companies decided to ', ' an alliance to defeat a common competitor.'], correctAnswer: 'forge' }
  ]
};

const matchingSection: QuizSection<MatchingQuestionData> = {
  title: 'Section 3: Synonym Matching',
  instructions: 'Match the vocabulary word from Column A with its closest synonym or definition in Column B.',
  questions: {
    columnA: ['1. Humble', '2. Gap', '3. Found (v.)', '4. Surface'],
    columnB: ['a) A space between two things', 'b) To establish or start', 'c) The top layer of something', 'd) Not arrogant; modest'],
    correctMatches: {
      '1. Humble': 'd) Not arrogant; modest',
      '2. Gap': 'a) A space between two things',
      '3. Found (v.)': 'b) To establish or start',
      '4. Surface': 'c) The top layer of something'
    }
  }
};

const oddOneOutSection: QuizSection<OddOneOutQuestion[]> = {
  title: 'Section 4: Odd One Out',
  instructions: 'Identify the word that does not belong in the group and briefly explain why.',
  questions: [
    { 
      group: ['chimney', 'ladder', 'stairs', 'penny'],
      oddWord: 'penny',
      reason: 'The other three (chimney, ladder, stairs) are all parts of or attachments to a building. A penny is currency.'
    },
    {
      group: ['engineer', 'blacksmith', 'benefactor', 'lion'],
      oddWord: 'lion',
      reason: 'The other three (engineer, blacksmith, benefactor) are types of people or roles. A lion is an animal.'
    },
    {
      group: ['arise', 'encounter', 'exceed', 'satisfaction'],
      oddWord: 'satisfaction',
      reason: 'The other three (arise, encounter, exceed) are all verbs (actions). Satisfaction is a noun (a feeling).'
    }
  ]
};

const shortAnswerSection: QuizSection<ShortAnswerQuestion[]> = {
  title: 'Section 5: Short Answer Application',
  instructions: 'Answer the following questions in one or two complete sentences, using the bolded words correctly.',
  questions: [
    {
      question: "1. What is the difference between a person's **role** and their **afterlife**?",
      sampleAnswer: "A person's **role** is their job or position in life (like being a student or a doctor), whereas their **afterlife** is what some people believe happens after they die."
    },
    {
      question: '2. Why might a person feel **satisfaction** after climbing a tall **ladder**?',
      sampleAnswer: "A person might feel **satisfaction** because climbing a tall **ladder** can be a difficult or scary task, and they are happy they successfully completed it."
    },
    {
      question: '3. If you **encounter** someone who is **royal**, what is one way your behavior might be **distinct** from how you normally act?',
      sampleAnswer: "If I **encounter** someone who is **royal**, my behavior might be **distinct** because I would be more formal, perhaps by bowing or using a specific title, which I don't do for most people."
    }
  ]
};

export const quizData = [
    multipleChoiceSection,
    fillBlankSection,
    matchingSection,
    oddOneOutSection,
    shortAnswerSection
];

export const totalGradableQuestions = 
    multipleChoiceSection.questions.length + 
    fillBlankSection.questions.length + 
    matchingSection.questions.columnA.length + 
    oddOneOutSection.questions.length;
