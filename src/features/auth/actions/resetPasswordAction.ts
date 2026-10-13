'use server';

import { ExtendedResetPasswordFormData } from '../validation/resetPasswordForm.schema';
import { FormState } from '@/types/formStates';

export async function resetPasswordAction(
  _prevState: FormState,
  formData: ExtendedResetPasswordFormData,
): Promise<FormState> {
  try {
    const res = await fetch(`${process.env.API_INTERNAL_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        token: formData.token,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      return { error: body.message || 'Erro ao redefinir a senha.' };
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: 'Erro ao conectar com o servidor. Tente novamente.' };
  }
}
