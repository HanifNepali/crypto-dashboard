import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import { CoinSearch } from './CoinSearch';
// searchCoins is imported by feature/hooks/useCoinSearch.ts from
// "../api/coinsApi", which resolves to feature/api/coinsApi — the same path
// from this test file. Mocking any other specifier leaves the real module in
// place and the mock silently never intercepts the call.
import { searchCoins } from '../api/coinsApi';
import { useUIStore } from '@/store/useUIStore';

vi.mock('../api/coinsApi', () => ({
  searchCoins: vi.fn(),
}));

// The debounce delay itself is not this component's concern to (re-)verify —
// it's covered on its own in useDebouncedValue.test.ts. Mocking it here means
// this suite never needs fake timers, which avoids the flakiness/deadlocks
// that come from mixing fake timers with userEvent's own internal timer
// usage and React's async scheduling. The query is simply the raw value now.
vi.mock('@/hooks/useDebouncedValue', () => ({
  useDebouncedValue: (value: string) => value,
}));

const mockedSearch = vi.mocked(searchCoins);

const mockResults = [
  { id: 'ethereum', name: 'Ethereum', symbol: 'eth', market_cap_rank: 2, thumb: 'eth.png' },
];

describe('CoinSearch', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    mockedSearch.mockReset();
    useUIStore.setState({ selectedCoinId: 'bitcoin' });
  });

  it('does not search for a single character', async () => {
    renderWithProviders(<CoinSearch />);
    await user.type(screen.getByPlaceholderText(/search cryptocurrency/i), 'e');

    expect(mockedSearch).not.toHaveBeenCalled();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('searches once the query is 2+ characters', async () => {
    mockedSearch.mockResolvedValue(mockResults);
    renderWithProviders(<CoinSearch />);

    await user.type(screen.getByPlaceholderText(/search cryptocurrency/i), 'eth');

    await waitFor(() => expect(mockedSearch).toHaveBeenCalledWith('eth'));
    expect(await screen.findByText('Ethereum')).toBeInTheDocument();
  });

  it('shows a loading state while the search is in flight', async () => {
    // Declares a variable to hold a function that can resolve a promise from outside that promise.
    // It's typed to accept mockResults-shaped data,
    // and initialized to a no-op just so TypeScript doesn't complain about "used before assigned."
    let resolveSearch: (value: typeof mockResults) => void = () => {};
    // Instead of mockResolvedValue (which resolves immediately),
    // this makes searchCoins return a pending promise — one that never resolves on its own.
    // The trick: the Promise executor captures the resolve callback and stashes it into resolveSearch.
    // So calling searchCoins() now hangs indefinitely until the test itself later calls resolveSearch(...).
    // This gives the test manual control over exactly when the "API response" arrives.
    mockedSearch.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveSearch = resolve;
        })
    );
    renderWithProviders(<CoinSearch />);

    await user.type(screen.getByPlaceholderText(/search cryptocurrency/i), 'eth');

    expect(await screen.findByText(/searching/i)).toBeInTheDocument();

    resolveSearch(mockResults);
    expect(await screen.findByText('Ethereum')).toBeInTheDocument();
  });

  it('selecting a result updates selectedCoinId and closes the dropdown', async () => {
    mockedSearch.mockResolvedValue(mockResults);
    renderWithProviders(<CoinSearch />);

    const input = screen.getByPlaceholderText(/search cryptocurrency/i);
    await user.type(input, 'eth');

    const option = await screen.findByText('Ethereum');
    await user.click(option);

    expect(useUIStore.getState().selectedCoinId).toBe('ethereum');
    expect(input).toHaveValue('Ethereum');
    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
  });

  it('shows a "no coins found" message for empty results', async () => {
    mockedSearch.mockResolvedValue([]);
    renderWithProviders(<CoinSearch />);

    await user.type(screen.getByPlaceholderText(/search cryptocurrency/i), 'zzz');

    expect(await screen.findByText('No coins found.')).toBeInTheDocument();
  });

  it('closes the dropdown when clicking outside', async () => {
    mockedSearch.mockResolvedValue(mockResults);
    renderWithProviders(
      <div>
        <CoinSearch />
        <button type="button">outside</button>
      </div>
    );

    await user.type(screen.getByPlaceholderText(/search cryptocurrency/i), 'eth');
    await screen.findByRole('listbox');

    await user.click(screen.getByRole('button', { name: 'outside' }));

    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
  });
});
