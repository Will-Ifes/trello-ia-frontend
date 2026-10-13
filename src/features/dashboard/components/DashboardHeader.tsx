'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  user: { name: string } | null;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <section className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            {user ? `Welcome back, ${user.name}!` : 'Welcome back!'}
          </h1>
          <p className="text-slate-500 mt-1">You have 0 active boards and 0 pending tasks</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white self-start md:self-auto">
          <Plus className="mr-2 h-4 w-4" />
          Create New Board
        </Button>
      </div>
    </section>
  );
}
