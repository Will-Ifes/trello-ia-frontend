// Caminho: src/features/home/components/Header.tsx

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="w-full py-4 px-6 border-b border-slate-100 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-sky-600">Trello.ia</h1>
        </div>
        <nav>
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
