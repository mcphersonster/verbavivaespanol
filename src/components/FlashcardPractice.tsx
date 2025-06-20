'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generatePersonalizedFeedback } from '@/ai/flows/generate-feedback';
import { ArrowRight, CheckCircle, Flame, Loader2, Target, XCircle } from 'lucide-react';

type PracticeQuestion = {
  prompt: string;
  verb: string;
  pronoun: string;
  tense: string;
  correctAnswer: string;
};

const practiceQuestions: PracticeQuestion[] = [
  // Ser vs. Estar
  { prompt: 'Yo ___ de México. (ser)', verb: 'ser', pronoun: 'yo', tense: 'present', correctAnswer: 'soy' },
  { prompt: 'La sopa ___ fría. (estar)', verb: 'estar', pronoun: 'la sopa', tense: 'present', correctAnswer: 'está' },
  { prompt: 'Nosotros ___ doctores. (ser)', verb: 'ser', pronoun: 'nosotros', tense: 'present', correctAnswer: 'somos' },
  { prompt: 'El libro ___ sobre la mesa. (estar)', verb: 'estar', pronoun: 'el libro', tense: 'present', correctAnswer: 'está' },
  { prompt: 'La fiesta ___ en mi casa. (ser)', verb: 'ser', pronoun: 'la fiesta', tense: 'present', correctAnswer: 'es' },
  
  // Preterite vs. Imperfect
  { prompt: 'Yo ___ por el parque cuando vi a un amigo. (caminar)', verb: 'caminar', pronoun: 'yo', tense: 'imperfect', correctAnswer: 'caminaba' },
  { prompt: 'Ayer, nosotros ___ al cine. (ir)', verb: 'ir', pronoun: 'nosotros', tense: 'preterite', correctAnswer: 'fuimos' },
  { prompt: 'Cuando era niño, siempre ___ con mis amigos. (jugar)', verb: 'jugar', pronoun: 'yo', tense: 'imperfect', correctAnswer: 'jugaba' },
  { prompt: 'De repente, el perro ___. (ladrar)', verb: 'ladrar', pronoun: 'el perro', tense: 'preterite', correctAnswer: 'ladró' },
  { prompt: 'Anoche, yo ___ la tarea muy rápido. (terminar)', verb: 'terminar', pronoun: 'yo', tense: 'preterite', correctAnswer: 'terminé' },

  // Subjunctive
  { prompt: 'Espero que (tú) ___ un buen viaje. (tener)', verb: 'tener', pronoun: 'tú', tense: 'subjunctive', correctAnswer: 'tengas' },
  { prompt: 'No creo que ___ a llover hoy. (ir)', verb: 'ir', pronoun: 'ello', tense: 'subjunctive', correctAnswer: 'vaya' },
  { prompt: 'Te recomiendo que (tú) ___ ese libro. (leer)', verb: 'leer', pronoun: 'tú', tense: 'subjunctive', correctAnswer: 'leas' },
  { prompt: 'Ojalá ___ buen tiempo mañana. (hacer)', verb: 'hacer', pronoun: 'ello', tense: 'subjunctive', correctAnswer: 'haga' },
  { prompt: 'Mi madre quiere que yo ___ mi cuarto. (limpiar)', verb: 'limpiar', pronoun: 'yo', tense: 'subjunctive', correctAnswer: 'limpie' },
  
  // General Conjugation
  { prompt: 'yo → hablar (present)', verb: 'hablar', pronoun: 'yo', tense: 'present', correctAnswer: 'hablo' },
  { prompt: 'tú → ser (present)', verb: 'ser', pronoun: 'tú', tense: 'present', correctAnswer: 'eres' },
  { prompt: 'nosotros → vivir (present)', verb: 'vivir', pronoun: 'nosotros', tense: 'present', correctAnswer: 'vivimos' },
  { prompt: 'tú → hacer (preterite)', verb: 'hacer', pronoun: 'tú', tense: 'preterite', correctAnswer: 'hiciste' },
  { prompt: 'ellos → ir (present)', verb: 'ir', pronoun: 'ellos/ellas/uds.', tense: 'present', correctAnswer: 'van' },
];

