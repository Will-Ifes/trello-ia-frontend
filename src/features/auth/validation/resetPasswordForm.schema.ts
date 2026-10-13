import * as yup from 'yup';

export const resetPasswordFormSchema = yup.object().shape({
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .matches(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .matches(/[0-9]/, 'A senha deve conter pelo menos um número')
    .matches(/[@$!%*?&#]/, 'A senha deve conter ao menos um caractere especial'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas devem coincidir')
    .required('Confirme a senha'),
});

export type ResetPasswordFormData = yup.InferType<typeof resetPasswordFormSchema>;
export type ExtendedResetPasswordFormData = ResetPasswordFormData & { token: string };
