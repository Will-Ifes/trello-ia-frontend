// src/components/layout/Sidebar.tsx

'use client';

import Link from 'next/link';
import { LayoutDashboard, Grid, Sparkles, User, Settings, LogOut } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { logoutAction } from '@/features/auth/actions/logout';

interface SidebarProps {
  mobile?: boolean;
}

export function Sidebar({ mobile = false }: SidebarProps) {
  return (
    <div
      className={`flex flex-col ${mobile ? 'h-full p-4' : 'w-64 bg-white border-r border-slate-200 p-4 sticky top-16 h-[calc(100vh-4rem)]'}`}
    >
      <nav className="flex flex-col flex-1">
        <div className="space-y-1 mb-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-slate-100 text-slate-900"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/boards"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-slate-700 hover:bg-slate-100"
          >
            <Grid className="h-4 w-4" />
            All Boards
          </Link>
          <Link
            href="/tasks"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-slate-700 hover:bg-slate-100"
          >
            <Badge className="h-4 w-4 bg-blue-500" variant="default" />
            My Tasks
          </Link>
          <Link
            href="/ai-features"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-slate-700 hover:bg-slate-100"
          >
            <Sparkles className="h-4 w-4" />
            AI Features
            <Badge
              className="ml-auto bg-indigo-100 text-indigo-800 hover:bg-indigo-100"
              variant="outline"
            >
              New
            </Badge>
          </Link>
        </div>

        <div className="mt-auto space-y-1">
          <Link
            href="/profile"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-slate-700 hover:bg-slate-100"
          >
            <User className="h-4 w-4" />
            Profile
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-slate-700 hover:bg-slate-100"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium rounded-md text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}
