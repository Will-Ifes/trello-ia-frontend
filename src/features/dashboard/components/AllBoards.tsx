'use client';

import { BoardCard } from './BoardCard';

interface Board {
  id: string;
  title: string;
  description?: string;
  status?: 'Active' | 'In Progress' | 'Planning';
  tasksCount?: number;
  completedTasks?: number;
}

interface AllBoardsProps {
  boards: Board[];
}

export function AllBoards({ boards }: AllBoardsProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-800">All Boards</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {boards.map((board) => (
          <BoardCard
            key={board.id}
            title={board.title}
            description={board.description}
            status={board.status}
            tasksCount={board.tasksCount}
            completedTasks={board.completedTasks}
          />
        ))}
      </div>
    </section>
  );
}
