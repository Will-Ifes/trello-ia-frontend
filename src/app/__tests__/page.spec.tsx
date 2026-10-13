import { render, screen } from '@testing-library/react';
import Home from '../page';
import '@testing-library/jest-dom';

describe('Home page', () => {
  beforeEach(() => {
    render(<Home />);
  });

  it('renderiza o título principal da hero section', () => {
    expect(
      screen.getByRole('heading', {
        name: /organize suas tarefas com inteligência/i,
      }),
    ).toBeInTheDocument();
  });

  it('renderiza o botão "Começar agora"', () => {
    expect(screen.getByRole('button', { name: /começar agora/i })).toBeInTheDocument();
  });

  it('renderiza botão de login no cabeçalho', () => {
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('exibe as colunas de tarefas (a fazer, em progresso, concluído)', () => {
    expect(screen.getByText(/a fazer/i)).toBeInTheDocument();
    expect(screen.getByText(/em progresso/i)).toBeInTheDocument();
    expect(screen.getByText(/concluído/i)).toBeInTheDocument();
  });

  it('exibe os cartões simulados de tarefas', () => {
    expect(screen.getByText(/planejar sprint/i)).toBeInTheDocument();
    expect(screen.getByText(/revisar documentação/i)).toBeInTheDocument();
    expect(screen.getByText(/preparar apresentação/i)).toBeInTheDocument();
    expect(screen.getByText(/desenvolver api/i)).toBeInTheDocument();
    expect(screen.getByText(/criar componentes ui/i)).toBeInTheDocument();
    expect(screen.getByText(/definir requisitos/i)).toBeInTheDocument();
    expect(screen.getByText(/configurar ambiente/i)).toBeInTheDocument();
  });

  it('exibe o rodapé com o nome e ano', () => {
    expect(
      screen.getByText(/© 2025 Trello\.ia\. Todos os direitos reservados\./i),
    ).toBeInTheDocument();
  });
});
