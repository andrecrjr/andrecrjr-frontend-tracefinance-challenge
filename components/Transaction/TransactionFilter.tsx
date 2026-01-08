import { Search } from 'lucide-react';
import { TransactionStatus } from '@/services/api';

interface TransactionFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter?: TransactionStatus | 'ALL';
  onStatusChange: (status: TransactionStatus | 'ALL') => void;
}

export function TransactionFilter({
  searchTerm,
  onSearchChange,
  statusFilter = 'ALL',
  onStatusChange,
}: TransactionFilterProps) {
  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by ID"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex space-x-6 border-b border-gray-200">
        <button
          onClick={() => onStatusChange('ALL')}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
            statusFilter === 'ALL'
              ? 'border-black text-black'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          All
        </button>
        <button
          onClick={() => onStatusChange('PENDING')}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
            statusFilter === 'PENDING'
              ? 'border-black text-black'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Pending approval
        </button>
        <button
          onClick={() => onStatusChange('COMPLETED')}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
            statusFilter === 'COMPLETED'
              ? 'border-black text-black'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => onStatusChange('FAILED')}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
            statusFilter === 'FAILED'
              ? 'border-black text-black'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Failed
        </button>
      </div>
    </div>
  );
}
