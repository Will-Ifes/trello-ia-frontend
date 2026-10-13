'use server';

import { cookies } from 'next/headers';

export async function getCurrentUser() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('auth_token')?.value;

  if (!token) return null;

  try {
    const res = await fetch(`${process.env.API_INTERNAL_URL}/auth/me`, {
      cache: 'no-store',
      credentials: 'include',
      headers: {
        Cookie: `auth_token=${token}`,
      },
    });

    if (!res.ok) {
      (await cookieStore).delete('auth_token'); // Apaga o token inválido
      return null;
    }

    const user = await res.json();
    return user;
  } catch (error) {
    console.error('[getCurrentUser] Erro ao buscar dados do usuário:', error);
    (await cookieStore).delete('auth_token'); // Também limpa se falhou a requisição
    return null;
  }
}
