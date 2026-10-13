'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LoginFormData } from '../validation/login.schema';
import { FormState } from '@/types/formStates';

export const loginAction = async (_: FormState, data: LoginFormData) => {
  const response = await fetch(`${process.env.API_INTERNAL_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  const res = await response.json();

  if (!response.ok) {
    return { error: res.message || 'Credenciais inválidas' };
  }

  const rawCookie = response.headers.get('set-cookie');
  const tokenMatch = rawCookie?.match(/auth_token=([^;]+)/);

  if (tokenMatch) {
    (await cookies()).set('auth_token', tokenMatch[1], {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
    });
  }

  redirect('/dashboard');
};
