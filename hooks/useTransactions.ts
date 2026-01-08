import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchTransactions, FetchTransactionsParams, TransactionsResponse } from '@/services/api';

export function useTransactions(params?: Omit<FetchTransactionsParams, 'page'>) {
  return useInfiniteQuery<TransactionsResponse>({
    queryKey: ['transactions', params],
    queryFn: ({ pageParam }) => fetchTransactions({ ...params, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta.nextCursor ?? undefined,
    placeholderData: keepPreviousData,
  });
}
