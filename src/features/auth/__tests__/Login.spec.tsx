import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../Login';
import { LoginFormData } from '../validation/login.schema';
import { FormState } from '@/types/formStates';

// Mock do router para evitar erro com useRouter()
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

// Mock da action com tipos explícitos
jest.mock('../actions/login', () => ({
  loginAction: jest.fn((_prev: FormState, data: LoginFormData) => {
    if (data.email === 'teste@exemplo.com' && data.password !== 'senha123') {
      return Promise.resolve({ error: 'Credenciais inválidas' });
    }
    return Promise.resolve({ success: true });
  }),
}));

describe('LoginForm', () => {
  it('renderiza os campos corretamente', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^entrar$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar com google/i })).toBeInTheDocument();
  });

  it('exibe mensagens de erro para campos vazios', async () => {
    render(<LoginForm />);
    await userEvent.click(screen.getByRole('button', { name: /^entrar$/i }));

    expect(await screen.findByText(/e-mail é obrigatório/i)).toBeInTheDocument();
    expect(await screen.findByText(/senha é obrigatória/i)).toBeInTheDocument();
  });

  it('valida formato de e-mail inválido', async () => {
    render(<LoginForm />);
    await userEvent.type(screen.getByLabelText(/e-mail/i), 'emailinvalido');
    await userEvent.type(screen.getByLabelText(/senha/i), '123456');
    await userEvent.click(screen.getByRole('button', { name: /^entrar$/i }));

    expect(await screen.findByText(/digite um e-mail válido/i)).toBeInTheDocument();
  });

  it('exibe erro para credenciais inválidas', async () => {
    render(<LoginForm />);
    await userEvent.type(screen.getByLabelText(/e-mail/i), 'teste@exemplo.com');
    await userEvent.type(screen.getByLabelText(/senha/i), 'errada');
    await userEvent.click(screen.getByRole('button', { name: /^entrar$/i }));

    expect(await screen.findByText(/credenciais inválidas/i)).toBeInTheDocument();
  });

  it('exibe mensagem de sucesso no login válido', async () => {
    render(<LoginForm />);
    await userEvent.type(screen.getByLabelText(/e-mail/i), 'will@email.com');
    await userEvent.type(screen.getByLabelText(/senha/i), 'senha123');
    await userEvent.click(screen.getByRole('button', { name: /^entrar$/i }));

    expect(await screen.findByText(/login realizado com sucesso/i)).toBeInTheDocument();
  });
});
