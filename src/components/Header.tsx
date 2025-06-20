import React from 'react';
import { BookOpenText } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center gap-4">
          <BookOpenText className="h-10 w-10" />
          <div>
            <h1 className="text-4xl md:text-5xl font-headline">VerbaVivaEspañol</h1>
            <p className="mt-1 text-lg opacity-90">Your Ultimate Spanish Conjugation Guide</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
