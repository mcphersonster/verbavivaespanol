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

type Flashcard = {
  verb: string;
  pronoun: string;
  tense: string;
  correctAnswer: string;
};

const flashcardVerbs: Flashcard[] = [
  { verb: 'hablar', pronoun: 'yo', tense: 'present', correctAnswer: 'hablo' },
  { verb: 'comer', pronoun: 'él/ella/ud.', tense: 'present', correctAnswer: 'come' },
  { verb: 'vivir', pronoun: 'nosotros', tense: 'present', correctAnswer: 'vivimos' },
  { verb: 'ser', pronoun: 'tú', tense: 'present', correctAnswer: 'eres' },
  { verb: 'estar', pronoun: 'yo', tense: 'present', correctAnswer: 'estoy' },
  { verb: 'tener', pronoun: 'yo', tense: 'present', correctAnswer: 'tengo' },
  { verb: 'ir', pronoun: 'ellos/ellas/uds.', tense: 'present', correctAnswer: 'van' },
  { verb: 'hacer', pronoun: 'tú', tense: 'preterite', correctAnswer: 'hiciste' },
  { verb: 'decir', pronoun: 'yo', tense: 'imperfect', correctAnswer: 'decía' },
  { verb: 'querer', pronoun: 'nosotros', tense: 'subjunctive', correctAnswer: 'queramos'},
];

const FlashcardPractice = () => {
  const [currentCard, setCurrentCard] = useState<Flashcard | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  
  // Memoize a shuffled list of verbs to avoid repeating the same card immediately
  const shuffledVerbs = useMemo(() => [...flashcardVerbs].sort(() => Math.random() - 0.5), []);
  const [cardIndex, setCardIndex] = useState(0);

  useEffect(() => {
    const storedHighScore = localStorage.getItem('verbaVivaHighScore');
    if (storedHighScore) {
      setHighScore(Number(storedHighScore));
    }
    loadNewCard();
  }, []);

  const loadNewCard = () => {
    setIsAnswered(false);
    setIsCorrect(null);
    setFeedback('');
    setUserAnswer('');
    const newIndex = (cardIndex + 1) % shuffledVerbs.length;
    setCardIndex(newIndex);
    setCurrentCard(shuffledVerbs[newIndex]);
  };

  const handleCheckAnswer = async () => {
    if (!currentCard || !userAnswer.trim()) return;

    setIsAnswered(true);
    const answerIsCorrect = userAnswer.trim().toLowerCase() === currentCard.correctAnswer;
    setIsCorrect(answerIsCorrect);

    if (answerIsCorrect) {
      setFeedback('¡Correcto!');
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('verbaVivaHighScore', String(newScore));
      }
    } else {
      setIsLoading(true);
      setFeedback('');
      try {
        const aiFeedback = await generatePersonalizedFeedback({
          ...currentCard,
          userAnswer: userAnswer.trim(),
        });
        setFeedback(aiFeedback.feedback);
      } catch (error) {
        console.error('Error fetching AI feedback:', error);
        setFeedback(`The correct answer is: ${currentCard.correctAnswer}`);
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
  
  if (!currentCard) {
    return (
      <Card id="flashcards" className="text-center p-8">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        <p className="mt-4">Loading flashcards...</p>
      </Card>
    )
  }

  return (
    <section id="flashcards">
      <Card className="transition-shadow hover:shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary flex items-center gap-3">
            <Flame className="h-7 w-7" />
            Flashcard Practice
          </CardTitle>
          <CardDescription className="text-base">
            Test your knowledge and get instant AI-powered feedback.
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
            <p className="text-xl mb-2">Conjugate the verb:</p>
            <h3 className="text-3xl font-bold text-primary font-headline mb-4">
              {currentCard.pronoun} &rarr; {currentCard.verb} <span className="text-foreground/70 text-2xl">({currentCard.tense})</span>
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
                <Button onClick={loadNewCard} size="lg" variant="secondary">Next Verb <ArrowRight className="ml-2 h-5 w-5"/></Button>
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
