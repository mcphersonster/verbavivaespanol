import AdBanner from '@/components/AdBanner';
import FlashcardPractice from '@/components/FlashcardPractice';
import Footer from '@/components/Footer';
import GrammarGuides from '@/components/GrammarGuides';
import Header from '@/components/Header';
import Introduction from '@/components/Introduction';
import TableOfContents from '@/components/TableOfContents';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-8">
          <AdBanner adSlot="3909702645" />
        </div>

        <Introduction />

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 xl:col-span-9 space-y-8">
            <GrammarGuides />
            <AdBanner adSlot="1551132615" />
            <FlashcardPractice />
          </div>
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-8 space-y-8">
              <TableOfContents />
              <AdBanner adSlot="3909702645" />
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
