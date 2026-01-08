'use client';

import { useState } from 'react';
import { ChevronRight, Calendar, ArrowLeftRight, Banknote } from 'lucide-react';
import { TransactionType } from '@/services/api';
import { useQueryFilters } from '@/hooks/useQueryFilters';

type Tab = 'DATE' | 'METHOD' | 'CURRENCY';

export function FilterPopover() {
  const {
      startDate,
      endDate,
      typeFilter: type,
      currency,
      handleFilterApply,
      handleFilterClear
  } = useQueryFilters();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('DATE');
  const [localStartDate, setLocalStartDate] = useState<string | null>(startDate);
  const [localEndDate, setLocalEndDate] = useState<string | null>(endDate);
  const [localType, setLocalType] = useState<TransactionType | null>(type ? type as TransactionType : null);
  const [localCurrency, setLocalCurrency] = useState<string | null>(currency);

  const handleApply = () => {
    handleFilterApply({
      startDate: localStartDate,
      endDate: localEndDate,
      type: localType,
      currency: localCurrency,
    });
    setIsOpen(false);
  };

  const handleClear = () => {
    setLocalStartDate(null);
    setLocalEndDate(null);
    setLocalType(null);
    setLocalCurrency(null);
    handleFilterClear();
    setIsOpen(false);
  };

  if (!isOpen) {
     return (
        <div className="flex items-center gap-2">
            <button 
                onClick={() => {
                    setLocalStartDate(startDate);
                    setLocalEndDate(endDate);
                    setLocalType(type ? type as TransactionType : null);
                    setLocalCurrency(currency);
                    setIsOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg text-sm font-medium transition-colors"
            >
                <span>+ Add filter</span>
            </button>
            {startDate && endDate && (
                <span className="text-gray-500 font-normal text-sm border-l pl-2 border-gray-300">
                    Date: {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
                </span>
            )}
            {type && (
                <span className="text-gray-500 font-normal text-sm border-l pl-2 border-gray-300">
                    Type: {type}
                </span>
            )}
            {currency && (
                <span className="text-gray-500 font-normal text-sm border-l pl-2 border-gray-300">
                    Currency: {currency}
                </span>
            )}
        </div>
     )
  }

  return (
    <div className="relative">
        <div className="flex items-center gap-2">
            <button 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg text-sm font-medium transition-colors"
            >
                <span>+ Add filter</span>
            </button>
            {startDate && endDate && (
                <span className="text-gray-500 font-normal text-sm border-l pl-2 border-gray-300">
                    Date: {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
                </span>
            )}
             {type && (
                <span className="text-gray-500 font-normal text-sm border-l pl-2 border-gray-300">
                    Type: {type}
                </span>
            )}
        </div>

      <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

      <div className="absolute top-12 left-0 z-20 w-[600px] bg-surface rounded-xl shadow-xl border border-border flex overflow-hidden">
        
        <div className="w-1/3 bg-surface-secondary border-r border-border p-2 space-y-1">
          <button
            onClick={() => setActiveTab('DATE')}
            className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'DATE' ? 'bg-surface-hover text-text-primary' : 'text-text-secondary hover:bg-surface-hover'
            }`}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Date</span>
            </div>
            <ChevronRight className="w-4 h-4 text-text-muted" />
          </button>

          <button
            onClick={() => setActiveTab('METHOD')}
            className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'METHOD' ? 'bg-surface-hover text-text-primary' : 'text-text-secondary hover:bg-surface-hover'
            }`}
          >
            <div className="flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4" />
              <span>Method</span>
            </div>
            <ChevronRight className="w-4 h-4 text-text-muted" />
          </button>

          <button
            onClick={() => setActiveTab('CURRENCY')}
            className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'CURRENCY' ? 'bg-surface-hover text-text-primary' : 'text-text-secondary hover:bg-surface-hover'
            }`}
          >
            <div className="flex items-center gap-2">
              <Banknote className="w-4 h-4" />
              <span>Currency</span>
            </div>
            <ChevronRight className="w-4 h-4 text-text-muted" />
          </button>
        </div>

        <div className="w-2/3 p-6 flex flex-col justify-between">
            <div className="space-y-4">
                {activeTab === 'DATE' && (
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-text-secondary">Select a period</h3>
                        <div className="flex items-center gap-2">
                            <input 
                                type="date" 
                                value={localStartDate || ''}
                                onChange={(e) => setLocalStartDate(e.target.value || null)}
                                className="w-full p-2 border border-border rounded-lg text-sm bg-input-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-[#00DDA3] focus:border-transparent"
                            />
                            <span className="text-text-muted">-</span>
                            <input 
                                type="date" 
                                value={localEndDate || ''}
                                onChange={(e) => setLocalEndDate(e.target.value || null)}
                                className="w-full p-2 border border-border rounded-lg text-sm bg-input-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-[#00DDA3] focus:border-transparent"
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'METHOD' && (
                    <div className="space-y-4">
                         <h3 className="text-sm font-medium text-text-secondary">Transaction type</h3>
                         <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={localType === 'PIX'}
                                    onChange={(e) => setLocalType(e.target.checked ? 'PIX' : null)}
                                    className="rounded border-border text-[#00DDA3] focus:ring-[#00DDA3] bg-input-bg"
                                />
                                <span className="text-sm text-text-primary">PIX</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={localType === 'TED'}
                                    onChange={(e) => setLocalType(e.target.checked ? 'TED' : null)}
                                    className="rounded border-border text-[#00DDA3] focus:ring-[#00DDA3] bg-input-bg"
                                />
                                <span className="text-sm text-text-primary">TED</span>
                            </label>
                         </div>
                    </div>
                )}

                {activeTab === 'CURRENCY' && (
                    <div className="space-y-4">
                         <h3 className="text-sm font-medium text-text-secondary">Select currency</h3>
                         <div className="space-y-2">
                            {['BRL', 'USD', 'EUR'].map((curr) => (
                                <label key={curr} className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={localCurrency === curr}
                                        onChange={(e) => setLocalCurrency(e.target.checked ? curr : null)}
                                        className="rounded border-border text-[#00DDA3] focus:ring-[#00DDA3] bg-input-bg"
                                    />
                                    <span className="text-sm text-text-primary">{curr}</span>
                                </label>
                            ))}
                         </div>
                    </div>
                )}
            </div>

            <div className="flex justify-end gap-2 mt-8 pt-4 border-t border-border">
                 <button
                    onClick={handleClear}
                    className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                    Clear
                </button>
                <button
                    onClick={handleApply}
                    className="px-4 py-2 bg-[#00DDA3] hover:bg-[#00c490] text-black rounded-lg text-sm font-medium transition-colors"
                >
                    Apply
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
