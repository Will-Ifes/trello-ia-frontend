'use server';

import { RecoverPasswordFormData } from '../validation/recoverPassword.schema';
import { FormState } from '@/types/formStates';

export async function recoverPasswordAction(
  _prevState: FormState,
  formData: RecoverPasswordFormData,
): Promise<FormState> {
  try {
    const res = await fetch(`${process.env.API_INTERNAL_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: formData.email }),
    });

    if (!res.ok) {
      const data = await res.json();
      return { error: data.message ?? 'Erro ao enviar e-mail.' };
    }

    return { success: true };
  } catch (error) {
    console.error('[RecoverPasswordAction Error]', error);
    return { error: 'Não foi possível enviar o e-mail de recuperação. Tente novamente.' };
  }
}
