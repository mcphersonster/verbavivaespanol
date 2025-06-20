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
  { id: 1, sentence: 'Yo ___ por el parque cuando vi a un amigo.', options: ['caminaba', 'caminé'], correctAnswer: 'caminaba', explanation: 'Use imperfect for an ongoing action in the past that was interrupted.' },
  { id: 2, sentence: 'Ayer, nosotros ___ al cine.', options: ['íbamos', 'fuimos'], correctAnswer: 'fuimos', explanation: 'Use preterite for a specific, completed action in the past.' },
  { id: 3, sentence: 'Cuando era niño, siempre ___ con mis amigos.', options: ['jugaba', 'jugué'], correctAnswer: 'jugaba', explanation: 'Use imperfect for habitual or repeated actions in the past.' },
  { id: 4, sentence: 'La película ___ a las diez de la noche.', options: ['empezaba', 'empezó'], correctAnswer: 'empezó', explanation: 'Use preterite to mark the beginning of an event.' },
  { id: 5, sentence: 'Mientras yo ___, mi hermano escuchaba música.', options: ['leía', 'leí'], correctAnswer: 'leía', explanation: 'Use imperfect for simultaneous, ongoing actions in the past.' },
  { id: 6, sentence: 'De repente, el perro ___.', options: ['ladraba', 'ladró'], correctAnswer: 'ladró', explanation: 'Use preterite for a sudden action that interrupts another.' },
  { id: 7, sentence: 'El cielo ___ gris y hacía frío.', options: ['era', 'fue'], correctAnswer: 'era', explanation: 'Use imperfect for descriptions of scenes, weather, and people in the past.' },
  { id: 8, sentence: 'Anoche, yo ___ la tarea muy rápido.', options: ['terminaba', 'terminé'], correctAnswer: 'terminé', explanation: 'Use preterite for a single, completed action with a clear end.' },
  { id: 9, sentence: 'Mi abuela nos ___ galletas cada domingo.', options: ['cocinaba', 'cocinó'], correctAnswer: 'cocinaba', explanation: 'Use imperfect for repeated, habitual actions in the past ("used to cook").' },
  { id: 10, sentence: 'El año pasado, ___ a España de vacaciones.', options: ['viajábamos', 'viajamos'], correctAnswer: 'viajamos', explanation: 'Use preterite for a completed event within a specific time frame.' },
  { id: 11, sentence: 'Yo ___ muy cansado, por eso me acosté.', options: ['estaba', 'estuve'], correctAnswer: 'estaba', explanation: 'Use imperfect to describe a state or condition in the past (how I was feeling).' },
  { id: 12, sentence: 'Ellos ___ en la fiesta por tres horas.', options: ['estaban', 'estuvieron'], correctAnswer: 'estuvieron', explanation: 'Use preterite to indicate the duration of a completed event.' },
  { id: 13, sentence: 'No ___ la verdad en ese momento.', options: ['sabía', 'supe'], correctAnswer: 'sabía', explanation: 'Imperfect "sabía" means "I knew". Preterite "supe" means "I found out".' },
  { id: 14, sentence: 'Ella ___ 20 años cuando se mudó a Madrid.', options: ['tenía', 'tuvo'], correctAnswer: 'tenía', explanation: 'Use imperfect to state someone\'s age in the past.' },
  { id: 15, sentence: 'Yo no ___ ir a la playa porque llovía.', options: ['quería', 'quise'], correctAnswer: 'quería', explanation: 'Imperfect "quería" means "I wanted". Preterite "quise" means "I tried".' },
  { id: 16, sentence: 'Nosotros ___ a nuestros primos el fin de semana pasado.', options: ['visitábamos', 'visitamos'], correctAnswer: 'visitamos', explanation: 'Use preterite for a specific, one-time action in the past.' },
  { id: 17, sentence: 'La casa ___ blanca y tenía un jardín grande.', options: ['era', 'fue'], correctAnswer: 'era', explanation: 'Use imperfect for descriptions in the past.' },
  { id: 18, sentence: 'El profesor ___ la lección cuando sonó la campana.', options: ['explicaba', 'explicó'], correctAnswer: 'explicaba', explanation: 'Use imperfect for an action in progress that was interrupted.' },
  { id: 19, sentence: 'Ella ___ la ventana y salió.', options: ['abría', 'abrió'], correctAnswer: 'abrió', explanation: 'Use preterite for a sequence of completed actions.' },
  { id: 20, sentence: 'Antes, la gente ___ más cartas.', options: ['escribía', 'escribió'], correctAnswer: 'escribía', explanation: 'Use imperfect for actions that used to happen regularly in the past.' },
];


const PreteriteImperfectPractice = () => {
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
                      className={cn('transition-all w-28 justify-center', {
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

export default PreteriteImperfectPractice;
