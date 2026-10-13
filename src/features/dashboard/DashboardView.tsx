import { DashboardHeader } from './components/DashboardHeader';
import { RecentBoards } from './components/RecentBoards';
import { AllBoards } from './components/AllBoards';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';

export async function DashboardView() {
  const user = await getCurrentUser();
  const exampleBoards = [
    {
      id: '1',
      title: 'Marketing Campaign',
      description: 'Q3 Product Launch',
      status: 'Active' as const,
      tasksCount: 12,
      completedTasks: 4,
    },
    {
      id: '2',
      title: 'Website Redesign',
      description: 'Frontend Development',
      status: 'In Progress' as const,
      tasksCount: 18,
      completedTasks: 7,
    },
    {
      id: '3',
      title: 'Mobile App Development',
      description: 'Version 2.0 Release',
      status: 'Planning' as const,
      tasksCount: 24,
      completedTasks: 3,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <div className="flex flex-1">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <DashboardHeader user={user} />
          <RecentBoards boards={exampleBoards} />
          <AllBoards boards={exampleBoards} />
        </main>
      </div>
    </div>
  );
}
