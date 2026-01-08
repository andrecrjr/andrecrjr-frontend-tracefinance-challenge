
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Content } from './index';
import * as useTransactionsHook from '@/hooks/useTransactions';
import * as useQueryFiltersHook from '@/hooks/useQueryFilters';
import userEvent from '@testing-library/user-event';
import { TransactionsResponse, Transaction, PaginationMeta } from '@/services/api';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';

// Mocking hooks
vi.mock('@/hooks/useTransactions');
vi.mock('@/hooks/useQueryFilters');
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mocking component filter popover
vi.mock('@/components/Filter/FilterPopover', () => ({
  FilterPopover: () => <div data-testid="filter-popover">Filter Popover</div>
}));

const mockTransaction: Transaction = {
  id: '12345',
  description: 'Test Transaction',
  amount: 10000,
  type: 'TED',
  currency: 'BRL',
  status: 'COMPLETED',
  createdAt: '2024-01-01T10:00:00Z',
  cpfCnpj: '12345678901',
  bank: '123',
  accountType: 'CORRENTE',
  account: '123456',
  agency: '1234',
};

const mockMeta: PaginationMeta = {
  total: 1,
  page: 1,
  limit: 10,
  totalPages: 1,
  previousCursor: null,
  nextCursor: null,
};

const defaultTransactionsReturn = {
  data: {
    pages: [
      {
        data: [mockTransaction],
        meta: mockMeta,
      },
    ],
    pageParams: [1],
  },
  isLoading: false,
  fetchNextPage: vi.fn(),
  hasNextPage: false,
  isFetchingNextPage: false,
  isRefetching: false,
  isPending: false,
  error: null,
  fetchPreviousPage: vi.fn(),
  hasPreviousPage: false,
  isFetchingPreviousPage: false,
  status: 'success',
  dataUpdatedAt: 0,
  errorUpdatedAt: 0,
  failureCount: 0,
  failureReason: null,
  errorUpdateCount: 0,
  isError: false,
  isFetched: true,
  isFetchedAfterMount: true,
  isPlaceholderData: false,
  isStale: false,
  isSuccess: true,
  isInitialLoading: false,
  isPaused: false,
  fetchStatus: 'idle',
  promise: Promise.resolve({} as unknown as TransactionsResponse),
  refetch: vi.fn(),
} as unknown as UseInfiniteQueryResult<InfiniteData<TransactionsResponse, unknown>, Error>;

describe('Transaction List (Content)', () => {
  const mockSetSearchTerm = vi.fn();
  const mockSetStatusFilter = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useQueryFiltersHook.useQueryFilters).mockReturnValue({
      searchTerm: '',
      setSearchTerm: mockSetSearchTerm,
      statusFilter: 'ALL',
      setStatusFilter: mockSetStatusFilter,
      typeFilter: "",
      startDate: "",
      endDate: "",
      currency: "",
      handleFilterApply: vi.fn(),
      handleFilterClear: vi.fn(),
    });
  });

  it('renders transactions list correctly', () => {
    vi.mocked(useTransactionsHook.useTransactions).mockReturnValue(defaultTransactionsReturn);

    render(<Content />);

    expect(screen.getByText('Transaction')).toBeInTheDocument();
    expect(screen.getByText('Test Transaction')).toBeInTheDocument();
    expect(screen.getByText('1-1 of 1')).toBeInTheDocument(); 
  });

  it('filters transactions when search term changes', async () => {
    vi.mocked(useTransactionsHook.useTransactions).mockReturnValue({
      ...defaultTransactionsReturn,
      data: { pages: [], pageParams: [] },
    } as unknown as UseInfiniteQueryResult<InfiniteData<TransactionsResponse, unknown>, Error>);
    
    render(<Content />);
    
    const searchInput = screen.getByRole('textbox'); 
    await userEvent.type(searchInput, 'New search');

    expect(mockSetSearchTerm).toHaveBeenCalled();
  });

  it('displays empty state when no transactions found', () => {
    vi.mocked(useTransactionsHook.useTransactions).mockReturnValue({
      ...defaultTransactionsReturn,
      data: {
        pages: [
          {
             data: [],
             meta: { ...mockMeta, total: 0 }
          }
        ],
        pageParams: [1]
      },
    } as unknown as UseInfiniteQueryResult<InfiniteData<TransactionsResponse, unknown>, Error>);

    render(<Content />);

    expect(screen.getByText('No transactions found.')).toBeInTheDocument();
    expect(screen.getByText('0-0 of 0')).toBeInTheDocument();
  });
});
