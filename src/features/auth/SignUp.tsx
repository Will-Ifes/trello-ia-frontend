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

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">Ou continue com</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full h-11 flex items-center justify-center gap-2"
          onClick={() => {
            // Implementação futura de cadastro com Google
            console.log('Cadastro com Google');
          }}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Cadastrar com Google
        </Button>
      </form>
    </div>
  );
}
