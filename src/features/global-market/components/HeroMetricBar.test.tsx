import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import { HeroMetricBar } from './HeroMetricBar';
import { fetchGlobalMarket } from '../api/globalApi';

vi.mock('../api/globalApi', () => ({
  fetchGlobalMarket: vi.fn(),
}));

const mockedFetch = vi.mocked(fetchGlobalMarket);

const mockResponse = {
  data: {
    active_cryptocurrencies: 15234,
    markets: 1102,
    total_market_cap: { usd: 3_200_000_000_000 },
    total_volume: { usd: 98_000_000_000 },
    market_cap_percentage: { btc: 54.2 },
    market_cap_change_percentage_24h_usd: 1.8,
  },
};

describe('HeroMetricBar', () => {
  beforeEach(() => {
    mockedFetch.mockReset();
  });

  it('shows skeletons while loading', () => {
    mockedFetch.mockReturnValue(new Promise(() => {})); // never resolves
    renderWithProviders(<HeroMetricBar />);

    expect(screen.getAllByTestId('stat-card-skeleton')).toHaveLength(4);
  });

  it('renders formatted market data on success', async () => {
    mockedFetch.mockResolvedValue(mockResponse);
    renderWithProviders(<HeroMetricBar />);

    expect(await screen.findByText('$3.2T')).toBeInTheDocument();
    expect(screen.getByText('$98B')).toBeInTheDocument();
    expect(screen.getAllByText('1.80%').length).toBeGreaterThan(0);
    expect(screen.getByText(/BTC 54.20%/)).toBeInTheDocument();
    expect(screen.getByText('15.23K')).toBeInTheDocument();
  });

  it('shows an error state with a working retry button', async () => {
    mockedFetch.mockRejectedValueOnce(new Error('network down'));
    renderWithProviders(<HeroMetricBar />);

    expect(await screen.findByText('Failed to load market overview.')).toBeInTheDocument();

    mockedFetch.mockResolvedValueOnce(mockResponse);
    await userEvent.click(screen.getByRole('button', { name: /try again/i }));

    await waitFor(() => expect(screen.getByText('$3.2T')).toBeInTheDocument());
  });
});
