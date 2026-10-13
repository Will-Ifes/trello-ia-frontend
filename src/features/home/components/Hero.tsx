// Caminho: src/features/home/components/Hero.tsx

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <div className="space-y-6">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
        Organize suas tarefas com inteligência
      </h2>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto">
        Simplifique seu fluxo de trabalho, aumente sua produtividade e gerencie projetos com
        facilidade usando nossa plataforma intuitiva.
      </p>
      <div className="pt-4">
        <Link href="/login">
          <Button size="lg" className="px-8 py-6 text-base rounded-lg bg-sky-600 hover:bg-sky-700">
            Começar agora
          </Button>
        </Link>
      </div>
    </div>
  );
}
