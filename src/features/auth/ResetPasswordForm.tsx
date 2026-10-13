'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSearchParams, useRouter } from 'next/navigation';
import { startTransition, useEffect } from 'react';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowRight, Lock } from 'lucide-react';

import {
  ExtendedResetPasswordFormData,
  ResetPasswordFormData,
  resetPasswordFormSchema,
} from './validation/resetPasswordForm.schema';
import { resetPasswordAction } from './actions/resetPasswordAction';
import { FormState } from '@/types/formStates';
import { defaultFormState } from '@/constants/formStates';

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [state, action, isPending] = useActionState<FormState, ExtendedResetPasswordFormData>(
    resetPasswordAction,
    defaultFormState,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordFormSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    if (!token) return;
    startTransition(() => action({ ...data, token }));
  };

  useEffect(() => {
    if (state.success) {
      setTimeout(() => router.push('/login'), 2000);
    }
  }, [state.success, router]);

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Redefinir senha</h1>
        <p className="text-muted-foreground">Crie uma nova senha para acessar sua conta.</p>
      </div>

      {state.error && (
        <Alert variant="destructive" className="animate-in fade-in-50">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state.success && (
        <Alert className="bg-green-50 border-green-200 animate-in fade-in-50">
          <AlertDescription className="text-green-800">
            Senha redefinida com sucesso! Redirecionando...
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">Nova senha</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="********"
              {...register('password')}
              className="h-11 pl-10"
            />
          </div>
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirme a nova senha</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type="password"
              placeholder="********"
              {...register('confirmPassword')}
              className="h-11 pl-10"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full h-11" disabled={isPending}>
          {isPending ? 'Redefinindo...' : 'Redefinir senha'}
          {!isPending && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </form>
    </div>
  );
}
