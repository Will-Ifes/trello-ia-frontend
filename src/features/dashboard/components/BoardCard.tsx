'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface BoardCardProps {
  title: string;
  description?: string;
  status?: 'Active' | 'In Progress' | 'Planning'; // podemos expandir depois
  tasksCount?: number;
  completedTasks?: number;
}

export function BoardCard({
  title,
  description,
  status = 'Active',
  tasksCount = 0,
  completedTasks = 0,
}: BoardCardProps) {
  return (
    <Card className="bg-white hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-slate-800">{title}</h3>
            {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
          </div>
          {status && (
            <Badge
              variant="secondary"
              className={
                status === 'Active'
                  ? 'bg-green-100 text-green-800'
                  : status === 'In Progress'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-amber-100 text-amber-800'
              }
            >
              {status}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center text-sm text-slate-600">
          <span className="font-medium">{tasksCount}</span>
          <span className="mx-1">tasks</span>
          <span className="text-slate-400">•</span>
          <span className="mx-1 text-green-600 font-medium">{completedTasks}</span>
          <span className="text-green-600">completed</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-2">
        <div className="flex -space-x-2">
          {/* Placeholder para membros (depois puxamos real) */}
          <Avatar className="h-7 w-7 border-2 border-white">
            <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">SJ</AvatarFallback>
          </Avatar>
          <Avatar className="h-7 w-7 border-2 border-white">
            <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs">TK</AvatarFallback>
          </Avatar>
        </div>
        <Button size="sm" className="text-indigo-600 bg-indigo-50 hover:bg-indigo-100">
          Open Board
        </Button>
      </CardFooter>
    </Card>
  );
}
