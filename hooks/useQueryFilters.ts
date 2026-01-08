import { useQueryState } from 'nuqs';
import { TransactionType } from '@/services/api';

export function useQueryFilters() {
  const [searchTerm, setSearchTerm] = useQueryState('search', { defaultValue: '' });
  const [statusFilter, setStatusFilter] = useQueryState('status', { defaultValue: 'ALL' });
  const [typeFilter, setTypeFilter] = useQueryState('type', { defaultValue: '' });
  const [startDate, setStartDate] = useQueryState('startDate', { defaultValue: '' });
  const [endDate, setEndDate] = useQueryState('endDate', { defaultValue: '' });

  const [currency, setCurrency] = useQueryState('currency', { defaultValue: '' });

  const handleFilterApply = (filters: { startDate: string | null; endDate: string | null; type: TransactionType | null; currency: string | null }) => {
    setStartDate(filters.startDate);
    setEndDate(filters.endDate);
    setTypeFilter(filters.type || null);
    setCurrency(filters.currency || null);
  };

  const handleFilterClear = () => {
    setStartDate(null);
    setEndDate(null);
    setTypeFilter(null);
    setCurrency(null);
  };

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    startDate,
    endDate,
    currency,
    handleFilterApply,
    handleFilterClear,
  };
}
