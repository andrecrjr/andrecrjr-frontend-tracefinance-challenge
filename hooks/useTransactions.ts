import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchTransactions, FetchTransactionsParams, TransactionsResponse } from '@/services/api';

export function useTransactions(params?: FetchTransactionsParams) {
  return useQuery<TransactionsResponse>({
    queryKey: ['transactions', params],
    queryFn: () => fetchTransactions(params),
    placeholderData: keepPreviousData,
  });
}
