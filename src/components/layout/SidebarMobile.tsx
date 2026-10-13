'use client';

import Link from 'next/link';
import { LayoutDashboard, Grid, Sparkles, User, Settings, LogOut } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { logoutAction } from '@/features/auth/actions/logout';

export function SidebarMobile() {
  return (
    <div className="flex flex-col h-full">
      {/* Logo no topo */}
      <div className="py-4 border-b">
        <Link href="/dashboard" className="flex items-center gap-2 px-2">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
            T
          </div>
          <span className="font-semibold text-lg">Trello.ia</span>
        </Link>
      </div>

      {/* Navegação */}
      <nav className="flex-1 py-4">
        {/* Main */}
        <div className="px-3 mb-2 text-xs font-medium text-slate-500 uppercase">Main</div>
        <div className="space-y-1">
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
          </Link>
        </div>

        {/* Settings */}
        <div className="px-3 mt-6 mb-2 text-xs font-medium text-slate-500 uppercase">Settings</div>
        <div className="space-y-1">
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
        </div>
      </nav>

      {/* Logout no rodapé */}
      <div className="py-4 border-t">
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
    </div>
  );
}
