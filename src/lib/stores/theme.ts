import { writable } from 'svelte/store';

type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'theme';

const getSystemTheme = (): 'light' | 'dark' => {
	if (typeof window === 'undefined') return 'light';
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getStoredTheme = (): Theme | null => {
	if (typeof window === 'undefined') return null;
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
	return null;
};

const createThemeStore = () => {
	const initialTheme = getStoredTheme() || 'system';

	const { subscribe, set, update } = writable<Theme>(initialTheme);

	const applyTheme = (theme: Theme) => {
		const html = document.documentElement;
		const resolvedTheme = theme === 'system' ? getSystemTheme() : theme;

		html.classList.remove('light', 'dark');
		html.classList.add(resolvedTheme);

		if (typeof window !== 'undefined') {
			localStorage.setItem(STORAGE_KEY, theme);
		}
	};

	const setTheme = (theme: Theme) => {
		set(theme);
		applyTheme(theme);
	};

	const toggleTheme = () => {
		update((current) => {
			const next: Theme = current === 'light' ? 'dark' : current === 'dark' ? 'system' : 'light';
			setTheme(next);
			return next;
		});
	};

	const initialize = () => {
		if (typeof window === 'undefined') return;

		const theme = getStoredTheme() || 'system';
		set(theme);
		applyTheme(theme);

		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
			const stored = getStoredTheme();
			if (stored === 'system') {
				applyTheme('system');
			}
		});
	};

	return {
		subscribe,
		set: setTheme,
		toggle: toggleTheme,
		initialize
	};
};

export const theme = createThemeStore();
