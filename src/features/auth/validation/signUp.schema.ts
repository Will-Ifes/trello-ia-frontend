import * as yup from 'yup';

export const signupSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Digite um e-mail válido').required('E-mail é obrigatório'),
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
    .required('Confirmação de senha é obrigatória'),
});

export type SignupFormData = yup.InferType<typeof signupSchema>;
