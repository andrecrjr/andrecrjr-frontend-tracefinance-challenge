import { z } from 'zod';

export const methodSchema = z.object({
  type: z.enum(['TED', 'PIX'], {
    error: 'Please select a transaction method',
  }),
});

export type MethodFormData = z.infer<typeof methodSchema>;

const baseTransactionSchema = z.object({
  amount: z
    .number({ error: 'Amount is required' })
    .positive('Amount must be positive'),
  cpfCnpj: z
    .string({ error: 'Tax ID / CPF / CNPJ is required' }),
  legalName: z
    .string({ error: 'Legal name is required' })
    .min(1, 'Legal name is required'),
  description: z.string().optional(),
});

export const tedSchema = baseTransactionSchema.extend({
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
  pixKey: z.string().optional(),
  keyType: z.enum(['EMAIL', 'PHONE', 'CPF', 'CNPJ', 'RANDOM']).optional(),
});

export const pixSchema = baseTransactionSchema.extend({
  pixKey: z.string({ error: 'Pix key is required' }).min(1, 'Pix key is required'),
  keyType: z.enum(['EMAIL', 'PHONE', 'CPF', 'CNPJ', 'RANDOM'], { error: 'Key type is required' }),
  accountType: z.enum(['CORRENTE', 'POUPANCA']).optional(),
  bank: z.string().optional(),
  account: z.string().optional(),
  agency: z.string().optional(),
});

export const transactionInfoSchema = baseTransactionSchema.extend({
    accountType: z.enum(['CORRENTE', 'POUPANCA']).optional(),
    bank: z.string().optional(),
    account: z.string().optional(),
    agency: z.string().optional(),
    pixKey: z.string().optional(),
    keyType: z.enum(['EMAIL', 'PHONE', 'CPF', 'CNPJ', 'RANDOM']).optional(),
});


export type TransactionInfoFormData = z.infer<typeof transactionInfoSchema>;

export interface TransactionFormData extends TransactionInfoFormData {
  type: 'TED' | 'PIX';
}
