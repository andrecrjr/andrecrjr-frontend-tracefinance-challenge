import { Transaction } from '@/services/api';
import { StatusBadge } from '../StatusBadge';

interface TransactionTableProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export function TransactionTable({ transactions, isLoading }: TransactionTableProps) {
  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading transactions...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="py-4 font-medium text-xs text-gray-400">ID</th>
            <th className="py-4 font-medium text-xs text-gray-400">Description</th>
            <th className="py-4 font-medium text-xs text-gray-400">Method</th>
            <th className="py-4 font-medium text-xs text-gray-400">Date</th>
            <th className="py-4 font-medium text-xs text-gray-400">Status</th>
            <th className="py-4 font-medium text-xs text-gray-400 text-right">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {transactions.map((transaction) => {
            const date = new Date(transaction.createdAt).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            }).replace(',', ' -').replace('AM', 'am').replace('PM', 'pm');

            const isNegative = transaction.amount < 0 || transaction.type === 'PIX' || transaction.type === 'TED'; 
            
            const amount = new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: transaction.currency,
            }).format(transaction.amount / 100);

            return (
              <tr key={transaction.id} className="group hover:bg-gray-50 transition-colors">
                <td className="py-4 text-sm text-gray-600 font-medium">{transaction.id}</td>
                <td className="py-4 text-sm text-gray-600">{transaction.description || 'No description'}</td>
                <td className="py-4 text-sm text-gray-600">{transaction.type}</td>
                <td className="py-4 text-sm text-gray-600">{date}</td>
                <td className="py-4 text-sm">
                  <StatusBadge status={transaction.status} />
                </td>
                <td className={`py-4 text-sm font-medium text-right ${isNegative ? 'text-gray-600' : 'text-gray-900'}`}>
                   {amount}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {transactions.length === 0 && (
        <div className="p-8 text-center text-gray-500">No transactions found.</div>
      )}
    </div>
  );
}
