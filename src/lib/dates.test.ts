import { describe, expect, it } from 'vitest';
import { formatDateRange, formatYearMonth } from './dates';

describe('dates', () => {
	it('formats year-month in Spanish short month', () => {
		expect(formatYearMonth('2026-03')).toBe('mar 2026');
	});

	it('returns original input when invalid', () => {
		expect(formatYearMonth('nope')).toBe('nope');
	});

	it('formats date range with "Actualidad" when end missing', () => {
		expect(formatDateRange('2024-01')).toBe('ene 2024 · Actualidad');
	});

	it('formats date range with start and end', () => {
		expect(formatDateRange('2024-01', '2024-12')).toBe('ene 2024 · dic 2024');
	});
});

