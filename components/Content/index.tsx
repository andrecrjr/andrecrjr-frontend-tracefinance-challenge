'use client';

import { TransactionFilter } from '@/components/TransactionFilter';
import { TransactionTable } from '@/components/TransactionTable';
import { useTransactions } from '@/hooks/useTransactions';
import { TransactionStatus, TransactionType } from '@/services/api';
import { FilterPopover } from '@/components/Filter/FilterPopover';
import { useQueryFilters } from '@/hooks/useQueryFilters';
import { useEffect, useMemo, useRef } from 'react';

export const Content = () => {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    startDate,
    endDate,
  } = useQueryFilters();

  const { 
    data, 
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useTransactions({
    search: searchTerm,
    status: statusFilter === 'ALL' ? undefined : (statusFilter as TransactionStatus),
    type: typeFilter ? (typeFilter as TransactionType) : undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const transactions = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

  const totalResults = data?.pages[0]?.meta.total || 0;
  const currentCount = transactions.length;

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <header className="px-8 py-6 bg-white border-b border-gray-100 flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-semibold text-gray-900">Transaction</h1>
           <div className="mt-4">
             <FilterPopover />
           </div>
        </div>
        <div className="flex flex-col justify-between h-full">
           <button className="bg-[#00DDA3] hover:bg-[#00c490] text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            New transaction
          </button>
        <span className='mt-auto items-end text-gray-500 text-end'>
          {currentCount > 0 ? 1 : 0}-{currentCount} of {totalResults}
        </span>
        </div>
      </header>
      
      <div className="p-8 flex-1 overflow-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
           <TransactionFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={(statusFilter as TransactionStatus | 'ALL')}
            onStatusChange={(status) => setStatusFilter(status)}
          />
          
          <div className="mt-6">
            <TransactionTable 
              transactions={transactions} 
              isLoading={isLoading} 
            />
          </div>
          
           <div ref={loadMoreRef} className="h-4 w-full" />

           <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
             {isFetchingNextPage && <span>Loading more...</span>}
           </div>
        </div>
      </div>
    </div>
  );
}