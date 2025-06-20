import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'VerbaVivaEspañol: Spanish Conjugation Assistant',
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
    'VerbaVivaEspañol',
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
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&family=Belleza&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3344588854972492"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
