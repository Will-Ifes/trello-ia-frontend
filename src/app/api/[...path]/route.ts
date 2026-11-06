import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from '@/lib/api-config';

async function proxy(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  const route = path.join('/');
  if (
    !/^(boards(?:\/[^/]+(?:\/lists)?)?|lists\/[^/]+(?:\/cards)?|cards\/[^/]+|auth\/me|ai\/(status|boards))$/.test(
      route,
    )
  ) {
    return NextResponse.json({ message: 'Rota não encontrada' }, { status: 404 });
  }
  if (
    !['GET', 'HEAD'].includes(request.method) &&
    request.headers.get('origin') !== request.nextUrl.origin
  ) {
    return NextResponse.json({ message: 'Origem inválida' }, { status: 403 });
  }
  const token = (await cookies()).get('auth_token')?.value;
  if (!token) return NextResponse.json({ message: 'Faça login para continuar' }, { status: 401 });
  try {
    const response = await fetch(`${API_URL}/${path.map(encodeURIComponent).join('/')}`, {
      method: request.method,
      cache: 'no-store',
      signal: AbortSignal.timeout(55000),
      headers: { 'Content-Type': 'application/json', Cookie: `auth_token=${token}` },
      body: ['GET', 'HEAD'].includes(request.method) ? undefined : await request.text(),
    });
    return new NextResponse(await response.text(), {
      status: response.status,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  } catch {
    return NextResponse.json(
      { message: 'Não foi possível conectar à API. Tente novamente.' },
      { status: 503 },
    );
  }
}

export { proxy as GET, proxy as POST, proxy as PATCH, proxy as DELETE };
