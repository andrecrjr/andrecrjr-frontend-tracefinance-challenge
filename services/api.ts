export type TransactionType = 'PIX' | 'TED';
export type TransactionStatus = 'COMPLETED' | 'PENDING' | 'FAILED';
export type Currency = 'BRL' | 'USD' | 'EUR';
export type PixKeyType = 'EMAIL' | 'PHONE' | 'CPF' | 'CNPJ' | 'RANDOM';
export type AccountType = 'CORRENTE' | 'POUPANCA';

export interface Transaction {
  id: string;
  description?: string;
  type: TransactionType;
  amount: number;
  currency: Currency;
  status: TransactionStatus;
  createdAt: string;
  cpfCnpj: string;
  pixKey?: string;
  keyType?: PixKeyType;
  bank?: string;
  account?: string;
  agency?: string;
  accountType?: AccountType;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  previousCursor: number | null;
  nextCursor: number | null;
}

export interface TransactionsResponse {
  data: Transaction[];
  meta: PaginationMeta;
}

export interface FetchTransactionsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: TransactionStatus;
  currency?: Currency;
  startDate?: string;
  endDate?: string;
}

export async function fetchTransactions(params?: FetchTransactionsParams): Promise<TransactionsResponse> {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.append('page', params.page.toString());
  if (params?.limit) searchParams.append('limit', params.limit.toString());
  if (params?.search) searchParams.append('search', params.search);
  if (params?.status) searchParams.append('status', params.status);
  if (params?.currency) searchParams.append('currency', params.currency);
  if (params?.startDate) searchParams.append('startDate', params.startDate);
  if (params?.endDate) searchParams.append('endDate', params.endDate);

  const response = await fetch(`/api/transactions?${searchParams.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }

  const data = (await response.json()) as unknown;
  return data as TransactionsResponse;
}

export type CreateTransactionDTO = Omit<Transaction, 'id' | 'createdAt' | 'status' | 'currency'>;

export async function createTransaction(data: CreateTransactionDTO): Promise<Transaction> {
  const response = await fetch('/api/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create transaction');
  }

  const responseData = (await response.json()) as unknown;
  return responseData as Transaction;
}