const FlashcardPractice = () => {
  const [currentQuestion, setCurrentQuestion] = useState<PracticeQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  
  const shuffledQuestions = useMemo(() => [...practiceQuestions].sort(() => Math.random() - 0.5), []);
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    const storedHighScore = localStorage.getItem('verbaVivaEspanolHighScore');
    if (storedHighScore) {
      setHighScore(Number(storedHighScore));
    }
    loadNewQuestion();
  }, []);

  const loadNewQuestion = () => {
    setIsAnswered(false);
    setIsCorrect(null);
    setFeedback('');
    setUserAnswer('');
    const newIndex = (questionIndex + 1) % shuffledQuestions.length;
    setQuestionIndex(newIndex);
    setCurrentQuestion(shuffledQuestions[newIndex]);
  };

  const handleCheckAnswer = async () => {
    if (!currentQuestion || !userAnswer.trim()) return;

    setIsAnswered(true);
    const answerIsCorrect = userAnswer.trim().toLowerCase() === currentQuestion.correctAnswer;
    setIsCorrect(answerIsCorrect);

    if (answerIsCorrect) {
      setFeedback('¡Correcto!');
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('verbaVivaEspanolHighScore', String(newScore));
      }
    } else {
      setIsLoading(true);
      setFeedback('');
      try {
        const aiFeedback = await generatePersonalizedFeedback({
          ...currentQuestion,
          userAnswer: userAnswer.trim(),
        });
        setFeedback(aiFeedback.feedback);
      } catch (error) {
        console.error('Error fetching AI feedback:', error);
        setFeedback(`The correct answer is: ${currentQuestion.correctAnswer}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isAnswered) {
      handleCheckAnswer();
    }
  };
  
  if (!currentQuestion) {
    return (
      <Card id="comprehensive-challenge" className="text-center p-8">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        <p className="mt-4">Loading challenge...</p>
      </Card>
    )
  }

  return (
    <section id="comprehensive-challenge">
      <Card className="transition-shadow hover:shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary flex items-center gap-3">
            <Flame className="h-7 w-7" />
            Comprehensive Challenge
          </CardTitle>
          <CardDescription className="text-base">
            A mix of questions covering all topics to test your mastery.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center bg-secondary p-3 rounded-lg mb-6 text-foreground">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <span className="text-lg">Your Score: <span className="font-bold text-primary">{score}</span></span>
            </div>
            <div className="flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M12 11V4a2 2 0 0 1 4 0v1a2 2 0 0 0 4 0V4a2 2 0 0 0-4-4h-4a2 2 0 0 0-4 4v1a2 2 0 0 1 4 0Z"/><path d="m14 14-2 2-2-2"/><path d="m14 18-2 2-2-2"/><path d="M12 21a2 2 0 0 0 2-2v-2a2 2 0 1 0-4 0v2a2 2 0 0 0 2 2Z"/></svg>
              <span className="text-lg">High Score: <span className="font-bold text-accent">{highScore}</span></span>
            </div>
          </div>
          
          <div className="bg-background/50 p-6 rounded-lg text-center border-2 border-dashed">
            <p className="text-xl mb-2">Complete the sentence or conjugate:</p>
            <h3 className="text-3xl font-bold text-primary font-headline mb-4">
              {currentQuestion.prompt.replace('___', '______')}
            </h3>
            
            <div className="max-w-xs mx-auto">
              <Input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Your answer..."
                className="text-center text-xl p-4 h-14"
                disabled={isAnswered}
                aria-label="Flashcard answer input"
              />
            </div>

            <div className="mt-4 space-x-4">
              {!isAnswered ? (
                 <Button onClick={handleCheckAnswer} size="lg" disabled={!userAnswer.trim()}>Check Answer</Button>
              ) : (
                <Button onClick={loadNewQuestion} size="lg" variant="secondary">Next Question <ArrowRight className="ml-2 h-5 w-5"/></Button>
              )}
            </div>

            {isAnswered && (
              <div className="mt-6 text-lg p-4 rounded-md min-h-[80px] flex items-center justify-center"
                style={{
                  backgroundColor: isCorrect ? 'hsla(140, 70%, 95%, 1)' : 'hsla(0, 70%, 95%, 1)',
                  borderColor: isCorrect ? 'hsla(140, 50%, 60%, 1)' : 'hsla(0, 50%, 60%, 1)',
                  borderWidth: 1,
                }}
              >
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                ) : (
                  <div className="flex items-start gap-3">
                    {isCorrect ? <CheckCircle className="h-6 w-6 text-green-600 mt-1 shrink-0" /> : <XCircle className="h-6 w-6 text-red-600 mt-1 shrink-0" />}
                    <p className="text-left">{feedback}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default FlashcardPractice;
