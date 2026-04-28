import { writable } from 'svelte/store';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

const getSystemTheme = (): Theme => {
	if (typeof window === 'undefined') return 'light';
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getStoredTheme = (): Theme | null => {
	if (typeof window === 'undefined') return null;
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === 'light' || stored === 'dark') return stored;
	return null;
};

const createThemeStore = () => {
	const initialTheme = getStoredTheme() || getSystemTheme();

	const { subscribe, set, update } = writable<Theme>(initialTheme);

	const applyTheme = (theme: Theme) => {
		document.documentElement.classList.remove('light', 'dark');
		document.documentElement.classList.add(theme);
		localStorage.setItem(STORAGE_KEY, theme);
	};

	const setTheme = (theme: Theme) => {
		set(theme);
		applyTheme(theme);
	};

	const toggleTheme = () => {
		update((current) => {
			const next: Theme = current === 'light' ? 'dark' : 'light';
			applyTheme(next);
			return next;
		});
	};

	const initialize = () => {
		if (typeof window === 'undefined') return;

		const stored = getStoredTheme();
		const theme = stored || getSystemTheme();
		set(theme);
		applyTheme(theme);
	};

	return {
		subscribe,
		set: setTheme,
		toggle: toggleTheme,
		initialize
	};
};

export const theme = createThemeStore();
