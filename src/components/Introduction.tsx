import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

const Introduction = () => {
  return (
    <section id="introduction" className="mb-8">
      <Card className="overflow-hidden transition-shadow hover:shadow-xl">
        <CardHeader className="bg-secondary/50">
          <CardTitle className="font-headline text-3xl text-primary flex items-center gap-3">
            <Sparkles className="h-7 w-7" />
            Why Mastering Conjugation Changes Everything
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 md:p-8 text-lg leading-relaxed">
          <p>
            Have you ever found yourself in a Spanish conversation, trying to express something crucial, only to feel stuck? You know the words, but they just won't flow correctly? Maybe you want to share a past adventure, talk about what you would do, or express a wish, but your sentences feel clunky, or worse, are misunderstood. This isn't just a beginner's hurdle; it's the exact moment you realize: Spanish verb conjugation is your superpower.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default Introduction;
