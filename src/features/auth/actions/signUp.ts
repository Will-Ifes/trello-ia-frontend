'use server';

import { API_URL } from '@/lib/api-config';
import { FormState } from '@/types/formStates';
import { SignupFormData } from '../validation/signUp.schema';

export async function signupAction(_: FormState, data: SignupFormData): Promise<FormState> {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: data.name, email: data.email, password: data.password }),
      signal: AbortSignal.timeout(15000),
    });
    const body = await response.json();
    if (!response.ok)
      return {
        error: Array.isArray(body.message)
          ? body.message.join('. ')
          : body.message || 'Erro ao cadastrar usuário',
      };
    return { success: true };
  } catch {
    return { error: 'Não foi possível conectar ao servidor. Tente novamente.' };
  }
}
