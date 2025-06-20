'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListOrdered } from 'lucide-react';

const TableOfContents = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const navLinks = [
    { href: 'introduction', label: 'Introduction' },
    { href: 'ser-vs-estar', label: 'Ser vs. Estar' },
    { href: 'preterite-vs-imperfect', label: 'Preterite vs. Imperfect' },
    { href: 'subjunctive', label: 'The Subjunctive' },
    { href: 'flashcards', label: 'Flashcard Practice' },
  ];

  return (
    <Card className="transition-shadow hover:shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary flex items-center gap-2">
          <ListOrdered />
          Table of Contents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={`#${link.href}`}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-lg text-foreground/80 hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TableOfContents;
