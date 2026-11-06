import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Trello.ia — Organize suas ideias',
  description:
    'Quadros, listas e tarefas com inteligência artificial para tirar seus projetos do papel.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
