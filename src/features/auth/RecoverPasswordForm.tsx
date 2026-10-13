'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { startTransition, useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';

import { defaultFormState } from '@/constants/formStates';
import type { FormState } from '@/types/formStates';
import { recoverPasswordAction } from './actions/recoverPassword';
import {
  type RecoverPasswordFormData,
  recoverPasswordSchema,
} from './validation/recoverPassword.schema';

export function RecoverPasswordForm() {
  const [state, recoverAction, isPending] = useActionState<FormState, RecoverPasswordFormData>(
    recoverPasswordAction,
    defaultFormState,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoverPasswordFormData>({
    resolver: yupResolver(recoverPasswordSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: RecoverPasswordFormData) => {
    startTransition(() => {
      recoverAction(data);
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Recuperar senha</h1>
        <p className="text-muted-foreground">
          Informe seu e-mail para receber instruções de recuperação
        </p>
      </div>

      {state.error && (
        <Alert variant="destructive" className="animate-in fade-in-50">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state.success && (
        <Alert className="bg-green-50 border-green-200 animate-in fade-in-50">
          <AlertDescription className="text-green-800">
            Se o e-mail estiver cadastrado, você receberá as instruções em breve.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register('email')}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className="h-11 pl-10"
            />
          </div>
          {errors.email && (
            <p id="email-error" className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full h-11" disabled={isPending}>
          {isPending ? 'Enviando...' : 'Enviar instruções'}
          {!isPending && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>

        <div className="text-center text-sm">
          Lembrou sua senha?{' '}
          <Link href="/login" className="text-sky-600 font-medium hover:underline">
            Voltar ao login
          </Link>
        </div>
      </form>
    </div>
  );
}
