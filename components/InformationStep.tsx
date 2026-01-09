'use client';

import { UseFormReturn } from 'react-hook-form';
import { TransactionInfoFormData } from '@/lib/schemas/transactionSchema';

interface InformationStepProps {
  form: UseFormReturn<TransactionInfoFormData>;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  transactionType: 'TED' | 'PIX';
}

interface FormInputProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  hasValue?: boolean;
}

function FormField({ label, error, required, children, hasValue }: FormInputProps) {
  const labelVisibilityClass = typeof hasValue === 'boolean'
    ? (hasValue ? 'opacity-0 hidden' : 'opacity-100')
    : 'opacity-0 peer-placeholder-shown:opacity-100';

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        {children}
        {label && <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none transition-opacity ${labelVisibilityClass}`}>
          {label}
          {required && <span className="text-status-failed ml-0.5">*</span>}
        </span>}
      </div>
      {error && <p className="text-status-failed text-xs px-1">{error}</p>}
    </div>
  );
}

export function InformationStep({ form, onBack, onSubmit, isSubmitting, transactionType }: InformationStepProps) {
  const { register, formState: { errors, isValid }, setValue, watch } = form;

  const inputBaseClass = `peer w-full px-4 py-4 pt-4 pb-4 border rounded-lg bg-surface text-text-primary
                          placeholder-transparent focus:outline-none focus:border-primary transition-colors`;

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <h1 className="text-2xl font-bold text-text-primary mb-8">
        Information
      </h1>

      <div className="flex flex-col gap-6 flex-1">
        <h2 className="text-sm font-medium text-text-primary mb-4">
          Transaction information
        </h2>
        <div className="flex flex-col gap-4">
          <FormField label="Amount" required error={errors.amount?.message}>
            <input
                type="number"
                step="0.01"
                {...register('amount', { valueAsNumber: true })}
                className={`${inputBaseClass} ${errors.amount ? 'border-status-failed' : 'border-border'}`}
                placeholder="Amount"
              />
            </FormField>

            <FormField label="Tax ID / CPF / CNPJ" required error={errors.cpfCnpj?.message}>
              <input
                type="text"
                {...register('cpfCnpj')}
                className={`${inputBaseClass} ${errors.cpfCnpj ? 'border-status-failed' : 'border-border'}`}
                placeholder="Tax ID"
              />
            </FormField>

            <FormField label="Legal name" required error={errors.legalName?.message}>
              <input
                type="text"
                {...register('legalName')}
                className={`${inputBaseClass} ${errors.legalName ? 'border-status-failed' : 'border-border'}`}
                placeholder="Legal name"
              />
            </FormField>
        </div>

        {transactionType === 'PIX' && (
          <div>
            <h2 className="text-sm font-medium text-text-primary mb-4">
              Pix details
            </h2>
            <div className="flex flex-col gap-4">
              <FormField 
                label="Key type" 
                required 
                error={errors.keyType?.message}
                hasValue={!!watch('keyType')}
              >
                <select
                  {...register('keyType')}
                  className={`${inputBaseClass} ${errors.keyType ? 'border-status-failed' : 'border-border'} appearance-none cursor-pointer`}
                  defaultValue=""
                >
                  <option value="" disabled></option>
                  <option value="CPF">CPF</option>
                  <option value="CNPJ">CNPJ</option>
                  <option value="EMAIL">Email</option>
                  <option value="PHONE">Phone</option>
                  <option value="RANDOM">Random key</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </FormField>

              <FormField label="Pix key" required error={errors.pixKey?.message}>
                <input
                  type="text"
                  {...register('pixKey')}
                  className={`${inputBaseClass} ${errors.pixKey ? 'border-status-failed' : 'border-border'}`}
                  placeholder="Pix key"
                />
              </FormField>
            </div>
          </div>
        )}

        {transactionType === 'TED' && (
        <div>
          <h2 className="text-sm font-medium text-text-primary mb-4">
            Bank details
          </h2>
          <div className="flex flex-col gap-4">
            <FormField 
              label="Account type" 
              required 
              error={errors.accountType?.message}
              hasValue={!!watch('accountType')}
            >
              <select
                {...register('accountType')}
                className={`${inputBaseClass} ${errors.accountType ? 'border-status-failed' : 'border-border'} appearance-none cursor-pointer`}
                defaultValue=""
              >
                <option value="" disabled></option>
                <option value="CORRENTE">Corrente</option>
                <option value="POUPANCA">Poupança</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </FormField>

            <FormField label="Bank code" required error={errors.bank?.message}>
              <input
                type="text"
                {...register('bank')}
                className={`${inputBaseClass} ${errors.bank ? 'border-status-failed' : 'border-border'}`}
                placeholder="Bank code"
              />
            </FormField>

            <FormField label="Account number with digit" required error={errors.account?.message}>
              <input
                type="text"
                {...register('account')}
                className={`${inputBaseClass} ${errors.account ? 'border-status-failed' : 'border-border'}`}
                placeholder="Account number with digit"
              />
            </FormField>

            <FormField label="Branch" required error={errors.agency?.message}>
              <input
                type="text"
                {...register('agency')}
                className={`${inputBaseClass} ${errors.agency ? 'border-status-failed' : 'border-border'}`}
                placeholder="Branch"
              />
            </FormField>
          </div>
        </div>
        )}

        <div>
          <h2 className="text-sm font-medium text-text-primary mb-2">
            Add a description for this transaction (optional)
          </h2>
          <p className="text-xs text-text-muted mb-4">
            This message will be displayed to the recipient of this transaction.
          </p>
          <textarea
            {...register('description')}
            rows={3}
            className={`${inputBaseClass} border-border resize-none py-2`}
            placeholder="Description"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mt-8 pt-4 border-t border-border">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2.5 border border-border rounded-lg text-text-primary font-medium
                     hover:bg-surface-hover transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-8 py-2.5 rounded-lg font-medium transition-colors
                     bg-primary text-white hover:bg-primary-hover
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
