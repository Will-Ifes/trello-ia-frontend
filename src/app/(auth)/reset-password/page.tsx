import { ResetPasswordForm } from '@/features/auth/ResetPasswordForm';
import { Suspense } from 'react';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p role="status">Carregando formulário...</p>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
