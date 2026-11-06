import { cookies } from 'next/headers';
import { API_URL } from '@/lib/api-config';

export async function getCurrentUser(): Promise<{
  id: string;
  name: string;
  email: string;
} | null> {
  const token = (await cookies()).get('auth_token')?.value;
  if (!token) return null;
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
      headers: { Cookie: `auth_token=${token}` },
    });
    return response.ok ? await response.json() : null;
  } catch {
    return null;
  }
}
