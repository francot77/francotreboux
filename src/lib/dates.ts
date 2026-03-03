const monthNames = [
	'ene',
	'feb',
	'mar',
	'abr',
	'may',
	'jun',
	'jul',
	'ago',
	'sep',
	'oct',
	'nov',
	'dic',
] as const;

export function formatYearMonth(ym: string): string {
	const [yearStr, monthStr] = ym.split('-');
	const year = Number(yearStr);
	const month = Number(monthStr);
	if (!Number.isFinite(year) || !Number.isFinite(month) || month < 1 || month > 12) {
		return ym;
	}
	return `${monthNames[month - 1]} ${year}`;
}

export function formatDateRange(start: string, end?: string): string {
	if (!end) return `${formatYearMonth(start)} · Actualidad`;
	return `${formatYearMonth(start)} · ${formatYearMonth(end)}`;
}

