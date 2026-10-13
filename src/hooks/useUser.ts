import useSWR from 'swr';

const fetcher = (url: string) =>
  fetch(url, { credentials: 'include' }).then((res) => {
    if (!res.ok) throw new Error('Não autenticado');
    return res.json();
  });

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
    fetcher,
  );

  return {
    user: data,
    isLoading,
    isError: !!error,
    mutate,
  };
}
