import { getLocale, setLocale as paraglideSetLocale } from '$paraglide/runtime';
import { writable } from 'svelte/store';

export type Locale = 'en' | 'zh_cn' | 'zh_hk';

export const locales: Locale[] = ['en', 'zh_cn', 'zh_hk'];

export const localeLabels: Record<Locale, string> = {
	en: 'EN',
	zh_cn: '简',
	zh_hk: '繁'
};

function createLocaleStore() {
	const { subscribe, set } = writable<Locale>(getLocale() as Locale);

	return {
		subscribe,
		set: (newLocale: Locale) => {
			const current = getLocale() as Locale;
			if (newLocale === current) return;
			paraglideSetLocale(newLocale, { reload: false });
			set(newLocale);
		},
		cycle: () => {
			const current = getLocale() as Locale;
			const idx = locales.indexOf(current);
			const next = locales[(idx + 1) % locales.length];
			if (next === current) return;
			paraglideSetLocale(next, { reload: false });
			set(next);
		}
	};
}

export const locale = createLocaleStore();