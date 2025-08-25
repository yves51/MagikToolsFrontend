// src/ui/adapters/RedirectAdapter.ts
type RedirectAdapter = {
  redirectToLogin: () => void;
};

let adapter: RedirectAdapter | null = null;

export const setRedirectAdapter = (newAdapter: RedirectAdapter) => {
  adapter = newAdapter;
};

export const getRedirectAdapter = (): RedirectAdapter | null => adapter;
