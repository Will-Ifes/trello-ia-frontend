import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrelloPreview } from './components/TrelloPreview';

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 to-white">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-3xl w-full text-center space-y-12">
          <Hero />
          <TrelloPreview />
        </div>
      </main>

      <Footer />
    </div>
  );
}
