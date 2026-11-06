import { test, expect } from '@playwright/test';

test('cadastro, login, Kanban persistido, status da IA e logout', async ({ page }, info) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const email = `ui-test-${Date.now()}-${info.project.name}@example.com`;
  const password = 'TestPassword123!';
  await page.goto('/boards');
  await expect(page).toHaveURL(/\/login$/);
  await page
    .context()
    .addCookies([{ name: 'auth_token', value: 'expired-token', domain: 'localhost', path: '/' }]);
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole('heading', { name: 'Entrar na sua conta' })).toBeVisible();
  await page.context().clearCookies();
  await page.goto('/signUp');
  await page.getByLabel('Nome completo').fill('Pessoa de teste');
  await page.getByLabel('E-mail', { exact: true }).fill(email);
  await page.getByLabel('Senha', { exact: true }).fill(password);
  await page.getByLabel('Confirmar senha', { exact: true }).fill(password);
  await page.getByRole('button', { name: 'Criar conta', exact: true }).click();
  await expect(page.getByText('Cadastro realizado com sucesso!')).toBeVisible();
  await page.getByRole('link', { name: 'Faça login', exact: true }).first().click();
  await expect(
    page.getByRole('heading', { name: 'Entrar na sua conta', exact: true }),
  ).toBeVisible();
  await page.getByLabel('E-mail', { exact: true }).fill(email);
  await page.getByLabel('Senha', { exact: true }).fill(password);
  await page.getByRole('button', { name: 'Entrar', exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole('heading', { name: 'Ideias em movimento.' })).toBeVisible();
  await page.getByRole('button', { name: 'Novo quadro', exact: true }).click();
  await page.getByLabel('Título', { exact: true }).fill('Meu projeto recuperado');
  await page.getByLabel('Descrição', { exact: true }).fill('Planejar, construir e lançar.');
  await page.getByRole('button', { name: 'Salvar', exact: true }).click();
  await expect(page).toHaveURL(/\/boards\//);
  await expect(
    page.getByRole('heading', { name: 'Meu projeto recuperado', exact: true }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Adicionar cartão', exact: true }).first().click();
  await page.getByLabel('Título', { exact: true }).fill('Validar o MVP');
  await page.getByLabel('Descrição', { exact: true }).fill('Conferir autenticação e persistência.');
  await page.getByLabel('Prazo (opcional)').fill('2026-12-15');
  await page.getByRole('button', { name: 'Salvar', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Validar o MVP', exact: true })).toBeVisible();
  await page.getByLabel('Mover Validar o MVP').selectOption({ label: 'Em andamento' });
  await page.getByRole('button', { name: 'Concluir Validar o MVP', exact: true }).click();
  await expect(
    page.getByRole('button', { name: 'Reabrir Validar o MVP', exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole('button', { name: 'Reabrir Validar o MVP', exact: true }),
  ).toBeVisible();
  await expect(page.getByLabel('Mover Validar o MVP')).toHaveValue(
    (await page
      .getByLabel('Mover Validar o MVP')
      .locator('option', { hasText: 'Em andamento' })
      .getAttribute('value')) as string,
  );
  await page.getByRole('button', { name: 'Nova lista', exact: true }).click();
  await page.getByLabel('Título', { exact: true }).fill('Revisão');
  await page.getByRole('button', { name: 'Salvar', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Renomear lista Revisão' })).toBeVisible();
  await page.screenshot({ path: `test-results/kanban-${info.project.name}.png`, fullPage: true });
  const boardUrl = page.url();
  await page.getByRole('link', { name: 'Minhas tarefas', exact: true }).click();
  await expect(page.getByText('Validar o MVP', { exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Criar com IA', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Da ideia ao plano de ação.' })).toBeVisible();
  // Inspect availability without spending the provider's free quota.
  const aiStatus = await (await page.request.get('/api/ai/status')).json();
  if (aiStatus.available)
    await expect(page.getByRole('button', { name: 'Gerar quadro com IA' })).toBeEnabled();
  else await expect(page.getByRole('button', { name: 'Gerar quadro com IA' })).toBeDisabled();
  // Exercise the UI without real provider traffic. Persistence is tested in the API suite.
  await page.route('**/api/ai/status', (route) =>
    route.fulfill({ json: { available: true, provider: 'Groq', dailyLimit: 5 } }),
  );
  await page.reload();
  await page.getByLabel('O que você quer organizar?').fill('Preparar uma feira de livros');
  await page.route('**/api/ai/boards', (route) =>
    route.fulfill({ status: 429, json: { message: 'A cota gratuita da IA está ocupada.' } }),
  );
  await page.getByRole('button', { name: 'Gerar quadro com IA' }).click();
  await expect(page.getByText('A cota gratuita da IA está ocupada.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Gerar quadro com IA' })).toBeEnabled();
  await page.unroute('**/api/ai/boards');
  await page.route('**/api/ai/boards', async (route) => {
    expect(route.request().postDataJSON()).toEqual({ prompt: 'Preparar uma feira de livros' });
    await route.fulfill({ status: 201, json: { id: boardUrl.split('/').pop() } });
  });
  await page.getByRole('button', { name: 'Gerar quadro com IA' }).click();
  await expect(page).toHaveURL(boardUrl);
  await page.goto(boardUrl);
  await page.getByRole('button', { name: 'Excluir', exact: true }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Excluir', exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(
    page.getByRole('heading', { name: 'Seu próximo projeto começa aqui' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Sair', exact: true }).click();
  await expect(page).toHaveURL(/\/login$/);
  await page.goto('/boards');
  await expect(page).toHaveURL(/\/login$/);
  expect(errors).toEqual([]);
});
