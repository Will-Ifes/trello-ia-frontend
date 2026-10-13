'use client';

import Link from 'next/link';
import { Bell, Menu, Search, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useUser } from '@/hooks/useUser';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SidebarMobile } from './SidebarMobile';
import { useRouter } from 'next/navigation';

interface User {
  name?: string;
}

interface UseUserHook {
  user: User | null;
  isLoading: boolean;
}

export function Header() {
  const { user, isLoading }: UseUserHook = useUser();
  const router = useRouter();

  const initials: string = user?.name
    ? user.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
    : 'T';

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-8">
          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
              <SidebarMobile />
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
              T
            </div>
            <span className="font-semibold text-lg hidden sm:inline-block">Trello.ia</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex relative w-64 lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Search boards, tasks..."
              className="pl-10 h-9 bg-slate-50 border-slate-200 focus:bg-white"
            />
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="sr-only">Notifications</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <p className="text-sm text-center text-slate-500">Nenhuma notificação no momento.</p>
            </PopoverContent>
          </Popover>

          {/* Settings */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => router.push('/settings')}>
                  <Settings className="h-5 w-5 text-slate-600" />
                  <span className="sr-only">Settings</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* User Profile */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => router.push('/profile')}
          >
            <span className="hidden md:inline text-sm font-medium text-slate-700">
              {isLoading ? 'Loading...' : user?.name || 'Guest'}
            </span>
            <Avatar className="h-8 w-8 border border-slate-200">
              <AvatarImage src="/placeholder.svg" alt={user?.name || 'Guest'} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
