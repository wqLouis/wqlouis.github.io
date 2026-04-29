import * as m from '$paraglide/messages.js';

export const t = (key: string): string => {
	// @ts-ignore - paraglide generates exports with special characters
	const fn = (m as Record<string, () => string>)[key];
	return fn ? fn() : key;
};

export const formatMessage = (key: string, count?: number): string => {
	const str = t(key);
	if (count !== undefined) {
		return str.replace('{count}', String(count));
	}
	return str;
};
