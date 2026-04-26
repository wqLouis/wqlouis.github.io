/**
 * Format a date string to display as "Month Day, Year" (e.g., "March 17, 2026")
 */
export function formatBlogDate(dateString: string): string {
	if (!dateString) return '';

	try {
		let date = new Date(dateString);

		// Check if date is valid
		if (isNaN(date.getTime())) {
			// Try parsing as simple date string (YYYY-MM-DD)
			const parts = dateString.split('-');
			if (parts.length >= 3) {
				const year = parseInt(parts[0], 10);
				const month = parseInt(parts[1], 10) - 1; // 0-indexed
				const day = parseInt(parts[2], 10);
				const parsedDate = new Date(year, month, day);
				if (!isNaN(parsedDate.getTime())) {
					date = parsedDate;
				}
			}
		}

		if (isNaN(date.getTime())) {
			return dateString; // Return original if still invalid
		}

		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	} catch {
		return dateString;
	}
}

/**
 * Format date for time element (ISO string)
 */
export function formatDateISO(dateString: string): string {
	if (!dateString) return '';

	try {
		const date = new Date(dateString);
		if (isNaN(date.getTime())) {
			// Try parsing as simple date string
			const parts = dateString.split('-');
			if (parts.length >= 3) {
				const year = parseInt(parts[0], 10);
				const month = parseInt(parts[1], 10) - 1;
				const day = parseInt(parts[2], 10);
				const parsedDate = new Date(year, month, day);
				if (!isNaN(parsedDate.getTime())) {
					return parsedDate.toISOString().split('T')[0];
				}
			}
			return dateString;
		}
		return date.toISOString().split('T')[0];
	} catch {
		return dateString;
	}
}
