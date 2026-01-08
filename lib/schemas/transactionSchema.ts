import { z } from 'zod';

export const methodSchema = z.object({
  type: z.enum(['TED', 'PIX'], {
    error: 'Please select a transaction method',
  }),
});

export type MethodFormData = z.infer<typeof methodSchema>;

export const transactionInfoSchema = z.object({
  amount: z
    .number({ error: 'Amount is required' })
    .positive('Amount must be positive'),
  cpfCnpj: z
    .string({ error: 'Tax ID is required' })
    .min(11, 'Tax ID must be at least 11 characters'),
  legalName: z
    .string({ error: 'Legal name is required' })
    .min(1, 'Legal name is required'),
  accountType: z.enum(['CORRENTE', 'POUPANCA'], {
    error: 'Account type is required',
  }),
  bank: z
    .string({ error: 'Bank code is required' })
    .min(1, 'Bank code is required'),
  account: z
    .string({ error: 'Account number is required' })
    .min(1, 'Account number is required'),
  agency: z
    .string({ error: 'Branch is required' })
    .min(1, 'Branch is required'),
  description: z.string().optional(),
});

export type TransactionInfoFormData = z.infer<typeof transactionInfoSchema>;

export interface TransactionFormData extends TransactionInfoFormData {
  type: 'TED' | 'PIX';
}
