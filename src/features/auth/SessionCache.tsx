'use client';
import { useState, type ReactNode } from 'react';
import { SWRConfig } from 'swr';

export function SessionCache({ children }: { children: ReactNode }) {
  const [cache] = useState(() => new Map());
  return <SWRConfig value={{ provider: () => cache }}>{children}</SWRConfig>;
}
