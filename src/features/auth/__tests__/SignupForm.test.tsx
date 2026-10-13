import { render, screen, fireEvent } from '@testing-library/react';
import { SignupForm } from '../SignUp';

jest.mock('../actions/signUp', () => ({
  signupAction: jest.fn((_prev, data) => {
    if (data.email === 'existente@exemplo.com') {
      return Promise.resolve({ error: 'Este e-mail já está cadastrado' });
    }
    return Promise.resolve({ success: true });
  }),
}));

describe('SignupForm', () => {
  it('renderiza os campos corretamente', () => {
    render(<SignupForm />);
    expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^senha$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /criar conta/i })).toBeInTheDocument();
  });

  it('exibe erros de validação para campos vazios', async () => {
    render(<SignupForm />);
    fireEvent.click(screen.getByRole('button', { name: /criar conta/i }));

    expect(await screen.findByText(/nome é obrigatório/i)).toBeInTheDocument();
    expect(await screen.findByText(/e-mail é obrigatório/i)).toBeInTheDocument();
    expect(await screen.findByText(/^senha é obrigatória$/i)).toBeInTheDocument();
    expect(await screen.findByText(/confirmação de senha é obrigatória/i)).toBeInTheDocument();
  });

  it('exibe erro se senhas forem diferentes', async () => {
    render(<SignupForm />);
    fireEvent.input(screen.getByLabelText(/nome completo/i), { target: { value: 'Will' } });
    fireEvent.input(screen.getByLabelText(/e-mail/i), { target: { value: 'will@email.com' } });
    fireEvent.input(screen.getByLabelText(/^senha$/i), { target: { value: 'Senha123!' } });
    fireEvent.input(screen.getByLabelText(/confirmar senha/i), { target: { value: 'Senha321!' } });

    fireEvent.click(screen.getByRole('button', { name: /criar conta/i }));
    expect(await screen.findByText(/as senhas devem coincidir/i)).toBeInTheDocument();
  });

  it('exibe mensagem de sucesso após cadastro válido', async () => {
    render(<SignupForm />);
    fireEvent.input(screen.getByLabelText(/nome completo/i), { target: { value: 'Will' } });
    fireEvent.input(screen.getByLabelText(/e-mail/i), { target: { value: 'will@ok.com' } });
    fireEvent.input(screen.getByLabelText(/^senha$/i), { target: { value: 'Senha123!' } });
    fireEvent.input(screen.getByLabelText(/confirmar senha/i), { target: { value: 'Senha123!' } });

    fireEvent.click(screen.getByRole('button', { name: /criar conta/i }));
    expect(await screen.findByText(/cadastro realizado com sucesso/i)).toBeInTheDocument();
  });

  it('exibe erro se o e-mail já estiver cadastrado', async () => {
    render(<SignupForm />);
    fireEvent.input(screen.getByLabelText(/nome completo/i), { target: { value: 'Will' } });
    fireEvent.input(screen.getByLabelText(/e-mail/i), {
      target: { value: 'existente@exemplo.com' },
    });
    fireEvent.input(screen.getByLabelText(/^senha$/i), { target: { value: 'Senha123!' } });
    fireEvent.input(screen.getByLabelText(/confirmar senha/i), { target: { value: 'Senha123!' } });

    fireEvent.click(screen.getByRole('button', { name: /criar conta/i }));
    expect(await screen.findByText(/já está cadastrado/i)).toBeInTheDocument();
  });
});
