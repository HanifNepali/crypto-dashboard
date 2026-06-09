import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import { CoinExplorerSection } from './CoinExplorerSection';
import { fetchCoin, fetchCoinMarketChart } from '../api/coinsApi';
import { useUIStore } from '@/store/useUIStore';

vi.mock('../api/coinsApi', () => ({
  fetchCoin: vi.fn(),
  fetchCoinMarketChart: vi.fn(),
}));

const mockedFetchCoin = vi.mocked(fetchCoin);
const mockedFetchChart = vi.mocked(fetchCoinMarketChart);

const mockCoin = {
  id: 'bitcoin',
  symbol: 'btc',
  name: 'Bitcoin',
  image: { large: 'btc-large.png', small: 'btc-small.png', thumb: 'btc-thumb.png' },
  market_data: {
    current_price: { usd: 65000 },
    price_change_percentage_24h: 2.5,
    market_cap: { usd: 1_280_000_000_000 },
    total_volume: { usd: 32_000_000_000 },
    high_24h: { usd: 66000 },
    low_24h: { usd: 63500 },
    circulating_supply: 19_800_000,
  },
};

const mockChart = {
  prices: [
    [1710000000000, 64000],
    [1710003600000, 64500],
    [1710007200000, 65000],
  ] as [number, number][],
};

describe('CoinExplorerSection', () => {
  beforeEach(() => {
    mockedFetchCoin.mockReset();
    mockedFetchChart.mockReset();
    useUIStore.setState({ selectedCoinId: 'bitcoin' });
  });

  it('fetches the chart with the default 7d range on mount', async () => {
    mockedFetchCoin.mockResolvedValue(mockCoin);
    mockedFetchChart.mockResolvedValue(mockChart);

    renderWithProviders(<CoinExplorerSection />);

    await waitFor(() => expect(mockedFetchChart).toHaveBeenCalledWith('bitcoin', 7));
  });

  it('renders coin summary data on success', async () => {
    mockedFetchCoin.mockResolvedValue(mockCoin);
    mockedFetchChart.mockResolvedValue(mockChart);

    renderWithProviders(<CoinExplorerSection />);

    expect(await screen.findByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('$65,000.00')).toBeInTheDocument();
    expect(screen.getByText('2.50%')).toBeInTheDocument();
    expect(screen.getByText('$1.28T')).toBeInTheDocument();
  });

  it('refetches the chart with the new range when a tab is clicked', async () => {
    mockedFetchCoin.mockResolvedValue(mockCoin);
    mockedFetchChart.mockResolvedValue(mockChart);
    const user = userEvent.setup();

    renderWithProviders(<CoinExplorerSection />);
    await waitFor(() => expect(mockedFetchChart).toHaveBeenCalledWith('bitcoin', 7));

    await user.click(screen.getByRole('tab', { name: '24H' }));
    await waitFor(() => expect(mockedFetchChart).toHaveBeenCalledWith('bitcoin', 1));

    await user.click(screen.getByRole('tab', { name: '90D' }));
    await waitFor(() => expect(mockedFetchChart).toHaveBeenCalledWith('bitcoin', 90));
  });

  it('shows an error state with retry when coin details fail to load', async () => {
    mockedFetchCoin.mockRejectedValueOnce(new Error('network down'));
    mockedFetchChart.mockResolvedValue(mockChart);

    renderWithProviders(<CoinExplorerSection />);

    expect(await screen.findByText('Failed to load coin details.')).toBeInTheDocument();

    mockedFetchCoin.mockResolvedValueOnce(mockCoin);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /try again/i }));

    await waitFor(() => expect(screen.getByText('Bitcoin')).toBeInTheDocument());
  });

  it('shows an error state with retry when the chart fails to load', async () => {
    mockedFetchCoin.mockResolvedValue(mockCoin);
    mockedFetchChart.mockRejectedValueOnce(new Error('network down'));

    renderWithProviders(<CoinExplorerSection />);

    expect(await screen.findByText('Failed to load price chart.')).toBeInTheDocument();

    mockedFetchChart.mockResolvedValueOnce(mockChart);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /try again/i }));

    await waitFor(() =>
      expect(screen.getByRole('img', { name: /price chart/i })).toBeInTheDocument()
    );
  });

  it('renders the price chart with an accessible label reflecting trend direction', async () => {
    mockedFetchCoin.mockResolvedValue(mockCoin);
    mockedFetchChart.mockResolvedValue(mockChart); // last price (65000) > first (64000) → up

    renderWithProviders(<CoinExplorerSection />);

    expect(await screen.findByRole('img', { name: /trending up/i })).toBeInTheDocument();
  });
});
