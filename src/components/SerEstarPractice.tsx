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
    { id: 1, sentence: 'Yo ___ de México.', options: ['soy', 'estoy'], correctAnswer: 'soy', explanation: 'Use "ser" for origin.' },
    { id: 2, sentence: 'La sopa ___ fría.', options: ['es', 'está'], correctAnswer: 'está', explanation: 'Use "estar" for a temporary condition.' },
    { id: 3, sentence: 'Nosotros ___ doctores.', options: ['somos', 'estamos'], correctAnswer: 'somos', explanation: 'Use "ser" for occupation.' },
    { id: 4, sentence: 'El libro ___ sobre la mesa.', options: ['es', 'está'], correctAnswer: 'está', explanation: 'Use "estar" for location/position.' },
    { id: 5, sentence: 'Tú ___ muy alto.', options: ['eres', 'estás'], correctAnswer: 'eres', explanation: 'Use "ser" for description/characteristic.' },
    { id: 6, sentence: 'Yo ___ cansado hoy.', options: ['soy', 'estoy'], correctAnswer: 'estoy', explanation: 'Use "estar" for emotion/feeling.' },
    { id: 7, sentence: 'La fiesta ___ en mi casa.', options: ['es', 'está'], correctAnswer: 'es', explanation: 'Use "ser" for the location of an event.' },
    { id: 8, sentence: 'Ellos ___ hablando por teléfono.', options: ['son', 'están'], correctAnswer: 'están', explanation: 'Use "estar" for an ongoing action (present progressive).' },
    { id: 9, sentence: '___ las tres de la tarde.', options: ['Son', 'Están'], correctAnswer: 'Son', explanation: 'Use "ser" for telling time.' },
    { id: 10, sentence: 'El café ___ delicioso.', options: ['es', 'está'], correctAnswer: 'está', explanation: 'Use "estar" to describe how something tastes right now.' },
    { id: 11, sentence: 'Ella ___ mi hermana.', options: ['es', 'está'], correctAnswer: 'es', explanation: 'Use "ser" for relationships.' },
    { id: 12, sentence: 'La puerta ___ abierta.', options: ['es', 'está'], correctAnswer: 'está', explanation: 'Use "estar" for a resulting condition.' },
    { id: 13, sentence: 'El coche ___ rojo.', options: ['es', 'está'], correctAnswer: 'es', explanation: 'Use "ser" for a permanent characteristic.' },
    { id: 14, sentence: 'Los gatos ___ debajo de la cama.', options: ['son', 'están'], correctAnswer: 'están', explanation: 'Use "estar" for location.' },
    { id: 15, sentence: 'Hoy ___ martes.', options: ['es', 'está'], correctAnswer: 'es', explanation: 'Use "ser" for dates/days.' },
    { id: 16, sentence: '¿Por qué ___ triste?', options: ['eres', 'estás'], correctAnswer: 'estás', explanation: 'Use "estar" for emotions.' },
    { id: 17, sentence: 'Mis padres ___ de Colombia.', options: ['son', 'están'], correctAnswer: 'son', explanation: 'Use "ser" for origin.' },
    { id: 18, sentence: 'El agua ___ fría.', options: ['es', 'está'], correctAnswer: 'es', explanation: 'Use "ser" for inherent characteristics (water is generally cold).' },
    { id: 19, sentence: 'Nosotros ___ en el cine.', options: ['somos', 'estamos'], correctAnswer: 'estamos', explanation: 'Use "estar" for location.' },
    { id: 20, sentence: 'El hielo ___ frío.', options: ['es', 'está'], correctAnswer: 'es', explanation: 'Use "ser" for inherent characteristics.' },
    { id: 21, sentence: '¿Cómo ___ usted?', options: ['es', 'está'], correctAnswer: 'está', explanation: 'Use "estar" to ask about someone\'s well-being.' },
    { id: 22, sentence: 'Vosotros ___ estudiantes.', options: ['sois', 'estáis'], correctAnswer: 'sois', explanation: 'Use "ser" for occupation.' },
    { id: 23, sentence: 'Madrid ___ en España.', options: ['es', 'está'], correctAnswer: 'está', explanation: 'Use "estar" for the location of cities/places.' },
    { id: 24, sentence: 'La película ___ interesante.', options: ['es', 'está'], correctAnswer: 'es', explanation: 'Use "ser" to describe the characteristic of the movie.' },
    { id: 25, sentence: 'Ellas ___ felices con el regalo.', options: ['son', 'están'], correctAnswer: 'están', explanation: 'Use "estar" for temporary emotions.' },
];

const SerEstarPractice = () => {
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

export default SerEstarPractice;
