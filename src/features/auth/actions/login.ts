'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { API_URL } from '@/lib/api-config';
import { LoginFormData } from '../validation/login.schema';
import { FormState } from '@/types/formStates';

export async function loginAction(_: FormState, data: LoginFormData): Promise<FormState> {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(15000),
    });
    const body = await response.json();
    if (!response.ok)
      return {
        error: Array.isArray(body.message)
          ? body.message.join('. ')
          : body.message || 'Credenciais inválidas',
      };
    const token = response.headers.get('set-cookie')?.match(/auth_token=([^;]+)/)?.[1];
    if (!token) return { error: 'O servidor não criou uma sessão. Tente novamente.' };
    (await cookies()).set('auth_token', token, {
      path: '/',
      httpOnly: true,
      secure:
        process.env.COOKIE_SECURE === undefined
          ? process.env.NODE_ENV === 'production'
          : process.env.COOKIE_SECURE === 'true',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
    });
  } catch {
    return { error: 'Não foi possível conectar ao servidor. Tente novamente.' };
  }
  redirect('/dashboard');
}
