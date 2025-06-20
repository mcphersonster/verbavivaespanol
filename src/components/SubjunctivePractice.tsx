'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle } from 'lucide-react';

type PracticeQuestion = {
  id: number;
  sentence: string;
  options: [string, string];
  correctAnswer: string;
  explanation: string;
};

const practiceQuestions: PracticeQuestion[] = [
  { id: 1, sentence: 'Espero que ___ un buen viaje.', options: ['tienes', 'tengas'], correctAnswer: 'tengas', explanation: 'Use subjunctive for wishes with "esperar que".' },
  { id: 2, sentence: 'No creo que ___ a llover hoy.', options: ['va', 'vaya'], correctAnswer: 'vaya', explanation: 'Use subjunctive for doubt/denial with "no creer que".' },
  { id: 3, sentence: 'Es importante que ___ atención.', options: ['prestas', 'prestes'], correctAnswer: 'prestes', explanation: 'Use subjunctive after impersonal expressions like "es importante que".' },
  { id: 4, sentence: 'Te recomiendo que ___ ese libro.', options: ['lees', 'leas'], correctAnswer: 'leas', explanation: 'Use subjunctive for recommendations with "recomendar que".' },
  { id: 5, sentence: 'Ojalá ___ buen tiempo mañana.', options: ['hace', 'haga'], correctAnswer: 'haga', explanation: 'Use subjunctive after "ojalá".' },
  { id: 6, sentence: 'Me alegro de que ___ aquí.', options: ['estás', 'estés'], correctAnswer: 'estés', explanation: 'Use subjunctive to express emotions about another action.' },
  { id: 7, sentence: 'Dudo que él ___ la respuesta.', options: ['sabe', 'sepa'], correctAnswer: 'sepa', explanation: 'Use subjunctive to express doubt with "dudar que".' },
  { id: 8, sentence: 'Busco a alguien que ___ hablar japonés.', options: ['sabe', 'sepa'], correctAnswer: 'sepa', explanation: 'Use subjunctive for an indefinite or non-existent antecedent.' },
  { id: 9, sentence: 'Cuando ___ a casa, llámame.', options: ['llegas', 'llegues'], correctAnswer: 'llegues', explanation: 'Use subjunctive with "cuando" to refer to a future, pending action.' },
  { id: 10, sentence: 'Es una lástima que no ___ venir.', options: ['puedes', 'puedas'], correctAnswer: 'puedas', explanation: 'Use subjunctive after impersonal expressions of emotion.' },
  { id: 11, sentence: 'Aunque ___ rico, no sería feliz.', options: ['soy', 'fuera'], correctAnswer: 'fuera', explanation: 'Use imperfect subjunctive in hypothetical situations with "aunque".' },
  { id: 12, sentence: 'Es necesario que todos ___.', options: ['colaboran', 'colaboren'], correctAnswer: 'colaboren', explanation: 'Use subjunctive after impersonal expressions of necessity.' },
  { id: 13, sentence: 'Mi madre quiere que yo ___ mi cuarto.', options: ['limpio', 'limpie'], correctAnswer: 'limpie', explanation: 'Use subjunctive for wishes/wants with "querer que".' },
  { id: 14, sentence: 'No hay nadie que ___ hacerlo como él.', options: ['puede', 'pueda'], correctAnswer: 'pueda', explanation: 'Use subjunctive after a negative antecedent ("no hay nadie que").' },
  { id: 15, sentence: 'Te lo diré para que lo ___.', options: ['entiendes', 'entiendas'], correctAnswer: 'entiendas', explanation: 'Use subjunctive after "para que" to express purpose.' },
  { id: 16, sentence: 'Quizás ___ a la fiesta más tarde.', options: ['vengo', 'venga'], correctAnswer: 'venga', explanation: 'Use subjunctive with "quizás" to express doubt or possibility.' },
  { id: 17, sentence: 'Es mejor que ___ ahora.', options: ['te vas', 'te vayas'], correctAnswer: 'te vayas', explanation: 'Use subjunctive for recommendations with "es mejor que".' },
  { id: 18, sentence: 'Insisto en que tú me ___ la verdad.', options: ['dices', 'digas'], correctAnswer: 'digas', explanation: 'Use subjunctive after verbs of influence like "insistir en que".' },
  { id: 19, sentence: 'El profesor prohíbe que los estudiantes ___ en clase.', options: ['comen', 'coman'], correctAnswer: 'coman', explanation: 'Use subjunctive after verbs of prohibition.' },
  { id: 20, sentence: 'Llámame antes de que ___ demasiado tarde.', options: ['es', 'sea'], correctAnswer: 'sea', explanation: 'Use subjunctive after the conjunction "antes de que".' },
];

const SubjunctivePractice = () => {
  const [userChoices, setUserChoices] = useState<{ [key: number]: string }>({});

  const handleSelectAnswer = (questionId: number, choice: string) => {
    setUserChoices((prev) => ({ ...prev, [questionId]: choice }));
  };
  
  const resetPractice = () => {
    setUserChoices({});
  }
  
  const correctCount = Object.keys(userChoices).reduce((count, key) => {
    const questionId = Number(key);
    const question = practiceQuestions.find(q => q.id === questionId);
    if(question && userChoices[questionId] === question.correctAnswer) {
        return count + 1;
    }
    return count;
  }, 0);
  
  const answeredCount = Object.keys(userChoices).length;

  return (
    <div className="pt-6 mt-6 border-t border-dashed">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
        <div>
          <h4 className="font-bold text-xl font-headline text-primary">Practice Your Skills</h4>
          <p className="text-muted-foreground text-base">Choose the correct verb for each sentence.</p>
        </div>
        <div className="text-left sm:text-right mt-2 sm:mt-0">
          {answeredCount > 0 && (
             <Button variant="outline" size="sm" onClick={resetPractice}>Reset</Button>
          )}
          <p className="text-base font-medium mt-1">Score: {correctCount} / {answeredCount}</p>
        </div>
      </div>
      <div className="space-y-4">
        {practiceQuestions.map((q) => {
          const choice = userChoices[q.id];
          const hasAnswered = !!choice;

          return (
            <div key={q.id} className="bg-muted/40 p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex-1">
                <p className="text-lg">
                  <span className="font-bold mr-2 text-primary">{q.id}.</span>
                  {q.sentence.replace('___', '______')}
                </p>
                {hasAnswered && (
                   <p className="text-sm text-muted-foreground mt-1 pl-6">{q.explanation}</p>
                )}
              </div>
              <div className="flex items-center gap-2 pl-6 md:pl-0">
                {q.options.map((option) => {
                  const isSelected = choice === option;
                  const isCorrectAnswer = q.correctAnswer === option;
                  return (
                    <Button
                      key={option}
                      disabled={hasAnswered}
                      onClick={() => handleSelectAnswer(q.id, option)}
                      variant="outline"
                      className={cn('transition-all w-24 justify-center', {
                        'bg-primary/20 border-primary text-primary hover:bg-primary/30': hasAnswered && isCorrectAnswer,
                        'bg-destructive/20 border-destructive text-destructive hover:bg-destructive/30': hasAnswered && !isCorrectAnswer && isSelected,
                        'opacity-60 pointer-events-none': hasAnswered && !isSelected,
                      })}
                    >
                      {option}
                      {hasAnswered && isCorrectAnswer && <CheckCircle className="ml-2 h-4 w-4" />}
                      {hasAnswered && !isCorrectAnswer && isSelected && <XCircle className="ml-2 h-4 w-4" />}
                    </Button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubjunctivePractice;
