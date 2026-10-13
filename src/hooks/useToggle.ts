import { useState } from 'react';

export function useToggle(initial = false): [boolean, () => void] {
  const [state, setState] = useState(initial);
  const toggle = () => setState((prev) => !prev);
  return [state, toggle];
}
