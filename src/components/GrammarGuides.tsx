import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AdBanner from './AdBanner';

const GrammarGuides = () => {
  return (
    <div className="space-y-8">
      <section id="ser-vs-estar">
        <Card className="transition-shadow hover:shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline text-3xl text-primary">
              Ser vs. Estar, Unraveled
            </CardTitle>
            <CardDescription className="text-base">
              The two forms of "to be", demystified.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-lg space-y-4 leading-relaxed">
            <p>
              While both `ser` and `estar` mean "to be," they are not
              interchangeable. Use `ser` for permanent qualities and `estar` for
              temporary states. To remember, use these acronyms:
            </p>
            <div className="grid md:grid-cols-2 gap-6 my-4">
              <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
                <h3 className="font-bold text-primary">Use `ser` for DOCTOR:</h3>
                <ul className="list-disc pl-5 mt-2 text-base">
                  <li><strong>D</strong>escription</li>
                  <li><strong>O</strong>ccupation</li>
                  <li><strong>C</strong>haracteristic</li>
                  <li><strong>T</strong>ime</li>
                  <li><strong>O</strong>rigin</li>
                  <li><strong>R</strong>elation</li>
                </ul>
              </div>
              <div className="bg-green-500/5 p-4 rounded-lg border-l-4 border-green-600">
                <h3 className="font-bold text-green-800">Use `estar` for PLACE:</h3>
                <ul className="list-disc pl-5 mt-2 text-base">
                  <li><strong>P</strong>osition</li>
                  <li><strong>L</strong>ocation</li>
                  <li><strong>A</strong>ction (-ing)</li>
                  <li><strong>C</strong>ondition</li>
                  <li><strong>E</strong>motion</li>
                </ul>
              </div>
            </div>
            <p>
              <strong>Key Exception:</strong> The location of an{' '}
              <span className="italic">event</span> uses `ser` (e.g., La fiesta{' '}
              <span className="italic">es</span> en mi casa), while the location
              of a person or object uses `estar` (e.g., Yo{' '}
              <span className="italic">estoy</span> en mi casa).
            </p>
          </CardContent>
        </Card>
      </section>

      <AdBanner adSlot="1551132615" />

      <section id="preterite-vs-imperfect">
        <Card className="transition-shadow hover:shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline text-3xl text-primary">
              Preterite vs. Imperfect, Mastered
            </CardTitle>
             <CardDescription className="text-base">
              Telling stories in the past tense.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-lg space-y-4 leading-relaxed">
            <p>
              Think of telling a story. The{' '}
              <strong className="text-accent">imperfect</strong> sets the
              scene (background details, ongoing actions), while the{' '}
              <strong className="text-primary">preterite</strong> describes the main, completed actions that move the story forward.
            </p>
            <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
              <p>
                <strong className="font-bold">Imperfect:</strong> "Era una noche oscura..." (It was a dark night...)
              </p>
              <p>
                <strong className="font-bold">Preterite:</strong> "...y de repente, un gato saltó." (...and suddenly, a cat jumped.)
              </p>
            </div>
            <h4 className="font-bold pt-4 text-xl font-headline">Examples:</h4>
            <ol className="list-decimal pl-5 space-y-2 text-base">
              <li>
                <span className="font-mono bg-muted px-2 py-1 rounded">
                  Yo caminaba por el parque cuando vi a un amigo.
                </span>{' '}
                (I was walking through the park when I saw a friend.) - Interrupted action.
              </li>
              <li>
                <span className="font-mono bg-muted px-2 py-1 rounded">
                  Cuando era niño, jugaba mucho al fútbol.
                </span>{' '}
                (When I was a child, I used to play a lot of soccer.) - Habitual past action.
              </li>
              <li>
                <span className="font-mono bg-muted px-2 py-1 rounded">
                  Ayer, comí paella por primera vez.
                </span>{' '}
                (Yesterday, I ate paella for the first time.) - Specific, completed action.
              </li>
            </ol>
          </CardContent>
        </Card>
      </section>
      
       <AdBanner adSlot="3909702645" />

      <section id="subjunctive">
        <Card className="transition-shadow hover:shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline text-3xl text-primary">
              The Subjunctive, Unlocked
            </CardTitle>
             <CardDescription className="text-base">
              Expressing wishes, emotions, and doubts.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-lg space-y-4 leading-relaxed">
            <p>
              The subjunctive is a "mood" used to express subjectivity (wishes, emotions, doubts). Use the acronym{' '}
              <strong className="text-primary">WEIRDO</strong> to remember its triggers.
            </p>
            <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
              <h3 className="font-bold text-primary">Use the Subjunctive for WEIRDO:</h3>
              <ul className="list-disc pl-5 mt-2 text-base">
                  <li><strong>W</strong>ishes</li>
                  <li><strong>E</strong>motions</li>
                  <li><strong>I</strong>mpersonal Expressions</li>
                  <li><strong>R</strong>ecommendations</li>
                  <li><strong>D</strong>oubt/Denial</li>
                  <li><strong>O</strong>jalá</li>
              </ul>
            </div>
            <h4 className="font-bold pt-4 text-xl font-headline">Examples:</h4>
            <ol className="list-decimal pl-5 space-y-2 text-base">
              <li>
                <span className="font-mono bg-muted px-2 py-1 rounded">
                  Espero que tengas un buen día.
                </span>{' '}
                (I hope you have a good day.) - Wish
              </li>
              <li>
                <span className="font-mono bg-muted px-2 py-1 rounded">
                  No creo que sea verdad.
                </span>{' '}
                (I don't believe it's true.) - Doubt/Denial
              </li>
            </ol>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default GrammarGuides;
