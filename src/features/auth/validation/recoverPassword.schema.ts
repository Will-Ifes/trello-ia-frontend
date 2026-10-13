import * as yup from 'yup';

export const recoverPasswordSchema = yup.object({
  email: yup.string().email('Digite um e-mail válido').required('E-mail é obrigatório'),
});

export type RecoverPasswordFormData = yup.InferType<typeof recoverPasswordSchema>;
