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
<<<<<<< HEAD
  title: 'verbaviva.com',
=======
  title: 'verbaviva.com: Spanish Conjugation Assistant',
>>>>>>> a3d923fc7c3523264717d703b31a4783e862400f
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
    'verbaviva.com',
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
<<<<<<< HEAD
  const adClient = "ca-pub-3344588854972492";

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&family=Belleza&display=swap" rel="stylesheet" />
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
=======
  return (
    <html lang="en" className={cn("scroll-smooth", fontBody.variable, fontHeadline.variable)}>
      <head />
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <Script
          id="adsbygoogle-script"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUB_ID}`}
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
>>>>>>> a3d923fc7c3523264717d703b31a4783e862400f
      </body>
    </html>
  );
}
