import { FormState } from '@/types/formStates';
import { SignupFormData } from '../validation/signUp.schema';

export const signupAction = async (
  _prevState: FormState, // ← ignora usando _
  formData: SignupFormData,
): Promise<FormState> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const { message } = await response.json();
      return { error: message || 'Erro ao cadastrar usuário' };
    }

    return {
      success: true,
    };
  } catch (err) {
    console.error(err);
    return { error: 'Erro inesperado ao conectar ao servidor' };
  }
};
