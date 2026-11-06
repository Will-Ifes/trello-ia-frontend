'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import useSWR from 'swr';
import {
  ArrowLeft,
  Check,
  LayoutDashboard,
  LogOut,
  Plus,
  Search,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react';
import { logoutAction } from '@/features/auth/actions/logout';
import { api } from './client';
import type { Board, TaskCard } from './types';

const primary =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-wait';
const secondary =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-50';
const field =
  'w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500';

function Modal({
  title,
  close,
  children,
}: {
  title: string;
  close: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    ref.current?.showModal();
  }, []);
  return (
    <dialog
      ref={ref}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      aria-labelledby="dialog-title"
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border-0 p-6 shadow-2xl backdrop:bg-slate-900/50"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 id="dialog-title" className="text-xl font-bold">
          {title}
        </h2>
        <button type="button" onClick={close} aria-label="Fechar" className={secondary}>
          <X size={16} />
        </button>
      </div>
      {children}
    </dialog>
  );
}

type Editor =
  | { kind: 'board'; board?: Board }
  | { kind: 'list'; id?: string; title?: string }
  | { kind: 'card'; listId: string; card?: TaskCard };
type Removal = { path: string; title: string; board?: boolean };

export function Workspace({
  boardId,
  mode = 'boards',
}: {
  boardId?: string;
  mode?: 'boards' | 'tasks' | 'ai' | 'profile' | 'settings';
}) {
  const router = useRouter();
  const {
    data: boards,
    error,
    isLoading,
    mutate,
  } = useSWR<Board[]>('boards', () => api<Board[]>('boards'));
  const { data: user } = useSWR<{ name: string; email: string }>('user', () =>
    api<{ name: string; email: string }>('auth/me'),
  );
  const { data: ai } = useSWR<{ available: boolean }>('ai/status', () =>
    api<{ available: boolean }>('ai/status'),
  );
  const [query, setQuery] = useState('');
  const [editor, setEditor] = useState<Editor | null>(null);
  const [removal, setRemoval] = useState<Removal | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const board = boards?.find((item) => item.id === boardId);
  const cards =
    boards?.flatMap((b) =>
      b.lists.flatMap((l) => l.cards.map((c) => ({ ...c, board: b, list: l }))),
    ) ?? [];
  const filtered =
    boards?.filter((b) =>
      `${b.title} ${b.description}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
    ) ?? [];
  const visibleCard = (c: TaskCard) =>
    `${c.title} ${c.description}`.toLocaleLowerCase().includes(query.toLocaleLowerCase());

  async function perform(action: () => Promise<unknown>, done?: () => void) {
    if (busy) return;
    setBusy(true);
    setMessage('');
    try {
      await action();
      await mutate();
      done?.();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Algo deu errado. Tente novamente.');
    } finally {
      setBusy(false);
    }
  }

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = String(data.get('title')).trim();
    const description = String(data.get('description') ?? '');
    if (!editor || !title) return;
    void perform(
      async () => {
        if (editor.kind === 'board') {
          const saved = await api<Board>(
            editor.board ? `boards/${editor.board.id}` : 'boards',
            editor.board ? 'PATCH' : 'POST',
            { title, description },
          );
          if (!editor.board) router.push(`/boards/${saved.id}`);
        } else if (editor.kind === 'list') {
          await api(
            editor.id ? `lists/${editor.id}` : `boards/${boardId}/lists`,
            editor.id ? 'PATCH' : 'POST',
            { title },
          );
        } else {
          const date = String(data.get('dueDate') ?? '');
          await api(
            editor.card ? `cards/${editor.card.id}` : `lists/${editor.listId}/cards`,
            editor.card ? 'PATCH' : 'POST',
            {
              title,
              description,
              dueDate: date ? new Date(`${date}T12:00:00`).toISOString() : null,
            },
          );
        }
      },
      () => setEditor(null),
    );
  }

  function move(card: TaskCard, listId: string, position?: number) {
    const destination = board?.lists.find((l) => l.id === listId);
    if (!destination) return;
    void perform(() =>
      api(`cards/${card.id}`, 'PATCH', {
        listId,
        position: position ?? Math.max(-1, ...destination.cards.map((c) => c.position)) + 1,
      }),
    );
  }

  async function generate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await perform(async () => {
      const created = await api<Board>('ai/boards', 'POST', { prompt: aiPrompt });
      router.push(`/boards/${created.id}`);
    });
  }

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-900">
      <header className="border-b border-slate-200 bg-white px-5 py-4 md:px-8">
        <div className="mx-auto flex max-w-[1800px] flex-wrap items-center justify-between gap-4">
          <Link href="/dashboard" className="flex items-center gap-2.5 text-xl font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white">
              <LayoutDashboard size={21} />
            </span>
            Trello<span className="-ml-2 text-indigo-600">.ia</span>
          </Link>
          <nav
            aria-label="Navegação principal"
            className="flex flex-wrap items-center gap-2 text-sm"
          >
            <Link href="/dashboard" className={secondary}>
              Meus quadros
            </Link>
            <Link href="/tasks" className={secondary}>
              Minhas tarefas
            </Link>
            <Link
              href="/ai-features"
              className="flex items-center gap-1 rounded-xl bg-violet-50 px-3 py-2 text-violet-700"
            >
              <Sparkles size={16} /> Criar com IA
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/profile" className="text-sm font-medium">
              {user?.name ?? 'Minha conta'}
            </Link>
            <form action={logoutAction}>
              <button type="submit" aria-label="Sair" className={secondary}>
                <LogOut size={16} />
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1800px] p-5 md:p-8">
        {(message || error) && (
          <div
            role="alert"
            className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <span>{message || error?.message}</span>
            <button
              className={secondary}
              onClick={() => {
                setMessage('');
                void mutate();
              }}
            >
              Tentar novamente
            </button>
          </div>
        )}
        {isLoading && (
          <p role="status" className="py-16 text-center text-slate-500">
            Carregando seus projetos...
          </p>
        )}

        {!boardId && mode === 'boards' && (
          <>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                  Seu espaço de trabalho
                </p>
                <h1 className="text-3xl font-bold tracking-tight">Ideias em movimento.</h1>
                <p className="mt-2 text-slate-500">
                  Um lugar para planejar, acompanhar e realizar.
                </p>
              </div>
              <button
                className={primary}
                onClick={() => {
                  setMessage('');
                  setEditor({ kind: 'board' });
                }}
              >
                <Plus size={18} /> Novo quadro
              </button>
            </div>
            <div className="mb-8 grid grid-cols-3 gap-3">
              {[
                ['Quadros', boards?.length ?? 0],
                ['Tarefas', cards.length],
                ['Concluídas', cards.filter((c) => c.completed).length],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-sm text-slate-500">{label}</p>
                  <p className="mt-2 text-2xl font-bold">{value}</p>
                </div>
              ))}
            </div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-lg font-semibold">Meus quadros</h2>
              <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3">
                <Search size={16} className="text-slate-400" />
                <input
                  aria-label="Buscar quadros"
                  placeholder="Buscar quadros..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-52 bg-transparent py-2.5 text-sm outline-none"
                />
              </label>
            </div>
            {!isLoading && !error && filtered.length === 0 && (
              <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
                <LayoutDashboard className="mx-auto mb-4 text-indigo-400" size={36} />
                <h3 className="text-lg font-semibold">
                  {query ? 'Nenhum quadro encontrado' : 'Seu próximo projeto começa aqui'}
                </h3>
                <p className="mb-5 mt-2 text-slate-500">
                  {query
                    ? 'Tente outro termo de busca.'
                    : 'Crie um quadro e organize suas primeiras tarefas.'}
                </p>
                {!query && (
                  <button className={primary} onClick={() => setEditor({ kind: 'board' })}>
                    Criar meu primeiro quadro
                  </button>
                )}
              </div>
            )}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((b, index) => {
                const tasks = b.lists.flatMap((l) => l.cards);
                const complete = tasks.filter((c) => c.completed).length;
                return (
                  <Link
                    key={b.id}
                    href={`/boards/${b.id}`}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div
                      className={`h-2 ${['bg-indigo-500', 'bg-teal-500', 'bg-violet-500', 'bg-amber-400'][index % 4]}`}
                    />
                    <div className="p-6">
                      <h3 className="truncate text-lg font-bold group-hover:text-indigo-600">
                        {b.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 min-h-10 text-sm text-slate-500">
                        {b.description || 'Pronto para suas ideias.'}
                      </p>
                      <div className="mt-6 flex justify-between text-xs text-slate-500">
                        <span>
                          {b.lists.length} listas · {tasks.length} tarefas
                        </span>
                        <span>{complete} concluídas</span>
                      </div>
                      <progress
                        aria-label={`Progresso de ${b.title}`}
                        value={complete}
                        max={tasks.length || 1}
                        className="mt-3 h-1.5 w-full accent-indigo-600"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {boardId && board && (
          <>
            <Link
              href="/dashboard"
              className="mb-5 inline-flex items-center gap-2 text-sm text-slate-500"
            >
              <ArrowLeft size={16} /> Todos os quadros
            </Link>
            <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">{board.title}</h1>
                <p className="mt-2 max-w-2xl whitespace-pre-wrap text-slate-500">
                  {board.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className={secondary} onClick={() => setEditor({ kind: 'board', board })}>
                  Editar quadro
                </button>
                <button
                  className={secondary}
                  onClick={() =>
                    setRemoval({ path: `boards/${board.id}`, title: board.title, board: true })
                  }
                >
                  <Trash2 size={14} /> Excluir
                </button>
                <button className={primary} onClick={() => setEditor({ kind: 'list' })}>
                  <Plus size={16} /> Nova lista
                </button>
              </div>
            </div>
            <label className="mb-6 block max-w-sm">
              <span className="sr-only">Buscar cartões</span>
              <input
                className={field}
                placeholder="Buscar cartões neste quadro..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <p className="mb-4 text-xs text-slate-500">
              Arraste cartões entre listas ou use o seletor de destino em cada cartão.
            </p>
            <div className="flex items-start gap-5 overflow-x-auto pb-8">
              {board.lists.map((list) => (
                <section
                  key={list.id}
                  className="w-80 shrink-0 rounded-2xl border border-slate-200 bg-slate-100/80 p-3"
                  onDragOver={(e) => {
                    if (!busy) e.preventDefault();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    const id = e.dataTransfer.getData('text/plain');
                    const card = board.lists.flatMap((l) => l.cards).find((c) => c.id === id);
                    if (card && card.listId !== list.id) move(card, list.id);
                  }}
                >
                  <div className="mb-4 flex items-center gap-2 px-1">
                    <button
                      className="min-w-0 flex-1 truncate text-left text-sm font-bold"
                      onClick={() => setEditor({ kind: 'list', id: list.id, title: list.title })}
                      aria-label={`Renomear lista ${list.title}`}
                    >
                      {list.title}
                    </button>
                    <span className="rounded-md bg-white px-2 py-0.5 text-xs text-slate-500">
                      {list.cards.length}
                    </span>
                    <button
                      className="p-1 text-slate-400 hover:text-red-600"
                      aria-label={`Excluir lista ${list.title}`}
                      onClick={() => setRemoval({ path: `lists/${list.id}`, title: list.title })}
                    >
                      <X size={15} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {list.cards.filter(visibleCard).map((card) => (
                      <article
                        key={card.id}
                        draggable={!busy}
                        onDragStart={(e) => e.dataTransfer.setData('text/plain', card.id)}
                        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                      >
                        <div className="flex items-start gap-2">
                          <button
                            disabled={busy}
                            aria-label={`${card.completed ? 'Reabrir' : 'Concluir'} ${card.title}`}
                            aria-pressed={card.completed}
                            onClick={() =>
                              void perform(() =>
                                api(`cards/${card.id}`, 'PATCH', { completed: !card.completed }),
                              )
                            }
                            className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded border ${card.completed ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300'}`}
                          >
                            {card.completed && <Check size={14} />}
                          </button>
                          <button
                            className={`text-left text-sm font-semibold ${card.completed ? 'text-slate-400 line-through' : ''}`}
                            onClick={() => setEditor({ kind: 'card', card, listId: list.id })}
                          >
                            {card.title}
                          </button>
                        </div>
                        {card.description && (
                          <p className="mt-2 line-clamp-3 whitespace-pre-wrap text-xs leading-relaxed text-slate-500">
                            {card.description}
                          </p>
                        )}
                        {card.dueDate && (
                          <p
                            className={`mt-3 text-xs ${!card.completed && new Date(card.dueDate) < new Date() ? 'text-red-600' : 'text-slate-500'}`}
                          >
                            Prazo:{' '}
                            {new Date(card.dueDate).toLocaleDateString('pt-BR', {
                              timeZone: 'America/Sao_Paulo',
                            })}
                          </p>
                        )}
                        <div className="mt-4 flex items-center gap-2">
                          <select
                            aria-label={`Mover ${card.title}`}
                            className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white p-1.5 text-xs"
                            disabled={busy}
                            value={list.id}
                            onChange={(e) => move(card, e.target.value)}
                          >
                            {board.lists.map((l) => (
                              <option key={l.id} value={l.id}>
                                {l.title}
                              </option>
                            ))}
                          </select>
                          <button
                            className="p-1 text-slate-400 hover:text-red-600"
                            aria-label={`Excluir cartão ${card.title}`}
                            onClick={() =>
                              setRemoval({ path: `cards/${card.id}`, title: card.title })
                            }
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                  <button
                    className="mt-3 flex w-full items-center gap-2 rounded-xl p-2 text-sm text-slate-500 hover:bg-white"
                    onClick={() => setEditor({ kind: 'card', listId: list.id })}
                  >
                    <Plus size={16} /> Adicionar cartão
                  </button>
                </section>
              ))}
              <button
                className={`${secondary} w-56 shrink-0`}
                onClick={() => setEditor({ kind: 'list' })}
              >
                <Plus size={16} /> Adicionar lista
              </button>
            </div>
          </>
        )}
        {boardId && !isLoading && !error && !board && (
          <div className="py-16 text-center">
            <h1 className="text-2xl font-bold">Quadro não encontrado</h1>
            <Link href="/dashboard" className="mt-4 inline-block text-indigo-600">
              Voltar aos meus quadros
            </Link>
          </div>
        )}

        {!boardId && mode === 'tasks' && (
          <>
            <h1 className="mb-2 text-3xl font-bold">Minhas tarefas</h1>
            <p className="mb-6 text-slate-500">Todos os seus cartões em um só lugar.</p>
            <input
              className={`${field} mb-6 max-w-sm`}
              aria-label="Buscar tarefas"
              placeholder="Buscar tarefas..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="space-y-3">
              {cards.filter(visibleCard).map((card) => (
                <div
                  key={card.id}
                  className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4"
                >
                  <input
                    type="checkbox"
                    aria-label={`Concluir ${card.title}`}
                    checked={card.completed}
                    disabled={busy}
                    onChange={() =>
                      void perform(() =>
                        api(`cards/${card.id}`, 'PATCH', { completed: !card.completed }),
                      )
                    }
                  />
                  <Link href={`/boards/${card.board.id}`}>
                    <p className={card.completed ? 'text-slate-400 line-through' : 'font-medium'}>
                      {card.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {card.board.title} / {card.list.title}
                    </p>
                  </Link>
                </div>
              ))}
              {!isLoading && !cards.filter(visibleCard).length && (
                <p className="rounded-xl bg-white p-8 text-center text-slate-500">
                  Nenhuma tarefa encontrada. Adicione cartões aos seus quadros.
                </p>
              )}
            </div>
          </>
        )}

        {!boardId && mode === 'ai' && (
          <div className="mx-auto max-w-2xl py-8">
            <div className="mb-5 inline-flex rounded-2xl bg-violet-100 p-4 text-violet-600">
              <Sparkles size={30} />
            </div>
            <h1 className="text-3xl font-bold">Da ideia ao plano de ação.</h1>
            <p className="mb-8 mt-3 text-slate-500">
              Descreva seu projeto. A IA cria um quadro com etapas e tarefas para você revisar e
              adaptar.
            </p>
            <form
              onSubmit={(e) => void generate(e)}
              className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6"
            >
              <label htmlFor="ai-prompt" className="block text-sm font-semibold">
                O que você quer organizar?
              </label>
              <textarea
                id="ai-prompt"
                className={`${field} min-h-40`}
                required
                minLength={10}
                maxLength={2000}
                placeholder="Ex.: Quero lançar uma loja online de produtos artesanais nos próximos 3 meses..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
              />
              <p className="text-xs text-slate-500">
                Somente o texto acima será enviado à Groq. Seus outros quadros e dados da conta não
                são enviados. Evite incluir dados sensíveis.
              </p>
              <p className="text-xs text-slate-500">
                Até 5 tentativas por conta por dia (UTC), sujeitas à cota gratuita da Groq. Revise
                as tarefas antes de executá-las.
              </p>
              {ai && !ai.available && (
                <p role="status" className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
                  A IA ainda precisa ser configurada pelo administrador. A criação manual de quadros
                  já está disponível.
                </p>
              )}
              <button type="submit" className={primary} disabled={busy || !ai?.available}>
                <Sparkles size={16} />
                {busy ? 'Preparando seu quadro...' : 'Gerar quadro com IA'}
              </button>
            </form>
          </div>
        )}

        {!boardId && (mode === 'profile' || mode === 'settings') && (
          <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8">
            <h1 className="mb-6 text-2xl font-bold">
              {mode === 'profile' ? 'Minha conta' : 'Configurações'}
            </h1>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm text-slate-500">Nome</dt>
                <dd className="font-medium">{user?.name}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">E-mail</dt>
                <dd>{user?.email}</dd>
              </div>
            </dl>
            <Link className="mt-6 inline-block text-sm text-indigo-600" href="/recuperar-senha">
              Redefinir minha senha por e-mail
            </Link>
          </div>
        )}
      </main>

      {editor && (
        <Modal
          title={
            editor.kind === 'board'
              ? editor.board
                ? 'Editar quadro'
                : 'Novo quadro'
              : editor.kind === 'list'
                ? editor.id
                  ? 'Renomear lista'
                  : 'Nova lista'
                : editor.card
                  ? 'Editar cartão'
                  : 'Novo cartão'
          }
          close={() => {
            if (!busy) {
              setEditor(null);
              setMessage('');
            }
          }}
        >
          <form onSubmit={save} className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-medium">Título</span>
              <input
                autoFocus
                required
                maxLength={120}
                name="title"
                defaultValue={
                  editor.kind === 'board'
                    ? editor.board?.title
                    : editor.kind === 'list'
                      ? editor.title
                      : editor.card?.title
                }
                className={field}
              />
            </label>
            {editor.kind !== 'list' && (
              <label className="block space-y-2">
                <span className="text-sm font-medium">Descrição</span>
                <textarea
                  name="description"
                  maxLength={editor.kind === 'board' ? 2000 : 10000}
                  rows={4}
                  defaultValue={
                    editor.kind === 'board' ? editor.board?.description : editor.card?.description
                  }
                  className={field}
                />
              </label>
            )}
            {editor.kind === 'card' && (
              <label className="block space-y-2">
                <span className="text-sm font-medium">Prazo (opcional)</span>
                <input
                  type="date"
                  name="dueDate"
                  defaultValue={editor.card?.dueDate?.slice(0, 10)}
                  className={field}
                />
              </label>
            )}
            {message && (
              <p role="alert" className="text-sm text-red-600">
                {message}
              </p>
            )}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                disabled={busy}
                className={secondary}
                onClick={() => {
                  setEditor(null);
                  setMessage('');
                }}
              >
                Cancelar
              </button>
              <button className={primary} disabled={busy}>
                {busy ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </form>
        </Modal>
      )}
      {removal && (
        <Modal
          title="Excluir permanentemente?"
          close={() => {
            if (!busy) setRemoval(null);
          }}
        >
          <p className="mb-6 text-sm text-slate-600">
            Excluir “{removal.title}”? Os itens contidos também serão removidos. Esta ação não pode
            ser desfeita.
          </p>
          {message && (
            <p role="alert" className="mb-4 text-sm text-red-600">
              {message}
            </p>
          )}
          <div className="flex justify-end gap-2">
            <button className={secondary} disabled={busy} onClick={() => setRemoval(null)}>
              Cancelar
            </button>
            <button
              className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              disabled={busy}
              onClick={() =>
                void perform(
                  () => api(removal.path, 'DELETE'),
                  () => {
                    setRemoval(null);
                    if (removal.board) router.push('/dashboard');
                  },
                )
              }
            >
              {busy ? 'Excluindo...' : 'Excluir'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
