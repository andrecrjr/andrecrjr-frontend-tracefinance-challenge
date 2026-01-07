'use client';

import { useQueryState } from 'nuqs';
import { TransactionFilter } from '@/components/TransactionFilter';
import { TransactionTable } from '@/components/TransactionTable';
import { useTransactions } from '@/hooks/useTransactions';
import { TransactionStatus, TransactionType } from '@/services/api';
import { FilterPopover } from '@/components/Filter/FilterPopover';

export const Content = () => {
  const [searchTerm, setSearchTerm] = useQueryState('search', { defaultValue: '' });
  const [statusFilter, setStatusFilter] = useQueryState('status', { defaultValue: 'ALL' });
  const [typeFilter, setTypeFilter] = useQueryState('type', { defaultValue: '' });
  const [startDate, setStartDate] = useQueryState('startDate', { defaultValue: '' });
  const [endDate, setEndDate] = useQueryState('endDate', { defaultValue: '' });

  const { data, isLoading } = useTransactions({
    search: searchTerm,
    status: statusFilter === 'ALL' ? undefined : (statusFilter as TransactionStatus),
    type: typeFilter ? (typeFilter as TransactionType) : undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  const handleFilterApply = (filters: { startDate: string | null; endDate: string | null; type: TransactionType | null }) => {
    setStartDate(filters.startDate);
    setEndDate(filters.endDate);
    setTypeFilter(filters.type || '');
  };

  const handleFilterClear = () => {
    setStartDate(null);
    setEndDate(null);
    setTypeFilter(null);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <header className="px-8 py-6 bg-white border-b border-gray-100 flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-semibold text-gray-900">Transaction</h1>
           <div className="mt-4">
             <FilterPopover 
                startDate={startDate}
                endDate={endDate}
                type={typeFilter as TransactionType | null}
                onApply={handleFilterApply}
                onClear={handleFilterClear}
             />
           </div>
        </div>
        <div className="self-start">
           <button className="bg-[#00DDA3] hover:bg-[#00c490] text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            New transaction
          </button>
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
              transactions={data?.data || []} 
              isLoading={isLoading} 
            />
          </div>
          
           {/* Pagination could go here */}
           <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
             <span>{(data?.data || []).length} results</span>
           </div>
        </div>
      </div>
    </div>
  );
}