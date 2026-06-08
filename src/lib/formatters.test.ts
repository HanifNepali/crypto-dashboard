import { describe, it, expect } from 'vitest';
import {
  formatCompactCurrency,
  formatCompactNumber,
  formatPercentage,
  formatCurrency,
} from './formatters';

describe('formatCompactCurrency', () => {
  it('formats large values in compact notation', () => {
    expect(formatCompactCurrency(3_200_000_000_000)).toBe('$3.2T');
  });

  it('formats mid-size values', () => {
    expect(formatCompactCurrency(1_500_000)).toBe('$1.5M');
  });

  it('formats small values without compacting below the threshold', () => {
    expect(formatCompactCurrency(42)).toBe('$42');
  });

  it('handles zero', () => {
    expect(formatCompactCurrency(0)).toBe('$0');
  });

  it('handles negative values', () => {
    expect(formatCompactCurrency(-1_000_000)).toBe('-$1M');
  });
});

describe('formatCompactNumber', () => {
  it('formats large counts in compact notation', () => {
    expect(formatCompactNumber(1_234_567)).toBe('1.23M');
  });

  it('formats small counts as-is', () => {
    expect(formatCompactNumber(42)).toBe('42');
  });
});

describe('formatPercentage', () => {
  it('formats positive values with default 2 digits', () => {
    expect(formatPercentage(2.4567)).toBe('2.46%');
  });

  it('formats negative values, preserving the sign', () => {
    expect(formatPercentage(-0.8)).toBe('-0.80%');
  });

  it('respects a custom digit count', () => {
    expect(formatPercentage(2.4567, 1)).toBe('2.5%');
  });

  it('handles zero', () => {
    expect(formatPercentage(0)).toBe('0.00%');
  });
});

describe('formatCurrency', () => {
  it('formats prices >= $1 with 2 decimal places', () => {
    expect(formatCurrency(43521.4)).toBe('$43,521.40');
  });

  it('formats sub-dollar prices with higher precision', () => {
    expect(formatCurrency(0.00023)).toBe('$0.00023');
  });

  it('handles exactly $1 using the >=1 branch', () => {
    expect(formatCurrency(1)).toBe('$1.00');
  });
});
