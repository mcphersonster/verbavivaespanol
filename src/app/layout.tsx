import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Script from 'next/script';
import { Alegreya, Belleza } from 'next/font/google';
import { cn } from '@/lib/utils';

const fontBody = Alegreya({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const fontHeadline = Belleza({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'SimplyPracticeSpanish.com: Spanish Conjugation Assistant',
  description: 'Master Spanish verb conjugation with interactive flashcards, AI-powered feedback, and clear grammar guides on Ser vs. Estar, Preterite vs. Imperfect, and the Subjunctive.',
  keywords: [
    'Spanish conjugation',
    'learn Spanish',
    'Spanish verbs',
    'conjugation practice',
    'ser vs estar',
    'preterite vs imperfect',
    'Spanish subjunctive',
    'Spanish grammar',
    'language learning',
    'AI tutor',
    'SimplyPracticeSpanish.com',
  ],
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🇪🇸</text></svg>',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adClient = "ca-pub-3344588854972492";

  return (
    <html lang="en" className={cn("scroll-smooth", fontBody.variable, fontHeadline.variable)}>
      <head>
        {adClient && (
          <Script
            id="adsense-script"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
