import { RecoverPasswordForm } from '@/features/auth/RecoverPasswordForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-50 to-white p-4">
      <div className="w-full max-w-md">
        <RecoverPasswordForm />
      </div>
    </div>
  );
}
