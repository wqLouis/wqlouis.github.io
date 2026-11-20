import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import { page } from '$app/state';
import type { RouteId } from '$app/types';
import { localeLabels, type Locale } from '$lib/stores/locale-store';
import { theme } from '$lib/stores/theme-store';

export type NavId = 'home' | 'blogs' | 'projects' | 'github' | 'email' | 'theme' | 'lang';

export interface NavAction {
	id: NavId;
	/** the tailwind icon class */
	icon: string;
	/** the label — the tooltip on the bar, the row label in the sheet */
	label: string;
	/** the internal route it points to — it is resolved at the point of use */
	route?: RouteId;
	/** an external address */
	href?: string;
	/** an external link opens in a new tab */
	external?: boolean;
}

/**
 * Every navigation affordance of the site, in one place: the landscape bar,
 * the portrait wheel and the sheet all read from this list, so the three
 * faces of the navigation can never drift apart.
 *
 * The locale is passed in so the caller can make the list reactive — the
 * labels follow the language and the theme icon follows the theme.
 */
export function navActions(
	t: (key: string) => string,
	currentTheme: 'light' | 'dark',
	currentLocale: Locale
): NavAction[] {
	return [
		{ id: 'home', icon: 'icon-[heroicons--home-20-solid]', label: t('common_nav_home') },
		{
			id: 'blogs',
			icon: 'icon-[heroicons--book-open-20-solid]',
			label: t('common_nav_blogs'),
			route: '/blogs' as RouteId
		},
		{
			id: 'projects',
			icon: 'icon-[heroicons--rectangle-stack-20-solid]',
			label: t('common_nav_projects'),
			route: '/projects' as RouteId
		},
		{
			id: 'github',
			icon: 'icon-[octicon--mark-github-24]',
			label: t('common_nav_github'),
			href: 'https://github.com/wqLouis',
			external: true
		},
		{
			id: 'email',
			icon: 'icon-[material-symbols--mail-rounded]',
			label: t('common_nav_email'),
			href: 'mailto:wql-louis@outlook.com',
			external: true
		},
		{
			id: 'theme',
			icon:
				currentTheme === 'light'
					? 'icon-[heroicons--sun-20-solid]'
					: 'icon-[heroicons--moon-20-solid]',
			label: t('common_nav_theme')
		},
		{
			id: 'lang',
			icon: 'icon-[heroicons--language-20-solid]',
			label: `${t('common_nav_language')} · ${localeLabels[currentLocale]}`
		}
	];
}

/** the three locales, in the order the wheel lays them out */
export const localeWheel: { id: Locale; label: string }[] = [
	{ id: 'en', label: localeLabels.en },
	{ id: 'zh_cn', label: localeLabels.zh_cn },
	{ id: 'zh_hk', label: localeLabels.zh_hk }
];

/**
 * Runs a navigation action. The pages and the links travel through here, so
 * the wheel, the bar and the sheet all behave the same way.
 */
export function activate(action: NavAction) {
	switch (action.id) {
		case 'home':
			if (page.url.pathname !== '/') {
				goto(resolve('/'));
			} else {
				document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
			}
			return;
		case 'theme':
			theme.toggle();
			return;
		default:
			if (action.route) {
				goto(resolve(action.route));
				return;
			}
			if (action.href) {
				// a mail address opens the composer, not a tab behind it
				if (action.href.startsWith('mailto:')) {
					window.location.href = action.href;
					return;
				}
				window.open(action.href, '_blank', 'noopener');
			}
	}
}
