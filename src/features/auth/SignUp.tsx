'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { startTransition, useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowRight, User, Mail, Lock } from 'lucide-react';

import { signupAction } from './actions/signUp';
import { type SignupFormData, signupSchema } from './validation/signUp.schema';
import { defaultFormState } from '@/constants/formStates';
import { Eye, EyeOff } from 'lucide-react';
import { useToggle } from '@/hooks/useToggle';

export function SignupForm() {
  const [state, signupFormAction, isPending] = useActionState(signupAction, defaultFormState);

  const [showPassword, togglePassword] = useToggle(false);
  const [showConfirm, toggleConfirm] = useToggle(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: SignupFormData) => {
    startTransition(() => {
      signupFormAction(data);
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Criar sua conta</h1>
        <p className="text-muted-foreground">
          Preencha os dados abaixo para se cadastrar no Trello.ia
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
            Cadastro realizado com sucesso!{' '}
            <Link href="/login" className="font-medium underline">
              Faça login
            </Link>
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome completo</Label>
          <div className="relative">
            <User className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              placeholder="Seu nome completo"
              {...register('name')}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className="h-11 pl-10"
            />
          </div>
          {errors.name && (
            <p id="name-error" className="text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

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

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              {...register('password')}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className="h-11 pl-10 pr-10"
            />
            <EyeOff
              className="absolute right-3 top-3.5 h-5 w-5 cursor-pointer text-muted-foreground"
              onClick={togglePassword}
            />
          </div>
          {errors.password && (
            <p id="password-error" className="text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar senha</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              placeholder="••••••••"
              {...register('confirmPassword')}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
              className="h-11 pl-10 pr-10"
            />
            <Eye
              className="absolute right-3 top-3.5 h-5 w-5 cursor-pointer text-muted-foreground"
              onClick={toggleConfirm}
            />
          </div>
          {errors.confirmPassword && (
            <p id="confirm-password-error" className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full h-11" disabled={isPending}>
          {isPending ? 'Cadastrando...' : 'Criar conta'}
          {!isPending && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>

        <div className="text-center text-sm">
          Já tem uma conta?{' '}
          <Link href="/login" className="text-sky-600 font-medium hover:underline">
            Faça login
          </Link>
        </div>
      </form>
    </div>
  );
}
