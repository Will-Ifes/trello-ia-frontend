import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { redirect } from 'next/navigation';
import { SessionCache } from '@/features/auth/SessionCache';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  if (!(await getCurrentUser())) redirect('/login');
  return <SessionCache>{children}</SessionCache>;
}
