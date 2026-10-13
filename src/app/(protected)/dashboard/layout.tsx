import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  if (!user) {
    return redirect('/login');
  }

  return <main>{children}</main>;
}
