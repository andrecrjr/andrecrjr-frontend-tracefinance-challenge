'use client';

import { UseFormReturn } from 'react-hook-form';
import { MethodFormData } from '@/lib/schemas/transactionSchema';

interface MethodStepProps {
  form: UseFormReturn<MethodFormData>;
  onNext: () => void;
  onCancel: () => void;
}

export function MethodStep({ form, onNext, onCancel }: MethodStepProps) {
  const { register, watch, formState: { errors } } = form;
  const selectedType = watch('type');

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl font-bold text-text-primary mb-8">
        Transaction method
      </h1>

      <div className="flex flex-col gap-4 flex-1">
        <label
          className={`flex items-center gap-4 p-5 rounded-lg border cursor-pointer transition-colors
            ${selectedType === 'TED' 
              ? 'border-primary bg-primary-light' 
              : 'border-border bg-surface hover:bg-surface-hover'
            }`}
        >
          <input
            type="radio"
            value="TED"
            {...register('type')}
            className="w-5 h-5 accent-primary"
          />
          <span className="text-text-primary font-medium">TED</span>
        </label>

        <label
          className={`flex items-center gap-4 p-5 rounded-lg border cursor-pointer transition-colors
            ${selectedType === 'PIX' 
              ? 'border-primary bg-primary-light' 
              : 'border-border bg-surface hover:bg-surface-hover'
            }`}
        >
          <input
            type="radio"
            value="PIX"
            {...register('type')}
            className="w-5 h-5 accent-primary"
          />
          <span className="text-text-primary font-medium">PIX</span>
        </label>

        {errors.type && (
          <p className="text-status-failed text-sm">{errors.type.message}</p>
        )}
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 border border-border rounded-lg text-text-primary font-medium
                     hover:bg-surface-hover transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!selectedType}
          className="px-8 py-2.5 rounded-lg font-medium transition-colors
                     bg-primary text-white hover:bg-primary-hover
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
