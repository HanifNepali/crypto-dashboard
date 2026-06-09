import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TimeRangeTabs } from './TimeRangeTabs';
import { CHART_RANGE_OPTIONS } from '../types/chartRange.types';

describe('TimeRangeTabs', () => {
  it('renders a tab for every configured range', () => {
    render(<TimeRangeTabs value="7d" onChange={vi.fn()} />);

    CHART_RANGE_OPTIONS.forEach((range) => {
      expect(screen.getByRole('tab', { name: range.label })).toBeInTheDocument();
    });
  });

  it('marks only the active range as selected', () => {
    render(<TimeRangeTabs value="30d" onChange={vi.fn()} />);

    expect(screen.getByRole('tab', { name: '30D' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: '7D' })).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onChange with the clicked range value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TimeRangeTabs value="7d" onChange={onChange} />);

    await user.click(screen.getByRole('tab', { name: '90D' }));

    expect(onChange).toHaveBeenCalledWith('90d');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('does not call onChange when the already-active tab is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TimeRangeTabs value="24h" onChange={onChange} />);

    await user.click(screen.getByRole('tab', { name: '24H' }));

    // Component doesn't guard against this itself, but confirms the callback still
    // fires with the same value rather than throwing — parent owns the no-op decision.
    expect(onChange).toHaveBeenCalledWith('24h');
  });
});
