'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useActionState } from 'react';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { loginAction } from './actions/login';
import { type LoginFormData, loginSchema } from './validation/login.schema';
import type { FormState } from '@/types/formStates';
import { defaultFormState } from '@/constants/formStates';
import { startTransition } from 'react';

export function LoginForm() {
  const [state, formAction, isPending] = useActionState<FormState, LoginFormData>(
    loginAction,
    defaultFormState,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: LoginFormData) => {
    startTransition(() => {
      formAction(data);
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Entrar na sua conta</h1>
        <p className="text-muted-foreground">Digite suas credenciais para acessar o Trello.ia</p>
      </div>

      {state.error && (
        <Alert variant="destructive" className="animate-in fade-in-50">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state.success && (
        <Alert className="bg-green-50 border-green-200 animate-in fade-in-50">
          <AlertDescription className="text-green-800">
            Login realizado com sucesso!
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            {...register('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className="h-11"
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Senha</Label>
            <Link href="/recuperar-senha" className="text-sm text-sky-600 hover:underline">
              Esqueceu a senha?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            {...register('password')}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            className="h-11"
          />
          {errors.password && (
            <p id="password-error" className="text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full h-11" disabled={isPending}>
          {isPending ? 'Entrando...' : 'Entrar'}
          {!isPending && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>

        <div className="text-center text-sm">
          Não tem uma conta?{' '}
          <Link href="/signUp" className="text-sky-600 font-medium hover:underline">
            Cadastre-se
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
