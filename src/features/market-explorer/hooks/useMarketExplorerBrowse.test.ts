import { describe, it, expect } from 'vitest';
import { toOrderParam } from './useMarketExplorerBrowse';

describe('toOrderParam', () => {
  it('maps rank ascending to market_cap_desc (rank 1 = highest market cap)', () => {
    expect(toOrderParam('rank', 'asc')).toBe('market_cap_desc');
  });

  it('maps rank descending to market_cap_asc', () => {
    expect(toOrderParam('rank', 'desc')).toBe('market_cap_asc');
  });

  it('maps marketCap ascending to market_cap_asc directly', () => {
    expect(toOrderParam('marketCap', 'asc')).toBe('market_cap_asc');
  });

  it('maps marketCap descending to market_cap_desc directly', () => {
    expect(toOrderParam('marketCap', 'desc')).toBe('market_cap_desc');
  });

  it('maps volume ascending to volume_asc', () => {
    expect(toOrderParam('volume', 'asc')).toBe('volume_asc');
  });

  it('maps volume descending to volume_desc', () => {
    expect(toOrderParam('volume', 'desc')).toBe('volume_desc');
  });
});
