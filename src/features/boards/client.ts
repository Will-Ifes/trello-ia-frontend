export async function api<T>(path: string, method = 'GET', body?: unknown): Promise<T> {
  const response = await fetch(`/api/${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) {
    if (response.status === 401) window.location.assign('/login');
    throw new Error(
      Array.isArray(data.message)
        ? data.message.join('. ')
        : data.message || 'Não foi possível salvar. Tente novamente.',
    );
  }
  return data;
}
